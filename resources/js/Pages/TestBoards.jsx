import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { GameBoard } from '../Components/Game/GameBoard';

export default function TestBoards() {
    const [mode, setMode] = useState('shared'); // shared, multiplayer, solo

    return (
        <div className="min-h-screen bg-white">
            <Head title="Testing Boards | HUE-CO2" />
            
            {/* Control Flotante para cambiar de modo */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/90 backdrop-blur-md px-2 py-2 rounded-2xl shadow-2xl border border-white/20 flex gap-1">
                <button 
                    onClick={() => setMode('shared')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'shared' ? 'bg-white text-slate-900' : 'text-white/60 hover:text-white'}`}
                >
                    Shared (Kahoot)
                </button>
                <button 
                    onClick={() => setMode('multiplayer')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'multiplayer' ? 'bg-white text-slate-900' : 'text-white/60 hover:text-white'}`}
                >
                    Multiplayer
                </button>
                <button 
                    onClick={() => setMode('solo')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'solo' ? 'bg-white text-slate-900' : 'text-white/60 hover:text-white'}`}
                >
                    Solo Mode
                </button>
            </div>

            {/* Renderizado del GameBoard con el modo seleccionado */}
            <GameBoard 
                gameMode={mode} 
                roomCode="TEST-772"
                myRole={{ id: 'tech', name: 'Gigantes Tech', iconName: 'Cpu' }} // Solo para simular modo online si hiciera falta
            />
        </div>
    );
}
