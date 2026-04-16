import React from 'react';
import GameHeader from '../UI/GameHeader';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';
import { Users, Cpu, Shirt, FlaskConical, Tractor, Landmark, Hexagon } from 'lucide-react';

const figmaColors = {
    'ciencia': { bg: 'bg-[#DEB8FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(150,64,255,1.0)]', textTitle: 'text-purple-600', iconClass: 'text-[#9640FF]' },
    'primario': { bg: 'bg-[#E2F1C3]', shadow: 'shadow-[0px_4px_0px_0px_rgba(101,132,55,1.0)]', textTitle: 'text-lime-700', iconClass: 'text-[#658437]' },
    'publico': { bg: 'bg-[#FFC2C2]', shadow: 'shadow-[0px_4px_0px_0px_rgba(208,0,0,1.0)]', textTitle: 'text-red-700', iconClass: 'text-[#D00000]' },
    'tech': { bg: 'bg-[#D6D5FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(67,64,255,1.0)]', textTitle: 'text-indigo-600', iconClass: 'text-[#4340FF]' },
    'textil': { bg: 'bg-[#FFE4C4]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,163,64,1.0)]', textTitle: 'text-orange-500', iconClass: 'text-[#FFA340]' },
    'ciudadania': { bg: 'bg-[#FFC9F2]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,58,219,1.0)]', textTitle: 'text-fuchsia-500', iconClass: 'text-[#FF3ADB]' },
};

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

export default function SoloManagerBoard({ sectors, challenge, roomCode }) {
    const { timeLeft, intensity, setIntensity, sectorStates } = useGame();

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans p-6 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(circle at 50% 0%, #ede9fe 0%, transparent 60%)' }} />

            <GameHeader 
                roomCode="MODO: SOLO" 
                timeLeft={timeLeft} 
                onExit={() => alert('Salir')} 
            />

            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full min-h-0 relative z-10">
                <div className="flex items-center justify-between gap-10 flex-1 min-h-0">
                    <GlobalThermometer temperature={0.0} />
                    
                    <OrbitalBoard sectors={sectors} />

                    <ChallengeCard 
                        challenge={challenge}
                        intensity={intensity}
                        setIntensity={setIntensity}
                        onApply={() => alert('Turno Procesado')}
                        sectorColor="indigo"
                    />
                </div>

                {/* Toolbar Inferior de Acciones para Solo Mode */}
                <div className="mt-8 flex gap-4 h-[140px] pb-2">
                    {sectors.map((role, idx) => {
                        const tokens = sectorStates[role.id]?.tokens || 0;
                        const canAfford = idx === 0;
                        
                        const theme = figmaColors[role.id] || figmaColors['tech'];
                        
                        return (
                            <motion.button
                                key={role.id}
                                whileHover={canAfford ? { y: -5 } : {}}
                                className={`flex-1 flex flex-col items-start justify-between p-4 rounded-[2rem] transition-all
                                    ${canAfford 
                                        ? `${theme.bg} ${theme.shadow} active:translate-y-1 active:shadow-none` 
                                        : 'bg-slate-50 border-2 border-slate-100 opacity-50 grayscale cursor-not-allowed'}
                                `}
                            >
                                <div className="flex justify-between w-full items-center mb-2">
                                    {/* Icono en cuadro blanco */}
                                    <div className="w-8 h-8 p-1.5 bg-white rounded-lg flex justify-center items-center shadow-sm">
                                        <div className={`w-full h-full ${theme.iconClass}`}>
                                            {getRoleIcon(role.iconName, role.id)}
                                        </div>
                                    </div>
                                    
                                    {/* Tokens */}
                                    <div className={`w-9 h-9 bg-[#87AF4C] rounded-full shadow-[0px_2px_0px_0px_rgba(101,132,55,1.00)] flex justify-center items-center`}>
                                        <span className="text-white text-sm font-black mt-0.5">
                                            {tokens}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-left w-full">
                                    <div className={`${theme.textTitle} text-[10px] font-black uppercase tracking-tight truncate mb-1`}>
                                        {role.name}
                                    </div>
                                    
                                    <div className="flex flex-col gap-1">
                                        {/* Cápsula de Especialista */}
                                        <div className="h-4 px-2 bg-white/50 rounded-full border border-slate-400 inline-flex justify-center items-center w-fit">
                                            <span className="text-slate-600 text-[7px] font-bold uppercase tracking-wider">
                                                {role.specialist}
                                            </span>
                                        </div>
                                        <div className="text-[8px] font-bold text-slate-500 uppercase leading-tight line-clamp-2">
                                            {role.activeDesc?.split(':')[0]}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
