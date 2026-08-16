<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_opt' => 'required|string|max:100|unique:opt,nama_opt,' . $this->opt->id,
        ];
    }

    public function messages(): array
    {
        return [
            'nama_opt.required' => 'Nama OPT wajib diisi.',
            'nama_opt.max'      => 'Nama OPT maksimal 100 karakter.',
            'nama_opt.unique'   => 'Nama OPT sudah terdaftar.',
        ];
    }
}
