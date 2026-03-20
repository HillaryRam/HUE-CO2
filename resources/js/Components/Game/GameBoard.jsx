import React, { useState, useEffect } from 'react';
import { ROLES, CHALLENGES, EVENTS, RINGS } from '../../data/gameData';
import { Thermometer as ThermoUI } from './Thermometer';
import { RulesModal } from './RulesModal';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Zap, ShieldAlert, CheckCircle2, XCircle, Users, Shirt, Database, FlaskConical, Sprout, Landmark, Globe2, BookOpen } from 'lucide-react';

const ICON_MAP = {
  Shirt,
  FlaskConical,
  Database,
  Sprout,
  Landmark,
  Users
};

const RING_COLORS = ['#94a3b8', '#38bdf8', '#a78bfa', '#facc15', '#f43f5e'];

export function GameBoard({ players, onEnd, tutorialStep = -1 }) {
  const [temp, setTemp] = useState(0.0);
  const [ecoTokens, setEcoTokens] = useState(5);
  const [ringIndex, setRingIndex] = useState(0);
  const [ringProgress, setRingProgress] = useState(0);
  
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [turnPhase, setTurnPhase] = useState('challenge');
  const [resultMsg, setResultMsg] = useState({ title: '', desc: '', type: 'info' });
  const [revealedAnswer, setRevealedAnswer] = useState(null);
  
  // Passive states
  const [shieldActive, setShieldActive] = useState(players.includes('primario'));
  const [textilFailed, setTextilFailed] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  useEffect(() => {
    startNextTurn();
  }, []);

  const startNextTurn = () => {
    setRevealedAnswer(null);
    setTextilFailed(false);

    if (temp >= 0.5) {
      onEnd(false);
      return;
    }
    if (ringIndex >= RINGS.length) {
      onEnd(true);
      return;
    }

    // Passive ET generation
    let newET = ecoTokens + 1;
    if (players.includes('ciudadania')) newET += 1;
    setEcoTokens(newET);

    // Event check (from 3rd ring, index 2)
    if (ringIndex >= 2 && Math.random() < 0.3) {
      const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setActiveEvent(event);
      setTurnPhase('event');
    } else {
      drawChallenge();
    }
  };

  const drawChallenge = () => {
    const ringChallenges = CHALLENGES.filter(c => c.ring === RINGS[ringIndex]);
    const challenge = ringChallenges[Math.floor(Math.random() * ringChallenges.length)];
    setCurrentChallenge(challenge);
    setTurnPhase('challenge');
  };

  const showResult = (title, desc, type) => {
    setResultMsg({ title, desc, type });
    setTurnPhase('result');
    setTimeout(() => {
      startNextTurn();
    }, 3000);
  };

  const handleEventAction = (action) => {
    if (action === 'accept') {
      applyTempPenalty(activeEvent.penalty);
      showResult('Evento Sufrido', `La temperatura ha subido +${activeEvent.penalty}ºC`, 'error');
    } else if (action === 'mitigate') {
      applyTempPenalty(activeEvent.penalty / 2);
      showResult('Evento Mitigado', `Gigantes Tech redujo el impacto a +${activeEvent.penalty / 2}ºC`, 'info');
    } else if (action === 'block') {
      showResult('Evento Bloqueado', `El Sector Público ha neutralizado la amenaza.`, 'success');
    }
    setActiveEvent(null);
  };

  const applyTempPenalty = (amount) => {
    if (shieldActive) {
      setShieldActive(false);
      // Shield prevents temp rise once
      return;
    }
    setTemp(t => t + amount);
  };

  const handleAnswer = (idx, forceSuccess = false) => {
    if (forceSuccess || idx === currentChallenge.answer) {
      let newET = ecoTokens + 1;
      let newProgress = ringProgress + 1;
      let newTemp = temp;
      let newRingIndex = ringIndex;

      if (newProgress >= 3) {
        newProgress = 0;
        newRingIndex++;
        newTemp -= 0.1;
        if (players.includes('publico')) newET += 1;
      }

      setEcoTokens(newET);
      setRingProgress(newProgress);
      setRingIndex(newRingIndex);
      setTemp(newTemp);
      showResult('¡Correcto!', 'Avanzamos en el ciclo de la economía circular.', 'success');
    } else {
      if (textilFailed) {
        // Textil ability used, no penalty
        showResult('Fallo Evitado', 'La Industria Textil cerró el ciclo y evitó la penalización.', 'info');
      } else {
        applyTempPenalty(0.1);
        showResult('Incorrecto', 'La decisión no fue sostenible. +0.1ºC', 'error');
      }
    }
  };

  const useAbility = (roleId) => {
    const role = ROLES.find(r => r.id === roleId);
    
    // Cost reduction for Textil on Ropa ring
    let cost = role.activeCost;
    if (roleId === 'textil' && RINGS[ringIndex] === 'Ropa') cost -= 1;

    if (ecoTokens < cost) return;

    if (roleId === 'tech' && turnPhase === 'event') {
      setEcoTokens(et => et - cost);
      handleEventAction('mitigate');
    } else if (roleId === 'publico' && turnPhase === 'event') {
      setEcoTokens(et => et - cost);
      handleEventAction('block');
    } else if (roleId === 'ciencia' && turnPhase === 'challenge') {
      setEcoTokens(et => et - cost);
      handleAnswer(currentChallenge.answer, true);
    } else if (roleId === 'primario') {
      setEcoTokens(et => et - cost);
      setTemp(t => t - 0.1);
    } else if (roleId === 'ciudadania' && turnPhase === 'challenge') {
      setEcoTokens(et => et - cost);
      setRevealedAnswer(currentChallenge.answer);
    } else if (roleId === 'textil' && turnPhase === 'challenge') {
      setEcoTokens(et => et - cost);
      setTextilFailed(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-800 p-4 md:p-8 flex flex-col font-sans relative overflow-hidden">
      {/* Table Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #444 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

      {/* Rules Button */}
      <button 
        onClick={() => setIsRulesOpen(true)}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center gap-2 px-4 py-2 bg-stone-900 border-2 border-stone-700 rounded-full text-stone-300 hover:text-white hover:border-stone-500 transition-colors shadow-lg"
      >
        <BookOpen size={18} />
        <span className="font-bold text-sm uppercase tracking-wider">Reglas</span>
      </button>

      {/* Top Section: Stats & Board */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 z-10 w-full max-w-7xl mx-auto">
        
        {/* Left: Thermometer */}
        <div className={`transition-all duration-300 ${tutorialStep === 4 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-3xl z-40 relative' : ''}`}>
          <ThermoUI temp={temp} />
        </div>

        {/* Center: Visual Board */}
        <div className={`relative w-full max-w-[500px] aspect-square flex items-center justify-center transition-all duration-300 ${tutorialStep === 6 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-full z-40' : ''}`}>
          
          {/* The SVG Board */}
          <div className="absolute inset-0 bg-stone-900 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-[12px] border-stone-700 flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
              {/* Core */}
              <circle cx="250" cy="250" r="45" fill="#064e3b" />
              
              {RINGS && RINGS.map((ring, i) => {
                const radius = 190 - (i * 32);
                const isActive = i === ringIndex;
                const isCompleted = i < ringIndex;
                const color = RING_COLORS[i];

                return (
                  <g key={ring}>
                    <circle 
                      cx="250" cy="250" r={radius} 
                      fill="none" 
                      stroke={isCompleted ? color : isActive ? color : '#292524'} 
                      strokeWidth={isActive ? "12" : "6"}
                      strokeDasharray={isActive ? "12 8" : "none"}
                      className={isActive ? "animate-[spin_40s_linear_infinite]" : ""}
                      style={{ transformOrigin: 'center' }}
                    />
                    {isActive && [0, 1, 2].map(p => {
                      const angle = (p * 120 - 90) * (Math.PI / 180);
                      const cx = 250 + radius * Math.cos(angle);
                      const cy = 250 + radius * Math.sin(angle);
                      return (
                        <circle 
                          key={p}
                          cx={cx} cy={cy} r="12"
                          fill={p < ringProgress ? '#fff' : '#1c1917'}
                          stroke={color}
                          strokeWidth="4"
                        />
                      );
                    })}
                    <text 
                      x="250" y={250 - radius - 12} 
                      fill={isCompleted || isActive ? color : '#57534e'} 
                      textAnchor="middle"
                      className="text-[10px] font-black uppercase tracking-widest"
                    >
                      {ring}
                    </text>
                  </g>
                );
              })}
            </svg>
            <Globe2 size={48} className="text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Cards Overlay */}
          <AnimatePresence mode="wait">
            {(turnPhase === 'event' || turnPhase === 'challenge' || turnPhase === 'result') && (
              <motion.div 
                key={turnPhase}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className={`absolute z-20 w-[85%] max-w-[350px] ${tutorialStep === 7 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-2xl' : ''}`}
              >
                {turnPhase === 'event' && activeEvent && (
                  <div className="bg-red-50 border-8 border-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full aspect-[3/4] flex flex-col relative overflow-hidden">
                    <div className="flex items-center gap-2 text-red-600 mb-4">
                      <ShieldAlert size={24} />
                      <h2 className="text-lg font-black uppercase tracking-widest">Evento Climático</h2>
                    </div>
                    <h3 className="text-2xl font-black text-stone-900 mb-4 leading-tight">{activeEvent.title}</h3>
                    <p className="text-sm text-stone-700 mb-8 flex-1 font-medium">{activeEvent.description}</p>
                    
                    <button 
                      onClick={() => handleEventAction('accept')}
                      className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-md"
                    >
                      Aceptar (+{activeEvent.penalty}ºC)
                    </button>
                  </div>
                )}

                {turnPhase === 'challenge' && currentChallenge && (
                  <div className="bg-stone-50 border-8 border-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full aspect-[3/4] flex flex-col relative overflow-hidden">
                    <div className="inline-block px-3 py-1 bg-stone-200 text-stone-600 font-bold text-[10px] rounded-full mb-4 uppercase tracking-widest self-start">
                      Desafío: {currentChallenge.ring}
                    </div>
                    <h2 className="text-lg font-bold text-stone-900 mb-4 leading-tight flex-1">
                      {currentChallenge.question}
                    </h2>
                    
                    <div className="flex flex-col gap-2">
                      {currentChallenge.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className={`p-2.5 text-left rounded-xl border-2 font-bold transition-all text-xs
                            ${revealedAnswer === idx 
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-900' 
                              : 'border-stone-300 bg-white hover:border-emerald-400 hover:bg-stone-100 text-stone-700 shadow-sm'
                            }
                          `}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {turnPhase === 'result' && (
                  <div className={`border-8 border-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full aspect-[3/4] flex flex-col items-center justify-center text-center relative overflow-hidden
                    ${resultMsg.type === 'success' ? 'bg-emerald-100 text-emerald-900' : 
                      resultMsg.type === 'error' ? 'bg-red-100 text-red-900' : 
                      'bg-blue-100 text-blue-900'}
                  `}>
                    <div className="mb-6">
                      {resultMsg.type === 'success' && <CheckCircle2 size={64} className="text-emerald-500 drop-shadow-md" />}
                      {resultMsg.type === 'error' && <XCircle size={64} className="text-red-500 drop-shadow-md" />}
                      {resultMsg.type === 'info' && <ShieldAlert size={64} className="text-blue-500 drop-shadow-md" />}
                    </div>
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">{resultMsg.title}</h2>
                    <p className="text-sm font-medium opacity-80">{resultMsg.desc}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Eco-Tokens */}
        <div className={`flex flex-col items-center gap-4 transition-all duration-300 ${tutorialStep === 5 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-3xl z-40 relative p-4 bg-stone-800' : ''}`}>
          <h3 className="font-black text-stone-400 uppercase text-xs tracking-widest">Eco-Tokens</h3>
          <div className="relative w-32 h-32 bg-emerald-500 rounded-full border-8 border-emerald-700 shadow-[0_10px_0_#047857,0_20px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transform hover:-translate-y-1 transition-transform cursor-default">
            <span className="text-5xl font-black text-white drop-shadow-lg">{ecoTokens}</span>
            <Leaf size={32} className="absolute bottom-3 text-emerald-200 opacity-40" />
          </div>
        </div>
      </div>

      {/* Bottom: Abilities Panel (Player Mat) */}
      <div className={`mt-8 w-full max-w-5xl mx-auto bg-stone-900 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-8 border-stone-700 z-10 ${tutorialStep === 8 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800' : ''}`}>
        <h3 className="font-black text-stone-400 mb-6 uppercase text-sm tracking-widest text-center">Panel de Especialistas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {players.map(roleId => {
            const role = ROLES && ROLES.find(r => r.id === roleId);
            if (!role) return null;
            let cost = role.activeCost;
            if (roleId === 'textil' && RINGS[ringIndex] === 'Ropa') cost -= 1;
            
            const canAfford = ecoTokens >= cost;
            let isUsable = false;
            
            if (roleId === 'tech' || roleId === 'publico') isUsable = turnPhase === 'event';
            else if (roleId === 'ciencia' || roleId === 'ciudadania' || roleId === 'textil') isUsable = turnPhase === 'challenge';
            else if (roleId === 'primario') isUsable = true;

            const Icon = ICON_MAP[role.iconName] || Leaf;

            return (
              <button
                key={roleId}
                onClick={() => useAbility(roleId)}
                disabled={!canAfford || !isUsable}
                className={`p-4 rounded-2xl border-b-4 text-left flex flex-col transition-all relative overflow-hidden
                  ${canAfford && isUsable 
                    ? 'bg-stone-800 border-stone-950 hover:bg-stone-700 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer' 
                    : 'bg-stone-800/50 border-stone-900 opacity-50 cursor-not-allowed'}
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={20} className={canAfford && isUsable ? 'text-emerald-400' : 'text-stone-500'} />
                  <span className="font-bold text-sm text-stone-200 truncate">{role.name}</span>
                </div>
                <div className="text-[10px] text-stone-400 leading-tight mb-3 flex-1 font-medium">{role.activeDesc}</div>
                <div className="text-xs font-black text-stone-900 bg-emerald-500 self-start px-2 py-1 rounded-md shadow-sm">
                  -{cost} ET
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}
