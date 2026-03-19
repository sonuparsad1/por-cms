import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Code, Server, BrainCircuit, Rocket } from 'lucide-react';

const experienceData = [
    {
        year: '2021',
        title: 'Began CS Journey',
        icon: Code,
        description: 'Started B.Tech in Computer Science. Mastered core fundamentals in C++ and Java. Developed algorithmic thinking through Data Structures and Object-Oriented Programming methodologies.'
    },
    {
        year: '2022',
        title: 'Explored Web & IoT',
        icon: Server,
        description: 'Dived into full-stack web development using HTML/CSS/JS. Simultaneously experimented with Arduino microcontrollers, sparking an interest in hardware-software integration for IoT.'
    },
    {
        year: '2023',
        title: 'AI & Machine Learning Focus',
        icon: BrainCircuit,
        description: 'Shifted focus towards data intelligence. Built predictive models using Python, Pandas, and Scikit-learn. Developed the AI Sentiment Analyzer and Student Performance Predictor.'
    },
    {
        year: '2024 - Present',
        title: 'Full-Stack Intelligent Systems',
        icon: Rocket,
        description: 'Bridging the gap between AI, IoT, and premium UI. Building production-grade React apps, integrating complex Node/Express APIs, and deploying end-to-end intelligent solutions.'
    }
];

const Experience = () => {
    return (
        <div className="py-12 max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">My Journey</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">The evolution from coding basics to building intelligent systems.</p>
            </motion.div>

            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-coffee-400 to-coffee-200 dark:from-coffee-600 dark:to-coffee-800 md:-translate-x-1/2 rounded-full"></div>

                <div className="space-y-16">
                    {experienceData.map((exp, idx) => {
                        const Icon = exp.icon;
                        const isEven = idx % 2 === 0;

                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                                key={idx}
                                className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start md:items-center group`}
                            >
                                {/* Center Icon Badge */}
                                <div className="absolute left-[8px] md:left-1/2 w-16 h-16 rounded-full bg-white dark:bg-[#0A0908] border-4 border-coffee-400 dark:border-coffee-600 z-10 md:-translate-x-1/2 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={24} className="text-coffee-700 dark:text-coffee-300" />
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                    <GlassCard className="relative overflow-hidden hover:shadow-2xl transition-shadow">
                                        {/* Stylistic background year */}
                                        <div className="absolute -bottom-4 -right-2 text-8xl font-black text-coffee-900/[0.03] dark:text-white/[0.02] select-none pointer-events-none">
                                            {exp.year.split(' ')[0]}
                                        </div>
                                        
                                        <span className="inline-block px-3 py-1 bg-coffee-100 dark:bg-black/30 text-coffee-800 dark:text-coffee-200 rounded text-sm font-bold mb-3">
                                            {exp.year}
                                        </span>
                                        <h3 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 mb-3">
                                            {exp.title}
                                        </h3>
                                        <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed relative z-10">
                                            {exp.description}
                                        </p>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Experience;
