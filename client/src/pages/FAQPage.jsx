import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const mockFaqs = [
    {
        question: "Are you open to full-time remote opportunities?",
        answer: "Yes, I am currently seeking full-time opportunities, both remote and hybrid, particularly in roles involving AI/ML Engineering, Full-Stack Development, or IoT integrations."
    },
    {
        question: "What is your primary tech stack?",
        answer: "My core stack includes React, Node.js, Express, and MongoDB for web development. For AI/ML and data science, I heavily utilize Python (Pandas, Scikit-learn, TensorFlow). For hardware/IoT, I work with C++ and Arduino/ESP microcontrollers."
    },
    {
        question: "Do you take on freelance projects?",
        answer: "Depending on my current workload and the project's scope, I am open to freelance or consulting work. Feel free to reach out via the Contact page with project details."
    }
];

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch('/api/faqs');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setFaqs(data.data);
                } else {
                    setFaqs(mockFaqs);
                }
            } catch (err) {
                console.error("API Error", err);
                setFaqs(mockFaqs);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="py-12 max-w-3xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <MessageCircle size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Frequently Asked Questions</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Common inquiries from recruiters, collaborators, and clients.</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                        >
                            <GlassCard className="!p-0 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                                >
                                    <h3 className="text-xl font-bold text-coffee-900 dark:text-coffee-100 pr-8">
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0 text-coffee-500"
                                    >
                                        <ChevronDown size={24} />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden bg-coffee-100/30 dark:bg-black/20"
                                        >
                                            <p className="p-6 pt-0 text-coffee-800 dark:text-coffee-300 leading-relaxed text-lg">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FAQPage;
