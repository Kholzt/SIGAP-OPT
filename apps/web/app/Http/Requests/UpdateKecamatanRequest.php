<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKecamatanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_kecamatan' => 'required|string|max:100|unique:kecamatan,nama_kecamatan,'.$this->kecamatan->id,
        ];
    }

    public function messages(): array
    {
        return [
            'nama_kecamatan.required' => 'Nama kecamatan wajib diisi.',
            'nama_kecamatan.max'      => 'Nama kecamatan maksimal 100 karakter.',
            'nama_kecamatan.unique'   => 'Nama kecamatan sudah terdaftar.',
        ];
    }
}
