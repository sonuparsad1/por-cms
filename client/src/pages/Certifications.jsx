import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';

const mockCertifications = [
    {
        title: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: "2024-03-15",
        credentialId: "AWS-DEV-12345",
        link: "https://aws.amazon.com/certification",
        description: "Validates technical expertise in developing, deploying, and debugging cloud-based applications using AWS."
    },
    {
        title: "Machine Learning Specialization",
        issuer: "Stanford University / Coursera",
        date: "2023-11-20",
        credentialId: "ML-STANFORD-9876",
        link: "https://coursera.org/verify/specialization",
        description: "Comprehensive program covering supervised and unsupervised learning, neural networks, and ML best practices."
    }
];

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await fetch('/api/certifications');
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setCerts(data.data);
                } else {
                    setCerts(mockCertifications);
                }
            } catch (err) {
                console.error("API Error", err);
                setCerts(mockCertifications);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    return (
        <div className="py-12 max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <Award size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Licenses & Certifications</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Continuous learning and validated expertise across domains.</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {certs.map((cert, idx) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                        >
                            <GlassCard className="flex flex-col md:flex-row gap-6 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-coffee-500 rounded-l-2xl"></div>
                                <div className="md:w-1/4 flex-shrink-0 border-r border-coffee-200 dark:border-white/10 pr-6">
                                    <h3 className="font-bold text-lg text-coffee-900 dark:text-coffee-100 mb-2">{cert.issuer}</h3>
                                    <div className="flex items-center gap-2 text-coffee-500 text-sm">
                                        <Calendar size={14} />
                                        <span>{new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                                    </div>
                                </div>
                                <div className="md:w-3/4 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100 mb-3">{cert.title}</h2>
                                    {cert.description && (
                                        <p className="text-coffee-700 dark:text-coffee-300 mb-4">{cert.description}</p>
                                    )}
                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                                        <span className="text-sm font-mono text-coffee-500 bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                                            ID: {cert.credentialId}
                                        </span>
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                                <PremiumButton variant="glass" className="!py-1.5 !px-4 text-sm flex items-center gap-2">
                                                    Verify <ExternalLink size={14} />
                                                </PremiumButton>
                                            </a>
                                        )}
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

export default Certifications;
