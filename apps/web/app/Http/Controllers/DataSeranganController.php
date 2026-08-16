<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\KecamatanService;
use App\Services\OPTService;
use App\Services\DataSeranganService;
use App\Http\Requests\StoreDataSeranganRequest;
use App\Http\Requests\UpdateDataSeranganRequest;
use App\Http\Requests\ImportDataSeranganRequest;
use App\Models\HistoriSerangan;

class DataSeranganController extends Controller
{
    public function __construct(
        protected KecamatanService $kecamatanService,
        protected OPTService $optService,
        protected DataSeranganService $dataSeranganService
    ) {}

    public function index(Request $request)
    {
        $search      = $request->input('search', '');
        $kecamatanId = $request->input('kecamatan_id');
        $optId       = $request->input('opt_id');
        $perPage     = $request->input('per_page', 10);

        return Inertia::render('data-serangan/DataSerangan', [
            'allKecamatan' => $this->kecamatanService->getAllKecamatan(),
            'allOPT'       => $this->optService->getAllOPT(),
            'dataSerangan' => $this->dataSeranganService->getPaginatedDataSerangan(
                $search, (int) $perPage, $kecamatanId, $optId, ["tahun" => "desc","bulan" => "desc"]
            ),
            'filters' => compact('search', 'kecamatanId', 'optId'),
            'flash'   => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function store(StoreDataSeranganRequest $request)
    {
        $this->dataSeranganService->createDataSerangan($request->validated());

        return redirect()->route('data-serangan')
            ->with('success', 'Data serangan berhasil ditambahkan.');
    }

    public function update(UpdateDataSeranganRequest $request, HistoriSerangan $data_serangan)
    {
        $this->dataSeranganService->updateDataSerangan($data_serangan, $request->validated());

        return redirect()->route('data-serangan')
            ->with('success', 'Data serangan berhasil diperbarui.');
    }

    public function destroy(HistoriSerangan $data_serangan)
    {
        $this->dataSeranganService->deleteDataSerangan($data_serangan);

        return redirect()->route('data-serangan')
            ->with('success', 'Data serangan berhasil dihapus.');
    }

    public function import(ImportDataSeranganRequest $request)
    {
        $result = $this->dataSeranganService->importDataSerangan($request->file('file'));
        $message = "Berhasil mengimpor {$result['imported']} data.";
        $isSuccess = true;

        if (!empty($result['errors'])) {
            $isSuccess = false;
            $message .= ' Beberapa baris gagal: ' . count($result['errors']) . ' baris. Silakan periksa file log untuk detailnya.';
        }

        return redirect()->route('data-serangan')
            ->with($isSuccess ? 'success' : 'error', $message);
    }
}
