import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Code } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';

const Resume = () => {
    return (
        <div className="py-12 max-w-4xl mx-auto position-relative">
            {/* Sticky Download Button for Desktop */}
            <div className="fixed bottom-8 right-8 z-50 hidden md:block">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <PremiumButton variant="primary" className="shadow-2xl flex items-center gap-2 rounded-full !px-6 !py-4 hover:scale-105 transition-transform">
                        <Download size={20} /> Download PDF
                    </PremiumButton>
                </a>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Curriculum Vitae</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">A detailed look at my academic and technical journey.</p>
                
                {/* Mobile Download Button */}
                <div className="mt-6 md:hidden">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <PremiumButton variant="primary" className="flex items-center gap-2 mx-auto">
                            <Download size={18} /> Download PDF
                        </PremiumButton>
                    </a>
                </div>
            </motion.div>

            <div className="space-y-10">
                {/* Summary Section */}
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 border-b border-coffee-200 dark:border-white/10 pb-4 mb-6">Professional Summary</h2>
                        <p className="text-coffee-800 dark:text-coffee-300 leading-relaxed">
                            B.Tech Computer Science student and aspiring AI/ML Developer with a strong foundation in modern web architecture, machine learning algorithms, and IoT systems. Passionate about "building intelligent systems with code and data," I excel in bridging the gap between hardware sensors, backend data pipelines, and premium frontend user experiences. Proven ability to quickly master new technologies, evidenced by academic excellence and successful hackathon deployments. Actively seeking opportunities to contribute to high-impact software engineering teams.
                        </p>
                    </GlassCard>
                </motion.section>

                {/* Education Section */}
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 border-b border-coffee-200 dark:border-white/10 pb-4 mb-6 flex items-center gap-3">
                            <GraduationCap className="text-coffee-600 dark:text-coffee-400" /> Education
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-coffee-900 dark:text-coffee-100">Bachelor of Technology (B.Tech) in Computer Science</h3>
                                    <p className="text-coffee-700 dark:text-coffee-400 font-medium">University Name (Update Me)</p>
                                </div>
                                <div className="text-left md:text-right mt-2 md:mt-0">
                                    <span className="inline-block px-3 py-1 bg-coffee-100 dark:bg-black/30 text-coffee-800 dark:text-coffee-200 rounded text-sm font-bold">2021 - 2025</span>
                                    <p className="text-coffee-600 dark:text-coffee-400 text-sm mt-1">CGPA: 8.5/10.0</p>
                                </div>
                            </div>
                            <ul className="list-disc list-outside ml-5 text-coffee-700 dark:text-coffee-300 space-y-1">
                                <li>Relevant Coursework: Data Structures & Algorithms, Machine Learning, Operating Systems, Database Management Systems, IoT Architecture.</li>
                                <li>Member of the Technical Innovation Club.</li>
                            </ul>
                        </div>
                    </GlassCard>
                </motion.section>

                {/* Skills Section */}
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 border-b border-coffee-200 dark:border-white/10 pb-4 mb-6 flex items-center gap-3">
                            <Code className="text-coffee-600 dark:text-coffee-400" /> Technical Expertise
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-coffee-800 dark:text-coffee-200 mb-3">Programming Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'C++', 'Java', 'JavaScript', 'HTML/CSS'].map(s => (
                                        <span key={s} className="px-3 py-1 glass text-sm text-coffee-700 dark:text-coffee-300 rounded">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-coffee-800 dark:text-coffee-200 mb-3">AI / Machine Learning</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['NumPy', 'Pandas', 'Scikit-Learn', 'TensorFlow', 'NLTK'].map(s => (
                                        <span key={s} className="px-3 py-1 glass text-sm text-coffee-700 dark:text-coffee-300 rounded">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-coffee-800 dark:text-coffee-200 mb-3">Web Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map(s => (
                                        <span key={s} className="px-3 py-1 glass text-sm text-coffee-700 dark:text-coffee-300 rounded">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-coffee-800 dark:text-coffee-200 mb-3">Tools & platforms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Git/GitHub', 'VS Code', 'Arduino IDE', 'Postman'].map(s => (
                                        <span key={s} className="px-3 py-1 glass text-sm text-coffee-700 dark:text-coffee-300 rounded">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.section>
                
                {/* Experience (Simplified for Resume) */}
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 border-b border-coffee-200 dark:border-white/10 pb-4 mb-6 flex items-center gap-3">
                            <Briefcase className="text-coffee-600 dark:text-coffee-400" /> Key Projects
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-lg font-bold text-coffee-900 dark:text-coffee-100">Smart Urinal Blockage Detection (IoT)</h3>
                                    <span className="text-sm text-coffee-500 font-mono">2024</span>
                                </div>
                                <p className="text-coffee-700 dark:text-coffee-300 text-sm">
                                    Engineered an IoT alert system utilizing ultrasonic sensors and ESP8266 modules for real-time maintenance notifications, vastly improving facility management efficiency.
                                </p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-lg font-bold text-coffee-900 dark:text-coffee-100">AI-Powered Sentiment Analyzer</h3>
                                    <span className="text-sm text-coffee-500 font-mono">2023</span>
                                </div>
                                <p className="text-coffee-700 dark:text-coffee-300 text-sm">
                                    Developed an NLP pipeline achieving 92% accuracy in classifying social media data sentiment. Integrated models via a Python Flask API.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.section>
            </div>
        </div>
    );
};

export default Resume;
