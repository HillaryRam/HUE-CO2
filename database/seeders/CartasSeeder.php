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
            ['nombre' => 'Agua', 'orden' => 1],
            ['nombre' => 'Energía', 'orden' => 2],
            ['nombre' => 'Plástico', 'orden' => 3],
            ['nombre' => 'Pantallas', 'orden' => 4],
            ['nombre' => 'Ropa', 'orden' => 5],
        ];
        foreach ($anillosData as $a) {
            DB::table('anillos')->insert(array_merge($a, ['created_at' => now(), 'updated_at' => now()]));
        }

        // Leer los IDs reales recién insertados, en orden
        $anilloIds = DB::table('anillos')->orderBy('orden')->pluck('anillo_id')->toArray();

        // ─── PREGUNTAS POR ANILLO ──────────────────────────────────────────────
        // Cada anillo tiene 12 preguntas de las cuales 5 son Crisis Climáticas Extremas
        $contenido = [
            // ANILLO 1 – AGUA
            [
                [
                    'texto' => 'CRISIS: Megasequía Histórica (Acuíferos al Límite)',
                    'texto_pregunta' => 'Una sequía persistente reduce las reservas subterráneas a mínimos críticos. Para valorar la gravedad, ¿qué porcentaje aproximado de toda el agua de la Tierra es agua dulce disponible para el consumo humano?',
                    'tipo_pregunta' => 'slider',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'rango_min' => 0,
                    'rango_max' => 100,
                    'unidad' => '%',
                    'opciones' => [['1', true]]
                ],
                [
                    'texto' => 'CRISIS: Alerta por Estrés Hídrico Urbano',
                    'texto_pregunta' => 'Las grandes metrópolis declaran el "Día Cero" y se preparan para cortar el suministro de agua corriente por falta de reservas. ¿Cuál de estas prácticas en el hogar tiene el mayor impacto directo para ahorrar agua dulce?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Bañarse en vez de ducharse', false], ['Cerrar el grifo al cepillarse los dientes', true], ['Regar el jardín a pleno mediodía', false], ['Lavar la ropa a máquina a 90°C', false]]
                ],
                [
                    'texto' => 'CRISIS: Colapso Alimentario por Sequía Agrícola',
                    'texto_pregunta' => 'La falta prolongada de lluvias destruye campos enteros de cultivo, amenazando la soberanía alimentaria del país. ¿Qué actividad humana es la responsable de consumir la mayor proporción de agua dulce a nivel global?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Industria pesada', false], ['Uso doméstico e higiene', false], ['Agricultura y riego', true], ['Generación y refrigeración eléctrica', false]]
                ],
                [
                    'texto' => 'CRISIS: Desierto en Zonas de Pastoreo',
                    'texto_pregunta' => 'La ganadería intensiva seca ríos completos para mantener la producción cárnica, acelerando la desertificación del suelo. ¿Cuántos litros de agua dulce se necesitan aproximadamente para producir tan solo 1 kg de carne de vacuno?',
                    'tipo_pregunta' => 'slider',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
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
                    'texto' => 'CRISIS: Contaminación Crítica de Cuencas Fluviales',
                    'texto_pregunta' => 'Vertidos industriales y agrícolas incontrolados contaminan el principal río de la región, dejándolo inservible. ¿Cuál es la principal fuente de contaminación química que destruye el agua dulce global?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Lluvia ácida natural', false], ['Residuos industriales y escorrentía agrícola', true], ['Turismo en ríos y lagos', false], ['Actividades de pesca excesiva', false]]
                ],
                [
                    'texto' => "La ducha musical\n\nTe duchas escuchando música. Pones una canción de 5 minutos y cuando acaba, sales. Tu hermano se ducha 15 minutos cada día. La ducha gasta unos 10 litros por minuto.",
                    'texto_pregunta' => '¿Cuántos litros de agua ahorra al mes quien se ducha 5 minutos en vez de 15?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['1000 litros', false],
                        ['5000 litros', false],
                        ['3.000 litros', true],
                        ['4200 litros', false]
                    ]
                ],
                [
                    'texto' => "El precio de agua de tus vaqueros\n\nEstás en una tienda y ves unos vaqueros nuevos muy baratos. El cartel dice \"OFERTA: 15 €\". Tu amigo te dice: \"¡Están tirados! Cómpralos.\" Tú recuerdas que has leído algo sobre el agua que gasta fabricar ropa.",
                    'texto_pregunta' => '¿Cuántos litros de agua se necesitan aproximadamente para fabricar un par de vaqueros de algodón?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['50-100 litros', false],
                        ['500-1000 litros', false],
                        ['7.000–10.000 litros', true],
                        ['200-750 litros', false]
                    ]
                ],
                [
                    'texto' => "El grifo que nunca duerme\n\nTe lavas los dientes con el grifo abierto durante 2 minutos, dos veces al día. Tu vecina lo cierra mientras se cepilla. El grifo típico suelta unos 6 litros por minuto. Al año suponen 8.760 L",
                    'texto_pregunta' => '¿Cuántos litros ahorra al año quien cierra el grifo al cepillarse los dientes (2 veces/día)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['4.380 litros', true],
                        ['1.420 litros', false],
                        ['3690 litros', false],
                        ['2524 litros', false]
                    ]
                ],
                [
                    'texto' => "El agua embotellada vs. el grifo\n\nEn casa de tu amigo solo beben agua embotellada \"porque está más rica\". En tu casa bebéis agua del grifo filtrada con un jarro. Alguien del grupo dice que el agua embotellada es más sostenible \"porque viene en botellas pequeñas\".",
                    'texto_pregunta' => '¿Cuántos litros de agua se necesitan para producir 1 litro de agua embotellada (incluyendo la fabricación del plástico)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['1 litro (lo mismo)', false],
                        ['hasta 2 litros', false],
                        ['menos de 1 litro', false],
                        ['hasta 7 litros', true]
                    ]
                ],
                [
                    'texto' => "Streaming y agua\n\nEstás viendo una serie en streaming durante 3 horas seguidas. Un amigo te dice que eso también gasta agua, no solo electricidad. Te quedas sorprendido.",
                    'texto_pregunta' => '¿Por qué el streaming o el uso de internet consume agua indirectamente?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Porque los cables submarinos necesitan estar mojados', false],
                        ['Porque los centros de datos usan agua para refrigerarse', true],
                        ['Porque tu pantalla emite vapor de agua', false],
                        ['El streaming no tiene ninguna relación con el agua', false]
                    ]
                ],
                [
                    'texto' => "El día más sostenible de tu vida\n\nImagina que tienes que diseñar el día más sostenible posible desde que te levantas hasta que te acuestas. Ducha, ropa, comida, móvil, estudio…",
                    'texto_pregunta' => '¿Qué combinación de hábitos matutinos tiene la menor huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Ducha de 15 min, ropa nueva de algodón, café en cápsula, móvil en carga toda la noche', false],
                        ['Ducha de 5 min, ropa de segunda mano o reutilizada, café en cafetera de émbolo, móvil desenchufado al 80 %', true],
                        ['No ducharse, llevar ropa sintética, café instantáneo en botella de plástico, móvil en modo avión', false],
                        ['Baño de bañera, ropa de lino nuevo, zumo en tetrabrik, móvil apagado', false]
                    ]
                ],
            ],
            // ANILLO 2 – ENERGÍA
            [
                [
                    'texto' => 'CRISIS: Tormentas Extremas por Calentamiento Atmosférico',
                    'texto_pregunta' => 'El exceso de CO₂ en la atmósfera calienta los océanos, desatando huracanes y ciclones de fuerza destructiva histórica en las costas. ¿Cuál de estas fuentes produce la menor cantidad de CO₂ equivalente en todo su ciclo de vida?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Carbón convencional', false], ['Gas natural de ciclo combinado', false], ['Energía nuclear', false], ['Energía solar fotovoltaica', true]]
                ],
                [
                    'texto' => '¿Qué país genera más electricidad a partir de energía eólica en proporción?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [['China', false], ['Alemania', false], ['Dinamarca', true], ['EE.UU.', false]]
                ],
                [
                    'texto' => 'CRISIS: Sopa de Carbón (Emergencia Atmosférica)',
                    'texto_pregunta' => 'El desabastecimiento obliga a activar centrales de carbón obsoletas que cubren la ciudad con una espesa niebla altamente tóxica. ¿Cuánto CO₂ emite una central térmica de carbón por cada kWh de electricidad producido?',
                    'tipo_pregunta' => 'slider',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
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
                [
                    'texto' => 'CRISIS: Apagón General (Sobrecarga de Red)',
                    'texto_pregunta' => "En tu salón hay 6 aparatos en modo standby: televisor, consola, router, cargador de móvil, microondas y altavoz. Tu padre dice que \"en standby no gastan\". Una ola de calor masiva dispara el uso de aire acondicionado y sobrecarga la red de distribución eléctrica nacional.\n\n¿Qué ocurre realmente cuando un aparato está en modo standby durante esta crisis?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['No consume nada de electricidad si no se enciende la pantalla', false],
                        ['Consume una pequeña cantidad de energía de forma continua, sumando un gasto y una carga significativos al año', true],
                        ['Se recarga internamente para cuando decidas encenderlo', false],
                        ['Solo consume energía si se conecta a una red wifi', false]
                    ]
                ],
                [
                    'texto' => 'CRISIS: Degradación Acelerada de Dispositivos',
                    'texto_pregunta' => "Dejas el móvil cargando toda la noche, aunque se llena al 100 % en 2 horas. Tu amiga lo desenchufa cuando llega al máximo. Las altas temperaturas veraniegas degradan las celdas de litio de millones de teléfonos, acortando su vida útil.\n\n¿Qué consecuencias tiene cargar el móvil más horas de las necesarias?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Ninguna, los cargadores modernos desconectan totalmente el flujo', false],
                        ['Gasta energía en forma de calor y degrada la batería de forma prematura', true],
                        ['Optimiza el rendimiento del procesador de última generación', false],
                        ['Solo afecta de manera negativa si el cable no es oficial de la marca', false]
                    ]
                ],
                [
                    'texto' => 'CRISIS: Ciclo Térmico Excesivo (Lavados Calientes)',
                    'texto_pregunta' => "Tu madre lava la ropa siempre a 60 °C \"para que quede limpia de verdad\". Tú lees que lavar a 30 °C ahorra mucha energía y que la mayoría de detergentes modernos funcionan bien en frío. El uso ineficiente de calentadores de agua domésticos satura la huella de carbono de los hogares.\n\n¿Cuánta energía se ahorra aproximadamente lavando la ropa a 30°C en vez de a 60°C?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Aproximadamente un 5 %', false],
                        ['Un 20 % de ahorro total', false],
                        ['Hasta un 60 % de energía de calentamiento', true],
                        ['No hay ninguna diferencia real en el consumo del electrodoméstico', false]
                    ]
                ],
                [
                    'texto' => "La luz que no necesitas\n\nSales de tu habitación y dejas la luz encendida. Son las 3 de la tarde y entra mucha luz natural. Tu compañero de piso dice que \"una bombilla LED no gasta casi nada\".",
                    'texto_pregunta' => '¿Qué afirmación es correcta sobre las bombillas LED encendidas innecesariamente?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Las LEDs no consumen nada si son de bajo consumo', false],
                        ['Aunque consumen poco individualmente, dejar muchas encendidas innecesariamente suma un gasto real de energía y emisiones', true],
                        ['La luz natural gasta más que una LED', false],
                        ['Da igual, porque en España la electricidad es renovable al 100 %', false]
                    ]
                ],
                [
                    'texto' => "La secadora que devora energía\n\nEn invierno, tu familia usa la secadora cada vez que lava la ropa porque \"el tendedero en casa moja el ambiente\". Usáis la secadora 4 veces por semana.",
                    'texto_pregunta' => '¿Qué alternativa reduce más la huella energética al secar la ropa?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Usar la secadora en modo rápido a baja temperatura', false],
                        ['Tender la ropa al aire libre o en un tendedero interior ventilado siempre que sea posible', true],
                        ['Secar la ropa en el radiador con la calefacción al máximo', false],
                        ['Comprar ropa de secado rápido sintético', false]
                    ]
                ],
                [
                    'texto' => "La cadena invisible\n\nDecides comprar una prenda de fast fashion online, pagarla con el móvil, que te la envíen a casa en 24 horas y lavarla cuando llegue. Sin saberlo, has activado una cadena de impactos.",
                    'texto_pregunta' => '¿Cuántas categorías de recursos se han visto afectadas en este proceso?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Solo ropa y transporte', false],
                        ['Ropa, agua, energía y datos digitales', true],
                        ['Solo electricidad y agua', false],
                        ['Solo el transporte y el plástico del embalaje', false]
                    ]
                ],
            ],
            // ANILLO 3 – PLÁSTICO
            [
                [
                    'texto' => 'CRISIS: Incendio en Vertedero de Plásticos',
                    'texto_pregunta' => 'Un vertedero ilegal de plásticos industriales arde en llamas, liberando nubes de gases sumamente tóxicos y CO₂. ¿Cuál de estos plásticos habituales es, por su composición química, el más fácil y seguro de reciclar?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Policloruro de vinilo (PVC)', false], ['Polietileno de baja densidad (LDPE)', false], ['Poliestireno (PS)', false], ['Tereftalato de polietileno (PET)', true]]
                ],
                [
                    'texto' => 'CRISIS: Siglos de Basura (Degradación Infinita)',
                    'texto_pregunta' => 'La acumulación desmedida de plásticos sintéticos obstruye cursos fluviales e invade campos agrícolas. ¿Cuánto tiempo estimado tarda en degradarse por completo una bolsa de plástico convencional en la naturaleza?',
                    'tipo_pregunta' => 'slider',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
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
                    'texto' => 'CRISIS: Colapso de Ecosistemas por Microplásticos',
                    'texto_pregunta' => 'Los océanos se asfixian con la marea plástica, diezmando la fauna y filtrándose en la fauna marina. ¿Cuántos millones de toneladas de plásticos terminan flotando en el mar cada año?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['1 millón de toneladas', false], ['8 millones de toneladas', true], ['50 millones de toneladas', false], ['200 millones de toneladas', false]]
                ],
                [
                    'texto' => 'CRISIS: Marea de Aditivos Químicos en Envases',
                    'texto_pregunta' => 'Envases no regulados filtran aditivos sintéticos al medio ambiente acuático. ¿Qué número o código de símbolo de reciclaje universal indica que un plástico es de tipo PET?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Código de reciclaje 3', false], ['Código de reciclaje 5', false], ['Código de reciclaje 1', true], ['Código de reciclaje 7', false]]
                ],
                [
                    'texto' => 'CRISIS: Colapso del Sistema de Clasificación Óptica',
                    'texto_pregunta' => 'Los sensores ópticos de las plantas de reciclaje fallan en su tarea, obligando a enterrar toneladas de materiales utilizables. ¿Cuál es el principal reto técnico para reciclar el plástico de color negro?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Su fundición resulta demasiado costosa', false], ['Los sensores ópticos de infrarrojos no lo detectan', true], ['Es incapaz de derretirse de nuevo', false], ['Es altamente tóxico por sí mismo', false]]
                ],
                [
                    'texto' => "La botella que viaja sola\n\nQuedas con tus amigos en el parque. Tienes sed y el único chiringuito cercano solo vende agua en botellas de plástico de un solo uso. Tu compañero dice: \"Total, es solo una botella.\"",
                    'texto_pregunta' => '¿Cuál es la mejor decisión en este momento?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar la botella, total ya estás allí', false],
                        ['Aguantar la sed hasta llegar a casa', false],
                        ['Llevar siempre una botella reutilizable en la mochila', true],
                        ['Comprar la botella y prometer reciclarla', false]
                    ]
                ],
                [
                    'texto' => "El plástico tiene sed\n\nEn clase de ciencias ves que fabricar 1 kg de plástico virgen consume aproximadamente 2 litros de agua solo en el proceso de enfriamiento. Tu profesora os pregunta: \"¿Qué conexión hay entre el plástico y el agua?\"",
                    'texto_pregunta' => '¿Qué afirmación es correcta?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['El plástico no tiene ninguna relación con el consumo de agua', false],
                        ['Fabricar plástico consume agua, por lo que reducir plástico también ahorra agua', true],
                        ['Reciclar plástico gasta más agua que fabricarlo nuevo', false],
                        ['El plástico proviene del agua de los océanos', false]
                    ]
                ],
                [
                    'texto' => "¿Reciclar o no reciclar? Esa es la cuestión\n\nAcabas de comer un yogur. El envase tiene restos de yogur. Tu hermano dice que tirarlo al amarillo así está bien. Tu madre dice que hay que lavarlo antes.",
                    'texto_pregunta' => '¿Qué debes hacer con el envase del yogur antes de reciclarlo?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Tirarlo directamente al contenedor amarillo sin limpiarlo', false],
                        ['Aclararlo brevemente con agua para retirar los restos y luego reciclarlo', true],
                        ['Tirarlo a la basura orgánica porque tiene restos de alimento', false],
                        ['Dejarlo en el fregadero indefinidamente', false]
                    ]
                ],
                [
                    'texto' => "La ropa que bebe plástico\n\nLees en una revista que muchas prendas de ropa deportiva están hechas de poliéster, que en realidad es plástico. Tu amiga dice: \"Pensaba que la ropa no tenía nada que ver con el plástico.\"",
                    'texto_pregunta' => '¿Qué porcentaje aproximado de la ropa mundial está fabricada con fibras sintéticas (plástico)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Menos del 10 %', false],
                        ['Alrededor del 20 %', false],
                        ['Más del 60 %', true],
                        ['Exactamente el 50 %', false]
                    ]
                ],
                [
                    'texto' => "El plástico también es digital\n\nTu móvil se ha roto. La pantalla está agrietada pero funciona bien. La tienda de reparación te dice que puede arreglarlo por 60 €. Un modelo nuevo cuesta 300 €. Tu primo te dice: \"Cómprate uno nuevo, total los móviles llevan plástico de todos modos.\"",
                    'texto_pregunta' => '¿Qué decisión tiene menor huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar un móvil nuevo de última generación', false],
                        ['Reparar el móvil actual', true],
                        ['Tirar el móvil roto a la papelera y pedir otro prestado', false],
                        ['Comprar un móvil de segunda mano de alta gama', false]
                    ]
                ],
                [
                    'texto' => "Tu huella, tu poder\n\nLlegas al final del juego. Has aprendido que plástico, agua, energía, pantallas y ropa están conectados. Ahora tienes que elegir UN solo cambio de hábito que adoptarías a partir de hoy.",
                    'texto_pregunta' => '¿Cuál de estos cambios tiene el mayor impacto acumulado en el largo plazo si lo mantiene un adolescente durante toda su vida?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Apagar la luz al salir de una habitación', false],
                        ['No comprar ropa nueva durante 6 meses al año y optar por intercambio o segunda mano', true],
                        ['Reducir el tiempo de pantalla 15 minutos al día', false],
                        ['Reciclar siempre el plástico correctamente', false]
                    ]
                ],
            ],
            // ANILLO 4 – PANTALLAS
            [
                [
                    'texto' => 'CRISIS: Sequía en Centros de Datos Urbanos',
                    'texto_pregunta' => 'Los macrocomplejos de servidores evaporan a diario millones de litros de agua dulce urbana para su refrigeración, dejando secos los hogares locales. ¿Por qué el funcionamiento de internet consume tanta energía y recursos físicos de climatización?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Los centros de datos se ubican lejos de los núcleos urbanos', false], ['Sus pantallas administrativas son gigantescas', false], ['Operación ininterrumpida de servidores y sistemas de refrigeración', true], ['Requieren una plantilla de mantenimiento enorme', false]]
                ],
                [
                    'texto' => 'CRISIS: Basura Tecnológica en el Tercer Mundo',
                    'texto_pregunta' => 'Millones de toneladas de pantallas y componentes electrónicos obsoletos y altamente tóxicos saturan vertederos de países del tercer mundo. ¿Qué se entiende por "obsolescencia programada"?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Un software especial para optimizar el rendimiento', false], ['El diseño de productos planificado deliberadamente para fallar pronto', true], ['Un marco legislativo para fomentar el reciclaje electrónico', false], ['Un estándar técnico internacional de seguridad industrial', false]]
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
                    'texto' => 'CRISIS: Extracción de Minerales de Sangre',
                    'texto_pregunta' => 'La minería ilegal en zonas en conflicto explota a trabajadores e inhabilita ecosistemas selváticos enteros para alimentar nuestra demanda electrónica. ¿Qué mineral crítico es vital para las baterías y genera estas guerras mineras?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Mineral de hierro convencional', false], ['Cobre electrolítico', false], ['Cobalto y coltán', true], ['Plata purificada', false]]
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
                [
                    'texto' => 'CRISIS: Servidores Hirviendo (Ola de Calor Digital)',
                    'texto_pregunta' => "Tienes la bandeja de entrada del correo con 4.000 emails sin leer, muchos con adjuntos. Tu amiga tiene su bandeja siempre ordenada y borra lo que no necesita. Le dices que \"los emails no contaminan\". Los grandes centros de servidores globales operan a temperaturas límite por el uso ininterrumpido del streaming y la nube.\n\n¿Por qué los emails almacenados en la nube tienen una huella ecológica?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Provoca vibraciones de alta frecuencia en la infraestructura terrestre', false],
                        ['Obliga a mantener activos servidores físicos que consumen refrigeración y energía 24/7', true],
                        ['Los correos electrónicos se autodegradan liberando calor químico', false],
                        ['Solo ocurre si el email posee un archivo de más de 10 MB adjunto', false]
                    ]
                ],
                [
                    'texto' => 'CRISIS: Colapso de Redes por Spam y Tráfico Inútil',
                    'texto_pregunta' => "Estás viendo una serie en tu móvil mientras vas en el autobús. La plataforma te pregunta si quieres ver en calidad 4K, HD o SD. Eliges 4K \"porque queda mejor\". La masiva transmisión de datos sin valor genera una demanda energética y térmica que pone en riesgo de colapso a las infraestructuras de internet.\n\n¿Cuánta más energía consume transmitir vídeo en 4K respecto a SD (baja resolución)?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Gasta lo mismo, la resolución no afecta en absoluto a los servidores', false],
                        ['Un 10 % extra en el peor de los casos', false],
                        ['Multiplica hasta por 4 los datos enviados, elevando exponencialmente el calor y energía en la red', true],
                        ['Solo afecta al consumo de los receptores finales, no a la red global', false]
                    ]
                ],
                [
                    'texto' => "El móvil de segunda mano\n\nNecesitas un móvil nuevo. Un amigo te ofrece su antiguo iPhone en perfecto estado por 150 €. En la tienda hay uno nuevo de gama media por 300 €. Tus padres dicen que \"lo nuevo es más fiable\".",
                    'texto_pregunta' => '¿Cuál de estas opciones tiene la menor huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar el móvil nuevo de gama media', false],
                        ['Pedir uno a tus padres como regalo de cumpleaños', false],
                        ['Comprar el móvil de segunda mano', true],
                        ['Comprar el más caro porque dura más', false]
                    ]
                ],
                [
                    'texto' => "El centro de datos que nadie ve\n\nSubes 50 fotos a Instagram en un día. Tu primo te dice que \"las fotos en la nube no pesan nada\". Tú has leído algo sobre centros de datos y no estás de acuerdo.",
                    'texto_pregunta' => '¿Qué ocurre cuando guardas datos en la nube?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Los datos flotan en el aire y no consumen recursos físicos', false],
                        ['Se almacenan en servidores físicos que consumen energía y agua continuamente', true],
                        ['Se comprimen automáticamente para no consumir recursos', false],
                        ['Solo consumen recursos cuando los consultas, no cuando los almacenas', false]
                    ]
                ],
                [
                    'texto' => "La moda que viaja por pantalla\n\nVes en TikTok un vídeo de un influencer con una camiseta nueva. La buscas online y la encuentras en una web de fast fashion por 4 €. La compras por impulso junto con otras 3 prendas.",
                    'texto_pregunta' => '¿Qué efecto tienen las plataformas digitales y las redes sociales en el consumo de moda?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Ninguno, la gente compra lo mismo que antes de internet', false],
                        ['Reducen el consumo porque permiten comparar precios', false],
                        ['Estimulan el consumo impulsivo y aceleran los ciclos de la moda, aumentando la generación de residuos textiles', true],
                        ['Solo afectan a adolescentes mayores de 18 años', false]
                    ]
                ],
                [
                    'texto' => "El bucle digital-material\n\nPasas 6 horas al día en pantallas (móvil, tablet, portátil). Un amigo te dice que \"lo digital no contamina como lo físico\". Pero tú has aprendido que hay conexiones ocultas.",
                    'texto_pregunta' => '¿Cuál de las siguientes afirmaciones describe mejor el impacto ambiental de un uso intensivo de pantallas?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['El uso digital es completamente neutro en carbono', false],
                        ['Solo contamina si usas un dispositivo antiguo', false],
                        ['El uso intensivo de dispositivos aumenta el consumo energético, acelera el reemplazo de aparatos (más plástico y residuos), y alimenta centros de datos que consumen agua y energía', true],
                        ['El impacto solo es relevante para empresas, no para usuarios individuales', false]
                    ]
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
                    'texto' => 'CRISIS: Sequía de Vaqueros en Cuencas de Algodón',
                    'texto_pregunta' => 'El cultivo intensivo de algodón de baja calidad seca lagos e inunda regiones en una salinidad yerma. ¿Cuántos litros de agua potable se consumen en la cadena para confeccionar tan solo un par de pantalones vaqueros?',
                    'tipo_pregunta' => 'slider',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
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
                    'texto' => 'CRISIS: La Huella Gigante del E-commerce Textil',
                    'texto_pregunta' => 'Millones de camiones y aviones distribuyen devoluciones gratuitas de ropa express, colapsando el tráfico y disparando emisiones globales. ¿Qué país exporta actualmente la mayor parte del flujo de moda rápida mundial?',
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [['Bangladesh', false], ['India', false], ['China', true], ['Vietnam', false]]
                ],
                [
                    'texto' => 'CRISIS: La Montaña Textil del Desierto de Atacama',
                    'texto_pregunta' => "Tienes 60 prendas en el armario pero sientes que \"no tienes nada que ponerte\". Cada temporada compras entre 5 y 10 prendas nuevas y donas o tiras las viejas. Tu abuela dice que ella tenía 10 prendas y \"se las arreglaba perfectamente\". Millones de prendas sintéticas baratas e inútiles se acumulan en montañas gigantescas a cielo abierto en desiertos sudamericanos, liberando plásticos al suelo.\n\n¿Qué estrategia reduce más la huella ecológica de tu armario ante esta crisis?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Adquirir moda express únicamente en periodos de rebajas oficiales', false],
                        ['Donar la totalidad de tu ropa antigua para limpiar tu armario', false],
                        ['Comprar menos ropa, elegir mayor durabilidad y remendar los pequeños desperfectos', true],
                        ['Disminuir la cantidad de lavados semanales de tu calzado y ropa', false]
                    ]
                ],
                [
                    'texto' => "Lavar menos, vivir mejor\n\nLavas los vaqueros después de cada uso \"por higiene\". Tu amigo los lava cada 3-4 usos si no están visiblemente sucios.",
                    'texto_pregunta' => "¿Con qué frecuencia recomienda Levi's (la marca de vaqueros) lavar los jeans?",
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Después de cada uso', false],
                        ['Una vez por semana como máximo', false],
                        ['Solo cuando están realmente sucios, lo menos posible (cada 10 usos o más)', true],
                        ['Nunca, los vaqueros son autolimpiantes', false]
                    ]
                ],
                [
                    'texto' => 'CRISIS: Microfibras Sintéticas en Agua Potable',
                    'texto_pregunta' => "Lavas un polar sintético que compraste en una tienda de fast fashion. Tu madre dice que los polares son ecológicos \"porque se fabrican con plástico reciclado\". Cada lavado de prendas acrílicas y sintéticas vierte billones de partículas plásticas a las cañerías que burlan los filtros y terminan en nuestra comida.\n\n¿Qué daño directo provoca lavar fibras de poliéster?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Generan electricidad estática en el agua de salida', false],
                        ['Liberan millones de microfibras de plástico que llegan a ríos y mares por su diminuto diámetro', true],
                        ['Aumentan drásticamente los depósitos de cal del electrodoméstico', false],
                        ['Solo resultan contaminantes en ciclos de temperaturas superiores a 40 °C', false]
                    ]
                ],
                [
                    'texto' => "Intercambio vs. algoritmo\n\nUna plataforma de intercambio de ropa online te propone intercambiar 3 prendas que ya no usas por otras 3 de otro usuario. Tu amiga prefiere pedir ropa nueva con entrega al día siguiente porque \"es más cómodo\".",
                    'texto_pregunta' => '¿Cuál de estas opciones tiene menor impacto ambiental global?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Pedir ropa nueva con entrega express en 24 horas', false],
                        ['Intercambiar ropa online con otro usuario a través de una plataforma de segunda mano', true],
                        ['Comprar en tienda física de fast fashion', false],
                        ['Todas tienen el mismo impacto si se usa el mismo transporte', false]
                    ]
                ],
                [
                    'texto' => "El precio real de la camiseta de 3 €\n\nEncuentras una camiseta de algodón por 3 € en una cadena de fast fashion. Te parece un chollo. Pero un compañero del juego dice: \"Si cuesta 3 €, algo no cuadra.\"",
                    'texto_pregunta' => '¿Por qué una camiseta de 3 € puede ser más cara de lo que parece?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Automáticamente se desintegra y contamina', false],
                        ['Porque el algodón siempre es muy caro de producir', false],
                        ['Porque incluye impuestos ocultos', false],
                        ['La respuesta A y además implica condiciones laborales precarias y alto consumo de agua y energía en su producción', true]
                    ]
                ],
                [
                    'texto' => 'CRISIS: Tintes Venenosos en el Río Citarum',
                    'texto_pregunta' => "Tienes una camiseta favorita que tiene un agujero pequeño en la manga. Puedes tirarla, donarla, venderla online o remendarla tú mismo. Gigantescas fábricas textiles vierten metales pesados y tintes ácidos sin depurar a ríos, envenenando el agua potable del grupo.\n\n¿Cómo ordenarías estas opciones de mayor a menor impacto ambiental positivo ante esta crisis?",
                    'tipo_pregunta' => 'options',
                    'tipo_carta' => 'evento',
                    'cambio_temp' => 0.4,
                    'opciones' => [
                        ['Tirar la ropa en mal estado > Donarla > Venderla > Remendarla', false],
                        ['Remendar las prendas > Venderlas > Donarlas > Tirarlas (orden de mejor a peor)', true],
                        ['Donar la ropa vieja > Remendarla > Venderla > Tirarla al contenedor', false],
                        ['Vender lo usable > Tirar lo dañado > Donar lo sobrante > Remendar al final', false]
                    ]
                ],
            ],
        ];

        foreach ($contenido as $anilloIndex => $preguntas) {
            $anilloId = $anilloIds[$anilloIndex];

            foreach ($preguntas as $p) {
                $tipoCarta = $p['tipo_carta'] ?? 'pregunta';
                $tiempo = $p['tiempo'] ?? ($tipoCarta === 'evento' ? 60 : 30);
                $puntos = $p['puntos'] ?? ($tipoCarta === 'evento' ? 3 : 2);
                $penalizacion = $p['penalizacion'] ?? ($tipoCarta === 'evento' ? 2 : 1);
                $cambioTemp = $p['cambio_temp'] ?? null;

                $cartaId = DB::table('cartas')->insertGetId([
                    'anillo_id' => $anilloId,
                    'tipo' => $tipoCarta,
                    'texto' => $p['texto'],
                    'tiempo' => $tiempo,
                    'puntos' => $puntos,
                    'penalizacion' => $penalizacion,
                    'cambio_temp' => $cambioTemp,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $tipoPregunta = $p['tipo_pregunta'] ?? 'options';
                $rangoMin = $p['rango_min'] ?? null;
                $rangoMax = $p['rango_max'] ?? null;

                $preguntaId = DB::table('preguntas')->insertGetId([
                    'carta_id' => $cartaId,
                    'texto' => $p['texto_pregunta'] ?? $p['texto'],
                    'tipo_pregunta' => $tipoPregunta,
                    'rango_min' => $rangoMin,
                    'rango_max' => $rangoMax,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                if (isset($p['opciones'])) {
                    foreach ($p['opciones'] as [$texto, $correcta]) {
                        DB::table('opciones_respuesta')->insert([
                            'pregunta_id' => $preguntaId,
                            'texto' => $texto,
                            'correcta' => $correcta,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }
    }
}