import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumButton from '../../ui/PremiumButton';

const ProjectCarousel = ({ projects }) => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % projects.length);
    const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

    const current = projects[index];

    return (
        <div className="relative px-4 py-8">
            <div className="max-w-6xl mx-auto overflow-hidden relative min-h-[500px] flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="rounded-[40px] overflow-hidden border-8 border-[var(--border)] shadow-2xl aspect-[4/3] group">
                            <img 
                                src={current.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                alt={current.title}
                            />
                        </div>
                        <div className="space-y-6">
                            <span className="text-[var(--accent)] font-mono text-sm tracking-[0.3em] uppercase">{current.category}</span>
                            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tighter">
                                {current.title}
                            </h2>
                            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                                {current.shortDescription}
                            </p>
                            
                            <div className="flex items-center gap-6 pt-6">
                                <Link to={`/projects/${current._id || index}`}>
                                    <PremiumButton className="!px-8">View Masterpiece</PremiumButton>
                                </Link>
                                <div className="flex gap-4">
                                    {current.githubUrl && (
                                        <a href={current.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-2xl hover:bg-[var(--accent)] hover:text-white transition-all">
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-12">
                <button onClick={prev} className="p-4 rounded-2xl glass border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-2 px-6 glass rounded-2xl border border-[var(--border)]">
                    <span className="font-mono text-xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                    <span className="opacity-30">/</span>
                    <span className="opacity-50 text-sm">{String(projects.length).padStart(2, '0')}</span>
                </div>
                <button onClick={next} className="p-4 rounded-2xl glass border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default ProjectCarousel;
