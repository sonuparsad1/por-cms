import React from 'react';
import { Quote } from 'lucide-react';

const QuoteBlock = ({ content = {}, onChange }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Quote Text</label>
      <textarea className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm italic outline-none focus:border-[var(--accent)]/50 resize-none leading-relaxed"
        placeholder="An inspiring quote or key insight..." rows={3} value={content.text || ''}
        onChange={e => onChange({ ...content, text: e.target.value })} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Attribution</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
          placeholder="— Steve Jobs, Apple" value={content.attribution || ''}
          onChange={e => onChange({ ...content, attribution: e.target.value })} />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Style</label>
        <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
          value={content.style || 'left-border'} onChange={e => onChange({ ...content, style: e.target.value })}>
          <option value="left-border">Left Border</option>
          <option value="centered">Large Centered</option>
          <option value="card">Card</option>
        </select>
      </div>
    </div>
    {content.text && (
      <div className={`
        ${content.style === 'left-border' ? 'border-l-4 border-[var(--accent)] pl-6 py-2' :
          content.style === 'card' ? 'p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)]' :
          'text-center py-6'}
      `}>
        <Quote size={20} className="text-[var(--accent)] mb-2 opacity-50" />
        <p className={`${content.style === 'centered' ? 'text-xl' : 'text-base'} italic text-[var(--text-primary)] leading-relaxed`}>"{content.text}"</p>
        {content.attribution && <p className="text-xs text-[var(--text-secondary)] mt-3">{content.attribution}</p>}
      </div>
    )}
  </div>
);

export default QuoteBlock;
