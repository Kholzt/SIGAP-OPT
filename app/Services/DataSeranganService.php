<?php

namespace App\Services;

use App\Models\HistoriSerangan;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\HistoriSeranganImport;
class DataSeranganService
{
    /**
     * Ambil data histori serangan dengan filter dan paginasi.
     */
    public function getPaginatedDataSerangan(
        string $search = '',
        int $perPage = 10,
        ?string $kecamatanId = null,
        ?string $optId = null,
        ?array $order = null
    ) {
        return HistoriSerangan::with(['kecamatan', 'opt'])
        ->when($kecamatanId, fn($q) => $q->where('kecamatan_id', $kecamatanId))
        ->when($optId, fn($q) => $q->where('opt_id', $optId))
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
        ->paginate($perPage)
        ->withQueryString();
    }

    /**
     * Simpan data serangan baru.
     */
    public function createDataSerangan(array $data): HistoriSerangan
    {
        return HistoriSerangan::create($data);
    }

    /**
     * Perbarui data serangan yang sudah ada.
     */
    public function updateDataSerangan(HistoriSerangan $historiSerangan, array $data): HistoriSerangan
    {
        $historiSerangan->update($data);
        return $historiSerangan->fresh(['kecamatan', 'opt']);
    }

    /**
     * Hapus data serangan.
     */
    public function deleteDataSerangan(HistoriSerangan $historiSerangan): bool
    {
        return $historiSerangan->delete();
    }

    /**
     * Import data serangan dari file Excel/CSV.
     * Format kolom: bulan, tahun, kecamatan_id, opt_id, jumlah_serangan, musim_tanaman, luas_puso
     */
    public function importDataSerangan(UploadedFile $file): array
    {
       $import = new HistoriSeranganImport();

        Excel::import($import, $file);
        return [
            'imported' => $import->success,
            'failed' => count($import->errors),
            'errors' => $import->errors,
        ];

    }

    
}