import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';
import FluidBackground from '../../ui/FluidBackground';

const CenteredHero = ({ settings = {} }) => {
    return (
        <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-transparent">
            <FluidBackground />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 space-y-8"
            >
                <div className="space-y-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--accent)] text-xs font-black uppercase tracking-[0.4em] block"
                    >
                        Established 2024
                    </motion.span>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-[var(--text-primary)] leading-[0.9]">
                        {settings?.siteName || "Sonu Prasad"}<span className="text-[var(--accent)]">.</span>
                    </h1>
                </div>

                <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium opacity-80 decoration-wavy underline decoration-[var(--accent)]/10 underline-offset-8">
                    {settings?.siteDescription || "Experienced Developer & AI Enthusiast"}
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-6">
                    <PremiumButton variant="primary" className="!px-12 !py-5 shadow-2xl">Explore Works</PremiumButton>
                    <PremiumButton variant="glass" className="!px-12 !py-5">Read Blogs</PremiumButton>
                </div>
            </motion.div>
        </section>
    );
};

export default CenteredHero;
