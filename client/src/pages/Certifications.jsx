import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TiltCard from '../components/ui/TiltCard';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FluidBackground from '../components/ui/FluidBackground';
import Modal from '../components/ui/Modal';
import { AnimatePresence } from 'framer-motion';

const mockCertifications = [
    {
        title: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        dateIssued: "2024-03-15",
        credentialId: "AWS-DEV-12345",
        credentialUrl: "https://aws.amazon.com/certification",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        description: "Validates technical expertise in developing, deploying, and debugging cloud-based applications using AWS."
    },
    {
        title: "Machine Learning Specialization",
        issuer: "Stanford University / Coursera",
        dateIssued: "2023-11-20",
        credentialId: "ML-STANFORD-9876",
        credentialUrl: "https://coursera.org/verify/specialization",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
        description: "Comprehensive program covering supervised and unsupervised learning, neural networks, and ML best practices."
    }
];

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

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
                setCerts(mockCertifications);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    return (
        <div className="min-h-screen py-24 px-6 relative overflow-hidden bg-transparent perspective-[1500px]">
            <FluidBackground />
            
            <div className="max-w-4xl mx-auto relative z-10 space-y-16">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateX: -20, translateZ: -100 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0, translateZ: 50 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="inline-flex justify-center items-center p-6 glass rounded-full mb-6 shadow-[0_0_40px_var(--accent-glow)] border border-[var(--accent)]/30" style={{ transform: "translateZ(80px)" }}>
                        <Award size={48} className="text-[var(--accent)] animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 text-[var(--text-primary)] tracking-tighter drop-shadow-2xl" style={{ transform: "translateZ(60px)" }}>
                        Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] opacity-80">Credentials</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto italic font-medium opacity-80" style={{ transform: "translateZ(30px)" }}>
                        Continuous learning and validated expertise across domains, stored in the decentralized matrix.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_var(--accent-glow)]"></div>
                    </div>
                ) : (
                    <div className="space-y-10" style={{ transformStyle: "preserve-3d" }}>
                        {certs.map((cert, idx) => (
                            <motion.div
                                initial={{ opacity: 0, rotateX: 30, y: 50, z: -100 }}
                                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                                key={idx}
                                className="perspective-[1000px]"
                            >
                                <TiltCard depth={40} maxTilt={10} enableGlare={true}>
                                    <GlassCard 
                                        hoverEffect={false} 
                                        className={`relative overflow-hidden bg-white/5 dark:bg-black/20 border border-white/10 shadow-2xl group transition-all duration-500 p-0 ${cert.image ? 'cursor-pointer hover:bg-white/10 dark:hover:bg-white/5' : ''}`}
                                        onClick={() => {
                                            if (cert.image) {
                                                setSelectedImage(cert.image);
                                                setModalTitle(`${cert.issuer} - ${cert.title}`);
                                            }
                                        }}
                                    >
                                        <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] rounded-l-[32px] group-hover:w-3 transition-all duration-300"></div>
                                        
                                        <div className="flex flex-col md:flex-row gap-8 p-8 pl-12">
                                            <div className="md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 flex flex-col justify-center relative z-10" style={{ transform: "translateZ(20px)" }}>
                                                {cert.image && (
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-cover bg-center" style={{ backgroundImage: `url(${cert.image})` }}></div>
                                                )}
                                                <h3 className="font-black text-2xl text-[var(--text-primary)] mb-3 leading-tight drop-shadow-md">{cert.issuer}</h3>
                                                <div className="flex items-center gap-2 text-[var(--accent)] font-bold tracking-widest text-xs uppercase bg-[var(--accent)]/10 p-3 rounded-xl border border-[var(--accent)]/20 w-fit">
                                                    <Calendar size={16} />
                                                    <span>{new Date(cert.dateIssued).toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 flex flex-col justify-center relative z-10" style={{ transform: "translateZ(30px)" }}>
                                            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-4 drop-shadow-md">{cert.title}</h2>
                                            {cert.description && (
                                                <p className="text-lg text-[var(--text-secondary)] mb-8 font-medium leading-relaxed opacity-90">{cert.description}</p>
                                            )}
                                            
                                            <div className="flex flex-wrap items-center justify-between gap-6 mt-auto">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mb-1">Hash ID</span>
                                                    <span className="text-sm font-mono text-[var(--accent)] bg-black/40 dark:bg-white/5 px-3 py-2 rounded-lg border border-white/5 shadow-inner">
                                                        {cert.credentialId}
                                                    </span>
                                                </div>
                                                {cert.credentialUrl && (
                                                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ transform: "translateZ(20px)" }}>
                                                        <PremiumButton variant="glass" className="!py-3 !px-6 text-sm flex items-center gap-2 shadow-xl hover:shadow-[0_0_20px_var(--accent-glow)] border border-white/20">
                                                            Verify On-Chain <ExternalLink size={16} />
                                                        </PremiumButton>
                                                    </a>
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Modal 
                isOpen={!!selectedImage} 
                onClose={() => setSelectedImage(null)} 
                title={modalTitle}
                maxWidth="max-w-5xl"
            >
                <div className="relative group overflow-hidden rounded-2xl bg-black/20 flex items-center justify-center p-2 min-h-[300px]">
                    <motion.img 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={selectedImage} 
                        alt="Certificate Full View" 
                        className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <a 
                        href={selectedImage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute bottom-6 right-6 p-4 rounded-xl glass border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl hover:scale-105 active:scale-95"
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>
                <div className="flex justify-center mt-6">
                    <PremiumButton variant="glass" onClick={() => setSelectedImage(null)} className="!px-10">
                        Dismiss
                    </PremiumButton>
                </div>
            </Modal>
        </div>
    );
};

export default Certifications;
