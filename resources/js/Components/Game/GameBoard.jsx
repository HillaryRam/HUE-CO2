import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Cpu, Shirt, Flame, Snowflake, Star, Hexagon, Heart, Moon,
  Clock, Pause, LogOut, FlaskConical, Scale, Droplets,
  Send, Zap, CheckCircle2, MessageSquare, Database, Sprout, Landmark, Coins
} from 'lucide-react';
import { ROLES } from '../../data/gameData';
import { ChallengeCard } from './ChallengeCard';
import { ActionBar } from './ActionBar';

export function GameBoard({ players: activePlayers, onEnd, tutorialStep = -1, gameMode = 'solo', myRole }) {
  const [timeLeft, setTimeLeft] = useState(105); // 1:45

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sistema', text: '¡Bienvenidos al modo multijugador!', type: 'system' },
    { id: 2, user: 'Textil', text: 'Hola equipo, ¿qué porcentaje ponemos en el agua?', type: 'user' },
    { id: 3, user: 'Ciencia', text: 'Yo creo que un 70% es ideal para este turno.', type: 'user' }
  ]);
  const [votedSectors, setVotedSectors] = useState({});
  const [intensity, setIntensity] = useState(50);

  const [orbitalAngle, setOrbitalAngle] = useState(0);

  // Estado de los 6 Sectores (en modo un jugador, controlamos todos)
  const [sectorStates, setSectorStates] = useState({
    textil: { tokens: 3, color: 'indigo' },
    ciencia: { tokens: 5, color: 'blue' },
    tech: { tokens: 4, color: 'violet' },
    primario: { tokens: 3, color: 'emerald' },
    publico: { tokens: 4, color: 'rose' },
    ciudadania: { tokens: 2, color: 'fuchsia' },
  });

  const getRoleIcon = (iconName, id) => {
    // Prioridad a los iconos originales por ID
    if (id === 'tech') return <Cpu className="w-8 h-8" />;
    if (id === 'primario') return <Sprout className="w-8 h-8" />;
    if (id === 'publico') return <Scale className="w-8 h-8" />;

    switch (iconName) {
      case 'Shirt': return <Shirt className="w-8 h-8" />;
      case 'FlaskConical': return <FlaskConical className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      default: return <Hexagon className="w-8 h-8" />;
    }
  };

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

  // Sectores para visualización de roles (herencia de la lógica de "players" anterior)
  const availableSectors = ROLES.map(role => ({
    ...role,
    ...getRoleColors(role.id),
    tokens: sectorStates[role.id]?.tokens || 0
  }));



  // Bucle de animación para la rotación orbital
  useEffect(() => {
    let requestRef;
    const animate = () => {
      setOrbitalAngle(prev => (prev + 0.10) % 360); // Velocidad muy lenta y suave (0.10 grados por frame)
      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };


  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans text-slate-800 overflow-hidden">

      {/* ================= HEADER ================= */}

      {/* ================= ÁREA SUPERIOR (TABLERO Y DESAFÍO) ================= */}
      <div className="flex-1 flex flex-col px-8 pt-8 pb-4 max-w-[1500px] w-full mx-auto min-h-0">

        {/* FILA DE CONTROLES ALINEADOS */}
        <div className="flex justify-between items-center mb-8">
          {/* Sala Online (Alineado a la izquierda) */}
          <div className="bg-white px-5 py-2.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-black text-slate-600 tracking-widest uppercase">SALA ONLINE: 772 904</span>
          </div>

          {/* Tiempo y Salida (Alineado a la derecha) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100">
              <Clock className="w-6 h-6 text-slate-500" strokeWidth={2.5} />
              <span className={`font-black text-2xl tabular-nums tracking-tight ${timeLeft < 30 ? 'text-rose-500' : 'text-slate-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button className="bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100 text-slate-600 hover:text-slate-900 transition-colors">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL (Termómetro, Tablero, Carta) */}
        <div className="flex-1 flex items-center justify-between gap-6 min-h-0">

          {/* 1. TERMÓMETRO LATERAL EXACTO */}
          <div className="w-[58px] h-full max-h-[360px] bg-white rounded-full p-1.5 flex flex-col items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 shrink-0">
            <Flame className="text-rose-400 w-8 h-8 mt-2" strokeWidth={2} />

            <div className="w-8 flex-1 bg-white rounded-full my-3 flex flex-col relative border border-slate-200 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#38bdf8]"></div>
              <div className="absolute inset-0 flex flex-col justify-evenly py-4 items-center z-10">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-5 h-[2px] rounded-full ${i < 4 ? 'bg-slate-900' : 'bg-white/70'}`}></div>
                ))}
              </div>
            </div>

            <Snowflake className="text-sky-400 w-8 h-8 mb-2" strokeWidth={2.5} />
          </div>

          {/* 2. TABLERO DE ANILLOS CENTRAL */}
          <div className="flex-1 relative flex items-center justify-center aspect-square max-w-[350px] lg:max-w-[450px]">
            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-[radial-gradient(circle,_#D4AAE2_20%,_#642E7E_100%)] shadow-[0_0_50px_rgba(100,46,126,0.3)]">

              {/* SVG para los Anillos (Líneas continuas con grosor original) */}
              <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="250" cy="250" r="80" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle cx="250" cy="250" r="115" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle cx="250" cy="250" r="150" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle cx="250" cy="250" r="185" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle cx="250" cy="250" r="220" fill="none" stroke="#3b82f6" strokeWidth="10" />
              </svg>

              {/* Tierra en el Centro */}
              <img
                src="/images/earth_icon.png"
                alt="Planet Earth"
                className="z-10 w-[90px] h-[90px] lg:w-[110px] h-[110px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />

              {/* NODOS ORBITANDO EL ANILLO AZUL (r=250) */}
              {availableSectors.map((p, i) => {
                // Ángulo base + Rotación orbital
                const baseAngle = (i * 60 - 30);
                const currentAngle = (baseAngle + orbitalAngle) * (Math.PI / 180);

                const radiusPercent = 44;
                const x = 50 + radiusPercent * Math.cos(currentAngle);
                const y = 50 + radiusPercent * Math.sin(currentAngle);

                return (
                  <div
                    key={p.id}
                    className={`absolute w-10 h-10 lg:w-12 lg:h-12 -ml-5 -mt-5 lg:-ml-6 lg:-mt-6 rounded-full ${p.bg} ${p.text} flex items-center justify-center z-20 shadow-sm border ${p.border}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {getRoleIcon(p.iconName, p.id)}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. CARTA DE DESAFÍO DERECHA */}
          <ChallengeCard
            intensity={intensity}
            setIntensity={setIntensity}
          />
        </div>
      </div>

      <ActionBar
        gameMode={gameMode}
        myRole={myRole}
        sectorStates={sectorStates}
        messages={messages}
        setMessages={setMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        votedSectors={votedSectors}
        setVotedSectors={setVotedSectors}
        getRoleColors={getRoleColors}
        getRoleIcon={getRoleIcon}
      />
    </div>
  );
};
