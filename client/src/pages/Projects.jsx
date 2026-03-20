import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, GalleryHorizontal, LayoutPanelTop, Search, Filter } from 'lucide-react';
import ProjectGrid from '../components/templates/projects/ProjectGrid';
import ProjectCarousel from '../components/templates/projects/ProjectCarousel';
import ProjectMasonry from '../components/templates/projects/ProjectMasonry';
import Skeleton from '../components/ui/Skeleton';
import SEOTags from '../components/ui/SEOTags';

const Projects = () => {
    const [template, setTemplate] = useState('Grid');
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'AI/ML', 'IoT', 'Web Development'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch with new SaaS API capabilities (limit 100)
                const res = await fetch('/api/projects?limit=100');
                const data = await res.json();
                setProjects(data.data || []);
            } catch (err) {
                console.error("API Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        const title = p.title || '';
        const desc = p.shortDescription || '';
        const matchesCat = filter === 'All' || p.category === filter;
        const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || 
                             desc.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const renderTemplate = () => {
        if (loading) return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <Skeleton key={i} height="350px" />)}
            </div>
        );
        if (filteredProjects.length === 0) return (
            <div className="text-center py-20 glass rounded-3xl border border-dashed border-[var(--border)]">
                <p className="text-[var(--text-secondary)] font-medium">No projects found matching your criteria.</p>
            </div>
        );

        switch (template) {
            case 'Carousel': return <ProjectCarousel projects={filteredProjects} />;
            case 'Masonry': return <ProjectMasonry projects={filteredProjects} />;
            default: return <ProjectGrid projects={filteredProjects} />;
        }
    };

    return (
        <div className="w-full min-h-screen bg-[var(--bg-primary)] py-20 px-6">
            <SEOTags />
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] mb-6"
                    >
                        Project <span className="text-[var(--accent)]">Archive</span>
                    </motion.h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
                        A curated collection of research, engineering, and digital systems.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 glass p-6 rounded-[32px] border border-[var(--border)] shadow-xl">
                    {/* Search & Filter */}
                    <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                            <input 
                                type="text" 
                                placeholder="Find projects..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 pr-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl w-full focus:ring-2 focus:ring-[var(--accent)] outline-none text-[var(--text-primary)] transition-all font-medium"
                            />
                        </div>
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        filter === cat 
                                        ? 'bg-[var(--accent)] text-white shadow-lg' 
                                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Template Switcher */}
                    <div className="flex bg-[var(--bg-secondary)] p-1.5 rounded-2xl border border-[var(--border)]">
                        {[
                            { id: 'Grid', icon: LayoutGrid },
                            { id: 'Carousel', icon: GalleryHorizontal },
                            { id: 'Masonry', icon: LayoutPanelTop }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setTemplate(item.id)}
                                className={`p-3 rounded-xl transition-all ${
                                    template === item.id 
                                    ? 'bg-white text-black shadow-sm dark:bg-[var(--accent)] dark:text-white' 
                                    : 'text-[var(--text-secondary)] hover:opacity-70'
                                }`}
                                title={`${item.id} Layout`}
                            >
                                <item.icon size={20} />
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: "anticipate" }}
                >
                    {renderTemplate()}
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
