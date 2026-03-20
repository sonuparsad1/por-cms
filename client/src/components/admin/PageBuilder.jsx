import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Eye, EyeOff, Layers, Type, Image as ImageIcon, Video, Grid,
  Star, Code, Monitor, Clock, TrendingUp, Layout, Quote, Zap, AlignLeft
} from 'lucide-react';

import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import VideoBlock from './blocks/VideoBlock';
import GalleryBlock from './blocks/GalleryBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import CodeBlock from './blocks/CodeBlock';
import TimelineBlock from './blocks/TimelineBlock';
import DemoBlock from './blocks/DemoBlock';
import StatsBlock from './blocks/StatsBlock';
import HeroBlock from './blocks/HeroBlock';
import CTABlock from './blocks/CTABlock';
import QuoteBlock from './blocks/QuoteBlock';

const BLOCK_PALETTE = [
  { type: 'hero',      label: 'Hero',      icon: Layout,    color: 'from-purple-500/20 to-pink-500/20',   default: { headline: '', subheading: '', ctaLabel: '', ctaUrl: '', bgImage: '', align: 'center', height: 'screen' } },
  { type: 'text',      label: 'Text',      icon: Type,      color: 'from-blue-500/20 to-cyan-500/20',      default: '' },
  { type: 'image',     label: 'Image',     icon: ImageIcon, color: 'from-green-500/20 to-teal-500/20',    default: { url: '', caption: '', alt: '', layout: 'full' } },
  { type: 'video',     label: 'Video',     icon: Video,     color: 'from-red-500/20 to-orange-500/20',    default: { url: '', title: '', type: 'youtube' } },
  { type: 'gallery',   label: 'Gallery',   icon: Grid,      color: 'from-yellow-500/20 to-amber-500/20',  default: { images: [], title: '', cols: 3 } },
  { type: 'features',  label: 'Features',  icon: Star,      color: 'from-indigo-500/20 to-violet-500/20', default: { items: [], title: '' } },
  { type: 'stats',     label: 'Stats',     icon: TrendingUp,color: 'from-emerald-500/20 to-green-500/20', default: { stats: [], title: '' } },
  { type: 'code',      label: 'Code',      icon: Code,      color: 'from-slate-500/20 to-gray-500/20',    default: { code: '', language: 'javascript', filename: '', caption: '' } },
  { type: 'demo',      label: 'Demo',      icon: Monitor,   color: 'from-cyan-500/20 to-blue-500/20',     default: { url: '', title: '', height: 500 } },
  { type: 'timeline',  label: 'Timeline',  icon: Clock,     color: 'from-orange-500/20 to-red-500/20',    default: { steps: [], title: '' } },
  { type: 'cta',       label: 'CTA',       icon: Zap,       color: 'from-rose-500/20 to-pink-500/20',     default: { heading: '', subtext: '', btnLabel: '', btnUrl: '', style: 'accent', align: 'center' } },
  { type: 'quote',     label: 'Quote',     icon: Quote,     color: 'from-violet-500/20 to-purple-500/20', default: { text: '', attribution: '', style: 'left-border' } },
  { type: 'divider',   label: 'Divider',   icon: AlignLeft, color: 'from-gray-400/20 to-gray-600/20',    default: { style: 'line', label: '' } },
];

const BLOCK_COMPONENTS = {
  hero: HeroBlock, text: TextBlock, image: ImageBlock, video: VideoBlock,
  gallery: GalleryBlock, features: FeaturesBlock, stats: StatsBlock,
  code: CodeBlock, demo: DemoBlock, timeline: TimelineBlock,
  cta: CTABlock, quote: QuoteBlock,
  divider: ({ content, onChange }) => (
    <div className="space-y-3">
      <div className="flex gap-4 items-center">
        <select className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-xs outline-none"
          value={content.style || 'line'} onChange={e => onChange({ ...content, style: e.target.value })}>
          <option value="line">Simple Line</option>
          <option value="dots">Dotted</option>
          <option value="thick">Thick</option>
          <option value="gradient">Gradient</option>
        </select>
        <input className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2 text-[var(--text-primary)] text-xs outline-none"
          placeholder="Optional label..." value={content.label || ''} onChange={e => onChange({ ...content, label: e.target.value })} />
      </div>
      <div className="py-4 flex items-center gap-4">
        {content.label && <span className="text-xs text-[var(--text-secondary)] shrink-0">{content.label}</span>}
        <div className={`flex-1 ${content.style === 'thick' ? 'h-2 rounded-full' : 'h-px'} ${content.style === 'dots' ? 'border-t-2 border-dotted' : content.style === 'gradient' ? 'bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent' : 'bg-[var(--border)]'}`} />
      </div>
    </div>
  ),
};

// Sortable wrapper for each block
const SortableBlock = ({ block, idx, totalBlocks, onUpdate, onRemove, token }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const [collapsed, setCollapsed] = useState(false);
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 999 : 'auto' };
  const palette = BLOCK_PALETTE.find(b => b.type === block.type);
  const BlockComponent = BLOCK_COMPONENTS[block.type];
  const Icon = palette?.icon || Layers;

  return (
    <div ref={setNodeRef} style={style} className="group relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Block Header */}
      <div className={`flex items-center justify-between px-6 py-4 bg-gradient-to-r ${palette?.color || 'from-gray-500/10 to-gray-700/10'} border-b border-[var(--border)]`}>
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-black/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <GripVertical size={16} />
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon size={16} className="text-white" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">{palette?.label || block.type}</span>
            <span className="text-[9px] text-[var(--text-secondary)] opacity-50 ml-2">Block {idx + 1}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => setCollapsed(c => !c)}
            className="p-2 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl transition-all">
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <button type="button" onClick={() => onRemove(block.id)}
            className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Block Content */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="p-6">
              {BlockComponent ? (
                <BlockComponent content={block.content} onChange={val => onUpdate(block.id, val)} token={token} />
              ) : (
                <div className="py-8 text-center text-[var(--text-secondary)] opacity-50 text-sm">Block type "{block.type}" not yet implemented.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main PageBuilder
const PageBuilder = ({ blocks = [], onChange, token }) => {
  const [showPalette, setShowPalette] = useState(false);
  const [preview, setPreview] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addBlock = (type) => {
    const palette = BLOCK_PALETTE.find(b => b.type === type);
    onChange([...blocks, {
      id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      content: JSON.parse(JSON.stringify(palette?.default ?? ''))
    }]);
    setShowPalette(false);
  };

  const updateBlock = (id, content) => onChange(blocks.map(b => b.id === id ? { ...b, content } : b));
  const removeBlock = (id) => onChange(blocks.filter(b => b.id !== id));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);
      onChange(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--accent)]/10 rounded-xl text-[var(--accent)]"><Layers size={18} /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Page Builder</p>
            <p className="text-[9px] text-[var(--text-secondary)] opacity-50">{blocks.length} block{blocks.length !== 1 ? 's' : ''} · Drag to reorder</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPreview(p => !p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${preview ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]'}`}>
            {preview ? <EyeOff size={14} /> : <Eye size={14} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button type="button" onClick={() => setShowPalette(p => !p)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all">
            <Plus size={14} /> Add Block
          </button>
        </div>
      </div>

      {/* Block Palette */}
      <AnimatePresence>
        {showPalette && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl shadow-2xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-4 opacity-60">Choose a block type</p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {BLOCK_PALETTE.map(({ type, label, icon: Icon, color }) => (
                <button key={type} type="button" onClick={() => addBlock(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border border-[var(--border)] bg-gradient-to-br ${color} hover:scale-105 hover:border-[var(--accent)]/40 transition-all`}>
                  <Icon size={18} className="text-[var(--text-primary)]" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-secondary)]">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sortable Blocks */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {blocks.map((block, idx) => (
              <SortableBlock key={block.id} block={block} idx={idx} totalBlocks={blocks.length}
                onUpdate={updateBlock} onRemove={removeBlock} token={token} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && !showPalette && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="py-20 flex flex-col items-center gap-4 border-2 border-dashed border-[var(--border)] rounded-3xl text-[var(--text-secondary)] hover:border-[var(--accent)]/30 transition-all cursor-pointer"
          onClick={() => setShowPalette(true)}>
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center">
            <Plus size={24} className="text-[var(--accent)]" />
          </div>
          <div className="text-center">
            <p className="font-black text-xs uppercase tracking-widest text-[var(--text-primary)]">No blocks yet</p>
            <p className="text-[10px] opacity-50 mt-1">Click to open block palette and add your first block</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PageBuilder;
