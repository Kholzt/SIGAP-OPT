<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OPTSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $allOPT = [
           'BLAS',
           'HDB',
           'PBP',
           'TIKUS',
           'TUNGRO',
           'WBC'
       ];

       foreach ($allOPT as $nama_opt) {
                \App\Models\OPT::create([
                            'nama_opt' => $nama_opt
                        ]);
    }}
}
