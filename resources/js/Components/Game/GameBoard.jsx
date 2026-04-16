import { ROLES } from '../../data/gameData';
import { GameProvider } from './Core/GameProvider';
import { useGameChannel } from '../../hooks/useGameChannel';
import { useState, useEffect } from 'react';

// Importación de Tableros por Modo
import LocalDisplayBoard from './Modes/LocalDisplayBoard';
import OnlinePlayerBoard from './Modes/OnlinePlayerBoard';

export function GameBoard({ 
    players: activePlayers, 
    onEnd, 
    tutorialStep = -1, 
    gameMode = 'solo', 
    myRole,
    roomCode
}) {
    const [sectorsState, setSectorsState] = useState([]);
    const [currentChallenge, setCurrentChallenge] = useState({});
    const [turnNumber, setTurnNumber] = useState(tutorialStep > 0 ? 0 : 1);

    // ── WebSocket: Escuchar el estado global del juego ────────────────────────
    const { gameState: serverGameState, votes } = useGameChannel(roomCode, 'host', 'Host');

    useEffect(() => {
        if (serverGameState) {
            if (serverGameState.state === 'challenge') {
                setCurrentChallenge(serverGameState.challenge);
                setTurnNumber(serverGameState.turnNumber);
                if (serverGameState.sectors) {
                    setSectorsState(serverGameState.sectors);
                }
            } else if (serverGameState.state === 'ended') {
                onEnd(false);
            }
        }
    }, [serverGameState]);
    // ─────────────────────────────────────────────────────────────────────────

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

    const sectors = ROLES.map(role => {
        const serverData = sectorsState.find(s => s.id === role.id);
        return {
            ...role,
            ...getRoleColors(role.id),
            tokens: serverData ? serverData.tokens : 12,
            playerName: serverData ? serverData.playerName : 'Esperando...',
            hasVoted: !!votes[role.id]
        };
    });

    // Renderizado condicional según el modo de juego
    const renderBoard = () => {
        switch (gameMode) {
            case 'shared':
            case 'solo':
            case 'small':
                return <LocalDisplayBoard sectors={sectors} challenge={currentChallenge} roomCode={roomCode} turnNumber={turnNumber} />;
            
            case 'multiplayer':
                return <OnlinePlayerBoard sectors={sectors} challenge={currentChallenge} roomCode={roomCode} myRole={myRole} />;
            
            default:
                return <LocalDisplayBoard sectors={sectors} challenge={currentChallenge} roomCode={roomCode} turnNumber={turnNumber} />;
        }
    };

    return (
        <GameProvider initialTime={105} playerStats={{}}>
            {renderBoard()}
        </GameProvider>
    );
};

