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
        Schema::table('juegos', function (Blueprint $table) {
            $table->string('room_code', 10)->unique()->nullable()->after('juego_id');
            $table->integer('current_turn')->default(0)->after('estado');
            $table->foreignId('current_carta_id')->nullable()->constrained('cartas', 'carta_id')->onDelete('set null')->after('current_turn');
            $table->timestamp('last_turn_at')->nullable()->after('current_carta_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->dropForeign(['current_carta_id']);
            $table->dropColumn(['room_code', 'current_turn', 'current_carta_id', 'last_turn_at']);
        });
    }
};
