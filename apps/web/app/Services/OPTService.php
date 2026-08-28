<?php

namespace App\Services;

use App\Models\OPT;
use Illuminate\Support\Collection;

class OPTService
{
    /**
     * getAllOPT
     *
     * @param  array  $select
     * @param  mixed  $orderBy
     * @param  mixed  $direction
     */
    public function getAllOPT(array|string $select = ['*'], string $orderBy = 'id', string $direction = 'asc'): Collection
    {
        return OPT::select($select)->orderBy($orderBy, $direction)->get();
    }

    public function getPaginatedOPT($search = '', $perPage = 10)
    {
        return OPT::when($search, fn ($q) => $q->where('nama_opt', 'like', "%{$search}%"))
            ->orderBy('id', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createOPT($data)
    {
        return OPT::create($data);
    }

    public function updateOPT(OPT $opt, $data)
    {
        $opt->update($data);

        return $opt;
    }

    public function deleteOPT(OPT $opt)
    {
        return $opt->delete();
    }
}
