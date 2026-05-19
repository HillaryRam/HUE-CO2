<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartasSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('opciones_respuesta')->truncate();
        DB::table('preguntas')->truncate();
        DB::table('cartas')->truncate();
        DB::table('anillos')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ─── ANILLOS ───────────────────────────────────────────────────────────
        $anillosData = [
            ['nombre' => 'Agua',      'orden' => 1],
            ['nombre' => 'Energía',   'orden' => 2],
            ['nombre' => 'Plástico',  'orden' => 3],
            ['nombre' => 'Pantallas', 'orden' => 4],
            ['nombre' => 'Ropa',      'orden' => 5],
        ];
        foreach ($anillosData as $a) {
            DB::table('anillos')->insert(array_merge($a, ['created_at' => now(), 'updated_at' => now()]));
        }

        // Leer los IDs reales recién insertados, en orden
        $anilloIds = DB::table('anillos')->orderBy('orden')->pluck('anillo_id')->toArray();

        // ─── PREGUNTAS POR ANILLO ──────────────────────────────────────────────
        // Cada anillo tiene 6 preguntas (una por sector/turno)
        // Mezclamos preguntas tipo 'options' (opciones), 'slider' (estimación) y 'free' (abiertas/consenso)
        $contenido = [
            // ANILLO 1 – AGUA
            [
                [
                    'texto' => '¿Qué porcentaje aproximado del agua del planeta es agua dulce disponible?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 0,
                    'rango_max' => 100,
                    'unidad' => '%',
                    'opciones' => [['1', true]]
                ],
                [
                    'texto' => '¿Cuál de estas prácticas ahorra más agua en el hogar?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Bañarse en vez de ducharse', false], ['Cerrar el grifo al cepillarse', true], ['Regar el jardín de día', false], ['Lavar a máquina a 90°C', false]]
                ],
                [
                    'texto' => '¿Qué actividad humana consume más agua dulce a nivel global?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Industria', false], ['Uso doméstico', false], ['Agricultura', true], ['Generación eléctrica', false]]
                ],
                [
                    'texto' => '¿Cuántos litros de agua se necesitan para producir 1 kg de carne de vacuno?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 1000,
                    'rango_max' => 20000,
                    'unidad' => ' L',
                    'opciones' => [['15000', true]]
                ],
                [
                    'texto' => '¿Qué tecnología de riego es más eficiente en el uso de agua?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Aspersión', false], ['Inundación', false], ['Goteo', true], ['Pulverización aérea', false]]
                ],
                [
                    'texto' => '¿Cuál es la principal causa de contaminación del agua dulce?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Lluvia ácida', false], ['Residuos industriales y agrícolas', true], ['Turismo', false], ['Pesca excesiva', false]]
                ],
            ],
            // ANILLO 2 – ENERGÍA
            [
                [
                    'texto' => '¿Cuál de estas fuentes produce menos CO₂ en su ciclo de vida?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Carbón', false], ['Gas natural', false], ['Nuclear', false], ['Solar fotovoltaica', true]]
                ],
                [
                    'texto' => '¿Qué país genera más electricidad a partir de energía eólica en proporción?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['China', false], ['Alemania', false], ['Dinamarca', true], ['EE.UU.', false]]
                ],
                [
                    'texto' => '¿Cuánto CO₂ emite una central de carbón por kWh producido (aprox.)?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 100,
                    'rango_max' => 1500,
                    'unidad' => ' g',
                    'opciones' => [['820', true]]
                ],
                [
                    'texto' => '¿Qué porcentaje de la energía mundial proviene de renovables (2023)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['5%', false], ['15%', false], ['30%', true], ['60%', false]]
                ],
                [
                    'texto' => '¿Cuál es la principal ventaja de la energía mareomotriz?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Es barata', false], ['Es predecible y constante', true], ['No necesita infraestructura', false], ['Funciona en cualquier lugar', false]]
                ],
                [
                    'texto' => 'Explica qué significa "eficiencia energética" y pon un ejemplo práctico de tu vida cotidiana.',
                    'tipo_pregunta' => 'free',
                    'opciones' => []
                ],
            ],
            // ANILLO 3 – PLÁSTICO
            [
                [
                    'texto' => '¿Cuál de estos plásticos es más fácil de reciclar habitualmente?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['PVC', false], ['LDPE', false], ['Poliestireno', false], ['PET', true]]
                ],
                [
                    'texto' => '¿Cuánto tiempo tarda en degradarse una bolsa de plástico convencional?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 50,
                    'rango_max' => 500,
                    'unidad' => ' años',
                    'opciones' => [['150', true]]
                ],
                [
                    'texto' => '¿Qué son los microplásticos? Explica de dónde provienen y cuál es su impacto ecológico.',
                    'tipo_pregunta' => 'free',
                    'opciones' => []
                ],
                [
                    'texto' => '¿Cuántos millones de toneladas de plástico acaban en el océano cada año?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['1 Mt', false], ['8 Mt', true], ['50 Mt', false], ['200 Mt', false]]
                ],
                [
                    'texto' => '¿Qué símbolo de reciclaje indica que el plástico es PET?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['3', false], ['5', false], ['1', true], ['7', false]]
                ],
                [
                    'texto' => '¿Cuál es el principal reto para reciclar plástico negro?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Es muy caro', false], ['Los sensores ópticos no lo detectan', true], ['No se puede fundir', false], ['Es tóxico', false]]
                ],
            ],
            // ANILLO 4 – PANTALLAS
            [
                [
                    'texto' => '¿Por qué los centros de datos consumen tanta energía?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Están lejos de las ciudades', false], ['Sus monitores son grandes', false], ['Refrigeración y operación de servidores', true], ['Tienen muchos trabajadores', false]]
                ],
                [
                    'texto' => '¿Qué es la "obsolescencia programada"?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Un tipo de software', false], ['Diseñar productos para que fallen pronto', true], ['Un sistema de reciclaje', false], ['Una norma de seguridad', false]]
                ],
                [
                    'texto' => '¿Cuál es la huella de carbono aproximada de fabricar un smartphone?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 10,
                    'rango_max' => 150,
                    'unidad' => ' kg CO₂',
                    'opciones' => [['70', true]]
                ],
                [
                    'texto' => '¿Qué mineral crítico se usa en baterías de litio y genera conflictos mineros?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Hierro', false], ['Cobre', false], ['Cobalto', true], ['Plata', false]]
                ],
                [
                    'texto' => '¿Cuántos residuos electrónicos (e-waste) se generan al año a nivel global?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['10 Mt', false], ['53 Mt', true], ['200 Mt', false], ['5 Mt', false]]
                ],
                [
                    'texto' => 'Explica detalladamente qué acciones cotidianas realizas para alargar la vida útil de tus ordenadores o dispositivos.',
                    'tipo_pregunta' => 'free',
                    'opciones' => []
                ],
            ],
            // ANILLO 5 – ROPA
            [
                [
                    'texto' => '¿Por qué la moda rápida ("fast fashion") es tan contaminante?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Produce poca ropa', false], ['Usa energía solar', false], ['Genera residuos y consume recursos masivamente', true], ['Emplea mucha mano de obra local', false]]
                ],
                [
                    'texto' => '¿Cuántos litros de agua se necesitan para fabricar un par de vaqueros?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 1000,
                    'rango_max' => 10000,
                    'unidad' => ' L',
                    'opciones' => [['7500', true]]
                ],
                [
                    'texto' => '¿Cuál es la fibra natural con menor huella hídrica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Algodón convencional', false], ['Lana', false], ['Lino', true], ['Seda', false]]
                ],
                [
                    'texto' => '¿Qué porcentaje de las emisiones globales de CO₂ proviene de la industria textil?',
                    'tipo_pregunta' => 'slider',
                    'rango_min' => 1,
                    'rango_max' => 50,
                    'unidad' => '%',
                    'opciones' => [['10', true]]
                ],
                [
                    'texto' => '¿Qué significa "upcycling" en moda sostenible?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Comprar ropa cara', false], ['Transformar ropa usada en algo de mayor valor', true], ['Reciclar hilos', false], ['Donar ropa', false]]
                ],
                [
                    'texto' => '¿Cuál es el país que más ropa exporta al mundo?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['Bangladesh', false], ['India', false], ['China', true], ['Vietnam', false]]
                ],
            ],
        ];

        foreach ($contenido as $anilloIndex => $preguntas) {
            $anilloId = $anilloIds[$anilloIndex];

            foreach ($preguntas as $p) {
                $cartaId = DB::table('cartas')->insertGetId([
                    'anillo_id'   => $anilloId,
                    'tipo'        => 'pregunta',
                    'texto'       => $p['texto'],
                    'tiempo'      => 30,
                    'puntos'      => 2,
                    'penalizacion'=> 1,
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ]);

                $tipoPregunta = $p['tipo_pregunta'] ?? 'options';
                $rangoMin     = $p['rango_min'] ?? null;
                $rangoMax     = $p['rango_max'] ?? null;
                $unidad       = $p['unidad'] ?? null;

                $preguntaId = DB::table('preguntas')->insertGetId([
                    'carta_id'     => $cartaId,
                    'texto'        => $p['texto'],
                    'tipo_pregunta'=> $tipoPregunta,
                    'rango_min'    => $rangoMin,
                    'rango_max'    => $rangoMax,
                    'unidad'       => $unidad,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ]);

                if (isset($p['opciones'])) {
                    foreach ($p['opciones'] as [$texto, $correcta]) {
                        DB::table('opciones_respuesta')->insert([
                            'pregunta_id' => $preguntaId,
                            'texto'       => $texto,
                            'correcta'    => $correcta,
                            'created_at'  => now(),
                            'updated_at'  => now(),
                        ]);
                    }
                }
            }
        }
    }
}