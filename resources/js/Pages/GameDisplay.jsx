import React from 'react';
import { Head } from '@inertiajs/react';
import { GameBoard } from '../Components/Game/GameBoard';

export default function GameDisplay({ roomCode, initialMode = 'shared' }) {
    // Esta página es el "Visor del Tablero" oficial.
    // Solo muestra el tablero dinámico premium.

    return (
        <div className="min-h-screen bg-[#fafaf9]">
            <Head title={`Tablero HUE-CO2 | Sala ${roomCode}`} />
            
            <GameBoard 
                roomCode={roomCode} 
                gameMode={initialMode}
                onEnd={(win) => console.log('Game Over:', win)}
            />
        </div>
    );
}
