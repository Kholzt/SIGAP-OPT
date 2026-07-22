<?php
namespace App\Services;

use App\Models\Kecamatan;

class KecamatanService
{
    public function getAllKecamatan($orderBy = 'id', $direction = 'asc')
    {
        return Kecamatan::orderBy($orderBy, $direction)->get();
    }

    public function getPaginatedKecamatan(string $search = '', int $perPage = 10)
    {
        return Kecamatan::when($search, fn ($q) => $q->where('nama_kecamatan', 'like', "%{$search}%"))
            ->orderBy('id', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }
}
