import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Copy, ExternalLink, Upload, Search, File, Image as ImageIcon, HardDrive, Check, X } from 'lucide-react';
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
        if (!window.confirm('Are you sure you want to delete this file permanently?')) return;
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
        navigator.clipboard.writeText(window.location.origin + url);
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
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass p-8 rounded-[32px] border border-[var(--border)]">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[var(--accent)] text-white rounded-2xl shadow-lg shadow-[var(--accent)]/20">
                        <HardDrive size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-[var(--text-primary)]">Media Assets</h2>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">Manage and organize your portfolio images</p>
                    </div>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search names..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)] text-sm transition-all"
                        />
                    </div>
                    <label className="flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-2xl font-black text-sm cursor-pointer hover:scale-105 transition-transform">
                        <Upload size={18} />
                        <span>Upload</span>
                        <input type="file" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                    </label>
                </div>
            </header>

            {/* Drop Zone */}
            <div 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative h-32 border-2 border-dashed rounded-[32px] flex items-center justify-center transition-all ${
                    dragActive ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] bg-[var(--bg-secondary)]/30'
                }`}
            >
                {uploading ? (
                    <div className="flex items-center gap-3 text-[var(--accent)] font-bold">
                        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                        Processing Uploads...
                    </div>
                ) : (
                    <p className="text-[var(--text-secondary)] font-medium">
                        Drag & Drop files here or use the upload button above
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredFiles.map((file, idx) => (
                        <motion.div
                            key={file.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <GlassCard className="!p-0 group relative aspect-square overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                                <img src={file.url} className="w-full h-full object-cover" alt={file.name} />
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => copyToClipboard(file.url)}
                                            className="p-3 bg-white/10 hover:bg-[var(--accent)] text-white rounded-xl transition-all"
                                            title="Copy full URL"
                                        >
                                            {copiedUrl === file.url ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(file.name)}
                                            className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <span className="text-[10px] text-white/50 truncate w-3/4 text-center px-2">{file.name}</span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {filteredFiles.length === 0 && !loading && (
                <div className="py-20 text-center opacity-50 space-y-4">
                    <ImageIcon size={48} className="mx-auto" />
                    <p className="font-medium italic">No media assets found in gallery</p>
                </div>
            )}
        </div>
    );
};

export default MediaManager;
