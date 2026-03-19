import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Copy, ExternalLink, Upload, Search, File, Image as ImageIcon, HardDrive, Check, X, Shield, Cpu, Activity, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const MediaManager = ({ token }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(null);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/upload/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setFiles(data.data || []);
        } catch (err) {
            console.error('Failed to fetch media:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (fileList) => {
        setUploading(true);
        const formData = new FormData();
        Array.from(fileList).forEach(file => formData.append('images', file));

        try {
            const res = await fetch('/api/upload/bulk', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) fetchFiles();
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm('IRREVERSIBLE ACTION: Confirm permanent erasure of media asset?')) return;
        try {
            const res = await fetch(`/api/upload/${filename}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchFiles();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const copyToClipboard = (url) => {
        const fullUrl = window.location.origin + url;
        navigator.clipboard.writeText(fullUrl);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
    const onDragLeave = () => setDragActive(false);
    const onDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files) handleUpload(e.dataTransfer.files);
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 bg-[var(--bg-glass)] backdrop-blur-2xl p-10 rounded-[40px] border border-[var(--border)] shadow-3xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--accent)]/30 text-[var(--accent)] rounded-2xl shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform duration-500">
                        <HardDrive size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase">Asset_Nexus</h2>
                        <p className="text-[10px] font-black tracking-[0.4em] text-[var(--text-secondary)] opacity-30 uppercase mt-2 italic flex items-center gap-2">
                            <Activity size={10} className="text-[var(--accent)]" />
                            Global Central Visual Repository
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto relative z-10">
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-20 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Identify asset by name..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl outline-none focus:border-[var(--accent)]/50 text-sm font-black italic text-[var(--text-primary)] transition-all shadow-inner placeholder:text-[var(--text-secondary)] opacity-10"
                        />
                    </div>
                    <label className="flex items-center justify-center gap-4 px-10 py-4 bg-[var(--accent)] text-black rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_var(--accent-glow)] group">
                        <Upload size={20} className="group-hover:rotate-12 transition-transform" />
                        <span>Deploy_Assets</span>
                        <input type="file" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                    </label>
                </div>
            </header>

            {/* Cinematic Drop Zone */}
            <div 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative h-48 border-2 border-dashed rounded-[40px] flex items-center justify-center transition-all duration-500 group overflow-hidden ${
                    dragActive ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]' : 'border-[var(--border)] bg-[var(--bg-secondary)]/40 hover:border-[var(--text-secondary)]/20'
                }`}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
                
                {uploading ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4 text-[var(--accent)] font-black uppercase tracking-[0.5em] italic scale-90"
                    >
                        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_var(--accent-glow)] mb-4" />
                        Processing_Inbound_Payload...
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <Zap size={40} className={`transition-all duration-500 ${dragActive ? 'text-[var(--accent)] scale-125 mb-4' : 'text-[var(--text-secondary)] opacity-10 group-hover:opacity-30'}`} />
                        <p className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${dragActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-30 group-hover:opacity-50'}`}>
                            {dragActive ? 'Release_To_Sync' : 'Drop_Assets_Into_Interface'}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredFiles.map((file, idx) => (
                        <motion.div
                            key={file.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.02 }}
                        >
                            <div className="group relative aspect-square rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl hover:border-[var(--accent)]/50 transition-all duration-500">
                                <img src={file.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={file.name} />
                                
                                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6 p-4 backdrop-blur-sm">
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => copyToClipboard(file.url)}
                                            className={`p-4 rounded-2xl border transition-all duration-300 ${copiedUrl === file.url ? 'bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] opacity-40 border-[var(--border)] hover:opacity-100 hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]'}`}
                                            title="Copy Path"
                                        >
                                            {copiedUrl === file.url ? <Check size={20} /> : <Copy size={20} />}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(file.name)}
                                            className="p-4 bg-[var(--bg-secondary)] text-[var(--text-secondary)] opacity-40 border border-[var(--border)] rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 hover:opacity-100 transition-all duration-300"
                                            title="Erase Asset"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <div className="text-center w-full px-2">
                                        <p className="text-[10px] font-black text-[var(--text-primary)] opacity-50 truncate mb-1 uppercase tracking-widest">{file.name}</p>
                                        <p className="text-[8px] font-black text-[var(--accent)] uppercase italic tracking-tighter opacity-40">Segment_Stored</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {filteredFiles.length === 0 && !loading && (
                <div className="py-40 text-center space-y-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[50px] shadow-inner backdrop-blur-xl">
                    <div className="w-32 h-32 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <ImageIcon size={64} className="text-[var(--text-secondary)] opacity-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2">Nexus_Library_Empty</h3>
                        <p className="text-[10px] font-black tracking-[0.4em] text-[var(--text-secondary)] opacity-20 uppercase">No visual segments recognized in current sector.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaManager;
