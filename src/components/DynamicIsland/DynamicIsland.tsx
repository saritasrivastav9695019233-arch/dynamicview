import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import { IslandExpandedView } from './IslandExpandedView';
import {
  Zap,
  Play,
  Phone,
  Timer as TimerIcon,
  Bike,
  Headphones,
  Bell
} from 'lucide-react';

export const DynamicIsland: React.FC = () => {
  const {
    islandMode,
    activeModule,
    secondaryModule,
    expandIsland,
    collapseIsland,
    islandSettings,
    charging,
    music,
    call,
    timer,
    delivery,
    bluetooth,
    notifications
  } = useLauncher();

  const islandRef = useRef<HTMLDivElement>(null);

  if (!islandSettings.enabled) return null;

  // Determine alignment style
  const getAlignmentClass = () => {
    switch (islandSettings.position) {
      case 'left':
        return 'items-start justify-start pl-4';
      case 'right':
        return 'items-start justify-end pr-4';
      case 'center':
      default:
        return 'items-start justify-center';
    }
  };

  // Helper for mini collapsed indicators
  // Helper for mini collapsed indicators
  const renderLeftPillContent = () => {
    switch (activeModule) {
      case 'charging':
        if (!islandSettings.chargingEnabled) return null;
        return (
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold font-mono">{charging.batteryLevel}%</span>
          </div>
        );
      case 'music':
        if (!music.isPlaying || !islandSettings.musicEnabled) return null;
        return (
          <div className="flex items-center gap-1.5">
            <img
              src={music.coverUrl}
              alt=""
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="text-[11px] font-medium text-white/90 truncate max-w-[70px]">
              {music.title}
            </span>
          </div>
        );
      case 'call':
        if (!islandSettings.callEnabled) return null;
        return (
          <div className="flex items-center gap-1.5 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Phone className="w-3 h-3 fill-emerald-400" />
            <span className="text-[11px] font-semibold text-white truncate max-w-[65px]">
              {call.callerName.split(' ')[0]}
            </span>
          </div>
        );
      case 'timer':
        if (!islandSettings.timerEnabled || !timer.isRunning) return null;
        return (
          <div className="flex items-center gap-1 text-amber-400">
            <TimerIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold font-mono">
              {Math.floor(timer.remainingSeconds / 60)}:{(timer.remainingSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        );
      case 'delivery':
        return (
          <div className="flex items-center gap-1 text-emerald-400">
            <Bike className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold font-mono">{delivery.etaMinutes}m</span>
          </div>
        );
      case 'bluetooth':
        if (!islandSettings.bluetoothEnabled) return null;
        return (
          <div className="flex items-center gap-1 text-cyan-400">
            <Headphones className="w-3 h-3" />
            <span className="text-[10px] font-semibold">{bluetooth.leftBattery}%</span>
          </div>
        );
      case 'notification':
        if (!islandSettings.notificationsEnabled || notifications.length === 0) return null;
        return (
          <div className="flex items-center gap-1.5">
            <Bell className="w-3 h-3 text-cyan-400 animate-bounce" />
            <span className="text-[11px] font-medium text-white truncate max-w-[75px]">
              {notifications[0]?.sender || 'Notification'}
            </span>
          </div>
        );
      default:
        // Pure clean camera notch pill - NO fake popups or song titles!
        return null;
    }
  };

  const renderRightPillContent = () => {
    switch (activeModule) {
      case 'charging':
        if (!islandSettings.chargingEnabled) return null;
        return (
          <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-wider">
            {charging.wattage}W
          </span>
        );
      case 'music':
        if (!music.isPlaying || !islandSettings.musicEnabled) return null;
        return (
          <div className="flex items-end gap-0.5 h-3">
            {[0.5, 1, 0.7, 0.9].map((m, i) => (
              <motion.div
                key={i}
                animate={{
                  height: music.isPlaying ? ['20%', `${m * 100}%`, '30%'] : '20%'
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.4 + i * 0.1,
                  ease: 'easeInOut'
                }}
                className="w-0.5 rounded-full bg-pink-400"
              />
            ))}
          </div>
        );
      case 'call':
        if (!islandSettings.callEnabled) return null;
        return (
          <span className="text-[10px] font-mono text-emerald-300">
            {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
          </span>
        );
      case 'timer':
        if (!islandSettings.timerEnabled || !timer.isRunning) return null;
        return (
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        );
      case 'delivery':
        return (
          <span className="text-[9px] uppercase font-bold text-emerald-400">Live</span>
        );
      case 'bluetooth':
        if (!islandSettings.bluetoothEnabled) return null;
        return (
          <span className="text-[9px] font-mono text-cyan-300">{bluetooth.rightBattery}%</span>
        );
      case 'notification':
        if (!islandSettings.notificationsEnabled || notifications.length === 0) return null;
        return (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        );
      default:
        return null;
    }
  };

  // Content for second bubble in dual mode
  const renderSecondaryBubbleContent = () => {
    if (secondaryModule === 'timer') {
      return (
        <div className="flex items-center justify-center w-full h-full text-amber-400">
          <TimerIcon className="w-3.5 h-3.5" />
        </div>
      );
    }
    if (secondaryModule === 'music') {
      return (
        <div className="flex items-center justify-center w-full h-full text-pink-400">
          <Play className="w-3.5 h-3.5 fill-pink-400" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-full h-full text-emerald-400">
        <Zap className="w-3.5 h-3.5 fill-emerald-400" />
      </div>
    );
  };

  const isExpanded = islandMode === 'expanded';
  const isDual = islandMode === 'compact_dual' && islandSettings.dualIslandEnabled;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex ${getAlignmentClass()}`}
      style={{
        paddingTop: `${islandSettings.yOffset}px`,
        transform: islandSettings.xOffset ? `translateX(${islandSettings.xOffset}px)` : undefined,
        transition: 'padding-top 0.15s ease-out, transform 0.15s ease-out'
      }}
    >
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Main Island Pill */}
        <motion.div
          ref={islandRef}
          layout
          onClick={() => {
            if (!isExpanded) {
              expandIsland();
            }
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 32,
            mass: 0.8
          }}
          style={{
            borderRadius: isExpanded ? '28px' : `${islandSettings.borderRadius}px`,
            minHeight: isExpanded ? 'auto' : `${islandSettings.heightCollapsed}px`,
            width: isExpanded
              ? 'min(94vw, 360px)'
              : isDual
              ? `${Math.max(120, islandSettings.widthCollapsed - 30)}px`
              : `${islandSettings.widthCollapsed}px`
          }}
          className={`relative bg-black text-white shadow-2xl border border-white/10 overflow-hidden cursor-pointer backdrop-blur-xl transition-shadow ${
            isExpanded ? 'p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]' : 'px-3 py-1.5 hover:border-white/20'
          }`}
        >
          {/* Subtle Ambient Edge Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />

          {/* Integrated Punch Hole Camera Cutout Simulation */}
          {islandSettings.showCameraCutout && !isExpanded && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-[#050505] border border-neutral-900 pointer-events-none shadow-inner"
              style={{
                width: `${islandSettings.cameraHoleSize}px`,
                height: `${islandSettings.cameraHoleSize}px`
              }}
            >
              <div className="w-1 h-1 rounded-full bg-cyan-950/60 m-auto mt-0.5" />
            </div>
          )}

          {/* Content inside Pill */}
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <IslandExpandedView />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between w-full h-full select-none"
              >
                <div className="flex items-center">{renderLeftPillContent()}</div>
                <div className="flex items-center">{renderRightPillContent()}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Detached Compact Bubble in Dual-Island Mode */}
        {isDual && !isExpanded && (
          <motion.div
            layout
            onClick={() => {
              expandIsland(secondaryModule);
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: `${islandSettings.heightCollapsed}px`,
              height: `${islandSettings.heightCollapsed}px`,
              borderRadius: `${islandSettings.borderRadius}px`
            }}
            className="bg-black border border-white/10 shadow-lg flex items-center justify-center cursor-pointer hover:border-white/20 active:scale-95 transition"
            title="Secondary active task"
          >
            {renderSecondaryBubbleContent()}
          </motion.div>
        )}
      </div>
    </div>
  );
};
