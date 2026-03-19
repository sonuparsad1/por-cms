import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PremiumButton from '../components/ui/PremiumButton';

const NotFound = () => {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                <h1 className="text-9xl font-bold text-coffee-900 dark:text-coffee-100 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-coffee-700 dark:text-coffee-300 mb-8">Page Not Found</h2>
                <p className="text-lg text-coffee-600 dark:text-coffee-400 max-w-md mx-auto mb-10">
                    The intelligence you're looking for seems to have been redirected into the void. Let's get you back.
                </p>
                <Link to="/">
                    <PremiumButton variant="primary" className="mx-auto">
                        Return Home
                    </PremiumButton>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
