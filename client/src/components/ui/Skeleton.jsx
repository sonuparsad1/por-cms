import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className, width, height, variant = 'rect' }) => {
    const baseStyle = {
        width: width || '100%',
        height: height || '20px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: variant === 'circle' ? '50%' : '8px',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <div style={baseStyle} className={`${className} border border-[var(--border)]`}>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, var(--border), transparent)'
                }}
            />
        </div>
    );
};

export default Skeleton;
