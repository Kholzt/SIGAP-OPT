<?php

namespace App\Services;

use App\Models\HistoriSerangan;
use App\Models\Kecamatan;
use App\Models\OPT;
use App\Models\StatusEndemis;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class StatusEndemisService
{
    protected $optService;

    public function __construct(OPTService $optService)
    {
        $this->optService = $optService;
    }

    /**
     * getMusimList
     *
     * @param  "MK"|"MP"  $typeMusim
     * @return array
     */
    public function getMusimList(?string $typeMusim = null)
    {
        // MP beririsan dengan 2 tahun yang dipisah dengan /
        // example: 20/21
        $isMp = $typeMusim == 'MP';

        return StatusEndemis::select('musim_tanaman')
            ->when($typeMusim, function ($q) use ($isMp) {
                $q->when($isMp, function ($qr) {
                    $qr->where('musim_tanaman', 'like', '%/%');
                });
                $q->when(! $isMp, function ($qr) {
                    $qr->where('musim_tanaman', 'not like', '%/%');
                });
            })

            ->distinct()
            ->pluck('musim_tanaman');
    }

    /**
     * getAllStatusEndemis
     */
    public function getAllStatusEndemis(array|string $select = '*', array|string $order = [], array|string $where = []): Collection
    {
        return StatusEndemis::select($select)->get();
    }

    /**
     * calculateEndemicStatus
     *
     * @return void
     */
    public function calculateEndemicStatus()
    {
        try {
            DB::beginTransaction();

            $currentYear = date('y');
            $lastMusimTanam = StatusEndemis::latest()->value('musim_tanaman');
            if (str_contains($lastMusimTanam, $currentYear)) {
                return;
            }

            $optList = OPT::get('id');
            $kecamatans = Kecamatan::get('id');

            // Musim Kemarau   (MK)
            // Musim Penghujan (MP)
            $musims = ['MK', 'MP'];
            $finalData = [];
            foreach ($musims as $musim) {
                $operator = $musim == 'MP' ? 'LIKE' : 'NOT LIKE';
                $musimList = HistoriSerangan::select('musim_tanaman')
                    ->where('musim_tanaman', $operator, '%/%')
                    ->whereNot('musim_tanaman', 'like', "%$currentYear%")
                    ->distinct('musim_tanaman')
                    ->orderBy('musim_tanaman', 'asc')
                    ->pluck('musim_tanaman');

                $totalMusim = $musimList->count();

                // Get histori serangan group by opt id kecamatan dan musim tanam
                // Kemudian lakukan pengelompokan collection berdasarkan opt id
                $seranganData = HistoriSerangan::select(['opt_id',
                    'musim_tanaman',
                    'kecamatan_id',
                    DB::raw('SUM(jumlah_serangan) as total_serangan'),
                    DB::raw('SUM(luas_puso) as total_puso'),
                ])
                    ->whereIn('musim_tanaman', $musimList)
                    ->groupBy('opt_id', 'kecamatan_id', 'musim_tanaman')
                    ->get()
                    ->groupBy('opt_id');

                // Melakukan loop untuk masing-masing opt
                foreach ($optList as $opt) {
                    $optId = $opt->id;
                    $rataRataSeranganMap = [];
                    $rataRataPusoMap = [];
                    $rasioPusoMap = [];
                    $frekuensiSeranganMap = [];

                    // Ambil data serangan berdasarkan opt id kemudian gabung berdasarkan kecamatan id
                    $seranganPerOpt = $seranganData->has($optId) ? $seranganData->get($optId)->groupBy('kecamatan_id') : collect();
                    // Melakukan loop untuk masing-masing kecamatan per 1 opt
                    // Loop untuk melakukan sum dan menghitung nilai rata2 dan frekuensi indikator
                    foreach ($kecamatans as $kecamatan) {
                        $kecamatanId = $kecamatan->id;

                        // Definisi nilai indikator
                        // Default nilai 0 jika tidak terdapat data
                        $tVal = 0; // Nilai terkena
                        $pVal = 0; // Nilai puso
                        $prVal = 0; // Nilai rasio puso
                        $fVal = 0; // Nilai frekuensi serangan

                        if ($seranganPerOpt->has($kecamatanId)) {
                            $items = $seranganPerOpt->get($kecamatanId);

                            // Melakukan penjumlahan seluruh data serangan berdasarkan kecamatan dan opt
                            $sumSerangan = (float) $items->sum('total_serangan');
                            $sumPuso = (float) $items->sum('total_puso');

                            // Melakukan perhitungan indikator berdasarkan standar LPHP
                            $tVal = $sumSerangan / $totalMusim;
                            $pVal = $sumPuso / $totalMusim;
                            $prVal = $sumSerangan > 0 ? $sumPuso / $sumSerangan : 0;
                            $fVal = (float) $items->filter(fn ($item) => $item->total_serangan > 0)->count();
                        }

                        // Simpan nilai indikator yang sudah dihitung berdasarkan kecamatan id
                        $rataRataSeranganMap[$kecamatanId] = $tVal;
                        $rataRataPusoMap[$kecamatanId] = $pVal;
                        $rasioPusoMap[$kecamatanId] = $prVal;
                        $frekuensiSeranganMap[$kecamatanId] = $fVal;
                    }

                    // Mengambil nilai terbesar dari rata2 tiap indikator
                    $maxKt = ! empty($rataRataSeranganMap) ? max($rataRataSeranganMap) : 0;
                    $maxKp = ! empty($rataRataPusoMap) ? max($rataRataPusoMap) : 0;
                    $maxKr = ! empty($rasioPusoMap) ? max($rasioPusoMap) : 0;
                    $maxKf = ! empty($frekuensiSeranganMap) ? max($frekuensiSeranganMap) : 0;

                    foreach ($kecamatans as $kecamatan) {
                        $kecamatanId = $kecamatan->id;

                        // Ambil nilai rata-rata tiap indikator
                        $valKt = $rataRataSeranganMap[$kecamatanId];
                        $valKp = $rataRataPusoMap[$kecamatanId];
                        $valKr = $rasioPusoMap[$kecamatanId];
                        $valKf = $frekuensiSeranganMap[$kecamatanId];

                        // Melakukan klasifikasi kelas nilai rata-rata berdasarkan nilai max indikator
                        $ktFinal = $this->clasificationIndicator($maxKt, $valKt);
                        $kpFinal = $this->clasificationIndicator($maxKp, $valKp);
                        $krFinal = $this->clasificationIndicator($maxKr, $valKr);
                        $kfFinal = $this->clasificationIndicator($maxKf, $valKf);

                        //
                        $total = $ktFinal + $kpFinal + $krFinal + $kfFinal;
                        $status = $this->clasificationStatusEndemis($total);
                        $nextMusim = $musim == 'MK' ? "$currentYear/".($currentYear + 1) : $currentYear;
                        $finalData[] = [
                            'opt_id'        => $optId,
                            'kecamatan_id'  => $kecamatanId,
                            'musim_tanaman' => $nextMusim,
                            'status'        => $status,
                            'created_at'    => now(),
                            'updated_at'    => now(),
                        ];
                    }
                }
            }

            StatusEndemis::upsert($finalData, ['opt_id', 'kecamatan_id', 'musim_tanaman'], ['status', 'updated_at']);
            DB::commit();
            // return $result;
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }

    /**
     * clasificationIndicator
     * Mengklasifikasikan indikator menjadi 1, 2, atau 3 berdasarkan nilai maksimum dan nilai saat ini
     * untuk mendapatkan range kelas yang nantinya digunakan untuk nilai yang digunakan di perhitungan status endemis
     *
     * @return int 0,1,2,3,
     */
    private function clasificationIndicator(float $maxVal, float $value): int
    {
        if ($maxVal == 0 || $value == 0) {
            return 0;
        }

        $interval = $maxVal / 3;
        if ($value <= $interval) {
            return 1;
        } elseif ($value <= $interval * 2) {
            return 2;
        } elseif ($value <= $interval * 3) {
            return 3;
        } else {
            return 0;
        }
    }

    /**
     * clasificationStatusEndemis
     * Melakukan klasifikasi status endemis berdasarkan nilai klasifikasi kelas tiap indikator
     * Terdapat 4 indikator dengan nilai maksimal 3, sehingga nilai maksimal status endemis 3*4 = 12
     *
     * @return string aman, potensial, sporadis, endemis
     */
    private function clasificationStatusEndemis(int $value)
    {
        if ($value == 0) {
            return 'Aman';
        }

        $interval = 12 / 3;
        if ($value <= $interval) {
            return 'Potensial';
        } elseif ($value <= $interval * 2) {
            return 'Sporadis';
        } elseif ($value <= $interval * 3) {
            return 'Endemis';
        } else {
            return 'Aman';
        }
    }
}
