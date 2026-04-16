import React from 'react';
import { ChevronLeft, User, Play, Clock } from 'lucide-react';

export function LobbyView({ mode, onBack, onStartGame, selectedPlayers, setSelectedPlayers, roomCode }) {
    console.log('[HUE-CO2] LobbyView Render Props:', { mode, roomCode, selectedPlayers });

    const safeRoomCode = String(roomCode || "");

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
                onClick={() => onStartGame({ mode: 'solo' })}
                className="w-full max-w-sm bg-[#1c1917] text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
                ¡Empezar Partida! <Play className="w-6 h-6 fill-current" />
            </button>
        </div>
    );

    const renderSmallLobby = () => (
        <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-black mb-6 text-stone-900">Grupo de 2 a 5 Jugadores</h3>
            <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
                {[2, 3, 4, 5].map(num => (
                    <button
                        key={num}
                        onClick={() => setSelectedPlayers(num)}
                        className={`border-4 p-6 rounded-3xl font-black text-2xl transition-all ${selectedPlayers === num
                            ? 'border-[#fb923c] bg-[#fff7ed] shadow-inner scale-95'
                            : 'bg-[#fdfcfb] border-[#e7e5e4] hover:border-[#fb923c] hover:bg-[#fff7ed]'
                            }`}
                    >
                        {num} <span className="text-sm block font-bold text-[#a8a29e] uppercase tracking-tighter">Jugadores</span>
                    </button>
                ))}
            </div>
            <p className="text-[#78716c] text-sm font-medium italic mb-8">Los 6 sectores se repartirán automáticamente entre vosotros.</p>

            {selectedPlayers && (
                <button
                    onClick={() => onStartGame({ players: selectedPlayers, mode: 'small' })}
                    className="w-full max-w-sm bg-[#fb923c] text-white py-5 rounded-[2rem] font-black text-xl shadow-[0_8px_0_0_#ea580c] hover:shadow-[0_4px_0_0_#ea580c] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3"
                >
                    ¡Comenzar Partida! <Play className="w-6 h-6 fill-current" />
                </button>
            )}
        </div>
    );

    return (
        <div className="w-full max-w-2xl bg-white border-4 border-[#e7e5e4] p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative transition-all duration-300">
            <button 
                onClick={onBack} 
                className="absolute top-8 left-8 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm bg-white p-2 rounded-xl z-10"
            >
                <ChevronLeft className="w-4 h-4" /> Atrás
            </button>
            <div className="mt-8">
                {safeRoomCode && (
                    <div className="mb-8 text-center bg-[#f5f5f4] p-6 rounded-3xl border-2 border-stone-200">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-2">Código de Sala</p>
                        <div className="text-5xl font-black tracking-[0.2em] text-[#1c1917] flex justify-center gap-2">
                             {safeRoomCode.split('').map((char, i) => (
                                 <span key={i} className="bg-white px-2 py-1 rounded-lg shadow-sm border border-stone-100">{char}</span>
                             ))}
                        </div>
                    </div>
                )}
                {mode === 'solo' && renderSoloLobby()}
                {mode === 'small' && renderSmallLobby()}
                {(mode === 'classic' || mode === 'class') && (
                    <div className="text-center p-12">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-stone-400 animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Modo Multijugador</h3>
                        <p className="text-stone-500">Este modo requiere conexión a servidor para sincronizar jugadores.</p>
                    </div>
                )}
                {!mode && (
                    <div className="text-center p-8 text-stone-400 italic">
                        Cargando configuración de sala...
                    </div>
                )}
            </div>
        </div>
    );
}
