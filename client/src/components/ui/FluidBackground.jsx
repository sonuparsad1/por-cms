import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FluidBackground = () => {
    const { scrollYProgress } = useScroll();

    // Parallax scrolling mapped to scroll depth
    const blob1Y = useTransform(scrollYProgress, [0, 1], ["[-20%]", "[-60%]"]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], ["[-10%]", "[30%]"]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none perspective-[1000px]">
            <div className="absolute inset-0 bg-[var(--bg-primary)] transition-colors duration-700" />
            
            {/* Parallax Blobs anchored in 3D Space */}
            <motion.div 
                style={{ top: blob1Y, scale: 1.1 }}
                className="absolute left-[-20%] w-[60%] h-[60%] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px] will-change-transform"
            />
            
            <motion.div 
                style={{ bottom: blob2Y }}
                animate={{ 
                    x: [0, 100, 0],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[100px] will-change-transform"
            />

            {/* Deep Matrix Overlay */}
            <div 
                className="absolute inset-[-50%] opacity-[0.03] dark:opacity-[0.05]" 
                style={{ 
                    backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 0)', 
                    backgroundSize: '80px 80px',
                    transform: 'translateZ(-500px) scale(2)'
                }} 
            />
        </div>
    );
};

export default FluidBackground;
