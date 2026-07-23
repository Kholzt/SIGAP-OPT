<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('histori_serangan', function (Blueprint $table) {
            $table->id();
            $table->integer('bulan');
            $table->integer('tahun');
            $table->foreignId('kecamatan_id')->references('id')->on('kecamatan')->onDelete('restrict');
            $table->foreignId('opt_id')->references('id')->on('opt')->onDelete('restrict');
            $table->float('jumlah_serangan', 10, 2);
            $table->string('musim_tanaman');
            $table->float('luas_puso', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histori_serangans');
    }
};
