import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Cpu, Shirt, Flame, Snowflake, Star, Hexagon, Heart, Moon,
  Clock, Pause, LogOut, FlaskConical, Tractor, Scale, Droplets,
  Send, Zap, CheckCircle2, MessageSquare, Database, Sprout, Landmark, Coins
} from 'lucide-react';
import { ROLES } from '../../data/gameData';

export function GameBoard({ players: activePlayers, onEnd, tutorialStep = -1 }) {
  const [timeLeft, setTimeLeft] = useState(105); // 1:45
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [chatInput, setChatInput] = useState('');

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
    if (id === 'primario') return <Tractor className="w-8 h-8" />;
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

  const options = [
    { id: 'A', icon: <Star fill="currentColor" size={28} />, color: 'bg-[#f43f5e]', text: 'Instalar filtros de microplásticos en lavanderías.' },
    { id: 'B', icon: <Hexagon fill="currentColor" size={28} />, color: 'bg-[#facc15]', text: 'Sustituir el 60% de fibras por lino y cáñamo.' },
    { id: 'C', icon: <Heart fill="currentColor" size={28} />, color: 'bg-[#10b981]', text: 'Crear un clúster de reciclaje textil local.' },
    { id: 'D', icon: <Moon fill="currentColor" size={28} />, color: 'bg-[#3b82f6]', text: 'Pasaportes digitales para rastrear la prenda.' }
  ];

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
          <div className="w-[320px] lg:w-[380px] bg-white border-2 border-blue-500 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col p-5 lg:p-6 shrink-0 h-full">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
                <Droplets size={16} /> Anillo del Agua
              </div>
              <div className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest">
                Turno: 3/15
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-3">
              Fuga de Microplásticos
            </h2>

            <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">
              ¿Cuál es la estrategia más efectiva para cerrar el ciclo del agua en la producción textil este turno?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              {options.map(opt => {
                const isSelected = selectedAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAnswer(opt.id)}
                    className={`rounded-2xl overflow-hidden flex flex-col h-[100px] lg:h-[110px] transition-all active:scale-95 outline-none
                    ${isSelected ? 'ring-4 ring-offset-2 ring-blue-500 shadow-md' : 'border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'}`}
                  >
                    <div className={`h-[50%] flex items-center justify-center ${opt.color} text-white w-full`}>
                      {opt.icon}
                    </div>
                    <div className="h-[50%] bg-white p-2 flex items-center justify-center">
                      <span className={`text-[10px] lg:text-[11px] font-bold text-center leading-snug ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                        {opt.text}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[160px] w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30 shrink-0">
        <div className="max-w-[1500px] h-full w-full mx-auto flex items-center justify-between px-6 gap-3">
          {ROLES.map((role) => {
            const colors = getRoleColors(role.id);
            const tokens = sectorStates[role.id]?.tokens || 0;
            const canAfford = tokens >= role.activeCost;

            return (
              <button
                key={role.id}
                disabled={!canAfford}
                className={`flex-1 h-[130px] rounded-2xl border-2 transition-all duration-300 flex flex-col items-start justify-start p-4 relative group
                  ${canAfford
                    ? `${colors.bg} ${colors.border} hover:shadow-lg hover:-translate-y-1`
                    : 'bg-slate-50 border-slate-100 opacity-60 grayscale cursor-not-allowed'}
                `}
              >
                {/* Coste (Centrado óptico mejorado) */}
                <div className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-base font-black shadow-md leading-none
                  ${canAfford ? `${colors.accent} text-white` : 'bg-slate-300 text-slate-500'}
                `}>
                  {role.activeCost}
                </div>

                {/* Icono del Sector (Más grande) */}
                <div className={`${colors.text} mb-3 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(getRoleIcon(role.iconName, role.id), { className: "w-8 h-8 lg:w-9 lg:h-9" })}
                </div>

                {/* Contenedor de Textos (Más grandes y justo debajo del icono) */}
                <div className="text-left mt-auto lg:mt-0">
                  <div className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    {role.name}
                  </div>
                  <div className={`text-[11px] lg:text-[13px] font-black leading-tight ${colors.text} uppercase`}>
                    {role.activeDesc.split(':')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
