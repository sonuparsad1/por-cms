import React from 'react';
import { Video, ExternalLink } from 'lucide-react';

const getEmbedUrl = (url, type) => {
  if (!url) return null;
  if (type === 'youtube' || url.includes('youtube') || url.includes('youtu.be')) {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  if (type === 'vimeo' || url.includes('vimeo')) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  }
  return url; // Direct URL fallback
};

const VideoBlock = ({ content = {}, onChange }) => {
  const embedUrl = getEmbedUrl(content.url, content.type);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1 md:col-span-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 flex items-center gap-1"><ExternalLink size={10}/> Video URL</label>
          <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50 font-mono"
            placeholder="https://youtube.com/watch?v=..." value={content.url || ''}
            onChange={e => onChange({ ...content, url: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Platform</label>
          <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none"
            value={content.type || 'youtube'} onChange={e => onChange({ ...content, type: e.target.value })}>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="direct">Direct URL</option>
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Title / Description</label>
        <input className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-xs outline-none focus:border-[var(--accent)]/50"
          placeholder="Video title or context..." value={content.title || ''}
          onChange={e => onChange({ ...content, title: e.target.value })} />
      </div>
      {embedUrl ? (
        <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-black aspect-video">
          <iframe src={embedUrl} title={content.title || 'Video'} className="w-full h-full" allowFullScreen frameBorder="0" />
        </div>
      ) : content.url ? (
        <div className="py-6 text-center text-[var(--text-secondary)] text-xs border border-dashed border-[var(--border)] rounded-2xl opacity-50">
          Could not generate embed URL. Check the URL format.
        </div>
      ) : (
        <div className="py-10 flex flex-col items-center gap-2 border border-dashed border-[var(--border)] rounded-2xl opacity-30">
          <Video size={28} />
          <span className="text-[10px] uppercase tracking-widest">Paste a YouTube or Vimeo URL above</span>
        </div>
      )}
    </div>
  );
};

export default VideoBlock;
