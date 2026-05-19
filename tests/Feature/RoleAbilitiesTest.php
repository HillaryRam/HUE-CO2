<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Juego;
use App\Models\Carta;
use App\Models\Anillo;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class RoleAbilitiesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->artisan('db:seed', ['--class' => 'RolesSeeder']);
        
        $anillo = Anillo::create([
            'nombre' => 'General',
            'orden' => 1
        ]);
        
        Carta::create([
            'anillo_id' => $anillo->anillo_id,
            'texto' => 'Evento de Prueba',
            'tipo' => 'evento',
            'puntos' => 0,
            'penalizacion' => 2,
            'cambio_temp' => 0.1
        ]);
        
        Carta::create([
            'anillo_id' => $anillo->anillo_id,
            'texto' => 'Pregunta de Prueba',
            'tipo' => 'pregunta',
            'puntos' => 2,
            'penalizacion' => 1,
            'cambio_temp' => 0.0
        ]);
    }

    public function test_primario_baja_temperatura_y_gasta_tokens()
    {
        $primarioRol = DB::table('roles')->where('slug', 'primario')->first();

        $juego = Juego::create([
            'room_code' => 'TEST000',
            'estado' => 'playing',
            'is_local' => true,
            'current_turn' => 1,
            'temperatura' => 0.5,
            'anillo_id' => Anillo::first()->anillo_id
        ]);
        $juego->current_rol_id = $primarioRol->rol_id;
        $juego->save();
        
        $part1 = \App\Models\Participante::create(['usuario' => 'p1']);
        
        DB::table('juego_participante')->insert([
            'juego_id' => $juego->juego_id,
            'participante_id' => $part1->participante_id,
            'rol_id' => $primarioRol->rol_id,
            'eco_fichas' => 10,
            'puntuacion' => 0
        ]);

        $response = $this->postJson("/api/game/TEST000/habilidad", [
            'participante_id' => $part1->participante_id,
            'slug' => 'primario'
        ]);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        $juego->refresh();
        $this->assertEquals(0.3, round($juego->temperatura, 1));
        
        $participacion = DB::table('juego_participante')->where('participante_id', 1)->first();
        $this->assertEquals(7, $participacion->eco_fichas); // Tenía 10, gasta 3
    }
    
    public function test_publico_bloquea_evento()
    {
        $publicoRol = DB::table('roles')->where('slug', 'publico')->first();

        $juego = Juego::create([
            'room_code' => 'TEST001',
            'estado' => 'playing',
            'is_local' => true,
            'current_turn' => 1,
            'temperatura' => 0.5,
            'anillo_id' => Anillo::first()->anillo_id,
            'current_carta_id' => Carta::where('tipo', 'evento')->first()->carta_id
        ]);
        $juego->current_rol_id = $publicoRol->rol_id;
        $juego->save();
        
        $part2 = \App\Models\Participante::create(['usuario' => 'p2']);
        
        DB::table('juego_participante')->insert([
            'juego_id' => $juego->juego_id,
            'participante_id' => $part2->participante_id,
            'rol_id' => $publicoRol->rol_id,
            'eco_fichas' => 10,
            'puntuacion' => 0
        ]);

        $response = $this->postJson("/api/game/TEST001/habilidad", [
            'participante_id' => $part2->participante_id,
            'slug' => 'publico'
        ]);

        $response->assertStatus(200);
        
        // El flag debería estar en caché
        $isBlocked = Cache::has("juego_{$juego->juego_id}_event_blocked_t1");
        $this->assertTrue($isBlocked);
    }
}
