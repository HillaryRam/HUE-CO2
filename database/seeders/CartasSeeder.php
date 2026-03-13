<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartasSeeder extends Seeder
{
    public function run(): void
    {
        $cartas = [
            // AGUA
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Qué porcentaje del agua del planeta es dulce y accesible?', 'tiempo' => 30],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Cuántos litros de agua se necesitan para producir 1kg de carne de vacuno?', 'tiempo' => 30],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Sequía extrema en la región. Todos los jugadores pierden 2 eco-fichas.', 'tiempo' => null],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Nuevo sistema de filtración instalado. El equipo gana 3 eco-fichas.', 'tiempo' => null],
            // PLÁSTICO
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Cuántos años tarda una botella de plástico en descomponerse?', 'tiempo' => 30],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Qué cantidad de plástico acaba en los océanos cada año?', 'tiempo' => 30],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Vertido de microplásticos detectado. La temperatura global sube 1 grado.', 'tiempo' => null],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Campaña de reciclaje exitosa. El equipo gana 2 eco-fichas.', 'tiempo' => null],
            // DATOS
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Qué porcentaje del consumo eléctrico mundial representa internet?', 'tiempo' => 30],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Cuánto CO2 emite un email con adjunto grande?', 'tiempo' => 30],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'Centro de datos sin energía renovable construido. Temperatura sube 1 grado.', 'tiempo' => null],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'IA optimiza la red eléctrica. El equipo ahorra 3 eco-fichas.', 'tiempo' => null],
            // ENERGÍA
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué fuente de energía renovable produce más electricidad en el mundo?', 'tiempo' => 30],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Cuánto tiempo tarda la luz solar en llegar a la Tierra?', 'tiempo' => 30],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Apagón en la red eléctrica. Todos pierden 1 eco-ficha.', 'tiempo' => null],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Parque eólico inaugurado. La temperatura baja 1 grado.', 'tiempo' => null],
            // ROPA
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Cuántas prendas de ropa produce la industria fast fashion al año?', 'tiempo' => 30],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Qué porcentaje de la contaminación de agua proviene de la industria textil?', 'tiempo' => 30],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Nueva colección fast fashion lanzada. Temperatura sube 1 grado.', 'tiempo' => null],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Movimiento de ropa de segunda mano viral. El equipo gana 2 eco-fichas.', 'tiempo' => null],
        ];

        DB::table('cartas')->insert($cartas);

        $preguntas = [
            1 => [
                'texto' => '¿Qué porcentaje del agua del planeta es dulce y accesible?',
                'opciones' => [
                    ['texto' => 'Menos del 1%', 'correcta' => true],
                    ['texto' => '10%', 'correcta' => false],
                    ['texto' => '25%', 'correcta' => false],
                    ['texto' => '50%', 'correcta' => false],
                ],
            ],
            2 => [
                'texto' => '¿Cuántos litros de agua se necesitan para producir 1kg de carne de vacuno?',
                'opciones' => [
                    ['texto' => '500 litros', 'correcta' => false],
                    ['texto' => '2.000 litros', 'correcta' => false],
                    ['texto' => '15.000 litros', 'correcta' => true],
                    ['texto' => '50.000 litros', 'correcta' => false],
                ],
            ],
            5 => [
                'texto' => '¿Cuántos años tarda una botella de plástico en descomponerse?',
                'opciones' => [
                    ['texto' => '10 años', 'correcta' => false],
                    ['texto' => '50 años', 'correcta' => false],
                    ['texto' => '100 años', 'correcta' => false],
                    ['texto' => '450 años', 'correcta' => true],
                ],
            ],
            9 => [
                'texto' => '¿Qué porcentaje del consumo eléctrico mundial representa internet?',
                'opciones' => [
                    ['texto' => '1%', 'correcta' => false],
                    ['texto' => '5%', 'correcta' => false],
                    ['texto' => '10%', 'correcta' => true],
                    ['texto' => '25%', 'correcta' => false],
                ],
            ],
            13 => [
                'texto' => '¿Qué fuente de energía renovable produce más electricidad en el mundo?',
                'opciones' => [
                    ['texto' => 'Solar', 'correcta' => false],
                    ['texto' => 'Eólica', 'correcta' => false],
                    ['texto' => 'Hidráulica', 'correcta' => true],
                    ['texto' => 'Geotérmica', 'correcta' => false],
                ],
            ],
            17 => [
                'texto' => '¿Cuántas prendas de ropa produce la industria fast fashion al año?',
                'opciones' => [
                    ['texto' => '10.000 millones', 'correcta' => false],
                    ['texto' => '50.000 millones', 'correcta' => false],
                    ['texto' => '100.000 millones', 'correcta' => true],
                    ['texto' => '200.000 millones', 'correcta' => false],
                ],
            ],
        ];

        foreach ($preguntas as $carta_id => $pregunta) {
            $pregunta_id = DB::table('preguntas')->insertGetId([
                'carta_id' => $carta_id,
                'texto' => $pregunta['texto'],
            ]);

            foreach ($pregunta['opciones'] as $opcion) {
                DB::table('opciones_respuesta')->insert([
                    'pregunta_id' => $pregunta_id,
                    'texto' => $opcion['texto'],
                    'correcta' => $opcion['correcta'],
                ]);
            }
        }
    }
}