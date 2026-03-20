import React from 'react';
import { Monitor, ExternalLink } from 'lucide-react';

const DemoBlock = ({ content = {}, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 flex items-center gap-1"><ExternalLink size={10}/> Embed / Demo URL</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 font-mono"
          placeholder="https://your-demo.vercel.app" value={content.url || ''}
          onChange={e => onChange({ ...content, url: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Height (px)</label>
        <input type="number" className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
          placeholder="500" value={content.height || 500}
          onChange={e => onChange({ ...content, height: Number(e.target.value) })} />
      </div>
    </div>
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Title / Label</label>
      <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
        placeholder="Live Demo" value={content.title || ''}
        onChange={e => onChange({ ...content, title: e.target.value })} />
    </div>
    {content.url ? (
      <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-black/10">
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border-b border-[var(--border)]">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono flex-1 truncate">{content.url}</span>
          <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:opacity-70"><ExternalLink size={12}/></a>
        </div>
        <iframe src={content.url} title={content.title || 'Demo'} height={content.height || 500} className="w-full" sandbox="allow-scripts allow-same-origin allow-forms" />
      </div>
    ) : (
      <div className="py-12 flex flex-col items-center gap-2 border border-dashed border-[var(--border)] rounded-2xl opacity-30">
        <Monitor size={28} />
        <span className="text-[10px] uppercase tracking-widest">Enter a URL to embed your live demo</span>
      </div>
    )}
  </div>
);

export default DemoBlock;
