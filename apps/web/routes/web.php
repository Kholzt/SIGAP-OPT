<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicMapController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataSeranganController;
use App\Http\Controllers\ModelPrediksiController;
use App\Http\Controllers\PuncakSeranganController;
use App\Http\Controllers\OptController;
use App\Http\Controllers\KecamatanController;

use App\Http\Controllers\StatusEndemisController;

// Public pages
Route::get('/', [PublicMapController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Status Endemis
Route::get('/status-endemis', [StatusEndemisController::class, 'index'])->name('status-endemis');

// CRUD: Data Serangan OPT
Route::get('/data-serangan', [DataSeranganController::class, 'index'])->name('data-serangan');
Route::post('/data-serangan', [DataSeranganController::class, 'store'])->name('data-serangan.store');
Route::post('/data-serangan/import', [DataSeranganController::class, 'import'])->name('data-serangan.import');
Route::put('/data-serangan/{data_serangan}', [DataSeranganController::class, 'update'])->name('data-serangan.update');
Route::delete('/data-serangan/{data_serangan}', [DataSeranganController::class, 'destroy'])->name('data-serangan.destroy');

Route::get('/model-prediksi', [ModelPrediksiController::class, 'index'])->name('model-prediksi');

Route::get('/puncak-serangan', [PuncakSeranganController::class, 'index'])->name('puncak-serangan');

// CRUD: Master Data OPT
Route::get('/opt', [OptController::class, 'index'])->name('opt.index');
Route::post('/opt', [OptController::class, 'store'])->name('opt.store');
Route::put('/opt/{opt}', [OptController::class, 'update'])->name('opt.update');
Route::delete('/opt/{opt}', [OptController::class, 'destroy'])->name('opt.destroy');

// CRUD: Master Data Kecamatan
Route::get('/kecamatan', [KecamatanController::class, 'index'])->name('kecamatan.index');
Route::post('/kecamatan', [KecamatanController::class, 'store'])->name('kecamatan.store');
Route::put('/kecamatan/{kecamatan}', [KecamatanController::class, 'update'])->name('kecamatan.update');
Route::delete('/kecamatan/{kecamatan}', [KecamatanController::class, 'destroy'])->name('kecamatan.destroy');

require __DIR__.'/auth.php';
