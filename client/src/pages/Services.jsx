import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import { Brain, Code2, Cpu, BarChart3, Rocket, Presentation } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import { Link } from 'react-router-dom';
import FluidBackground from '../components/ui/FluidBackground';

const servicesList = [
    {
        icon: Brain,
        title: "AI/ML Model Development",
        description: "Custom machine learning models built in Python to solve business logic problems, featuring NLP capabilities, predictive analytics, and end-to-end ML pipelines."
    },
    {
        icon: Code2,
        title: "Full-Stack Web Development",
        description: "Responsive, premium, and scalable web applications crafted with React.js, Tailwind CSS, Express, and MongoDB. Focusing on elegant UI/UX and robust architecture."
    },
    {
        icon: Cpu,
        title: "IoT Prototype Development",
        description: "Hardware-to-software integration utilizing Arduino, NodeMCU ESP8266, and C++ to build smart, sensor-driven systems with real-time cloud data logging."
    },
    {
        icon: BarChart3,
        title: "Data Analysis & Visualization",
        description: "Transforming raw datasets into actionable insights using Pandas and Matplotlib. Clean, process, and visually interpret complex information."
    },
    {
        icon: Rocket,
        title: "Portfolio & Branding Systems",
        description: "Assisting fellow developers or startups in building elite personal branding applications with modern aesthetics and recruiter-friendly architectures."
    },
    {
        icon: Presentation,
        title: "Project Consultation",
        description: "Strategic guidance on architecture selection, database design, and technology stack optimization for students and early-stage projects."
    }
];

const Services = () => {
    return (
        <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            {/* Background Subtle Gradient for Depth */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--accent-rgb),0.05)_0%,transparent_50%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* HERO SECTION - CINEMATIC REVEAL */}
                <header className="text-center mb-32 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                        animate={{ opacity: 0.1, scale: 1, filter: "blur(40px)" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0 bg-[var(--accent)] pointer-events-none -z-10 scale-110 rounded-full" 
                    />

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 mb-10 shadow-xl"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">Professional_Systems_Consulting</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 text-[var(--text-primary)] tracking-tighter leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                        <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-block mr-4"
                        >
                            Expert
                        </motion.span>
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)] inline-block"
                        >
                            Solutions
                        </motion.span>
                    </h1>

                    <motion.p 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold italic mt-8 border-l-4 border-[var(--accent)] pl-8 text-left md:text-center md:border-l-0 md:pl-0 uppercase tracking-widest leading-relaxed drop-shadow-md"
                    >
                        Transforming complex problems into 
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-[var(--text-primary)] relative ml-3 whitespace-nowrap"
                        >
                            Intelligent Reality
                            <motion.span 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 1.5, ease: "circOut" }}
                                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[var(--accent)] origin-left rounded-full"
                            />
                        </motion.span>
                    </motion.p>
                </header>

                {/* SERVICE GRID - HIGH CONTRAST */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {servicesList.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>

                {/* CALL TO ACTION - SOLID & PREMIUM */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-40"
                >
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-12 md:p-24 text-center shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-[0.03] blur-[100px] pointer-events-none" />
                        
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Ready to <span className="text-[var(--accent)]">Initialize?</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-medium mb-16 uppercase tracking-[0.1em] leading-relaxed">
                            Whether you need a custom ML model or a high-end web architecture—bridge the gap between hypothesis and reality.
                        </p>
                        
                        <div className="flex justify-center">
                            <Link to="/contact">
                                <PremiumButton variant="primary" className="!px-16 !py-6 !rounded-2xl shadow-[0_20px_50px_var(--accent-glow)] group hover:scale-105 active:scale-95 transition-all">
                                    <span className="flex items-center gap-4 text-xl font-black uppercase tracking-widest">
                                        Start Your Project
                                        <Rocket size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                    </span>
                                </PremiumButton>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <footer className="pt-40 pb-20 text-center opacity-20 border-t border-white/5 mt-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.8em] text-white">System Interface // Status: High Performance // Sector: Services</p>
            </footer>
        </div>
    );
};

const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="h-full"
        >
            <motion.div
                whileHover={{ y: -15, scale: 1.02 }}
                className="h-full bg-[#111111] border border-white/10 rounded-[32px] p-10 flex flex-col items-start transition-all duration-500 hover:border-[var(--accent)]/50 hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)] group cursor-default"
            >
                {/* ICON CONTAINER - BOLD & VISIBLE */}
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] mb-10 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden">
                    <Icon size={32} className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                </div>

                {/* CONTENT HIERARCHY */}
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {service.title}
                </h3>
                
                <p className="text-lg text-white/60 leading-relaxed font-medium flex-grow">
                    {service.description}
                </p>

                {/* BOTTOM ACCENT */}
                <div className="mt-10 w-full flex items-center gap-4">
                    <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent-glow)] group-hover:w-20 transition-all duration-700" />
                    <div className="h-px flex-grow bg-white/5" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Services;
