import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Trophy, Star, ChevronRight } from 'lucide-react';

const mockAchievements = [
    {
        title: "First Place - National Hackathon 2024",
        organization: "Tech Innovation Council",
        date: "2024-05-12",
        description: "Built an AI-powered automated triage system for rural healthcare clinics in 48 hours."
    },
    {
        title: "Outstanding Project Award",
        organization: "University Engineering Department",
        date: "2023-12-01",
        description: "Awarded for the 'Smart Urinal Blockage Detection' IoT system due to its practical utility and cost-effectiveness."
    }
];

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const res = await fetch('/api/achievements');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setAchievements(data.data);
                } else {
                    setAchievements(mockAchievements);
                }
            } catch (err) {
                console.error("API Error", err);
                setAchievements(mockAchievements);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <div className="py-12 max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6 relative">
                    <Trophy size={32} className="text-yellow-600 dark:text-yellow-400" />
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/50"
                    />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Honors & Awards</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Recognitions driving my passion for engineering excellence.</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
                </div>
            ) : (
                <div className="relative pl-8 md:pl-0">
                    {/* Timeline Line */}
                    <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-coffee-200 dark:bg-white/10 md:-translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {achievements.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                key={idx}
                                className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-49px] md:left-1/2 w-6 h-6 rounded-full bg-coffee-100 border-4 border-coffee-500 z-10 md:-translate-x-1/2 shadow flex items-center justify-center">
                                    <Star size={10} className="text-coffee-700" />
                                </div>
                                
                                <div className="w-full md:w-1/2 px-0 md:px-10 mt-6 md:mt-0">
                                    <GlassCard className={`relative group ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className="text-sm font-bold text-coffee-500 mb-2 uppercase tracking-wider">
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="text-coffee-600 dark:text-coffee-400 font-medium mb-4 flex items-center md:inline-flex gap-2">
                                            {idx % 2 === 0 && <ChevronRight size={16} className="hidden md:block" />}
                                            {item.organization}
                                            {idx % 2 !== 0 && <ChevronRight size={16} className="hidden md:block" />}
                                        </div>
                                        <p className="text-coffee-800 dark:text-coffee-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Achievements;
