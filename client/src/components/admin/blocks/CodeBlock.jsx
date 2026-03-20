import React from 'react';
import { Terminal } from 'lucide-react';

const LANGUAGES = ['javascript', 'typescript', 'python', 'bash', 'json', 'html', 'css', 'sql', 'rust', 'go', 'java', 'cpp', 'yaml', 'markdown'];

const CodeBlock = ({ content = {}, onChange }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Terminal size={16} className="text-[var(--accent)]" />
      <select
        className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest outline-none"
        value={content.language || 'javascript'}
        onChange={e => onChange({ ...content, language: e.target.value })}>
        {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <input className="flex-1 bg-transparent border-b border-[var(--border)] text-[var(--text-secondary)] text-xs outline-none py-1 placeholder:text-[var(--text-secondary)]/40"
        placeholder="File name or context (optional)..."
        value={content.filename || ''}
        onChange={e => onChange({ ...content, filename: e.target.value })} />
    </div>
    <div className="relative">
      <textarea
        className="w-full bg-[#0d1117] text-[#c9d1d9] border border-[var(--border)] rounded-2xl p-6 font-mono text-xs h-64 outline-none focus:border-[var(--accent)]/50 transition-all resize-y"
        placeholder={`// Write your ${content.language || 'javascript'} code here...`}
        value={content.code || ''}
        onChange={e => onChange({ ...content, code: e.target.value })} />
      <div className="absolute top-3 right-4 text-[8px] font-black text-white/20 uppercase tracking-widest">{content.language || 'js'}</div>
    </div>
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Caption / Explanation</label>
      <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
        placeholder="Explain what this code does..."
        value={content.caption || ''}
        onChange={e => onChange({ ...content, caption: e.target.value })} />
    </div>
  </div>
);

export default CodeBlock;
