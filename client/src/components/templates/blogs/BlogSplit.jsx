import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';
import TiltCard from '../../ui/TiltCard';
import PremiumButton from '../../ui/PremiumButton';

const BlogSplit = ({ blogs }) => {
    return (
        <div className="space-y-32">
            {blogs.map((blog, idx) => (
                <motion.article 
                    key={blog._id || idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className={`relative ${idx % 2 !== 0 ? 'md:order-last' : ''}`}>
                            <TiltCard>
                                <div className="overflow-hidden rounded-[48px] shadow-[var(--shadow-lg)] border-4 border-[var(--bg-secondary)] aspect-[4/3] relative">
                                    <img 
                                        src={blog.coverImage} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                        alt={blog.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent" />
                                </div>
                            </TiltCard>
                            {/* Accent Decoration */}
                            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)] opacity-20 blur-[80px]" />
                        </div>
                        
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <span className="w-16 h-1.5 bg-[var(--accent)] rounded-full" />
                                <span className="text-[var(--accent)] font-black text-xs tracking-[0.4em] uppercase">{blog.category}</span>
                            </div>
                            
                            <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9]">
                                {blog.title}<span className="text-[var(--accent)]">.</span>
                            </h2>
                            
                            <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-medium opacity-80">
                                {blog.summary}
                            </p>
                            
                            <div className="flex items-center gap-8 text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                                <span className="flex items-center gap-2"><Clock size={16} /> {blog.readTime || 5} min read</span>
                                <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            
                            <div className="pt-4">
                                <Link to={`/blog/${blog.slug}`}>
                                    <PremiumButton variant="primary">Read Investigation</PremiumButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    );
};

export default BlogSplit;
