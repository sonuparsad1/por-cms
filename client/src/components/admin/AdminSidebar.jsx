import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderGit2,
    FileText,
    ShieldCheck,
    Award,
    Star,
    Settings,
    HelpCircle,
    Image as ImageIcon,
    MessageSquare,
    LogOut,
    ChevronLeft,
    ChevronRight,
    History,
    GraduationCap,
    Code2,
    Database,
    Zap,
    Cpu,
    Globe,
    Layout,
    Palette,
    Menu as MenuIcon
} from 'lucide-react';

const AdminSidebar = ({ activeTab, navigate, logout, isCollapsed, setIsCollapsed }) => {
    
    const menuGroups = [
        {
            title: "Data Matrix",
            items: [
                { id: 'projects', label: 'Active Projects', icon: FolderGit2 },
                { id: 'blogs', label: 'Data Logs (Blog)', icon: FileText },
                { id: 'gallery', label: 'Visual Archives', icon: ImageIcon }
            ]
        },
        {
            title: "Identity Modules",
            items: [
                { id: 'experience', label: 'Evolution Log', icon: History },
                { id: 'education', label: 'Academy Data', icon: GraduationCap },
                { id: 'skills', label: 'Technical Toolkit', icon: Code2 },
                { id: 'certifications', label: 'Credentials', icon: ShieldCheck },
                { id: 'achievements', label: 'Milestones', icon: Award },
                { id: 'testimonials', label: 'System Feedback', icon: Star }
            ]
        },
        {
            title: "Design Engine",
            items: [
                { id: 'builder', label: 'Visual Builder', icon: Layout },
                { id: 'theme', label: 'Theme Foundry', icon: Palette },
                { id: 'navigation', label: 'Nav Architect', icon: MenuIcon },
                { id: 'seo', label: 'SEO Optimizer', icon: Globe }
            ]
        },
        {
            title: "Core System",
            items: [
                { id: 'media', label: 'Global Assets', icon: Database },
                { id: 'messages', label: 'Secure Inbox', icon: MessageSquare },
                { id: 'faqs', label: 'Documentation', icon: HelpCircle },
                { id: 'settings', label: 'Parameters', icon: Settings },
                { id: 'security', label: 'Security Core', icon: ShieldCheck }
            ]
        }
    ];

    const activeColor = "var(--accent)";
    const activeGlow = "var(--accent-glow)";

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col h-screen sticky top-0 bg-[var(--bg-glass)] backdrop-blur-2xl border-r border-[var(--border)] z-40 selection:bg-[var(--accent)]/30 ${isCollapsed ? 'items-center' : ''}`}
        >
            {/* Logo Area: Nexus Command */}
            <div className={`h-24 flex items-center border-b border-white/5 px-6 shrink-0 relative overflow-hidden ${isCollapsed ? 'justify-center !px-0' : 'justify-between'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                
                <AnimatePresence mode="wait">
                    {!isCollapsed ? (
                        <motion.div
                            key="expanded-logo"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-3 overflow-hidden whitespace-nowrap group cursor-pointer"
                            onClick={() => navigate('/admin')}
                        >
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] group-hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-500">
                                <Zap size={22} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-lg tracking-tighter text-[var(--text-primary)] uppercase italic">Nexus<span className="text-[var(--accent)]">Command</span></span>
                                <span className="text-[8px] font-black tracking-[0.3em] text-[var(--text-secondary)] opacity-50 uppercase">v2.0_Secure_Root</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed-logo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] cursor-pointer hover:shadow-[0_0_30px_var(--accent-glow)] transition-all"
                            onClick={() => setIsCollapsed(false)}
                        >
                            <Cpu size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-28 w-6 h-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-secondary)] opacity-50 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xl z-50 backdrop-blur-md"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation Menus */}
            <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-10 scrollbar-hide">
                
                {/* Overview: Main Identity */}
                <div className={`px-4 flex ${isCollapsed ? 'justify-center' : ''}`}>
                    <button
                        onClick={() => navigate('/admin')}
                        className={`w-full relative flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black transition-all group uppercase tracking-widest text-[10px] italic ${activeTab === 'overview' ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-[inset_0_0_20px_rgba(var(--accent-rgb),0.05)]' : 'text-[var(--text-secondary)] opacity-50 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:opacity-100'} ${isCollapsed ? 'justify-center !px-0 w-12 h-12' : ''}`}
                    >
                        {activeTab === 'overview' && !isCollapsed && (
                            <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-[var(--accent)] rounded-r-md shadow-[0_0_10px_var(--accent-glow)]" />
                        )}
                        <LayoutDashboard size={20} className={`shrink-0 ${activeTab === 'overview' ? 'text-[var(--accent)] drop-shadow-[0_0_8px_var(--accent-glow)]' : 'group-hover:text-white transition-colors'}`} />
                        {!isCollapsed && <span className="truncate">Global_Overview</span>}

                        {isCollapsed && (
                            <div className="absolute left-16 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black px-3 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl tracking-[0.1em] uppercase">
                                Root_Overview
                            </div>
                        )}
                    </button>
                </div>

                {/* Mapped Groups */}
                {menuGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                        {!isCollapsed && (
                            <h4 className="px-10 text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-20 mb-1">
                                {group.title}
                            </h4>
                        )}
                        
                        <div className={`px-4 flex flex-col gap-1.5 ${isCollapsed ? 'items-center' : ''}`}>
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(`/admin/${item.id}`)}
                                    className={`w-full relative flex items-center gap-4 px-4 py-3 rounded-2xl font-black transition-all group uppercase tracking-widest text-[9px] italic ${activeTab === item.id ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--text-secondary)] opacity-50 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:opacity-100'} ${isCollapsed ? 'justify-center !px-0 w-12 h-12' : ''}`}
                                >
                                    {activeTab === item.id && !isCollapsed && (
                                        <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-5 bg-[var(--accent)] rounded-r-md shadow-[0_0_10px_var(--accent-glow)]" />
                                    )}
                                    <item.icon size={18} className={`shrink-0 ${activeTab === item.id ? 'text-[var(--accent)] drop-shadow-[0_0_8px_var(--accent-glow)]' : 'group-hover:text-white transition-colors'}`} />
                                    {!isCollapsed && <span className="truncate">{item.label}</span>}

                                    {isCollapsed && (
                                        <div className="absolute left-16 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black px-3 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl tracking-[0.1em] uppercase">
                                            {item.label}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout Area: Secure Terminal Close */}
            <div className={`p-6 border-t border-white/5 shrink-0 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <button
                    onClick={logout}
                    className={`w-full relative flex items-center gap-4 px-4 py-3 rounded-2xl font-black transition-all group text-red-500/50 hover:bg-red-500/10 hover:text-red-500 ${isCollapsed ? 'justify-center !px-0 w-12 h-12' : ''}`}
                >
                    <LogOut size={20} className="shrink-0 transition-transform group-hover:rotate-12" />
                    {!isCollapsed && <span className="truncate uppercase tracking-widest text-[10px] italic">Terminal_Close</span>}
                    
                    {isCollapsed && (
                        <div className="absolute left-16 bg-red-950/80 border border-red-500/30 text-red-500 text-[10px] font-black px-3 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl uppercase">
                            Secure_Close
                        </div>
                    )}
                </button>
            </div>
        </motion.aside>
    );
};

export default AdminSidebar;
