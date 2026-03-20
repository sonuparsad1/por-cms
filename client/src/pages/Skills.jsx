import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Terminal, Cpu, Database, Layout, Code2, Binary, BrainCircuit, Sparkles, Orbit } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import FluidBackground from '../components/ui/FluidBackground';

const skillCategories = [
    {
        title: "Programming Languages",
        icon: <Code2 className="text-orange-400" />,
        skills: [
            { name: "Python", level: 95 },
            { name: "C++", level: 85 },
            { name: "Java", level: 80 },
            { name: "JavaScript", level: 90 }
        ]
    },
    {
        title: "Technical Stack",
        icon: <Terminal className="text-blue-400" />,
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "Node.js / Express", level: 90 },
            { name: "MongoDB / SQL", level: 85 },
            { name: "Cloud Integration", level: 75 }
        ]
    },
    {
        title: "AI & Machine Learning",
        icon: <BrainCircuit className="text-purple-400" />,
        isSpecial: true,
        skills: [
            { name: "Neural Networks", level: 80 },
            { name: "Model Training", level: 75 },
            { name: "PyTorch / TF", level: 70 },
            { name: "Data Analytics", level: 85 }
        ]
    },
    {
        title: "Core CS Subjects",
        icon: <Binary className="text-green-400" />,
        skills: [
            { name: "Data Structures", level: 95 },
            { name: "Algorithms", level: 90 },
            { name: "OS / DBMS", level: 85 },
            { name: "Software Eng", level: 90 }
        ]
    }
];

const Skills = () => {
    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-[var(--bg-primary)] selection:bg-[var(--accent)]/30 w-full">
            <FluidBackground />
            
            {/* Background Tactical Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-40">
                
                {/* CYBERPUNK HERO */}
                <header className="text-center relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-[var(--bg-secondary)] border border-[var(--accent)]/50 rounded-full mb-12 shadow-[0_0_30px_var(--accent-glow)] group cursor-default"
                    >
                        <Terminal size={20} className="text-[var(--accent)] group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-[var(--text-primary)]">System_Core_Abilities_v2.0</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-[12rem] font-black text-[var(--text-primary)] leading-none tracking-tighter mb-10">
                        Technical<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-amber-400 to-orange-600 drop-shadow-[0_0_40px_var(--accent-glow)]">
                            Arsenal
                        </span>
                    </h1>

                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
                        Precision-engineered stack for <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-4 underline-offset-8">Intelligent Systems</span>.
                    </p>
                </header>

                {/* SKILLS GRID - TACTICAL MODULES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {skillCategories.map((cat, idx) => (
                        <SkillModule key={idx} category={cat} index={idx} />
                    ))}
                </div>

                {/* THE PIPELINE */}
                <section className="relative py-20">
                    <div className="absolute inset-0 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="text-center mb-20 space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">
                            Learning <span className="text-[var(--accent)]">Protocol</span>
                        </h2>
                        <div className="h-1 w-40 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_20px_var(--accent-glow)]" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto overflow-hidden">
                        {['Deep Learning', 'Computer Vision', 'Next.js 15', 'Rust Engine', 'Edge TPU', 'Kubernetes'].map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                                transition={{ delay: i * 0.1 }}
                                className="px-10 py-6 bg-[var(--bg-glass)] border-2 border-[var(--border)] rounded-[32px] flex items-center gap-4 group cursor-pointer shadow-2xl transition-all"
                            >
                                <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping" />
                                <span className="text-lg font-black text-[var(--text-primary)] tracking-wider uppercase">{skill}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* COMMAND PROTOCOL FOOTER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-5xl mx-auto pt-20"
                >
                    <div className="bg-[var(--bg-glass)] border border-[var(--border)] rounded-[60px] p-20 text-center relative overflow-hidden group shadow-2xl">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                         
                         <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-10 tracking-tighter uppercase leading-none">
                            Career <span className="text-[var(--accent)]">Protocol_01</span>
                         </h3>
                         <p className="text-xl md:text-3xl font-bold text-[var(--text-secondary)] leading-relaxed italic max-w-4xl mx-auto">
                            "To architect high-density intelligent systems where computational rigor meets visceral human experience. Committed to S-Tier excellence in AI/ML stack synchronization."
                         </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

const SkillModule = ({ category, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group"
        >
            <div className="bg-[var(--bg-glass)] border-4 border-[var(--border)] rounded-[48px] p-12 lg:p-16 h-full flex flex-col transition-all duration-500 hover:border-[var(--accent)]/40 hover:shadow-2xl relative overflow-hidden shadow-xl backdrop-blur-xl">
                
                {/* Module ID Tag */}
                <div className="absolute top-8 right-12 font-mono text-[10px] font-black tracking-[0.4em] opacity-20 uppercase text-[var(--text-secondary)]">
                    MOD_00{index + 1}_LOGIC
                </div>

                {/* Header Section */}
                <div className="flex items-center gap-8 mb-16">
                    <div className="w-20 h-20 rounded-[28px] bg-[var(--bg-secondary)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-700 shadow-xl group-hover:shadow-[0_0_40px_var(--accent-glow)]">
                        {React.cloneElement(category.icon, { size: 40 })}
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2">
                            {category.title}
                        </h2>
                        <div className="flex gap-2">
                             {[1,2,3].map(i => <div key={i} className="h-1.5 w-6 bg-[var(--accent)]/20 rounded-full" />)}
                        </div>
                    </div>
                </div>

                {/* Skill Quantizers (Progress Bars) */}
                <div className="space-y-12 flex-1">
                    {category.skills.map((skill, i) => (
                        <div key={i} className="space-y-6">
                            <div className="flex justify-between items-end px-2">
                                <span className="text-lg font-black text-[var(--text-primary)] opacity-80 tracking-widest uppercase">
                                    {skill.name}
                                </span>
                                <span className="text-sm font-mono font-black text-[var(--accent)]">
                                    {skill.level > 90 ? 'S-TIER' : `${skill.level}%`}
                                </span>
                            </div>
                            
                            {/* Segmented Power Bar */}
                            <div className="flex gap-1 h-3 w-full">
                                {[...Array(20)].map((_, step) => (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0.1, backgroundColor: 'var(--border)' }}
                                        whileInView={{ 
                                            opacity: step * 5 < skill.level ? 1 : 0.1,
                                            backgroundColor: step * 5 < skill.level ? 'var(--accent)' : 'var(--border)'
                                        }}
                                        transition={{ delay: 0.5 + (step * 0.05) }}
                                        className={`flex-1 rounded-sm shadow-inner`}
                                        style={{ 
                                            boxShadow: step * 5 < skill.level ? '0 0 10px var(--accent-glow)' : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Operational Status */}
                <div className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-10">
                     <span className="text-[10px] font-black tracking-widest text-[var(--accent)] italic">OPERATIONAL_STABLE</span>
                     <div className="flex rotate-45 gap-1">
                         <div className="w-1.5 h-1.5 bg-[var(--text-secondary)] opacity-20" />
                         <div className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse" />
                     </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;
