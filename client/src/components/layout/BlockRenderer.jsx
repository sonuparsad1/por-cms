import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Star, Zap, Activity, Grid as GridIcon, Clock, TrendingUp, Quote, Monitor, ChevronRight } from 'lucide-react';

const BlockRenderer = ({ blocks = [] }) => {
    if (!blocks || blocks.length === 0) return (
        <div className="py-40 text-center opacity-20 uppercase tracking-[0.5em] font-black text-sm italic">
            Awaiting_Content_Stream...
        </div>
    );

    return (
        <div className="block-matrix">
            {blocks.map((block, idx) => {
                const { type, content } = block;
                
                // --- HERO BLOCK ---
                if (type === 'hero') return (
                    <section key={idx} className={`relative flex items-center justify-${content.align === 'center' ? 'center' : content.align === 'right' ? 'end' : 'start'} min-h-screen py-32 px-10 md:px-20 overflow-hidden`}
                        style={{ background: content.bgImage ? `url(${content.bgImage}) center/cover fixed` : 'var(--bg-primary)' }}>
                        {content.bgImage && <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />}
                        <div className={`relative z-10 max-w-5xl w-full text-${content.align}`}>
                            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 leading-[0.9] italic tracking-tight drop-shadow-2xl">
                                {content.headline}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl font-bold leading-relaxed">
                                {content.subheading}
                            </p>
                            <div className={`flex gap-6 flex-wrap ${content.align === 'center' ? 'justify-center' : content.align === 'right' ? 'justify-end' : ''}`}>
                                {content.ctaLabel && (
                                    <a href={content.ctaUrl} className="px-10 py-5 bg-[var(--accent)] text-white font-black rounded-full uppercase tracking-widest text-xs hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-3 group">
                                        {content.ctaLabel} <Zap size={16} className="group-hover:rotate-12 transition-transform" />
                                    </a>
                                )}
                                {content.secCtaLabel && (
                                    <a href={content.secCtaUrl} className="px-10 py-5 border-2 border-white/30 backdrop-blur-md text-white font-black rounded-full uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:border-white transition-all">
                                        {content.secCtaLabel}
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                );

                // --- TEXT BLOCK ---
                if (type === 'text') return (
                    <section key={idx} className="py-24 px-6 md:px-0">
                        <div className="container mx-auto max-w-4xl">
                            <div className="prose prose-xl dark:prose-invert prose-coffee max-w-none text-[var(--text-primary)] leading-relaxed italic font-medium">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                            </div>
                        </div>
                    </section>
                );

                // --- IMAGE BLOCK ---
                if (type === 'image') return (
                    <section key={idx} className={`py-12 px-6 md:px-0 ${content.layout === 'full' ? 'w-full' : 'container mx-auto max-w-6xl'}`}>
                        <div className="relative group overflow-hidden rounded-[40px] shadow-3xl">
                            <img src={content.url} alt={content.alt} className="w-full transform group-hover:scale-105 transition-transform duration-1000 object-cover" />
                            {content.caption && (
                                <div className="absolute bottom-10 left-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                                    <p className="text-xs text-white/90 font-black uppercase tracking-widest italic">{content.caption}</p>
                                </div>
                            )}
                        </div>
                    </section>
                );

                // --- FEATURES BLOCK ---
                if (type === 'features') return (
                    <section key={idx} className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
                        <div className="container mx-auto px-6 max-w-7xl">
                            {content.title && (
                                <h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-20 text-center border-b border-[var(--border)] pb-10">
                                    {content.title}
                                </h2>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {(content.items || []).map((feature, fidx) => (
                                    <div key={fidx} className="p-10 bg-[var(--bg-primary)] border border-[var(--border)] rounded-[32px] hover:border-[var(--accent)]/30 hover:-translate-y-2 transition-all group shadow-xl">
                                        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-8 border border-[var(--accent)]/20 shadow-inner group-hover:scale-110 transition-transform">
                                            <Zap size={28} />
                                        </div>
                                        <h3 className="text-xl font-black text-[var(--text-primary)] uppercase italic tracking-tight mb-4">{feature.title}</h3>
                                        <p className="text-[var(--text-secondary)] opacity-60 font-bold italic leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

                // --- CTA BLOCK ---
                if (type === 'cta') return (
                    <section key={idx} className="py-20 px-6">
                        <div className={`container mx-auto max-w-6xl p-16 rounded-[48px] shadow-3xl text-${content.align} border border-[var(--border)]
                            ${content.style === 'dark' ? 'bg-black text-white' : 
                              content.style === 'glass' ? 'bg-white/5 backdrop-blur-2xl border-white/10' : 
                              content.style === 'outline' ? 'border-4 border-[var(--accent)]' : 
                              'bg-[var(--accent)] text-white shadow-[0_0_50px_var(--accent-glow)]'}
                        `}>
                            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase italic tracking-tighter leading-tight">{content.heading}</h3>
                            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto font-bold italic">{content.subtext}</p>
                            <a href={content.btnUrl} className={`inline-flex items-center gap-3 px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95
                                ${content.style === 'accent' ? 'bg-white text-[var(--accent)]' : 'bg-[var(--accent)] text-white shadow-xl'}
                            `}>
                                {content.btnLabel} <ChevronRight size={18} />
                            </a>
                        </div>
                    </section>
                );

                // --- STATS BLOCK ---
                if (type === 'stats') return (
                    <section key={idx} className="py-32 px-6">
                        <div className="container mx-auto max-w-7xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                {(content.stats || []).map((s, sidx) => (
                                    <div key={sidx} className="text-center group">
                                        <div className="text-6xl font-black text-[var(--accent)] mb-2 italic tracking-tighter group-hover:scale-110 transition-transform origin-center flex items-center justify-center">
                                            {s.prefix}{s.value}{s.suffix}
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-40">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

                // --- QUOTE BLOCK ---
                if (type === 'quote') return (
                    <section key={idx} className="py-24 px-6 md:px-0">
                        <div className="container mx-auto max-w-4xl pt-10 border-t border-[var(--border)]">
                            <Quote size={64} className="text-[var(--accent)] opacity-20 mb-10" />
                            <blockquote className="text-3xl md:text-5xl font-black italic text-[var(--text-primary)] leading-[1.1] tracking-tighter mb-8">
                                "{content.text}"
                            </blockquote>
                            {content.attribution && (
                                <cite className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] not-italic">
                                    // {content.attribution}
                                </cite>
                            )}
                        </div>
                    </section>
                );

                // --- DIVIDER BLOCK ---
                if (type === 'divider') return (
                    <div key={idx} className="container mx-auto px-6 py-12 flex items-center gap-8">
                        {content.label && <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] opacity-30 whitespace-nowrap">{content.label}</span>}
                        <div className={`flex-1 ${content.style === 'thick' ? 'h-1.5' : 'h-px'} ${content.style === 'dots' ? 'border-t-4 border-dotted' : content.style === 'gradient' ? 'bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent' : 'bg-[var(--border)]'} rounded-full`} />
                    </div>
                );

                return <div key={idx} className="p-10 border border-red-500/20 rounded-3xl m-6 text-xs text-red-500 font-mono">Unrecognized_Block_Element: {type}</div>;
            })}
        </div>
    );
};

export default BlockRenderer;
