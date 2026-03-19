import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import PremiumButton from '../components/ui/PremiumButton';
import SEOTags from '../components/ui/SEOTags';

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
                const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
                
                if (isMongoId) {
                    const [pRes, rRes] = await Promise.all([
                        fetch(`/api/projects/${id}`),
                        fetch(`/api/projects/related/${id}`)
                    ]);
                    
                    if (!pRes.ok) throw new Error('Project not found');
                    const pData = await pRes.json();
                    const rData = await rRes.json();
                    
                    setProject(pData.data || pData);
                    setRelated(rData.data || []);
                } else {
                    // Mock data fallback
                    setProject({
                        title: "Smart Urinal Blockage Detection",
                        category: "IoT",
                        description: "An detailed IoT system...",
                        tech: ["C++", "Arduino", "IoT Sensors"],
                        status: "Completed",
                        createdAt: new Date().toISOString()
                    });
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin h-10 w-10 border-b-2 border-coffee-900 rounded-full"></div></div>;
    if (error || !project) return <div className="py-20 text-center"><h2 className="text-2xl font-bold">Project Not Found</h2></div>;

    return (
        <article className="py-12 max-w-5xl mx-auto px-6">
            <SEOTags 
                pageTitle={project.title} 
                pageDescription={project.shortDescription || project.description}
                pageImage={project.coverImage}
            />

            <Link to="/projects" className="inline-flex items-center gap-2 text-coffee-600 dark:text-coffee-400 mb-8 font-bold hover:translate-x-[-4px] transition-transform">
                <ArrowLeft size={20} /> Back to Showcase
            </Link>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {project.coverImage && (
                    <div className="w-full aspect-video rounded-[40px] overflow-hidden mb-12 shadow-2xl border border-white/10">
                        <img src={project.coverImage} className="w-full h-full object-cover" alt={project.title} />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <header>
                            <div className="flex gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-coffee-100 dark:bg-white/5 rounded-full text-xs font-black uppercase text-coffee-800 dark:text-coffee-200">{project.category}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-coffee-900 dark:text-white leading-tight tracking-tighter">{project.title}</h1>
                        </header>

                        <div className="prose dark:prose-invert max-w-none text-xl leading-relaxed text-coffee-800 dark:text-coffee-300">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                {project.fullContent || project.description}
                            </ReactMarkdown>
                        </div>

                        {/* Gallery Section */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="mt-12 space-y-6">
                                <h3 className="text-2xl font-black text-coffee-900 dark:text-white tracking-tighter">Project Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.galleryImages.map((img, idx) => (
                                        <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-8">
                        <div className="p-8 glass rounded-[32px] border border-white/10 sticky top-24">
                            <h3 className="text-sm font-black uppercase tracking-widest text-coffee-500 mb-6 font-mono">Project Blueprint</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="block text-[10px] text-coffee-500 font-black uppercase mb-2">Developed With</span>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.techStack || project.tech || []).map(t => (
                                            <span key={t} className="px-3 py-1 bg-white dark:bg-white/5 border border-coffee-200 dark:border-white/10 rounded-lg text-xs font-bold">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-coffee-200 dark:border-white/10 flex flex-col gap-3">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <PremiumButton className="w-full flex items-center justify-center gap-2"> <Github size={18} /> Open Repository</PremiumButton>
                                        </a>
                                    )}
                                    {project.liveDemoUrl && (
                                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                            <PremiumButton variant="secondary" className="w-full flex items-center justify-center gap-2"> <ExternalLink size={18} /> Visit Deployment</PremiumButton>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Content */}
                {related.length > 0 && (
                    <section className="mt-24 pt-24 border-t border-coffee-200 dark:border-white/10">
                        <h2 className="text-3xl font-black text-coffee-900 dark:text-white mb-12 tracking-tighter">Similar Case Studies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map(item => (
                                <Link key={item._id} to={`/projects/${item._id}`} className="group block">
                                    <div className="aspect-video rounded-3xl overflow-hidden mb-4 border border-white/10">
                                        <img src={item.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                                    </div>
                                    <h4 className="font-bold text-xl text-coffee-900 dark:text-white group-hover:text-coffee-500 transition-colors">{item.title}</h4>
                                    <p className="text-sm text-coffee-600 dark:text-coffee-400 font-medium">{item.category}</p>
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
