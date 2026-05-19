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
        // Cada anillo tiene 12 preguntas (antes 6)
        $contenido = [
            // ANILLO 1 – AGUA
            [
                // Originales
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
                // Nuevas (Bloque 2 + Bloque 6)
                [
                    'texto' => '¿Cuántos litros de agua ahorra al mes quien se ducha 5 minutos en vez de 15?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['1000 litros', false],
                        ['5000 litros', false],
                        ['3.000 litros', true],
                        ['4200 litros', false]
                    ]
                ],
                [
                    'texto' => '¿Cuántos litros de agua se necesitan aproximadamente para fabricar un par de vaqueros de algodón?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['50-100 litros', false],
                        ['500-1000 litros', false],
                        ['7.000–10.000 litros', true],
                        ['200-750 litros', false]
                    ]
                ],
                [
                    'texto' => '¿Cuántos litros ahorra al año quien cierra el grifo al cepillarse los dientes (2 veces/día)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['4.380 litros', true],
                        ['1.420 litros', false],
                        ['3690 litros', false],
                        ['2524 litros', false]
                    ]
                ],
                [
                    'texto' => '¿Cuántos litros de agua se necesitan para producir 1 litro de agua embotellada (incluyendo la fabricación del plástico)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['1 litro (lo mismo)', false],
                        ['hasta 2 litros', false],
                        ['menos de 1 litro', false],
                        ['hasta 7 litros', true]
                    ]
                ],
                [
                    'texto' => '¿Por qué el streaming o el uso de internet consume agua indirectamente?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Porque los cables submarinos necesitan estar mojados', false],
                        ['Porque los centros de datos usan agua para refrigerarse', true],
                        ['Porque tu pantalla emite vapor de agua', false],
                        ['El streaming no tiene ninguna relación con el agua', false]
                    ]
                ],
                [
                    'texto' => '¿Qué combinación de hábitos matutinos tiene la menor huella ecológica?',
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
                // Originales
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
                // Nuevas (Bloque 3 + Bloque 6)
                [
                    'texto' => '¿Qué ocurre cuando un aparato está en modo standby?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['No consume nada de electricidad', false],
                        ['Consume una pequeña cantidad de energía de forma continua, sumando un gasto significativo al año', true],
                        ['Se recarga para cuando lo enciendas', false],
                        ['Solo consume si está conectado a wifi', false]
                    ]
                ],
                [
                    'texto' => '¿Qué consecuencias tiene cargar el móvil más horas de las necesarias?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Ninguna, los cargadores modernos cortan solos la corriente', false],
                        ['Gasta energía innecesaria y degrada la batería más rápido, lo que acorta la vida del dispositivo', true],
                        ['Hace que el móvil funcione más rápido', false],
                        ['Solo es un problema si el cargador es antiguo', false]
                    ]
                ],
                [
                    'texto' => '¿Cuánta energía se ahorra aproximadamente lavando a 30 °C en vez de a 60 °C?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Un 5 %', false],
                        ['Un 20 %', false],
                        ['Hasta un 60 %', true],
                        ['No hay diferencia real', false]
                    ]
                ],
                [
                    'texto' => '¿Qué afirmación es correcta sobre las bombillas LED encendidas innecesariamente?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Las LEDs no consumen nada si son de bajo consumo', false],
                        ['Aunque consumen poco individualmente, dejar muchas encendidas innecesariamente suma un gasto real de energía y emisiones', true],
                        ['La luz natural gasta más que una LED', false],
                        ['Da igual, porque en España la electricidad es renovable al 100 %', false]
                    ]
                ],
                [
                    'texto' => '¿Qué alternativa reduce más la huella energética al secar la ropa?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Usar la secadora en modo rápido a baja temperatura', false],
                        ['Tender la ropa al aire libre o en un tendedero interior ventilado siempre que sea posible', true],
                        ['Secar la ropa en el radiador con la calefacción al máximo', false],
                        ['Comprar ropa de secado rápido sintético', false]
                    ]
                ],
                [
                    'texto' => '¿Cuántas categorías de recursos se han visto afectadas en este proceso?',
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
                // Originales
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
                // Nuevas (Bloque 1 + Bloque 6)
                [
                    'texto' => '¿Cuál es la mejor decisión en este momento?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar la botella, total ya estás allí', false],
                        ['Aguantar la sed hasta llegar a casa', false],
                        ['Llevar siempre una botella reutilizable en la mochila', true],
                        ['Comprar la botella y prometer reciclarla', false]
                    ]
                ],
                [
                    'texto' => '¿Qué afirmación es correcta?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['El plástico no tiene ninguna relación con el consumo de agua', false],
                        ['Fabricar plástico consume agua, por lo que reducir plástico también ahorra agua', true],
                        ['Reciclar plástico gasta más agua que fabricarlo nuevo', false],
                        ['El plástico proviene del agua de los océanos', false]
                    ]
                ],
                [
                    'texto' => '¿Qué debes hacer con el envase del yogur antes de reciclarlo?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Tirarlo directamente al contenedor amarillo sin limpiarlo', false],
                        ['Aclararlo brevemente con agua para retirar los restos y luego reciclarlo', true],
                        ['Tirarlo a la basura orgánica porque tiene restos de alimento', false],
                        ['Dejarlo en el fregadero indefinidamente', false]
                    ]
                ],
                [
                    'texto' => '¿Qué porcentaje aproximado de la ropa mundial está fabricada con fibras sintéticas (plástico)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Menos del 10 %', false],
                        ['Alrededor del 20 %', false],
                        ['Más del 60 %', true],
                        ['Exactamente el 50 %', false]
                    ]
                ],
                [
                    'texto' => '¿Qué decisión tiene menor huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar un móvil nuevo de última generación', false],
                        ['Reparar el móvil actual', true],
                        ['Tirar el móvil roto a la papelera y pedir otro prestado', false],
                        ['Comprar un móvil de segunda mano de alta gama', false]
                    ]
                ],
                [
                    'texto' => '¿Cuál de estos cambios tiene el mayor impacto acumulado en el largo plazo si lo mantiene un adolescente durante toda su vida?',
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
                // Originales
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
                // Nuevas (Bloque 4 + Bloque 6)
                [
                    'texto' => '¿Por qué los emails almacenados en la nube tienen una huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Porque los ordenadores vibran y calientan el suelo', false],
                        ['Porque los servidores que los almacenan consumen electricidad y agua de refrigeración de forma continua', true],
                        ['Los emails no consumen recursos una vez enviados', false],
                        ['Solo si el email tiene adjunto de más de 10 MB', false]
                    ]
                ],
                [
                    'texto' => '¿Cuánta más energía consume transmitir vídeo en 4K respecto a SD (baja resolución)?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Lo mismo, la resolución no afecta al consumo energético', false],
                        ['Un 10 % más', false],
                        ['Hasta 4 veces más datos transmitidos, lo que implica mayor consumo energético en servidores y red', true],
                        ['El 4K solo consume más en televisores, no en móviles', false]
                    ]
                ],
                [
                    'texto' => '¿Cuál de estas opciones tiene la menor huella ecológica?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar el móvil nuevo de gama media', false],
                        ['Pedir uno a tus padres como regalo de cumpleaños', false],
                        ['Comprar el móvil de segunda mano', true],
                        ['Comprar el más caro porque dura más', false]
                    ]
                ],
                [
                    'texto' => '¿Qué ocurre cuando guardas datos en la nube?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Los datos flotan en el aire y no consumen recursos físicos', false],
                        ['Se almacenan en servidores físicos que consumen energía y agua continuamente', true],
                        ['Se comprimen automáticamente para no consumir recursos', false],
                        ['Solo consumen recursos cuando los consultas, no cuando los almacenas', false]
                    ]
                ],
                [
                    'texto' => '¿Qué efecto tienen las plataformas digitales y las redes sociales en el consumo de moda?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Ninguno, la gente compra lo mismo que antes de internet', false],
                        ['Reducen el consumo porque permiten comparar precios', false],
                        ['Estimulan el consumo impulsivo y aceleran los ciclos de la moda, aumentando la generación de residuos textiles', true],
                        ['Solo afectan a adolescentes mayores de 18 años', false]
                    ]
                ],
                [
                    'texto' => '¿Cuál de las siguientes afirmaciones describe mejor el impacto ambiental de un uso intensivo de pantallas?',
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
                // Originales
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
                // Nuevas (Bloque 5 + Bloque 6)
                [
                    'texto' => '¿Qué estrategia reduce más la huella ecológica de tu armario?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Comprar ropa nueva pero solo en rebajas', false],
                        ['Donar toda la ropa vieja a una ONG antes de comprar nueva', false],
                        ['Comprar menos, elegir prendas versátiles y de mayor durabilidad, y reparar lo que se estropea', true],
                        ['Lavar menos la ropa para que dure más sin cambiarla', false]
                    ]
                ],
                [
                    'texto' => '¿Con qué frecuencia recomienda Levi\'s (la marca de vaqueros) lavar los jeans?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Después de cada uso', false],
                        ['Una vez por semana como máximo', false],
                        ['Solo cuando están realmente sucios, lo menos posible (cada 10 usos o más)', true],
                        ['Nunca, los vaqueros son autolimpiantes', false]
                    ]
                ],
                [
                    'texto' => '¿Qué problema ambiental generan las prendas de fibra sintética al lavarse?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Desprenden electricidad estática que contamina el aire', false],
                        ['Liberan miles de microfibras plásticas que pasan por los filtros de depuradoras y llegan a los océanos', true],
                        ['Tiñen el agua de colores artificiales', false],
                        ['Solo contaminan si se lavan a más de 40 °C', false]
                    ]
                ],
                [
                    'texto' => '¿Cuál de estas opciones tiene menor impacto ambiental global?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Pedir ropa nueva con entrega express en 24 horas', false],
                        ['Intercambiar ropa online con otro usuario a través de una plataforma de segunda mano', true],
                        ['Comprar en tienda física de fast fashion', false],
                        ['Todas tienen el mismo impacto si se usa el mismo transporte', false]
                    ]
                ],
                [
                    'texto' => '¿Por qué una camiseta de 3 € puede ser más cara de lo que parece?',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Porque seguramente sea de mala calidad y dure muy poco, generando más compras y más residuos', false],
                        ['Porque el algodón siempre es muy caro de producir', false],
                        ['Porque incluye impuestos ocultos', false],
                        ['La respuesta A y además implica condiciones laborales precarias y alto consumo de agua y energía en su producción', true]
                    ]
                ],
                [
                    'texto' => 'Ordenad estas opciones de mayor a menor impacto ambiental positivo:',
                    'tipo_pregunta' => 'options',
                    'opciones' => [
                        ['Tirar > Donar > Vender > Remendar', false],
                        ['Remendar > Vender > Donar > Tirar (siendo remendar lo mejor y tirar lo peor)', true],
                        ['Donar > Remendar > Vender > Tirar', false],
                        ['Vender > Tirar > Donar > Remendar', false]
                    ]
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

                $preguntaId = DB::table('preguntas')->insertGetId([
                    'carta_id'     => $cartaId,
                    'texto'        => $p['texto'],
                    'tipo_pregunta'=> $tipoPregunta,
                    'rango_min'    => $rangoMin,
                    'rango_max'    => $rangoMax,
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