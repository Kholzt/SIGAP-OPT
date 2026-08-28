<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDataSeranganRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bulan'           => 'required|integer|min:1|max:12',
            'tahun'           => 'required|integer|min:1900|max:2100',
            'kecamatan_id'    => 'required|exists:kecamatan,id',
            'opt_id'          => 'required|exists:opt,id',
            'jumlah_serangan' => 'required|numeric|min:0',
            'musim_tanaman'   => 'required|string|max:255',
            'luas_puso'       => 'required|numeric|min:0',
        ];
    }

    public function attributes(): array
    {
        return [
            'bulan'           => 'Bulan',
            'tahun'           => 'Tahun',
            'kecamatan_id'    => 'Kecamatan',
            'opt_id'          => 'Jenis OPT',
            'jumlah_serangan' => 'Luas Serangan',
            'musim_tanaman'   => 'Musim Tanam',
            'luas_puso'       => 'Luas Puso',
        ];
    }
}
