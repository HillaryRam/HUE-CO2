import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, Shirt, FlaskConical, Tractor, Landmark, Hexagon } from 'lucide-react';

/*
Este componente es utilizado en el modo local para mostrar los sectores.
Recibe como props el sector y el indice.
*/

const getRoleIcon = (iconName, id) => {
    if (id === 'tech') return <Cpu className="w-full h-full" strokeWidth={2.5} />;
    if (id === 'primario') return <Tractor className="w-full h-full" strokeWidth={2.5} />;
    if (id === 'publico') return <Landmark className="w-full h-full" strokeWidth={2.5} />;

    switch (iconName) {
        case 'Shirt': return <Shirt className="w-full h-full" strokeWidth={2.5} />;
        case 'FlaskConical': return <FlaskConical className="w-full h-full" strokeWidth={2.5} />;
        case 'Users': return <Users className="w-full h-full" strokeWidth={2.5} />;
        default: return <Hexagon className="w-full h-full" strokeWidth={2.5} />;
    }
};

// Colores de los sectores
export default function SectorMiniCard({ sector, index }) {
    const figmaColors = {
        'ciencia': { bg: 'bg-[#DEB8FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(150,64,255,1.0)]', textTitle: 'text-purple-600', iconClass: 'text-[#9640FF]' },
        'primario': { bg: 'bg-[#E2F1C3]', shadow: 'shadow-[0px_4px_0px_0px_rgba(101,132,55,1.0)]', textTitle: 'text-lime-700', iconClass: 'text-[#658437]' },
        'publico': { bg: 'bg-[#FFC2C2]', shadow: 'shadow-[0px_4px_0px_0px_rgba(208,0,0,1.0)]', textTitle: 'text-red-700', iconClass: 'text-[#D00000]' },
        'tech': { bg: 'bg-[#D6D5FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(67,64,255,1.0)]', textTitle: 'text-indigo-600', iconClass: 'text-[#4340FF]' },
        'textil': { bg: 'bg-[#FFE4C4]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,163,64,1.0)]', textTitle: 'text-orange-500', iconClass: 'text-[#FFA340]' },
        'ciudadania': { bg: 'bg-[#FFC9F2]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,58,219,1.0)]', textTitle: 'text-fuchsia-500', iconClass: 'text-[#FF3ADB]' },
    };

    const theme = figmaColors[sector.id] || figmaColors['tech'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`flex-1 min-w-[120px] lg:min-w-[160px] h-28 lg:h-32 px-3 py-2 lg:px-4 lg:py-3 ${theme.bg} rounded-3xl ${theme.shadow} inline-flex flex-col justify-between items-start transition-transform active:translate-y-1 active:shadow-[0px_0px_0px_0px_transparent]`}
        >
            <div className="self-stretch inline-flex justify-between items-center w-full">
                {/* Contenedor del Icono blanco*/}
                <div className="w-8 h-8 p-1 bg-white rounded-lg flex justify-center items-center shrink-0">
                    <div className={`relative w-full h-full ${theme.iconClass}`}>
                        {getRoleIcon(sector.iconName, sector.id)}
                    </div>
                </div>

                {/* Circulo verde estandar de EcoTokens */}
                <div className="w-9 h-9 bg-[#87AF4C] rounded-full shadow-[0px_2px_0px_0px_rgba(101,132,55,1.00)] inline-flex justify-center items-center flex-shrink-0">
                    <span className="text-white text-xl font-extrabold uppercase leading-none mt-0.5">
                        {sector.tokens}
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2.5 w-full">
                {/* Titulo del Sector dinámico */}
                <div className={`${theme.textTitle} text-sm lg:text-lg xl:text-[20px] font-bold tracking-tight leading-none truncate w-full`}>
                    {sector.name}
                </div>

                <div className="flex flex-col justify-center items-start gap-1 w-full">
                    {/* Cápsula de Especialista */}
                    <div className="h-5 px-2 bg-white/50 rounded-full outline outline-[0.38px] outline-slate-400 inline-flex justify-center items-center">
                        <span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                            {sector.specialist || 'Especialista'}
                        </span>
                    </div>
                    {/* Nombre Jugador */}
                    <div className="text-slate-600 text-[9px] font-bold truncate w-full hidden lg:block">
                        Jugador: {sector.playerName || 'Esperando...'}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
