import React from 'react';
import MDEditor from '@uiw/react-md-editor';

/**
 * Shared RichTextEditor wrapping @uiw/react-md-editor.
 * Props:
 *   value: string
 *   onChange: (string) => void
 *   height: number (default 400)
 *   label: string (optional)
 */
const RichTextEditor = ({ value, onChange, height = 400, label }) => (
  <div className="space-y-2" data-color-mode="dark">
    {label && (
      <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">{label}</label>
    )}
    <MDEditor
      value={value || ''}
      onChange={v => onChange(v || '')}
      height={height}
      preview="live"
      style={{ borderRadius: 16, overflow: 'hidden', fontSize: 13 }}
    />
    <p className="text-[9px] text-[var(--text-secondary)] opacity-40">Markdown supported — **bold**, *italic*, `code`, # heading, [link](url)</p>
  </div>
);

export default RichTextEditor;
