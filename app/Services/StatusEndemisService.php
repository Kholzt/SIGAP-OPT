<?php

namespace App\Services;

use App\Models\HistoriSerangan;
use App\Models\Kecamatan;
use App\Models\OPT;
use App\Models\StatusEndemis;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class StatusEndemisService
{
    public function getAllStatusEndemisService()
    {
        return $this->kalkulateStatusEndemis();
    }

    public function kalkulateStatusEndemis()
    {
        $musimList = HistoriSerangan::select('musim_tanaman')
            ->where('musim_tanaman', 'like', '%/%')
            ->distinct()
            ->pluck('musim_tanaman');

        $totalMusimCount = $musimList->count();

        if ($totalMusimCount === 0) {
            return [];
        }

        $allKecamatan = Kecamatan::all();
        if ($allKecamatan->isEmpty()) {
            return [];
        }

        // Signature key based on dataset state
        $cacheKey = 'status_endemis_calc_' . md5(
            $totalMusimCount . '_' .
            (HistoriSerangan::max('updated_at') ?? '') . '_' .
            HistoriSerangan::count() . '_' .
            OPT::count() . '_' .
            $allKecamatan->count()
        );

        if (Cache::has($cacheKey)) {
            return StatusEndemis::all();
        }

        $opts = OPT::all();
        if ($opts->isEmpty()) {
            return [];
        }

        // Single aggregated query for all OPTs, Kecamatans, and Musims
        $seranganData = HistoriSerangan::selectRaw('opt_id, kecamatan_id, musim_tanaman, SUM(jumlah_serangan) as total_serangan, SUM(luas_puso) as total_luas_puso')
            ->whereIn('musim_tanaman', $musimList)
            ->groupBy('opt_id', 'kecamatan_id', 'musim_tanaman')
            ->get()
            ->groupBy('opt_id');

        $now = now();
        $calculatedData = [];
        $result = [];

        foreach ($opts as $valOpt) {
            $optId = $valOpt->id;
            $kecamatanGroups = $seranganData->has($optId) ? $seranganData->get($optId)->groupBy('kecamatan_id') : collect();

            $rataRataSeranganMap = [];
            $rataRataPusoMap = [];
            $rasioPusoMap = [];
            $frekuensiSeranganMap = [];

            foreach ($allKecamatan as $kecamatan) {
                $kecamatanId = $kecamatan->id;

                if ($kecamatanGroups->has($kecamatanId)) {
                    $items = $kecamatanGroups->get($kecamatanId);
                    $sumSerangan = (float) $items->sum('total_serangan');
                    $sumPuso = (float) $items->sum('total_luas_puso');

                    $ktVal = $sumSerangan / $totalMusimCount;
                    $kpVal = $sumPuso / $totalMusimCount;
                    $krVal = $sumSerangan > 0 ? ($sumPuso / $sumSerangan) : 0;
                    $kfVal = (float) $items->filter(fn($item) => $item->total_serangan > 0)->count();
                } else {
                    $ktVal = 0;
                    $kpVal = 0;
                    $krVal = 0;
                    $kfVal = 0;
                }

                $rataRataSeranganMap[$kecamatanId] = $ktVal;
                $rataRataPusoMap[$kecamatanId] = $kpVal;
                $rasioPusoMap[$kecamatanId] = $krVal;
                $frekuensiSeranganMap[$kecamatanId] = $kfVal;
            }

            $ktMax = !empty($rataRataSeranganMap) ? max($rataRataSeranganMap) : 0;
            $kpMax = !empty($rataRataPusoMap) ? max($rataRataPusoMap) : 0;
            $krMax = !empty($rasioPusoMap) ? max($rasioPusoMap) : 0;
            $kfMax = !empty($frekuensiSeranganMap) ? max($frekuensiSeranganMap) : 0;

            foreach ($allKecamatan as $kecamatan) {
                $kecamatanId = $kecamatan->id;
                $ktVal = $rataRataSeranganMap[$kecamatanId];

                $ktClass = $this->clasificationIndicator($ktMax, $ktVal);
                $kpClass = $this->clasificationIndicator($kpMax, $rataRataPusoMap[$kecamatanId]);
                $krClass = $this->clasificationIndicator($krMax, $rasioPusoMap[$kecamatanId]);
                $kfClass = $this->clasificationIndicator($kfMax, $frekuensiSeranganMap[$kecamatanId]);

                $total = $ktClass + $kpClass + $krClass + $kfClass;
                $status = $this->clasificationStatusEndemis($total);

                $calculatedData[] = [
                    'opt_id' => $optId,
                    'kecamatan_id' => $kecamatanId,
                    'status' => $status,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                $result[] = [
                    'opt_id' => $optId,
                    'kecamatan_id' => $kecamatanId,
                    'total_indicator' => $total,
                    'status' => $status,
                ];
            }
        }

        if (!empty($calculatedData)) {
            $existing = StatusEndemis::all()->keyBy(fn($item) => $item->opt_id . '_' . $item->kecamatan_id);

            DB::transaction(function () use ($calculatedData, $existing) {
                $toInsert = [];
                foreach ($calculatedData as $data) {
                    $key = $data['opt_id'] . '_' . $data['kecamatan_id'];
                    if (isset($existing[$key])) {
                        if ($existing[$key]->status !== $data['status']) {
                            $existing[$key]->update(['status' => $data['status']]);
                        }
                    } else {
                        $toInsert[] = $data;
                    }
                }
                if (!empty($toInsert)) {
                    StatusEndemis::insert($toInsert);
                }
            });
        }

        Cache::put($cacheKey, true, 3600);

        return $result;
    }

    private function clasificationIndicator($maxVal, $value)
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

    private function clasificationStatusEndemis($value)
    {
        if ($value == 0) {
            return "Aman";
        }

        $interval = 12 / 3;
        if ($value <= $interval) {
            return "Potensial";
        } elseif ($value <= $interval * 2) {
            return "Sporadis";
        } elseif ($value <= $interval * 3) {
            return "Endemis";
        } else {
            return "Aman";
        }
    }
}
