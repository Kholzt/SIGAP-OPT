<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PuncakSeranganController extends Controller
{
    public function index()
    {
        return Inertia::render('puncak-serangan/PuncakSerangan');
    }

    public function create()
    {
        return response()->json(['message' => 'Create PuncakSerangan placeholder']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Store PuncakSerangan placeholder', 'data' => $request->all()]);
    }

    public function show($id)
    {
        return response()->json(['message' => "Show PuncakSerangan placeholder for id {$id}"]);
    }

    public function edit($id)
    {
        return response()->json(['message' => "Edit PuncakSerangan placeholder for id {$id}"]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => "Update PuncakSerangan placeholder for id {$id}", 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        return response()->json(['message' => "Destroy PuncakSerangan placeholder for id {$id}"]);
    }
}
