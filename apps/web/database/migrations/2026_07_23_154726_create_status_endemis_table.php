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
        Schema::create('status_endemis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opt_id')->references('id')->on('opt')->onDelete('cascade');
            $table->foreignId('kecamatan_id')->references('id')->on('kecamatan')->onDelete('cascade');
            $table->string("musim_tanaman",10);
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_endemis');
    }
};
