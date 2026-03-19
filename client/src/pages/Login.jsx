import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PremiumButton from '../components/ui/PremiumButton';
import GlassCard from '../components/ui/GlassCard';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    if (user) {
        return <Navigate to="/admin" replace />;
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!credentials.email || !credentials.password) {
            setError('Please provide both administrative credentials.');
            return;
        }

        setLoading(true);
        const result = await login(credentials.email, credentials.password);
        if (!result.success) {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <GlassCard className="!p-8 md:!p-10 relative overflow-hidden">
                    {/* Background Design Motif */}
                    <Lock size={150} className="absolute -top-10 -right-10 text-coffee-900/[0.03] dark:text-white/[0.02] pointer-events-none" />

                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-coffee-100 dark:bg-black/40 mb-6 shadow-inner border border-coffee-200 dark:border-white/10">
                            <Lock size={28} className="text-coffee-600 dark:text-coffee-400" />
                        </div>
                        <h1 className="text-3xl font-black text-coffee-900 dark:text-coffee-100 tracking-tight">Admin Portal</h1>
                        <p className="text-sm font-medium text-coffee-600 dark:text-coffee-400 mt-2">Restricted Area. Authorized Access Only.</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg flex items-start gap-3 text-red-700 dark:text-red-400"
                        >
                            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-semibold">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-coffee-800 dark:text-coffee-200 mb-2 uppercase tracking-wide">Admin Email</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="administrator@domain.com"
                                    className="w-full bg-white/70 dark:bg-[#050505]/70 border border-coffee-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-coffee-900 dark:text-coffee-100 focus:outline-none focus:ring-2 focus:ring-coffee-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-coffee-800 dark:text-coffee-200 mb-2 uppercase tracking-wide">Secure Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                                <input 
                                    type="password" 
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/70 dark:bg-[#050505]/70 border border-coffee-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-coffee-900 dark:text-coffee-100 focus:outline-none focus:ring-2 focus:ring-coffee-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <PremiumButton 
                            type="submit" 
                            variant="primary" 
                            className="w-full !py-4 justify-center shadow-xl hover:shadow-2xl text-lg font-bold"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Establish Secure Connection'}
                        </PremiumButton>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default Login;
