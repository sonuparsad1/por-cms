import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';
import TiltCard from '../../ui/TiltCard';

const ProjectGrid = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, idx) => (
                <TiltCard key={project._id || idx} className="h-full">
                    <GlassCard 
                        delay={idx * 0.1}
                        className="h-full group overflow-hidden flex flex-col hover:border-[var(--accent)] transition-all bg-[var(--bg-glass)]"
                    >
                        <div className="relative h-56 mb-8 overflow-hidden rounded-[24px] shadow-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                            <img 
                                src={project.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'} 
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-[var(--accent)] hover:text-white transition-all">
                                        <Github size={20} />
                                    </a>
                                )}
                                {project.liveDemoUrl && (
                                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-[var(--accent)] hover:text-white transition-all">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex-grow space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {project.techStack?.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-[9px] uppercase font-black tracking-[0.2em] px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none group-hover:text-[var(--accent)] transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm font-semibold line-clamp-3 leading-relaxed opacity-90">
                                {project.shortDescription}
                            </p>
                        </div>

                        <Link to={`/projects/${project._id || idx}`} className="mt-8 flex items-center justify-between group/link pt-6 border-t border-[var(--border)]">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Open Project</span>
                            <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center group-hover/link:bg-[var(--accent)] group-hover/link:text-white transition-all">
                                <ArrowRight size={18} className="translate-x-0 group-hover/link:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </GlassCard>
                </TiltCard>
            ))}
        </div>
    );
};

export default ProjectGrid;
