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
        Schema::table('juego_jugador', function (Blueprint $table) {
            $table->string('rol_id', 50)->nullable()->after('jugador_id');
            $table->integer('eco_fichas')->default(12)->after('rol_id');
            $table->integer('puntuacion')->default(0)->after('eco_fichas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('juego_jugador', function (Blueprint $table) {
            $table->dropColumn(['rol_id', 'eco_fichas', 'puntuacion']);
        });
    }
};
