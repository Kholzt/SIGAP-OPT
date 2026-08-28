<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusEndemis extends Model
{
    protected $table = 'status_endemis';

    protected $fillable = [
        'opt_id',
        'kecamatan_id',
        'status',
        'musim_tanaman',
    ];
}
