import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Determine if ID is likely a MongoDB ObjectId (24 hex chars)
                // or just an index if we are falling back to hardcoded data
                const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
                
                if (isMongoId) {
                    const response = await fetch(`/api/projects/${id}`);
                    if (!response.ok) throw new Error('Project not found');
                    const data = await response.json();
                    setProject(data.data || data); // Handle standard responses
                } else {
                    // Fallback to mock data for demonstration purposes if DB is empty
                    // This allows the detail page to be tested even without real DB data
                    const mockData = {
                        title: "Smart Urinal Blockage Detection",
                        category: "IoT",
                        description: "An full detailed IoT-based system to detect blockages in urinals and send real-time alerts to maintenance staff, preventing overflows. This project utilizes ultrasonic sensors placed near the drain hole, connected to NodeMCU ESP8266 modules which send status updates to a central server.",
                        tech: ["C++", "Arduino", "IoT Sensors", "ESP8266", "Firebase"],
                        github: "https://github.com/sonuparsad1",
                        demo: "https://example.com/demo",
                        status: "Completed",
                        createdAt: "2023-11-15T00:00:00.000Z"
                    };
                    setProject(mockData);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Project Not Found</h2>
                <Link to="/projects">
                    <PremiumButton variant="primary">Return to Projects</PremiumButton>
                </Link>
            </div>
        );
    }

    return (
        <article className="py-12 max-w-4xl mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-2 text-coffee-600 hover:text-coffee-900 dark:text-coffee-400 dark:hover:text-coffee-100 mb-8 transition-colors font-medium">
                <ArrowLeft size={20} /> Back to Projects
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex gap-4 items-center mb-6">
                    <span className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase bg-coffee-100 text-coffee-800 dark:bg-black/30 dark:text-coffee-200 border border-coffee-200 dark:border-white/10">
                        {project.category}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                        {project.status}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-coffee-900 dark:text-coffee-100 tracking-tight leading-tight">
                    {project.title}
                </h1>

                {project.createdAt && (
                    <div className="flex items-center gap-2 text-coffee-500 mb-8">
                        <Calendar size={18} />
                        <span>{new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                )}

                <div className="flex flex-wrap gap-4 mb-12">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <PremiumButton variant="glass" className="flex items-center gap-2">
                                <Github size={18} /> Source Code
                            </PremiumButton>
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <PremiumButton variant="primary" className="flex items-center gap-2">
                                <ExternalLink size={18} /> Live Demo
                            </PremiumButton>
                        </a>
                    )}
                </div>

                <div className="prose prose-lg dark:prose-invert prose-coffee max-w-none mb-12">
                    <h3 className="text-2xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Overview</h3>
                    <p className="text-coffee-800 dark:text-coffee-300 leading-relaxed text-lg mb-8">
                        {project.description}
                    </p>
                </div>

                <div className="p-8 glass rounded-2xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-coffee-900 dark:text-coffee-100">
                        <Tag size={20} />
                        Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tech && project.tech.map((t, idx) => (
                            <span key={idx} className="px-4 py-2 bg-white/50 dark:bg-black/50 text-coffee-900 dark:text-coffee-100 rounded-lg text-sm font-semibold border border-coffee-200 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </article>
    );
};

export default ProjectDetail;
