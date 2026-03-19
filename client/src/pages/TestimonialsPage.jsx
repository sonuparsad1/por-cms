import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { MessageSquare, Star } from 'lucide-react';

const mockTestimonials = [
    {
        name: "Dr. A. Sharma",
        role: "Professor of Computer Science",
        company: "University Engineering Dept.",
        rating: 5,
        quote: "Sonu demonstrated exceptional rapid prototyping skills during his thesis on IoT frameworks. His ability to write clean C++ for Arduino and seamlessly bridge it to a Node.js backend is genuinely impressive for an undergraduate."
    },
    {
        name: "Priya Patel",
        role: "Team Lead",
        company: "National Hackathon 2024",
        rating: 5,
        quote: "Working with Sonu during the 48-hour sprint was incredible. He not only handled the complex dataset cleaning under immense pressure but also managed to deploy the React frontend ahead of schedule. A highly dependable full-stack engineer."
    },
    {
        name: "Rahul Verma",
        role: "Client",
        company: "Freelance App Deployment",
        rating: 4,
        quote: "Great communication and a keen eye for premium UI components. The portfolio system he delivered was fast, responsive, and exactly matched the Figma designs we provided."
    }
];

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setTestimonials(data.data);
                } else {
                    setTestimonials(mockTestimonials);
                }
            } catch (err) {
                console.error(err);
                setTestimonials(mockTestimonials);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="py-12 max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <MessageSquareQuote size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Peer Reviews & Testimonials</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Feedback from professors, teammates, and clients.</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            key={idx}
                        >
                            <GlassCard className="h-full flex flex-col relative group">
                                <MessageSquare size={40} className="absolute top-6 right-6 text-coffee-900/[0.05] dark:text-white/[0.05] group-hover:scale-110 transition-transform" />
                                
                                <div className="flex gap-1 mb-6 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={i < t.rating ? 0 : 2} className={i >= t.rating ? "text-coffee-300 dark:text-coffee-700" : ""} />
                                    ))}
                                </div>

                                <p className="text-coffee-800 dark:text-coffee-300 mb-8 italic flex-grow text-lg leading-relaxed font-medium">
                                    "{t.quote}"
                                </p>

                                <div className="mt-auto border-t border-coffee-200 dark:border-white/10 pt-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-coffee-200 dark:bg-black/50 flex justify-center items-center text-coffee-700 dark:text-coffee-400 font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-coffee-900 dark:text-coffee-100">{t.name}</h4>
                                        <p className="text-sm text-coffee-600 dark:text-coffee-400">{t.role}, <span className="font-medium text-coffee-700 dark:text-coffee-300">{t.company}</span></p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialsPage;
