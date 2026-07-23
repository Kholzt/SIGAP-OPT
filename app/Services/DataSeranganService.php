<?php
namespace App\Services;
use App\Models\HistoriSerangan;
class DataSeranganService
{
    public function getAllDataSerangan($orderBy = 'id', $direction = 'asc')
    {
        return HistoriSerangan::orderBy($orderBy, $direction)->get();
    }

}