import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Star, Hexagon, Heart, Moon, Droplet, Send, Target, CheckCircle2, Minus, X, Shirt } from 'lucide-react';

export default function ChallengeCard({ 
    challenge = {}, 
    intensity, 
    setIntensity, 
    onApply, 
    readOnly = false,
    sectorColor = 'blue' 
}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [proposalText, setProposalText] = useState('');

    const colorMap = {
        violet: { base: 'bg-violet-600', outline: 'outline-violet-600', gradient: 'from-violet-400/20 to-violet-700/0', focus: 'focus:border-violet-400', button: 'hover:bg-violet-500' },
        emerald: { base: 'bg-emerald-600', outline: 'outline-emerald-600', gradient: 'from-emerald-400/20 to-emerald-700/0', focus: 'focus:border-emerald-400', button: 'hover:bg-emerald-500' },
        rose: { base: 'bg-rose-600', outline: 'outline-rose-600', gradient: 'from-rose-400/20 to-rose-700/0', focus: 'focus:border-rose-400', button: 'hover:bg-rose-500' },
        blue: { base: 'bg-blue-600', outline: 'outline-blue-600', gradient: 'from-blue-400/20 to-cyan-700/0', focus: 'focus:border-blue-400', button: 'hover:bg-blue-500' },
        indigo: { base: 'bg-indigo-600', outline: 'outline-indigo-600', gradient: 'from-indigo-400/20 to-indigo-700/0', focus: 'focus:border-indigo-400', button: 'hover:bg-indigo-500' },
        fuchsia: { base: 'bg-fuchsia-600', outline: 'outline-fuchsia-600', gradient: 'from-fuchsia-400/20 to-fuchsia-700/0', focus: 'focus:border-fuchsia-400', button: 'hover:bg-fuchsia-500' },
    };

    const activeColor = colorMap[sectorColor] || colorMap.blue;
    const challengeType = challenge.type || 'options'; // options, open, slider, validate

    const renderOptionsGrid = () => {
        const optionStyles = [
            { light: 'bg-rose-500', dark: 'bg-rose-700', icon: <Star fill="white" size={24} color="white" /> },
            { light: 'bg-amber-400', dark: 'bg-amber-700', icon: <Hexagon fill="white" size={24} color="white" /> },
            { light: 'bg-emerald-500', dark: 'bg-emerald-700', icon: <Heart fill="white" size={24} color="white" /> },
            { light: 'bg-blue-500', dark: 'bg-blue-700', icon: <Moon fill="white" size={24} color="white" /> }
        ];

        return (
            <div className="flex flex-col h-full mt-auto pb-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 w-full flex-grow">
                    {challenge.options?.map((opt, idx) => {
                        const style = optionStyles[idx];
                        const isSelected = selectedAnswer === opt;
                        return (
                            <div 
                                key={idx} 
                                onClick={() => !readOnly && setSelectedAnswer(opt)}
                                className={`relative flex flex-col min-h-[110px] w-full group transition-transform ${readOnly ? '' : 'cursor-pointer active:scale-95'}`}
                            >
                                <div className={`absolute inset-0 top-1.5 rounded-xl ${style.dark} ${isSelected ? 'ring-4 ring-indigo-200' : ''}`}></div>
                                <div className={`relative flex flex-col h-[calc(100%-6px)] z-10 w-full drop-shadow-sm ${isSelected ? '-translate-y-1' : ''} transition-all`}>
                                    <div className={`h-[45px] w-full ${style.light} rounded-t-xl border-b-[0.83px] border-${style.dark?.split('-')[1]}-700 flex items-center justify-center`}>
                                        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                                            {style.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-stone-100 rounded-b-xl border-x border-b border-gray-300 px-2 py-1.5 flex items-center justify-center group-hover:bg-white transition-colors">
                                        <span className="text-stone-500 text-[9px] md:text-[10px] font-semibold text-center leading-snug line-clamp-3">
                                            {opt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {!readOnly && (
                    <button 
                        onClick={onApply}
                        className={`mt-4 w-full py-3 rounded-xl font-bold uppercase tracking-widest text-white shadow-lg transition-all ${selectedAnswer ? `${activeColor.base} active:scale-95` : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        Confirmar Voto
                    </button>
                )}
            </div>
        );
    };

    const renderOpen = () => (
        <div className="flex flex-col flex-1 animate-in fade-in h-full pb-2">
            {!readOnly ? (
                <>
                    <textarea 
                        className={`flex-1 w-full bg-white border-2 border-slate-200 rounded-2xl p-4 mt-2 outline-none text-sm font-medium transition-all ${activeColor.focus} resize-none shadow-inner`}
                        placeholder="Escribe tu propuesta aquí para solucionar la crisis..."
                        value={proposalText}
                        onChange={(e) => setProposalText(e.target.value)}
                    />
                    <button 
                         onClick={onApply}
                         className={`mt-4 w-full text-white font-black py-4 rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 ${activeColor.base} ${activeColor.button}`}
                    >
                        <Send size={18} /> Enviar al Grupo
                    </button>
                </>
            ) : (
                <div className="flex-1 mt-4 flex items-center justify-center border-2 border-dashed border-slate-200 bg-white/50 rounded-2xl p-6">
                    <p className="text-slate-400 font-medium text-center animate-pulse">
                        Esperando que el responsable redacte una propuesta creativa...
                    </p>
                </div>
            )}
        </div>
    );

    const renderSlider = () => (
        <div className="flex flex-col flex-1 items-center justify-center pb-4">
            <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                key={intensity}
                className="relative mt-auto mb-8"
            >
                <div className={`${activeColor.base} text-white font-black text-5xl lg:text-6xl px-10 py-5 rounded-[2rem] shadow-[0_6px_0_0_rgba(0,0,0,0.15)]`}>
                    {intensity}{challenge.unit || '%'}
                </div>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 ${activeColor.base} rotate-45`}></div>
            </motion.div>

            {!readOnly ? (
                <div className="w-full mb-6">
                    <input
                        type="range"
                        min={challenge.sliderMin || 0}
                        max={challenge.sliderMax || 100}
                        step={challenge.sliderStep || 1}
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-current transition-all"
                        style={{
                            background: `linear-gradient(to right, currentColor ${intensity}%, #e2e8f0 ${intensity}%)`,
                            color: activeColor.base.replace('bg-', '#').replace('-600', '-500')
                        }}
                    />
                    <div className="flex justify-between mt-3 px-1 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                        <div>MÍN: {challenge.sliderMin || 0}</div>
                        <div>MÁX: {challenge.sliderMax || 100}</div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center mt-4">
                     <p className="text-slate-400 font-medium text-center uppercase tracking-widest text-[10px]">
                        El jugador está evaluando el impacto...
                    </p>
                </div>
            )}

            {!readOnly && (
                <button
                    onClick={onApply}
                    className={`w-full py-4 ${activeColor.base} text-white rounded-xl font-bold uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-auto`}
                >
                    Aplicar Medida <Zap className="w-5 h-5 text-yellow-300" />
                </button>
            )}
        </div>
    );

    const renderValidate = () => (
        <div className="flex flex-col flex-1 animate-in slide-in-from-right-4 duration-300 h-full pb-2">
            {/* Propuesta bajo escrutinio */}
            <div className="bg-slate-50 border-[2px] border-slate-200 rounded-2xl p-5 mb-6 relative border-dashed mt-2">
                <div className={`absolute -top-4 -left-3 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm ${activeColor.base.replace('bg-', 'text-')}`}>
                    <Shirt size={20} />
                </div>
                <p className="text-slate-700 font-bold italic text-sm leading-relaxed mt-1">
                    "{challenge.proposal || 'Prohibir totalmente la venta de ropa con más de un 20% de poliéster.'}"
                </p>
            </div>

            <div className="text-[10px] font-black text-slate-400 text-center uppercase tracking-[0.2em] mb-4">
                ¿Es esta medida viable y realista?
            </div>
            
            {!readOnly ? (
                <div className="space-y-3 mt-auto">
                    <button 
                        onClick={() => setSelectedAnswer('valid')}
                        className={`w-full border-[2.5px] py-3.5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-sm active:scale-95
                        ${selectedAnswer === 'valid' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600'}`}
                    >
                        <CheckCircle2 size={20} /> Es Válida
                    </button>
                    <button 
                        onClick={() => setSelectedAnswer('partial')}
                        className={`w-full border-[2.5px] py-3.5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-sm active:scale-95
                        ${selectedAnswer === 'partial' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-white border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600'}`}
                    >
                        <Minus size={20} /> Incompleta / Discutible
                    </button>
                    <button 
                        onClick={() => setSelectedAnswer('invalid')}
                        className={`w-full border-[2.5px] py-3.5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-sm active:scale-95
                        ${selectedAnswer === 'invalid' ? 'bg-rose-50 border-rose-500 text-rose-800' : 'bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600'}`}
                    >
                        <X size={20} /> Es Incorrecta
                    </button>
                </div>
            ) : (
                <div className="flex-1 mt-auto flex items-center justify-center bg-slate-100 rounded-2xl">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] animate-pulse">
                        El grupo está votando...
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[340px] lg:w-[400px] h-[600px] relative shrink-0"
        >
            {/* Sombra 3D General */}
            <div className={`absolute inset-0 top-[10px] ${activeColor.base} rounded-[2rem]`}></div>

            {/* Contenedor Superior Blanco */}
            <div className={`absolute inset-0 h-[calc(100%-10px)] bg-white rounded-[2rem] outline outline-[2.5px] outline-offset-[-2.5px] ${activeColor.outline} flex flex-col p-6 overflow-hidden`}>
                
                <div className={`absolute bg-gradient-to-b ${activeColor.gradient} inset-0 pointer-events-none rounded-[2rem] z-0`}></div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className={`flex items-center gap-2 ${activeColor.base.replace('bg-', 'text-')} font-bold text-sm uppercase tracking-wider`}>
                            <Droplet size={20} strokeWidth={2.5} /> {challenge.sectorName || 'Reto del Sector'}
                        </div>
                        <div className="px-2.5 py-1 bg-neutral-100 rounded-md xl:shadow-inner border border-stone-200">
                            <span className="text-stone-500 text-[9px] font-bold uppercase tracking-widest">
                                Turno {challenge.turn || '3/15'}
                            </span>
                        </div>
                    </div>

                    {/* Título Principal y Descripción General */}
                    <div className={`flex flex-col gap-2 ${challengeType !== 'slider' ? 'mb-4' : 'mb-8'}`}>
                        <h2 className="text-slate-900 text-[22px] font-black tracking-tight leading-none">
                            {challenge.title || 'Título del Desafío'}
                        </h2>
                        <p className={`text-slate-500 font-medium leading-relaxed ${challengeType === 'validate' || challengeType === 'options' ? 'text-[12px]' : 'text-sm'}`}>
                            {challenge.description || 'Descripción base del reto que explica la crisis.'}
                        </p>
                    </div>

                    {/* Router Interno según Tipo de Reto */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {challengeType === 'options' && renderOptionsGrid()}
                        {challengeType === 'open' && renderOpen()}
                        {challengeType === 'slider' && renderSlider()}
                        {challengeType === 'validate' && renderValidate()}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
