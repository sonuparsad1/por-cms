import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import { Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import FluidBackground from '../components/ui/FluidBackground';
import TiltCard from '../components/ui/TiltCard';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <div className="min-h-screen relative py-20 px-6 overflow-hidden bg-transparent">
            <FluidBackground />
            
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-6"
                >
                    <span className="text-[var(--accent)] text-xs font-black uppercase tracking-[0.4em]">Establish Connection</span>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-[var(--text-primary)] leading-none uppercase italic">
                        GET IN<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] opacity-40">TOUCH</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--accent)] font-medium max-w-2xl mx-auto italic opacity-80 decoration-wavy underline decoration-[var(--accent)]/10 underline-offset-8">
                        Available for Luxury Digital Collaborations
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Info Grid */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Email", info: "sonusa470@gmail.com", icon: <Mail className="text-[var(--accent)]" /> },
                                { title: "Nexus", info: "Remote / India", icon: <MapPin className="text-[var(--accent)]" /> },
                            ].map((item, i) => (
                                <GlassCard key={i} className="group hover:border-[var(--accent)] transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6 border border-[var(--accent)]/20">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xs font-black text-[var(--accent)] uppercase tracking-widest mb-1">{item.title}</h4>
                                    <p className="text-lg font-black text-[var(--text-primary)] break-words">{item.info}</p>
                                </GlassCard>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest italic">Digital Footprint</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/spsaharan/" },
                                    { icon: <Github size={24} />, url: "https://github.com/sonuparsad1" },
                                    { icon: <Twitter size={24} />, url: "https://x.com/iamsonuparsad" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-2xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Form */}
                    <TiltCard>
                        <GlassCard className="!p-12 relative overflow-hidden border-2 border-white/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-10 blur-[60px] pointer-events-none" />
                            
                            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-8 tracking-tighter uppercase italic">Transmit Message</h2>
                            
                            {status === 'success' && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-8 p-4 rounded-2xl bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-black uppercase tracking-widest text-center"
                                >
                                    Transmission Successful
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest ml-4 transition-colors group-focus-within:text-[var(--text-primary)]">Origin Identity</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-6 py-4 rounded-3xl bg-[var(--bg-secondary)] border-2 border-transparent focus:border-[var(--accent)]/50 focus:bg-white dark:focus:bg-black/40 text-[var(--text-primary)] font-bold transition-all outline-none"
                                        placeholder="Identification Name"
                                    />
                                </div>
                                
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest ml-4">Communication Node</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-6 py-4 rounded-3xl bg-[var(--bg-secondary)] border-2 border-transparent focus:border-[var(--accent)]/50 focus:bg-white dark:focus:bg-black/40 text-[var(--text-primary)] font-bold transition-all outline-none"
                                        placeholder="email@nexus.com"
                                    />
                                </div>
                                
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest ml-4">Data Payload</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-6 py-4 rounded-3xl bg-[var(--bg-secondary)] border-2 border-transparent focus:border-[var(--accent)]/50 focus:bg-white dark:focus:bg-black/40 text-[var(--text-primary)] font-bold transition-all outline-none resize-none"
                                        placeholder="Enter transmission data..."
                                    />
                                </div>

                                <PremiumButton type="submit" variant="primary" className="w-full !py-5 shadow-2xl">
                                    Finalize Transmission
                                </PremiumButton>
                            </form>
                        </GlassCard>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
};

export default Contact;
