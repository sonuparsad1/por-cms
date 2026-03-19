import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
                if (isMongoId) {
                    const response = await fetch(`/api/blogs/${id}`);
                    if (!response.ok) throw new Error('Blog not found');
                    const data = await response.json();
                    setBlog(data.data || data);
                } else {
                    const mockData = {
                        title: "Understanding Micro-Animations in React",
                        category: "Web Development",
                        content: `Micro-animations are small, functional animations that support the user by providing visual feedback and displaying changes more clearly. When building modern React interfaces, these subtle movements transform a generic app into a premium experience.
                        
                        Framer Motion provides a declarative API that makes it incredibly easy to orchestrate these animations. From hover states to complex page transitions, it breathes life into static UI components.
                        
                        In this post, we explore the core principles of UI animation and how to implement a consistent motion language using context providers.`,
                        tags: ["React", "Framer Motion", "UI Design"],
                        readTime: "5 min",
                        createdAt: "2024-10-12T00:00:00.000Z"
                    };
                    setBlog(mockData);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Post Not Found</h2>
                <Link to="/blog" className="px-6 py-3 rounded-md bg-coffee-900 text-coffee-100 dark:bg-coffee-100 dark:text-coffee-900 font-medium">
                    Return to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="py-12 max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-coffee-600 hover:text-coffee-900 dark:text-coffee-400 dark:hover:text-coffee-100 mb-8 transition-colors font-medium">
                <ArrowLeft size={20} /> Back to Writings
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-coffee-100 text-coffee-800 dark:bg-black/30 dark:text-coffee-200 border border-coffee-200 dark:border-white/10">
                        {blog.category}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-coffee-900 dark:text-coffee-100 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-coffee-500 mb-10 pb-10 border-b border-coffee-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{blog.readTime || '5 min'} read</span>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert prose-coffee max-w-none mb-12" style={{ whiteSpace: 'pre-line' }}>
                    <p className="text-coffee-800 dark:text-coffee-300 leading-relaxed text-lg mb-8">
                        {blog.content}
                    </p>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                    <div className="pt-8 border-t border-coffee-200 dark:border-white/10">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-coffee-500 mb-4 flex items-center gap-2">
                            <Tag size={16} /> Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-coffee-100 dark:bg-white/5 text-coffee-700 dark:text-coffee-300 rounded text-sm transition-colors hover:bg-coffee-200 dark:hover:bg-white/10 cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </article>
    );
};

export default BlogDetail;
