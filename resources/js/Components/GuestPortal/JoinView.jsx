import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export function JoinView({ onBack, onConnect }) {
    const [pin, setPin] = useState('');
    const [nickname, setNickname] = useState('');

    const handlePinChange = (e) => {
        // Formatear PIN: 000 000
        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
        if (val.length <= 3) {
            setPin(val);
        } else {
            setPin(`${val.slice(0, 3)} ${val.slice(3)}`);
        }
    };

    const isReady = pin.replace(/\s/g, '').length === 6 && nickname.trim().length > 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="w-full max-w-md bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-2xl"
        >
            <button 
                onClick={onBack} 
                className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm"
            >
                <ChevronLeft className="w-4 h-4" /> Volver
            </button>
            <h2 className="text-3xl font-black mb-8 text-center text-[#1c1917]">¡Entra al juego!</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4">Código PIN</label>
                    <input 
                        type="text" 
                        placeholder="000 000" 
                        value={pin}
                        onChange={handlePinChange}
                        className="w-full bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl py-5 px-6 text-center text-3xl font-black tracking-[0.3em] focus:outline-none focus:border-[#87AF4C] transition-colors" 
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4">Tu Apodo</label>
                    <input 
                        type="text" 
                        placeholder="Ej: ECO-Héroe" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl py-4 px-6 text-center font-bold text-lg focus:outline-none focus:border-[#87AF4C]" 
                    />
                </div>
                <button 
                    disabled={!isReady}
                    onClick={() => onConnect({ pin, nickname })}
                    className={`w-full py-5 rounded-2xl font-black text-xl shadow-lg transition-all ${
                        isReady 
                        ? 'bg-[#1c1917] text-white hover:bg-[#292524]' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    Conectar
                </button>
            </div>
        </motion.div>
    );
}
