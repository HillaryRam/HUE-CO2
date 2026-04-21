import React, { useState } from 'react';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Users, Cpu, Shirt, FlaskConical, Tractor, Landmark, Hexagon, Clock, LogOut, Zap } from 'lucide-react';

const figmaColors = {
    'ciencia':    { bg: 'bg-[#DEB8FF]', border: 'border-[#9640FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(150,64,255,1.0)]', textTitle: 'text-purple-700', iconClass: 'text-[#9640FF]' },
    'primario':   { bg: 'bg-[#E2F1C3]', border: 'border-[#658437]', shadow: 'shadow-[0px_4px_0px_0px_rgba(101,132,55,1.0)]',  textTitle: 'text-lime-700',   iconClass: 'text-[#658437]'  },
    'publico':    { bg: 'bg-[#FFC2C2]', border: 'border-[#D00000]', shadow: 'shadow-[0px_4px_0px_0px_rgba(208,0,0,1.0)]',     textTitle: 'text-red-700',    iconClass: 'text-[#D00000]'  },
    'tech':       { bg: 'bg-[#D6D5FF]', border: 'border-[#4340FF]', shadow: 'shadow-[0px_4px_0px_0px_rgba(67,64,255,1.0)]',   textTitle: 'text-indigo-600', iconClass: 'text-[#4340FF]'  },
    'textil':     { bg: 'bg-[#FFE4C4]', border: 'border-[#FFA340]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,163,64,1.0)]',  textTitle: 'text-orange-500', iconClass: 'text-[#FFA340]'  },
    'ciudadania': { bg: 'bg-[#FFC9F2]', border: 'border-[#FF3ADB]', shadow: 'shadow-[0px_4px_0px_0px_rgba(255,58,219,1.0)]',  textTitle: 'text-fuchsia-600',iconClass: 'text-[#FF3ADB]'  },
};

const getRoleIcon = (iconName, id) => {
    if (id === 'tech')     return <Cpu       className="w-full h-full" strokeWidth={2.5} />;
    if (id === 'primario') return <Tractor   className="w-full h-full" strokeWidth={2.5} />;
    if (id === 'publico')  return <Landmark  className="w-full h-full" strokeWidth={2.5} />;
    switch (iconName) {
        case 'Shirt':        return <Shirt        className="w-full h-full" strokeWidth={2.5} />;
        case 'FlaskConical': return <FlaskConical className="w-full h-full" strokeWidth={2.5} />;
        case 'Users':        return <Users        className="w-full h-full" strokeWidth={2.5} />;
        default:             return <Hexagon      className="w-full h-full" strokeWidth={2.5} />;
    }
};

export default function OnlinePlayerBoard({ sectors, challenge, roomCode, myRole }) {
    const { timeLeft, intensity, setIntensity } = useGame();
    const [messages, setMessages] = useState([
        { id: 1, user: 'Sistema', text: '¡Coordinación activa!', type: 'system' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [votedSectors, setVotedSectors] = useState({});

    const myRoleData = sectors.find(s => s.id === myRole?.id) || sectors[0];
    const theme = figmaColors[myRoleData?.id] || figmaColors['tech'];

    const sendMessage = () => {
        if (!chatInput.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), user: 'Tú', text: chatInput, type: 'user' }]);
        setChatInput('');
    };

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans overflow-hidden relative">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(circle at 50% 0%, #dcfce7 0%, transparent 60%)' }} />

            {/* ── Cabecera ───────────────────────────────────────────────── */}
            <div className="pt-4 lg:pt-6 px-8 w-full max-w-[1750px] mx-auto z-50 shrink-0">
                <div className="flex items-end justify-between mb-2 lg:mb-3">
                    {/* Sala */}
                    <div className="flex-none">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                            <span className="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase">
                                SALA: <span className="text-slate-900 ml-1">{roomCode || 'ONLINE'}</span>
                            </span>
                        </div>
                    </div>

                    {/* Espacio central */}
                    <div className="flex-1" />

                    {/* Tiempo y Salir */}
                    <div className="flex-none pr-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
                                <Clock className="w-6 h-6 text-slate-300" strokeWidth={2.5} />
                                <div className="flex flex-col">
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

            {/* ── Área central: Termómetro + Orbital + Carta ─────────────── */}
            <div className="flex-1 min-h-0 w-full max-w-[1750px] mx-auto px-8 relative z-10">
                <div className="flex items-center justify-between gap-4 lg:gap-6 h-full min-h-0 overflow-hidden">
                    <GlobalThermometer temperature={0.0} />

                    <OrbitalBoard sectors={sectors} />

                    <ChallengeCard
                        challenge={challenge}
                        intensity={intensity}
                        setIntensity={setIntensity}
                        onApply={() => alert('Aplicado')}
                        sectorColor="blue"
                        isCompact={true}
                    />
                </div>
            </div>

            {/* ── Barra Inferior Unificada ────────────────────────────────── */}
            <footer className="w-full bg-slate-100 border-t border-slate-200 flex items-center h-[140px] shrink-0 z-20 relative px-4 gap-3">

                {/* ▌Sección 1: Tu Habilidad */}
                <motion.button
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-4 px-5 py-3 h-full w-[200px] lg:w-[250px] shrink-0 ${theme.bg} rounded-2xl shadow-sm border border-white/60 transition-all`}
                >
                    {/* Icono del rol */}
                    <div className="w-12 h-12 p-2.5 bg-white rounded-2xl flex justify-center items-center shadow-md shrink-0">
                        <div className={`w-full h-full ${theme.iconClass}`}>
                            {getRoleIcon(myRoleData?.iconName, myRoleData?.id)}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col items-start min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-widest bg-black/10 text-black/50 px-2 py-0.5 rounded-full mb-1.5">
                            Tu Habilidad
                        </span>
                        <span className={`${theme.textTitle} text-sm font-black uppercase tracking-tight truncate w-full`}>
                            {myRoleData?.name}
                        </span>
                        <span className="text-[9px] font-semibold text-slate-600 leading-tight line-clamp-2 mt-0.5">
                            {myRoleData?.activeDesc?.split(':')[0]}
                        </span>
                    </div>

                    {/* Icono de acción */}
                    <Zap className="w-5 h-5 text-yellow-500 shrink-0 hidden lg:block" strokeWidth={2.5} />
                </motion.button>

                {/* ▌Sección 2: Chat */}
                <div className="flex-1 flex flex-col justify-between py-3 px-4 min-w-0 bg-white rounded-2xl shadow-sm border border-slate-100 h-full">
                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 mb-2 scrollbar-hide">
                        {messages.slice(-3).map(msg => (
                            <div key={msg.id} className={`text-[11px] leading-tight ${msg.type === 'system' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                                {msg.type !== 'system' && (
                                    <span className="font-black text-blue-600 mr-1.5">{msg.user}:</span>
                                )}
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 shrink-0">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Habla con tu equipo..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold focus:border-blue-400 focus:outline-none transition-all"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-3 py-2 rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all shrink-0"
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </div>

                {/* ▌Sección 3: Confirmación de Votación */}
                <div className="flex flex-col justify-between py-3 px-5 w-[240px] lg:w-[300px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 h-full">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        Confirmación de Estrategia
                    </div>
                    <div className="grid grid-cols-3 gap-2 flex-1">
                        {sectors.map(role => {
                            const roleTheme = figmaColors[role.id] || figmaColors['tech'];
                            return (
                            <button
                                key={role.id}
                                onClick={() => setVotedSectors(prev => ({ ...prev, [role.id]: !prev[role.id] }))}
                                className={`flex items-center justify-center p-2 rounded-xl border-2 transition-all active:scale-90
                                    ${votedSectors[role.id] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                            >
                                <div className={`w-5 h-5 ${votedSectors[role.id] ? roleTheme.iconClass : 'text-slate-300'}`}>
                                    {getRoleIcon(role.iconName, role.id)}
                                </div>
                            </button>
                        )})}
                    </div>
                </div>
            </footer>
        </div>
    );
}
