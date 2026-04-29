import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';

/**
 * useGameChannel
 *
 * Hook central de comunicación WebSocket para HUE-CO2.
 * Encapsula toda la lógica de Laravel Echo / Reverb para que los
 * componentes solo tengan que llamar a funciones y leer estado.
 *
 * @param {string} roomCode   - Código de sala (ej: "TEST-772")
 * @param {string} sectorId   - ID del sector del jugador (ej: "ciudadania")
 * @param {string} playerName - Nombre del jugador
 *
 * @returns {{
 *   votes:         object,   // { [sectorId]: answer } — votos registrados
 *   proposal:      object|null, // { sectorId, playerName, proposalText }
 *   gameState:     object|null, // El último GameStateChanged recibido
 *   sendVote:      function,  // (answer, type) → POST al backend
 *   sendProposal:  function,  // (text) → POST al backend
 *   isConnected:   boolean,
 * }}
 */
export function useGameChannel(roomCode, sectorId, playerName, participantId = null) {
    const channelRef = useRef(null);

    const [isConnected, setIsConnected]   = useState(false);
    const [votes, setVotes]               = useState({});   // { sectorId: answer }
    const [proposal, setProposal]         = useState(null); // La propuesta activa
    const [gameState, setGameState]       = useState(null); // Último estado del host

    // ── Suscripción al canal ──────────────────────────────────────────────────
    useEffect(() => {
        if (!roomCode || !window.Echo) return;

        const channelName = `game.${roomCode}`;

        channelRef.current = window.Echo.channel(channelName)
            .listen('.player.voted', (e) => {
                setVotes(prev => ({ ...prev, [e.sectorId]: e.answer }));
            })
            .listen('.proposal.submitted', (e) => {
                setProposal({
                    sectorId:    e.sectorId,
                    playerName:  e.playerName,
                    text:        e.proposalText,
                });
            })
            .listen('.game.state.changed', (e) => {
                setGameState(e);
                // Si el host cambia de reto, limpiar los votos anteriores
                if (e.state === 'challenge') {
                    setVotes({});
                    setProposal(null);
                }
            })
            .subscribed(() => {
                setIsConnected(true);
                console.log(`[HUE-CO2] Conectado al canal: ${channelName}`);
            })
            .error((error) => {
                console.error(`[HUE-CO2] Error en canal ${channelName}:`, error);
                setIsConnected(false);
            });

        return () => {
            window.Echo.leave(channelName);
            setIsConnected(false);
        };
    }, [roomCode]);

    // ── Enviar Voto (MobileController → Backend → Reverb → LocalDisplayBoard) ──
    const sendVote = useCallback(async (answer, type = 'options', sectorIdOverride = null) => {
        const finalSectorId = sectorIdOverride || sectorId;
        if (!roomCode || !finalSectorId) return;
        try {
            await axios.post(`/api/game/${roomCode}/vote`, {
                sector_id:       finalSectorId,
                player_name:     playerName,
                participant_id:  participantId,
                answer,
                type,
            });
        } catch (err) {
            console.error('[HUE-CO2] Error al enviar voto:', err);
        }
    }, [roomCode, sectorId, playerName, participantId]);

    // ── Enviar Propuesta (Texto Libre) ────────────────────────────────────────
    const sendProposal = useCallback(async (text, sectorIdOverride = null) => {
        const finalSectorId = sectorIdOverride || sectorId;
        if (!roomCode || !finalSectorId || !text.trim()) return;
        try {
            await axios.post(`/api/game/${roomCode}/proposal`, {
                sector_id:       finalSectorId,
                player_name:     playerName,
                participant_id:  participantId,
                proposal_text:   text,
            });
        } catch (err) {
            console.error('[HUE-CO2] Error al enviar propuesta:', err);
        }
    }, [roomCode, sectorId, playerName, participantId]);

    return {
        isConnected,
        votes,
        proposal,
        gameState,
        sendVote,
        sendProposal,
    };
}
