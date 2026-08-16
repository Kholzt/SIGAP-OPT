<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kecamatan;
use App\Services\KecamatanService;
use App\Http\Requests\StoreKecamatanRequest;
use App\Http\Requests\UpdateKecamatanRequest;
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
            'flash'   => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function store(StoreKecamatanRequest $request)
    {
        $this->kecamatanService->createKecamatan($request->validated());

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil ditambahkan.');
    }

    public function update(UpdateKecamatanRequest $request, Kecamatan $kecamatan)
    {
        $this->kecamatanService->updateKecamatan($kecamatan, $request->validated());

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil diperbarui.');
    }

    public function destroy(Kecamatan $kecamatan)
    {
        $this->kecamatanService->deleteKecamatan($kecamatan);

        return redirect()->route('kecamatan.index')
            ->with('success', 'Kecamatan berhasil dihapus.');
    }
}
