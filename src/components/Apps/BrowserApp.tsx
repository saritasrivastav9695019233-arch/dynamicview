import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { ArrowLeft, X, RefreshCw, Lock, Globe, ExternalLink } from 'lucide-react';

export const BrowserApp: React.FC = () => {
  const { goBack, goHome, activeCustomWebUrl, apps, activeAppId } = useLauncher();
  const currentApp = apps.find((a) => a.id === activeAppId);
  const initialUrl = activeCustomWebUrl || 'https://news.ycombinator.com';
  
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }
    setIsLoading(true);
    setCurrentUrl(target);
    setUrlInput(target);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="absolute inset-0 z-40 bg-neutral-950 flex flex-col pt-12 pb-16 overflow-hidden text-white select-none">
      {/* Browser Navigation Bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10 bg-neutral-900/90 backdrop-blur-xl">
        <button
          type="button"
          onClick={goBack}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Address Bar Form */}
        <form onSubmit={handleNavigate} className="flex-1 flex items-center bg-white/10 rounded-xl px-2.5 py-1.5 border border-white/10">
          <Lock className="w-3 h-3 text-emerald-400 mr-1.5 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter web URL..."
            className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-mono"
          />
        </form>

        <button
          type="button"
          onClick={handleReload}
          className={`p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition text-white/70 ${
            isLoading ? 'animate-spin text-cyan-400' : ''
          }`}
          title="Reload"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition text-white/70"
          title="Open in new browser tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          type="button"
          onClick={goHome}
          className="p-1.5 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition text-white/70"
          title="Close to Home"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="h-0.5 w-full bg-cyan-500/30 overflow-hidden">
          <div className="h-full bg-cyan-400 w-1/2 animate-pulse" />
        </div>
      )}

      {/* Web App Frame */}
      <div className="flex-1 relative bg-neutral-900">
        <iframe
          src={currentUrl}
          title={currentApp?.name || 'Origin Web Viewer'}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="w-full h-full border-0 bg-white"
        />

        {/* Floating banner to remind user they can click back */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] text-white/70 pointer-events-none shadow-lg">
          Swipe or tap bottom Back button to return to launcher
        </div>
      </div>
    </div>
  );
};
