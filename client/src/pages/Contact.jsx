import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Twitter, Send, CheckCircle2, Loader2, Sparkles, Globe } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import FluidBackground from '../components/ui/FluidBackground';
import TiltCard from '../components/ui/TiltCard';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'idle', 'sending', 'success', 'error'
    
    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });
    const bgX = useTransform(springX, [0, 1], [-30, 30]);
    const bgY = useTransform(springY, [0, 1], [-30, 30]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth);
            mouseY.set(e.clientY / innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen relative py-24 px-6 overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Parallax Background Grid */}
            <motion.div 
                style={{ x: bgX, y: bgY }}
                className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* HERO SECTION */}
                <header className="mb-24 perspective-[1000px]">
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[var(--accent)] text-xs font-black uppercase tracking-[0.5em] mb-6 block"
                    >
                        Establish Connection
                    </motion.span>
                    
                    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                        <motion.h1 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-[8rem] font-black text-[var(--text-primary)] leading-[0.85] tracking-tighter uppercase"
                        >
                            GET IN
                        </motion.h1>
                        <motion.h1 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] leading-[0.85] tracking-tighter uppercase -mt-2 md:-mt-6"
                            style={{ transform: "translateZ(-20px) translateX(20px)" }}
                        >
                            TOUCH
                        </motion.h1>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-3xl font-medium text-[var(--text-secondary)] mt-8 max-w-xl italic border-l-4 border-[var(--accent)] pl-6"
                    >
                        Available for high-stakes AI/ML collaborations and digital architecture.
                    </motion.p>
                </header>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* INFO COLUMN */}
                    <div className="lg:col-span-5 space-y-12" style={{ transformStyle: "preserve-3d" }}>
                        <div className="grid gap-6">
                            {[
                                { title: "Direct Hub", value: "sonusa470@gmail.com", icon: <Mail className="text-orange-400" />, label: "Email" },
                                { title: "Current Nexus", value: "India / Remote", icon: <MapPin className="text-blue-400" />, label: "Location" },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <TiltCard depth={40} maxTilt={15}>
                                        <GlassCard className="p-8 group hover:border-[var(--accent)]/50 transition-all duration-500 bg-[var(--bg-secondary)]/40 flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl glass border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                                                {card.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] opacity-60">{card.label}</span>
                                                <h4 className="text-xl font-black text-[var(--text-primary)] drop-shadow-md">{card.value}</h4>
                                            </div>
                                        </GlassCard>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-8 pt-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-[var(--accent)] opacity-30" />
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Digital Footprint</h3>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/spsaharan/" },
                                    { icon: <Github size={24} />, url: "https://github.com/sonuparsad1" },
                                    { icon: <Twitter size={24} />, url: "https://x.com/iamsonuparsad" },
                                    { icon: <Globe size={24} />, url: "https://sonuparsad1.github.io/portfolio/" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                                        whileHover={{ y: -8, scale: 1.15, rotateZ: i % 2 === 0 ? 5 : -5 }}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-16 h-16 rounded-3xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] shadow-2xl transition-all relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FORM COLUMN */}
                    <div className="lg:col-span-7" style={{ transformStyle: "preserve-3d" }}>
                         <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                         >
                            <TiltCard depth={80} maxTilt={8}>
                                <GlassCard className="p-12 relative overflow-hidden border-2 border-[var(--border)] shadow-3xl bg-[var(--bg-glass)]">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-[100px] pointer-events-none rounded-full" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-[80px] pointer-events-none rounded-full" />
                                    
                                    <div className="flex items-center justify-between mb-12">
                                        <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Transmit Message</h2>
                                        <Sparkles className="text-[var(--accent)] opacity-40 animate-pulse" />
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                        <FloatingInput 
                                            label="Node Identity" 
                                            type="text" 
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(val) => setFormData({...formData, name: val})}
                                        />
                                        <FloatingInput 
                                            label="Return Frequency" 
                                            type="email" 
                                            placeholder="your@nexus.com"
                                            value={formData.email}
                                            onChange={(val) => setFormData({...formData, email: val})}
                                        />
                                        <FloatingTextArea 
                                            label="Data Payload" 
                                            placeholder="Describe the collaboration objective..."
                                            value={formData.message}
                                            onChange={(val) => setFormData({...formData, message: val})}
                                        />

                                        <div className="pt-4">
                                            <PremiumButton 
                                                type="submit" 
                                                variant="primary" 
                                                className="w-full !py-6 shadow-2xl relative overflow-hidden group/submit"
                                                disabled={status !== null && status !== 'error'}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {status === 'sending' ? (
                                                        <motion.div 
                                                            key="sending"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <Loader2 className="animate-spin" />
                                                            <span>Initializing Transmission...</span>
                                                        </motion.div>
                                                    ) : status === 'success' ? (
                                                        <motion.div 
                                                            key="success"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="flex items-center gap-3 text-green-400 font-black"
                                                        >
                                                            <CheckCircle2 />
                                                            <span>Signal Delivered</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div 
                                                            key="idle"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <Send size={18} className="group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                                                            <span>Begin Transmission</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </PremiumButton>

                                            <AnimatePresence>
                                                {status === 'error' && (
                                                    <motion.p 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-400 text-xs font-black uppercase tracking-widest text-center mt-6"
                                                    >
                                                        Signal Interrupted — Please re-establish.
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </form>
                                </GlassCard>
                            </TiltCard>
                         </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const FloatingInput = ({ label, type, placeholder, value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative group">
            <motion.label 
                animate={{ 
                    y: (isFocused || value) ? -10 : 20,
                    x: (isFocused || value) ? 0 : 24,
                    scale: (isFocused || value) ? 0.8 : 1,
                    opacity: (isFocused || value) ? 1 : 0.4
                }}
                className={`absolute top-0 left-0 px-1 select-none pointer-events-none font-black uppercase tracking-widest text-xs z-20 origin-left ${(isFocused) ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
            >
                {label}
            </motion.label>
            <input 
                type={type}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onChange(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-3xl px-6 py-5 text-[var(--text-primary)] font-bold transition-all outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] focus:shadow-[0_0_30px_var(--accent-glow)]"
                placeholder={isFocused ? placeholder : ""}
            />
        </div>
    );
};

const FloatingTextArea = ({ label, placeholder, value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative group">
            <motion.label 
                animate={{ 
                    y: (isFocused || value) ? -10 : 20,
                    x: (isFocused || value) ? 24 : 24,
                    scale: (isFocused || value) ? 0.8 : 1,
                    opacity: (isFocused || value) ? 1 : 0.4
                }}
                className={`absolute top-0 left-0 px-1 select-none pointer-events-none font-black uppercase tracking-widest text-xs z-20 origin-left ${(isFocused) ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
            >
                {label}
            </motion.label>
            <textarea 
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onChange(e.target.value)}
                required
                rows={5}
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-3xl px-6 py-5 text-[var(--text-primary)] font-bold transition-all outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] focus:shadow-[0_0_30px_var(--accent-glow)] resize-none"
                placeholder={isFocused ? placeholder : ""}
            />
        </div>
    );
};

export default Contact;
