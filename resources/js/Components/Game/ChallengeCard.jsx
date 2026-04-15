import React, { useState } from 'react';
import { Cpu, Zap, Star, Hexagon, Heart, Moon } from 'lucide-react';

export function ChallengeCard({ intensity, setIntensity }) {
  // Configuración de la carta. Puedes modificar las preguntas y títulos aquí:
  const sectorName = "Anillo Tecnológico";
  const currentTurn = "3/15";
  const title = "Fuga de Microplásticos";
  const description = "¿Cuál es la estrategia más efectiva para cerrar el ciclo del agua en la producción textil este turno?";

  // Opciones para el modo de selección múltiple
  const options = [
    { id: 'A', icon: <Star fill="currentColor" size={28} />, color: 'bg-[#f43f5e]', text: 'Instalar filtros de microplásticos en lavanderías.' },
    { id: 'B', icon: <Hexagon fill="currentColor" size={28} />, color: 'bg-[#facc15]', text: 'Sustituir el 60% de fibras por lino y cáñamo.' },
    { id: 'C', icon: <Heart fill="currentColor" size={28} />, color: 'bg-[#10b981]', text: 'Crear un clúster de reciclaje textil local.' },
    { id: 'D', icon: <Moon fill="currentColor" size={28} />, color: 'bg-[#3b82f6]', text: 'Pasaportes digitales para rastrear la prenda.' }
  ];

  // Forzado a selección múltiple hasta que esté todo correcto
  const [questionType] = useState('multiple');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div className="w-[320px] lg:w-[380px] bg-white border-2 border-violet-500 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col p-6 shrink-0 h-full">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-violet-500 font-bold text-xs uppercase tracking-widest">
          <Cpu size={16} /> {sectorName}
        </div>
        <div className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest">
          Turno: {currentTurn}
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 leading-tight mb-3">
        {title}
      </h2>

      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex-1 flex flex-col justify-between w-full px-2">
        <div className="flex flex-col items-center w-full">
          {questionType === 'slider' ? (
            <>
              {/* Indicador de Porcentaje */}
              <div className="relative mb-6 mt-4">
                <div className="bg-violet-500 text-white font-black text-4xl px-6 py-2 rounded-2xl shadow-[0_10px_20px_rgba(139,92,246,0.3)] animate-bounce-subtle">
                  {intensity}%
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500 rotate-45"></div>
              </div>

              {/* Slider Personalizado */}
              <div className="w-full mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-violet-600 transition-all hover:h-5"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 ${intensity}%, #f1f5f9 ${intensity}%)`,
                  }}
                />
                <div className="flex justify-between mt-3 px-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mínimo</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Máximo</span>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 w-full mb-2">
              {options.map(opt => {
                const isSelected = selectedAnswer === opt.id;
                return (
                  <button 
                    key={opt.id} 
                    onClick={() => setSelectedAnswer(opt.id)}
                    className={`rounded-2xl overflow-hidden flex flex-col h-[75px] lg:h-[80px] transition-all active:scale-95 outline-none
                      ${isSelected ? 'ring-4 ring-offset-2 ring-violet-500 shadow-md' : 'border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md'}`}
                  >
                    <div className={`h-[45%] flex items-center justify-center ${opt.color} text-white w-full pt-0.5`}>
                      {React.cloneElement(opt.icon, { size: 18 })}
                    </div>
                    <div className="h-[55%] bg-white px-1 flex items-center justify-center w-full">
                      <span className={`text-[9px] lg:text-[10px] font-bold text-center leading-tight ${isSelected ? 'text-violet-700' : 'text-slate-500'}`}>
                        {opt.text}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Botón de Confirmar (Forzando margen desde abajo) */}
        <div className="pb-6 mt-auto w-full">
          <button
            className={`w-full py-4 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 group
              ${(questionType === 'multiple' && !selectedAnswer)
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-violet-500 hover:bg-violet-600 hover:scale-[1.02] active:scale-95'
              }`}
            disabled={questionType === 'multiple' && !selectedAnswer}
          >
            Aplicar Estrategia <Zap className={`w-4 h-4 ${(questionType === 'multiple' && !selectedAnswer) ? 'text-slate-400' : 'text-yellow-400 group-hover:animate-pulse'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
