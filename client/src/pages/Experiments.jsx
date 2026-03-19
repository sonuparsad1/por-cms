import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Terminal, Code } from 'lucide-react';

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
        tools: ["WebRTC", "Socket.io (Signaling)"],
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
        <div className="py-12 max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <Beaker size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">The Lab</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Micro-projects, prototypes, and technical curiosity sandbox.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {mockExperiments.map((exp, idx) => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        key={idx}
                        className="glass p-6 flex flex-col h-full rounded-2xl relative overflow-hidden group border border-coffee-200 dark:border-white/10"
                    >
                        {/* Motif overlay */}
                        <div className="absolute -top-4 -right-4 text-coffee-900/5 dark:text-white/5 group-hover:rotate-12 transition-transform duration-500">
                            <Terminal size={100} />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-xl font-bold text-coffee-900 dark:text-coffee-100 mb-3 leading-tight">{exp.title}</h3>
                            <p className="text-sm text-coffee-700 dark:text-coffee-300 mb-6 font-medium italic">"{exp.purpose}"</p>
                            
                            <div className="mt-auto pt-6 border-t border-coffee-200 dark:border-white/10">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-500 mb-2 flex items-center gap-1"><Code size={14} /> Tools</h4>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {exp.tools.map(t => (
                                        <span key={t} className="px-2 py-0.5 text-xs bg-black/5 dark:bg-white/5 rounded text-coffee-800 dark:text-coffee-200">{t}</span>
                                    ))}
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-500 mb-1">Takeaway</h4>
                                <p className="text-xs text-coffee-600 dark:text-coffee-400 leading-relaxed font-mono">
                                    {exp.insight}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Experiments;
