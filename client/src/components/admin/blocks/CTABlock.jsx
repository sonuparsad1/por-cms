import React from 'react';

const CTABlock = ({ content = {}, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Heading</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs font-bold outline-none focus:border-[var(--accent)]/50"
          placeholder="Ready to work together?" value={content.heading || ''}
          onChange={e => onChange({ ...content, heading: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Subtext</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
          placeholder="Let's build something great." value={content.subtext || ''}
          onChange={e => onChange({ ...content, subtext: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Button Label</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
          placeholder="Contact Me" value={content.btnLabel || ''}
          onChange={e => onChange({ ...content, btnLabel: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Button URL</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none font-mono"
          placeholder="/contact" value={content.btnUrl || ''}
          onChange={e => onChange({ ...content, btnUrl: e.target.value })} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Style</label>
        <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
          value={content.style || 'accent'} onChange={e => onChange({ ...content, style: e.target.value })}>
          <option value="accent">Accent Filled</option>
          <option value="dark">Dark</option>
          <option value="outline">Outlined</option>
          <option value="glass">Glassmorphism</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Alignment</label>
        <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
          value={content.align || 'center'} onChange={e => onChange({ ...content, align: e.target.value })}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
    {content.heading && (
      <div className={`p-8 rounded-2xl text-${content.align || 'center'} ${content.style === 'dark' ? 'bg-gray-900' : content.style === 'glass' ? 'bg-white/5 backdrop-blur border border-white/10' : content.style === 'outline' ? 'border-2 border-[var(--accent)]' : 'bg-[var(--accent)]'}`}>
        <h3 className={`text-lg font-black mb-2 ${content.style === 'accent' ? 'text-white' : 'text-[var(--text-primary)]'}`}>{content.heading}</h3>
        {content.subtext && <p className={`text-sm mb-4 ${content.style === 'accent' ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>{content.subtext}</p>}
        {content.btnLabel && <span className={`inline-block px-6 py-2.5 rounded-full text-xs font-bold ${content.style === 'accent' ? 'bg-white text-[var(--accent)]' : 'bg-[var(--accent)] text-white'}`}>{content.btnLabel}</span>}
      </div>
    )}
  </div>
);

export default CTABlock;
