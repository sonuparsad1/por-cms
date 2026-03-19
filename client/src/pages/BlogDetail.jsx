import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOTags from '../components/ui/SEOTags';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
                if (isMongoId) {
                    const [bRes, rRes] = await Promise.all([
                        fetch(`/api/blogs/${id}`),
                        fetch(`/api/blogs/related/${id}`)
                    ]);
                    
                    if (!bRes.ok) throw new Error('Blog not found');
                    const bData = await bRes.json();
                    const rData = await rRes.json();
                    
                    setBlog(bData.data || bData);
                    setRelated(rData.data || []);
                } else {
                    setBlog({
                        title: "Understanding Micro-Animations",
                        category: "Web Development",
                        content: "Subtle movements transform...",
                        readTime: "5 min",
                        createdAt: new Date().toISOString()
                    });
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

    if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin h-10 w-10 border-b-2 border-coffee-900 rounded-full"></div></div>;
    if (error || !blog) return <div className="py-20 text-center"><h2 className="text-2xl font-bold">Post Not Found</h2></div>;

    return (
        <article className="py-12 max-w-4xl mx-auto px-6">
            <SEOTags 
                pageTitle={blog.title} 
                pageDescription={blog.summary || blog.content.substring(0, 160)}
                pageImage={blog.coverImage}
            />

            <Link to="/blog" className="inline-flex items-center gap-2 text-coffee-600 dark:text-coffee-400 mb-8 font-bold hover:translate-x-[-4px] transition-transform">
                <ArrowLeft size={20} /> Back to Writings
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <header className="mb-12">
                    <div className="flex gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-coffee-100 dark:bg-white/5 rounded-full text-xs font-black uppercase text-coffee-800 dark:text-coffee-200">{blog.category}</span>
                        <span className="flex items-center gap-2 text-xs font-bold text-coffee-500 uppercase tracking-widest">
                            <Clock size={14} /> {blog.readTime || '5 min'} READ
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-coffee-900 dark:text-white leading-tight tracking-tighter mb-8">{blog.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-coffee-500 font-medium">
                        <Calendar size={18} />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <div className="prose dark:prose-invert prose-coffee max-w-none text-xl leading-relaxed text-coffee-800 dark:text-coffee-300 mb-20">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {blog.content}
                    </ReactMarkdown>
                </div>

                {/* Related Content */}
                {related.length > 0 && (
                    <section className="mt-20 pt-20 border-t border-coffee-200 dark:border-white/10">
                        <h2 className="text-2xl font-black text-coffee-900 dark:text-white mb-10 tracking-tighter">Keep Reading</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {related.map(item => (
                                <Link key={item._id} to={`/blog/${item._id}`} className="group p-8 glass rounded-[32px] border border-white/10 hover:border-coffee-500 transition-colors">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-coffee-500 mb-4 block">{item.category}</span>
                                    <h4 className="font-bold text-xl text-coffee-900 dark:text-white group-hover:text-coffee-500 transition-colors mb-4">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-coffee-500 font-bold">
                                        <Clock size={14} /> {item.readTime || '5 min'}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </motion.div>
        </article>
    );
};

export default BlogDetail;
