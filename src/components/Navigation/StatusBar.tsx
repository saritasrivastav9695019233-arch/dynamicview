import React from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { Wifi, Signal, Battery, Zap } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { deviceTime, charging, notifications, islandSettings } = useLauncher();

  // If island is in center, status bar elements flank the left and right neatly!
  return (
    <div className="absolute top-0 left-0 right-0 z-40 h-8 px-5 flex items-center justify-between text-white text-[11px] font-semibold tracking-tight select-none pointer-events-none">
      {/* Left side: Time & mini active notification icons */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-white/90">{deviceTime}</span>
        {notifications.length > 0 && (
          <div className="flex items-center gap-1 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        )}
      </div>

      {/* Right side: 5G, VoLTE, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5 text-white/80">
        <span className="text-[9px] font-bold tracking-tighter opacity-70">VoLTE</span>
        <span className="text-[10px] font-bold text-cyan-300">5G</span>
        <Signal className="w-3 h-3 stroke-[2.5]" />
        <Wifi className="w-3 h-3 stroke-[2.5]" />
        <div className="flex items-center gap-0.5 ml-0.5">
          <span className="text-[10px] font-mono font-bold text-white/90">
            {charging.batteryLevel}%
          </span>
          {charging.isCharging ? (
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
          ) : (
            <Battery className="w-3.5 h-3.5 stroke-[2]" />
          )}
        </div>
      </div>
    </div>
  );
};
