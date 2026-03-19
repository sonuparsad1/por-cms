import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { Database, FolderGit2, MessageSquare, LogOut, Plus, Trash2, Edit, FileText, Award, Star, Settings, ShieldCheck, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PremiumButton from '../components/ui/PremiumButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const cmsSchemas = {
    settings: {
        icon: Settings,
        titleKey: 'siteName',
        descKey: 'homepageTemplate',
        fields: [
            { name: 'siteName', label: 'Global Website Title', type: 'text', required: true },
            { name: 'siteDescription', label: 'Global Description & Meta', type: 'text', required: true },
            { name: 'homepageTemplate', label: 'Homepage Global Template', type: 'select', options: ['Centered Hero', 'Split Screen', 'Animated Intro', 'Futuristic AI'], required: true },
            { name: 'globalTheme', label: 'Forced Theme Override', type: 'select', options: ['light', 'dark', 'system'], required: true },
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
        descKey: 'shortDescription',
        fields: [
            { name: 'title', label: 'Project Title', type: 'text', required: true },
            { name: 'shortDescription', label: 'Short Description', type: 'text', required: true },
            { name: 'fullContent', label: 'Full Markdown Content', type: 'markdown', required: true },
            { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'text', required: false },
            { name: 'category', label: 'Category', type: 'select', options: ['AI/ML', 'IoT', 'Web Development', 'Other'], required: true },
            { name: 'status', label: 'Status', type: 'select', options: ['Completed', 'Ongoing', 'Planned'], required: true },
            { name: 'coverImage', label: 'Cover Image', type: 'image', required: false },
            { name: 'galleryImages', label: 'Project Gallery (Multi-Upload)', type: 'image-gallery', required: false },
            { name: 'githubUrl', label: 'GitHub URL', type: 'url', required: false },
            { name: 'liveDemoUrl', label: 'Live Demo URL', type: 'url', required: false }
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
            { name: 'coverImage', label: 'Cover Image', type: 'image', required: false }
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
            { name: 'image', label: 'Certificate Image', type: 'image', required: false },
            { name: 'credentialUrl', label: 'Credential Link', type: 'url', required: false }
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
    }
};

const AdminDashboard = () => {
    const { logout, token } = useContext(AuthContext);
    const { tab } = useParams();
    const navigate = useNavigate();
    
    // Default to overview if no tab matches
    const activeTab = Object.keys(cmsSchemas).includes(tab) || tab === 'messages' ? tab : 'overview';
    
    const [collectionData, setCollectionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [inboxSearch, setInboxSearch] = useState('');
    const [counts, setCounts] = useState({ projects: 0, blogs: 0, messages: 0 });
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchCollectionData();
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    }, [activeTab]);

    const fetchCollectionData = async () => {
        if (activeTab === 'overview') {
            setLoading(true);
            try {
                const res = await fetch('/api/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCounts(data);
                }
            } catch (err) {
                console.error('Stats fetch error:', err);
            } finally {
                setLoading(false);
            }
            return;
        }
        setLoading(true);
        try {
            const headers = activeTab === 'messages' ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch(`/api/${activeTab}`, { headers });
            const data = await res.json();
            setCollectionData(data.data || []);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this document permanently?")) return;

        try {
            const res = await fetch(`/api/${activeTab}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchCollectionData();
            } else {
                alert('Failed to delete document');
            }
        } catch (err) {
            console.error('Delete Error:', err);
            alert('Delete network error.');
        }
    };

    const toggleReadStatus = async (message) => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ isRead: !message.isRead })
            });
            if (res.ok) fetchCollectionData();
        } catch (err) {
            console.error('Toggle Read Error:', err);
        }
    };

    const handleEdit = (item) => {
        let prepopulatedData = { ...item };
        
        // Convert Arrays
        if (activeTab === 'projects' && Array.isArray(item.techStack)) {
            prepopulatedData.techStack = item.techStack.join(', ');
        }
        
        // Convert Dates
        if (item.dateIssued) prepopulatedData.dateIssued = new Date(item.dateIssued).toISOString().split('T')[0];
        if (item.date) prepopulatedData.date = new Date(item.date).toISOString().split('T')[0];
        
        // Convert Numbers to string for selects
        if (item.rating) prepopulatedData.rating = item.rating.toString();

        setFormData(prepopulatedData);
        setEditingId(item._id);
        setIsFormOpen(true);
    };

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Optimistic UI Preview
        const loaderPreview = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, [fieldName]: loaderPreview }));
        
        const formDataPayload = new FormData();
        formDataPayload.append('image', file);
        
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataPayload
            });
            const data = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, [fieldName]: data.url }));
            } else {
                alert('Upload failed: ' + data.message);
                setFormData(prev => ({ ...prev, [fieldName]: '' })); // Revert on fail
            }
        } catch (err) {
            console.error('Upload Error:', err);
            alert('Upload network error.');
            setFormData(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = { ...formData };
            
            // Generate URL Slugs automatically
            if (activeTab === 'projects' || activeTab === 'blogs') {
                payload.slug = generateSlug(payload.title);
            }
            
            // Parse Arrays
            if (activeTab === 'projects' && typeof payload.techStack === 'string') {
                payload.techStack = payload.techStack.split(',').map(t => t.trim()).filter(t => t);
            }

            // Parse Numbers
            if (activeTab === 'testimonials' && payload.rating) {
                payload.rating = Number(payload.rating);
            }

            const url = editingId ? `/api/${activeTab}/${editingId}` : `/api/${activeTab}`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server API Rejection:", errorData);
                alert(`Error saving to database!\nReason: ${errorData.message}\nCheck browser console for exact details.`);
                return;
            }
            
            // If response is OK
            setIsFormOpen(false);
            setEditingId(null);
            setFormData({});
            fetchCollectionData(); // Fixed typo from fetchData to fetchCollectionData
        } catch (err) {
            console.error("Save error", err);
            alert("Network error while trying to save the form.");
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderDynamicForm = () => {
        const schema = cmsSchemas[activeTab];
        if (!schema) return null;

        return (
            <GlassCard className="max-w-3xl border-t-4 border-coffee-500 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-coffee-900 dark:text-coffee-100 flex items-center gap-2">
                    {editingId ? <Edit size={20} className="text-coffee-500" /> : <Plus size={20} className="text-coffee-500" />} 
                    {editingId ? 'Edit Existing Record' : 'Deploy New Record'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-5 pb-2">
                    {schema.fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-xs font-bold text-coffee-800 dark:text-coffee-200 mb-2 uppercase tracking-widest opacity-80 flex items-center gap-2">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            
                            {field.type === 'markdown' ? (
                                <div className="flex flex-col xl:flex-row gap-4 h-[400px]">
                                    <textarea 
                                        name={field.name}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        placeholder="Use Markdown formatting here... (# Header, **bold**, etc.)"
                                        className="w-full xl:w-1/2 h-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-4 outline-none resize-none focus:ring-2 focus:ring-coffee-500/50 font-mono text-sm leading-relaxed text-coffee-900 dark:text-coffee-100"
                                    />
                                    <div className="w-full xl:w-1/2 h-full bg-white/40 dark:bg-black/40 border border-coffee-200 dark:border-white/10 rounded-xl p-5 overflow-y-auto prose dark:prose-invert max-w-none text-sm leading-snug">
                                        {formData[field.name] ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                                {formData[field.name]}
                                            </ReactMarkdown>
                                        ) : (
                                            <div className="h-full flex items-center justify-center opacity-30 font-bold font-mono tracking-widest uppercase">Live Markdown Preview</div>
                                        )}
                                    </div>
                                </div>
                            ) : field.type === 'tags' ? (
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2 min-h-8">
                                        {(formData[field.name] || []).map((tag, idx) => (
                                            <span key={idx} className="bg-coffee-200 dark:bg-coffee-900/50 text-coffee-800 dark:text-coffee-200 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 border border-coffee-300 dark:border-white/10">
                                                #{tag}
                                                <button type="button" onClick={() => {
                                                    const newArr = [...formData[field.name]];
                                                    newArr.splice(idx, 1);
                                                    setFormData(prev => ({...prev, [field.name]: newArr}));
                                                }} className="hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                                            </span>
                                        ))}
                                    </div>
                                    <input 
                                        type="text"
                                        placeholder="Type a tag and press Enter..."
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter' || e.key === ',') {
                                                e.preventDefault();
                                                const val = e.target.value.trim().replace(/^#/, '');
                                                if(val && !(formData[field.name] || []).includes(val)) {
                                                    setFormData(prev => ({...prev, [field.name]: [...(prev[field.name] || []), val]}));
                                                }
                                                e.target.value = '';
                                            }
                                        }}
                                        className="w-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-coffee-500/50 transition-shadow text-coffee-900 dark:text-coffee-100"
                                    />
                                    <p className="text-[10px] text-coffee-500 uppercase tracking-widest mt-1">Press Enter to add tag.</p>
                                </div>
                            ) : field.type === 'textarea' ? (
                                <textarea 
                                    name={field.name}
                                    required={field.required}
                                    rows="5"
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-3 outline-none resize-y focus:ring-2 focus:ring-coffee-500/50 transition-shadow text-coffee-900 dark:text-coffee-100" 
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-coffee-500/50 transition-shadow text-coffee-900 dark:text-coffee-100"
                                >
                                    <option value="" disabled>Select {field.label}</option>
                                    {field.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : field.type === 'image' ? (
                                <div className="relative group p-6 border-2 border-dashed border-coffee-300 dark:border-white/20 rounded-xl hover:border-coffee-500 hover:bg-white/5 transition-all text-center cursor-pointer overflow-hidden max-w-sm mx-auto">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, field.name)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />
                                    {formData[field.name] ? (
                                        <div className="relative z-10 flex flex-col items-center">
                                            <img src={formData[field.name]} alt="Preview" className="h-40 object-contain rounded-lg shadow-md mb-3 border border-coffee-200 dark:border-white/10" />
                                            <span className="text-xs font-bold uppercase tracking-widest bg-coffee-900/80 text-white dark:bg-black/80 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">Click to Replace</span>
                                        </div>
                                    ) : (
                                        <div className="relative z-10 flex flex-col items-center gap-3 text-coffee-600 dark:text-coffee-400 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <div className="p-3 bg-coffee-100 dark:bg-white/5 rounded-full"><ImageIcon size={28} /></div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold">Drop Image or Click</span>
                                                <span className="text-xs opacity-70">JPG, PNG, WEBP (Max 10MB)</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : field.type === 'image-gallery' ? (
                                <div className="space-y-3 p-4 border border-coffee-200 dark:border-white/10 rounded-xl bg-white/30 dark:bg-[#0c0c0c]/50">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {(formData[field.name] || []).map((img, idx) => (
                                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-coffee-200 dark:border-white/10 aspect-square">
                                                <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => {
                                                        const newArr = [...formData[field.name]];
                                                        newArr.splice(idx, 1);
                                                        setFormData(prev => ({ ...prev, [field.name]: newArr }));
                                                    }} 
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="relative flex flex-col items-center justify-center p-2 border-2 border-dashed border-coffee-300 dark:border-white/20 rounded-lg hover:border-coffee-500 hover:bg-white/10 transition-colors cursor-pointer aspect-square">
                                            <input 
                                                type="file" multiple accept="image/*"
                                                onChange={async (e) => {
                                                    const files = Array.from(e.target.files);
                                                    const urls = [];
                                                    for(let file of files) {
                                                        const payload = new FormData();
                                                        payload.append('image', file);
                                                        try {
                                                            const res = await fetch('/api/upload', {
                                                                method: 'POST',
                                                                headers: { 'Authorization': `Bearer ${token}` },
                                                                body: payload
                                                            });
                                                            if(res.ok) {
                                                                const data = await res.json();
                                                                urls.push(data.url);
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                        }
                                                    }
                                                    setFormData(prev => ({ ...prev, [field.name]: [...(prev[field.name] || []), ...urls] }));
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                            />
                                            <Plus size={24} className="text-coffee-400 mb-1" />
                                            <span className="text-[10px] text-coffee-500 font-bold uppercase tracking-wider text-center">Add<br/>Photos</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    {(field.type === 'url' && formData[field.name]) && (
                                        <ImageIcon size={16} className="absolute right-4 top-3.5 text-coffee-400 opacity-50" />
                                    )}
                                    <input 
                                        type={field.type}
                                        name={field.name}
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-coffee-500/50 transition-shadow text-coffee-900 dark:text-coffee-100" 
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-6 flex justify-end gap-4 border-t border-coffee-200 dark:border-white/10">
                        <PremiumButton type="button" variant="secondary" onClick={() => { setIsFormOpen(false); setEditingId(null); }}>Cancel</PremiumButton>
                        <PremiumButton type="submit" variant="primary">
                            {editingId ? 'Save Changes' : 'Publish Document'}
                        </PremiumButton>
                    </div>
                </form>
            </GlassCard>
        );
    };

    const renderDataList = () => {
        if (loading) return <div className="flex justify-center mt-12"><div className="animate-spin h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100 rounded-full"></div></div>;
        if (collectionData.length === 0) return <div className="p-12 text-center text-coffee-600 dark:text-coffee-400 font-medium glass rounded-2xl mt-4 border border-dashed border-coffee-300 dark:border-white/20">Database table is totally empty.<br/>Create your first entry to bring it online!</div>;

        const schema = cmsSchemas[activeTab];

        return (
            <div className="grid gap-4 mt-6">
                {collectionData.map((item) => (
                    <GlassCard key={item._id} className="flex justify-between items-center group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-coffee-500"></div>
                        
                        {(item.coverImage || item.image || item.avatar) && (
                            <img src={item.coverImage || item.image || item.avatar} alt="cover" className="h-20 w-24 object-cover shrink-0 ml-4 rounded border border-coffee-200 dark:border-white/10" />
                        )}

                        <div className={`pl-4 w-full pr-4 flex flex-col justify-center py-2 ${(item.coverImage || item.image || item.avatar) ? '' : 'pl-6'}`}>
                            <h3 className="font-bold text-coffee-900 dark:text-coffee-100 text-lg mb-1 truncate pr-20">
                                {item[schema.titleKey] || 'Untitled Object'}
                            </h3>
                            <p className="text-sm text-coffee-600 dark:text-coffee-400 line-clamp-1 pr-20 opacity-80">
                                {item[schema.descKey] || ''}
                            </p>
                            <div className="flex gap-3 text-[10px] text-coffee-500 dark:text-coffee-400 mt-3 font-mono uppercase tracking-wider font-bold">
                                <span>ID: {item._id.slice(-6)}</span>
                                {(item.category || item.status) && <span>|</span>}
                                {item.status && <span className="text-blue-500">{item.status}</span>}
                                {item.category && <span className="text-coffee-700 dark:text-coffee-300">{item.category}</span>}
                            </div>
                        </div>
                        
                        <div className="flex gap-2 p-4 opacity-0 group-hover:opacity-100 transition-all bg-gradient-to-l from-white dark:from-[#080808] via-white/95 dark:via-[#080808]/95 to-transparent pl-12 absolute right-0 top-0 h-full items-center translate-x-4 group-hover:translate-x-0">
                            <button 
                                onClick={() => handleEdit(item)}
                                className="p-2.5 text-coffee-700 bg-coffee-100/50 hover:bg-coffee-600 hover:text-white dark:text-coffee-200 dark:bg-white/5 dark:hover:bg-coffee-500 rounded-xl transition-all shadow-sm"
                                title="Edit Document"
                            >
                                <Edit size={18} />
                            </button>
                            {activeTab !== 'settings' && (
                                <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white dark:text-red-400 dark:bg-red-900/10 dark:hover:bg-red-500 rounded-xl transition-all shadow-sm"
                                    title="Permanently Delete Document"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </GlassCard>
                ))}
            </div>
        );
    };

    const renderInbox = () => {
        if (loading) return <div className="flex justify-center mt-12"><div className="animate-spin h-10 w-10 border-b-2 border-coffee-900 dark:border-coffee-100 rounded-full"></div></div>;
        
        const filteredMessages = collectionData.filter(m => 
            m.name?.toLowerCase().includes(inboxSearch.toLowerCase()) || 
            m.email?.toLowerCase().includes(inboxSearch.toLowerCase()) || 
            m.message?.toLowerCase().includes(inboxSearch.toLowerCase())
        );

        return (
            <div className="space-y-4 mt-6">
                {/* Advanced Search Bar */}
                <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="Search messages by name, email, or keyword..." 
                        value={inboxSearch}
                        onChange={(e) => setInboxSearch(e.target.value)}
                        className="w-full bg-white/70 dark:bg-[#0c0c0c] border border-coffee-200 dark:border-white/10 rounded-xl p-4 pl-5 outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-shadow text-sm"
                    />
                </div>

                {filteredMessages.length === 0 ? (
                    <div className="p-12 text-center text-sm font-bold glass rounded-2xl mt-4">No messages match your search.</div>
                ) : (
                    filteredMessages.map(m => (
                        <GlassCard key={m._id} className={`relative group overflow-hidden border-t-2 ${m.isRead ? 'border-t-coffee-300 dark:border-t-white/10 opacity-70' : 'border-t-blue-500'} hover:shadow-xl hover:opacity-100 transition-all`}>
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className={`font-bold text-lg ${m.isRead ? 'text-coffee-600 dark:text-coffee-400' : 'text-coffee-900 dark:text-coffee-100'}`}>
                                                {m.name} {!m.isRead && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                                            </h3>
                                            <a href={`mailto:${m.email}`} className="text-xs py-1.5 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-mono hover:underline">{m.email}</a>
                                        </div>
                                        <div className="text-xs text-coffee-500 font-medium whitespace-nowrap">
                                            {new Date(m.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`p-5 rounded-xl border font-medium leading-relaxed ${m.isRead ? 'bg-transparent border-coffee-200/50 dark:border-white/5 text-coffee-600 dark:text-coffee-400' : 'bg-coffee-50/50 dark:bg-black/30 border-coffee-200 dark:border-white/10 text-coffee-800 dark:text-coffee-200'}`}>
                                        "{m.message}"
                                    </div>
                                </div>
                                <div className="flex md:flex-col gap-2 shrink-0 md:ml-4 self-end md:self-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => toggleReadStatus(m)}
                                        className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors border ${m.isRead ? 'bg-coffee-100 dark:bg-white/5 text-coffee-700 dark:text-coffee-300 border-coffee-200 dark:border-white/10 hover:bg-coffee-200 dark:hover:bg-white/10' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/40'}`}
                                    >
                                        {m.isRead ? 'Mark Unread' : 'Mark Read'}
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(m._id)}
                                        className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors flex items-center justify-center border border-transparent hover:border-red-600 shadow-sm"
                                        title="Erase Message"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="flex min-h-[calc(100vh-14rem)] relative flex-col md:flex-row gap-8 py-4">
            <aside className="w-full md:w-64 glass flex flex-col p-5 rounded-2xl border border-coffee-200 dark:border-white/10 shrink-0 md:sticky md:top-24 self-start shadow-lg">
                <h2 className="hidden md:flex text-xl font-black mb-8 text-coffee-900 dark:text-coffee-100 items-center gap-3">
                    <Database size={24} className="text-coffee-500" /> Database CMS
                </h2>
                <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-grow text-coffee-700 dark:text-coffee-300">
                    <button 
                        onClick={() => navigate('/admin')}
                        className={`flex items-center gap-3 whitespace-nowrap px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-coffee-900 text-coffee-100 dark:bg-coffee-100 dark:text-coffee-900 shadow-xl scale-[1.02]' : 'hover:bg-coffee-100/50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                    >
                        <Settings size={18} /> Overview
                    </button>
                    {Object.keys(cmsSchemas).map((key) => {
                        const Icon = cmsSchemas[key].icon;
                        return (
                            <button 
                                key={key}
                                onClick={() => navigate(`/admin/${key}`)}
                                className={`flex items-center gap-3 whitespace-nowrap px-4 py-3.5 rounded-xl font-bold transition-all capitalize ${activeTab === key ? 'bg-coffee-900 text-coffee-100 dark:bg-coffee-100 dark:text-coffee-900 shadow-xl scale-[1.02]' : 'hover:bg-coffee-100/50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                            >
                                <Icon size={18} /> {key}
                            </button>
                        );
                    })}
                    <div className="w-px h-full md:w-full md:h-px bg-coffee-200 dark:bg-white/10 my-0 md:my-5 mx-2 md:mx-0 shrink-0 opacity-50"></div>
                    <button 
                        onClick={() => navigate('/admin/messages')}
                        className={`flex items-center gap-3 whitespace-nowrap px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'hover:bg-coffee-100/50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                    >
                        <MessageSquare size={18} /> Inbox
                    </button>
                </nav>
                <div className="mt-4 md:mt-10 pt-5 border-t border-coffee-200 dark:border-white/10">
                    <button 
                        onClick={logout}
                        className="flex items-center justify-center md:justify-start gap-3 w-full px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-all border border-transparent hover:border-red-500 dark:hover:border-red-500 shadow-sm"
                    >
                        <LogOut size={18} /> <span className="hidden md:inline">Secure Lock</span>
                    </button>
                </div>
            </aside>

            <main className="flex-grow w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center bg-gradient-to-r from-coffee-100/80 to-transparent dark:from-coffee-900/20 glass p-6 rounded-2xl border border-coffee-200 dark:border-white/5 shadow-sm">
                            <h1 className="text-3xl font-black text-coffee-900 dark:text-coffee-100 capitalize tracking-tight flex items-center gap-4 mb-4 md:mb-0">
                                {activeTab === 'overview' ? 'Command Center' : `${activeTab}`}
                            </h1>
                            {activeTab !== 'overview' && activeTab !== 'messages' && activeTab !== 'settings' && !isFormOpen && (
                                <PremiumButton onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 !py-2.5 !px-5 shadow-lg group">
                                    <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Deploy New
                                </PremiumButton>
                            )}
                        </header>

                        <div className="h-full">
                            {activeTab === 'overview' && (
                                <div className="space-y-8 pb-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                                        {[
                                            { label: 'Total Projects', value: counts?.projects || 0, icon: FolderGit2, color: 'text-blue-500', trend: '+12%' },
                                            { label: 'Published Blogs', value: counts?.blogs || 0, icon: FileText, color: 'text-green-500', trend: '+5%' },
                                            { label: 'Messages', value: counts?.messages || 0, icon: MessageSquare, color: 'text-purple-500', trend: 'New' },
                                            { label: 'Profile Views', value: '4.2k', icon: Award, color: 'text-orange-500', trend: '+18%' }
                                        ].map((stat, index) => (
                                            <GlassCard key={index} className="flex flex-col p-6 hover:-translate-y-1 transition-transform group relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-4 relative z-10">
                                                    <div className={`p-3 rounded-2xl bg-white/50 dark:bg-[#0c0c0c]/50 ${stat.color} shadow-sm border border-white/20 dark:border-white/5`}>
                                                        <stat.icon size={24} />
                                                    </div>
                                                </div>
                                                <h3 className="text-4xl font-black text-coffee-900 dark:text-coffee-100 tracking-tighter mb-1">{stat.value}</h3>
                                                <p className="text-sm font-medium text-coffee-600 dark:text-coffee-400 uppercase tracking-widest">{stat.label}</p>
                                            </GlassCard>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <GlassCard className="col-span-1 lg:col-span-2 p-6">
                                            <h3 className="text-lg font-bold text-coffee-900 dark:text-coffee-100 mb-6">Traffic Telemetry</h3>
                                            <div className="h-[300px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={[
                                                        { name: 'Mon', views: 400, visitors: 240 },
                                                        { name: 'Tue', views: 300, visitors: 139 },
                                                        { name: 'Wed', views: 550, visitors: 380 },
                                                        { name: 'Thu', views: 470, visitors: 290 },
                                                        { name: 'Fri', views: 790, visitors: 480 },
                                                        { name: 'Sat', views: 920, visitors: 680 },
                                                        { name: 'Sun', views: 810, visitors: 590 },
                                                    ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#8c7a6b" strokeOpacity={0.1} vertical={false} />
                                                        <XAxis dataKey="name" stroke="#8c7a6b" fontSize={12} tickLine={false} axisLine={false} />
                                                        <YAxis stroke="#8c7a6b" fontSize={12} tickLine={false} axisLine={false} />
                                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(12, 12, 12, 0.9)', borderRadius: '12px' }}/>
                                                        <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                                                        <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </GlassCard>

                                        <GlassCard className="col-span-1 p-6">
                                            <h3 className="text-lg font-bold text-coffee-900 dark:text-coffee-100 mb-6">Engagement</h3>
                                            <div className="h-[300px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={[
                                                        { name: 'Projects', clicks: 850 },
                                                        { name: 'Blogs', clicks: 1200 },
                                                        { name: 'Resume', clicks: 350 },
                                                        { name: 'Contact', clicks: 190 },
                                                    ]} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#8c7a6b" strokeOpacity={0.1} horizontal={true} vertical={false} />
                                                        <XAxis type="number" hide />
                                                        <YAxis dataKey="name" type="category" stroke="#8c7a6b" fontSize={12} tickLine={false} axisLine={false} width={70} />
                                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(12, 12, 12, 0.9)', borderRadius: '8px' }}/>
                                                        <Bar dataKey="clicks" fill="#d97706" radius={[0, 4, 4, 0]} barSize={24} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </GlassCard>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <GlassCard className="p-8 border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => navigate('/admin/messages')}>
                                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl inline-block mb-6">
                                                <MessageSquare size={32} className="text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="text-2xl font-black text-coffee-900 dark:text-coffee-100 mb-2">Inbox & Contacts</div>
                                            <p className="text-sm text-coffee-600 dark:text-coffee-400 font-medium">Read encrypted messages directly sent from your public frontend form.</p>
                                        </GlassCard>

                                        <GlassCard className="p-8 border-t-4 border-t-coffee-500 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => navigate('/admin/settings')}>
                                            <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-xl inline-block mb-6">
                                                <Settings size={32} className="text-coffee-600 dark:text-coffee-400" />
                                            </div>
                                            <div className="text-2xl font-black text-coffee-900 dark:text-coffee-100 mb-2">Global Settings</div>
                                            <p className="text-sm text-coffee-600 dark:text-coffee-400 font-medium">Dynamically select Site Title, Meta, and the Homepage template logic.</p>
                                        </GlassCard>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'messages' && renderInbox()}
                            {activeTab !== 'overview' && activeTab !== 'messages' && isFormOpen && renderDynamicForm()}
                            {activeTab !== 'overview' && activeTab !== 'messages' && !isFormOpen && renderDataList()}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminDashboard;
