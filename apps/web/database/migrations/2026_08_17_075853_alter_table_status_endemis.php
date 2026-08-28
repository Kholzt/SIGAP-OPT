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
        Schema::table('status_endemis', function (Blueprint $table) {
            $table->unique(['opt_id', 'kecamatan_id', 'musim_tanaman']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('status_endemis', function (Blueprint $table) {
            //
        });
    }
};
