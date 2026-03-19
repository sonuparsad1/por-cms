import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Play } from 'lucide-react';

const ProjectMasonry = ({ projects }) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 p-4">
            {projects.map((project, idx) => {
                const heightClass = idx % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square';
                return (
                    <motion.div 
                        key={project._id || idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`relative break-inside-avoid rounded-3xl overflow-hidden group cursor-pointer border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all duration-500`}
                    >
                        <div className={`w-full ${heightClass} relative`}>
                            <img 
                                src={project.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                alt={project.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">{project.category}</span>
                                <h3 className="text-white text-2xl font-black mb-4">{project.title}</h3>
                                <div className="flex gap-4">
                                    <Link 
                                        to={`/projects/${project._id || idx}`}
                                        className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-400 transition-colors"
                                    >
                                        <Play size={14} fill="currentColor" /> Case Study
                                    </Link>
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} className="text-white/70 hover:text-white p-2">
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ProjectMasonry;
