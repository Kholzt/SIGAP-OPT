<?php

namespace App\Imports;

use App\Models\HistoriSerangan;
use App\Models\Kecamatan;
use App\Models\OPT;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;
use Throwable;

class HistoriSeranganImport implements SkipsOnError, SkipsOnFailure, ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    public int $success = 0;

    public array $errors = [];

    public function model(array $row)
    {
        $kecamatan = Kecamatan::where('nama_kecamatan', trim($row['kecamatan']))->first();

        $opt = OPT::where('nama_opt', trim($row['jenis_opt']))->first();

        if (! $kecamatan || ! $opt) {
            $this->errors[] = [
                'row'    => $row,
                'errors' => [
                    ! $kecamatan ? 'Kecamatan tidak ditemukan.' : null,
                    ! $opt ? 'OPT tidak ditemukan.' : null,
                ],
            ];

            return null; // skip baris ini
        }

        $this->success++;

        return new HistoriSerangan([
            'bulan'           => $row['bulan'],
            'tahun'           => $row['tahun'],
            'kecamatan_id'    => $kecamatan->id,
            'opt_id'          => $opt->id,
            'jumlah_serangan' => $row['luas_serangan'],
            'musim_tanaman'   => $row['musim_tanam'],
            'luas_puso'       => $row['luas_puso'],
        ]);
    }

    public function rules(): array
    {
        return [
            '*.bulan'         => 'required|integer|between:1,12',
            '*.tahun'         => 'required|integer',
            '*.kecamatan'     => 'required',
            '*.jenis_opt'     => 'required',
            '*.luas_serangan' => 'required|numeric|min:0',
            '*.musim_tanam'   => 'required',
            '*.luas_puso'     => 'nullable|numeric|min:0',
        ];
    }

    public function onFailure(Failure ...$failures)
    {
        foreach ($failures as $failure) {
            $this->errors[] = [
                'row'    => $failure->row(),
                'column' => $failure->attribute(),
                'errors' => $failure->errors(),
            ];
        }
    }

    public function onError(Throwable $e)
    {
        $this->errors[] = [
            'row'    => '-',
            'column' => '-',
            'errors' => [$e->getMessage()],
        ];
    }
}
