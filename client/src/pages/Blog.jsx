import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        title: "Understanding Micro-Animations in React",
        category: "Web Development",
        date: "Oct 12, 2024",
        readTime: "5 min",
        summary: "A deep dive into how subtle Framer Motion animations can drastically improve user experience and perceived performance."
    },
    {
        title: "The Reality of Deploying IoT Systems",
        category: "IoT",
        date: "Sep 28, 2024",
        readTime: "8 min",
        summary: "Lessons learned from deploying a Smart Urinal Blockage Detection system in a real-world scenario."
    },
    {
        title: "Bridging the Gap: Frontend and Data Science",
        category: "AI/ML",
        date: "Sep 15, 2024",
        readTime: "6 min",
        summary: "Why Full-Stack engineers with ML knowledge are becoming essential to modern product teams."
    }
];

const Blog = () => {
    const [dbBlogs, setDbBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setDbBlogs(data.data);
                } else {
                    setDbBlogs(blogPosts);
                }
            } catch (err) {
                console.error("API Error", err);
                setDbBlogs(blogPosts);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Writings & Insights</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Thoughts on AI, Web Development, and continuous learning.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {dbBlogs.map((post, idx) => (
                    <Link to={`/blog/${post._id || idx}`} key={idx} className="block h-full">
                        <GlassCard className="flex flex-col h-full group cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-coffee-500 bg-coffee-100 dark:bg-coffee-900/50 px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-3 text-coffee-900 dark:text-coffee-100 group-hover:text-coffee-500 transition-colors">
                                {post.title}
                            </h2>
                            <div className="flex gap-4 text-sm text-coffee-500 mb-4">
                                <div className="flex items-center gap-1"><Calendar size={14} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : (post.date || 'Recent')}</div>
                                <div className="flex items-center gap-1"><Clock size={14} /> {post.readTime || '5 min'}</div>
                            </div>
                            <p className="text-coffee-700 dark:text-coffee-300 mb-6 flex-grow">
                                {post.summary || (post.content ? post.content.substring(0, 100) + '...' : '')}
                            </p>
                            <div className="mt-auto flex items-center text-coffee-600 dark:text-coffee-400 font-medium group-hover:text-coffee-900 dark:group-hover:text-coffee-100 transition-colors">
                                Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
