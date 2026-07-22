<?php
namespace App\Services;

use App\Models\OPT;

class OPTService
{
    public function getAllOPTService($orderBy = 'id', $direction = 'asc')
    {
        return OPT::orderBy($orderBy, $direction)->get();
    }

    public function getPaginatedOPT(string $search = '', int $perPage = 10)
    {
        return OPT::when($search, fn ($q) => $q->where('nama_opt', 'like', "%{$search}%"))
            ->orderBy('id', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }
}
