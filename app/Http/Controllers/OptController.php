<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OPT;
use App\Services\OPTService;
use Inertia\Inertia;

class OptController extends Controller
{
    public function __construct(protected OPTService $optService) {}

    public function index(Request $request)
    {
        $search  = $request->input('search', '');
        $perPage = $request->input('per_page', 10);

        $opts = $this->optService->getPaginatedOPT($search, (int) $perPage);

        return Inertia::render('opt/Index', [
            'opts'   => $opts,
            'search' => $search,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_opt' => 'required|string|max:100|unique:opt,nama_opt',
        ], [
            'nama_opt.required' => 'Nama OPT wajib diisi.',
            'nama_opt.max'      => 'Nama OPT maksimal 100 karakter.',
            'nama_opt.unique'   => 'Nama OPT sudah terdaftar.',
        ]);

        OPT::create($validated);

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil ditambahkan.');
    }

    public function update(Request $request, OPT $opt)
    {
        $validated = $request->validate([
            'nama_opt' => 'required|string|max:100|unique:opt,nama_opt,' . $opt->id,
        ], [
            'nama_opt.required' => 'Nama OPT wajib diisi.',
            'nama_opt.max'      => 'Nama OPT maksimal 100 karakter.',
            'nama_opt.unique'   => 'Nama OPT sudah terdaftar.',
        ]);

        $opt->update($validated);

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil diperbarui.');
    }

    public function destroy(OPT $opt)
    {
        $opt->delete();

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil dihapus.');
    }
}
