<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KecamatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kecamatan = [
            'BINAKAL',
            'BONDOWOSO',
            'BOTOLINGGO',
            'CERMEE',
            'CURAHDAMI',
            'GRUJUGAN',
            'JAMBESARIDS',
            'KLABANG',
            'MAESAN',
            'PAKEM',
            'PRAJEKAN',
            'PUJER',
            'SUKOSARI',
            'SUMBERWRINGIN',
            'TAMANAN',
            'TAMANKROCOK',
            'TAPEN',
            'TEGALAMPEL',
            'TENGGARANG',
            'TLOGOSARI',
            'WONOSARI',
            'WRINGIN',
        ];

        foreach ($kecamatan as $nama_kecamatan) {
        \App\Models\Kecamatan::create([
            'nama_kecamatan' => $nama_kecamatan
        ]);
    }
}
}