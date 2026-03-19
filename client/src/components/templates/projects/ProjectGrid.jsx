import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../../ui/GlassCard';

const ProjectGrid = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
                <motion.div
                    key={project._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <GlassCard className="h-full group overflow-hidden flex flex-col hover:border-[var(--accent)] transition-colors">
                        <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                            <img 
                                src={project.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'} 
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-[var(--accent)] hover:text-white transition-all">
                                        <Github size={16} />
                                    </a>
                                )}
                                {project.liveDemoUrl && (
                                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-[var(--accent)] hover:text-white transition-all">
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex-grow">
                            <div className="flex gap-2 mb-3">
                                {project.techStack?.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-xl font-black mb-3 text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm line-clamp-3 mb-6 leading-relaxed">
                                {project.shortDescription}
                            </p>
                        </div>

                        <Link to={`/projects/${project._id || idx}`} className="mt-auto flex items-center justify-between group/link pt-4 border-t border-[var(--border)]">
                            <span className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)]">Details</span>
                            <ArrowRight size={18} className="translate-x-0 group-hover/link:translate-x-2 transition-transform text-[var(--accent)]" />
                        </Link>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};

export default ProjectGrid;
