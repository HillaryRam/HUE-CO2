import React, { useState } from 'react';
import { ROLES } from '../../data/gameData';
import { motion } from 'motion/react';
import { Globe2, Leaf, ShieldAlert, Zap, Users, Shirt, Database, FlaskConical, Sprout, Landmark } from 'lucide-react';

const ICON_MAP = {
    Shirt,
    FlaskConical,
    Database,
    Sprout,
    Landmark,
    Users
};

export function Setup({ onStart, onStartTutorial, tutorialStep = -1 }) {
    const [selected, setSelected] = useState([]);

    const toggleRole = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(r => r !== id));
        } else {
            if (selected.length < 6) {
                setSelected([...selected, id]);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-800 relative overflow-hidden font-sans">
            {/* Table Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #444 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 z-10"
            >
                <div className="flex items-center justify-center mb-6 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <Globe2 size={80} />
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-stone-100 mb-4 drop-shadow-xl uppercase">HUE-CO2</h1>
                <p className="text-xl text-stone-400 max-w-2xl mx-auto font-medium">
                    Una experiencia cooperativa de estrategia climática. El éxito no se mide de forma individual, sino por la salud global del planeta.
                </p>
            </motion.div>

            <div className="w-full max-w-5xl z-10">
                <h2 className="text-xl font-black mb-6 text-stone-400 text-center uppercase tracking-widest">Selecciona los Roles (1-6 Jugadores)</h2>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-300 ${tutorialStep === 1 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-3xl z-40 relative bg-stone-900 p-4' : ''}`}>
                    {ROLES.map(role => {
                        const isSelected = selected.includes(role.id);
                        const Icon = ICON_MAP[role.iconName] || Leaf;

                        return (
                            <div
                                key={role.id}
                                onClick={() => toggleRole(role.id)}
                                className={`p-6 rounded-3xl border-b-8 cursor-pointer transition-all relative overflow-hidden group
                  ${isSelected
                                        ? 'bg-stone-700 border-emerald-600 shadow-[0_10px_30px_rgba(16,185,129,0.3)] -translate-y-2'
                                        : 'bg-stone-900 border-stone-950 hover:bg-stone-800 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
                                    }
                `}
                            >
                                {/* Card Texture */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div>
                                        <h3 className={`font-black text-xl uppercase tracking-tight ${isSelected ? 'text-emerald-400' : 'text-stone-200'}`}>{role.name}</h3>
                                        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">{role.specialist}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-emerald-900/50 text-emerald-400' : 'bg-stone-800 text-stone-500'}`}>
                                        <Icon size={24} />
                                    </div>
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="bg-stone-950/50 p-3 rounded-xl">
                                        <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Pasiva</p>
                                        <p className="text-xs text-stone-300 font-medium leading-snug">{role.passiveDesc}</p>
                                    </div>
                                    <div className="bg-stone-950/50 p-3 rounded-xl">
                                        <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><ShieldAlert size={12} className="text-blue-400" /> Activa <span className="text-emerald-500 ml-auto bg-emerald-900/30 px-2 py-0.5 rounded-md">-{role.activeCost} ET</span></p>
                                        <p className="text-xs text-stone-300 font-medium leading-snug">{role.activeDesc}</p>
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500 transform translate-x-8 -translate-y-8 rotate-45 z-0"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-300 ${tutorialStep === 2 ? 'ring-4 ring-emerald-500 ring-offset-8 ring-offset-stone-800 rounded-full z-40 relative bg-stone-900 p-2' : ''}`}>
                    {tutorialStep === -1 && onStartTutorial && (
                        <button
                            onClick={onStartTutorial}
                            className="px-10 py-5 bg-stone-700 text-stone-200 font-black uppercase tracking-widest rounded-full text-lg hover:bg-stone-600 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 border-b-4 border-stone-900"
                        >
                            Tutorial
                        </button>
                    )}
                    <button
                        onClick={() => onStart(selected.length > 0 ? selected : ROLES.map(r => r.id))}
                        className="px-10 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-full text-lg hover:bg-emerald-500 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 border-b-4 border-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        {selected.length > 0 ? 'Comenzar Misión' : 'Jugar con todos los roles'}
                    </button>
                </div>
            </div>
        </div>
    );
}
