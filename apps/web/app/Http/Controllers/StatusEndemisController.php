<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use App\Services\StatusEndemisService;
use App\Services\DataSeranganService;
use App\Services\OPTService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusEndemisController extends Controller
{
    public function __construct(protected StatusEndemisService $statusEndemisService, protected OPTService $optService,protected DataSeranganService $dataSerangan) {}

    public function index(Request $request)
    {
        $this->statusEndemisService->calculateEndemicStatus();
        $allKecamatan = Kecamatan::orderBy('nama_kecamatan', 'asc')->get();
        $allOPT = $this->optService->getAllOPT();
        $musimList = $this->statusEndemisService->getMusimList();
        $statusRecords = $this->statusEndemisService->getAllStatusEndemis();

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

