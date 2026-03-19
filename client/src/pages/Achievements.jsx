import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import { Trophy, Star, ChevronRight } from 'lucide-react';
import FluidBackground from '../components/ui/FluidBackground';

const mockAchievements = [
    {
        title: "First Place - National Hackathon 2024",
        organization: "Tech Innovation Council",
        date: "2024-05-12",
        description: "Built an AI-powered automated triage system for rural healthcare clinics in 48 hours."
    },
    {
        title: "Outstanding Project Award",
        organization: "University Engineering Department",
        date: "2023-12-01",
        description: "Awarded for the 'Smart Urinal Blockage Detection' IoT system due to its practical utility and cost-effectiveness."
    }
];

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const res = await fetch('/api/achievements');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setAchievements(data.data);
                } else {
                    setAchievements(mockAchievements);
                }
            } catch (err) {
                setAchievements(mockAchievements);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <div className="min-h-screen py-24 px-6 relative overflow-hidden bg-transparent perspective-[1500px]">
            <FluidBackground />
            
            <div className="max-w-5xl mx-auto relative z-10 space-y-24">
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="inline-flex justify-center items-center p-6 glass rounded-full mb-6 relative shadow-[0_0_40px_var(--accent-glow)] border border-yellow-500/30" style={{ transform: "translateZ(80px)" }}>
                        <Trophy size={48} className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
                        <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-10px] rounded-full border-2 border-dashed border-yellow-500/50"
                        />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 text-[var(--text-primary)] tracking-tighter drop-shadow-2xl" style={{ transform: "translateZ(60px)" }}>
                        Honors & <span className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">Awards</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] font-medium italic opacity-80" style={{ transform: "translateZ(30px)" }}>
                        Recognitions driving my passion for engineering excellence.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                    </div>
                ) : (
                    <div className="relative pl-8 md:pl-0" style={{ transformStyle: "preserve-3d" }}>
                        {/* 3D Core Timeline Pillar */}
                        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-2 bg-[var(--accent)]/10 shadow-[0_0_30px_var(--accent-glow)] md:-translate-x-1/2 rounded-full" style={{ transform: "translateZ(-50px)" }}></div>
                        
                        <div className="space-y-20">
                            {achievements.map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, rotateY: idx % 2 === 0 ? 30 : -30, z: -150 }}
                                    whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    key={idx}
                                    style={{ transformStyle: "preserve-3d" }}
                                    className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center perspective-[1000px]`}
                                >
                                    {/* Glowing 3D Node */}
                                    <div className="absolute left-[-49px] md:left-1/2 w-10 h-10 rounded-full bg-black/50 border-4 border-yellow-500 z-20 md:-translate-x-1/2 shadow-[0_0_20px_rgba(234,179,8,0.8)] flex items-center justify-center" style={{ transform: "translateZ(50px)" }}>
                                        <Star size={16} className="text-yellow-400 drop-shadow" />
                                    </div>
                                    
                                    <div className="w-full md:w-[45%] lg:w-[40%] px-0 mt-6 md:mt-0">
                                        <TiltCard depth={40} maxTilt={15} enableGlare={true}>
                                            <GlassCard hoverEffect={false} className={`relative overflow-hidden bg-white/5 dark:bg-black/20 border border-white/10 shadow-2xl group ${idx % 2 === 0 ? 'md:text-left text-left' : 'md:text-right text-left'}`}>
                                                {/* Ambient subtle glow background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none" />
                                                
                                                <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
                                                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 text-xs font-black text-yellow-500 px-3 py-1 rounded-md mb-4 uppercase tracking-widest shadow-inner" style={{ transform: "translateZ(30px)" }}>
                                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                    </div>
                                                    <h3 className="text-3xl font-black text-[var(--text-primary)] mb-3 drop-shadow-md" style={{ transform: "translateZ(40px)" }}>
                                                        {item.title}
                                                    </h3>
                                                    <div className="text-[var(--accent)] font-bold tracking-wide mb-5 flex items-center md:inline-flex gap-2 text-sm uppercase bg-[var(--accent)]/5 px-2 py-1 rounded-lg border border-[var(--accent)]/10" style={{ transform: "translateZ(20px)" }}>
                                                        {idx % 2 === 0 && <ChevronRight size={16} className="hidden md:block" />}
                                                        {item.organization}
                                                        {idx % 2 !== 0 && <ChevronRight size={16} className="hidden md:block" />}
                                                    </div>
                                                    <p className="text-[var(--text-secondary)] font-medium leading-relaxed opacity-90" style={{ transform: "translateZ(10px)" }}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </GlassCard>
                                        </TiltCard>
                                    </div>

                                    {/* Empty spacer for alignment */}
                                    <div className="hidden md:block w-[45%] lg:w-[40%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
