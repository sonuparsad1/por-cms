import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, History, Clock, User, ArrowRight, Terminal, Zap, BookOpen } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SEOTags from '../components/ui/SEOTags';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs?limit=100');
                const data = await res.json();
                const pub = (data.data || data || []).filter(b => b.status === 'published' || b.isPublished);
                setBlogs(pub);
                setFiltered(pub);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const results = blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                (blog.summary || blog.shortDescription || "").toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = activeTag === 'All' || blog.category === activeTag;
            return matchesSearch && matchesTag;
        });
        setFiltered(results);
    }, [searchTerm, activeTag, blogs]);

    const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-[var(--bg-primary)]"><div className="animate-pulse h-12 w-12 bg-[var(--accent)]/20 rounded-2xl border border-[var(--accent)]/40 flex items-center justify-center text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]"><Terminal size={24}/></div></div>;

    return (
        <div className="min-h-screen pt-24 pb-40 relative">
            <div className="fixed inset-0 bg-[var(--bg-primary)] -z-10" />
            <SEOTags pageTitle="Blog Archives" pageDescription="Strategic field notes and technical archives from Sonu Prasad." />

            {/* Tactical Branding Decoration */}
            <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-[var(--accent)]/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-20 left-[-100px] w-[400px] h-[400px] bg-[var(--accent)]/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                
                {/* HERO HEADER */}
                <div className="mb-20 md:mb-32 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-[var(--accent)]"
                    >
                        <div className="h-[2px] w-12 bg-current" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-[var(--accent)]">Knowledge_Streams // Data Archives</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter uppercase italic"
                    >
                        Technical_Intel
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-black text-[var(--text-secondary)] opacity-40 italic tracking-tight uppercase max-w-2xl"
                    >
                        Detailed field notes, architectural deep-dives, and strategic data logs from the frontline of development.
                    </motion.p>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="flex flex-col md:flex-row gap-6 mb-20 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] p-6 shadow-2xl">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-[var(--accent)] group-focus-within:opacity-100 transition-all" size={20} />
                        <input 
                            type="text" 
                            placeholder="Initialize Search Protocol..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl py-4 pl-16 pr-8 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/40 transition-all font-mono italic"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center min-w-[300px]">
                        <Filter size={18} className="text-[var(--text-secondary)] opacity-30 mr-2" />
                        {categories.map(tag => (
                            <button 
                                key={tag} 
                                onClick={() => setActiveTag(tag)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTag === tag ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_var(--accent-glow)]' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] opacity-40 hover:opacity-100 border border-[var(--border)]'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BLOG GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((blog, idx) => (
                            <motion.div 
                                layout
                                key={blog._id} 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group"
                            >
                                <Link to={`/blog/${blog.slug || blog._id}`} className="block relative h-full">
                                    <div className="relative h-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[48px] p-6 overflow-hidden transition-all group-hover:border-[var(--accent)]/40 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                                        
                                        {/* Cover Image */}
                                        <div className="aspect-[16/10] bg-[var(--bg-primary)] rounded-3xl overflow-hidden mb-8 border border-[var(--border)] relative shadow-xl">
                                            <img src={blog.coverImage || '/placeholder.jpg'} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={blog.title} />
                                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                <Clock size={12} className="text-[var(--accent)]" />
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest">{blog.readTime || 5} MIN_READ</span>
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest italic">{blog.category}</span>
                                            <div className="h-[1px] flex-1 bg-[var(--border)] opacity-30" />
                                            <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        {/* Title & Desc */}
                                        <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors line-clamp-2">{blog.title}</h3>
                                        <p className="text-sm font-semibold text-[var(--text-secondary)] opacity-90 leading-relaxed mb-10 line-clamp-3 italic">
                                            {blog.summary || blog.shortDescription}
                                        </p>

                                        {/* Author Footer */}
                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-[var(--border)] opacity-40 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 flex items-center justify-center border border-[var(--accent)]/40"><User size={12} className="text-[var(--accent)]" /></div>
                                                <span className="text-[9px] font-black text-[var(--text-primary)] uppercase tracking-widest">{blog.author || 'Sonu Prasad'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 group/btn">
                                                <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:translate-x-[-10px] group-hover:opacity-100 transition-all text-[var(--accent)]">Load_Protocol</span>
                                                <ArrowRight size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                
                {filtered.length === 0 && (
                    <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-[60px] opacity-20">
                        <Zap size={48} className="mb-6 opacity-20" />
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Null_Data_Retrieved</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4">No matching records found in the archive stream.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
