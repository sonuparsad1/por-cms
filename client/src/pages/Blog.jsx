import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutList, BookOpen, Layers, Search } from 'lucide-react';
import BlogMinimal from '../components/templates/blogs/BlogMinimal';
import BlogMagazine from '../components/templates/blogs/BlogMagazine';
import BlogSplit from '../components/templates/blogs/BlogSplit';
import Skeleton from '../components/ui/Skeleton';

const Blog = () => {
    const [template, setTemplate] = useState('Magazine');
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'AI/ML', 'IoT', 'Web Development'];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs?limit=100');
                const data = await res.json();
                setBlogs(data.data || []);
            } catch (err) {
                console.error("API Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(b => {
        const matchesCat = filter === 'All' || b.category === filter;
        const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                             b.summary.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const renderTemplate = () => {
        if (loading) return (
            <div className="space-y-12 max-w-4xl mx-auto">
                {[...Array(3)].map((_, i) => <Skeleton key={i} height="400px" />)}
            </div>
        );
        if (filteredBlogs.length === 0) return (
            <div className="text-center py-20 glass rounded-[40px] border border-dashed border-[var(--border)]">
                <p className="text-[var(--text-secondary)] font-medium">No articles found matching your criteria.</p>
            </div>
        );

        switch (template) {
            case 'Minimal': return <BlogMinimal blogs={filteredBlogs} />;
            case 'Split': return <BlogSplit blogs={filteredBlogs} />;
            default: return <BlogMagazine blogs={filteredBlogs} />;
        }
    };

    return (
        <div className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
            <header className="mb-20 text-center">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--text-primary)] mb-6"
                >
                    Writings <span className="text-[var(--accent)]">&</span> Insights
                </motion.h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
                    Decoding technology, systems, and the future of engineering.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 glass p-6 rounded-[32px] border border-[var(--border)] shadow-xl">
                <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl w-full focus:ring-2 focus:ring-[var(--accent)] outline-none text-[var(--text-primary)] transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="flex bg-[var(--bg-secondary)] p-1.5 rounded-2xl border border-[var(--border)]">
                    {[
                        { id: 'Minimal', icon: LayoutList },
                        { id: 'Magazine', icon: BookOpen },
                        { id: 'Split', icon: Layers }
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
                transition={{ duration: 0.6, ease: "circOut" }}
            >
                {renderTemplate()}
            </motion.div>
        </div>
    );
};

export default Blog;
