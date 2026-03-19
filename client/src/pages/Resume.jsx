import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Code2, Terminal, BrainCircuit, Rocket, Database, Layout, Sparkles, Printer, FileText, Mail } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import TiltCard from '../components/ui/TiltCard';
import FluidBackground from '../components/ui/FluidBackground';

const iconMap = {
    Code2: Code2,
    Terminal: Terminal,
    BrainCircuit: BrainCircuit,
    Rocket: Rocket,
    Database: Database,
    Layout: Layout,
    GraduationCap: GraduationCap,
    Briefcase: Briefcase
};

const Resume = () => {
    const [data, setData] = useState({
        summary: '',
        education: [],
        skills: [],
        projects: []
    });
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const probeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const [settingsRes, eduRes, skillsRes, projRes] = await Promise.all([
                    fetch('/api/settings'),
                    fetch('/api/education'),
                    fetch('/api/skills'),
                    fetch('/api/projects')
                ]);

                const [settings, edu, skills, proj] = await Promise.all([
                    settingsRes.json(),
                    eduRes.json(),
                    skillsRes.json(),
                    projRes.json()
                ]);

                setData({
                    summary: settings.data?.[0]?.aboutSummary || '',
                    education: edu.data || [],
                    skills: skills.data || [],
                    projects: proj.data || []
                });
            } catch (err) {
                console.error('Resume data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResumeData();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 border-t-4 border-[var(--accent)] rounded-full shadow-[0_0_20px_var(--accent-glow)]"
            />
        </div>
    );

    return (
        <div ref={containerRef} className="min-h-screen py-32 px-6 relative overflow-hidden bg-transparent perspective-[2000px] print:p-0 print:bg-white selection:bg-[var(--accent)]/30">
            {/* Neural Net Interactive Background */}
            <div className="print:hidden">
                <FluidBackground />
                <div className="fixed inset-0 pointer-events-none opacity-[0.05]">
                    <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_0)] bg-[size:30px_30px]" />
                </div>
                {/* Scroll Central Spine */}
                <div className="fixed left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block group">
                    <motion.div 
                        style={{ scaleY, originY: 0 }}
                        className="absolute h-full w-full bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-50 shadow-[0_0_15px_var(--accent-glow)]"
                    />
                    {/* Glowing Probe Hook */}
                    <motion.div 
                        style={{ top: probeY }}
                        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)] border-4 border-black"
                    />
                </div>
            </div>
            
            {/* Floating Action Bar - Command Center */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="fixed bottom-10 right-10 z-[100] print:hidden"
            >
                <PremiumButton 
                    onClick={handlePrint}
                    variant="primary" 
                    className="shadow-[0_20px_60px_rgba(0,0,0,0.8)] !p-5 rounded-full hover:scale-110 transition-transform backdrop-blur-3xl border border-white/20 group relative aspect-square group overflow-visible"
                >
                    <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                    <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-5 py-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all pointer-events-none scale-90 group-hover:scale-100 origin-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] mb-1">System Action</span>
                        <span className="text-sm font-bold text-white whitespace-nowrap">Export PDF Structure</span>
                    </div>
                </PremiumButton>
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10 space-y-32 print:max-w-none print:m-0 print:space-y-6 overflow-visible">
                
                {/* HERO SECTION - REFINED 3D Reveal */}
                <motion.div 
                    initial={{ opacity: 0, y: 100, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center print:text-left print:m-0 perspective-[1000px]"
                >
                    <div className="print:hidden relative inline-block group">
                        <Label text="TRANSMISSION START" />
                        <h1 className="text-7xl md:text-[12rem] font-black mb-6 text-[var(--text-primary)] tracking-tighter drop-shadow-2xl leading-[0.85] relative z-10">
                            Data <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] via-amber-400 to-orange-500 drop-shadow-[0_0_40px_var(--accent-glow)]">Sheet</span>
                        </h1>
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity blur-3xl -z-10" 
                        />
                        <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mx-auto font-black opacity-60 uppercase tracking-widest mt-8">
                            A granular breakdown of <span className="text-white decoration-[var(--accent)] underline underline-offset-4 decoration-2">capabilities</span> & experience.
                        </p>
                    </div>

                    {/* Pro Print Header */}
                    <div className="hidden print:grid grid-cols-2 gap-8 border-b-4 border-black pb-8 mb-8 text-black">
                        <div>
                            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Sonu Prasad</h1>
                            <p className="text-2xl font-bold text-gray-800 mt-2 uppercase tracking-[0.2em] font-mono">B.Tech CSE Student | AI/ML Developer</p>
                        </div>
                        <div className="flex flex-col justify-end items-end space-y-1 text-xs font-bold font-mono">
                            <div className="flex items-center gap-2"><span>contact@sonuprasad.dev</span> <Mail size={12} /></div>
                            <div className="flex items-center gap-2"><span>github.com/sonu-p</span> <Code2 size={12} /></div>
                            <div className="flex items-center gap-2"><span>www.sonuprasad.dev</span> <Layout size={12} /></div>
                            <div className="flex items-center gap-2"><span>Official Record System-4.0</span> <Database size={12} /></div>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-40 print:space-y-10 relative">
                    
                    {/* PROFESSIONAL SUMMARY */}
                    <Section title="Profile Overview" icon={<Sparkles />} delay={0.1}>
                        <div className="relative group">
                            <motion.div 
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                className="absolute -left-6 top-0 bottom-0 w-1 bg-[var(--accent)] origin-top print:hidden"
                            />
                            <p className="text-[var(--text-secondary)] print:text-black leading-relaxed text-2xl md:text-4xl font-black tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">
                                {data.summary || "Aspiring AI/ML Engineer with a strong foundation in computer science fundamentals and programming. B.Tech CSE student focused on building intelligent systems, solving real-world problems, and continuously improving technical expertise through hands-on projects."}
                            </p>
                        </div>
                    </Section>

                    {/* EDUCATION - STAGGERED REVEAL */}
                    <Section title="Academic History" icon={<GraduationCap />} delay={0.2}>
                        <div className="grid gap-10">
                            {data.education.length > 0 ? data.education.map((edu, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: -100, opacity: 0, rotateY: -15 }}
                                    whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    className="bg-white/[0.02] dark:bg-black/20 print:bg-white p-12 rounded-[48px] border border-white/5 print:border-l-4 print:border-black print:rounded-none group hover:bg-white/[0.05] transition-all relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity flex flex-col items-end">
                                        <HashIcon size={120} />
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
                                        <div>
                                            <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] print:text-black leading-tight">{edu.degree}</h3>
                                            <p className="text-[var(--accent)] font-black tracking-[0.4em] uppercase text-xs mt-3 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                                                {edu.status}
                                            </p>
                                        </div>
                                        <span className="px-6 py-3 bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-sm font-black text-[var(--accent)] print:text-black print:border-black rounded-2xl mt-6 md:mt-0 uppercase tracking-widest">{edu.duration}</span>
                                    </div>
                                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] print:text-gray-700 leading-relaxed font-medium opacity-70 group-hover:opacity-90 transition-opacity max-w-3xl">
                                        {edu.description}
                                    </p>
                                    <div className="mt-8 flex gap-4 print:hidden">
                                        {['Fundamentals', 'Architecture', 'AI-Ethics'].map(tag => (
                                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-500">{tag}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="text-center p-24 opacity-20 italic font-mono uppercase tracking-[1em]">Scanning for nodes...</div>
                            )}
                        </div>
                    </Section>

                    {/* TECHNICAL EXPERTISE - Grid Matrix */}
                    <Section title="Technical Grid" icon={<CpuIcon />} delay={0.3}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-1">
                            {data.skills.map((cat, i) => {
                                const Icon = iconMap[cat.icon] || Code2;
                                return (
                                    <TiltCard key={i} depth={40} maxTilt={15} className="print:transform-none">
                                        <div className="h-full bg-white/[0.02] dark:bg-black/30 p-8 md:p-12 border border-white/5 print:border-black/5 rounded-[40px] relative overflow-hidden group hover:border-[var(--accent)]/50 transition-colors">
                                            {cat.isSpecial && (
                                                <div className="absolute top-0 right-0 p-6 opacity-40">
                                                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse shadow-[0_0_10px_var(--accent)]" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-6">
                                                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                                    <Icon size={28} />
                                                </div>
                                                <h4 className="text-2xl font-black text-[var(--text-primary)] print:text-black tracking-tight uppercase">{cat.title}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {(cat.skills || []).map(s => (
                                                        <span key={s.name} className="px-3 py-1.5 bg-white/5 border border-white/5 text-[10px] font-black text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all rounded-[10px] uppercase tracking-widest">
                                                            {s.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    </Section>

                    {/* KEY OPERATIONS - System Nodes */}
                    <Section title="Strategic Ops" icon={<Rocket />} delay={0.4}>
                        <div className="grid gap-12">
                            {data.projects.filter(p => !p.draft).slice(0, 3).map((proj, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-black/20 p-12 md:p-20 rounded-[64px] border border-white/5 relative overflow-hidden group"
                                >
                                    <motion.div 
                                        animate={{ 
                                            background: ["radial-gradient(circle at 10% 10%, var(--accent) 0%, transparent 0%)", "radial-gradient(circle at 90% 90%, var(--accent) 0%, transparent 10%)"],
                                        }}
                                        className="absolute inset-0 opacity-[0.02] pointer-events-none transition-all group-hover:opacity-[0.05]"
                                    />
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent)] opacity-50">Operation Log 00{i+1}</span>
                                            <h3 className="text-4xl md:text-7xl font-black text-[var(--text-primary)] leading-none -tracking-widest">{proj.title}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-8 md:mt-0">
                                            {(proj.technologies || []).slice(0, 4).map(tech => (
                                                <span key={tech} className="text-[10px] font-black uppercase tracking-tighter text-white px-4 py-2 bg-white/5 rounded-full border border-white/10 group-hover:border-[var(--accent)]/50 transition-colors">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-2xl md:text-3xl text-[var(--text-secondary)] print:text-gray-700 leading-normal font-black opacity-80 decoration-slice">
                                        {proj.description}
                                    </p>
                                    <div className="mt-16 flex items-center justify-between">
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(id => <div key={id} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-[var(--accent)]" /></div>)}
                                        </div>
                                        <div className="font-mono text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.4em] px-6 py-2 border border-[var(--accent)]/30 rounded-full">
                                            Deployment_Year_{proj.year || '2024'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Section>
                </div>

                <footer className="pt-40 pb-20 text-center opacity-10 print:hidden">
                    <p className="font-mono text-xs uppercase tracking-[1em]">Neural Link Status: Stable // Terminal Close</p>
                </footer>
            </div>
            
            {/* Extended Print Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: auto; margin: 12mm 15mm; }
                    body { background: white !important; color: black !important; font-family: 'Inter', sans-serif !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:block { display: block !important; }
                    .print\\:text-black { color: black !important; }
                    .print\\:bg-white { background: white !important; }
                    .print\\:border-black { border-color: black !important; }
                    .print\\:rounded-none { border-radius: 0 !important; }
                    .print\\:m-0 { margin: 0 !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    h1, h2, h3, h4, p, span { color: black !important; text-shadow: none !important; }
                    section { break-inside: avoid; margin-bottom: 25mm !important; }
                    div { break-inside: avoid-page; }
                    .glass { background: none !important; border-color: #eee !important; }
                }
            ` }} />
        </div>
    );
};

const Section = ({ title, icon, children, delay }) => (
    <motion.section 
        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 print:space-y-4"
    >
        <div className="flex items-center gap-8 print:border-b-2 print:border-black print:pb-4 group">
            <div className="w-20 h-20 rounded-[28px] bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] print:hidden relative overflow-hidden group-hover:rotate-12 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                {icon}
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-[var(--text-primary)] print:text-black uppercase tracking-tighter leading-none">{title}</h2>
        </div>
        {children}
    </motion.section>
);

const HashIcon = ({ size }) => (
    <div className="font-mono font-black" style={{ fontSize: size }}>#</div>
);

const Label = ({ text }) => (
    <div className="flex items-center justify-center gap-6 mb-12 opacity-40">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--accent)]" />
        <span className="font-mono text-xs uppercase font-black tracking-[0.5em] text-[var(--accent)]">{text}</span>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--accent)]" />
    </div>
);

const CpuIcon = () => (
    <Terminal size={40} />
);

export default Resume;
