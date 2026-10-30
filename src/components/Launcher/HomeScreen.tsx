import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { ClockWidget, RamBoosterWidget, HealthWidget, WeatherWidget, QuickNotesWidget, MusicWidget } from './Widgets/AtomicWidgets';
import { AppIcon } from './AppIcon';
import { ChevronUp, Plus, Sliders } from 'lucide-react';
import { AddWebAppModal } from './AddWebAppModal';

export const HomeScreen: React.FC = () => {
  const { apps, launcherSettings, openScreen, islandSettings } = useLauncher();
  const [isAddWebModalOpen, setIsAddWebModalOpen] = useState(false);

  // Home screen desktop apps (first 8 non-dock apps)
  const dockIds = launcherSettings.dockPinnedAppIds;
  const desktopApps = apps.filter((a) => !dockIds.includes(a.id)).slice(0, 8);
  const dockApps = dockIds
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as typeof apps;

  return (
    <div
      className="relative flex flex-col justify-between h-full w-full overflow-y-auto px-4 pb-20 select-none scrollbar-none"
      style={{ paddingTop: `${Math.max(56, islandSettings.yOffset + 48)}px` }}
    >
      {/* Top Atomic Section */}
      <div className="space-y-3.5">
        <ClockWidget />

        {/* 2x2 Atomic Widgets Grid */}
        <div className="grid grid-cols-2 gap-3">
          <RamBoosterWidget />
          <HealthWidget />
          <WeatherWidget />
          <MusicWidget />
        </div>
      </div>

      {/* Main Apps Grid */}
      <div className="my-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            Apps & Shortcuts
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsAddWebModalOpen(true)}
              className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-full transition"
            >
              <Plus className="w-3 h-3" />
              <span>Add Web App</span>
            </button>
            <button
              type="button"
              onClick={() => openScreen('settings')}
              className="text-[11px] font-medium text-white/60 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-full transition"
              title="Launcher Settings"
            >
              <Sliders className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-y-4 gap-x-2 py-1">
          {desktopApps.map((app) => (
            <AppIcon key={app.id} app={app} />
          ))}
        </div>
      </div>

      {/* Swipe up indicator to open App Drawer */}
      <div
        onClick={() => openScreen('app_drawer')}
        className="flex flex-col items-center justify-center py-2 cursor-pointer group active:opacity-60 transition"
      >
        <ChevronUp className="w-4 h-4 text-white/40 group-hover:text-white/80 animate-bounce" />
        <span className="text-[10px] text-white/40 font-medium group-hover:text-white/80">
          Swipe up for all apps
        </span>
      </div>

      {/* OriginOS Glass Dock Shelf */}
      <div className="pt-2">
        <div className="p-3 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-4 gap-2">
            {dockApps.map((app) => (
              <AppIcon key={app.id} app={app} showBadge={true} />
            ))}
          </div>
        </div>
      </div>

      <AddWebAppModal
        isOpen={isAddWebModalOpen}
        onClose={() => setIsAddWebModalOpen(false)}
      />
    </div>
  );
};
