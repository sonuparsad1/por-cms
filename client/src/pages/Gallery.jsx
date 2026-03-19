import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

const mockImages = [
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', alt: 'Coding Setup', width: 'span 2', height: 'h-64' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', alt: 'Circuit Board IoT', width: 'span 1', height: 'h-64' },
    { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', alt: 'Matrix Code', width: 'span 1', height: 'h-96' },
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', alt: 'Data Visualization Chart', width: 'span 2', height: 'h-96' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800', alt: 'Hackathon Event', width: 'span 3', height: 'h-80' },
];

const Gallery = () => {
    return (
        <div className="py-12 max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex justify-center items-center p-3 glass rounded-full mb-6">
                    <ImageIcon size={32} className="text-coffee-600 dark:text-coffee-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-900 dark:text-coffee-100">Project Gallery</h1>
                <p className="text-xl text-coffee-600 dark:text-coffee-400">Glimpses behind the screens: hardware builds, UI mockups, and events.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
            >
                {mockImages.map((img, idx) => (
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        key={idx} 
                        className={`rounded-2xl overflow-hidden glass p-2 relative group md:col-${img.width.replace('span ', 'span-')} ${img.height}`}
                    >
                        <img 
                            src={img.src} 
                            alt={img.alt} 
                            className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Overlay text */}
                        <div className="absolute inset-2 bg-gradient-to-t from-coffee-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-6">
                            <span className="text-coffee-100 font-bold tracking-wide">{img.alt}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Gallery;
