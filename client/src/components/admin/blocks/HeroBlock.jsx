import React from 'react';
import { Upload } from 'lucide-react';

const HeroBlock = ({ content = {}, onChange, token }) => {
  const handleBgUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      onChange({ ...content, bgImage: data.url });
    } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Headline</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm font-black outline-none focus:border-[var(--accent)]/50"
          placeholder="Compelling headline..." value={content.headline || ''}
          onChange={e => onChange({ ...content, headline: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Subheading</label>
        <textarea className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 resize-none"
          placeholder="Supporting description..." rows={2} value={content.subheading || ''}
          onChange={e => onChange({ ...content, subheading: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Primary CTA Label</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            placeholder="Get Started" value={content.ctaLabel || ''}
            onChange={e => onChange({ ...content, ctaLabel: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Primary CTA URL</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none font-mono"
            placeholder="/contact" value={content.ctaUrl || ''}
            onChange={e => onChange({ ...content, ctaUrl: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Secondary CTA Label</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            placeholder="View Projects" value={content.secCtaLabel || ''}
            onChange={e => onChange({ ...content, secCtaLabel: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Secondary CTA URL</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none font-mono"
            placeholder="/projects" value={content.secCtaUrl || ''}
            onChange={e => onChange({ ...content, secCtaUrl: e.target.value })} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Background Image</label>
        <div className="flex gap-3">
          <input className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none font-mono focus:border-[var(--accent)]/50"
            placeholder="https://... or upload →" value={content.bgImage || ''}
            onChange={e => onChange({ ...content, bgImage: e.target.value })} />
          <label className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-[var(--accent)]/40 rounded-xl cursor-pointer hover:border-[var(--accent)] text-[var(--accent)] text-xs">
            <Upload size={14} /> Upload
            <input type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Text Alignment</label>
          <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={content.align || 'center'} onChange={e => onChange({ ...content, align: e.target.value })}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Min Height</label>
          <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={content.height || 'screen'} onChange={e => onChange({ ...content, height: e.target.value })}>
            <option value="screen">Full Screen</option>
            <option value="half">Half Screen</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
      {(content.headline || content.bgImage) && (
        <div className={`relative rounded-2xl overflow-hidden border border-[var(--border)] flex items-center justify-${content.align === 'left' ? 'start' : content.align === 'right' ? 'end' : 'center'} p-10 min-h-[160px]`}
          style={{ background: content.bgImage ? `url(${content.bgImage}) center/cover` : 'var(--bg-secondary)' }}>
          {content.bgImage && <div className="absolute inset-0 bg-black/50" />}
          <div className={`relative text-${content.align || 'center'}`}>
            {content.headline && <h2 className="text-2xl font-black text-white mb-2">{content.headline}</h2>}
            {content.subheading && <p className="text-sm text-white/80 mb-4">{content.subheading}</p>}
            <div className="flex gap-3 flex-wrap justify-center">
              {content.ctaLabel && <span className="px-5 py-2 bg-[var(--accent)] text-white rounded-full text-xs font-bold">{content.ctaLabel}</span>}
              {content.secCtaLabel && <span className="px-5 py-2 border border-white/50 text-white rounded-full text-xs font-bold">{content.secCtaLabel}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBlock;
