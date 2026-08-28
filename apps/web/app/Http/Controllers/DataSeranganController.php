<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImportDataSeranganRequest;
use App\Http\Requests\StoreDataSeranganRequest;
use App\Http\Requests\UpdateDataSeranganRequest;
use App\Models\HistoriSerangan;
use App\Services\DataSeranganService;
use App\Services\KecamatanService;
use App\Services\OPTService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataSeranganController extends Controller
{
    public function __construct(
        protected KecamatanService $kecamatanService,
        protected OPTService $optService,
        protected DataSeranganService $dataSeranganService,
    ) {}

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $kecamatanId = $request->input('kecamatan_id');
        $musim = $request->input('musim');
        $optId = $request->input('opt_id');
        $perPage = $request->input('per_page', 10);

        return Inertia::render('data-serangan/DataSerangan', [
            'allKecamatan'          => $this->kecamatanService->getAllKecamatan(),
            'allOPT'                => $this->optService->getAllOPT(),
            'allMusim'              => $this->dataSeranganService->getMusimList()->reverse()->values(),
            'countAttacksThisMonth' => $this->dataSeranganService->countAttacksThisMonth(),
            'dataSerangan'          => $this->dataSeranganService->getPaginatedDataSerangan(
                select       : ['bulan', 'tahun', 'kecamatan_id', 'opt_id', 'jumlah_serangan', 'musim_tanaman', 'luas_puso'],
                search       : $search,
                perPage      : (int) $perPage,
                kecamatanId  : $kecamatanId,
                optId        : $optId,
                order        : ['tahun' => 'desc', 'bulan' => 'desc'],
                where        : $musim ? ['musim_tanaman' => $musim] : null,
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

        if (! empty($result['errors'])) {
            $isSuccess = false;
            $message .= ' Beberapa baris gagal: '.count($result['errors']).' baris. Silakan periksa file log untuk detailnya.';
        }

        return redirect()->route('data-serangan')
            ->with($isSuccess ? 'success' : 'error', $message);
    }
}
