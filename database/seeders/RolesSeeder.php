<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['nombre' => 'Industria Textil', 'habilidades' => 'Reduce el impacto de cartas de Ropa. Puede reciclar materiales.'],
            ['nombre' => 'Ciencia e I+D', 'habilidades' => 'Puede neutralizar una carta negativa por turno. Bonus en cartas de Datos.'],
            ['nombre' => 'Gigantes Tech', 'habilidades' => 'Gestiona cartas de Datos y Energía con ventaja. Puede compartir recursos.'],
            ['nombre' => 'Sector Primario', 'habilidades' => 'Reduce impacto en cartas de Agua. Genera eco-fichas extra al acertar.'],
            ['nombre' => 'Sector Público', 'habilidades' => 'Puede bloquear una carta de evento por partida. Bonus en coordinación.'],
            ['nombre' => 'Ciudadanía', 'habilidades' => 'Voto extra en decisiones grupales. Puede redistribuir eco-fichas.'],
        ]);
    }
}