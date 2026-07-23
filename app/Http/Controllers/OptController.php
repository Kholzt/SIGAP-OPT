<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OPT;
use App\Services\OPTService;
use App\Http\Requests\StoreOptRequest;
use App\Http\Requests\UpdateOptRequest;
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
            'flash'   => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function store(StoreOptRequest $request)
    {
        $this->optService->createOPT($request->validated());

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil ditambahkan.');
    }

    public function update(UpdateOptRequest $request, OPT $opt)
    {
        $this->optService->updateOPT($opt, $request->validated());

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil diperbarui.');
    }

    public function destroy(OPT $opt)
    {
        $this->optService->deleteOPT($opt);

        return redirect()->route('opt.index')
            ->with('success', 'OPT berhasil dihapus.');
    }
}
