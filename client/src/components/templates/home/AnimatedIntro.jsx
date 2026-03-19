import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../../ui/PremiumButton';

const AnimatedIntro = ({ settings }) => {
    return (
        <section className="min-h-screen relative flex items-center justify-center bg-[var(--bg-primary)] overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-30" />
            </div>
            
            <div className="z-10 text-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h2 className="text-[var(--accent)] font-mono text-xl mb-4 tracking-[0.3em]">INITIATING PORTFOLIO</h2>
                    <h1 className="text-7xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter mb-8 italic">
                        {settings.siteName.split(' ')[0]} <br/> 
                        <span className="text-glow">{settings.siteName.split(' ')[1]}</span>
                    </h1>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <PremiumButton className="!rounded-full !px-12 !py-5 text-lg shadow-2xl shadow-[var(--accent)]/40 hover:scale-105">
                        Initialize Experience
                    </PremiumButton>
                </motion.div>
            </div>
            
            {/* Animated particles placeholder */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[var(--accent)] rounded-full"
                        animate={{
                            x: [Math.random() * 800 - 400, Math.random() * 800 - 400],
                            y: [Math.random() * 800 - 400, Math.random() * 800 - 400],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default AnimatedIntro;
