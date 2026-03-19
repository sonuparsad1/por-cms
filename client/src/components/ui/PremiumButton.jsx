import React from 'react';
import { motion } from 'framer-motion';

const PremiumButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-md font-semibold transition-all duration-300 ease-in-out flex items-center justify-center gap-2";
    
    const variants = {
        primary: "bg-coffee-900 text-coffee-100 dark:bg-coffee-100 dark:text-coffee-900 shadow-md hover:shadow-lg hover:scale-[1.02]",
        secondary: "bg-transparent border-2 border-coffee-900 text-coffee-900 dark:border-coffee-100 dark:text-coffee-100 hover:bg-coffee-900 hover:text-white dark:hover:bg-coffee-100 dark:hover:text-coffee-900",
        outline: "bg-transparent border border-coffee-500 text-coffee-700 dark:text-coffee-300 hover:bg-coffee-500 hover:text-white dark:hover:text-coffee-900",
        glass: "glass text-coffee-900 dark:text-coffee-100 hover:bg-white/20 dark:hover:bg-black/40"
    };

    return (
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default PremiumButton;
