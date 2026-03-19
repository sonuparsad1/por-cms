import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Moon, Sun, Coffee, Menu, X, Home, User, Code2, FolderGit2, Mail, BookOpen, Award, Trophy, HelpCircle, FileText, Briefcase, GraduationCap, Bot, FlaskConical, Image, Star, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const allPages = [
    { section: 'Main', links: [
        { to: '/', label: 'Home', icon: Home },
        { to: '/about', label: 'About', icon: User },
        { to: '/skills', label: 'Skills', icon: Code2 },
        { to: '/projects', label: 'Projects', icon: FolderGit2 },
        { to: '/blog', label: 'Blog', icon: BookOpen },
        { to: '/contact', label: 'Contact', icon: Mail },
    ]},
    { section: 'Portfolio', links: [
        { to: '/certifications', label: 'Certifications', icon: Award },
        { to: '/achievements', label: 'Achievements', icon: Trophy },
        { to: '/experience', label: 'Experience', icon: Briefcase },
        { to: '/services', label: 'Services', icon: Layers },
        { to: '/resume', label: 'Resume', icon: FileText },
        { to: '/gallery', label: 'Gallery', icon: Image },
        { to: '/testimonials', label: 'Testimonials', icon: Star },
    ]},
    { section: 'Explore', links: [
        { to: '/learning', label: 'Learning', icon: GraduationCap },
        { to: '/ai-showcase', label: 'AI Showcase', icon: Bot },
        { to: '/experiments', label: 'Experiments', icon: FlaskConical },
        { to: '/faqs', label: 'FAQs', icon: HelpCircle },
    ]},
];

const topNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const ThemeIcon = () => {
        if (theme === 'light') return <Sun size={18} className="text-amber-500" />;
        if (theme === 'dark') return <Moon size={18} className="text-blue-400" />;
        return <Coffee size={18} className="text-orange-900" />;
    };

    const getThemeName = () => {
        if (theme === 'light') return 'Soft White';
        if (theme === 'dark') return 'Dev Dark';
        return 'Chocolate';
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="fixed w-full top-0 z-50 glass border-b shadow-sm transition-colors duration-300">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>
                        <Link to="/" className="text-2xl font-black tracking-tighter text-[var(--text-primary)] hover:opacity-80 transition-opacity">
                            Sonu<span className="text-[var(--accent)]">.</span>
                        </Link>
                    </div>
                    
                    {/* Center: Desktop Nav (top 5 links) */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                        {topNavLinks.map(link => (
                            <Link 
                                key={link.to} 
                                to={link.to} 
                                className={`hover:text-[var(--accent)] transition-colors ${location.pathname === link.to ? 'text-[var(--accent)]' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Theme Toggle */}
                    <button 
                        onClick={() => toggleTheme()} 
                        className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)] transition-all group"
                        title={getThemeName()}
                    >
                        <ThemeIcon />
                        <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{getThemeName()}</span>
                    </button>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar Panel */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 h-full w-[280px] z-[70] bg-[var(--bg-primary)] border-r border-[var(--border)] shadow-2xl flex flex-col"
                        >
                            {/* Sidebar Header */}
                            <div className="p-5 flex items-center justify-between border-b border-[var(--border)]">
                                <Link to="/" onClick={() => setSidebarOpen(false)} className="text-xl font-black tracking-tighter text-[var(--text-primary)]">
                                    Sonu<span className="text-[var(--accent)]">.</span>
                                </Link>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Sidebar Links */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                                {allPages.map(section => (
                                    <div key={section.section}>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-3 px-3">
                                            {section.section}
                                        </h4>
                                        <div className="space-y-1">
                                            {section.links.map(link => {
                                                const Icon = link.icon;
                                                const isActive = location.pathname === link.to;
                                                return (
                                                    <Link
                                                        key={link.to}
                                                        to={link.to}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                                            isActive 
                                                                ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]' 
                                                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                                                        }`}
                                                    >
                                                        <Icon size={18} className={isActive ? 'text-white' : 'opacity-60'} />
                                                        {link.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-4 border-t border-[var(--border)]">
                                <button 
                                    onClick={() => { toggleTheme(); }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all"
                                >
                                    <ThemeIcon />
                                    Switch to {theme === 'light' ? 'Dark' : theme === 'dark' ? 'Chocolate' : 'Light'}
                                </button>
                                <p className="text-[10px] text-[var(--text-secondary)] opacity-40 text-center mt-3 font-medium">
                                    © 2026 Sonu Prasad
                                </p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
