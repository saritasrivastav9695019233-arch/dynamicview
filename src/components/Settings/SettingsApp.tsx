import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import { WALLPAPERS } from '../../data/defaultData';
import { IconPackType } from '../../types/launcher';
import {
  ArrowLeft,
  X,
  Sliders,
  ShieldCheck,
  Palette,
  Volume2,
  Smartphone,
  Check,
  Zap,
  Bell,
  Layers,
  BatteryCharging,
  Eye,
  Radio,
  Sparkles,
  Download,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Maximize2,
  Minimize2,
  Phone,
  Timer as TimerIcon,
  Compass,
  LayoutGrid
} from 'lucide-react';

type SettingsSubpage =
  | 'main'
  | 'position'
  | 'charging'
  | 'notifications'
  | 'music'
  | 'calls'
  | 'permissions'
  | 'appearance'
  | 'audio';

export const SettingsApp: React.FC = () => {
  const {
    goBack,
    goHome,
    openScreen,
    islandSettings,
    updateIslandSettings,
    launcherSettings,
    updateLauncherSettings,
    permissions,
    togglePermission,
    requestPermissionForFeature,
    moveIslandUp,
    moveIslandDown,
    moveIslandLeft,
    moveIslandRight,
    adjustIslandWidth,
    adjustIslandHeight,
    expandIsland,
    toggleCharging,
    triggerIncomingCall,
    addNotification,
    togglePlayMusic
  } = useLauncher();

  const [activeSubpage, setActiveSubpage] = useState<SettingsSubpage>('main');

  const allPermissionsGranted = permissions.filter((p) => p.required).every((p) => p.granted);

  const navigateTo = (sub: SettingsSubpage) => {
    setActiveSubpage(sub);
  };

  const handleSubBack = () => {
    if (activeSubpage !== 'main') {
      setActiveSubpage('main');
    } else {
      goBack();
    }
  };

  const handleMasterToggle = () => {
    requestPermissionForFeature('master_island');
  };

  return (
    <div className="absolute inset-0 z-30 bg-neutral-950 flex flex-col pt-12 pb-6 overflow-hidden text-white select-none">
      {/* Universal Top Bar with prominent Back & Direct Close buttons */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-900/90 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSubBack}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white text-xs font-semibold"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white">
              {activeSubpage === 'main' && 'Dynamic Bar Controller'}
              {activeSubpage === 'position' && 'Position & Cutout (Upar / Neeche)'}
              {activeSubpage === 'charging' && '120W Charging Animation'}
              {activeSubpage === 'notifications' && 'Notification Island'}
              {activeSubpage === 'music' && 'Music & Audio Visualizer'}
              {activeSubpage === 'calls' && 'Phone Calls Island'}
              {activeSubpage === 'permissions' && 'Android Permissions'}
              {activeSubpage === 'appearance' && 'Themes & Icon Packs'}
              {activeSubpage === 'audio' && 'Sound & Haptics'}
            </h2>
            <p className="text-[10px] text-white/50">
              {islandSettings.enabled ? '● Dynamic Island Active' : '○ Island Turned Off'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Switch to Launcher Desktop View */}
          <button
            type="button"
            onClick={() => openScreen('home')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-medium transition"
            title="Switch to OriginOS Launcher Desktop"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={goHome}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition text-white/70"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none space-y-4">
        <AnimatePresence mode="wait">
          {/* 1. MAIN CONTROL CENTER */}
          {activeSubpage === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* MASTER ON / OFF TOGGLE BANNER */}
              <div
                className={`p-4 rounded-3xl border transition-all duration-300 shadow-xl ${
                  islandSettings.enabled
                    ? 'bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-neutral-900 border-cyan-500/40 shadow-cyan-950/30'
                    : 'bg-neutral-900/60 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-2xl transition ${
                        islandSettings.enabled
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/40'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Dynamic Island (Origin Bar)</h3>
                      <p className="text-xs text-white/60">
                        {islandSettings.enabled
                          ? 'Active & showing on top of display'
                          : 'Turn ON to display floating island'}
                      </p>
                    </div>
                  </div>

                  {/* Master Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={islandSettings.enabled ?? false}
                      onChange={handleMasterToggle}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500 shadow-inner"></div>
                  </label>
                </div>

                {!allPermissionsGranted && !islandSettings.enabled && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-medium">● Permissions Required</span>
                    <button
                      type="button"
                      onClick={() => requestPermissionForFeature('master_island')}
                      className="text-xs font-bold text-cyan-300 underline"
                    >
                      Grant & Enable Now →
                    </button>
                  </div>
                )}
              </div>

              {/* QUICK LIVE POSITION TUNING BOX (Upar / Neeche Live Controls) */}
              <div className="p-4 rounded-3xl bg-neutral-900 border border-white/10 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Notch Position (Upar / Neeche)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('position')}
                    className="text-xs text-cyan-400 font-semibold hover:underline"
                  >
                    Full Tuning →
                  </button>
                </div>

                <p className="text-[11px] text-white/60">
                  Tap buttons below to move the island on your mobile screen in real time:
                </p>

                {/* Direct Move Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => moveIslandUp(3)}
                    className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex flex-col items-center justify-center gap-1 transition"
                  >
                    <ArrowUp className="w-4 h-4 text-cyan-300" />
                    <span className="text-[10px] font-bold">⬆ Upar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveIslandDown(3)}
                    className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex flex-col items-center justify-center gap-1 transition"
                  >
                    <ArrowDown className="w-4 h-4 text-cyan-300" />
                    <span className="text-[10px] font-bold">⬇ Neeche</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveIslandLeft(4)}
                    className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex flex-col items-center justify-center gap-1 transition"
                  >
                    <ArrowLeftIcon className="w-4 h-4 text-cyan-300" />
                    <span className="text-[10px] font-bold">⬅ Baaye</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveIslandRight(4)}
                    className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex flex-col items-center justify-center gap-1 transition"
                  >
                    <ArrowRightIcon className="w-4 h-4 text-cyan-300" />
                    <span className="text-[10px] font-bold">➡ Daaye</span>
                  </button>
                </div>

                {/* Live Offset Metrics */}
                <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5 font-mono">
                  <span>Top Offset: <strong className="text-cyan-300">{islandSettings.yOffset ?? 12}px</strong></span>
                  <span>Horizontal: <strong className="text-cyan-300">{islandSettings.xOffset ?? 0}px</strong></span>
                  <span>Width: <strong className="text-cyan-300">{islandSettings.widthCollapsed ?? 140}px</strong></span>
                </div>
              </div>

              {/* INDIVIDUAL FEATURE SETTINGS WITH ON/OFF SWITCHES & BACK BUTTONS */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 px-1">
                  Feature Settings & Triggers
                </div>

                {/* 1. 120W Super FlashCharge Card */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition">
                  <div
                    onClick={() => navigateTo('charging')}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">120W FlashCharge Animation</div>
                      <div className="text-[11px] text-white/50">Cyber turbo rotating particle ring</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleCharging}
                      className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={islandSettings.chargingEnabled ?? false}
                        onChange={() => requestPermissionForFeature('charging')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                {/* 2. Notifications Island Card */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition">
                  <div
                    onClick={() => navigateTo('notifications')}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Dynamic Notifications (Spot)</div>
                      <div className="text-[11px] text-white/50">WhatsApp, SMS, inline reply pill</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addNotification({
                          appName: 'WhatsApp',
                          appPackage: 'com.whatsapp',
                          sender: 'Rahul Verma',
                          title: 'Rahul Verma',
                          message: 'Testing OriginOS dynamic island notification! 🔥',
                          iconColor: '#25D366'
                        })
                      }
                      className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-[10px] font-bold hover:bg-blue-500/30"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={islandSettings.notificationsEnabled ?? false}
                        onChange={() => requestPermissionForFeature('notifications')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>

                {/* 3. Music & Sound Visualizer Card */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition">
                  <div
                    onClick={() => navigateTo('music')}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Music & Live Audio Visualizer</div>
                      <div className="text-[11px] text-white/50">Dynamic equalizer wave & playback</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        togglePlayMusic();
                        expandIsland('music');
                      }}
                      className="px-2 py-1 rounded-lg bg-pink-500/20 text-pink-300 text-[10px] font-bold hover:bg-pink-500/30"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={islandSettings.musicEnabled ?? false}
                        onChange={() => requestPermissionForFeature('music')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>

                {/* 4. Incoming Calls Card */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition">
                  <div
                    onClick={() => navigateTo('calls')}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Call Alerts & Active Call Island</div>
                      <div className="text-[11px] text-white/50">Answer, decline, timer in island</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={triggerIncomingCall}
                      className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={islandSettings.callEnabled ?? false}
                        onChange={() => requestPermissionForFeature('call')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                {/* 5. System Permissions Hub (Screenshot 1-4) */}
                <div
                  onClick={() => navigateTo('permissions')}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">System Permissions & Accessibility</div>
                      <div className="text-[11px] text-white/50">AccessibilityService, overlay, battery whitelist</div>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">
                    {allPermissionsGranted ? 'Granted ✓' : 'Setup →'}
                  </span>
                </div>

                {/* 6. Appearance & Icon Packs */}
                <div
                  onClick={() => navigateTo('appearance')}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Themes & Custom Icon Packs</div>
                      <div className="text-[11px] text-white/50">Squircle, Cyber Neon, Material You, Wallpapers</div>
                    </div>
                  </div>
                  <span className="text-xs text-white/50">Customize →</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. POSITION & CUTOUT DETAILED SUBPAGE (Upar / Neeche / Notch tuning) */}
          {activeSubpage === 'position' && (
            <motion.div
              key="position"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-3xl bg-neutral-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-cyan-300">Cutout Alignment Presets</span>
                  <span className="text-[10px] text-white/40">1-Tap Preset</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateIslandSettings({ position: 'center', xOffset: 0, yOffset: 12 })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium transition ${
                      islandSettings.position === 'center'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    Center Hole
                  </button>
                  <button
                    type="button"
                    onClick={() => updateIslandSettings({ position: 'left', xOffset: 0, yOffset: 12 })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium transition ${
                      islandSettings.position === 'left'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    Left Hole
                  </button>
                  <button
                    type="button"
                    onClick={() => updateIslandSettings({ position: 'right', xOffset: 0, yOffset: 12 })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium transition ${
                      islandSettings.position === 'right'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    Right Hole
                  </button>
                </div>

                {/* UPAR / NEECHE Slider & Stepper */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">Vertical Position (Upar / Neeche)</span>
                    <span className="font-mono text-cyan-300 font-bold">{islandSettings.yOffset ?? 12} px</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={islandSettings.yOffset ?? 12}
                    onChange={(e) => updateIslandSettings({ yOffset: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveIslandUp(1)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-cyan-300"
                    >
                      ▲ Move Up (1px)
                    </button>
                    <button
                      type="button"
                      onClick={() => moveIslandDown(1)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-cyan-300"
                    >
                      ▼ Move Down (1px)
                    </button>
                  </div>
                </div>

                {/* LEFT / RIGHT Horizontal Offset */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">Horizontal Offset (Baaye / Daaye)</span>
                    <span className="font-mono text-cyan-300 font-bold">{islandSettings.xOffset ?? 0} px</span>
                  </div>

                  <input
                    type="range"
                    min="-60"
                    max="60"
                    value={islandSettings.xOffset ?? 0}
                    onChange={(e) => updateIslandSettings({ xOffset: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveIslandLeft(1)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-cyan-300"
                    >
                      ◀ Move Left (1px)
                    </button>
                    <button
                      type="button"
                      onClick={() => moveIslandRight(1)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-cyan-300"
                    >
                      ▶ Move Right (1px)
                    </button>
                  </div>
                </div>

                {/* Width & Height Sliders */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-white">Island Width (Choudai)</span>
                      <span className="font-mono text-cyan-300 font-bold">{islandSettings.widthCollapsed ?? 140} px</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="280"
                      value={islandSettings.widthCollapsed ?? 140}
                      onChange={(e) => updateIslandSettings({ widthCollapsed: Number(e.target.value) })}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-white">Island Height (Lambai)</span>
                      <span className="font-mono text-cyan-300 font-bold">{islandSettings.heightCollapsed ?? 36} px</span>
                    </div>
                    <input
                      type="range"
                      min="26"
                      max="50"
                      value={islandSettings.heightCollapsed ?? 36}
                      onChange={(e) => updateIslandSettings({ heightCollapsed: Number(e.target.value) })}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Camera Punch Hole Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <div className="text-xs font-semibold text-white">Punch Hole Camera Cutout</div>
                    <div className="text-[10px] text-white/50">Blend camera circle seamlessly</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={islandSettings.showCameraCutout ?? true}
                    onChange={(e) => updateIslandSettings({ showCameraCutout: e.target.checked })}
                    className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => expandIsland()}
                className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition"
              >
                Test Expanded Island Now
              </button>
            </motion.div>
          )}

          {/* 3. CHARGING SUBPAGE */}
          {activeSubpage === 'charging' && (
            <motion.div
              key="charging"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-3xl bg-neutral-900 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-sm font-bold text-white">FlashCharge Power Mode</h4>
                    <p className="text-xs text-white/50">Automatic charging animation</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={islandSettings.chargingEnabled ?? false}
                      onChange={() => requestPermissionForFeature('charging')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white">Select Wattage Speed</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[120, 80, 44, 18].map((watt) => (
                      <button
                        key={watt}
                        type="button"
                        onClick={toggleCharging}
                        className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-300 border border-emerald-500/20 active:scale-95 transition"
                      >
                        {watt}W
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleCharging}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Simulate Plug-in 120W FlashCharge</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. NOTIFICATIONS SUBPAGE */}
          {activeSubpage === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-3xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-sm font-bold text-white">Dynamic Spot Alerts</h4>
                    <p className="text-xs text-white/50">Show unread messages in island</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={islandSettings.notificationsEnabled ?? false}
                      onChange={() => requestPermissionForFeature('notifications')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addNotification({
                      appName: 'WhatsApp',
                      appPackage: 'com.whatsapp',
                      sender: 'Rahul Verma',
                      title: 'Rahul Verma',
                      message: 'Hey, dynamic island notification popup works smoothly on Android 17!',
                      iconColor: '#25D366'
                    })
                  }
                  className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition"
                >
                  Send Test WhatsApp Message to Island
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. PERMISSIONS SUBPAGE (Exact match to screenshot 1-4) */}
          {activeSubpage === 'permissions' && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* Disclosure Card */}
              <div className="p-4 rounded-3xl bg-neutral-900 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Official Disclosure</span>
                </div>
                <p className="text-xs text-white/80 italic leading-relaxed">
                  "The app utilizes the AccessibilityService solely to display the Dynamic Bar view. Rest assured, no data is collected or shared using the AccessibilityService API."
                </p>
              </div>

              {/* Individual Permission Items */}
              <div className="space-y-2.5">
                {permissions.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{p.title}</span>
                      <button
                        type="button"
                        onClick={() => togglePermission(p.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          p.granted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {p.granted ? 'Granted ✓' : 'Allow'}
                      </button>
                    </div>
                    <p className="text-[11px] text-white/60">{p.description}</p>
                    <div className="text-[10px] text-white/40 font-mono">{p.androidManifestName}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 6. APPEARANCE SUBPAGE */}
          {activeSubpage === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-3xl bg-neutral-900 border border-white/10 space-y-3">
                <label className="text-xs font-bold text-white">Select Icon Pack</label>
                {(
                  [
                    { id: 'originos', label: 'OriginOS 17 Squircle', desc: 'Continuous curvature squircle' },
                    { id: 'material_you', label: 'Material You Adaptive', desc: 'Monochrome adaptive icons' },
                    { id: 'cyber_neon', label: 'Cyber Neon Glow', desc: 'Glowing cyan accents' },
                    { id: 'glassmorphism', label: 'Frosted Glass', desc: 'Translucent glass blur' }
                  ] as const
                ).map((pk) => (
                  <div
                    key={pk.id}
                    onClick={() => updateLauncherSettings({ iconPack: pk.id })}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      launcherSettings.iconPack === pk.id
                        ? 'bg-cyan-500/15 border-cyan-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/80'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{pk.label}</div>
                      <div className="text-[10px] text-white/50">{pk.desc}</div>
                    </div>
                    {launcherSettings.iconPack === pk.id && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
