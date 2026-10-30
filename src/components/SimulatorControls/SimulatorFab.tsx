import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import {
  Zap,
  Phone,
  MessageCircle,
  Play,
  Pause,
  Timer,
  Bike,
  Headphones,
  Sliders,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export const SimulatorFab: React.FC = () => {
  const {
    charging,
    toggleCharging,
    triggerIncomingCall,
    addNotification,
    music,
    togglePlayMusic,
    toggleTimer,
    triggerDeliveryUpdate,
    toggleBluetoothConnection,
    isDeviceFrameMode,
    setIsDeviceFrameMode,
    expandIsland,
    openScreen
  } = useLauncher();

  const [isOpen, setIsOpen] = useState(false);

  const handleTestWhatsApp = () => {
    addNotification({
      appName: 'WhatsApp',
      appPackage: 'com.whatsapp',
      sender: 'Karan Mehta',
      title: 'Karan Mehta',
      message: 'Hey, this OriginOS dynamic island animation looks ultra smooth! 🔥',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      iconColor: '#25D366'
    });
  };

  return (
    <div className="fixed bottom-14 right-3 z-50 select-none">
      {/* Minimized Pill Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-2xl backdrop-blur-md transition active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Triggers</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Quick Action Drawer (opens upwards from bottom) */}
      {isOpen && (
        <div className="absolute right-0 bottom-10 w-64 rounded-3xl bg-neutral-950/95 border border-cyan-500/30 p-3.5 text-white shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-cyan-300">Quick Simulation Hub</span>
            <button
              type="button"
              onClick={() => setIsDeviceFrameMode(!isDeviceFrameMode)}
              className="text-[10px] text-white/70 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full"
              title="Toggle Phone Frame vs Full-screen"
            >
              <Smartphone className="w-3 h-3" />
              <span>{isDeviceFrameMode ? 'Full Screen' : 'Phone Frame'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* 1. Charging */}
            <button
              type="button"
              onClick={toggleCharging}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                charging.isCharging
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
              }`}
            >
              <Zap className="w-4 h-4 shrink-0" />
              <div className="truncate">
                <div className="font-bold">{charging.isCharging ? 'Unplug' : 'Plug 120W'}</div>
                <div className="text-[9px] text-white/50">{charging.batteryLevel}% Turbo</div>
              </div>
            </button>

            {/* 2. Call */}
            <button
              type="button"
              onClick={triggerIncomingCall}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <div className="font-bold">Test Call</div>
                <div className="text-[9px] text-white/50">Incoming pill</div>
              </div>
            </button>

            {/* 3. WhatsApp Message */}
            <button
              type="button"
              onClick={handleTestWhatsApp}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <div className="font-bold">WhatsApp</div>
                <div className="text-[9px] text-white/50">Notif peek</div>
              </div>
            </button>

            {/* 4. Music Play/Pause */}
            <button
              type="button"
              onClick={() => {
                togglePlayMusic();
                expandIsland('music');
              }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              {music.isPlaying ? <Pause className="w-4 h-4 text-pink-400 shrink-0" /> : <Play className="w-4 h-4 text-pink-400 shrink-0" />}
              <div className="truncate">
                <div className="font-bold">Music</div>
                <div className="text-[9px] text-white/50">{music.isPlaying ? 'Playing' : 'Paused'}</div>
              </div>
            </button>

            {/* 5. Countdown Timer */}
            <button
              type="button"
              onClick={() => {
                toggleTimer();
                expandIsland('timer');
              }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              <Timer className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="truncate">
                <div className="font-bold">Timer</div>
                <div className="text-[9px] text-white/50">Start/Stop</div>
              </div>
            </button>

            {/* 6. Blinkit Delivery */}
            <button
              type="button"
              onClick={triggerDeliveryUpdate}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              <Bike className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <div className="font-bold">Delivery</div>
                <div className="text-[9px] text-white/50">ETA Update</div>
              </div>
            </button>

            {/* 7. Bluetooth Earbuds */}
            <button
              type="button"
              onClick={toggleBluetoothConnection}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-left flex items-center gap-2 transition active:scale-95"
            >
              <Headphones className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="truncate">
                <div className="font-bold">vivo TWS</div>
                <div className="text-[9px] text-white/50">Battery pill</div>
              </div>
            </button>

            {/* 8. Settings */}
            <button
              type="button"
              onClick={() => {
                openScreen('settings');
                setIsOpen(false);
              }}
              className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-left flex items-center gap-2 transition active:scale-95"
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <div className="truncate">
                <div className="font-bold">Settings</div>
                <div className="text-[9px] text-cyan-200">Notch & Perms</div>
              </div>
            </button>
          </div>

          <div className="text-[10px] text-white/40 text-center pt-1 border-t border-white/10">
            OriginOS Dynamic Island · Android 17
          </div>
        </div>
      )}
    </div>
  );
};
