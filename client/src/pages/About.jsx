import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, Zap, Globe, TrendingUp, Cpu, Database, Layout, Code, History } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import FluidBackground from '../components/ui/FluidBackground';
import TiltCard from '../components/ui/TiltCard';

const About = () => {
    const containerRef = useRef(null);
    const [timelineItems, setTimelineItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const res = await fetch('/api/experience/published');
                if (res.ok) {
                    const result = await res.json();
                    setTimelineItems(result.data || []);
                }
            } catch (err) {
                console.error('Timeline fetch error:', err);
                setTimelineItems([
                    { year: "2026", title: "AI/ML Evolution", description: "Diving deep into Neural Networks, Deep Learning, and advanced Model Engineering." },
                    { year: "2025", title: "Technical Foundation", description: "Started B.Tech CSE. Mastering DSA, Operating Systems, and high-performance computing." },
                    { year: "2024", title: "Full-Stack Mastery", description: "Architecting complex web systems using React, Node.js, and Cloud infrastructures." },
                    { year: "2023", title: "The Origin", description: "First encounter with Python and C++. Decided to dedicate my career to Machine Intelligence." }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchTimeline();
    }, []);

    const coreValues = [
        { title: "Vision", icon: <Target className="text-[var(--accent)]" />, desc: "Building systems that don't just work, but think and adapt to human needs." },
        { title: "Approach", icon: <Zap className="text-[var(--accent)]" />, desc: "First-principles thinking combined with modern agile development cycles." },
        { title: "Impact", icon: <Globe className="text-[var(--accent)]" />, desc: "Scaling solutions that bridge the gap between abstract code and real utility." },
        { title: "Growth", icon: <TrendingUp className="text-[var(--accent)]" />, desc: "A perpetual student mindset, constantly refactoring my knowledge base." }
    ];

    const skills = [
        { name: "Artificial Intelligence", level: 85, icon: <Cpu size={14} /> },
        { name: "Machine Learning", level: 80, icon: <Database size={14} /> },
        { name: "Web Systems", level: 95, icon: <Layout size={14} /> },
        { name: "Core Java/C++", level: 90, icon: <Code size={14} /> }
    ];

    const beamHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="min-h-screen relative bg-transparent selection:bg-[var(--accent)]/30 overflow-x-hidden">
            <FluidBackground />
            
            {/* Scroll Progress Indicator */}
            <motion.div 
                style={{ scaleX: scaleProgress }}
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-[100] origin-left shadow-[0_0_15px_var(--accent-glow)]"
            />

            <div className="container mx-auto px-6 py-20 relative z-20 space-y-36">
                
                {/* SECTION 1: IDENTITY HERO */}
                <section className="flex flex-col items-center justify-center text-center pt-8">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-5 py-1.5 bg-[var(--bg-glass)] border border-[var(--accent)]/40 rounded-full mb-10 shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]"
                    >
                        <span className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.5em]">Identity_Module // ARCHITECT</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-[var(--text-primary)] select-none italic"
                    >
                        SONU PRASAD<span className="text-[var(--accent)]">.</span>
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 space-y-4"
                    >
                        <p className="text-xl md:text-3xl font-black text-[var(--accent)] tracking-tight uppercase italic drop-shadow-[0_0_15px_var(--accent-glow)]">
                            B.Tech CSE | AI/ML & Web Systems
                        </p>
                        <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_15px_var(--accent-glow)] opacity-50" />
                    </motion.div>
                </section>

                {/* SECTION 2: PERSONAL CARD */}
                <section className="flex justify-center py-12">
                    <TiltCard depth={50} maxTilt={10} className="w-full max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-[40px] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-14 relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent pointer-events-none" />
                            
                            {/* Initials Circle */}
                            <div className="w-36 h-36 md:w-44 md:h-44 rounded-[32px] bg-[var(--bg-primary)] border-4 border-[var(--accent)] shadow-[0_0_40px_var(--accent-glow)] flex items-center justify-center shrink-0 relative z-10 transition-transform duration-700 group-hover:scale-105">
                                <span className="text-5xl md:text-6xl font-black text-[var(--accent)] italic select-none">SP</span>
                            </div>

                            <div className="space-y-4 relative z-10 text-center md:text-left">
                                <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--accent)] text-black rounded-full mb-1">
                                    <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">System Status: Active</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                                    Processing growth...
                                </h3>
                                <p className="text-lg md:text-xl text-[var(--text-secondary)] font-bold italic leading-relaxed max-w-2xl">
                                    Synchronizing academic excellence with deep neural networks. Core modules successfully initialized in the system architecture.
                                </p>
                            </div>
                        </motion.div>
                    </TiltCard>
                </section>

                {/* SECTION 3: CORE PHILOSOPHY */}
                <section className="space-y-24 py-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Core Philosophy</h2>
                        <p className="text-xl text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Engineering foundations for the absolute future.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div className="h-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-[40px] p-10 hover:border-[var(--accent)]/60 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-500 group relative overflow-hidden">
                                    <div className="w-16 h-16 rounded-[20px] bg-[var(--bg-glass)] border border-[var(--border)] flex items-center justify-center mb-10 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500">
                                        {React.cloneElement(value.icon, { size: 28 })}
                                    </div>
                                    <h4 className="text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tighter uppercase italic">{value.title}</h4>
                                    <p className="text-lg text-[var(--text-secondary)] font-bold italic leading-relaxed">
                                        {value.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SECTION 4: EVOLUTION LOG */}
                <section className="space-y-24 py-20 relative">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Evolution Log</h2>
                        <p className="text-xl text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Operational milestones & architectural deployments.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-40">
                            <div className="w-16 h-16 border-[6px] border-white/5 border-t-[var(--accent)] rounded-full animate-spin shadow-[0_0_20px_var(--accent-glow)]" />
                        </div>
                    ) : (
                        <div className="relative max-w-5xl mx-auto py-10">
                            {/* Command Beam */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 overflow-hidden">
                                <motion.div 
                                    style={{ 
                                        height: beamHeight,
                                        backgroundColor: "var(--accent)",
                                        boxShadow: "0 0 30px var(--accent-glow)"
                                    }}
                                    className="w-full origin-top"
                                />
                            </div>
                            
                            <div className="space-y-40 relative">
                                {timelineItems.map((item, i) => (
                                    <TimelineItem key={i} item={item} index={i} />
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* SECTION 5: SKILLSET MODULES */}
                <section className="space-y-24 py-20">
                    <div className="text-center">
                        <h2 className="text-5xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Skillset Modules</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {skills.map((skill, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="space-y-6 bg-[var(--bg-secondary)] p-10 rounded-[40px] border-2 border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl text-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
                                            {skill.icon}
                                        </div>
                                        <span className="text-2xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">{skill.name}</span>
                                    </div>
                                    <span className="font-mono text-sm text-[var(--accent)] font-black tracking-widest">{skill.level}%</span>
                                </div>
                                <div className="h-6 bg-[var(--bg-primary)] border-2 border-[var(--border)] rounded-full overflow-hidden p-1.5 shadow-inner">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                        className="h-full bg-[var(--accent)] rounded-full shadow-[0_0_20px_var(--accent-glow)] relative overflow-hidden"
                                    >
                                        <motion.div 
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-12">
                        {['Python', 'C++', 'Java', 'React', 'Node.js', 'TensorFlow', 'PyTorch', 'SQL', 'Git', 'DSA'].map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="px-6 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border)] text-sm font-black text-[var(--text-secondary)] rounded-2xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default shadow-xl"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </section>

                {/* SECTION 6: PERSONAL STATEMENT */}
                <section className="max-w-5xl mx-auto text-center space-y-16 py-20">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 mx-auto rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--accent)] flex items-center justify-center shadow-[0_0_30px_var(--accent-glow)]"
                    >
                        <span className="text-4xl font-black text-[var(--accent)]">!</span>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none">
                            "Engineering <span className="text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]">Intelligence</span>."
                        </h2>
                        <p className="text-xl md:text-4xl text-[var(--text-secondary)] font-bold italic leading-relaxed max-w-4xl mx-auto uppercase">
                            I am a digital architect specializing in the intersection of Artificial Intelligence and robust Web Systems. My mission is to build software that doesn't just process data but translates it into meaningful, human-centric experiences. Currently scaling my expertise in Deep Learning while maintaining a high-frequency commitment to clean, efficient, and scalable code.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="flex flex-col items-center gap-6 pt-10"
                    >
                        <div className="w-px h-32 bg-gradient-to-b from-[var(--accent)] to-transparent" />
                        <span className="text-[var(--accent)] font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Status: Terminal_Initialized</span>
                    </motion.div>
                </section>

                <footer className="text-center py-20 border-t border-[var(--border)] font-mono text-[10px] uppercase tracking-[1em] text-[var(--text-secondary)] opacity-30">
                    Identity Evolution Archive // SONU PRASAD // 2026
                </footer>

            </div>
        </div>
    );
};

const TimelineItem = ({ item, index }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "center center", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div 
            ref={itemRef}
            style={{ opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="flex-1 w-full relative z-10">
                <div className={`p-10 bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-[40px] hover:border-[var(--accent)]/60 transition-all duration-700 shadow-2xl ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} group relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`flex items-center gap-3 mb-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-[var(--accent)] font-mono text-sm font-black px-4 py-1.5 bg-[var(--bg-glass)] rounded-full tracking-widest shadow-[0_0_15px_var(--accent-glow)] border border-[var(--accent)]/20">{item.year}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4 group-hover:text-[var(--accent)] transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-xl text-[var(--text-secondary)] font-bold italic leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="relative z-20 flex flex-col items-center justify-center shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border-2 border-[var(--accent)] flex items-center justify-center shadow-[0_0_30px_var(--accent-glow)] group hover:rotate-90 transition-all duration-700">
                    <div className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent-glow)] animate-ping" />
                </div>
            </div>

            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
};

export default About;