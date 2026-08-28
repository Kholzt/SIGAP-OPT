<?php

use App\Services\StatusEndemisService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('app:calculate-status-endemis', function (StatusEndemisService $service) {
    $this->info('Menghitung status endemis...');
    $service->kalkulateStatusEndemis();
    $this->info('Kalkulasi status endemis selesai.');
})->purpose('Hitung ulang status endemis berdasarkan histori serangan');
