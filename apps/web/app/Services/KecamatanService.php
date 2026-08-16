<?php
namespace App\Services;

use App\Models\Kecamatan;

class KecamatanService
{
    public function getAllKecamatan($orderBy = 'id', $direction = 'asc')
    {
        return Kecamatan::orderBy($orderBy, $direction)->get();
    }

    public function getPaginatedKecamatan( $search = '',  $perPage = 10)
    {
        return Kecamatan::when($search, fn ($q) => $q->where('nama_kecamatan', 'like', "%{$search}%"))
            ->orderBy('id', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createKecamatan(array $data)
    {
        return Kecamatan::create($data);
    }

    public function updateKecamatan(Kecamatan $kecamatan, array $data)
    {
        $kecamatan->update($data);
        return $kecamatan;
    }

    public function deleteKecamatan(Kecamatan $kecamatan)
    {
        return $kecamatan->delete();
    }
}
