import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumButton from '../../ui/PremiumButton';
import FluidBackground from '../../ui/FluidBackground';

const CenteredHero = ({ settings = {} }) => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const moveX = useTransform(springX, [0, 1], [-20, 20]);
    const moveY = useTransform(springY, [0, 1], [-20, 20]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = e.clientX / innerWidth;
            const y = e.clientY / innerHeight;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Scroll Parallax values
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section ref={heroRef} className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-transparent perspective-[1000px]">
            <FluidBackground />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y: yText, opacity: opacityText, x: moveX, rotateY: moveX, rotateX: moveY, transformStyle: "preserve-3d" }}
                className="relative z-10 space-y-10 max-w-5xl mx-auto"
            >
                {/* 1. Small Top Text */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <span className="text-[var(--accent)] text-xs font-black uppercase tracking-[0.5em] block drop-shadow-lg opacity-80">
                        Established 2025
                    </span>
                </motion.div>

                {/* 2. Main Heading */}
                <motion.div variants={itemVariants} style={{ transformStyle: "preserve-3d" }}>
                    <h1 
                        className="text-7xl md:text-[10rem] font-black tracking-tighter text-[var(--text-primary)] leading-[0.8] drop-shadow-2xl"
                        style={{ transform: "translateZ(100px)" }}
                    >
                        {settings?.siteName || "Sonu Prasad"}<span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)]">.</span>
                    </h1>
                </motion.div>

                {/* 3. Subtitle */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-xl md:text-3xl font-bold text-[var(--accent)] tracking-tight opacity-90">
                        AI/ML Developer | CSE Student
                    </h2>
                </motion.div>

                {/* 4. Supporting Line (Tagline) */}
                <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium leading-relaxed italic opacity-70">
                        Crafting intelligent architectures and premium digital experiences through the lens of Artificial Intelligence.
                    </p>
                </motion.div>

                {/* 5. Buttons */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 pt-8 relative z-50"
                >
                    <PremiumButton 
                        variant="primary" 
                        className="!px-12 !py-6 text-base font-black shadow-2xl hover:shadow-[0_0_30px_var(--accent-glow)] cursor-pointer pointer-events-auto"
                        onClick={() => navigate('/projects')}
                    >
                        Explore Works
                    </PremiumButton>
                    <PremiumButton 
                        variant="glass" 
                        className="!px-12 !py-6 text-base font-black border-white/20 shadow-xl cursor-pointer pointer-events-auto"
                        onClick={() => navigate('/blog')}
                    >
                        Read Blogs
                    </PremiumButton>
                </motion.div>
            </motion.div>

            {/* Floating ambient elements with mouse reactive movement */}
            <motion.div 
                style={{ x: useTransform(springX, [0, 1], [-50, 50]), y: useTransform(springY, [0, 1], [-50, 50]) }}
                className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[var(--accent)]/5 blur-[100px] pointer-events-none" 
            />
            <motion.div 
                style={{ x: useTransform(springX, [0, 1], [50, -50]), y: useTransform(springY, [0, 1], [50, -50]) }}
                className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-white/5 blur-[120px] pointer-events-none" 
            />
        </section>
    );
};

export default CenteredHero;
