<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoriSerangan extends Model
{
    protected $table = 'histori_serangan';

    protected $fillable = [
        'bulan',
        'tahun',
        'kecamatan_id',
        'opt_id',
        'jumlah_serangan',
        'musim_tanaman',
        'luas_puso',
    ];

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    public function opt(): BelongsTo
    {
        return $this->belongsTo(OPT::class, 'opt_id');
    }
}
