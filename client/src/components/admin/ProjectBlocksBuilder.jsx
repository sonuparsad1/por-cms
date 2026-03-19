import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, Type, Image as ImageIcon, Video, Layout, Code, Monitor, Map, Clock, ChevronUp, ChevronDown, Save, Terminal, Layers } from 'lucide-react';

const BLOCK_TYPES = [
    { type: 'text', label: 'Text Section', icon: Type, default: '' },
    { type: 'image', label: 'Image Section', icon: ImageIcon, default: { url: '', caption: '' } },
    { type: 'video', label: 'Video Showcase', icon: Video, default: { url: '', title: '', type: 'youtube' } },
    { type: 'gallery', label: 'Multi-Gallery', icon: Layout, default: { images: [], title: '' } },
    { type: 'features', label: 'Feature Matrix', icon: Monitor, default: { items: [], title: '' } },
    { type: 'code', label: 'Code Snippet', icon: Code, default: { code: '', language: 'javascript' } },
    { type: 'demo', label: 'Live Embed / Demo', icon: Monitor, default: { url: '', title: '' } },
    { type: 'architecture', label: 'System Architecture', icon: Map, default: { url: '', description: '' } },
    { type: 'timeline', label: 'Timeline / Steps', icon: Clock, default: { steps: [], title: '' } }
];

const ProjectBlocksBuilder = ({ sections = [], onChange }) => {
    
    const addSection = (type) => {
        const blockType = BLOCK_TYPES.find(b => b.type === type);
        const newSection = {
            id: 'seg_' + Math.random().toString(36).substr(2, 9),
            type,
            content: blockType.default,
            order: sections.length
        };
        onChange([...sections, newSection]);
    };

    const updateSection = (id, newContent) => {
        onChange(sections.map(s => (s.id === id || s._id === id) ? { ...s, content: newContent } : s));
    };

    const removeSection = (id) => {
        onChange(sections.filter(s => (s.id !== id && s._id !== id)));
    };

    const moveUp = (index) => {
        if (index === 0) return;
        const newArr = [...sections];
        [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
        onChange(newArr);
    };

    const moveDown = (index) => {
        if (index === sections.length - 1) return;
        const newArr = [...sections];
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
        onChange(newArr);
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col gap-6 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 border-b border-[var(--border)] pb-6">
                    <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl border border-[var(--accent)]/30"><Layers size={20}/></div>
                    <div>
                        <h4 className="text-sm font-black text-[var(--text-primary)] uppercase italic">Segment_Forge</h4>
                        <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-[0.2em]">Build High-Pressure Case Study Architecture</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {BLOCK_TYPES.map(bt => (
                        <button 
                            key={bt.type}
                            type="button"
                            onClick={() => addSection(bt.type)}
                            className="flex flex-col items-center justify-center gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl transition-all hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]/40 hover:scale-[1.02] group/btn"
                        >
                            <bt.icon size={20} className="text-[var(--text-secondary)] group-hover/btn:text-[var(--accent)] transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover/btn:text-[var(--text-primary)] transition-colors">{bt.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8 min-h-[100px]">
                <AnimatePresence initial={false}>
                    {sections.map((section, idx) => (
                        <motion.div 
                            key={section.id || section._id || idx}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="group relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-xl"
                        >
                            <div className="flex items-center justify-between px-8 py-5 bg-[var(--bg-primary)]/50 border-b border-[var(--border)]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center font-black text-xs italic text-[var(--accent)]">
                                        {idx + 1}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] italic">{section.type} // MODULE</span>
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-30">Active_Segment_{section.id?.slice(-4) || 'NULL'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 translate-x-2 group-hover:translate-x-0">
                                    <div className="flex bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl overflow-hidden p-1 gap-1">
                                        <button type="button" onClick={() => moveUp(idx)} className="p-2 hover:bg-[var(--accent)]/10 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-lg transition-all"><ChevronUp size={14}/></button>
                                        <button type="button" onClick={() => moveDown(idx)} className="p-2 hover:bg-[var(--accent)]/10 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-lg transition-all"><ChevronDown size={14}/></button>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => removeSection(section.id || section._id)} 
                                        className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </div>

                            <div className="p-10">
                                {section.type === 'text' && (
                                    <textarea 
                                        className="w-full bg-transparent text-[var(--text-primary)] border-none outline-none resize-none font-medium text-sm leading-relaxed min-h-[150px]"
                                        placeholder="Deploy textual narrative... (Markdown Supported)"
                                        value={section.content || ''}
                                        onChange={(e) => updateSection(section.id || section._id, e.target.value)}
                                    />
                                )}
                                {section.type === 'image' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Visual_Asset_Cloud_URL</label>
                                                <input 
                                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 transition-all font-mono"
                                                    placeholder="https://cloudinary.com/v1/..."
                                                    value={section.content.url || ''}
                                                    onChange={(e) => updateSection(section.id || section._id, { ...section.content, url: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Lore_Caption</label>
                                                <input 
                                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 transition-all italic"
                                                    placeholder="Strategic visualization of the architecture..."
                                                    value={section.content.caption || ''}
                                                    onChange={(e) => updateSection(section.id || section._id, { ...section.content, caption: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        {section.content.url && (
                                            <div className="rounded-[32px] overflow-hidden border border-[var(--border)] bg-black/20 aspect-video group/img relative">
                                                <img src={section.content.url} alt="Segment Preview" className="w-full h-full object-cover transition-transform group-hover/img:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                    <span className="text-[10px] text-white font-black uppercase italic tracking-widest">Preview_Initialized</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {section.type === 'code' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <Terminal size={14} className="text-[var(--accent)]"/>
                                            <input 
                                                className="bg-transparent border-b border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-widest outline-none py-1 w-40"
                                                placeholder="LANGUAGE_PROTOCOL..."
                                                value={section.content.language || 'javascript'}
                                                onChange={(e) => updateSection(section.id || section._id, { ...section.content, language: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative group/code">
                                            <textarea 
                                                className="w-full bg-black/40 text-[#a9b1d6] border border-[var(--border)] rounded-3xl p-8 font-mono text-xs h-64 outline-none focus:border-[var(--accent)]/50 transition-all shadow-inner"
                                                placeholder="// Initialize source protocols..."
                                                value={section.content.code || ''}
                                                onChange={(e) => updateSection(section.id || section._id, { ...section.content, code: e.target.value })}
                                            />
                                            <div className="absolute top-4 right-6 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Code_Matrix_Buffer</div>
                                        </div>
                                    </div>
                                )}
                                
                                {['video', 'gallery', 'features', 'demo', 'architecture', 'timeline'].includes(section.type) && (
                                    <div className="py-20 flex flex-col items-center justify-center border border-dashed border-[var(--border)] rounded-3xl opacity-40">
                                        <Plus size={24} className="text-[var(--accent)] mb-4 animate-pulse" />
                                        <p className="text-[10px] text-[var(--text-primary)] font-black uppercase tracking-[0.3em]">Module_Config_Awaiting_Logic // {section.type}</p>
                                        <p className="text-[8px] text-[var(--text-secondary)] uppercase tracking-[0.1em] mt-2">Expansion Pack Required for Advanced Visualization</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {sections.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-[60px] opacity-20 group hover:opacity-100 hover:border-[var(--accent)]/30 transition-all bg-[var(--bg-secondary)]/50 shadow-inner">
                    <div className="w-16 h-16 rounded-3xl bg-[var(--accent)]/5 flex items-center justify-center mb-6 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                        <Terminal size={32} className="text-[var(--accent)]" />
                    </div>
                    <p className="font-black text-xs uppercase tracking-[0.4em] italic mb-2">Awaiting_Architectural_Data</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Select a segment module from Forge to initialize</p>
                </div>
            )}
        </div>
    );
};

export default ProjectBlocksBuilder;
