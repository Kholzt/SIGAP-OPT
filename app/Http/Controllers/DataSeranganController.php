<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\KecamatanService;
use App\Services\OPTService;
class DataSeranganController extends Controller
{
    
    public function __construct(protected KecamatanService $kecamatanService,protected OPTService $optService) {}
    public function index()
    {
        $allKecamtan = $this->kecamatanService->getAllKecamatan();
        $allOPT = $this->optService->getAllOPT();
        return Inertia::render('data-serangan/DataSerangan', [
            'allKecamatan' => $allKecamtan,
            'allOPT' => $allOPT,
        ]);
    }

    public function create()
    {
        return response()->json(['message' => 'Create DataSerangan placeholder']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Store DataSerangan placeholder', 'data' => $request->all()]);
    }

    public function show($id)
    {
        return response()->json(['message' => "Show DataSerangan placeholder for id {$id}"]);
    }

    public function edit($id)
    {
        return response()->json(['message' => "Edit DataSerangan placeholder for id {$id}"]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => "Update DataSerangan placeholder for id {$id}", 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        return response()->json(['message' => "Destroy DataSerangan placeholder for id {$id}"]);
    }
}
