import React from 'react';
import { ROLES } from '../../data/gameData';
import { GameProvider } from './Core/GameProvider';

// Importación de Tableros por Modo
import LocalDisplayBoard from './Modes/LocalDisplayBoard';
import OnlinePlayerBoard from './Modes/OnlinePlayerBoard';
import SoloManagerBoard from './Modes/SoloManagerBoard';

export function GameBoard({ 
    players: activePlayers, 
    onEnd, 
    tutorialStep = -1, 
    gameMode = 'solo', 
    myRole,
    roomCode = "772 904"
}) {
    // Preparación de datos de sectores con estilos consistentes
    const getRoleColors = (id) => {
        const colors = {
            textil: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', accent: 'bg-indigo-600' },
            ciencia: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', accent: 'bg-blue-600' },
            tech: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100', accent: 'bg-violet-600' },
            primario: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', accent: 'bg-emerald-600' },
            publico: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', accent: 'bg-rose-600' },
            ciudadania: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-100', accent: 'bg-fuchsia-600' },
        };
        return colors[id] || colors.ciencia;
    };

    const sectors = ROLES.map(role => ({
        ...role,
        ...getRoleColors(role.id),
        // En un juego real esto vendría del servidor
        tokens: Math.floor(Math.random() * 5) 
    }));

    const challenge = {
        type: 'options',
        title: "Fuga de Microplásticos",
        description: "¿Cuál es la estrategia más efectiva para cerrar el ciclo del agua en la producción textil este turno?",
        sectorName: "Sector Textil",
        turn: "3/15",
        options: [
            "Instalar filtros de microplásticos en lavanderías.",
            "Sustituir el 60% de fibras por lino y cáñamo.",
            "Crear un clúster de reciclaje textil local.",
            "Usar pasaportes digitales para rastrear la prenda."
        ]
    };

    // Renderizado condicional según el modo de juego
    const renderBoard = () => {
        switch (gameMode) {
            case 'shared': // Modo Kahoot (Solo visualización)
                return <LocalDisplayBoard sectors={sectors} challenge={challenge} roomCode={roomCode} />;
            
            case 'multiplayer': // Modo Online (Interactivo + Chat)
                return <OnlinePlayerBoard sectors={sectors} challenge={challenge} roomCode={roomCode} myRole={myRole} />;
            
            case 'solo': // Modo un jugador (Control total)
            default:
                return <SoloManagerBoard sectors={sectors} challenge={challenge} roomCode={roomCode} />;
        }
    };

    return (
        <GameProvider initialTime={105} playerStats={{}}>
            {renderBoard()}
        </GameProvider>
    );
};

