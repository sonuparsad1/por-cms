import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';

const CenteredHero = ({ settings }) => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-[var(--text-primary)] bg-clip-text text-transparent">
                    {settings.siteName || "Sonu Prasad"}
                </h1>
                <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    {settings.siteDescription || "Experienced Developer & AI Enthusiast"}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <PremiumButton className="!px-10 !py-4 shadow-xl">Explore Projects</PremiumButton>
                    <button className="px-10 py-4 rounded-2xl border border-[var(--border)] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all">
                        Read Blogs
                    </button>
                </div>
            </motion.div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default CenteredHero;
