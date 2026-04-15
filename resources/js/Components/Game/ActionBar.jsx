import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ROLES } from '../../data/gameData';

export function ActionBar({
  gameMode,
  myRole,
  sectorStates,
  messages,
  setMessages,
  chatInput,
  setChatInput,
  votedSectors,
  setVotedSectors,
  getRoleColors,
  getRoleIcon
}) {
  return (
    <div className="h-[180px] w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30 shrink-0">
      <div className="max-w-[1500px] h-full w-full mx-auto flex items-center px-6 gap-6">

        {/* ================= BARRA MODO SOLO ================= */}
        {gameMode === 'solo' && (
          <div className="flex w-full items-center justify-between gap-3">
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
                  <div className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-base font-black shadow-md leading-none
                                    ${canAfford ? `${colors.accent} text-white` : 'bg-slate-300 text-slate-500'}
                                  `}>
                    {role.activeCost}
                  </div>

                  <div className={`${colors.text} mb-3 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(getRoleIcon(role.iconName, role.id), { className: "w-8 h-8 lg:w-9 lg:h-9" })}
                  </div>

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
        )}

        {/* ================= BARRA MODO 2-5 JUGADORES (3 BLOQUES) ================= */}
        {gameMode === 'small' && myRole && (
          <>
            {/* BLOQUE IZQUIERDO: INFORMACIÓN DE MI SECTOR */}
            <div className="w-[300px] h-[150px] shrink-0">
              {(() => {
                const colors = getRoleColors(myRole.id);
                const tokens = sectorStates[myRole.id]?.tokens || 0;
                const canAfford = tokens >= myRole.activeCost;
                return (
                  <div className={`h-full w-full rounded-2xl border-2 p-5 flex flex-col relative ${colors.bg} ${colors.border}`}>
                    <div className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-lg font-black shadow-md ${colors.accent} text-white`}>
                      {myRole.activeCost}
                    </div>

                    <div className={`${colors.text} mb-2`}>
                      {React.cloneElement(getRoleIcon(myRole.iconName, myRole.id), { className: "w-10 h-10" })}
                    </div>

                    <div className="text-left mt-auto">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        TU SECTOR: {myRole.name}
                      </div>
                      <div className={`text-sm lg:text-base font-black leading-tight ${colors.text} uppercase`}>
                        {myRole.activeDesc.split(':')[0]}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* BLOQUE CENTRAL: CHAT DEL EQUIPO */}
            <div className="flex-1 h-[150px] bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col p-3 overflow-hidden shadow-inner">
              <div className="flex-1 overflow-y-auto mb-2 pr-1 space-y-2 scrollbar-hide">
                {messages.map((msg, i) => (
                  <div key={i} className={`text-xs ${msg.type === 'system' ? 'text-slate-400 italic text-center' : 'text-slate-700'}`}>
                    {msg.type !== 'system' && (
                      <span className="font-black mr-2" style={{ color: msg.user === 'Textil' ? '#4f46e5' : msg.user === 'Ciencia' ? '#2563eb' : 'inherit' }}>
                        {msg.user || 'Jugador'}:
                      </span>
                    )}
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && setMessages([...messages, { text: chatInput }])}
                  placeholder="Escribe al equipo..."
                  className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  onClick={() => {
                    if (chatInput.trim()) {
                      setMessages([...messages, { text: chatInput, type: 'user' }]);
                      setChatInput('');
                    }
                  }}
                  className="bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-md active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* BLOQUE DERECHO: ESTADO DE VOTACIONES */}
            <div className="w-[300px] h-[150px] shrink-0 bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <CheckCircle2 size={12} className="text-emerald-500" /> Estado de Votación
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map(role => {
                  const isVoted = votedSectors[role.id];
                  const colors = getRoleColors(role.id);
                  return (
                    <button
                      key={role.id}
                      onClick={() => setVotedSectors(prev => ({ ...prev, [role.id]: !prev[role.id] }))}
                      className={`relative flex items-center justify-center p-2 rounded-xl border-2 transition-all active:scale-90
                        ${isVoted ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-100'}
                      `}
                    >
                      <div className={isVoted ? colors.text : 'text-slate-300'}>
                        {React.cloneElement(getRoleIcon(role.iconName, role.id), { className: "w-5 h-5 lg:w-6 lg:h-6" })}
                      </div>
                      {isVoted && (
                        <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle2 size={10} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
