import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Monitor, Terminal, BookOpen, ChevronRight, Hash } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import SEOTags from '../components/ui/SEOTags';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toc, setToc] = useState([]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const [bRes, rRes] = await Promise.all([
                    fetch(`/api/blogs/${id}`),
                    fetch(`/api/blogs/related/${id}`)
                ]);
                
                if (!bRes.ok) throw new Error('Blog not found');
                const bData = await bRes.json();
                const rData = await rRes.json();
                
                const mainBlog = bData.data || bData;
                setBlog(mainBlog);
                setRelated(rData.data || []);

                // Auto-generate TOC from headings
                const headings = [];
                const regex = /^#{1,3}\s+(.+)$/gm;
                let match;
                while ((match = regex.exec(mainBlog.content)) !== null) {
                    headings.push(match[1]);
                }
                setToc(headings);
                
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-[var(--bg-primary)]"><div className="animate-pulse h-12 w-12 bg-[var(--accent)]/20 rounded-2xl border border-[var(--accent)]/40 flex items-center justify-center text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]"><Terminal size={24}/></div></div>;
    if (error || !blog) return <div className="min-h-screen py-32 text-center bg-[var(--bg-primary)]"><h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4">Post_Not_Found</h2><Link to="/blog" className="text-[var(--accent)] font-bold italic underline">Return to Archives</Link></div>;

    return (
        <article className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--accent)]/30 pb-40 relative">
            <SEOTags 
                pageTitle={blog.title} 
                pageDescription={blog.summary || blog.shortDescription}
                pageImage={blog.coverImage}
            />

            {/* Tactical Reading Progress */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-[100] origin-left shadow-[0_0_15px_var(--accent-glow)]"
                style={{ scaleX }}
            />

            {/* Tactical Return */}
            <div className="fixed top-24 left-10 z-50 hidden xl:block">
                <Link to="/blog" className="group flex flex-col items-center gap-4 text-[var(--text-secondary)] opacity-30 hover:opacity-100 transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-glass)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] vertical-text transform rotate-180">RETURN_Stream</span>
                </Link>
            </div>

            {/* HERO SECTION */}
            <header className="relative pt-32 pb-20 overflow-hidden border-b border-[var(--border)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                    >
                        <span className="px-4 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full text-[10px] font-black uppercase italic tracking-widest">{blog.category}</span>
                        <div className="flex items-center gap-2 text-[10px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">
                            <Clock size={14} className="text-[var(--accent)]" /> {blog.readTime || 5} MIN_READ
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">
                            <Calendar size={14} className="text-[var(--accent)]" /> {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter uppercase italic"
                    >
                        {blog.title}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-black text-[var(--text-secondary)] opacity-40 italic tracking-tight uppercase max-w-3xl mx-auto"
                    >
                        {blog.summary || blog.shortDescription}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-4 pt-6"
                    >
                        <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]"><User size={18}/></div>
                        <div className="text-left">
                            <span className="block text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">{blog.author || 'Sonu Prasad'}</span>
                            <span className="block text-[8px] font-black text-[var(--accent)] opacity-60 uppercase tracking-widest">Tactical Protocol Lead</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* COVER IMAGE */}
            {blog.coverImage && (
                <div className="max-w-6xl mx-auto px-6 -mt-10 mb-20 relative z-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden"
                    >
                        <img src={blog.coverImage} className="w-full h-full object-cover rounded-[32px] md:rounded-[48px] aspect-video md:aspect-[21/9]" alt={blog.title} />
                    </motion.div>
                </div>
            )}

            {/* CONTENT GRID */}
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                    
                    {/* Sidebar: Table of Contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 space-y-12">
                            <div className="p-8 bg-[var(--bg-glass)] border border-[var(--border)] rounded-[32px] backdrop-blur-2xl">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] mb-8 flex items-center gap-3">
                                    <BookOpen size={14} /> Intel_Map
                                </h4>
                                <nav className="space-y-4">
                                    {toc.length > 0 ? toc.map((heading, i) => (
                                        <a key={i} href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center gap-3 text-[10px] font-black text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--text-primary)] transition-all">
                                            <ChevronRight size={10} className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all" />
                                            <span className="uppercase tracking-widest line-clamp-1 italic">{heading}</span>
                                        </a>
                                    )) : (
                                        <p className="text-[9px] font-black text-[var(--text-secondary)] opacity-30 uppercase italic">Stream_Scanning...</p>
                                    )}
                                </nav>
                                <div className="mt-10 pt-8 border-t border-[var(--border)]">
                                    <div className="flex gap-4">
                                        <button className="p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all shadow-xl"><Share2 size={16}/></button>
                                        <button className="p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all shadow-xl"><Bookmark size={16}/></button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-8 rounded-[32px] border border-[var(--border)] overflow-hidden group">
                                <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 block text-[9px] font-black uppercase tracking-widest text-[var(--accent)] mb-2 italic">Data Stream Status</span>
                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Protocol_Active</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Stream */}
                    <div className="lg:col-span-3">
                        <div className="prose dark:prose-invert prose-emerald max-w-none text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] [&>h2]:text-4xl [&>h2]:font-black [&>h2]:uppercase [&>h2]:italic [&>h2]:tracking-tighter [&>h2]:text-[var(--text-primary)] [&>h2]:mt-16 [&>h2]:mb-8 [&>h3]:text-2xl [&>h3]:font-black [&>h3]:uppercase [&>h3]:italic [&>h3]:text-[var(--text-primary)] [&>img]:rounded-[40px] [&>img]:border [&>img]:border-[var(--border)] [&>img]:shadow-2xl [&>pre]:rounded-[32px] [&>pre]:border [&>pre]:border-white/5 [&>pre]:p-8 [&>blockquote]:border-l-4 [&>blockquote]:border-[var(--accent)] [&>blockquote]:bg-[var(--accent)]/5 [&>blockquote]:p-8 [&>blockquote]:rounded-r-3xl [&>blockquote]:italic">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]} 
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    h2: ({node, ...props}) => <h2 id={props.children.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                                    h3: ({node, ...props}) => <h3 id={props.children.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        {/* Author Bio Signal */}
                        <div className="mt-32 p-12 bg-gradient-to-br from-[var(--bg-secondary)] to-transparent border border-[var(--border)] rounded-[48px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-[var(--accent)] opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all"><Zap size={64}/></div>
                            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10 text-center md:text-left">
                                <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 border-2 border-[var(--accent)]/40 p-1 flex items-center justify-center">
                                    <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--accent)]"><User size={40}/></div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-3xl font-black text-[var(--text-primary)] uppercase italic leading-none">{blog.author || 'Sonu Prasad'}</h4>
                                        <span className="text-[10px] font-black text-[var(--accent)] opacity-60 uppercase tracking-[0.3em]">Lead Architectural Operative</span>
                                    </div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)] opacity-60 max-w-xl italic">
                                        Bridging the gap between high-level engineering protocols and aesthetic precision. Sonu Prasad designs systems that don't just work, but command the frontier.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Related Archives */}
                        {related.length > 0 && (
                            <section className="mt-40">
                                <h3 className="text-4xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter mb-12">Sequenced_Intel</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {related.map(item => (
                                        <Link key={item._id} to={`/blog/${item.slug || item._id}`} className="group relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] p-6 transition-all hover:-translate-y-2">
                                            <div className="aspect-[16/6] rounded-2xl overflow-hidden mb-6 bg-black/40">
                                                <img src={item.coverImage} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                                            </div>
                                            <div className="px-2">
                                                <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest italic mb-2 block">{item.category}</span>
                                                <h4 className="font-black text-xl text-[var(--text-primary)] tracking-tight uppercase italic group-hover:text-[var(--accent)] transition-colors line-clamp-1">{item.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
