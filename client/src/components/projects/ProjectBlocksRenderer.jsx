import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { motion } from 'framer-motion';

const ProjectBlocksRenderer = ({ sections = [] }) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="space-y-16 md:space-y-24">
            {sections.sort((a, b) => (a.order || 0) - (b.order || 0)).map((section, idx) => {
                const isEven = idx % 2 === 0;

                return (
                    <motion.section 
                        key={section._id || idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        {section.type === 'text' && (
                            <div className="prose dark:prose-invert max-w-none text-xl leading-relaxed text-[var(--text-secondary)]">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                    {section.content}
                                </ReactMarkdown>
                            </div>
                        )}

                        {section.type === 'image' && section.content?.url && (
                            <figure className="space-y-4">
                                <div className="rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-black/20">
                                    <img 
                                        src={section.content.url} 
                                        alt={section.content.caption || 'Project Section'} 
                                        className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-1000"
                                    />
                                </div>
                                {section.content.caption && (
                                    <figcaption className="text-center text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-40 italic">
                                        Data_Visualization // {section.content.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}

                        {section.type === 'code' && section.content?.code && (
                            <div className="relative group/code rounded-[32px] overflow-hidden border border-white/5 shadow-2xl bg-black/40">
                                <div className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">PROTOCOL_{section.content.language?.toUpperCase() || 'SOURCE'}</span>
                                </div>
                                <div className="p-8 md:p-12 overflow-x-auto text-sm leading-relaxed font-mono">
                                    <pre className={`language-${section.content.language || 'javascript'}`}>
                                        <code>{section.content.code}</code>
                                    </pre>
                                </div>
                            </div>
                        )}

                        {section.type === 'video' && section.content?.url && (
                            <div className="rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-black aspect-video relative group">
                                <iframe 
                                    src={section.content.url.replace('watch?v=', 'embed/')} 
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={section.content.title || 'Project Video'}
                                />
                            </div>
                        )}

                        {/* Fallback for other types or unimplemented ones */}
                        {!['text', 'image', 'code', 'video'].includes(section.type) && (
                            <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[40px] opacity-20">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em]">MODULE_INITIALIZATION_PENDING // {section.type}</p>
                            </div>
                        )}
                    </motion.section>
                );
            })}
        </div>
    );
};

export default ProjectBlocksRenderer;
