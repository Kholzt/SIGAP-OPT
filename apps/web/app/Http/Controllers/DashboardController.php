<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\OPTService;
use App\Services\StatusEndemisService;
class DashboardController extends Controller
{
    public function __construct(protected OPTService $optService,protected StatusEndemisService $statusEndemisService) {}
    public function index()
    {
        $countOPT = 0;
        return Inertia::render('dashboard/Dashboard', [
            'countOPT' => $countOPT
        ]);
    }

    public function create()
    {
        return response()->json(['message' => 'Create Dashboard placeholder']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Store Dashboard placeholder', 'data' => $request->all()]);
    }

    public function show($id)
    {
        return response()->json(['message' => "Show Dashboard placeholder for id {$id}"]);
    }

    public function edit($id)
    {
        return response()->json(['message' => "Edit Dashboard placeholder for id {$id}"]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => "Update Dashboard placeholder for id {$id}", 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        return response()->json(['message' => "Destroy Dashboard placeholder for id {$id}"]);
    }
}
