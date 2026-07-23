<?php

namespace App\Http\Controllers;

use App\Models\HistoriSerangan;
use App\Models\Kecamatan;
use App\Models\OPT;
use App\Models\StatusEndemis;
use App\Services\StatusEndemisService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusEndemisController extends Controller
{
    public function __construct(protected StatusEndemisService $statusEndemisService) {}

    public function index(Request $request)
    {
        // Populate/ensure status endemis calculations are up to date
        $this->statusEndemisService->kalkulateStatusEndemis();

        $allKecamatan = Kecamatan::orderBy('nama_kecamatan', 'asc')->get();
        $allOPT = OPT::orderBy('id', 'asc')->get();

        $musimList = HistoriSerangan::select('musim_tanaman')
            ->where('musim_tanaman', 'like', '%/%')
            ->distinct()
            ->pluck('musim_tanaman');

        if ($musimList->isEmpty()) {
            $musimList = collect(['2024/2025']);
        }

        $statusRecords = StatusEndemis::all();

        // Build status matrix: [ kecamatan_id => [ opt_id => status ] ]
        $statusMatrix = [];
        foreach ($statusRecords as $rec) {
            $statusMatrix[$rec->kecamatan_id][$rec->opt_id] = $rec->status;
        }

        return Inertia::render('status-endemis/StatusEndemis', [
            'allKecamatan' => $allKecamatan,
            'allOPT' => $allOPT,
            'musimList' => $musimList,
            'statusMatrix' => $statusMatrix,
        ]);
    }
}

