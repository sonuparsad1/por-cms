import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true, ...props }) => {
    return (
        <motion.div 
            whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
            className={`glass rounded-xl p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
