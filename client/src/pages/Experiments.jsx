import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Terminal, Code, Cpu } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import FluidBackground from '../components/ui/FluidBackground';

const mockExperiments = [
    {
        title: "Sorting Algorithm Visualizer",
        purpose: "Visualize Quick, Merge, and Bubble sort arrays via canvas.",
        tools: ["React", "Canvas API", "Algorithms"],
        insight: "Debouncing React state updates is critical during 60FPS canvas draw loops."
    },
    {
        title: "Custom Terminal Portfolio",
        purpose: "Build a web portfolio entirely driven by a mock CLI.",
        tools: ["Vanilla JS", "DOM Matrix", "CSS Animations"],
        insight: "Properly handling keydown history arrays makes custom CLI feel authentic."
    },
    {
        title: "P2P WebRTC Chatroom",
        purpose: "Establish peer-to-peer data channels without a permanent WebSocket server.",
        tools: ["WebRTC", "Socket.io"],
        insight: "STUN/TURN servers are unavoidable for traversing real-world NATs."
    },
    {
        title: "Hardware Keystroke Injector",
        purpose: "Use an Arduino Leonardo as a rubber ducky clone.",
        tools: ["C++", "Arduino HID"],
        insight: "Hardware-level HID emulation bypasses almost all software-level input blockers."
    }
];

const Experiments = () => {
    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Background Prototype Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_0)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* FOUNDRY HERO */}
                <header className="text-center mb-32 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-black border border-white/10 rounded-full mb-10 shadow-2xl"
                    >
                        <Beaker size={14} className="text-[var(--accent)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70">Experimental_Sandbox_Node_v7</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-black mb-10 text-[var(--text-primary)] tracking-tighter leading-none">
                        The <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)] italic">Lab</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mx-auto font-bold uppercase tracking-[0.2em] leading-relaxed opacity-80 border-y-2 border-white/5 py-8">
                        Technical <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-4 underline-offset-8">Curiosity</span> and Prototype Engineering.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {mockExperiments.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                            className="group h-full"
                        >
                            <TiltCard depth={50} maxTilt={12} className="h-full">
                                <div className="bg-[#0a0a0a] border-4 border-white/5 rounded-[40px] p-10 h-full flex flex-col transition-all duration-700 hover:border-[var(--accent)]/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group/card shadow-2xl">
                                    
                                    {/* Large Background Identifier */}
                                    <div className="absolute -top-12 -right-12 opacity-[0.02] group-hover/card:opacity-[0.05] group-hover/card:rotate-12 transition-all duration-1000 text-white pointer-events-none">
                                        <Cpu size={240} />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Status Header */}
                                        <div className="flex items-center gap-3 mb-10">
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent-glow)]" />
                                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">PROTOTYPE_0{idx + 1}</span>
                                        </div>

                                        <h3 className="text-3xl font-black text-white mb-6 leading-[0.9] tracking-tighter group-hover/card:text-[var(--accent)] transition-colors">
                                            {exp.title}
                                        </h3>
                                        
                                        <div className="bg-black/50 border border-white/10 p-6 rounded-2xl mb-10 shadow-inner">
                                            <p className="text-sm text-white/60 font-bold italic leading-relaxed">
                                                "{exp.purpose}"
                                            </p>
                                        </div>
                                        
                                        <div className="mt-auto space-y-8 pt-8 border-t border-white/5">
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tools.map((t, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-[var(--accent)] rounded-lg">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
                                                    <div className="w-1 h-px bg-white/30" /> Key_Insight
                                                </h4>
                                                <p className="text-xs text-[var(--text-primary)] leading-relaxed font-mono opacity-80 group-hover/card:opacity-100 transition-opacity">
                                                    {exp.insight}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated Glare Strip */}
                                    <div className="absolute top-0 right-0 h-1/2 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/50 to-transparent translate-y-[-100%] group-hover/card:translate-y-[200%] transition-transform duration-1000 delay-100" />
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            <footer className="pt-40 pb-20 text-center opacity-10 mt-20">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-white">Foundry Host-B // Status: Prototype Production Active // Sector: The_Lab</p>
            </footer>
        </div>
    );
};

export default Experiments;
