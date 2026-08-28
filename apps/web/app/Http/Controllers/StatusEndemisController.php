<?php

namespace App\Http\Controllers;

use App\Services\DataSeranganService;
use App\Services\KecamatanService;
use App\Services\OPTService;
use App\Services\StatusEndemisService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusEndemisController extends Controller
{
    public function __construct(
        protected StatusEndemisService $statusEndemisService,
        protected OPTService $optService,
        protected DataSeranganService $dataSerangan,
        protected KecamatanService $kecamatanService,
    ) {}

    public function index(Request $request)
    {
        $musim          = $request->musim;
        $opt_id         = $request->opt_id;
        $kecamatan_id   = $request->kecamatan_id;
        $this->statusEndemisService->calculateEndemicStatus();
        $allKecamatan   = $this->kecamatanService->getAllKecamatan(select: ['nama_kecamatan', 'id']);
        $allOPT         = $this->optService->getAllOPT(select: ['nama_opt', 'id']);
        $musimList      = $this->statusEndemisService->getMusimList();
        $statusRecords  = $this->statusEndemisService->getAllStatusEndemis(select: ['status', 'kecamatan_id', 'opt_id']);

        // Build status matrix: [ kecamatan_id => [ opt_id => status ] ]
        $statusMatrix = [];
        foreach ($statusRecords as $rec) {
            $statusMatrix[$rec->kecamatan_id][$rec->opt_id] = $rec->status;
        }

        return Inertia::render('status-endemis/StatusEndemis', [
            'allKecamatan' => $allKecamatan,
            'allOPT'       => $allOPT,
            'musimList'    => $musimList,
            'statusMatrix' => $statusMatrix,
            "filters"=>[
                "opt_id"        =>$opt_id,
                "musim"         =>$musim,
                "kecamatan_id"  =>$kecamatan_id,
            ]
        ]);
    }
}
