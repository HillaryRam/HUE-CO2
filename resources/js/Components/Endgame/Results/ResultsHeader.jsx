import React from 'react';
import { motion } from 'framer-motion';

export default function ResultsHeader({ current }) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-6xl mt-8 flex flex-col items-center text-center z-10"
        >
            {/* Planeta Central Reactivo con Imagen Real */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`w-40 h-40 rounded-full relative flex items-center justify-center mb-5  overflow-hidden bg-transparent`}
            >
                <img
                    src="/images/earth_icon.png"
                    alt="Tierra"
                />

            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className={`inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-slate-100 shadow-sm mb-6 ${current.statusColor}`}
            >
                {current.tag}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 transition-colors duration-500 uppercase ${current.statusColor}`}
            >
                {current.title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-[#78716c] font-medium max-w-2xl leading-relaxed px-4"
            >
                {current.subtitle}
            </motion.p>
        </motion.header>
    );
}
