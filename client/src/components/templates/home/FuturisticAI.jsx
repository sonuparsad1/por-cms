import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';

const FuturisticAI = ({ settings }) => {
    return (
        <section className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden p-6">
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/A_large_blank_world_map_with_oceans_marked_in_blue.svg')] bg-center bg-no-repeat bg-cover mix-blend-overlay grayscale invert" />
            </div>

            <motion.div 
                className="z-10 border border-blue-500/30 glass p-12 rounded-[40px] max-w-4xl w-full text-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-blue-500 blur-3xl opacity-50 animate-pulse" />
                
                <h2 className="text-blue-400 font-mono tracking-[0.5em] mb-6 uppercase text-sm">Synthetic Intelligence Engine</h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                    Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Human</span> Computation.
                </h1>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                    Connecting neural networks with elegant interfaces to redefine the digital horizon. Crafted by {settings.siteName}.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Neural Core', value: 'Active' },
                        { label: 'Latency', value: '1.2ms' },
                        { label: 'Uptime', value: '99.9%' }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                            <p className="font-mono text-blue-400">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <PremiumButton className="!bg-blue-600 !border-blue-500 shadow-blue-500/20">Launch Interface</PremiumButton>
                    <button className="px-8 py-4 rounded-full border border-white/20 font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
                        Access Terminal
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default FuturisticAI;
