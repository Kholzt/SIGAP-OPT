<?php

namespace App\Services;

use App\Models\HistoriSerangan;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\HistoriSeranganImport;
class DataSeranganService
{
    public function __construct(protected ?StatusEndemisService $statusEndemisService = null) {}

    /**
     * Ambil data histori serangan dengan filter dan paginasi.
     */
    public function getMusimList($typeMusim = "MK"){
        $isMk = $typeMusim == "MK";
        return HistoriSerangan::select('musim_tanaman')
            ->when($isMk,function ($qr)  {
                $qr->where('musim_tanaman', 'like', '%/%');
            })
            ->when(!$isMk,function ($qr)  {
                $qr->where('musim_tanaman', 'not like', '%/%');
            })
            ->distinct()
            ->pluck('musim_tanaman');
    }
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
        $created = HistoriSerangan::create($data);
        $this->statusEndemisService?->kalkulateStatusEndemis();
        return $created;
    }

    /**
     * Perbarui data serangan yang sudah ada.
     */
    public function updateDataSerangan(HistoriSerangan $historiSerangan, array $data): HistoriSerangan
    {
        $historiSerangan->update($data);
        $this->statusEndemisService?->kalkulateStatusEndemis();
        return $historiSerangan->fresh(['kecamatan', 'opt']);
    }

    /**
     * Hapus data serangan.
     */
    public function deleteDataSerangan(HistoriSerangan $historiSerangan): bool
    {
        $deleted = $historiSerangan->delete();
        $this->statusEndemisService?->kalkulateStatusEndemis();
        return $deleted;
    }

    /**
     * Import data serangan dari file Excel/CSV.
     * Format kolom: bulan, tahun, kecamatan_id, opt_id, jumlah_serangan, musim_tanaman, luas_puso
     */
    public function importDataSerangan(UploadedFile $file): array
    {
       $import = new HistoriSeranganImport();

        Excel::import($import, $file);
        $this->statusEndemisService?->kalkulateStatusEndemis();
        return [
            'imported' => $import->success,
            'failed' => count($import->errors),
            'errors' => $import->errors,
        ];

    }

    
}