import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, Play, Clock, Users } from 'lucide-react';
import axios from 'axios'; // We need axios if we wanted to fetch initial players, but let's just listen

export function LobbyView({ mode, onBack, onStartGame, selectedPlayers, setSelectedPlayers, roomCode }) {
    console.log('[HUE-CO2] LobbyView Render Props:', { mode, roomCode, selectedPlayers });

    const safeRoomCode = String(roomCode || "").replace(/\s/g, '');
    const [connectedPlayers, setConnectedPlayers] = useState([]);

    useEffect(() => {
        if (!safeRoomCode || safeRoomCode.startsWith('LOCAL_')) return;
        
        console.log(`[HUE-CO2] Inicializando Lobby para sala: ${safeRoomCode}`);

        // Cargar jugadores que ya estén en la sala
        const fetchPlayers = async () => {
            try {
                const res = await axios.get(`/api/juego/${safeRoomCode}/estado`);
                console.log('[HUE-CO2] Estado inicial recibido:', res.data);
                if (res.data && res.data.sectors) {
                    const players = res.data.sectors.map(s => s.playerName);
                    setConnectedPlayers([...new Set(players)]);
                }
            } catch (e) {
                console.error('[HUE-CO2] Error fetching players:', e);
            }
        };
        fetchPlayers();

        // Polling de seguridad cada 5 segundos (por si falla el WebSocket)
        const pollInterval = setInterval(fetchPlayers, 5000);

        // Escuchar nuevos jugadores (solo si Echo/Reverb está disponible)
        if (!window.Echo) {
            console.info('[HUE-CO2] Echo no disponible — lobby por polling.');
            return () => clearInterval(pollInterval);
        }

        const channelName = `game.${safeRoomCode}`;
        console.log(`[HUE-CO2] Escuchando canal: ${channelName}`);
        
        const channel = window.Echo.channel(channelName);
        channel.listen('.player.joined', (e) => {
            console.log('[HUE-CO2] Evento PlayerJoined recibido vía WS:', e);
            setConnectedPlayers(prev => {
                if (prev.includes(e.playerName)) return prev;
                return [...prev, e.playerName];
            });
        });

        return () => {
            console.log(`[HUE-CO2] Abandonando Lobby: ${safeRoomCode}`);
            clearInterval(pollInterval);
            window.Echo.leave(channelName);
        };
    }, [safeRoomCode]);

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

    const renderSmallLobby = () => {
        const isReady = selectedPlayers && connectedPlayers.length >= selectedPlayers;
        
        return (
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
            
            {selectedPlayers && (
                <div className="mb-6 w-full max-w-sm">
                    <div className="flex items-center justify-between bg-[#f5f5f4] p-4 rounded-2xl border-2 border-stone-200">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-stone-500" />
                            <span className="font-bold text-stone-600">Jugadores Conectados</span>
                        </div>
                        <div className="text-xl font-black">
                            <span className={connectedPlayers.length >= selectedPlayers ? "text-[#16a34a]" : "text-[#fb923c]"}>
                                {connectedPlayers.length}
                            </span>
                            <span className="text-stone-400"> / {selectedPlayers}</span>
                        </div>
                    </div>
                    {connectedPlayers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 justify-center">
                            {connectedPlayers.map((name, i) => (
                                <span key={i} className="bg-stone-200 text-stone-700 px-3 py-1 rounded-full text-xs font-bold">{name}</span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {selectedPlayers && (
                <div className="mb-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-start gap-3 text-left max-w-sm">
                    <div className="bg-blue-500 text-white p-1 rounded-lg shrink-0">
                        <User className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-blue-800 font-bold leading-tight">
                        ANFITRIÓN: Recuerda que tú también debes conectarte con tu móvil usando el código de arriba para poder jugar y responder.
                    </p>
                </div>
            )}

            <p className="text-[#78716c] text-sm font-medium italic mb-8">Los 6 sectores se repartirán automáticamente entre vosotros.</p>

            {selectedPlayers && (
                <button
                    onClick={() => onStartGame({ players: selectedPlayers, mode: 'small' })}
                    disabled={!isReady}
                    className={`w-full max-w-sm text-white py-5 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3
                        ${isReady 
                            ? 'bg-[#fb923c] shadow-[0_8px_0_0_#ea580c] hover:shadow-[0_4px_0_0_#ea580c] hover:translate-y-1 active:shadow-none active:translate-y-2' 
                            : 'bg-stone-300 shadow-none cursor-not-allowed opacity-50'}`}
                >
                    {isReady ? '¡Comenzar Partida!' : 'Esperando Jugadores...'} 
                    {isReady && <Play className="w-6 h-6 fill-current" />}
                </button>
            )}
        </div>
    )};

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
