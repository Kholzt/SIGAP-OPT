<?php

namespace App\Http\Controllers;
use App\Models\HistoriSerangan;
use App\Models\Kecamatan;
use App\Models\OPT;
use App\Models\StatusEndemis;
use App\Services\StatusEndemisService;
use App\Services\DataSeranganService;
use App\Services\OPTService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicMapController extends Controller
{
     public function __construct(protected StatusEndemisService $statusEndemisService, protected OPTService $optService,protected DataSeranganService $dataSerangan) {}
    public function index()
    {
        $allKecamatan = Kecamatan::orderBy('nama_kecamatan', 'asc')->get();
        $allOPT = $this->optService->getAllOPT();
        $musimList = $this->statusEndemisService->getMusimList();
        $statusRecords = $this->statusEndemisService->getAllStatusEndemis();
        // Build status matrix: [ kecamatan_id => [ opt_id => status ] ]
        $statusMatrix = [];
        foreach ($statusRecords as $rec) {
            $statusMatrix[$rec->kecamatan_id][$rec->opt_id] = $rec->status;
        }
        return Inertia::render('landing/Landing', [
            'allKecamatan' => $allKecamatan,
            'allOPT' => $allOPT,
            'musimList' => $musimList,
            'statusMatrix' => $statusMatrix,
        ]);
    }

    public function create()
    {
        // Placeholder for create view
        return response()->json(['message' => 'Create PublicMap placeholder']);
    }

    public function store(Request $request)
    {
        // Placeholder for storing data
        return response()->json(['message' => 'Store PublicMap placeholder', 'data' => $request->all()]);
    }

    public function show($id)
    {
        return response()->json(['message' => "Show PublicMap placeholder for id {$id}"]);
    }

    public function edit($id)
    {
        // Placeholder for edit view
        return response()->json(['message' => "Edit PublicMap placeholder for id {$id}"]);
    }

    public function update(Request $request, $id)
    {
        // Placeholder for updating data
        return response()->json(['message' => "Update PublicMap placeholder for id {$id}", 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        // Placeholder for deleting data
        return response()->json(['message' => "Destroy PublicMap placeholder for id {$id}"]);
    }
}
