import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2, GripVertical, ExternalLink, Eye, EyeOff } from 'lucide-react';

const SortableNavItem = ({ item, onUpdate, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style}
      className="group flex items-center gap-3 p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
      <div {...attributes} {...listeners} className="cursor-grab text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        <GripVertical size={16} />
      </div>
      <input className="flex-1 bg-transparent text-[var(--text-primary)] text-xs outline-none font-bold min-w-0"
        placeholder="Label (e.g. About)" value={item.label || ''}
        onChange={e => onUpdate(item.id, 'label', e.target.value)} />
      <input className="w-36 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[var(--text-primary)] text-xs font-mono outline-none focus:border-[var(--accent)]/50"
        placeholder="/page" value={item.href || ''}
        onChange={e => onUpdate(item.id, 'href', e.target.value)} />
      <button type="button" onClick={() => onUpdate(item.id, 'isExternal', !item.isExternal)}
        title={item.isExternal ? 'External link' : 'Internal link'}
        className={`p-1.5 rounded-lg transition-all ${item.isExternal ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
        <ExternalLink size={13} />
      </button>
      <button type="button" onClick={() => onUpdate(item.id, 'hidden', !item.hidden)}
        className={`p-1.5 rounded-lg transition-all ${item.hidden ? 'text-red-400' : 'text-[var(--text-secondary)]'}`}>
        {item.hidden ? <EyeOff size={13}/> : <Eye size={13}/>}
      </button>
      <button type="button" onClick={() => onRemove(item.id)}
        className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all">
        <Trash2 size={14} />
      </button>
    </div>
  );
};

const NavigationBuilder = ({ navItems = [], onSave, loading }) => {
  const [items, setItems] = useState(
    navItems.length > 0 ? navItems : [
      { id: 'nav_home', label: 'Home', href: '/', isExternal: false, hidden: false },
      { id: 'nav_about', label: 'About', href: '/about', isExternal: false, hidden: false },
      { id: 'nav_projects', label: 'Projects', href: '/projects', isExternal: false, hidden: false },
      { id: 'nav_blog', label: 'Blog', href: '/blog', isExternal: false, hidden: false },
      { id: 'nav_contact', label: 'Contact', href: '/contact', isExternal: false, hidden: false },
    ]
  );

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const addItem = () => setItems(prev => [...prev, {
    id: `nav_${Date.now()}`, label: '', href: '', isExternal: false, hidden: false
  }]);

  const updateItem = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIdx = items.findIndex(i => i.id === active.id);
      const newIdx = items.findIndex(i => i.id === over.id);
      setItems(arrayMove(items, oldIdx, newIdx));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Navigation Items</p>
          <p className="text-[10px] text-[var(--text-secondary)] opacity-50 mt-0.5">Drag to reorder · Click eye to hide · ExternalLink for new tab</p>
        </div>
        <button type="button" onClick={addItem}
          className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--accent)]/20 transition-all">
          <Plus size={13} /> Add Item
        </button>
      </div>

      <div className="flex items-center gap-4 text-[9px] text-[var(--text-secondary)] opacity-40 uppercase tracking-widest px-3">
        <span className="w-4" />
        <span className="flex-1">Label</span>
        <span className="w-36">Path / URL</span>
        <span>Ext</span>
        <span>Hide</span>
        <span>Del</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map(item => (
              <SortableNavItem key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <div className="py-8 text-center opacity-30 text-xs uppercase tracking-widest">No nav items — click Add Item</div>
      )}

      <div className="p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)]">
        <p className="text-[9px] uppercase tracking-widest opacity-50 mb-3">Preview</p>
        <nav className="flex flex-wrap gap-2">
          {items.filter(i => !i.hidden).map(item => (
            <span key={item.id} className="flex items-center gap-1 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer">
              {item.label || '(Unnamed)'}
              {item.isExternal && <ExternalLink size={9} />}
            </span>
          ))}
        </nav>
      </div>

      <button type="button" onClick={() => onSave(items)} disabled={loading}
        className="w-full py-4 bg-[var(--accent)] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Navigation'}
      </button>
    </div>
  );
};

export default NavigationBuilder;
