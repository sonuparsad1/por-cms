import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import { Bot, LineChart, Database, Cpu, Activity, Fingerprint } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FluidBackground from '../components/ui/FluidBackground';

const AIShowcase = () => {
    // Interactive demo state mock for Sentiment Analyzer
    const [inputText, setInputText] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        setAnalyzing(true);
        setResult(null);
        
        setTimeout(() => {
            const isPositive = inputText.length % 2 === 0;
            setResult({
                sentiment: isPositive ? "Positive" : "Negative",
                confidence: (Math.random() * (0.99 - 0.75) + 0.75).toFixed(2),
                score: isPositive ? 0.85 : 0.12
            });
            setAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Background Grid Layer */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* CYBERNETIC HERO */}
                <header className="text-center mb-32 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-black border border-[var(--accent)]/50 rounded-full mb-10 shadow-[0_0_30px_var(--accent-glow)]"
                    >
                        <Bot size={16} className="text-[var(--accent)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Neural_Arena_v4.0_Active</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-black mb-8 text-[var(--text-primary)] tracking-tighter leading-none">
                        AI <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)] italic">Showdown</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed opacity-80 decoration-wavy underline decoration-[var(--accent)]/20 underline-offset-8">
                        Interacting with <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-4 underline-offset-8 transition-all">Algorithmic Predators</span>.
                    </p>
                </header>

                <div className="space-y-40">
                    {/* 1. Sentiment Analyzer Demo - High Tech Console */}
                    <motion.section 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="bg-[#0a0a0a] border-4 border-white/5 rounded-[48px] overflow-hidden shadow-[0_60px_150px_rgba(0,0,0,0.8)] relative group hover:border-[var(--accent)]/30 transition-all duration-700">
                             {/* Floating Schematic background */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000" style={{ backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                            
                            <div className="grid lg:grid-cols-2 relative z-10">
                                {/* Left Panel: Control Interface */}
                                <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                                    <div className="w-20 h-20 rounded-2xl bg-black border-2 border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] flex items-center justify-center text-[var(--accent)] mb-12">
                                        <LineChart size={40} />
                                    </div>
                                    <h2 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                                        NLP Sentiment <br/><span className="text-[var(--accent)]">Protocol</span>
                                    </h2>
                                    <p className="text-xl text-white/50 mb-12 font-bold leading-relaxed">
                                        Test a mock proxy of our proprietary LSTM architecture. Analyzes sentiment polarity with 92% structural accuracy.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {['TensorFlow', 'Python', 'Vectorization', 'Dropout_L'].map((tag, i) => (
                                            <span key={i} className="px-5 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 rounded-full group-hover:text-[var(--accent)] transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Right Panel: Execution Console */}
                                <div className="p-12 lg:p-20 flex flex-col justify-center">
                                    <form onSubmit={handleAnalyze} className="mb-12">
                                        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] mb-6">
                                            <Fingerprint size={16} /> Input_Data_Buffer
                                        </label>
                                        <div className="relative group/input">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-3xl blur-lg opacity-0 group-hover/input:opacity-20 transition duration-500"></div>
                                            <textarea 
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                className="relative w-full bg-black border-2 border-white/10 rounded-3xl p-8 text-white font-mono text-lg focus:outline-none focus:border-[var(--accent)]/50 focus:bg-[#0d0d0d] transition-all h-40 resize-none shadow-2xl"
                                                placeholder="// Inject narrative data stream here..."
                                            />
                                        </div>
                                        <div className="mt-10 flex flex-col gap-6">
                                            <PremiumButton type="submit" variant="primary" className="!py-6 !rounded-2xl shadow-[0_20px_50px_var(--accent-glow)] text-xl font-black uppercase tracking-widest group/btn" disabled={analyzing}>
                                                <Activity className={`mr-4 transition-transform duration-500 ${analyzing ? 'animate-spin' : 'group-hover:rotate-12'}`} size={24} />
                                                {analyzing ? 'Processing_Nodes...' : 'Run Prediction'}
                                            </PremiumButton>
                                            
                                            {/* Progress bar during analysis */}
                                            {analyzing && (
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ x: '-100%' }}
                                                        animate={{ x: '100%' }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_15px_var(--accent-glow)]"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </form>

                                    <AnimatePresence mode="wait">
                                        {result && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className={`p-10 rounded-[32px] border-2 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden ${result.sentiment === 'Positive' ? 'border-green-500/50 text-green-500 shadow-green-500/10' : 'border-red-500/50 text-red-500 shadow-red-500/10'}`}
                                            >
                                                <div className="absolute top-0 right-0 p-4 font-mono text-[8px] uppercase tracking-[0.5em] opacity-30">Matrix_Result_0x11</div>
                                                <div className="flex justify-between items-end gap-10">
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Signal_Polarity</div>
                                                        <div className="text-6xl font-black tracking-tighter drop-shadow-lg uppercase">
                                                            {result.sentiment}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Confidence</div>
                                                        <div className="font-mono text-4xl font-black bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-white shadow-inner">{Math.round(result.confidence * 100)}% <span className="text-[10px] opacity-30 ml-2">CONF</span></div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 2. Architecture Breakdown */}
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <TiltCard depth={40} maxTilt={10} className="h-full">
                            <div className="bg-[#0a0a0a] border-4 border-white/5 rounded-[48px] p-16 h-full flex flex-col group hover:border-[var(--accent)]/40 transition-all duration-700 shadow-2xl relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 text-white">
                                    <Database size={240} />
                                </div>
                                <div className="w-20 h-20 rounded-[28px] bg-white/5 border-2 border-white/10 flex items-center justify-center text-[var(--accent)] mb-12 shadow-xl group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                                    <Database size={40} />
                                </div>
                                <h3 className="text-4xl font-black mb-6 text-white tracking-tighter uppercase drop-shadow-md">
                                    Data Preprocessing
                                </h3>
                                <p className="text-xl text-white/50 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                    Leveraging Pandas for vector-optimized wrangling. Custom pipelines handle SMOTE balancing and Z-Score outlier filtration prior to tensor ingestion.
                                </p>
                            </div>
                        </TiltCard>
                        
                        <TiltCard depth={40} maxTilt={10} className="h-full">
                            <div className="bg-[#0a0a0a] border-4 border-white/5 rounded-[48px] p-16 h-full flex flex-col group hover:border-[var(--accent)]/40 transition-all duration-700 shadow-2xl relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 text-white">
                                    <Cpu size={240} />
                                </div>
                                <div className="w-20 h-20 rounded-[28px] bg-white/5 border-2 border-white/10 flex items-center justify-center text-[var(--accent)] mb-12 shadow-xl group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                                    <Cpu size={40} />
                                </div>
                                <h3 className="text-4xl font-black mb-6 text-white tracking-tighter uppercase drop-shadow-md">
                                    Model Architecture
                                </h3>
                                <p className="text-xl text-white/50 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                    Implementing deep Keras Sequential architectures. Utilizing LSTM memory units and persistent Dropout layers to stabilize high-dimensional gradient descent.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.section>
                </div>
            </div>

            <footer className="pt-40 pb-20 text-center opacity-10 mt-20">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-white">Neural Arena Host-01 // Sector: Showcase // Status: High Performance</p>
            </footer>
        </div>
    );
};

export default AIShowcase;
