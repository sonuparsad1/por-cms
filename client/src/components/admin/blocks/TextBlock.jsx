import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextBlock = ({ content, onChange }) => {
  const [mode, setMode] = useState('edit');
  return (
    <div className="space-y-3" data-color-mode="dark">
      <div className="flex gap-2 mb-2">
        {['edit','preview','live'].map(m => (
          <button key={m} type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode===m ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent)]'}`}>
            {m}
          </button>
        ))}
      </div>
      <MDEditor
        value={content || ''}
        onChange={val => onChange(val || '')}
        preview={mode}
        height={240}
        style={{ borderRadius: 16, overflow: 'hidden' }}
      />
    </div>
  );
};

export default TextBlock;
