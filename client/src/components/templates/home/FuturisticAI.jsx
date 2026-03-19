import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';
import TiltCard from '../../ui/TiltCard';
import FluidBackground from '../../ui/FluidBackground';

const FuturisticAI = ({ settings = {} }) => {
    return (
        <section className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-transparent">
            <FluidBackground />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content */}
                    <motion.div 
                        className="flex-grow text-center lg:text-left space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.3em]">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                            Next-Gen Engine v3.0
                        </div>
                        
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-[var(--text-primary)]">
                            Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-orange-400">Branded UI</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-xl leading-relaxed">
                            Crafting high-fidelity interactive experiences for {settings?.siteName || 'Sonu Prasad'}. Where luxury design meets technical excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <PremiumButton variant="primary">Explore Works</PremiumButton>
                            <PremiumButton variant="outline">Learn More</PremiumButton>
                        </div>
                    </motion.div>

                    {/* Right 3D Element */}
                    <div className="w-full lg:w-[450px] shrink-0">
                        <TiltCard className="aspect-square">
                            <div className="w-full h-full glass rounded-[40px] flex flex-col items-center justify-center p-12 border-t-2 border-l-2 border-white/20 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent pointer-events-none" />
                                
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-48 h-48 rounded-full border-4 border-dashed border-[var(--accent)]/30 flex items-center justify-center p-4 mb-8"
                                >
                                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--accent)] to-amber-200 animate-pulse shadow-[0_0_50px_var(--accent-glow)]" />
                                </motion.div>

                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-black text-[var(--text-primary)]">AI-Core Stable</h3>
                                    <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest opacity-70 italic">Processing {settings?.siteName || 'Reality'} Visuals...</p>
                                </div>

                                {/* Floating Data Badges */}
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute top-12 left-8 glass p-3 rounded-2xl border-white/10"
                                >
                                    <span className="text-[10px] font-mono text-[var(--accent)]">LATENCY: 1.2ms</span>
                                </motion.div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FuturisticAI;
