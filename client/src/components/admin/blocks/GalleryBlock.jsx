import React, { useState } from 'react';
import { Plus, Trash2, Upload, Grid } from 'lucide-react';

const GalleryBlock = ({ content = {}, onChange, token }) => {
  const images = content.images || [];
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const urls = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append('image', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
        const data = await res.json();
        urls.push({ url: data.url, caption: '' });
      } catch {}
    }
    onChange({ ...content, images: [...images, ...urls] });
    setUploading(false);
  };

  const updateCaption = (idx, caption) => {
    const updated = images.map((img, i) => i === idx ? { ...img, caption } : img);
    onChange({ ...content, images: updated });
  };

  const removeImage = (idx) => onChange({ ...content, images: images.filter((_, i) => i !== idx) });

  const addByUrl = () => onChange({ ...content, images: [...images, { url: '', caption: '' }] });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="space-y-1 flex-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Gallery Title</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
            placeholder="Gallery section title..." value={content.title || ''}
            onChange={e => onChange({ ...content, title: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Columns</label>
          <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-3 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={content.cols || 3} onChange={e => onChange({ ...content, cols: Number(e.target.value) })}>
            {[2,3,4].map(n => <option key={n} value={n}>{n} cols</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-[var(--accent)]/40 rounded-xl cursor-pointer hover:border-[var(--accent)] text-[var(--accent)] text-xs transition-all">
          <Upload size={14} className={uploading ? 'animate-bounce' : ''} />
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" accept="image/*" multiple className="hidden" onChange={uploadImage} />
        </label>
        <button type="button" onClick={addByUrl}
          className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 text-xs transition-all">
          <Plus size={14} /> Add URL
        </button>
      </div>
      {images.length > 0 ? (
        <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${content.cols || 3}, 1fr)` }}>
          {images.map((img, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-black/10">
              {img.url ? (
                <img src={img.url} alt={img.caption || `Gallery ${idx+1}`} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-[var(--bg-primary)]">
                  <input className="w-full px-2 py-1 text-[9px] bg-transparent outline-none text-[var(--text-primary)] font-mono text-center"
                    placeholder="Paste URL..."
                    value={img.url}
                    onChange={e => { const u = images.map((im,i) => i===idx?{...im,url:e.target.value}:im); onChange({...content,images:u}); }} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <input className="w-full text-white text-[9px] bg-white/10 rounded px-2 py-1 outline-none placeholder:text-white/50"
                  placeholder="Caption..." value={img.caption || ''}
                  onChange={e => updateCaption(idx, e.target.value)} />
                <button type="button" onClick={() => removeImage(idx)}
                  className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 flex flex-col items-center gap-2 border border-dashed border-[var(--border)] rounded-2xl opacity-30">
          <Grid size={28} />
          <span className="text-[10px] uppercase tracking-widest">Upload images to build your gallery</span>
        </div>
      )}
    </div>
  );
};

export default GalleryBlock;
