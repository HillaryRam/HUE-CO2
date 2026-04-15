import React, { useState } from 'react';
import GameHeader from '../UI/GameHeader';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorEcoStats from '../UI/SectorEcoStats';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function OnlinePlayerBoard({ sectors, challenge, roomCode, myRole }) {
    const { timeLeft, intensity, setIntensity } = useGame();
    const [messages, setMessages] = useState([
        { id: 1, user: 'Sistema', text: '¡Coordinación activa!', type: 'system' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [votedSectors, setVotedSectors] = useState({});

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans p-6 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(circle at 50% 0%, #dcfce7 0%, transparent 60%)' }} />

            <GameHeader 
                roomCode={roomCode} 
                timeLeft={timeLeft} 
                onExit={() => alert('Salir')} 
            />

            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full min-h-0 relative z-10">
                
                {/* Visualización Central */}
                <div className="flex items-center justify-between gap-8 flex-1 min-h-0">
                    <GlobalThermometer temperature={0.8} />
                    
                    <OrbitalBoard sectors={sectors} />

                    <ChallengeCard 
                        challenge={challenge}
                        intensity={intensity}
                        setIntensity={setIntensity}
                        onApply={() => alert('Aplicado')}
                        sectorColor="blue"
                    />
                </div>

                {/* EcoStats de Sectores */}
                <SectorEcoStats sectors={sectors} votedSectors={votedSectors} />

                {/* Footer Interactivo (Chat y Votación) */}
                <div className="h-[200px] mt-8 flex gap-6 pb-4">
                    {/* Chat */}
                    <div className="flex-1 bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col p-4 shadow-sm overflow-hidden">
                        <div className="flex-1 overflow-y-auto mb-3 pr-2 space-y-2 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`text-xs ${msg.type === 'system' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                                    {msg.type !== 'system' && <span className="font-black mr-2 text-blue-600">{msg.user}:</span>}
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Habla con tu equipo..."
                                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold focus:border-blue-400 outline-none transition-all"
                            />
                            <button className="bg-blue-600 text-white p-3.5 rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Votación */}
                    <div className="w-[340px] bg-white border-2 border-slate-100 rounded-[2.5rem] p-5 shadow-sm">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500" /> Confirmación de Estrategia
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {sectors.map(role => (
                                <button
                                    key={role.id}
                                    onClick={() => setVotedSectors(prev => ({ ...prev, [role.id]: !prev[role.id] }))}
                                    className={`relative flex items-center justify-center p-3 rounded-2xl border-2 transition-all active:scale-90
                                        ${votedSectors[role.id] ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}
                                    `}
                                >
                                    <div className={`w-6 h-6 ${votedSectors[role.id] ? role.text : 'text-slate-300'}`}>
                                        {role.icon}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
