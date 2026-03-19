import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true, delay = 0, ...props }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`glass rounded-[32px] p-8 ${hoverEffect ? 'glass-hover' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
