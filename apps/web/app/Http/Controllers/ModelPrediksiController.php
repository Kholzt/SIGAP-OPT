<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ModelPrediksiController extends Controller
{
    public function index()
    {
        return Inertia::render('model-prediksi/ModelPrediksi');
    }

    public function create()
    {
        return response()->json(['message' => 'Create ModelPrediksi placeholder']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Store ModelPrediksi placeholder', 'data' => $request->all()]);
    }

    public function show($id)
    {
        return response()->json(['message' => "Show ModelPrediksi placeholder for id {$id}"]);
    }

    public function edit($id)
    {
        return response()->json(['message' => "Edit ModelPrediksi placeholder for id {$id}"]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => "Update ModelPrediksi placeholder for id {$id}", 'data' => $request->all()]);
    }

    public function destroy($id)
    {
        return response()->json(['message' => "Destroy ModelPrediksi placeholder for id {$id}"]);
    }
}
