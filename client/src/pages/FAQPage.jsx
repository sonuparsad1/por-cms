import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, AlertCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import FluidBackground from '../components/ui/FluidBackground';

const mockFaqs = [
    {
        question: "Are you open to full-time remote opportunities?",
        answer: "Yes, I am currently seeking full-time opportunities, both remote and hybrid, particularly in roles involving AI/ML Engineering, Full-Stack Development, or IoT integrations."
    },
    {
        question: "What is your primary tech stack?",
        answer: "My core stack includes React, Node.js, Express, and MongoDB for web development. For AI/ML and data science, I heavily utilize Python (Pandas, Scikit-learn, TensorFlow). For hardware/IoT, I work with C++ and Arduino/ESP microcontrollers."
    },
    {
        question: "Do you take on freelance projects?",
        answer: "Depending on my current workload and the project's scope, I am open to freelance or consulting work. Feel free to reach out via the Contact page with project details."
    }
];

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch('/api/faqs');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setFaqs(data.data);
                } else {
                    setFaqs(mockFaqs);
                }
            } catch (err) {
                setFaqs(mockFaqs);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Background Terminal Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* FAQ HERO */}
                <header className="text-center mb-32 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-black border border-white/10 rounded-full mb-10 shadow-xl"
                    >
                        <MessageCircle size={14} className="text-[var(--accent)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70">Intelligence_Support_v2.0</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[10rem] font-black mb-10 text-[var(--text-primary)] tracking-tighter leading-none">
                        System <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)] italic">Queries</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-xl mx-auto font-bold uppercase tracking-[0.2em] leading-relaxed opacity-80 border-l-4 border-[var(--accent)] pl-10 text-left">
                        Processing the most <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-4 underline-offset-8">Critical Inquiries</span>.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-16 h-16 border-[4px] border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={`bg-[#0a0a0a] border-2 transition-all duration-700 rounded-[32px] overflow-hidden group ${openIndex === idx ? 'border-[var(--accent)] shadow-[0_30px_100px_rgba(0,0,0,0.8)]' : 'border-white/5 hover:border-white/20'}`}>
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full text-left p-10 md:p-14 flex justify-between items-center focus:outline-none relative"
                                    >
                                        <div className="flex items-center gap-8 relative z-10 w-full pr-12">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${openIndex === idx ? 'bg-[var(--accent)] border-[var(--accent)] text-black shadow-[0_0_20px_var(--accent-glow)] scale-110' : 'bg-white/5 border-white/10 text-white/30'}`}>
                                                <AlertCircle size={24} />
                                            </div>
                                            <h3 className={`text-2xl md:text-3xl font-black transition-all duration-500 tracking-tighter ${openIndex === idx ? 'text-white translate-x-2' : 'text-white/70'}`}>
                                                {faq.question}
                                            </h3>
                                        </div>
                                        
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${openIndex === idx ? 'rotate-180 border-[var(--accent)] text-[var(--accent)]' : 'border-white/10 text-white/20'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {openIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                                className="bg-black/50 border-t border-white/5 relative"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
                                                <div className="p-10 md:p-14 md:pl-[120px]">
                                                    <p className="text-xl text-white/50 leading-relaxed font-bold italic border-l-2 border-white/10 pl-10 group-hover:text-white/80 transition-colors">
                                                        {faq.answer}
                                                    </p>
                                                    
                                                    <div className="mt-14 flex items-center gap-4 opacity-20">
                                                        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white">Status_Resolved</span>
                                                        <div className="h-px flex-grow bg-white" />
                                                        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white">Source: Core_System</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <footer className="pt-40 pb-20 text-center opacity-10 mt-20">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-white">Support Interface Host-X // Sector: Queries // Status: Online</p>
            </footer>
        </div>
    );
};

export default FAQPage;
