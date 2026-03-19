import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import { Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Get In Touch</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Available for internships, freelance work, and collaboration.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-coffee-900 dark:text-coffee-100">Contact Information</h2>
                    <p className="text-coffee-700 dark:text-coffee-300 mb-8 leading-relaxed">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's connect!
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-coffee-800 dark:text-coffee-200">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-coffee-500">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-sm text-coffee-500">Email</p>
                                <a href="mailto:sonusa470@gmail.com" className="hover:text-coffee-900 dark:hover:text-white transition-colors">
                                    sonusa470@gmail.com
                                </a>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-coffee-800 dark:text-coffee-200">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-coffee-500">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-sm text-coffee-500">Location</p>
                                <p>India</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium mb-4 text-coffee-900 dark:text-coffee-100">Social Profiles</h3>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/spsaharan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-coffee-700 hover:text-coffee-900 hover:bg-white/50 dark:text-coffee-300 dark:hover:text-white transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/sonuparsad1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-coffee-700 hover:text-coffee-900 hover:bg-white/50 dark:text-coffee-300 dark:hover:text-white transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://x.com/iamsonuparsad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-coffee-700 hover:text-coffee-900 hover:bg-white/50 dark:text-coffee-300 dark:hover:text-white transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <GlassCard hoverEffect={false} className="!p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-coffee-900 dark:text-coffee-100">Send Me A Message</h2>
                    {status === 'success' && (
                        <div className="mb-6 p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
                            Message sent successfully! I'll get back to you soon.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-coffee-800 dark:text-coffee-200">Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-md bg-white/50 dark:bg-black/20 border border-coffee-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-900 dark:text-white transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-coffee-800 dark:text-coffee-200">Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 rounded-md bg-white/50 dark:bg-black/20 border border-coffee-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-900 dark:text-white transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-coffee-800 dark:text-coffee-200">Message</label>
                            <textarea 
                                id="message" 
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full px-4 py-3 rounded-md bg-white/50 dark:bg-black/20 border border-coffee-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-coffee-500 text-coffee-900 dark:text-white transition-all resize-none"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>
                        <PremiumButton type="submit" variant="primary" className="w-full">
                            Send Message
                        </PremiumButton>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default Contact;
