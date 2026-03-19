import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import FluidBackground from '../components/ui/FluidBackground';
import TiltCard from '../components/ui/TiltCard';

const About = () => {
    return (
        <div className="min-h-screen relative py-20 px-6 overflow-hidden bg-transparent">
            <FluidBackground />
            
            <div className="container mx-auto max-w-6xl relative z-10 space-y-32">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <span className="text-[var(--accent)] text-xs font-black uppercase tracking-[0.4em]">The Identity</span>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-[var(--text-primary)] leading-none italic uppercase">
                        SONU<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] opacity-40">PRASAD</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--accent)] font-medium max-w-2xl mx-auto italic opacity-80 decoration-wavy underline decoration-[var(--accent)]/10 underline-offset-8">
                        AI/ML Architect & Full-Stack Visionary
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Profile 3D Card */}
                    <TiltCard className="aspect-square max-w-md mx-auto lg:mx-0 shadow-2xl">
                        <div className="w-full h-full glass rounded-[48px] border-t-2 border-l-2 border-white/20 relative overflow-hidden p-12 flex flex-col items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent pointer-events-none" />
                            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[var(--accent)] to-amber-200 shadow-[0_0_60px_var(--accent-glow)] mb-8 flex items-center justify-center">
                                <span className="text-6xl text-white font-black italic">SP</span>
                            </div>
                            <h3 className="text-2xl font-black text-[var(--text-primary)]">System Status: Active</h3>
                            <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mt-2 animate-pulse">Processing Reality...</p>
                        </div>
                    </TiltCard>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: "Vision", desc: "Engineering scalable AI-powered platforms that redefine the modern web standard.", icon: "🎯" },
                            { title: "Approach", desc: "Meticulously diving into DSA and System Design to stay ahead of the curve.", icon: "⚡" },
                            { title: "Impact", desc: "Creating technology that is not only functional but deeply impactful for reality.", icon: "🌍" },
                            { title: "Growth", desc: "Treating every singular challenge as a critical learning opportunity.", icon: "📈" }
                        ].map((box, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="h-full group hover:border-[var(--accent)] transition-all">
                                    <span className="text-3xl mb-4 block">{box.icon}</span>
                                    <h4 className="text-xl font-black text-[var(--text-primary)] mb-2">{box.title}</h4>
                                    <p className="text-sm text-[var(--text-secondary)] font-medium line-clamp-3 opacity-80">{box.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Journey Section */}
                <div className="space-y-12">
                    <h2 className="text-4xl md:text-6xl font-black text-center text-[var(--text-primary)] tracking-tight">Timeline Archive</h2>
                    <div className="max-w-4xl mx-auto space-y-12 relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />
                        
                        {[ 
                            { year: "2024", title: "Full-Stack AI Projects", desc: "Developing Sentiment Analyzers and IoT Home Automation systems." },
                            { year: "2023", title: "Deepening ML Knowledge", desc: "Mastered NumPy, Pandas, Scikit-learn, and the foundations of TensorFlow." },
                            { year: "2022", title: "Web Development Foundation", desc: "Began building responsive layouts and modern JavaScript applications." },
                            { year: "2021", title: "B.Tech Computer Science Start", desc: "Started my academic journey focusing on Problem Solving and DSA." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 text-center md:text-right">
                                    {idx % 2 === 0 && (
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-[var(--text-primary)]">{item.title}</h3>
                                            <p className="text-[var(--text-secondary)] font-medium opacity-70 italic">{item.desc}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-12 h-12 rounded-full glass border border-[var(--accent)] flex items-center justify-center z-10 relative">
                                    <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    {idx % 2 !== 0 && (
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-[var(--text-primary)]">{item.title}</h3>
                                            <p className="text-[var(--text-secondary)] font-medium opacity-70 italic">{item.desc}</p>
                                        </div>
                                    )}
                                    <span className="text-xs font-black text-[var(--accent)] tracking-widest">{item.year}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
