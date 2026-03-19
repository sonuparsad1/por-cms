import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import { Github } from 'lucide-react';

const projects = [
    {
        title: "Smart Urinal Blockage Detection",
        category: "IoT",
        description: "An IoT-based system to detect blockages in urinals and send real-time alerts to maintenance staff, preventing overflows.",
        tech: ["C++", "Arduino", "IoT Sensors", "ESP8266"],
        github: "https://github.com/sonuparsad1",
        status: "Completed"
    },
    {
        title: "AI-Powered Sentiment Analyzer",
        category: "AI/ML",
        description: "A machine learning pipeline that analyzes text data from social media to accurately determine the underlying sentiment with 92% accuracy.",
        tech: ["Python", "NLTK", "Scikit-learn", "Flask"],
        github: "https://github.com/sonuparsad1",
        status: "Completed"
    },
    {
        title: "Student Performance Predictor",
        category: "AI/ML",
        description: "Predictive model anticipating student outcomes based on historical academic data and engagement metrics.",
        tech: ["Python", "Pandas", "TensorFlow", "React"],
        github: "https://github.com/sonuparsad1",
        status: "Ongoing"
    },
    {
        title: "Premium Portfolio Website",
        category: "Web Development",
        description: "A high-performance, full-stack portfolio built with modern tools to showcase technical skills and projects.",
        tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
        github: "https://github.com/sonuparsad1",
        status: "Completed"
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [dbProjects, setDbProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const categories = ['All', 'AI/ML', 'IoT', 'Web Development'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setDbProjects(data.data);
                } else {
                    setDbProjects(projects); // Fallback to hardcoded if DB is empty
                }
            } catch (err) {
                console.error("API Error", err);
                setDbProjects(projects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All' 
        ? dbProjects 
        : dbProjects.filter(p => p.category === filter);

    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Featured Projects</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">A showcase of my recent work bridging software, AI, and hardware.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${
                            filter === cat 
                            ? 'bg-coffee-900 text-coffee-100 dark:bg-coffee-100 dark:text-coffee-900 shadow-md' 
                            : 'glass text-coffee-700 dark:text-coffee-300 hover:bg-white/30 dark:hover:bg-black/30'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {filteredProjects.map((project, idx) => (
                    <GlassCard key={idx} className="flex flex-col h-full relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-coffee-500 bg-coffee-100 dark:bg-coffee-900/50 px-3 py-1 rounded-full">
                                {project.category}
                            </span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-coffee-900 dark:text-coffee-100 group-hover:text-coffee-500 transition-colors">
                            {project.title}
                        </h3>
                        
                        <p className="text-coffee-700 dark:text-coffee-300 mb-6 flex-grow">
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t, tIdx) => (
                                <span key={tIdx} className="text-sm px-3 py-1 bg-coffee-200 dark:bg-black/30 text-coffee-800 dark:text-coffee-200 rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-coffee-200 dark:border-white/10">
                            <div className="flex gap-4">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-coffee-500 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors flex items-center gap-1">
                                    <Github size={18} /> <span className="text-sm font-medium">Source</span>
                                </a>
                            </div>
                            <Link to={`/projects/${project._id || idx}`}>
                                <PremiumButton variant="glass" className="!py-2 !px-4 text-sm hover:!bg-coffee-900 hover:!text-coffee-100 dark:hover:!bg-coffee-100 dark:hover:!text-coffee-900 transition-colors">
                                    View Details
                                </PremiumButton>
                            </Link>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Projects;
