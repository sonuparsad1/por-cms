import React, { useState } from 'react';
import { Search, AlertCircle, Check } from 'lucide-react';

const PAGES = [
  { key: 'home', label: 'Home (/)' },
  { key: 'about', label: 'About (/about)' },
  { key: 'projects', label: 'Projects (/projects)' },
  { key: 'blog', label: 'Blog (/blog)' },
  { key: 'skills', label: 'Skills (/skills)' },
  { key: 'experience', label: 'Experience (/experience)' },
  { key: 'certifications', label: 'Certifications (/certifications)' },
  { key: 'gallery', label: 'Gallery (/gallery)' },
  { key: 'contact', label: 'Contact (/contact)' },
  { key: 'resume', label: 'Resume (/resume)' },
];

const charColor = (len, max) => len > max ? 'text-red-400' : len > max * 0.85 ? 'text-yellow-400' : 'text-green-400';

const SEOManager = ({ pagesSEO = [], onSave, loading }) => {
  const [selected, setSelected] = useState(PAGES[0].key);
  const [local, setLocal] = useState(() => {
    const map = {};
    PAGES.forEach(p => {
      const existing = pagesSEO.find(s => s.page === p.key) || {};
      map[p.key] = { page: p.key, metaTitle: existing.metaTitle || '', metaDescription: existing.metaDescription || '', ogImage: existing.ogImage || '', robots: existing.robots || 'index, follow' };
    });
    return map;
  });

  const current = local[selected] || {};
  const set = (field, val) => setLocal(prev => ({ ...prev, [selected]: { ...prev[selected], [field]: val } }));

  const handleSave = () => onSave(Object.values(local));

  return (
    <div className="flex gap-6 h-full">
      {/* Page Selector */}
      <div className="w-52 shrink-0 space-y-1">
        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mb-3">Pages</p>
        {PAGES.map(p => {
          const seo = local[p.key];
          const hasData = seo?.metaTitle || seo?.metaDescription;
          return (
            <button key={p.key} type="button" onClick={() => setSelected(p.key)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${selected === p.key ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] border border-transparent'}`}>
              <span className="truncate">{p.label}</span>
              {hasData && <Check size={10} className="text-green-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* SEO Fields */}
      <div className="flex-1 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Meta Title</label>
            <span className={`text-[9px] font-mono ${charColor(current.metaTitle?.length || 0, 60)}`}>
              {current.metaTitle?.length || 0}/60
            </span>
          </div>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm outline-none focus:border-[var(--accent)]/50"
            placeholder="Page title for search engines..." value={current.metaTitle || ''}
            onChange={e => set('metaTitle', e.target.value)} maxLength={80} />
          {(current.metaTitle?.length || 0) > 60 && (
            <p className="text-[9px] text-red-400 flex items-center gap-1"><AlertCircle size={10}/> Title too long — keep under 60 characters for best SEO</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Meta Description</label>
            <span className={`text-[9px] font-mono ${charColor(current.metaDescription?.length || 0, 160)}`}>
              {current.metaDescription?.length || 0}/160
            </span>
          </div>
          <textarea className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 resize-none"
            placeholder="Compelling description for search results..." rows={3} value={current.metaDescription || ''}
            onChange={e => set('metaDescription', e.target.value)} maxLength={200} />
          {(current.metaDescription?.length || 0) > 160 && (
            <p className="text-[9px] text-red-400 flex items-center gap-1"><AlertCircle size={10}/> Too long — keep under 160 characters</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">OG Image URL</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs font-mono outline-none focus:border-[var(--accent)]/50"
            placeholder="https://... (1200×630px recommended)" value={current.ogImage || ''}
            onChange={e => set('ogImage', e.target.value)} />
          {current.ogImage && <img src={current.ogImage} alt="OG Preview" className="h-20 rounded-lg object-cover border border-[var(--border)]" />}
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Robots Directive</label>
          <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={current.robots || 'index, follow'} onChange={e => set('robots', e.target.value)}>
            <option value="index, follow">Index, Follow (Default)</option>
            <option value="noindex, follow">No Index, Follow</option>
            <option value="index, nofollow">Index, No Follow</option>
            <option value="noindex, nofollow">No Index, No Follow</option>
          </select>
        </div>

        {/* Search Snippet Preview */}
        {current.metaTitle && (
          <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl space-y-1">
            <p className="text-[9px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mb-2 flex items-center gap-1"><Search size={10}/> Google Preview</p>
            <div className="text-blue-400 text-sm font-medium line-clamp-1">{current.metaTitle || 'Page Title'}</div>
            <div className="text-green-600 text-[10px]">https://yoursite.com/{selected === 'home' ? '' : selected}</div>
            <div className="text-[var(--text-secondary)] text-xs line-clamp-2">{current.metaDescription || 'No description set.'}</div>
          </div>
        )}

        <button type="button" onClick={handleSave} disabled={loading}
          className="w-full py-4 bg-[var(--accent)] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50">
          {loading ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </div>
    </div>
  );
};

export default SEOManager;
