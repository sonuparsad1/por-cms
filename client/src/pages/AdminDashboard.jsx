import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { Database, FolderGit2, MessageSquare, LogOut, Plus, Trash2, Edit, FileText, Award, Star, Settings, ShieldCheck, HelpCircle, Image as ImageIcon, Search, TrendingUp, Users, ChevronRight, CheckCircle, XCircle, Clock, History, GraduationCap, Code2, Zap, Cpu, Activity, Shield, Globe, Radio } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import PremiumButton from '../components/ui/PremiumButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import MediaManager from '../components/admin/MediaManager';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import ProjectBlocksBuilder from '../components/admin/ProjectBlocksBuilder';
import FluidBackground from '../components/ui/FluidBackground';

// New CMS Components
import PageBuilder from '../components/admin/PageBuilder';
import ThemeCustomizer from '../components/admin/ThemeCustomizer';
import SEOManager from '../components/admin/SEOManager';
import NavigationBuilder from '../components/admin/NavigationBuilder';

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const cmsSchemas = {
    settings: {
        icon: Settings,
        titleKey: 'siteName',
        descKey: 'homepageTemplate',
        fields: [
            { name: 'siteName', label: 'Global Website Title', type: 'text', required: true },
            { name: 'siteDescription', label: 'Global Description & Meta', type: 'text', required: true },
            { name: 'homepageTemplate', label: 'Homepage Global Template', type: 'select', options: ['Visual Builder', 'Centered Hero', 'Split Screen', 'Animated Intro', 'Futuristic AI'], required: true },
            { name: 'globalTheme', label: 'Forced Theme Override', type: 'select', options: ['light', 'dark', 'luxury'], required: true },
            { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: false },
            { name: 'metaDescription', label: 'SEO Meta Description', type: 'text', required: false },
            { name: 'googleAnalyticsId', label: 'Google Analytics ID', type: 'text', required: false },
            { name: 'contactEmail', label: 'Public Display Email', type: 'text', required: false },
            { name: 'resumeUrl', label: 'Cloud URL to Resume PDF', type: 'url', required: false },
            { name: 'githubUrl', label: 'GitHub Profile Link', type: 'url', required: false },
            { name: 'linkedinUrl', label: 'LinkedIn Profile Link', type: 'url', required: false },
            { name: 'twitterUrl', label: 'Twitter Profile Link', type: 'url', required: false }
        ]
    },
    projects: {
        icon: FolderGit2,
        titleKey: 'title',
        descKey: 'tagline',
        fields: [
            { name: 'title', label: 'Tactical Title', type: 'text', required: true },
            { name: 'tagline', label: 'Impact Line / Tagline', type: 'text', required: true },
            { name: 'shortDescription', label: 'Synopsis / Synopsis Meta', type: 'textarea', required: true },
            { name: 'category', label: 'Technology Segment', type: 'select', options: ['AI/ML', 'IoT', 'Web Development', 'Other'], required: true },
            { name: 'status', label: 'Deployment Status', type: 'select', options: ['Completed', 'Ongoing', 'Planned'], required: true },
            { name: 'coverImage', label: 'Primary Hero Visual', type: 'image', required: true },
            { name: 'contentMode', label: 'Case Study Architecture', type: 'select', options: ['structured', 'custom'], required: true },
            { name: 'structuredContent', label: 'Case Study Modules', type: 'project-builder', required: false, condition: (data) => data.contentMode === 'structured' },
            { name: 'customCode', label: 'Architectural Overwrite (Custom Code)', type: 'project-code-editor', required: false, condition: (data) => data.contentMode === 'custom' },
            { name: 'techStack', label: 'Tech Stack (Comma Separated)', type: 'text', required: false },
            { name: 'githubUrl', label: 'Source Code Link (GitHub)', type: 'url', required: false },
            { name: 'liveDemoUrl', label: 'Live Deployment Link', type: 'url', required: false },
            { name: 'galleryImages', label: 'Archive Gallery (Visuals)', type: 'image-gallery', required: false },
            { name: 'videoLinks', label: 'Internal Ops Videos (Comma Separated URLs)', type: 'text', required: false },
            { name: 'themeTemplate', label: 'Display Engine/Layout', type: 'select', options: ['Grid', 'Card', 'Featured', 'Carousel', 'Masonry'], required: true }
        ]
    },
    blogs: {
        icon: FileText,
        titleKey: 'title',
        descKey: 'summary',
        fields: [
            { name: 'title', label: 'Blog Title', type: 'text', required: true },
            { name: 'summary', label: 'Short Summary', type: 'textarea', required: true },
            { name: 'content', label: 'Markdown Content Body', type: 'markdown', required: true },
            { name: 'category', label: 'Category', type: 'text', required: true },
            { name: 'tags', label: 'SEO Tags & Keywords', type: 'tags', required: false },
            { name: 'coverImage', label: 'Cover Image', type: 'image', required: false },
            { name: 'themeTemplate', label: 'Layout Template', type: 'select', options: ['Minimal', 'Magazine', 'Split', 'Image-Heavy'], required: true }
        ]
    },
    certifications: {
        icon: ShieldCheck,
        titleKey: 'title',
        descKey: 'issuer',
        fields: [
            { name: 'title', label: 'Certification Name', type: 'text', required: true },
            { name: 'issuer', label: 'Issuing Organization', type: 'text', required: true },
            { name: 'dateIssued', label: 'Date Issued (YYYY-MM-DD)', type: 'text', required: true },
            { name: 'description', label: 'Detailed Description', type: 'textarea', required: false },
            { name: 'credentialId', label: 'Credential / Hash ID', type: 'text', required: false },
            { name: 'image', label: 'Certificate Image / Badge', type: 'image', required: false },
            { name: 'credentialUrl', label: 'Credential / Verification Link', type: 'url', required: false }
        ]
    },
    achievements: {
        icon: Award,
        titleKey: 'title',
        descKey: 'description',
        fields: [
            { name: 'title', label: 'Achievement Title', type: 'text', required: true },
            { name: 'date', label: 'Date (YYYY-MM-DD)', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'select', options: ['Hackathon', 'Academic', 'Project', 'Other'], required: true },
            { name: 'description', label: 'Detailed Description', type: 'textarea', required: true },
            { name: 'metrics', label: 'Metrics (e.g. 1st Place out of 500)', type: 'text', required: false }
        ]
    },
    testimonials: {
        icon: Star,
        titleKey: 'name',
        descKey: 'quote',
        fields: [
            { name: 'name', label: 'Reviewer Name', type: 'text', required: true },
            { name: 'role', label: 'Reviewer Role', type: 'text', required: false },
            { name: 'company', label: 'Company/University', type: 'text', required: false },
            { name: 'avatar', label: 'Reviewer Photo', type: 'image', required: false },
            { name: 'rating', label: 'Rating (1-5)', type: 'select', options: ['5', '4', '3', '2', '1'], required: true },
            { name: 'status', label: 'Review Status', type: 'select', options: ['pending', 'approved', 'rejected'], required: true },
            { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true }
        ]
    },
    faqs: {
        icon: HelpCircle,
        titleKey: 'question',
        descKey: 'answer',
        fields: [
            { name: 'question', label: 'Question', type: 'text', required: true },
            { name: 'answer', label: 'Answer Body', type: 'textarea', required: true },
            { name: 'category', label: 'FAQ Category', type: 'text', required: false }
        ]
    },
    experience: {
        icon: History,
        titleKey: 'title',
        descKey: 'year',
        fields: [
            { name: 'title', label: 'Experience/Milestone Title', type: 'text', required: true },
            { name: 'year', label: 'Era/Year (e.g. 2023 - 2024)', type: 'text', required: true },
            { name: 'description', label: 'Detailed Narrative', type: 'textarea', required: true },
            { name: 'icon', label: 'Lucide Icon Name (e.g., Code, Cpu, Database)', type: 'text', required: false },
            { name: 'image', label: 'Milestone Visual (Optional)', type: 'image', required: false },
            { name: 'order', label: 'Timeline Sort Weight (Ascending)', type: 'number', required: true },
            { name: 'status', label: 'Deployment Status', type: 'select', options: ['published', 'draft'], required: true }
        ]
    },
    education: {
        icon: GraduationCap,
        titleKey: 'degree',
        descKey: 'institution',
        fields: [
            { name: 'degree', label: 'Degree Name', type: 'text', required: true },
            { name: 'institution', label: 'School / University', type: 'text', required: true },
            { name: 'duration', label: 'Duration (e.g. 2021 - 2025)', type: 'text', required: true },
            { name: 'status', label: 'Completion Status', type: 'select', options: ['Currently Pursuing', 'Completed', 'Dropped'], required: true },
            { name: 'description', label: 'Highlights / Core Subjects', type: 'textarea', required: true },
            { name: 'order', label: 'Display Order', type: 'number', required: true }
        ]
    },
    skills: {
        icon: Code2,
        titleKey: 'title',
        descKey: 'icon',
        fields: [
            { name: 'title', label: 'Category Title (e.g. AI/ML)', type: 'text', required: true },
            { name: 'icon', label: 'Lucide Icon Name', type: 'text', required: false },
            { name: 'isSpecial', label: 'Highlight Category?', type: 'checkbox', required: false },
            { name: 'skills', label: 'Skills in this Category', type: 'skills-editor', required: true },
            { name: 'order', label: 'Display Order', type: 'number', required: true }
        ]
    },
    gallery: {
        icon: ImageIcon,
        titleKey: 'title',
        descKey: 'category',
        fields: [
            { name: 'title', label: 'Visual Title', type: 'text', required: true },
            { name: 'imageUrl', label: 'Visual Asset', type: 'image', required: true },
            { name: 'category', label: 'Asset Log Category', type: 'select', options: ['project', 'blog', 'upload'], required: true },
            { name: 'description', label: 'Lore/Context (Optional)', type: 'textarea', required: false },
            { name: 'order', label: 'Grid Weight (Sorting)', type: 'number', required: true },
            { name: 'status', label: 'Visibility Log', type: 'select', options: ['published', 'draft'], required: true }
        ]
    }
};

const AdminDashboard = () => {
    const { logout, token } = useContext(AuthContext);
    const { theme: activeTheme } = useContext(ThemeContext);
    const { tab } = useParams();
    const navigate = useNavigate();
    
    const validTabs = [
        ...Object.keys(cmsSchemas), 
        'overview', 'messages', 'media', 'security',
        'builder', 'theme', 'navigation', 'seo'
    ];
    const activeTab = validTabs.includes(tab) ? tab : 'overview';
    
    const [counts, setCounts] = useState(null);
    const [analyticsData, setAnalyticsData] = useState({ charts: { dailyViews: [] }, topPages: [] });
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [inboxSearch, setInboxSearch] = useState('');
    const [formData, setFormData] = useState({});
    const [inboxFilter, setInboxFilter] = useState('all');
    const [reviewFilter, setReviewFilter] = useState('all');
    const [securityData, setSecurityData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [securityStatus, setSecurityStatus] = useState({ type: '', message: '' });
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (activeTab === 'security') {
            setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setSecurityStatus({ type: '', message: '' });
        }
        fetchCollectionData();
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    }, [activeTab]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setSecurityStatus({ type: 'info', message: 'Rotating_Entropy_Shield...' });
        
        if (securityData.newPassword !== securityData.confirmPassword) {
            setSecurityStatus({ type: 'error', message: 'Mismatched_Master_Key' });
            return;
        }

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: securityData.currentPassword,
                    newPassword: securityData.newPassword
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSecurityStatus({ type: 'success', message: 'Entropy_Shift_Complete' });
                setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setSecurityStatus({ type: 'error', message: data.message || 'Transmission_Failed' });
            }
        } catch (err) {
            setSecurityStatus({ type: 'error', message: 'Kernel_Security_Break' });
        }
    };

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('/api/analytics/summary', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCounts(data.counts);
                    setAnalyticsData({ charts: data.charts, topPages: data.topPages });
                }
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
            }
        };
        if (token) fetchAnalytics();
    }, [token]);

    const fetchCollectionData = async () => {
        if (['overview', 'media'].includes(activeTab)) return;
        setLoading(true);
        try {
            const url = activeTab === 'messages' ? '/api/messages' : 
                        ['builder', 'theme', 'navigation', 'seo', 'settings'].includes(activeTab) ? '/api/settings' :
                        `/api/${activeTab}`;
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setCollectionData(Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setCollectionData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleExport = async () => {
        try {
            const res = await fetch('/api/export', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `cms_backup_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
            }
        } catch (err) {
            console.error('Export failed:', err);
        }
    };

const handleFormSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setLoading(true);
        try {
            const isSettingsTab = ['builder', 'theme', 'navigation', 'seo', 'settings'].includes(activeTab);
            const settingsId = isSettingsTab ? collectionData[0]?._id : null;
            
            const method = isSettingsTab || editingId ? 'PUT' : 'POST';
            const url = isSettingsTab 
                ? `/api/settings/${settingsId}`
                : (editingId ? `/api/${activeTab}/${editingId}` : `/api/${activeTab}`);
            
            // Auto-generate slug for projects and blogs if not present
            const submissionData = { ...formData };
            if ((activeTab === 'projects' || activeTab === 'blogs') && !submissionData.slug) {
                submissionData.slug = generateSlug(submissionData.title || "");
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submissionData)
            });

            if (res.ok) {
                setIsFormOpen(false);
                setEditingId(null);
                setFormData({});
                fetchCollectionData();
                fetchCounts();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('IRREVERSIBLE ACTION: Confirm permanent erasure of document?')) return;
        try {
            const url = activeTab === 'messages' ? `/api/messages/${id}` : `/api/${activeTab}/${id}`;
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchCollectionData();
                fetchCounts();
            }
        } catch (err) {}
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData(item);
        setIsFormOpen(true);
    };

    const updateMessageStatus = async (message, newStatus) => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setCollectionData(collectionData.map(m => m._id === message._id ? { ...m, status: newStatus } : m));
            }
        } catch (err) {
            console.error('Failed to update message status:', err);
        }
    };

    const toggleReadStatus = async (m) => {
        try {
            const res = await fetch(`/api/messages/${m._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isRead: !m.isRead })
            });
            if (res.ok) fetchCollectionData();
        } catch (err) {}
    };

    const updateReviewStatus = async (item, status) => {
        try {
            const res = await fetch(`/api/testimonials/${item._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...item, status })
            });
            if (res.ok) fetchCollectionData();
        } catch (err) {}
    };

    const renderDynamicForm = () => {
        const schema = cmsSchemas[activeTab];
        if (!schema) return null;

        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--bg-glass)] backdrop-blur-2xl border border-[var(--border)] rounded-[40px] p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-4 mb-10 border-b border-[var(--border)] pb-8">
                    <div className="p-4 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl border border-[var(--accent)]/30">
                        <schema.icon size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase">
                            {editingId ? 'Modify_Module' : 'Deploy_New_Module'}
                        </h2>
                        <p className="text-[10px] font-black tracking-[0.3em] text-[var(--accent)] uppercase mt-1">
                            System_Config // {activeTab}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-8">
                    {schema.fields.map(field => {
                        // Skip if condition exists and returns false
                        if (field.condition && !field.condition(formData)) return null;
                        
                        return (
                            <div key={field.name} className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-50 flex items-center gap-2">
                                    <Activity size={10} className="text-[var(--accent)]" />
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                
                               {field.type === 'textarea' ? (
                                <textarea 
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-[var(--text-primary)] shadow-inner resize-none italic"
                                />
                            ) : field.type === 'markdown' ? (
                                <div className="space-y-4">
                                    <textarea 
                                        name={field.name}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        rows={12}
                                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-[var(--text-primary)] font-mono text-sm leading-relaxed"
                                        placeholder="# Start writing lore..."
                                    />
                                    <div className={`p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl prose prose-sm max-w-none ${activeTheme === 'dev-dark' ? 'prose-invert' : ''}`}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData[field.name] || '*Live Preview Initialized*'}</ReactMarkdown>
                                    </div>
                                </div>
                            ) : field.type === 'select' ? (
                                <select 
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-[var(--text-primary)] appearance-none cursor-pointer italic"
                                >
                                    <option value="" className="bg-[var(--bg-primary)]">Select Parameters...</option>
                                    {field.options.map(opt => <option key={opt} value={opt} className="bg-[var(--bg-primary)]">{opt}</option>)}
                                </select>
                            ) : field.type === 'image' ? (
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1 relative group">
                                        <input 
                                            type="text"
                                            name={field.name}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={handleInputChange}
                                            placeholder="Asset Cloud URL..."
                                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 transition-all text-[var(--text-primary)] italic"
                                        />
                                        <input 
                                            type="file" accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if(!file) return;
                                                const payload = new FormData();
                                                payload.append('image', file);
                                                try {
                                                    const res = await fetch('/api/upload', {
                                                        method: 'POST',
                                                        headers: { 'Authorization': `Bearer ${token}` },
                                                        body: payload
                                                    });
                                                    const data = await res.json();
                                                    setFormData(prev => ({ ...prev, [field.name]: data.url }));
                                                } catch (err) {}
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                    </div>
                                    {formData[field.name] && (
                                        <div className="w-16 h-16 rounded-xl border border-[var(--border)] overflow-hidden shrink-0 group relative">
                                            <img src={formData[field.name]} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <ImageIcon size={16} className="text-[var(--accent)]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : field.type === 'image-gallery' ? (
                                <div className="space-y-4 p-8 border border-[var(--border)] rounded-3xl bg-[var(--bg-secondary)]">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                        {(formData[field.name] || []).map((img, idx) => (
                                            <div key={idx} className="relative group rounded-2xl overflow-hidden border border-[var(--border)] aspect-square shadow-xl transition-all hover:scale-105">
                                                <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => {
                                                        const newArr = [...formData[field.name]];
                                                        newArr.splice(idx, 1);
                                                        setFormData(prev => ({ ...prev, [field.name]: newArr }));
                                                    }} 
                                                    className="absolute top-2 right-2 bg-red-500/80 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-2xl hover:border-[var(--accent)]/50 hover:bg-[var(--bg-glass)] transition-all cursor-pointer aspect-square group">
                                            <input 
                                                type="file" multiple accept="image/*"
                                                onChange={async (e) => {
                                                    const files = Array.from(e.target.files);
                                                    const urls = [];
                                                    for(let file of files) {
                                                        const payload = new FormData();
                                                        payload.append('images', file);
                                                        try {
                                                            const res = await fetch('/api/upload/bulk', {
                                                                method: 'POST',
                                                                headers: { 'Authorization': `Bearer ${token}` },
                                                                body: payload
                                                            });
                                                            const data = await res.json();
                                                            urls.push(...(data.data || [data.url]));
                                                        } catch (err) {}
                                                    }
                                                    setFormData(prev => ({ ...prev, [field.name]: [...(prev[field.name] || []), ...urls] }));
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                            />
                                            <Plus size={32} className="text-[var(--text-secondary)] opacity-20 group-hover:text-[var(--accent)] group-hover:scale-110 transition-all" />
                                            <span className="text-[10px] text-[var(--text-secondary)] opacity-30 font-black uppercase tracking-widest mt-2 group-hover:opacity-100 group-hover:text-[var(--text-primary)] transition-colors">Add_Visuals</span>
                                        </div>
                                    </div>
                                </div>
                            ) : field.type === 'skills-editor' ? (
                                <div className="space-y-4 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl">
                                    <textarea 
                                        name={field.name}
                                        required={field.required}
                                        placeholder='JSON skill data or comma-separated list...'
                                        value={typeof formData[field.name] === 'object' ? JSON.stringify(formData[field.name], null, 2) : formData[field.name] || ''}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setFormData(prev => ({ ...prev, [field.name]: val }));
                                        }}
                                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 text-[var(--text-primary)] font-mono text-xs h-32"
                                    />
                                    <p className="text-[10px] text-[var(--accent)] font-bold italic opacity-60 uppercase tracking-widest">Authorized_JSON_BUFFER_ONLY</p>
                                </div>
                            ) : field.type === 'project-builder' ? (
                                <ProjectBlocksBuilder 
                                    sections={formData[field.name]?.sections || []} 
                                    onChange={(newSections) => setFormData(prev => ({ 
                                        ...prev, 
                                        [field.name]: { ...prev[field.name], sections: newSections } 
                                    }))} 
                                />
                            ) : field.type === 'project-code-editor' ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full px-6 py-3 w-fit">
                                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Monitor size={14}/></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Custom_Case_Study_Compiler</span>
                                    </div>
                                    <div className="relative group/custom">
                                        <textarea 
                                            name={field.name}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={handleInputChange}
                                            rows={20}
                                            className="w-full bg-black/40 border border-[var(--border)] rounded-[32px] p-10 font-mono text-xs leading-relaxed text-[#a9b1d6] outline-none shadow-2xl focus:border-[var(--accent)]/40 transition-all font-mono"
                                            placeholder="<html>\n  <section>\n    <h1>Special Layout</h1>\n  </section>\n</html>"
                                        />
                                        <div className="absolute top-6 right-8 text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">Advanced_Authoring_Layer</div>
                                    </div>
                                    <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] prose prose-invert max-w-none min-h-[100px]">
                                        <div dangerouslySetInnerHTML={{ __html: formData[field.name] || '<p class="opacity-20 italic">Awaiting_Source_Compilation...</p>' }} />
                                    </div>
                                </div>
                            ) : (
                                <input 
                                    type={field.type}
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-[var(--text-primary)] shadow-inner block italic" 
                                />
                            )}
                        </div>
                    );
                })}
                    
                    <div className="pt-10 mt-10 flex justify-end gap-6 border-t border-[var(--border)]">
                        <button 
                            type="button" 
                            onClick={() => { setIsFormOpen(false); setEditingId(null); }}
                            className="px-8 py-3 rounded-2xl font-black text-[var(--text-secondary)] opacity-30 hover:opacity-100 hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all text-[10px] uppercase tracking-widest"
                        >
                            Abort_Protocol
                        </button>
                        <button 
                            type="submit" 
                            className="px-10 py-3 rounded-2xl font-black text-black bg-[var(--accent)] hover:scale-105 transition-all shadow-[0_0_30px_var(--accent-glow)] text-[10px] uppercase tracking-widest"
                        >
                            {editingId ? 'Modify_Data' : 'Deploy_Live'}
                        </button>
                    </div>
                </form>
            </motion.div>
        );
    };

    const renderSecuritySettings = () => {
        return (
            <div className="max-w-4xl mx-auto py-12">
                <div className="bg-[var(--bg-glass)] border border-[var(--border)] rounded-[48px] p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent pointer-events-none" />
                    <ShieldCheck size={300} className="absolute -top-20 -right-20 text-[var(--accent)]/[0.02] pointer-events-none" />

                    <div className="relative z-10 mb-16">
                        <h3 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-4">Security_Core</h3>
                        <p className="text-[10px] font-black tracking-[0.4em] text-[var(--text-secondary)] opacity-40 uppercase italic">Credential_Rotation_Nexus // Orbit_01</p>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-12 relative z-10">
                        {securityStatus.message && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-6 rounded-2xl border flex items-center gap-4 text-xs font-black uppercase tracking-widest italic ${securityStatus.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' : securityStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]'}`}
                            >
                                <Zap size={18} /> {securityStatus.message}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 flex items-center gap-2">
                                    <Activity size={12} className="text-[var(--accent)]" /> 
                                    Current_User_Hash
                                </label>
                                <input 
                                    type="password"
                                    required
                                    value={securityData.currentPassword}
                                    onChange={(e) => setSecurityData(prev => ({...prev, currentPassword: e.target.value}))}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-6 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-sm font-black italic text-[var(--text-primary)]"
                                    placeholder="••••••••••••"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 flex items-center gap-2">
                                    <Radio size={12} className="text-[var(--accent)]" /> 
                                    New_Entropy_Shift
                                </label>
                                <input 
                                    type="password"
                                    required
                                    value={securityData.newPassword}
                                    onChange={(e) => setSecurityData(prev => ({...prev, newPassword: e.target.value}))}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-6 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-sm font-black italic text-[var(--text-primary)]"
                                    placeholder="••••••••••••"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 flex items-center gap-2">
                                    <CheckCircle size={12} className="text-[var(--accent)]" /> 
                                    Confirm_Master_Key
                                </label>
                                <input 
                                    type="password"
                                    required
                                    value={securityData.confirmPassword}
                                    onChange={(e) => setSecurityData(prev => ({...prev, confirmPassword: e.target.value}))}
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-6 py-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] transition-all text-sm font-black italic text-[var(--text-primary)]"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-10 flex justify-end">
                            <PremiumButton type="submit" label="Invoke_Entropy_Shift" icon={Zap} />
                        </div>
                    </form>

                    <div className="mt-20 p-8 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-3xl">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0 shadow-lg shadow-[var(--accent-glow)]"><Shield size={22}/></div>
                            <div className="space-y-4 flex-1">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Data_Exfiltration_Protocol</h4>
                                <p className="text-[10px] font-medium leading-relaxed italic text-[var(--text-secondary)] opacity-60">
                                    Extract all database collectives into a singular JSON carrier signal for archival or migration purposes.
                                </p>
                                <button 
                                    onClick={handleExport}
                                    className="w-full mt-4 py-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase italic text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all shadow-xl flex items-center justify-center gap-3 group"
                                >
                                    <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                                    Initialize_Export_Protocol
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 p-8 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-3xl">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0 shadow-lg shadow-[var(--accent-glow)]"><Shield size={22}/></div>
                            <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Security_Advisor_Protocol</h4>
                                <p className="text-[10px] font-medium leading-relaxed italic text-[var(--text-secondary)] opacity-60">
                                    Ensure your master key contains at least 12 symbols of high complexity (Mix of uppercase, numerals, and special chars). Avoid recycling keys from previously breached archives. Your safety depends on entropy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderReviewList = () => {
        const filteredReviews = collectionData.filter(r => {
            if (reviewFilter === 'all') return true;
            return r.status === reviewFilter;
        });

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <div className="flex bg-[var(--bg-glass)] p-1.5 rounded-[22px] border border-[var(--border)] shrink-0 backdrop-blur-md">
                        {['all', 'pending', 'approved', 'rejected'].map(f => (
                            <button
                                key={f}
                                onClick={() => setReviewFilter(f)}
                                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic flex items-center gap-3 ${reviewFilter === f ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_var(--accent-glow)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'}`}
                            >
                                {f}
                                {f === 'pending' && <span className="bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded-lg text-[9px] border border-orange-500/30">{collectionData.filter(d => r.status === 'pending').length}</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredReviews.length === 0 ? (
                    <div className="py-24 text-center border border-[var(--border)] rounded-[40px] bg-[var(--bg-secondary)] shadow-sm backdrop-blur-md">
                        <Star size={32} className="mx-auto mb-6 text-[var(--text-secondary)] opacity-10" />
                        <h3 className="text-xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2">No_Reviews_Detected</h3>
                        <p className="text-[var(--text-secondary)] opacity-30 text-[10px] font-bold uppercase tracking-widest">Awaiting system feedback transmissions...</p>
                    </div>
                ) : (
                    filteredReviews.map((item, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item._id} 
                            className={`flex flex-col md:flex-row justify-between items-start md:items-center group relative overflow-hidden transition-all bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl shadow-xl hover:border-[var(--accent)]/30 ${item.status === 'pending' ? 'border-l-4 border-l-orange-500' : item.status === 'approved' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-red-500 opacity-60'}`}
                        >
                            <div className="flex-1 pl-8 w-full pr-6 flex flex-col justify-center py-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <h3 className="font-black text-[var(--text-primary)] text-xl italic tracking-tight truncate">
                                        {item.name}
                                    </h3>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < item.rating ? "var(--accent)" : "none"} className={i < item.rating ? "text-[var(--accent)] drop-shadow-[0_0_5px_var(--accent-glow)]" : "text-[var(--text-secondary)] opacity-20"} />
                                        ))}
                                    </div>
                                    <span className={`text-[8px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-current ${item.status === 'pending' ? 'text-orange-500' : item.status === 'approved' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.status || 'pending'}
                                    </span>
                                </div>
                                <p className="text-lg text-[var(--text-secondary)] font-bold italic leading-relaxed mb-4 max-w-3xl">
                                    "{item.quote}"
                                </p>
                                <div className="flex gap-4 text-[9px] text-[var(--text-secondary)] opacity-40 mt-2 font-black uppercase tracking-[0.2em] italic">
                                    <span className="text-[var(--accent)]">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    <span>&bull;</span>
                                    <span className="truncate">{item.role} {item.company ? `| ${item.company}` : ''}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap md:flex-nowrap gap-3 p-6 items-center w-full md:w-auto bg-[var(--bg-glass)] md:bg-transparent border-t md:border-t-0 border-[var(--border)]">
                                {item.status !== 'approved' && (
                                    <button 
                                        onClick={() => updateReviewStatus(item, 'approved')}
                                        className="px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all flex-1 md:flex-none italic"
                                    >
                                        Authorize
                                    </button>
                                )}
                                {item.status !== 'rejected' && (
                                    <button 
                                        onClick={() => updateReviewStatus(item, 'rejected')}
                                        className="px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-2xl transition-all flex-1 md:flex-none italic"
                                    >
                                        Discard
                                    </button>
                                )}
                                <div className="w-px h-10 bg-[var(--border)] hidden md:block mx-1"></div>
                                <button onClick={() => handleEdit(item)} className="p-3 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--accent)] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all"><Edit size={18} /></button>
                                <button onClick={() => handleDelete(item._id)} className="p-3 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-red-500 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all"><Trash2 size={18} /></button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        );
    };

    const renderDataList = () => {
        if (loading) return <div className="flex justify-center mt-32"><div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_var(--accent-glow)]"></div></div>;
        if (activeTab === 'testimonials') return renderReviewList();
        
        if (!collectionData || collectionData.length === 0) {
            return (
                <div className="py-32 text-center border border-[var(--border)] rounded-[50px] mt-10 bg-[var(--bg-secondary)] shadow-2xl backdrop-blur-xl group">
                    <div className="w-20 h-20 bg-[var(--bg-primary)] border border-[var(--border)] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[var(--text-secondary)] opacity-10 group-hover:text-[var(--accent)] transition-all">
                        <Database size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2">No_Data_Segments</h3>
                    <p className="text-[var(--text-secondary)] opacity-30 text-[10px] font-black tracking-widest uppercase mb-8">System memory currently initialized but empty.</p>
                    <PremiumButton onClick={() => setIsFormOpen(true)} className="mx-auto scale-90">Initialize_New_Segment</PremiumButton>
                </div>
            );
        }

        const schema = cmsSchemas[activeTab];

        return (
            <div className="grid gap-6 mt-8">
                {collectionData.map((item, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item._id} 
                        className="flex justify-between items-center group relative overflow-hidden transition-all bg-[var(--bg-glass)] border border-[var(--border)] rounded-[32px] shadow-xl hover:border-[var(--accent)]/30 hover:bg-[var(--bg-secondary)] pr-4"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom shadow-[0_0_20px_var(--accent-glow)]"></div>
                        
                        {(item.coverImage || item.image || item.avatar) && (
                            <div className="p-4 shrink-0 relative z-10">
                                <img src={item.coverImage || item.image || item.avatar} alt="cover" className="h-20 w-24 object-cover rounded-2xl border border-[var(--border)] shadow-lg group-hover:scale-105 transition-transform" />
                            </div>
                        )}

                        <div className={`pl-6 w-full pr-8 flex flex-col justify-center py-6 relative z-10 min-w-0 ${(item.coverImage || item.image || item.avatar) ? '' : 'pl-10'}`}>
                            <h3 className="font-black text-[var(--text-primary)] text-xl italic tracking-tight mb-1 truncate group-hover:text-[var(--accent)] transition-colors">
                                {item[schema.titleKey] || 'Untitled_Object'}
                            </h3>
                            <p className="text-[11px] text-[var(--text-secondary)] opacity-40 font-bold italic line-clamp-1 group-hover:opacity-60 transition-colors uppercase tracking-wide">
                                {item[schema.descKey] || ''}
                            </p>
                            <div className="flex gap-4 text-[9px] text-[var(--text-secondary)] opacity-20 mt-4 font-black uppercase tracking-[0.2em] italic">
                                <span className="text-[var(--accent)] truncate">ID: {item._id.slice(-6)}</span>
                                {(item.category || item.status) && <span>&bull;</span>}
                                {item.status && <span className="px-2 py-0.5 border border-blue-500/30 text-blue-500 rounded-lg">{item.status}</span>}
                                {item.category && <span className="text-[var(--text-primary)] opacity-60 truncate">{item.category}</span>}
                            </div>
                        </div>
                        
                        <div className="flex gap-3 items-center shrink-0 relative z-10">
                            <button onClick={() => handleEdit(item)} className="p-3.5 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--accent)] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all group-hover:scale-110"><Edit size={20} /></button>
                            {activeTab !== 'settings' && (
                                <button onClick={() => handleDelete(item._id)} className="p-3.5 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-red-500 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all group-hover:scale-110"><Trash2 size={20} /></button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    const renderInbox = () => {
        const filteredMessages = collectionData.filter(m => {
            const matchesSearch = m.name?.toLowerCase().includes(inboxSearch.toLowerCase()) || 
                                 m.email?.toLowerCase().includes(inboxSearch.toLowerCase()) || 
                                 m.message?.toLowerCase().includes(inboxSearch.toLowerCase());
            const matchesFilter = inboxFilter === 'all' || 
                                 (inboxFilter === 'unread' && !m.isRead) || 
                                 (inboxFilter === 'read' && m.isRead);
            return matchesSearch && matchesFilter;
        });

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <div className="relative flex-grow group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search crypted transmissions..." 
                            value={inboxSearch}
                            onChange={(e) => setInboxSearch(e.target.value)}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[22px] py-4 pl-14 pr-6 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--bg-glass)] shadow-2xl transition-all text-[var(--text-primary)] font-bold italic text-sm"
                        />
                    </div>
                    <div className="flex bg-[var(--bg-secondary)] p-1.5 rounded-[22px] border border-[var(--border)] backdrop-blur-md">
                        {['all', 'unread', 'read'].map(f => (
                            <button
                                key={f}
                                onClick={() => setInboxFilter(f)}
                                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic ${inboxFilter === f ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_var(--accent-glow)]' : 'text-[var(--text-secondary)] opacity-60 hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredMessages.length === 0 ? (
                    <div className="py-32 text-center border border-[var(--border)] rounded-[40px] bg-[var(--bg-secondary)] shadow-2xl backdrop-blur-xl">
                        <MessageSquare size={36} className="mx-auto mb-6 text-[var(--text-secondary)] opacity-10" />
                        <h3 className="text-2xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-2">Inbox_Clear</h3>
                        <p className="text-[var(--text-secondary)] opacity-30 text-[10px] font-black tracking-widest uppercase">No incoming transmissions detected in this frequency center.</p>
                    </div>
                ) : (
                    filteredMessages.map((m, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={m._id} 
                            className={`relative group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] transition-all ${!m.isRead ? 'border-l-4 border-l-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.05)]' : 'opacity-60'}`}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full p-8">
                                <div className="w-full shrink-0 md:w-72">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className={`font-black text-xl italic tracking-tight ${!m.isRead ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-50'}`}>
                                            {m.name}
                                        </h3>
                                        {!m.isRead && <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] animate-pulse"></span>}
                                    </div>
                                    <a href={`mailto:${m.email}`} className="text-[10px] font-black tracking-widest text-[var(--accent)] uppercase hover:text-[var(--text-primary)] transition-colors">{m.email}</a>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-30 mt-6 italic">
                                        Timestamp // {new Date(m.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex-grow w-full">
                                    <div className={`p-6 rounded-3xl text-lg italic leading-relaxed ${m.isRead ? 'text-[var(--text-secondary)] opacity-50' : 'bg-[var(--bg-primary)] text-[var(--text-primary)] font-bold shadow-inner border border-[var(--border)]'}`}>
                                        "{m.message}"
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {['NEW', 'CONTACTED', 'WON', 'ARCHIVED'].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => updateMessageStatus(m, s)}
                                                className={`px-4 py-1.5 rounded-xl text-[8px] font-black tracking-widest uppercase transition-all border ${m.status === s ? 'bg-[var(--accent)] text-black border-[var(--accent)] shadow-lg scale-105' : 'text-[var(--text-secondary)] border-[var(--border)] opacity-30 hover:opacity-100 hover:border-[var(--accent)]/50'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex md:flex-col gap-3 shrink-0 self-end md:self-auto opacity-0 group-hover:opacity-100 transition-all">
                                    <button 
                                        onClick={() => toggleReadStatus(m)}
                                        className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3 italic ${m.isRead ? 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] opacity-50 hover:opacity-100 hover:text-[var(--text-primary)]' : 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_var(--accent-glow)]'}`}
                                    >
                                        {m.isRead ? 'Set_Unread' : 'Authorize_Read'}
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(m._id)}
                                        className="p-3.5 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-red-500 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl transition-all flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30"
                                        title="Erase Memory"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        );
    };

    const renderOverview = () => (
        <div className="space-y-12 pb-20">
            {/* System Pulse Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Active Projects', value: counts?.projects || 0, icon: FolderGit2, color: 'text-[var(--accent)]', glow: 'shadow-[var(--accent-glow)]', trend: 'Systems_Stable' },
                    { label: 'Cloud Records', value: counts?.blogs || 0, icon: FileText, color: 'text-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]', trend: 'Sync_Complete' },
                    { label: 'Secure Inbox', value: counts?.messages || 0, icon: MessageSquare, color: 'text-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]', trend: 'Encrypted' },
                    { label: 'Network Reach', value: '4.2k', icon: Globe, color: 'text-purple-500', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]', trend: 'Expanding' }
                ].map((stat, index) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={index} 
                        className="bg-[var(--bg-secondary)] backdrop-blur-2xl p-8 border border-[var(--border)] rounded-[32px] shadow-2xl hover:border-[var(--accent)]/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
                        <div className="flex justify-between items-start mb-6 relative z-10 w-full">
                            <div className={`p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] ${stat.color} ${stat.glow}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-[var(--text-secondary)] opacity-30 uppercase italic border-b border-[var(--border)] pb-1">{stat.trend}</span>
                        </div>
                        <h3 className="text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-1 mt-auto italic drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">{stat.value}</h3>
                        <p className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] opacity-50 uppercase mt-2 italic">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tactical Intel Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-2 bg-[var(--bg-secondary)] backdrop-blur-2xl border border-[var(--border)] rounded-[40px] p-10 shadow-3xl">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20"><TrendingUp size={20}/></div>
                            <h3 className="text-xl font-black text-[var(--text-primary)] italic tracking-tight uppercase">Traffic_Telemetry</h3>
                        </div>
                        <select className="bg-[var(--bg-primary)] border border-[var(--border)] text-[9px] font-black px-4 py-2 rounded-xl text-[var(--text-primary)] outline-none uppercase tracking-widest cursor-pointer hover:border-[var(--accent)] transition-all">
                            <option className="bg-[var(--bg-primary)]">Era_Current</option>
                            <option className="bg-[var(--bg-primary)]">Historical_logs</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.charts.dailyViews.length > 0 ? analyticsData.charts.dailyViews : [
                                { name: 'No Data', views: 0, visitors: 0 }
                            ]}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-primary)" fontSize={10} tickLine={false} axisLine={false} dy={10} fontStyle="italic" fontWeight="900" />
                                <YAxis stroke="var(--text-primary)" fontSize={10} tickLine={false} axisLine={false} dx={-10} fontStyle="italic" fontWeight="900" />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: '20px', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 'bold', backdropBlur: '10px' }}/>
                                <Area type="monotone" dataKey="views" stroke="var(--accent)" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-span-1 bg-[var(--bg-secondary)] backdrop-blur-2xl border border-[var(--border)] rounded-[40px] p-10 shadow-3xl flex flex-col">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20"><Globe size={20}/></div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] italic tracking-tight uppercase">Top_Segments</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        {analyticsData.topPages.length > 0 ? analyticsData.topPages.map((page, pidx) => (
                            <div key={pidx} className="flex justify-between items-center p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl group hover:border-[var(--accent)] transition-all">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">/{page._id}</span>
                                    <span className="text-[8px] font-bold opacity-30 uppercase italic">Segment_Frequency</span>
                                </div>
                                <div className="text-xl font-black italic">{page.count}</div>
                            </div>
                        )) : (
                            <div className="text-center py-10 opacity-20 text-[10px] font-black uppercase tracking-widest">Collecting_Data...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: 'Secure Inbox', desc: 'Review Crypt Transmissions', id: 'messages', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { title: 'System Parameters', desc: 'Global Logic Control', id: 'settings', icon: Settings, color: 'text-[var(--text-secondary)]', bg: 'bg-[var(--bg-secondary)]' },
                    { title: 'Asset Nexus', desc: 'Central Visual Library', id: 'media', icon: Database, color: 'text-[var(--accent)]', bg: 'bg-[var(--accent)]/10' },
                    { title: 'Dev Stack', desc: 'Modular Tech Toolkit', id: 'skills', icon: Code2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                ].map((panel) => (
                    <div 
                        key={panel.id}
                        onClick={() => navigate(`/admin/${panel.id}`)} 
                        className="bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border)] rounded-[32px] p-6 shadow-xl hover:border-[var(--accent)]/30 transition-all cursor-pointer flex flex-col gap-6 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><panel.icon size={80} className="text-[var(--text-primary)]" /></div>
                        <div className={`w-14 h-14 ${panel.bg} ${panel.color} rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-inner group-hover:scale-110 transition-transform`}>
                            <panel.icon size={28} />
                        </div>
                        <div>
                            <h4 className="font-black text-[var(--text-primary)] text-lg italic tracking-tight uppercase">{panel.title}</h4>
                            <p className="text-[9px] text-[var(--text-secondary)] opacity-50 uppercase tracking-[0.2em] font-black mt-1">{panel.desc}</p>
                        </div>
                        <div className="mt-auto flex justify-end"><ChevronRight size={18} className="text-[var(--text-secondary)] opacity-10 group-hover:text-[var(--accent)] group-hover:opacity-100 transition-all" /></div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden selection:bg-[var(--accent)]/30 font-sans">
            <FluidBackground />
            
            <AdminSidebar 
                activeTab={activeTab} 
                navigate={navigate} 
                logout={logout} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10 transition-all">
                <AdminTopbar activeTab={activeTab} setIsFormOpen={setIsFormOpen} />

                <main className="flex-1 overflow-y-auto p-8 md:p-14 scrollbar-hide">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-[1600px] mx-auto"
                        >
                            {activeTab === 'overview' && renderOverview()}
                            {activeTab === 'messages' && renderInbox()}
                            {activeTab === 'media' && <MediaManager adminToken={token} />}
                            {activeTab === 'security' && renderSecuritySettings()}
                            
                            {/* New CMS Production Tabs */}
                            {activeTab === 'builder' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase">Visual_Page_Pilot</h2>
                                            <p className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] opacity-50 uppercase mt-1">Homepage_Constructor // Block_Mode</p>
                                        </div>
                                    </div>
                                    <PageBuilder 
                                        blocks={collectionData[0]?.blocks || []} 
                                        onChange={(blocks) => setCollectionData([{ ...collectionData[0], blocks }])}
                                        token={token}
                                    />
                                    <div className="flex justify-end pt-6">
                                        <PremiumButton label="Deploy_Block_Matrix" icon={Zap} onClick={() => handleFormSubmit({ preventDefault: () => {} })} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'theme' && (
                                <div className="max-w-4xl mx-auto">
                                    <ThemeCustomizer 
                                        settings={collectionData[0]} 
                                        onSave={(themeData) => {
                                            setFormData({ ...collectionData[0], ...themeData });
                                            handleFormSubmit({ preventDefault: () => {} });
                                        }}
                                        loading={loading}
                                    />
                                </div>
                            )}

                            {activeTab === 'navigation' && (
                                <div className="max-w-4xl mx-auto">
                                    <NavigationBuilder 
                                        navItems={collectionData[0]?.navItems || []} 
                                        onSave={(navItems) => {
                                            setFormData({ ...collectionData[0], navItems });
                                            handleFormSubmit({ preventDefault: () => {} });
                                        }}
                                        loading={loading}
                                    />
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="max-w-6xl mx-auto">
                                    <SEOManager 
                                        pagesSEO={collectionData[0]?.pagesSEO || []} 
                                        onSave={(pagesSEO) => {
                                            setFormData({ ...collectionData[0], pagesSEO });
                                            handleFormSubmit({ preventDefault: () => {} });
                                        }}
                                        loading={loading}
                                    />
                                </div>
                            )}

                            {!['overview', 'messages', 'media', 'security', 'builder', 'theme', 'navigation', 'seo'].includes(activeTab) && isFormOpen && renderDynamicForm()}
                            {!['overview', 'messages', 'media', 'security', 'builder', 'theme', 'navigation', 'seo'].includes(activeTab) && !isFormOpen && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] rounded-2xl shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]">
                                                {cmsSchemas[activeTab]?.icon && React.createElement(cmsSchemas[activeTab].icon, { size: 24 })}
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase">{activeTab}_Segments</h2>
                                                <p className="text-[10px] font-black tracking-[0.3em] text-[var(--text-secondary)] opacity-50 uppercase mt-1">Authorized_Data_Layer</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setIsFormOpen(true)}
                                            className="flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase italic transition-all shadow-[0_0_30px_var(--accent-glow)] hover:scale-105 active:scale-95"
                                        >
                                            <Plus size={18} /> Initialize_New
                                        </button>
                                    </div>
                                    {renderDataList()}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
