<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriSerangan extends Model
{
     protected $table = 'histori_serangan';
    protected $fillable = ['bulan', 'tahun', 'kecamatan_id', 'opt_id', 'jumlah_serangan',"musim_tanaman","luas_puso"];
}
