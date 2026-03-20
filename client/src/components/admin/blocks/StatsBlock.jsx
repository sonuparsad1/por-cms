import React from 'react';
import { Plus, Trash2, TrendingUp } from 'lucide-react';

const StatsBlock = ({ content = {}, onChange }) => {
  const stats = content.stats || [];
  const addStat = () => onChange({ ...content, stats: [...stats, { value: '', label: '', prefix: '', suffix: '' }] });
  const removeStat = idx => onChange({ ...content, stats: stats.filter((_, i) => i !== idx) });
  const updateStat = (idx, field, val) => onChange({ ...content, stats: stats.map((s, i) => i === idx ? { ...s, [field]: val } : s) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1 flex-1 mr-4">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Section Title</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
            placeholder="By The Numbers" value={content.title || ''}
            onChange={e => onChange({ ...content, title: e.target.value })} />
        </div>
        <button type="button" onClick={addStat}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)]/20 transition-all shrink-0 mt-4">
          <Plus size={12} /> Add Stat
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl group items-start">
            <TrendingUp size={16} className="text-[var(--accent)] mt-2 shrink-0" />
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50">Prefix</label>
                <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-primary)] text-xs outline-none"
                  placeholder="$" value={stat.prefix || ''} onChange={e => updateStat(idx,'prefix',e.target.value)} />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50">Value *</label>
                <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-primary)] text-xs outline-none font-bold"
                  placeholder="100" value={stat.value || ''} onChange={e => updateStat(idx,'value',e.target.value)} />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50">Suffix</label>
                <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-primary)] text-xs outline-none"
                  placeholder="+" value={stat.suffix || ''} onChange={e => updateStat(idx,'suffix',e.target.value)} />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50">Label *</label>
                <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-primary)] text-xs outline-none"
                  placeholder="Projects" value={stat.label || ''} onChange={e => updateStat(idx,'label',e.target.value)} />
              </div>
            </div>
            <button type="button" onClick={() => removeStat(idx)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {stats.length === 0 && (
          <div className="col-span-2 py-8 text-center opacity-30 text-xs uppercase tracking-widest">No stats yet</div>
        )}
      </div>
      {stats.length > 0 && (
        <div className="p-4 bg-[var(--bg-secondary)] rounded-2xl">
          <p className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest mb-3 opacity-50">Preview</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-[var(--accent)]">{s.prefix}{s.value}{s.suffix}</div>
                <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsBlock;
