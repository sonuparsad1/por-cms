import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';

const SplitScreen = ({ settings }) => {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center border-b border-[var(--border)]">
            <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center bg-[var(--bg-secondary)]/30">
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[var(--accent)] font-bold uppercase tracking-widest mb-4 block"
                >
                    Available for Work
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl lg:text-7xl font-black text-[var(--text-primary)] mb-6 leading-[1.1]"
                >
                    Crafting <span className="text-glow">Digital</span> Excellence.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-[var(--text-secondary)] mb-10 max-w-md"
                >
                    {settings.siteDescription}
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4"
                >
                    <PremiumButton>Case Studies</PremiumButton>
                    <button className="px-8 py-3.5 rounded-xl font-bold border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-all">
                        Contact Me
                    </button>
                </motion.div>
            </div>
            <div className="flex-1 h-[50vh] md:h-screen bg-[var(--bg-secondary)] relative overflow-hidden group">
                {/* Image placeholder with effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-12 right-12 z-10 glass p-6 rounded-2xl border border-[var(--border)] max-w-xs scale-90 group-hover:scale-100 transition-transform">
                    <p className="text-sm italic font-medium opacity-80">"Innovation is not about adding more; it's about removing the unnecessary."</p>
                </div>
            </div>
        </section>
    );
};

export default SplitScreen;
