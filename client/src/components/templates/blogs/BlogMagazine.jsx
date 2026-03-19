import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../../ui/GlassCard';
import TiltCard from '../../ui/TiltCard';
import PremiumButton from '../../ui/PremiumButton';

const BlogMagazine = ({ blogs }) => {
    const featured = blogs[0];
    const remaining = blogs.slice(1);

    return (
        <div className="space-y-20">
            {featured && (
                <section className="relative h-[70vh] rounded-[48px] overflow-hidden group border border-[var(--border)] shadow-2xl">
                    <img src={featured.coverImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={featured.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full max-w-5xl text-[var(--text-primary)]">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <span className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] inline-block">Featured Story</span>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] decoration-wavy underline decoration-[var(--accent)]/10 underline-offset-[16px]">{featured.title}</h2>
                            <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl font-medium leading-relaxed opacity-80">{featured.summary}</p>
                            <div className="pt-4">
                                <Link to={`/blog/${featured.slug}`}>
                                    <PremiumButton variant="primary">Start Reading</PremiumButton>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {remaining.map((blog, idx) => (
                    <TiltCard key={blog._id || idx}>
                        <Link to={`/blog/${blog.slug}`} className="group h-full block">
                            <GlassCard 
                                delay={idx * 0.1}
                                className="h-full !p-0 overflow-hidden flex flex-col border border-[var(--border)] hover:border-[var(--accent)] transition-all bg-[var(--bg-glass)]"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                    <img src={blog.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                                </div>
                                <div className="p-10 flex-grow space-y-4">
                                    <span className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em]">{blog.category}</span>
                                    <h3 className="text-2xl font-black text-[var(--text-primary)] leading-none group-hover:text-[var(--accent)] transition-colors">{blog.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm font-medium line-clamp-2 leading-relaxed opacity-80">{blog.summary}</p>
                                </div>
                            </GlassCard>
                        </Link>
                    </TiltCard>
                ))}
            </div>
        </div>
    );
};

export default BlogMagazine;
