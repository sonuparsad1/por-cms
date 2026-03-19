import React from 'react';
import { motion } from 'framer-motion';

const PremiumButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "relative px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group";
    
    const variants = {
        primary: "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 hover:-translate-y-1",
        secondary: "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105 active:scale-95 shadow-xl shadow-black/10",
        outline: "bg-transparent border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        glass: "glass-hover text-[var(--text-primary)]"
    };

    return (
        <motion.button 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 slant" />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default PremiumButton;
