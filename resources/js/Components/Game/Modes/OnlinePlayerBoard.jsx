import React, { useState } from 'react';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorEcoStats from '../UI/SectorEcoStats';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Users, Cpu, Shirt, FlaskConical, Tractor, Landmark, Hexagon, Clock, LogOut } from 'lucide-react';

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

            {/* Cabecera integrada - Alineada con el diseño Premium */}
            <div className="pt-8 px-8 w-full max-w-[1750px] mx-auto z-50">
                <div className="flex items-end justify-between mb-12">
                    {/* Columna 1: Sala Online (Encima del Termómetro) */}
                    <div className="flex-none">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase">
                                SALA: <span className="text-slate-900 ml-1">{roomCode || "ONLINE"}</span>
                            </span>
                        </div>
                    </div>

                    {/* Columna 2: Espacio Central (Encima del Planeta) */}
                    <div className="flex-1 flex justify-center">
                        {/* Espacio reservado para mantener simetría con el OrbitalBoard */}
                    </div>

                    {/* Columna 3: Tiempo y Controles (Encima de la carta de reto) */}
                    <div className="flex-none pr-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
                                <Clock className="w-6 h-6 text-slate-300" strokeWidth={2.5} />
                                <div className="flex flex-col -gap-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tiempo</span>
                                    <span className={`font-black text-3xl tabular-nums tracking-tighter leading-none ${timeLeft < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                                        {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => alert('Salir')}
                                className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all group shrink-0"
                            >
                                <LogOut className="w-6 h-6 transition-transform group-hover:scale-110" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col w-full max-w-[1750px] mx-auto min-h-0 relative z-10">
                
                {/* Visualización Central */}
                <div className="flex items-center justify-between gap-8 flex-1 min-h-0">
                    <GlobalThermometer temperature={0.0} />
                    
                    <OrbitalBoard sectors={sectors} />

                    <ChallengeCard 
                        challenge={challenge}
                        intensity={intensity}
                        setIntensity={setIntensity}
                        onApply={() => alert('Aplicado')}
                        sectorColor="blue"
                    />
                </div>



                {/* Footer Interactivo (Habilidad, Chat y Votación) */}
                <div className="h-[200px] mt-8 flex gap-6 pb-4">
                    {/* Habilidad Propia (Desbloqueada) */}
                    {(() => {
                        const myRoleData = sectors.find(s => s.id === myRole?.id) || sectors[0];
                        const theme = figmaColors[myRoleData.id] || figmaColors['tech'];
                        
                        return (
                            <motion.button
                                whileHover={{ y: -5 }}
                                className={`w-[240px] flex flex-col items-start justify-between p-5 rounded-[2.5rem] transition-all
                                    ${theme.bg} ${theme.shadow} active:translate-y-1 active:shadow-none
                                `}
                            >
                                <div className="flex justify-between w-full items-center mb-2">
                                    <div className="w-10 h-10 p-2 bg-white rounded-xl flex justify-center items-center shadow-sm">
                                        <div className={`w-full h-full ${theme.iconClass}`}>
                                            {getRoleIcon(myRoleData.iconName, myRoleData.id)}
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black text-white/60 uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full">
                                        Tu Habilidad
                                    </div>
                                </div>

                                <div className="text-left w-full mt-2">
                                    <div className={`${theme.textTitle} text-xs font-black uppercase tracking-tight truncate mb-1`}>
                                        {myRoleData.name}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-5 px-3 bg-white/50 rounded-full border border-slate-400/30 inline-flex justify-center items-center w-fit">
                                            <span className="text-slate-700 text-[8px] font-bold uppercase tracking-wider">
                                                {myRoleData.specialist}
                                            </span>
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-600 uppercase leading-tight line-clamp-2">
                                            {myRoleData.activeDesc?.split(':')[0]}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })()}

                    {/* Chat */}
                    <div className="flex-1 bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col p-5 shadow-sm overflow-hidden">
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
                                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-xs font-bold focus:border-blue-400 outline-none transition-all"
                            />
                            <button className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
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
