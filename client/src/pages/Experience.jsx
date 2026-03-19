import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import FluidBackground from '../components/ui/FluidBackground';
import { Code, Server, BrainCircuit, Rocket, Cpu, Database, Layout, History, Terminal, Globe, Zap, Target } from 'lucide-react';

const iconMap = {
    Code: Code,
    Server: Server,
    BrainCircuit: BrainCircuit,
    Rocket: Rocket,
    Cpu: Cpu,
    Database: Database,
    Layout: Layout,
    History: History,
    Terminal: Terminal,
    Globe: Globe,
    Zap: Zap,
    Target: Target
};

const Experience = () => {
    const [experienceItems, setExperienceItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch('/api/experience/published');
                if (res.ok) {
                    const result = await res.json();
                    setExperienceItems(result.data || []);
                }
            } catch (err) {
                setExperienceItems([
                    { year: '2021', title: 'Began CS Journey', icon: 'Code', description: 'Started B.Tech in Computer Science. Mastered core fundamentals in C++ and Java. Developed algorithmic thinking through Data Structures and Object-Oriented Programming methodologies.' },
                    { year: '2022', title: 'Explored Web & IoT', icon: 'Server', description: 'Dived into full-stack web development using HTML/CSS/JS. Simultaneously experimented with Arduino microcontrollers, sparking an interest in hardware-software integration for IoT.' },
                    { year: '2023', title: 'AI & Machine Learning Focus', icon: 'BrainCircuit', description: 'Shifted focus towards data intelligence. Built predictive models using Python, Pandas, and Scikit-learn. Developed the AI Sentiment Analyzer and Student Performance Predictor.' },
                    { year: '2024 - Present', title: 'Full-Stack Intelligent Systems', icon: 'Rocket', description: 'Bridging the gap between AI, IoT, and premium UI. Building production-grade React apps, integrating complex Node/Express APIs, and deploying end-to-end intelligent solutions.' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Cinematic Tactical Background */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
                    className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(var(--accent)_1px,transparent_0)] bg-[size:40px_40px]" 
                />
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
                    className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" 
                />
                
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0.1, 0.3, 0.1],
                            y: [Math.random() * 1000, Math.random() * 1000 - 500],
                            x: [Math.random() * 1000, Math.random() * 1000 - 500]
                        }}
                        transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1 h-1 bg-[var(--accent)] rounded-full blur-[2px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* DEPLOYMENT HERO */}
                <header className="text-center mb-40 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-black border border-white/10 rounded-full mb-10 shadow-2xl"
                    >
                        <History size={16} className="text-[var(--accent)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70">Operational_Deployment_Log_01</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-black mb-10 text-[var(--text-primary)] tracking-tighter leading-none perspective-1000">
                        {["Operational", "History"].map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className={`block ${i === 1 ? 'text-[var(--accent)] drop-shadow-[0_0_30px_var(--accent-glow)] italic' : ''}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-2xl mx-auto my-12"
                    />

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mx-auto font-black italic uppercase tracking-widest leading-relaxed"
                    >
                        Synthesizing raw data into <span className="text-[var(--text-primary)] relative">
                            Production Excellence
                            <motion.span 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 1.5 }}
                                className="absolute bottom-[-10px] left-0 right-0 h-1 bg-[var(--accent)] origin-left"
                            />
                        </span>.
                    </motion.p>
                </header>

                <div className="relative">
                    {/* The Command Beam */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/[0.03] md:-translate-x-1/2 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                        <motion.div 
                            style={{ 
                                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                                backgroundColor: "var(--accent)",
                                boxShadow: "0 0 30px var(--accent-glow)"
                            }}
                            className="w-full"
                        />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-8">
                            <motion.div 
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-[6px] border-white/5 border-t-[var(--accent)] rounded-full shadow-[0_0_50px_var(--accent-glow)]" 
                            />
                            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 animate-pulse">Syncing_Timeline...</span>
                        </div>
                    ) : (
                        <div className="space-y-60 relative">
                            {experienceItems.map((exp, idx) => (
                                <TimelineBlock key={idx} item={exp} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className="pt-60 pb-20 text-center opacity-10">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-white">System Evolution Tracker // Status: Stable // Sector: Life_Path</p>
            </footer>
        </div>
    );
};

const TimelineBlock = ({ item, index }) => {
    const Icon = iconMap[item.icon] || Code;
    const isEven = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start md:items-center group`}
        >
            {/* Deployment Node */}
            <motion.div 
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.8 }}
                className="absolute left-[24px] md:left-1/2 w-10 md:w-24 h-10 md:h-24 rounded-[32px] bg-black border-2 border-white/5 md:-translate-x-1/2 z-20 flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.9)] cursor-pointer group-hover:border-[var(--accent)] transition-all duration-700"
            >
                <Icon size={32} className="text-white/20 group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_10px_var(--accent-glow)] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]" />
            </motion.div>

            {/* Tactical Card */}
            <div className={`w-full md:w-[45%] pl-20 md:pl-0 mt-10 md:mt-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                <TiltCard depth={80} maxTilt={10} className="w-full">
                    <div className="bg-[#0a0a0a] border-2 border-white/5 rounded-[50px] p-10 md:p-16 transition-all duration-1000 hover:border-[var(--accent)]/40 hover:shadow-[0_60px_150px_rgba(0,0,0,0.8)] group/card relative overflow-hidden shadow-2xl">
                        
                        {/* Animated Background Identifier */}
                        <div className={`absolute -top-12 ${isEven ? '-left-12' : '-right-12'} opacity-[0.02] group-hover/card:opacity-[0.05] transition-all duration-1000 pointer-events-none`}>
                            <Icon size={300} />
                        </div>

                        {/* Status Label */}
                        <div className={`flex items-center gap-6 mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="px-8 py-3 bg-[var(--accent)] text-black rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_10px_30px_var(--accent-glow)]"
                            >
                                {item.year}
                            </motion.div>
                            <div className="h-px flex-grow bg-white/5" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/20 whitespace-nowrap">NODE :: {index + 1}</span>
                        </div>

                        <h3 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none group-hover/card:text-[var(--accent)] transition-all duration-700 group-hover/card:translate-x-2">
                            {item.title}
                        </h3>

                        <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-bold italic group-hover/card:text-white/70 transition-all duration-1000">
                            {item.description}
                        </p>

                        {/* Interactive Glare */}
                        <div className="absolute top-0 right-0 h-1/2 w-1 bg-gradient-to-b from-transparent via-[var(--accent)]/50 to-transparent translate-y-[-100%] group-hover/card:translate-y-[200%] transition-transform duration-1000 delay-100" />
                    </div>
                </TiltCard>
            </div>

            {/* Spacer */}
            <div className="hidden md:block w-[45%]" />
        </motion.div>
    );
};

export default Experience;
