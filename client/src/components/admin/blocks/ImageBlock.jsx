import React, { useState } from 'react';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';

const ImageBlock = ({ content = {}, onChange, token }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      onChange({ ...content, url: data.url });
    } catch { /* silent */ }
    setUploading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 flex items-center gap-1"><Link size={10}/> Image URL</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 font-mono"
            placeholder="https://..." value={content.url || ''}
            onChange={e => onChange({ ...content, url: e.target.value })} />
        </div>
        <div className="relative">
          <label className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--accent)]/50 transition-all text-[var(--text-secondary)] text-xs">
            <Upload size={14} className={uploading ? 'animate-bounce' : ''} />
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Caption</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
            placeholder="Image caption..." value={content.caption || ''}
            onChange={e => onChange({ ...content, caption: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Alt Text</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
            placeholder="Alt text for SEO..." value={content.alt || ''}
            onChange={e => onChange({ ...content, alt: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Layout</label>
          <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={content.layout || 'full'} onChange={e => onChange({ ...content, layout: e.target.value })}>
            <option value="full">Full Width</option>
            <option value="center">Centered</option>
            <option value="left">Left Aligned</option>
            <option value="right">Right Aligned</option>
          </select>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-black/20 min-h-[200px] flex items-center justify-center">
        {content.url ? (
          <div className="w-full">
            <img src={content.url} alt={content.alt || 'preview'} className="w-full object-cover" />
            {content.caption && <p className="text-center text-xs text-[var(--text-secondary)] p-2 italic">{content.caption}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <ImageIcon size={32} />
            <span className="text-[10px] uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
