import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Sliders, Eye, Check } from 'lucide-react';

const FONTS = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Outfit', value: "'Outfit', sans-serif" },
  { name: 'Roboto', value: "'Roboto', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
  { name: 'Sora', value: "'Sora', sans-serif" },
];

const PRESETS = [
  { name: 'Coffee', primary: '#3d2b1f', accent: '#c87941' },
  { name: 'Ocean', primary: '#0a192f', accent: '#64ffda' },
  { name: 'Midnight', primary: '#0d0d0d', accent: '#6c63ff' },
  { name: 'Rose', primary: '#1a0a0a', accent: '#ff6b9d' },
  { name: 'Forest', primary: '#0a1a0a', accent: '#4ade80' },
  { name: 'Gold', primary: '#1a1400', accent: '#fbbf24' },
];

const ThemeCustomizer = ({ settings, onSave, loading }) => {
  const [local, setLocal] = useState({
    primaryColor: settings?.primaryColor || '#3d2b1f',
    accentColor: settings?.accentColor || '#c87941',
    fontFamily: settings?.fontFamily || "'Inter', sans-serif",
    borderRadius: settings?.borderRadius || 12,
    globalTheme: settings?.globalTheme || 'dark',
  });

  const set = (k, v) => setLocal(prev => ({ ...prev, [k]: v }));

  const handleSave = () => onSave({
    primaryColor: local.primaryColor,
    accentColor: local.accentColor,
    fontFamily: local.fontFamily,
    borderRadius: local.borderRadius,
    globalTheme: local.globalTheme,
  });

  return (
    <div className="space-y-8">
      {/* Color Presets */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
          <Palette size={14} className="text-[var(--accent)]" /> Color Presets
        </h3>
        <div className="flex flex-wrap gap-3">
          {PRESETS.map(p => (
            <button key={p.name} type="button"
              onClick={() => { set('primaryColor', p.primary); set('accentColor', p.accent); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all hover:scale-105 ${local.accentColor === p.accent ? 'border-[var(--accent)] shadow-lg' : 'border-[var(--border)]'}`}>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-full" style={{ background: p.primary }} />
                <div className="w-4 h-4 rounded-full" style={{ background: p.accent }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{p.name}</span>
              {local.accentColor === p.accent && <Check size={12} className="text-[var(--accent)]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">Primary Color</label>
          <div className="flex gap-3 items-center">
            <input type="color" value={local.primaryColor} onChange={e => set('primaryColor', e.target.value)}
              className="w-14 h-12 rounded-xl border border-[var(--border)] cursor-pointer bg-transparent" />
            <input type="text" value={local.primaryColor} onChange={e => set('primaryColor', e.target.value)}
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs font-mono outline-none focus:border-[var(--accent)]/50" />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">Accent Color</label>
          <div className="flex gap-3 items-center">
            <input type="color" value={local.accentColor} onChange={e => set('accentColor', e.target.value)}
              className="w-14 h-12 rounded-xl border border-[var(--border)] cursor-pointer bg-transparent" />
            <input type="text" value={local.accentColor} onChange={e => set('accentColor', e.target.value)}
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs font-mono outline-none focus:border-[var(--accent)]/50" />
          </div>
        </div>
      </div>

      {/* Base Theme */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
          <Eye size={14} className="text-[var(--accent)]" /> Base Mode
        </label>
        <div className="flex gap-3">
          {['light', 'dark', 'luxury'].map(mode => (
            <button key={mode} type="button" onClick={() => set('globalTheme', mode)}
              className={`flex-1 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${local.globalTheme === mode ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40'}`}>
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
          <Type size={14} className="text-[var(--accent)]" /> Font Family
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FONTS.map(f => (
            <button key={f.name} type="button" onClick={() => set('fontFamily', f.value)}
              className={`py-3 px-4 rounded-xl border text-sm transition-all text-left ${local.fontFamily === f.value ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] hover:border-[var(--accent)]/30'}`}
              style={{ fontFamily: f.value }}>
              <span className="text-[var(--text-primary)] font-semibold text-xs">{f.name}</span>
              {local.fontFamily === f.value && <Check size={12} className="text-[var(--accent)] ml-1 inline" />}
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
          <Sliders size={14} className="text-[var(--accent)]" /> Border Radius: {local.borderRadius}px
        </label>
        <input type="range" min={0} max={24} step={2} value={local.borderRadius}
          onChange={e => set('borderRadius', Number(e.target.value))}
          className="w-full accent-[var(--accent)]" />
        <div className="flex justify-between text-[9px] text-[var(--text-secondary)] opacity-50">
          <span>Sharp (0)</span><span>Rounded (12)</span><span>Pill (24)</span>
        </div>
      </div>

      {/* Live Preview Swatch */}
      <div className="p-6 rounded-2xl border border-[var(--border)]" style={{ borderRadius: local.borderRadius, fontFamily: local.fontFamily }}>
        <p className="text-[9px] uppercase tracking-widest opacity-50 mb-3">Live Preview</p>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg" style={{ background: local.accentColor, borderRadius: local.borderRadius }} />
          <div>
            <div className="text-sm font-black" style={{ color: local.accentColor }}>Accent Text</div>
            <div className="text-[10px] text-[var(--text-secondary)]">Primary background + accent</div>
          </div>
          <button className="ml-auto px-5 py-2 text-white text-xs font-bold"
            style={{ background: local.accentColor, borderRadius: local.borderRadius + 4 }}>
            Button
          </button>
        </div>
      </div>

      <button type="button" onClick={handleSave} disabled={loading}
        className="w-full py-4 bg-[var(--accent)] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Theme Settings'}
      </button>
    </div>
  );
};

export default ThemeCustomizer;
