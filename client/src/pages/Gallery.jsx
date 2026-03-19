import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Filter, Maximize2, X, ChevronLeft, ChevronRight, Projector, BookOpen, UploadCloud } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import FluidBackground from '../components/ui/FluidBackground';

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                // Fetch from Gallery collection, Projects, and Blogs with individual error handling
                const [galleryRes, projectsRes, blogsRes] = await Promise.allSettled([
                    fetch('/api/gallery').then(res => res.json()),
                    fetch('/api/projects').then(res => res.json()),
                    fetch('/api/blogs').then(res => res.json())
                ]);

                const galleryData = galleryRes.status === 'fulfilled' ? galleryRes.value : { data: [] };
                const projectsData = projectsRes.status === 'fulfilled' ? projectsRes.value : { data: [] };
                const blogsData = blogsRes.status === 'fulfilled' ? blogsRes.value : { data: [] };

                // Transform Project images (Both individual gallery items and covers)
                const projectGallery = (projectsData.data || []).flatMap(p => 
                    (p.galleryImages || []).map((img, idx) => ({
                        _id: `proj-gal-${p._id}-${idx}`,
                        title: p.title,
                        imageUrl: img,
                        category: 'project',
                        description: p.shortDescription || '',
                        createdAt: p.createdAt
                    }))
                );

                const projectCovers = (projectsData.data || []).filter(p => p.coverImage).map(p => ({
                    _id: `proj-cov-${p._id}`,
                    title: p.title,
                    imageUrl: p.coverImage,
                    category: 'project',
                    description: p.shortDescription || '',
                    createdAt: p.createdAt
                }));

                // Transform Blog images
                const blogGallery = (blogsData.data || []).filter(b => b.coverImage).map(b => ({
                    _id: `blog-cov-${b._id}`,
                    title: b.title,
                    imageUrl: b.coverImage,
                    category: 'blog',
                    description: b.summary || '',
                    createdAt: b.createdAt
                }));

                // Combine and Deduplicate
                const allItems = [
                    ...(galleryData.data || []),
                    ...projectGallery,
                    ...projectCovers,
                    ...blogGallery
                ].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

                setItems(allItems);
            } catch (err) {
                console.error('Unified Gallery Load Breach:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGalleryData();
    }, []);

    const filteredItems = filter === 'all' 
        ? items 
        : items.filter(item => item.category === filter);

    const openLightbox = (item, index) => {
        setSelectedImage(item);
        setCurrentIndex(index);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % filteredItems.length;
        setCurrentIndex(newIndex);
        setSelectedImage(filteredItems[newIndex]);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setCurrentIndex(newIndex);
        setSelectedImage(filteredItems[newIndex]);
    };

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setSelectedImage(null); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden bg-transparent">
            <FluidBackground />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero */}
                <header className="mb-20 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-6 opacity-60"
                    >
                        <div className="h-px w-8 bg-[var(--accent)]" />
                        <span className="font-mono text-[10px] uppercase font-black tracking-[0.3em] text-[var(--accent)]">System Media Array</span>
                        <div className="h-px w-8 bg-[var(--accent)]" />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-9xl font-black mb-6 text-[var(--text-primary)] tracking-tighter"
                    >
                        Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-amber-500 drop-shadow-[0_0_20px_var(--accent-glow)]">Logs</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto italic font-medium opacity-80"
                    >
                        Archived visual data: projects, blogs, and builds.
                    </motion.p>

                    {/* Filters */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4 mt-12"
                    >
                        {['all', 'project', 'blog'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === f ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]' : 'bg-white/5 text-[var(--text-secondary)] border-white/10 hover:border-[var(--accent)]/50'}`}
                            >
                                {f}s
                            </button>
                        ))}
                    </motion.div>
                </header>

                {/* Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                layout
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="break-inside-avoid"
                                onClick={() => openLightbox(item, idx)}
                            >
                                <div className="group relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 cursor-pointer shadow-2xl hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            {item.category === 'project' && <Projector size={14} className="text-[var(--accent)]" />}
                                            {item.category === 'blog' && <BookOpen size={14} className="text-[var(--accent)]" />}
                                            {item.category === 'upload' && <UploadCloud size={14} className="text-[var(--accent)]" />}
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">{item.category}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-white tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                                        <p className="text-xs text-white/60 mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">{item.description}</p>
                                    </div>
                                    
                                    {/* Floating Source Icon (Desktop) */}
                                    <div className="absolute top-6 right-6 p-3 glass border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <Maximize2 size={16} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-40 opacity-20">
                        <ImageIcon size={64} className="mx-auto mb-6" />
                        <span className="font-mono text-xs uppercase tracking-[0.5em]">No synchronization detected for this sector</span>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-10 right-10 z-[1001] w-14 h-14 glass border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12 pointer-events-none">
                            <button onClick={prevImage} className="w-14 h-14 glass border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-colors pointer-events-auto">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} className="w-14 h-14 glass border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-colors pointer-events-auto">
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Image Content */}
                        <motion.div 
                            key={selectedImage._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl w-full flex flex-col items-center"
                        >
                            <img 
                                src={selectedImage.imageUrl} 
                                alt={selectedImage.title} 
                                className="max-h-[70vh] w-auto object-contain rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 mb-10"
                            />
                            <div className="text-center max-w-2xl px-6">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-1.5 rounded-full border border-[var(--accent)]/20">{selectedImage.category} asset</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">{selectedImage.title}</h2>
                                <p className="text-lg text-white/50 leading-relaxed font-medium">{selectedImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
