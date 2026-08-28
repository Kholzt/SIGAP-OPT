<?php

namespace Database\Seeders;

use App\Models\Kecamatan;
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
            Kecamatan::create([
                'nama_kecamatan' => $nama_kecamatan,
            ]);
        }
    }
}
