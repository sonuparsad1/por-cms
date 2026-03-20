import React from 'react';
import { Plus, Trash2, Star, Zap, Shield, Globe, Code, Cpu, Database, Cloud } from 'lucide-react';

const ICONS = { Star, Zap, Shield, Globe, Code, Cpu, Database, Cloud };

const FeaturesBlock = ({ content = {}, onChange }) => {
  const items = content.items || [];

  const addItem = () => onChange({ ...content, items: [...items, { icon: 'Star', title: '', description: '' }] });
  const removeItem = idx => onChange({ ...content, items: items.filter((_, i) => i !== idx) });
  const updateItem = (idx, field, val) => onChange({ ...content, items: items.map((item, i) => i === idx ? { ...item, [field]: val } : item) });

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Section Title</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
          placeholder="Key Features" value={content.title || ''}
          onChange={e => onChange({ ...content, title: e.target.value })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">Feature Items ({items.length})</span>
        <button type="button" onClick={addItem}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)]/20 transition-all">
          <Plus size={12} /> Add Feature
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl group">
            <div className="flex flex-col gap-2 shrink-0">
              <select className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-primary)] text-xs outline-none"
                value={item.icon || 'Star'} onChange={e => updateItem(idx, 'icon', e.target.value)}>
                {Object.keys(ICONS).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              {React.createElement(ICONS[item.icon] || Star, { size: 20, className: 'text-[var(--accent)] mx-auto' })}
            </div>
            <div className="flex-1 space-y-2">
              <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 font-bold"
                placeholder="Feature title..." value={item.title || ''}
                onChange={e => updateItem(idx, 'title', e.target.value)} />
              <textarea className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 resize-none"
                placeholder="Feature description..." rows={2} value={item.description || ''}
                onChange={e => updateItem(idx, 'description', e.target.value)} />
            </div>
            <button type="button" onClick={() => removeItem(idx)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all shrink-0">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-8 text-center opacity-30 text-xs uppercase tracking-widest">No features yet — click Add Feature</div>
        )}
      </div>
    </div>
  );
};

export default FeaturesBlock;
