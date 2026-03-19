import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PremiumButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic effect tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Pull the button towards the cursor (magnetic effect)
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const baseStyle = "relative px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group";
    
    const variants = {
        primary: "bg-[var(--accent)] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),_0_15px_30px_rgba(var(--accent-rgb),0.4)]",
        secondary: "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),_0_10px_20px_rgba(0,0,0,0.2)]",
        outline: "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 text-[var(--text-primary)] hover:bg-white/20 dark:hover:bg-black/20"
    };

    return (
        <motion.button 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.94 }}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Inner Glare Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out slant" />
            
            {/* Text positioning floating slightly up */}
            <motion.span 
                animate={{ y: isHovered ? -1 : 0 }}
                className="relative z-10 flex items-center gap-2"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
            >
                {children}
            </motion.span>
        </motion.button>
    );
};

export default PremiumButton;
