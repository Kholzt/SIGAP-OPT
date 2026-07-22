<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use App\Services\KecamatanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KecamatanController extends Controller
{
    public function __construct(protected KecamatanService $kecamatanService) {}

    public function index(Request $request)
    {
        $search  = $request->input('search', '');
        $perPage = $request->input('per_page', 10);

        $kecamatans = $this->kecamatanService->getPaginatedKecamatan($search, (int) $perPage);

        return Inertia::render('kecamatan/Index', [
            'kecamatans' => $kecamatans,
            'search'     => $search,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kecamatan' => 'required|string|max:100|unique:kecamatan,nama_kecamatan',
        ], [
            'nama_kecamatan.required' => 'Nama kecamatan wajib diisi.',
            'nama_kecamatan.max'      => 'Nama kecamatan maksimal 100 karakter.',
            'nama_kecamatan.unique'   => 'Nama kecamatan sudah terdaftar.',
        ]);

        Kecamatan::create($validated);

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil ditambahkan.');
    }

    public function update(Request $request, Kecamatan $kecamatan)
    {
        $validated = $request->validate([
            'nama_kecamatan' => 'required|string|max:100|unique:kecamatan,nama_kecamatan,' . $kecamatan->id,
        ], [
            'nama_kecamatan.required' => 'Nama kecamatan wajib diisi.',
            'nama_kecamatan.max'      => 'Nama kecamatan maksimal 100 karakter.',
            'nama_kecamatan.unique'   => 'Nama kecamatan sudah terdaftar.',
        ]);

        $kecamatan->update($validated);

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil diperbarui.');
    }

    public function destroy(Kecamatan $kecamatan)
    {
        $kecamatan->delete();

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil dihapus.');
    }
}
