import React, { createContext, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, duration);
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {notifications.map(n => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 glass rounded-2xl min-w-[300px] border-l-4 ${
                                n.type === 'success' ? 'border-l-green-500' : 
                                n.type === 'error' ? 'border-l-red-500' : 'border-l-blue-500'
                            }`}
                        >
                            {n.type === 'success' && <CheckCircle className="text-green-500 shrink-0" size={20} />}
                            {n.type === 'error' && <AlertCircle className="text-red-500 shrink-0" size={20} />}
                            {n.type === 'info' && <Info className="text-blue-500 shrink-0" size={20} />}
                            
                            <p className="text-sm font-bold text-[var(--text-primary)] flex-grow">{n.message}</p>
                            
                            <button onClick={() => removeNotification(n.id)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
