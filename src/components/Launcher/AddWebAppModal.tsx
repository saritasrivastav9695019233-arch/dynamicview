import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { X, Globe, Plus, Sparkles } from 'lucide-react';

interface AddWebAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWebAppModal: React.FC<AddWebAppModalProps> = ({ isOpen, onClose }) => {
  const { addCustomWebApp } = useLauncher();
  const [appName, setAppName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  if (!isOpen) return null;

  const colorPresets = [
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#f59e0b', // Amber
    '#06b6d4', // Cyan
    '#ef4444'  // Red
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim() || !appUrl.trim()) return;
    addCustomWebApp(appName.trim(), appUrl.trim(), selectedColor);
    setAppName('');
    setAppUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-neutral-900 border border-white/15 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Add Web App to Desktop</h3>
              <p className="text-[11px] text-white/50">Turn any website into a launcher app</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">App Name</label>
            <input
              type="text"
              required
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. My Portfolio, AI Studio, Wikipedia"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Website URL</label>
            <input
              type="text"
              required
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-2">Icon Accent Color</label>
            <div className="flex items-center gap-2">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    selectedColor === c ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create App</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
