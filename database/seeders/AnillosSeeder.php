<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnillosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('anillos')->insert([
            ['nombre' => 'Agua', 'orden' => 1],
            ['nombre' => 'Plástico', 'orden' => 2],
            ['nombre' => 'Datos', 'orden' => 3],
            ['nombre' => 'Energía', 'orden' => 4],
            ['nombre' => 'Ropa', 'orden' => 5],
        ]);
    }
}