import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Target, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const mockLearningData = [
    {
        topic: "Advanced System Design",
        category: "System Design",
        status: "In Progress",
        progressPercentage: 65,
        milestones: ["Client-Server Architecture", "Caching Strategies", "Load Balancing Basics"]
    },
    {
        topic: "Deep Learning (CNNs)",
        category: "AI",
        status: "Planned",
        progressPercentage: 15,
        milestones: ["Neural Network Foundations"]
    },
    {
        topic: "React & Framer Motion",
        category: "Web Dev",
        status: "Completed",
        progressPercentage: 100,
        milestones: ["Hooks Mastery", "Context API", "Complex Animation Orchestration", "Glassmorphism UI"]
    }
];

const LearningDashboard = () => {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLearning = async () => {
            try {
                const res = await fetch('/api/learning');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setProgress(data.data);
                } else {
                    setProgress(mockLearningData);
                }
            } catch (err) {
                console.error(err);
                setProgress(mockLearningData);
            } finally {
                setLoading(false);
            }
        };
        fetchLearning();
    }, []);

    const getStatusDetails = (status) => {
        switch(status) {
            case 'Completed': return { color: 'text-green-500', bg: 'bg-green-500', icon: CheckCircle };
            case 'In Progress': return { color: 'text-blue-500', bg: 'bg-blue-500', icon: TrendingUp };
            default: return { color: 'text-coffee-500', bg: 'bg-coffee-500', icon: Clock };
        }
    };

    return (
        <div className="py-12 max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <Target size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Learning Dashboard</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Continuous skill evolution and academic roadmaps.</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {progress.map((item, idx) => {
                        const { color, bg, icon: StatusIcon } = getStatusDetails(item.status);
                        
                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                            >
                                <GlassCard className="h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-coffee-500 bg-coffee-100 dark:bg-black/40 px-3 py-1 rounded-full mb-3 inline-block">
                                                {item.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100">
                                                {item.topic}
                                            </h3>
                                        </div>
                                        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl glass ${color}`}>
                                            <StatusIcon size={24} className="mb-1" />
                                            <span className="text-xs font-bold uppercase">{item.status}</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="w-full bg-coffee-200 dark:bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.progressPercentage}%` }}
                                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                            className={`${bg} h-3 rounded-full relative`}
                                        >
                                            {/* Shimmer effect */}
                                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20"></div>
                                        </motion.div>
                                    </div>
                                    <div className="text-right text-sm font-bold text-coffee-600 dark:text-coffee-400 mb-6">
                                        {item.progressPercentage}% Mastery
                                    </div>

                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-coffee-800 dark:text-coffee-200 mb-3">Key Milestones:</h4>
                                        <ul className="space-y-2">
                                            {item.milestones && item.milestones.map((ms, mIdx) => (
                                                <li key={mIdx} className="flex items-start gap-2 text-coffee-700 dark:text-coffee-300 text-sm">
                                                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${item.progressPercentage === 100 ? 'text-green-500' : 'text-coffee-400 dark:text-coffee-600'}`} />
                                                    <span>{ms}</span>
                                                </li>
                                            ))}
                                            {(!item.milestones || item.milestones.length === 0) && (
                                                <li className="text-coffee-500 text-sm italic">Milestones pending definition.</li>
                                            )}
                                        </ul>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LearningDashboard;
