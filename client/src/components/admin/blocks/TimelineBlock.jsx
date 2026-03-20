import React from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';

const TimelineBlock = ({ content = {}, onChange }) => {
  const steps = content.steps || [];
  const addStep = () => onChange({ ...content, steps: [...steps, { date: '', title: '', description: '', status: 'done' }] });
  const removeStep = idx => onChange({ ...content, steps: steps.filter((_, i) => i !== idx) });
  const updateStep = (idx, field, val) => onChange({ ...content, steps: steps.map((s, i) => i === idx ? { ...s, [field]: val } : s) });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1 flex-1 mr-4">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Timeline Title</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
            placeholder="Development Timeline" value={content.title || ''}
            onChange={e => onChange({ ...content, title: e.target.value })} />
        </div>
        <button type="button" onClick={addStep}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent)]/20 transition-all shrink-0 mt-4">
          <Plus size={12} /> Add Step
        </button>
      </div>
      <div className="relative space-y-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 z-10 ${step.status === 'done' ? 'bg-[var(--accent)] border-[var(--accent)]' : step.status === 'active' ? 'bg-yellow-500 border-yellow-500' : 'bg-[var(--bg-primary)] border-[var(--border)]'}`}>
                <Clock size={12} className="text-white" />
              </div>
              {idx < steps.length - 1 && <div className="w-0.5 flex-1 bg-[var(--border)] my-1" />}
            </div>
            <div className="flex-1 pb-6 space-y-2">
              <div className="flex gap-2">
                <input className="w-28 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-secondary)] text-[10px] outline-none focus:border-[var(--accent)]/50 font-mono"
                  placeholder="Jan 2024" value={step.date || ''}
                  onChange={e => updateStep(idx, 'date', e.target.value)} />
                <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-2 py-2 text-[var(--text-primary)] text-[10px] outline-none"
                  value={step.status || 'done'} onChange={e => updateStep(idx, 'status', e.target.value)}>
                  <option value="done">Done</option>
                  <option value="active">In Progress</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <button type="button" onClick={() => removeStep(idx)}
                  className="opacity-0 group-hover:opacity-100 ml-auto text-red-400 hover:text-red-300 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 font-bold"
                placeholder="Milestone title..." value={step.title || ''}
                onChange={e => updateStep(idx, 'title', e.target.value)} />
              <textarea className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 resize-none"
                placeholder="Description of what happened..." rows={2} value={step.description || ''}
                onChange={e => updateStep(idx, 'description', e.target.value)} />
            </div>
          </div>
        ))}
        {steps.length === 0 && (
          <div className="py-8 text-center opacity-30 text-xs uppercase tracking-widest">No timeline steps yet</div>
        )}
      </div>
    </div>
  );
};

export default TimelineBlock;
