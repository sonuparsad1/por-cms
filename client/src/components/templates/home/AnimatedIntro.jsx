import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';
import FluidBackground from '../../ui/FluidBackground';

const AnimatedIntro = ({ settings }) => {
    return (
        <section className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            <FluidBackground />
            
            <div className="relative z-10 text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-[var(--accent)] font-mono tracking-[0.5em] mb-4 uppercase text-xs font-black">Professional Portfolio</h2>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-[var(--text-primary)] leading-none mb-6">
                        SONU <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)] opacity-40 uppercase">PRASAD</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <p className="text-lg md:text-2xl text-[var(--accent)] font-medium italic opacity-80 decoration-wavy underline decoration-[var(--accent)]/30 underline-offset-8">
                        {settings?.role || 'Full Stack Developer & AI Enthusiast'}
                    </p>
                    <div className="flex gap-4">
                        <PremiumButton onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                            Enter Universe
                        </PremiumButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AnimatedIntro;
