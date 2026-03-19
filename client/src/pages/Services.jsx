import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Brain, Code2, Cpu, BarChart3, Rocket, Presentation } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import { Link } from 'react-router-dom';

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

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Services = () => {
    return (
        <div className="py-12 max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center max-w-3xl mx-auto"
            >
                <div className="inline-flex justify-center items-center px-4 py-1.5 glass rounded-full mb-6 gap-2 text-sm font-bold text-coffee-800 dark:text-coffee-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    Available for freelance & consulting
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Professional Services</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Leveraging cross-disciplinary technical skills to deliver elegant digital solutions.</p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
                {servicesList.map((service, idx) => {
                    const Icon = service.icon;
                    return (
                        <motion.div variants={itemVariants} key={idx} className="h-full">
                            <GlassCard className="h-full flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-xl bg-coffee-100 dark:bg-black/30 flex justify-center items-center mb-6 text-coffee-600 dark:text-coffee-400 group-hover:scale-110 group-hover:bg-coffee-900 group-hover:text-coffee-100 transition-all">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-coffee-900 dark:text-coffee-100 mb-3 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed flex-grow">
                                    {service.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center glass p-10 rounded-3xl"
            >
                <h2 className="text-3xl font-bold text-coffee-900 dark:text-coffee-100 mb-4">Have a project in mind?</h2>
                <p className="text-lg text-coffee-700 dark:text-coffee-300 mb-8 max-w-2xl mx-auto">
                    Whether you need a full-stack application, an ML predictive model, or advice on your latest IoT build, I'm here to help bring your vision to reality.
                </p>
                <Link to="/contact">
                    <PremiumButton variant="primary" className="!px-8 !py-4 text-lg shadow-xl">
                        Start a Conversation
                    </PremiumButton>
                </Link>
            </motion.div>
        </div>
    );
};

export default Services;
