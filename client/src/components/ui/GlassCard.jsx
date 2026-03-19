import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true, delay = 0, style = {}, ...props }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like bezier
            whileHover={hoverEffect ? { 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(var(--accent-rgb), 0.1)",
                borderColor: "rgba(255,255,255,0.2)"
            } : {}}
            className={`glass rounded-[32px] p-8 transition-colors duration-500 border border-white/5 dark:border-white/10 ${hoverEffect ? 'hover:bg-white/40 dark:hover:bg-black/40 cursor-pointer' : ''} ${className}`}
            style={{ ...style, transformStyle: 'preserve-3d' }}
            {...props}
        >
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
