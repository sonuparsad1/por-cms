import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';
import TiltCard from '../../ui/TiltCard';

const BlogMinimal = ({ blogs }) => {
    return (
        <div className="max-w-5xl mx-auto space-y-16">
            {blogs.map((blog, idx) => (
                <TiltCard key={blog._id || idx}>
                    <GlassCard 
                        delay={idx * 0.1}
                        className="group relative border border-[var(--border)] hover:border-[var(--accent)] transition-all p-0 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row items-stretch">
                            <div className="md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden">
                                <img 
                                    src={blog.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    alt={blog.title}
                                />
                                <div className="absolute inset-0 bg-[var(--accent)]/10 mix-blend-overlay" />
                            </div>
                            
                            <div className="flex-1 p-10 flex flex-col justify-center space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest border border-[var(--accent)]/20">
                                        {blog.category}
                                    </span>
                                    <span className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest opacity-60">
                                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors tracking-tight leading-none">
                                    {blog.title}
                                </h2>
                                
                                <p className="text-[var(--text-secondary)] leading-relaxed font-medium line-clamp-2 opacity-80">
                                    {blog.summary}
                                </p>
                                
                                <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-[var(--text-primary)] group/link">
                                    Read Insight 
                                    <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover/link:bg-[var(--accent)] group-hover/link:text-white transition-all">
                                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </GlassCard>
                </TiltCard>
            ))}
        </div>
    );
};

export default BlogMinimal;
