import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FluidBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        >
            <div className="absolute inset-0 bg-[var(--bg-primary)] transition-colors duration-700" />
            
            {/* Animated Blobs */}
            <motion.div 
                style={{ x: springX, y: springY }}
                className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px]"
            />
            
            <motion.div 
                animate={{ 
                    x: [0, 100, 0],
                    y: [0, 150, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[100px]"
            />

            {/* Matrix/Particle Mesh Overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
    );
};

export default FluidBackground;
