import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming",
            skills: [
                { name: "Python", level: 90 },
                { name: "C++", level: 85 },
                { name: "Java", level: 75 }
            ]
        },
        {
            title: "AI / Machine Learning",
            skills: [
                { name: "NumPy & Pandas", level: 85 },
                { name: "Scikit-learn", level: 80 },
                { name: "TensorFlow", level: 70 },
                { name: "Deep Learning (Basics)", level: 65 }
            ]
        },
        {
            title: "Web Development",
            skills: [
                { name: "React & Tailwind CSS", level: 90 },
                { name: "Node.js & Express", level: 80 },
                { name: "MongoDB", level: 75 },
                { name: "HTML/CSS/JS", level: 95 }
            ]
        },
        {
            title: "Core Strengths",
            skills: [
                { name: "Problem Solving & DSA", level: 85 },
                { name: "System Design Basics", level: 70 },
                { name: "Git/GitHub", level: 90 },
                { name: "Debugging & Logic", level: 95 }
            ]
        }
    ];

    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Technical Toolkit</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">My technical proficiencies and core strengths.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {skillCategories.map((cat, idx) => (
                    <GlassCard key={idx} className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 text-coffee-800 dark:text-coffee-200">{cat.title}</h2>
                        <div className="space-y-6">
                            {cat.skills.map((skill, sIdx) => (
                                <div key={sIdx}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-coffee-900 dark:text-coffee-100">{skill.name}</span>
                                        <span className="text-sm text-coffee-500 font-bold">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-coffee-200 dark:bg-black/20 rounded-full h-2.5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: sIdx * 0.1 }}
                                            className="bg-coffee-500 h-2.5 rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
            
            <div className="mt-16 text-center">
                <h3 className="text-2xl font-semibold mb-6 text-coffee-900 dark:text-coffee-100">Currently Learning</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Advanced System Design', 'Next.js', 'Transformers & LLMs', 'AWS Basics'].map((tag, idx) => (
                        <span key={idx} className="px-5 py-2 rounded-full glass text-coffee-800 dark:text-coffee-200 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
