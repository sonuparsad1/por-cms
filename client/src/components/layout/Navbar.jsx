import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Moon, Sun, Coffee, Menu } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const ThemeIcon = () => {
        if (theme === 'light') return <Sun size={20} className="text-amber-500" />;
        if (theme === 'dark') return <Moon size={20} className="text-blue-400" />;
        return <Coffee size={20} className="text-orange-900" />;
    };

    const getThemeName = () => {
        if (theme === 'light') return 'Soft White';
        if (theme === 'dark') return 'Developer Dark';
        return 'Branded Chocolate';
    };

    return (
        <nav className="fixed w-full top-0 z-50 glass border-b shadow-sm transition-colors duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tighter text-[var(--text-primary)] hover:opacity-80 transition-opacity">
                    Sonu<span className="text-[var(--accent)]">.</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-[var(--accent)] transition-colors">About</Link>
                    <Link to="/projects" className="hover:text-[var(--accent)] transition-colors">Projects</Link>
                    <Link to="/blog" className="hover:text-[var(--accent)] transition-colors">Blog</Link>
                    <Link to="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => toggleTheme()} 
                        className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)] transition-all group"
                        title={getThemeName()}
                    >
                        <ThemeIcon />
                        <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{getThemeName()}</span>
                    </button>
                    <button className="md:hidden p-2 text-[var(--text-primary)]">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
