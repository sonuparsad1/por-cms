import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';
import FluidBackground from '../../ui/FluidBackground';
import TiltCard from '../../ui/TiltCard';

const SplitScreen = ({ settings = {} }) => {
    return (
        <section className="min-h-screen relative flex flex-col md:flex-row items-center overflow-hidden bg-transparent">
            <FluidBackground />
            
            <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                        Available for Projects
                    </span>
                    
                    <h1 className="text-6xl lg:text-8xl font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter">
                        Crafting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-orange-400">Digital</span> Excellence.
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-md font-medium leading-relaxed">
                        {settings?.siteDescription || 'High-performance developer with a passion for AI and interactive experiences.'}
                    </p>
                    
                    <div className="flex gap-4 pt-4">
                        <PremiumButton variant="primary">View Works</PremiumButton>
                        <PremiumButton variant="outline">Consultation</PremiumButton>
                    </div>
                </motion.div>
            </div>

            <div className="flex-1 w-full h-full p-12 lg:p-24 flex items-center justify-center relative z-10">
                <TiltCard className="w-full max-w-md aspect-[4/5] shadow-2xl">
                    <div className="w-full h-full glass rounded-[40px] flex flex-col items-center justify-end p-12 border-t-2 border-l-2 border-white/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-[2000ms]" alt="Code" />
                        
                        <div className="relative z-10 text-white space-y-2">
                            <h3 className="text-2xl font-black">Professional Code</h3>
                            <p className="text-sm font-medium opacity-60">"Innovation is not about adding more; it's about removing the unnecessary."</p>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </section>
    );
};

export default SplitScreen;
