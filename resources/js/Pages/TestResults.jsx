import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import EndgameResults from '@/Components/Endgame/EndgameResults';

export default function TestResults() {
    const [outcome, setOutcome] = useState('victory');

    return (
        <div className="min-h-screen bg-stone-100 p-4">
            <Head title="Test Results | HUE-CO2" />
            
            {/* Selector de Pruebas (Solo visible en local) */}
            <div className="fixed top-4 right-4 z-[100] bg-white p-4 rounded-3xl shadow-2xl border-4 border-slate-900 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ver variantes:</span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setOutcome('victory')}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${outcome === 'victory' ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}
                    >
                        Victoria
                    </button>
                    <button 
                        onClick={() => setOutcome('neutral')}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${outcome === 'neutral' ? 'bg-amber-400 text-white' : 'bg-slate-100'}`}
                    >
                        Empate
                    </button>
                    <button 
                        onClick={() => setOutcome('defeat')}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${outcome === 'defeat' ? 'bg-rose-500 text-white' : 'bg-slate-100'}`}
                    >
                        Derrota
                    </button>
                </div>
            </div>

            {/* El Componente Real */}
            <EndgameResults 
                outcome={outcome}
                onBackToPortal={() => alert('Volvería al portal')}
            />
        </div>
    );
}
