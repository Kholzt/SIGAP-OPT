<?php

namespace App\Services;

use App\Imports\HistoriSeranganImport;
use App\Models\HistoriSerangan;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;

class DataSeranganService
{
    public function __construct(protected ?StatusEndemisService $statusEndemisService = null) {}

    public function countAttacksThisMonth(): int
    {
        $bulan = date('m');
        $tahun = date('Y');

        return HistoriSerangan::where([
            'bulan' => $bulan,
            'tahun' => $tahun,
        ])
            ->count();
    }

    public function getMusimList(?string $typeMusim = null): Collection
    {
        $operatorMusim = $typeMusim == 'MP' ? 'like' : 'not like';

        return HistoriSerangan::select('musim_tanaman')
            ->when($typeMusim, function ($qr) use ($operatorMusim) {
                $qr->where('musim_tanaman', $operatorMusim, '%/%');
            })
            ->distinct()
            ->pluck('musim_tanaman');
    }

    /**
     * @param  array  $select
     */
    public function getPaginatedDataSerangan(
        array|string $select = [],
        string $search = '',
        int $perPage = 10,
        ?string $kecamatanId = null,
        ?string $optId = null,
        ?array $order = null,
        ?array $where = null,
    ): LengthAwarePaginator {
        $d = HistoriSerangan::with(['kecamatan', 'opt'])
            ->select($select)
            ->when($kecamatanId, fn ($q) => $q->where('kecamatan_id', $kecamatanId))
            ->when($optId, fn ($q) => $q->where('opt_id', $optId))
            ->when($search, function ($q) use ($search) {
                $q->where(function ($query) use ($search) {
                    $query->whereHas('kecamatan', function ($q) use ($search) {
                        $q->where('nama_kecamatan', 'like', "%{$search}%");
                    })
                        ->orWhereHas('opt', function ($q) use ($search) {
                            $q->where('nama_opt', 'like', "%{$search}%");
                        });
                });
            })
            ->when($order, function ($q) use ($order) {
                foreach ($order as $column => $direction) {
                    $q->orderBy($column, $direction);
                }
            })
            ->when($where, function ($q) use ($where) {
                $q->where($where);
            })
            ->paginate($perPage)
            ->withQueryString();

        return $d;
    }

    /**
     * Simpan data serangan baru.
     */
    public function createDataSerangan(array $data): HistoriSerangan
    {
        $created = HistoriSerangan::create($data);
        $this->statusEndemisService?->calculateEndemicStatus();

        return $created;
    }

    /**
     * Perbarui data serangan yang sudah ada.
     */
    public function updateDataSerangan(HistoriSerangan $historiSerangan, array $data): HistoriSerangan
    {
        $historiSerangan->update($data);
        $this->statusEndemisService?->calculateEndemicStatus();

        return $historiSerangan->fresh(['kecamatan', 'opt']);
    }

    /**
     * Hapus data serangan.
     */
    public function deleteDataSerangan(HistoriSerangan $historiSerangan): bool
    {
        $deleted = $historiSerangan->delete();
        $this->statusEndemisService?->calculateEndemicStatus();

        return $deleted;
    }

    /**
     * Import data serangan dari file Excel/CSV.
     * Format kolom: bulan, tahun, kecamatan_id, opt_id, jumlah_serangan, musim_tanaman, luas_puso
     */
    public function importDataSerangan(UploadedFile $file): array
    {
        $import = new HistoriSeranganImport;

        Excel::import($import, $file);
        $this->statusEndemisService?->calculateEndemicStatus();

        return [
            'imported' => $import->success,
            'failed'   => count($import->errors),
            'errors'   => $import->errors,
        ];

    }
}
