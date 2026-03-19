import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

const About = () => {
    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">About Me</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">The journey of an AI/ML Developer & Full-Stack Engineer.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <GlassCard>
                    <h2 className="text-2xl font-semibold mb-4 text-coffee-800 dark:text-coffee-200">What I Do</h2>
                    <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed max-w-none">
                        I am Sonu Prasad, an aspiring AI/ML Developer and Full-Stack Engineer. I specialize in building intelligent systems that merge analytical machine learning models with elegant, user-centric web applications. By utilizing tools like React, Node.js, and MongoDB alongside Python, NumPy, and TensorFlow, I deliver end-to-end solutions.
                    </p>
                </GlassCard>
                <GlassCard>
                    <h2 className="text-2xl font-semibold mb-4 text-coffee-800 dark:text-coffee-200">What Drives Me</h2>
                    <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed max-w-none">
                        I am driven by the immense potential of data to solve complex real-world problems. Whether it's analyzing sentiments, predicting student performance, or streamlining IoT systems, my goal is to create technology that is not only functional but deeply impactful.
                    </p>
                </GlassCard>
                <GlassCard>
                    <h2 className="text-2xl font-semibold mb-4 text-coffee-800 dark:text-coffee-200">Approach to Learning</h2>
                    <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed max-w-none">
                        Continuous growth is at my core. I treat every project as a learning opportunity, meticulously diving into Data Structures, System Design, and emerging ML algorithms to stay ahead of the curve.
                    </p>
                </GlassCard>
                <GlassCard>
                    <h2 className="text-2xl font-semibold mb-4 text-coffee-800 dark:text-coffee-200">Career Goals & Vision</h2>
                    <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed max-w-none">
                        My vision is to engineer scalable, AI-powered platforms that redefine the modern web standard. My immediate focus is securing impactful internships and remote opportunities that challenge my full-stack and machine learning capabilities.
                    </p>
                </GlassCard>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-coffee-900 dark:text-coffee-100">My Journey</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-coffee-300 before:to-transparent">
                    {[ 
                        { year: "2024", title: "Full-Stack AI Projects", desc: "Developing Sentiment Analyzers and IoT Home Automation systems." },
                        { year: "2023", title: "Deepening ML Knowledge", desc: "Mastered NumPy, Pandas, Scikit-learn, and the foundations of TensorFlow." },
                        { year: "2022", title: "Web Development Foundation", desc: "Began building responsive layouts and modern JavaScript applications." },
                        { year: "2021", title: "B.Tech Computer Science Start", desc: "Started my academic journey focusing on Problem Solving and DSA with C++ and Java." }
                    ].map((item, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-coffee-900 bg-coffee-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <span className="text-xs font-bold">{item.year.substring(2)}</span>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded shadow">
                                <h3 className="font-bold text-coffee-900 dark:text-coffee-100 text-lg mb-1">{item.title}</h3>
                                <p className="text-sm text-coffee-700 dark:text-coffee-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
