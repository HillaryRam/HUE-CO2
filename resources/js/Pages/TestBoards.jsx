import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { GameBoard } from '../Components/Game/GameBoard';
import MobileController from '../Components/Game/Modes/MobileController';
import { ROLES } from '../data/gameData';

// Datos de ejemplo para probar el mando mobile
const SAMPLE_CHALLENGE_OPTIONS = {
    type: 'options',
    title: 'Sequía en la Cuenca Sur',
    description: 'El suministro hídrico está al 20%. ¿Qué medida implementáis primero?',
    ring: 'Agua',
    turn: '3/15',
    options: ['Racionamiento urbano', 'Parada textil de emergencia', 'Inyección de agua desalada', 'Uso de aguas residuales tratadas'],
};

const SAMPLE_CHALLENGE_VALIDATE = {
    type: 'validate',
    title: 'Auditoría de Residuos',
    ring: 'Plástico',
    turn: '3/15',
    proposal: '"Prohibir totalmente la venta de ropa con más de 20% de poliéster en 6 meses."',
};

export default function TestBoards() {
    const [mode, setMode] = useState('shared');
    const [mobileState, setMobileState] = useState('challenge');
    const [mobileChallenge, setMobileChallenge] = useState(SAMPLE_CHALLENGE_OPTIONS);

    const modes = [
        { key: 'shared',     label: 'Shared (Kahoot)' },
        { key: 'multiplayer', label: 'Multiplayer' },
        { key: 'solo',       label: 'Solo Mode' },
        { key: 'mobile',     label: '📱 Mando Móvil' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Testing Boards | HUE-CO2" />
            
            {/* Control Flotante */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/90 backdrop-blur-md px-2 py-2 rounded-2xl shadow-2xl border border-white/20 flex gap-1">
                {modes.map(({ key, label }) => (
                    <button 
                        key={key}
                        onClick={() => setMode(key)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === key ? 'bg-white text-slate-900' : 'text-white/60 hover:text-white'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Boards */}
            {mode !== 'mobile' ? (
                <GameBoard 
                    gameMode={mode} 
                    roomCode="TEST-772"
                    myRole={{ id: 'tech', name: 'Gigantes Tech', iconName: 'Cpu' }}
                />
            ) : (
                <div className="pt-20 flex flex-col items-center gap-4 pb-10">
                    {/* Mini-panel de control para el test del mando */}
                    <div className="flex gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm text-xs font-bold">
                        <button onClick={() => setMobileState('challenge')}   className={`px-3 py-1.5 rounded-xl transition-all ${mobileState === 'challenge' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>Pregunta (options)</button>
                        <button onClick={() => { setMobileChallenge(SAMPLE_CHALLENGE_VALIDATE); setMobileState('challenge'); }} className={`px-3 py-1.5 rounded-xl transition-all text-slate-500 hover:bg-slate-100`}>Validar</button>
                        <button onClick={() => setMobileState('voted')}       className={`px-3 py-1.5 rounded-xl transition-all ${mobileState === 'voted' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>Voto Hecho</button>
                        <button onClick={() => setMobileState('waiting')}     className={`px-3 py-1.5 rounded-xl transition-all ${mobileState === 'waiting' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>Esperando</button>
                    </div>
                    
                    {/* El mando mobile en sí */}
                    <MobileController
                        role={ROLES.find(r => r.id === 'ciudadania')}
                        playerName="Elena"
                        tokens={4}
                        timeLeft={84}
                        globalTemp="+0.4°C"
                        currentTurn="3/15"
                        challenge={mobileChallenge}
                        gameState={mobileState}
                        onVote={(ans) => console.log('Voto:', ans)}
                        onApply={(val) => console.log('Aplicar:', val)}
                    />
                </div>
            )}
        </div>
    );
}


