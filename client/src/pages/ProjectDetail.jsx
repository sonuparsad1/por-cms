import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ShieldAlert, Monitor, Type, Layout, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../components/ui/PremiumButton';
import SEOTags from '../components/ui/SEOTags';
import ProjectBlocksRenderer from '../components/projects/ProjectBlocksRenderer';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pRes, rRes] = await Promise.all([
                    fetch(`/api/projects/${id}`),
                    fetch(`/api/projects/related/${id}`)
                ]);
                
                if (!pRes.ok) throw new Error('Project not found');
                const pData = await pRes.json();
                const rData = await rRes.json();
                
                setProject(pData.data || pData);
                setRelated(rData.data || []);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex justify-center items-center bg-[var(--bg-primary)]"><div className="animate-pulse h-12 w-12 bg-[var(--accent)]/20 rounded-2xl border border-[var(--accent)]/40 flex items-center justify-center text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]"><Terminal size={24}/></div></div>;
    if (error || !project) return <div className="min-h-screen py-32 text-center bg-[var(--bg-primary)]"><h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4">Protocol_Not_Found</h2><Link to="/projects" className="text-[var(--accent)] font-bold italic underline">Return to Archives</Link></div>;

    const sections = project.structuredContent?.sections || [];
    const isCustom = project.contentMode === 'custom';

    return (
        <article className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--accent)]/30 relative">
            <div className="fixed inset-0 bg-[var(--bg-primary)] -z-10" />
            <SEOTags 
                pageTitle={project.title} 
                pageDescription={project.shortDescription}
                pageImage={project.coverImage}
            />

            {/* Tactical Return */}
            <div className="fixed top-24 left-10 z-50 hidden xl:block">
                <Link to="/projects" className="group flex flex-col items-center gap-4 text-[var(--text-secondary)] opacity-30 hover:opacity-100 transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-glass)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] vertical-text transform rotate-180">RETURN_Archives</span>
                </Link>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16 md:pt-32 pb-40">
                
                {/* HERO SECTION */}
                <div className="max-w-[1400px] mx-auto px-6 mb-20 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="order-2 lg:order-1 space-y-8 md:space-y-12">
                            <motion.div 
                                initial={{ x: -30, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }} 
                                transition={{ delay: 0.2 }}
                                className="space-y-4 md:space-y-6"
                            >
                                <div className="flex gap-4">
                                    <span className="px-4 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full text-[10px] font-black uppercase italic tracking-widest">{project.category}</span>
                                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase italic tracking-widest">{project.status}</span>
                                </div>
                                <h1 className="text-6xl md:text-9xl font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter uppercase italic">{project.title}</h1>
                                <p className="text-xl md:text-2xl font-black text-[var(--accent)] opacity-60 italic tracking-tight uppercase max-w-xl">{project.tagline || project.shortDescription}</p>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }} 
                                animate={{ y: 0, opacity: 1 }} 
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4"
                            >
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <PremiumButton className="flex items-center gap-3 px-8 py-4"> <Github size={20} /> Open_Source </PremiumButton>
                                    </a>
                                )}
                                {project.liveDemoUrl && (
                                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                        <PremiumButton variant="secondary" className="flex items-center gap-3 px-8 py-4"> <ExternalLink size={20} /> Live_Deployment </PremiumButton>
                                    </a>
                                )}
                            </motion.div>
                        </div>
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, rotate: 2 }} 
                            animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                            className="order-1 lg:order-2"
                        >
                            <div className="relative group p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[60px] shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.05] to-transparent pointer-events-none" />
                                <div className="rounded-[40px] overflow-hidden aspect-[4/3] bg-black/40">
                                    <img src={project.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={project.title} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                        {/* Main Stream */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                {isCustom ? (
                                    <motion.div 
                                        key="custom"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="custom-rendered-case-study prose dark:prose-invert max-w-none text-lg text-[var(--text-secondary)]"
                                        dangerouslySetInnerHTML={{ __html: project.customCode }}
                                    />
                                ) : (
                                    <div key="structured">
                                        <ProjectBlocksRenderer sections={sections} />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar Intel */}
                        <aside className="space-y-12">
                            <div className="p-10 bg-[var(--bg-glass)] backdrop-blur-3xl border border-[var(--border)] rounded-[40px] shadow-2xl sticky top-32 group">
                                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-30 mb-8 flex items-center gap-3">
                                    <Terminal size={14} className="text-[var(--accent)]" /> Project_Intel
                                </h3>
                                
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <span className="block text-[9px] font-black uppercase tracking-widest text-[var(--accent)] opacity-60 italic">Architectural Stack</span>
                                        <div className="flex flex-wrap gap-2">
                                            {(project.techStack || []).map(t => (
                                                <span key={t} className="px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl text-[10px] font-black text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors uppercase tracking-widest italic">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {project.demoLinks?.length > 0 && (
                                        <div className="pt-8 border-t border-[var(--border)] space-y-4">
                                            <span className="block text-[9px] font-black uppercase tracking-widest text-[var(--accent)] opacity-60 italic">Live Protocols</span>
                                            <div className="flex flex-col gap-3">
                                                {project.demoLinks.map((link, idx) => (
                                                    <a key={idx} href={link} target="_blank" className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-[var(--accent)]/30 group/link transition-all">
                                                        <span className="text-[10px] font-black text-[var(--text-secondary)] group-hover/link:text-[var(--text-primary)] uppercase tracking-widest italic">DEMO_PRT_{idx+1}</span>
                                                        <ExternalLink size={14} className="text-[var(--text-secondary)] group-hover/link:text-[var(--accent)]" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-8 flex items-center gap-3 text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">Protocol_Authenticated_Live</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ARCHIVE FOOTER: Similar Studies */}
                {related.length > 0 && (
                    <section className="mt-40 pt-40 border-t border-[var(--border)] max-w-[1400px] mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
                            <div className="space-y-4">
                                <h3 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic leading-[0.9]">Similar_Intel</h3>
                                <p className="text-[10px] font-black tracking-[0.4em] text-[var(--accent)] opacity-60 uppercase">Related Case Studies from the Archive</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {related.map(item => (
                                <Link key={item._id} to={`/projects/${item._id}`} className="group relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[48px] p-6 transition-all hover:-translate-y-2">
                                    <div className="aspect-[16/10] rounded-[32px] overflow-hidden mb-8 bg-black/40">
                                        <img src={item.coverImage} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                                    </div>
                                    <div className="px-2 pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest italic">{item.category}</span>
                                            <ArrowLeft className="rotate-[135deg] text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-all" size={20} />
                                        </div>
                                        <h4 className="font-black text-2xl text-[var(--text-primary)] tracking-tighter uppercase italic">{item.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </motion.div>
        </article>
    );
};

export default ProjectDetail;
