import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Shield, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import PremiumButton from '../components/ui/PremiumButton';
import GlassCard from '../components/ui/GlassCard';
import FluidBackground from '../components/ui/FluidBackground';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            setError('CRITICAL: Administrative credentials required for sector access.');
            return;
        }

        setLoading(true);
        const result = await login(credentials.email, credentials.password);
        if (!result.success) {
            setError(result.message || 'ACCESS DENIED: Credentials mismatch detected.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-6 relative bg-[var(--bg-primary)] selection:bg-[var(--accent)]/30">
            <FluidBackground />
            
            <motion.div 
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="bg-[var(--bg-glass)] backdrop-blur-3xl border border-[var(--border)] rounded-[48px] p-10 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                    
                    {/* Tactical Motif */}
                    <Shield size={300} className="absolute -top-20 -right-20 text-[var(--accent)]/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-[2s]" />

                    <div className="text-center mb-12 relative z-10">
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-flex justify-center items-center w-24 h-24 rounded-3xl bg-[var(--bg-secondary)] border-2 border-[var(--accent)]/30 mb-8 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] group-hover:border-[var(--accent)] transition-all duration-500"
                        >
                            <ShieldCheck size={40} className="text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent-glow)]" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Nexus_Command</h1>
                        <p className="text-[10px] font-black tracking-[0.5em] text-[var(--text-secondary)] opacity-30 uppercase mt-2 italic">Sector 01 // Restricted Core Access</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-10 p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-4 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                        >
                            <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest">Protocol_Error</span>
                                <p className="text-xs font-black italic">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-30 italic flex items-center gap-2">
                                <Activity size={10} className="text-[var(--accent)]" /> 
                                Identify_User_Hash
                            </label>
                            <div className="relative group">
                                <User size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-20 group-focus-within:text-[var(--accent)] transition-colors" />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="administrator@nexus.core"
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl py-4 pl-14 pr-6 text-[var(--text-primary)] text-sm font-black italic focus:outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-secondary)] transition-all shadow-inner placeholder:text-[var(--text-secondary)] opacity-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-30 italic flex items-center gap-2">
                                <Lock size={10} className="text-[var(--accent)]" /> 
                                Secure_Key_Input
                            </label>
                            <div className="relative group">
                                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-20 group-focus-within:text-[var(--accent)] transition-colors" />
                                <input 
                                    type="password" 
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl py-4 pl-14 pr-6 text-[var(--text-primary)] text-sm font-black italic focus:outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-secondary)] transition-all shadow-inner placeholder:text-[var(--text-secondary)] opacity-10"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-5 bg-[var(--accent)] text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] italic shadow-[0_0_50px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                        >
                            {loading ? (
                                <span className="flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Synchronizing...
                                </span>
                            ) : (
                                <>
                                    Establish_Secure_Uplink
                                    <Cpu size={18} className="group-hover:rotate-90 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="text-center mt-10 text-[9px] font-black text-[var(--text-secondary)] opacity-10 uppercase tracking-[1em] italic select-none">
                    Nexus Integrated Systems // Security Level 04
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
