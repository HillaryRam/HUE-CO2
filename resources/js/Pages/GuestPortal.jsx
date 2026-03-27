import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Users, User, Gamepad2, Globe, ArrowRight, Sparkles,
    ChevronLeft, Crown, Shirt, Lightbulb, Cpu, Droplets,
    ShieldCheck, Zap, Play, Clock
} from 'lucide-react';

export default function GuestPortal() {
    const [view, setView] = useState('main'); // main, join, host_auth, select_mode, lobby
    const [mode, setMode] = useState(null);
    const [pin, setPin] = useState('772 904');
    const [simulatedPlayers, setSimulatedPlayers] = useState([]);

    const navigateTo = (newView) => setView(newView);

    const handleSelectMode = (selectedMode) => {
        setMode(selectedMode);
        setSimulatedPlayers([]);
        setView('lobby');
    };

    // Redirigir al juego local
    const startLocalGame = () => {
        router.get('/juego-local');
    };

    const rolesDef = [
        { id: 'textil', name: 'Textil', icon: <Shirt className="w-5 h-5" />, color: 'bg-amber-100 text-amber-700 border-amber-300' },
        { id: 'ciencia', name: 'Ciencia', icon: <Lightbulb className="w-5 h-5" />, color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
        { id: 'tech', name: 'Tech', icon: <Cpu className="w-5 h-5" />, color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
        { id: 'primario', name: 'Primario', icon: <Droplets className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
        { id: 'publico', name: 'Público', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-rose-100 text-rose-700 border-rose-300' },
        { id: 'ciudadania', name: 'Ciudadanía', icon: <Users className="w-5 h-5" />, color: 'bg-violet-100 text-violet-700 border-violet-300' },
    ];

    // (Aquí irían los useEffect y las funciones renderSoloLobby, renderSmallLobby, etc. 
    // que ya teníamos en el PortalScreen. Puedes copiarlas directamente del código anterior).

    const renderSoloLobby = () => (
        <div className="flex flex-col items-center text-center">
            <div className="bg-[#f0fdf4] border-4 border-[#16a34a] p-8 rounded-[3rem] shadow-xl mb-8 w-full">
                <div className="w-20 h-20 bg-[#16a34a] rounded-full mx-auto mb-4 flex items-center justify-center text-white border-4 border-white shadow-md">
                    <User className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-stone-900">Líder Absoluto</h3>
                <p className="text-[#57534e] mb-6 font-medium text-sm">Controlarás los 6 sectores tú solo. Ideal para jugar en una sola pantalla.</p>
            </div>
            <button
                onClick={startLocalGame}
                className="w-full max-w-sm bg-[#1c1917] text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
                ¡Empezar Partida! <Play className="w-6 h-6 fill-current" />
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="Portal de Invitado | HUE-CO2" />

            {/* Fondo Orgánico */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dcfce7] rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#fef3c7] rounded-full blur-[120px] opacity-40 -z-10" />

            {/* Logo Mini */}
            {view !== 'main' && (
                <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <img src="/images/DPEC_logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-black mb-5">HUE-CO2</span>
                </div>
            )}

            {/* VISTA 1: MAIN MENU (INVITADO) */}
            {view === 'main' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm text-center"
                >
                    <div className="w-36 h-36 flex items-center justify-center mx-auto mb-4">
                        <img src="/images/DPEC_logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>

                    <h1 className="text-5xl font-black tracking-tighter text-[#1c1917] mb-1">HUE-CO2</h1>
                    <p className="text-[#87AF4C] font-bold uppercase tracking-[0.2em] text-[10px] mb-12">Modo Invitado</p>

                    <div className="space-y-4">
                        <button onClick={() => navigateTo('join')} className="w-full bg-white border-4 border-[#e7e5e4] text-[#1c1917] p-6 rounded-[2rem] shadow-sm hover:border-[#87AF4C] transition-all font-black text-xl flex items-center justify-center gap-3">
                            <Gamepad2 className="w-6 h-6" /> Unirse con PIN
                        </button>
                        <button onClick={() => navigateTo('host_auth')} className="w-full bg-[#1c1917] text-white p-6 rounded-[2rem] shadow-[0_8px_0_0_#292524] hover:shadow-[0_4px_0_0_#292524] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all font-black text-xl flex items-center justify-center gap-3">
                            <Sparkles className="w-6 h-6 text-[#fde047]" /> Crear Partida Rápida
                        </button>
                    </div>

                    <button onClick={() => router.get('/')} className="mt-8 text-stone-400 font-bold hover:text-stone-600 transition-colors">Volver al inicio</button>
                </motion.div>
            )}

            {/* VISTA 1.5: OPCIONES DE ANFITRIÓN */}
            {view === 'host_auth' && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-2xl"
                >
                    <button onClick={() => navigateTo('main')} className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm">
                        <ChevronLeft className="w-4 h-4" /> Atrás
                    </button>
                    <h2 className="text-2xl font-black mb-2 text-center text-[#1c1917]">¿Cómo quieres jugar?</h2>
                    <p className="text-center text-[#78716c] text-sm font-medium mb-6">Como invitado, el progreso <br /> de esta partida no se guardará.</p>

                    <div className="space-y-4 mt-6">
                        <button onClick={() => handleSelectMode('solo')} className="w-full flex items-center justify-between p-6 bg-[#f0fdf4] border-4 border-[#E3EFD2] hover:border-[#87AF4C] rounded-2xl transition-all group">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><User className="text-[#87AF4C] w-6 h-6" /></div>
                                <div>
                                    <div className="font-black text-[#1c1917]">Modo Local (Offline)</div>
                                    <div className="text-[10px] text-[#166534] font-bold uppercase tracking-widest mt-1">Una sola pantalla</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#87AF4C] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button onClick={() => navigateTo('select_mode')} className="w-full flex items-center justify-between p-6 bg-[#f5f5f4] border-4 border-transparent hover:border-[#e7e5e4] rounded-2xl transition-all group">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Globe className="text-[#a8a29e] w-6 h-6" /></div>
                                <div>
                                    <div className="font-black text-[#1c1917]">Modo Online (Multijugador)</div>
                                    <div className="text-[10px] text-[#a8a29e] font-bold uppercase tracking-widest mt-1">Cada uno en su casa</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#a8a29e] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* VISTA 2: SELECCIÓN DE MODO MULTIJUGADOR */}
            {view === 'select_mode' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-4xl">
                    <button onClick={() => navigateTo('host_auth')} className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm">
                        <ChevronLeft className="w-4 h-4" /> Volver
                    </button>
                    <h2 className="text-4xl font-black mb-2 text-center text-[#1c1917]">¿Cuántos vais a jugar?</h2>
                    {/* Aquí van los botones de 2-5 jugadores, 6 jugadores, etc. */}
                </motion.div>
            )}

            {/* VISTA LOBBY */}
            {view === 'lobby' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white border-4 border-[#e7e5e4] p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative">
                    <button onClick={() => navigateTo('select_mode')} className="absolute top-8 left-8 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm bg-white p-2 rounded-xl">
                        <ChevronLeft className="w-4 h-4" /> Atrás
                    </button>
                    <div className="mt-8">
                        {mode === 'solo' && renderSoloLobby()}
                    </div>
                </motion.div>
            )}

            {/* VISTA UNIRSE CON PIN */}
            {view === 'join' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-2xl">
                    <button onClick={() => navigateTo('main')} className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm">
                        <ChevronLeft className="w-4 h-4" /> Volver
                    </button>
                    <h2 className="text-3xl font-black mb-8 text-center text-[#1c1917]">¡Entra al juego!</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4">Código PIN</label>
                            <input type="text" placeholder="000 000" className="w-full bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl py-5 px-6 text-center text-3xl font-black tracking-[0.3em] focus:outline-none focus:border-[#87AF4C] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4">Tu Apodo</label>
                            <input type="text" placeholder="Ej: ECO-Héroe" className="w-full bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl py-4 px-6 text-center font-bold text-lg focus:outline-none focus:border-[#87AF4C]" />
                        </div>
                        <button className="w-full bg-[#1c1917] text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-[#292524] transition-all">
                            Conectar
                        </button>
                    </div>
                </motion.div>
            )}

        </div>
    );
}