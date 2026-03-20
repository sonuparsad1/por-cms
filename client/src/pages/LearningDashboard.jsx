import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import { Target, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import FluidBackground from '../components/ui/FluidBackground';

const mockLearningData = [
    {
        topic: "Advanced System Design",
        category: "System Design",
        status: "In Progress",
        progressPercentage: 65,
        milestones: ["Client-Server Architecture", "Caching Strategies", "Load Balancing Basics"]
    },
    {
        topic: "Deep Learning (CNNs)",
        category: "AI",
        status: "Planned",
        progressPercentage: 15,
        milestones: ["Neural Network Foundations"]
    },
    {
        topic: "React & Framer Motion",
        category: "Web Dev",
        status: "Completed",
        progressPercentage: 100,
        milestones: ["Hooks Mastery", "Context API", "Complex Animation Orchestration", "Glassmorphism UI"]
    }
];

const LearningDashboard = () => {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLearning = async () => {
            try {
                const res = await fetch('/api/learning');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setProgress(data.data);
                } else {
                    setProgress(mockLearningData);
                }
            } catch (err) {
                setProgress(mockLearningData);
            } finally {
                setLoading(false);
            }
        };
        fetchLearning();
    }, []);

    const getStatusDetails = (status) => {
        switch(status) {
            case 'Completed': return { color: 'text-green-500', bg: 'bg-green-500', icon: CheckCircle };
            case 'In Progress': return { color: 'text-[var(--accent)]', bg: 'bg-[var(--accent)]', icon: TrendingUp };
            default: return { color: 'text-white/40', bg: 'bg-white/10', icon: Clock };
        }
    };

    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Background Tactical Matrix */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_0)] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* CINEMATIC HERO */}
                <header className="text-center mb-32 relative">
                        <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full mb-10 shadow-xl"
                    >
                        <Target size={16} className="text-[var(--accent)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-90">Curriculum_Evolution_Tracker</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 text-[var(--text-primary)] tracking-tighter leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                        Neural <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)] italic">Growth</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed opacity-80 border-l-4 border-[var(--accent)] pl-8 text-left md:text-center md:border-l-0 md:pl-0">
                        Synthesizing complexity into <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-4 underline-offset-8">Mastered Intelligence</span>.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-20 h-20 border-[6px] border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin shadow-[0_0_40px_var(--accent-glow)]" />
                        <span className="font-mono text-xs font-black uppercase tracking-[1em] text-[var(--accent)] animate-pulse">Initializing_Data_Nodes...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {progress.map((item, idx) => {
                            const { color, bg, icon: StatusIcon } = getStatusDetails(item.status);
                            
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                                    className="group"
                                >
                                    <div className="bg-[var(--bg-glass)] border-2 border-[var(--border)] rounded-[40px] p-10 md:p-14 h-full flex flex-col transition-all duration-500 hover:border-[var(--accent)]/40 hover:shadow-2xl backdrop-blur-xl relative overflow-hidden shadow-xl">
                                        
                                        {/* Status ID Header */}
                                        <div className="flex justify-between items-start mb-12 relative z-10">
                                            <div className="space-y-4">
                                                <div className="inline-block px-4 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                                                    Module_Sector :: {item.category}
                                                </div>
                                                <h3 className="text-4xl font-black text-[var(--text-primary)] leading-tight tracking-tighter group-hover:text-[var(--accent)] transition-colors">
                                                    {item.topic}
                                                </h3>
                                            </div>
                                            <div className={`p-4 rounded-2xl bg-[var(--bg-primary)] border-2 border-[var(--border)] flex flex-col items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-700 ${color}`}>
                                                <StatusIcon size={24} className="mb-2" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.status}</span>
                                            </div>
                                        </div>

                                        {/* Segmented Progress Quantizer */}
                                        <div className="mb-14 relative z-10">
                                            <div className="flex justify-between items-end mb-6">
                                                <span className="text-xs font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-60 italic">Growth_Coefficient</span>
                                                <span className={`text-2xl font-black font-mono ${color}`}>{item.progressPercentage}%</span>
                                            </div>
                                            
                                            <div className="flex gap-1.5 h-3">
                                                {[...Array(20)].map((_, step) => (
                                                    <motion.div
                                                        key={step}
                                                        initial={{ opacity: 0.1, backgroundColor: 'var(--border)' }}
                                                        whileInView={{ 
                                                            opacity: step * 5 < item.progressPercentage ? 1 : 0.1,
                                                            backgroundColor: step * 5 < item.progressPercentage ? (item.status === 'Completed' ? '#22c55e' : 'var(--accent)') : 'var(--border)'
                                                        }}
                                                        transition={{ delay: 0.5 + (step * 0.03) }}
                                                        className="flex-1 rounded-sm shadow-inner"
                                                        style={{ 
                                                            boxShadow: step * 5 < item.progressPercentage ? (item.status === 'Completed' ? '0 0 10px rgba(34,197,94,0.5)' : '0 0 15px var(--accent-glow)') : 'none'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Milestones Terminal */}
                                        <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] p-8 flex-grow relative z-10">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-40 mb-8 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> 
                                                Active_Milestone_Log
                                            </h4>
                                            <ul className="space-y-6">
                                                {item.milestones.map((ms, mIdx) => (
                                                    <motion.li 
                                                        key={mIdx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1 + (mIdx * 0.1) }}
                                                        className="flex items-start gap-4 group/ms"
                                                    >
                                                        <div className={`mt-1 h-2 w-2 rounded-full transition-all duration-500 scale-100 group-hover/ms:scale-150 ${item.status === 'Completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-[var(--border)]'}`} />
                                                        <span className="text-[var(--text-primary)] text-sm font-bold opacity-80 group-hover/ms:opacity-100 transition-opacity">
                                                            {ms}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Footer Interface */}
                                        <div className="mt-10 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-[var(--text-secondary)]">System_Sync_Stable</span>
                                            <div className="flex gap-1 h-3 items-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1 bg-[var(--accent)]`} style={{ height: `${(i + 1) * 20}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            <footer className="pt-40 pb-20 text-center opacity-30 mt-20">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--text-secondary)]">Neural Learning Interface // Status: Synchronizing // Node: Learning_Dashboard</p>
            </footer>
        </div>
    );
};

export default LearningDashboard;
