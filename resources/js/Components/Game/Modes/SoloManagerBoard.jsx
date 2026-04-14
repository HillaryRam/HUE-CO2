import React from 'react';
import GameHeader from '../UI/GameHeader';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';

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
                    <GlobalThermometer temperature={0.4} />
                    
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
                        const canAfford = tokens >= (role.activeCost || 2);
                        
                        return (
                            <motion.button
                                key={role.id}
                                whileHover={{ y: -5 }}
                                className={`flex-1 flex flex-col items-start justify-between p-4 rounded-[2rem] border-2 transition-all shadow-sm
                                    ${canAfford ? `${role.bg} ${role.border} shadow-lg` : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}
                                `}
                            >
                                <div className="flex justify-between w-full items-center">
                                    <div className={`w-8 h-8 ${role.text}`}>
                                        {role.icon}
                                    </div>
                                    <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${role.bg?.replace('50', '200')} ${role.text}`}>
                                        {tokens} ET
                                    </div>
                                </div>
                                <div className="text-left mt-2">
                                    <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">
                                        {role.name}
                                    </div>
                                    <div className={`text-xs font-black uppercase ${role.text} truncate w-full`}>
                                        {role.activeDesc?.split(':')[0] || 'Acción de Sector'}
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
