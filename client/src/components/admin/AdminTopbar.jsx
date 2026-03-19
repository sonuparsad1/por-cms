import React from 'react';
import { Search, Bell, Plus, User, FileText, Cpu, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminTopbar = ({ activeTab, setIsFormOpen }) => {
    
    const formattedTitle = activeTab === 'overview' 
        ? 'Nexus_Command_Center' 
        : `Management_Core // ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`;

    return (
        <header className="h-24 bg-[var(--bg-glass)] backdrop-blur-2xl border-b border-[var(--border)] sticky top-0 z-30 flex items-center justify-between px-10 selection:bg-[var(--accent)]/30">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
            
            {/* Left: Tactical Title */}
            <div className="flex items-center gap-6 relative z-10">
                <div className="flex items-center gap-3 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--accent)]/20 rounded-xl shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)] group hover:border-[var(--accent)]/50 transition-all cursor-default">
                    <Radio className="text-[var(--accent)] animate-pulse" size={16} />
                    <h1 className="text-sm font-black text-[var(--text-primary)] tracking-[0.2em] uppercase italic">
                        {formattedTitle}
                    </h1>
                </div>
            </div>

            {/* Center: System Search */}
            <div className="hidden lg:flex items-center max-w-xl w-full mx-10 relative z-10">
                <div className="relative w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-[var(--accent)] group-focus-within:drop-shadow-[0_0_8px_var(--accent-glow)] group-focus-within:opacity-100 transition-all" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search system logs, projects, or messages..." 
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] focus:border-[var(--accent)]/50 rounded-2xl py-3 pl-14 pr-4 outline-none text-xs font-black tracking-widest text-[var(--text-primary)] transition-all shadow-inner placeholder:text-[var(--text-secondary)] placeholder:opacity-40 placeholder:italic focus:bg-[var(--bg-secondary)]"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-30">
                        <span className="text-[9px] bg-[var(--bg-primary)] px-2 py-0.5 rounded-lg font-mono border border-[var(--border)] uppercase italic text-[var(--text-secondary)]">Root_Search</span>
                    </div>
                </div>
            </div>

            {/* Right: Operational Controls */}
            <div className="flex items-center gap-6 shrink-0 relative z-10">
                {activeTab !== 'overview' && activeTab !== 'messages' && activeTab !== 'settings' && activeTab !== 'media' && (
                    <motion.button 
                        whileHover={{ scale: 1.02, boxShadow: "0 0 30px var(--accent-glow)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsFormOpen(true)}
                        className="hidden sm:flex items-center gap-3 bg-[var(--accent)] text-black px-6 py-2.5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase italic transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] group"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
                        Deploy_Protocol
                    </motion.button>
                )}

                <div className="w-px h-10 bg-[var(--border)] mx-2 hidden sm:block"></div>

                {/* Secure Status */}
                <button className="relative p-3 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--accent)] transition-all rounded-2xl hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border)] group">
                    <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-primary)] shadow-[0_0_10px_var(--accent-glow)] animate-pulse"></span>
                </button>

                {/* Root Override Profile */}
                <button className="flex items-center gap-3 p-1 rounded-2xl border-2 border-[var(--accent)]/30 hover:border-[var(--accent)] transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)] group">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] shadow-inner">
                        <Cpu size={20} className="group-hover:scale-110 transition-transform" />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default AdminTopbar;
