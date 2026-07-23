<?php
namespace App\Services;

use App\Models\OPT;

class OPTService
{
    public function getAllOPT($orderBy = 'id', $direction = 'asc')
    {
        return OPT::orderBy($orderBy, $direction)->get();
    }

    public function getPaginatedOPT( $search = '',  $perPage = 10)
    {
        return OPT::when($search, fn ($q) => $q->where('nama_opt', 'like', "%{$search}%"))
            ->orderBy('id', 'asc')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createOPT( $data)
    {
        return OPT::create($data);
    }

    public function updateOPT(OPT $opt,  $data)
    {
        $opt->update($data);
        return $opt;
    }

    public function deleteOPT(OPT $opt)
    {
        return $opt->delete();
    }
}
