import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { MessageSquare, Star, ChevronLeft, ChevronRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import FluidBackground from '../components/ui/FluidBackground';
import PremiumButton from '../components/ui/PremiumButton';

const mockTestimonials = [
    {
        name: "Dr. A. Sharma",
        role: "Professor of Computer Science",
        company: "University Engineering Dept.",
        rating: 5,
        quote: "Sonu demonstrated exceptional rapid prototyping skills during his thesis on IoT frameworks. His ability to write clean C++ for Arduino and seamlessly bridge it to a Node.js backend is genuinely impressive for an undergraduate."
    },
    {
        name: "Priya Patel",
        role: "Team Lead",
        company: "National Hackathon 2024",
        rating: 5,
        quote: "Working with Sonu during the 48-hour sprint was incredible. He not only handled the complex dataset cleaning under immense pressure but also managed to deploy the React frontend ahead of schedule. A highly dependable full-stack engineer."
    },
    {
        name: "Rahul Verma",
        role: "Client",
        company: "Freelance App Deployment",
        rating: 4,
        quote: "Great communication and a keen eye for premium UI components. The portfolio system he delivered was fast, responsive, and exactly matched the Figma designs we provided."
    }
];

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    // Review Form State
    const [formData, setFormData] = useState({ name: '', role: '', company: '', quote: '', rating: 5 });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Fetch ONLY approved reviews
                const res = await fetch('/api/testimonials?status=approved');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setTestimonials(data.data);
                } else {
                    setTestimonials(mockTestimonials);
                }
            } catch (err) {
                setTestimonials(mockTestimonials);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const next = () => setActiveIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
    const prev = () => setActiveIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', role: '', company: '', quote: '', rating: 5 });
            } else {
                setSubmitStatus('error');
            }
        } catch (err) {
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000); // Clear status after 5s
        }
    };

    return (
        <div className="min-h-screen py-24 px-6 relative overflow-hidden bg-transparent perspective-[2000px]">
            <FluidBackground />
            
            <div className="max-w-6xl mx-auto relative z-10 space-y-20">
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="inline-flex justify-center items-center p-6 glass rounded-full mb-6 relative border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ transform: "translateZ(80px)" }}>
                        <MessageSquare size={48} className="text-[var(--accent)]" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-[var(--text-primary)] tracking-tighter drop-shadow-2xl" style={{ transform: "translateZ(60px)" }}>
                        Peer <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)]">Reviews</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] italic font-medium opacity-80" style={{ transform: "translateZ(30px)" }}>
                        Analysis algorithms confirming system reliability.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_var(--accent-glow)]"></div>
                    </div>
                ) : (
                    <div className="relative h-[500px] flex items-center justify-center perspective-[2000px] transform-style-3d mt-10">
                        {testimonials.map((t, idx) => {
                            const isActive = idx === activeIndex;
                            const isPrev = idx === (activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
                            const isNext = idx === (activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);
                            
                            let xOffset = 0;
                            let zOffset = -300;
                            let scale = 0.8;
                            let opacity = 0;
                            let rotateY = 0;
                            let zIndex = 0;

                            if (isActive) {
                                xOffset = 0;
                                zOffset = 50;
                                scale = 1;
                                opacity = 1;
                                rotateY = 0;
                                zIndex = 30;
                            } else if (isPrev) {
                                xOffset = -300; 
                                zOffset = -150;
                                scale = 0.85;
                                opacity = 0.5;
                                rotateY = 30; 
                                zIndex = 20;
                            } else if (isNext) {
                                xOffset = 300;
                                zOffset = -150;
                                scale = 0.85;
                                opacity = 0.5;
                                rotateY = -30; 
                                zIndex = 20;
                            }

                            return (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={{ 
                                        x: xOffset, 
                                        z: zOffset, 
                                        scale, 
                                        opacity, 
                                        rotateY,
                                        zIndex
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                                    className="absolute w-full max-w-2xl cursor-pointer"
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <GlassCard hoverEffect={false} className={`h-[400px] flex flex-col relative !p-10 transition-all duration-500 border-2 ${isActive ? 'border-[var(--accent)]/50 shadow-[0_0_40px_var(--accent-glow)] bg-white/10 dark:bg-black/40' : 'border-white/5 bg-white/5 dark:bg-black/20'}`}>
                                        <MessageSquare size={60} className={`absolute top-8 right-8 transition-opacity duration-500 ${isActive ? 'text-[var(--accent)]/20' : 'text-white/5'}`} />
                                        
                                        <div className="flex gap-1 mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={20} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={i < t.rating ? 0 : 2} className={i >= t.rating ? "text-[var(--text-secondary)] opacity-30" : "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]"} />
                                            ))}
                                        </div>

                                        <p className={`mb-8 italic flex-grow text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-500 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                            "{t.quote}"
                                        </p>

                                        <div className="mt-auto border-t border-white/10 pt-6 flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex justify-center items-center text-[var(--accent)] font-black text-xl shadow-[inset_0_0_10px_var(--accent-glow)]">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className={`font-black tracking-wide text-lg ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{t.name}</h4>
                                                <p className="text-sm text-[var(--accent)] font-bold tracking-widest uppercase">{t.role} <span className="opacity-50">@ {t.company}</span></p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
                
                {/* Controls */}
                {!loading && testimonials.length > 1 && (
                    <div className="flex justify-center gap-6 pt-6" style={{ transform: "translateZ(100px)" }}>
                        <button onClick={prev} className="w-14 h-14 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_var(--accent-glow)] group">
                            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button onClick={next} className="w-14 h-14 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_var(--accent-glow)] group">
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                {/* Submit Form Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto pt-24"
                >
                    <GlassCard className="p-8 md:p-12 relative overflow-hidden border-t-4 border-[var(--accent)]">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="text-center mb-10 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4">Leave a Review</h2>
                            <p className="text-[var(--text-secondary)] italic">Your feedback establishes system trust. Submissions will be verified prior to public display.</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2">Full Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-white/5 dark:bg-black/20 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-[var(--text-primary)]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2">Role / Title (Optional)</label>
                                    <input 
                                        type="text" 
                                        placeholder="Senior Developer"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full bg-white/5 dark:bg-black/20 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2">Company / Organization (Optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="Tech Innovations Ltd."
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                    className="w-full bg-white/5 dark:bg-black/20 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-[var(--text-primary)]"
                                />
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2">Rating Experience <span className="text-red-500">*</span></label>
                                <div className="flex gap-2 p-4 bg-white/5 dark:bg-black/20 border border-white/10 rounded-xl w-fit">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({...formData, rating: star})}
                                            className="hover:scale-110 transition-transform focus:outline-none"
                                        >
                                            <Star 
                                                size={32} 
                                                fill={star <= formData.rating ? "currentColor" : "none"} 
                                                strokeWidth={star <= formData.rating ? 0 : 1.5} 
                                                className={star <= formData.rating ? "text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" : "text-white/20"} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2">Message / Quote <span className="text-red-500">*</span></label>
                                <textarea 
                                    required 
                                    rows="4"
                                    placeholder="Share your experience working with me..."
                                    value={formData.quote}
                                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                                    className="w-full bg-white/5 dark:bg-black/20 border border-white/10 rounded-xl px-5 py-4 outline-none resize-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-[var(--text-primary)] leading-relaxed"
                                />
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 mt-6">
                                <div className="flex-1 w-full">
                                    <AnimatePresence mode="wait">
                                        {submitStatus === 'success' && (
                                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
                                                <CheckCircle size={20} />
                                                <span className="text-sm font-bold">Review submitted successfully! Pending admin approval.</span>
                                            </motion.div>
                                        )}
                                        {submitStatus === 'error' && (
                                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
                                                <AlertCircle size={20} />
                                                <span className="text-sm font-bold">Failed to submit review. Connection anomaly detected.</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <PremiumButton 
                                    type="submit" 
                                    disabled={submitting} 
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 !px-8 !py-4"
                                >
                                    {submitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Submit Review <Send size={18} /></>
                                    )}
                                </PremiumButton>
                            </div>
                        </form>
                    </GlassCard>
                </motion.div>

            </div>
        </div>
    );
};

export default TestimonialsPage;
