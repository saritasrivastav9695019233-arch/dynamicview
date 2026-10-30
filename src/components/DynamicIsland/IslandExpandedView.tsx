import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Zap,
  Timer as TimerIcon,
  RotateCcw,
  Bike,
  Headphones,
  Bell,
  X,
  Send,
  Sparkles,
  ChevronUp
} from 'lucide-react';

export const IslandExpandedView: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    collapseIsland,
    music,
    togglePlayMusic,
    seekMusic,
    nextTrack,
    prevTrack,
    charging,
    call,
    answerCall,
    endCall,
    toggleMuteCall,
    timer,
    toggleTimer,
    resetTimer,
    delivery,
    bluetooth,
    notifications,
    dismissNotification,
    addNotification
  } = useLauncher();

  const [quickReplyText, setQuickReplyText] = useState('');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickReplyText.trim()) return;
    const sentMsg = quickReplyText;
    setQuickReplyText('');
    // Mock auto-response after 2s
    setTimeout(() => {
      addNotification({
        appName: 'WhatsApp',
        appPackage: 'com.whatsapp',
        sender: 'Rahul Verma',
        title: 'Rahul Verma',
        message: `Replied to "${sentMsg}": Perfect! Testing on Android 17 right now 👍`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        iconColor: '#25D366'
      });
    }, 2000);
    collapseIsland();
  };

  return (
    <div className="w-full text-white select-none">
      {/* Top Header bar inside Island */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-medium tracking-wide uppercase text-[10px] text-white/70">
            OriginOS Atomic Island · {activeModule}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Quick Module Switcher if multiple modules active */}
          <div className="flex items-center gap-0.5 bg-white/10 rounded-full p-0.5 mr-2">
            <button
              type="button"
              onClick={() => setActiveModule('charging')}
              className={`p-1 rounded-full text-[10px] transition-colors ${
                activeModule === 'charging' ? 'bg-cyan-500 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Super FlashCharge"
            >
              <Zap className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('music')}
              className={`p-1 rounded-full text-[10px] transition-colors ${
                activeModule === 'music' ? 'bg-pink-500 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Music Player"
            >
              <Play className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('call')}
              className={`p-1 rounded-full text-[10px] transition-colors ${
                activeModule === 'call' ? 'bg-emerald-500 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Calls"
            >
              <Phone className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('timer')}
              className={`p-1 rounded-full text-[10px] transition-colors ${
                activeModule === 'timer' ? 'bg-amber-500 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Timer"
            >
              <TimerIcon className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={collapseIsland}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Minimize Dynamic Island"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Module Content */}
      <div className="pt-3">
        <AnimatePresence mode="wait">
          {/* 1. CHARGING ANIMATION (OriginOS 120W Super FlashCharge) */}
          {activeModule === 'charging' && (
            <motion.div
              key="charging"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center py-2"
            >
              {/* OriginOS Cyber Turbo Charging Ring */}
              <div className="relative flex items-center justify-center w-28 h-28 my-1">
                {/* Outer rotating particle ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50"
                />
                {/* Inner glowing pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute inset-2 rounded-full border border-emerald-400/80 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                />
                {/* Center Percentage Display */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold tracking-tight text-white">
                      {charging.batteryLevel}
                    </span>
                    <span className="text-sm font-semibold text-emerald-400 ml-0.5">%</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 uppercase tracking-widest mt-0.5">
                    <Zap className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" />
                    <span>TURBO</span>
                  </div>
                </div>
              </div>

              {/* FlashCharge Wattage & Details */}
              <div className="w-full text-center mt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{charging.wattage}W FlashCharge · Ultra Fast</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-white/60 mt-3 px-2">
                  <span>Battery Status: {charging.batteryLevel < 100 ? 'Super Charging' : 'Fully Charged'}</span>
                  <span className="text-cyan-300 font-medium">~{charging.estimatedFullMinutes} min to 100%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. MUSIC PLAYER */}
          {activeModule === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={music.coverUrl}
                  alt={music.title}
                  className="w-12 h-12 rounded-xl object-cover shadow-lg border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate text-white">{music.title}</h4>
                  <p className="text-xs text-white/60 truncate">{music.artist} · {music.album}</p>
                </div>
                {/* Live sound visualizer */}
                <div className="flex items-end gap-1 h-6 px-1">
                  {[0.4, 0.9, 0.6, 1, 0.5, 0.8].map((mult, idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        height: music.isPlaying ? ['20%', `${mult * 100}%`, '25%'] : '15%'
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.5 + idx * 0.1,
                        ease: 'easeInOut'
                      }}
                      className="w-1 rounded-full bg-gradient-to-t from-pink-500 to-rose-400"
                    />
                  ))}
                </div>
              </div>

              {/* Progress Scrubber */}
              <div className="space-y-1">
                <div
                  className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = Math.max(0, Math.min(1, clickX / rect.width));
                    seekMusic(Math.floor(percent * music.duration));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    style={{ width: `${(music.currentTime / music.duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/50 font-mono">
                  <span>{formatTime(music.currentTime)}</span>
                  <span>{formatTime(music.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <span className="text-xs text-white/60">Spatial Audio</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prevTrack}
                    className="p-2 rounded-full hover:bg-white/10 text-white/80 active:scale-95 transition"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={togglePlayMusic}
                    className="p-3 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 transition shadow-md"
                  >
                    {music.isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black translate-x-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={nextTrack}
                    className="p-2 rounded-full hover:bg-white/10 text-white/80 active:scale-95 transition"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. PHONE CALL */}
          {activeModule === 'call' && (
            <motion.div
              key="call"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 py-1"
            >
              <div className="flex items-center gap-3">
                <img
                  src={call.avatar}
                  alt={call.callerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/50 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold truncate text-white">{call.callerName}</h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-300">
                      HD Voice
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-mono">{call.phoneNumber}</p>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {call.status === 'incoming' ? 'Incoming OriginOS Call...' : `Call Active · ${formatTime(call.duration)}`}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-around pt-1">
                {call.status === 'incoming' ? (
                  <>
                    <button
                      type="button"
                      onClick={endCall}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-900/40 active:scale-95 transition"
                    >
                      <PhoneOff className="w-4 h-4" />
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={answerCall}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/40 active:scale-95 transition animate-bounce"
                    >
                      <Phone className="w-4 h-4" />
                      Answer
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={toggleMuteCall}
                      className={`p-3 rounded-full transition active:scale-95 ${
                        call.isMuted ? 'bg-amber-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      title={call.isMuted ? 'Unmute' : 'Mute'}
                    >
                      {call.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                      title="Speakerphone"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={endCall}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-900/40 active:scale-95 transition"
                    >
                      <PhoneOff className="w-4 h-4" />
                      End Call
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* 4. TIMER */}
          {activeModule === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60 font-medium">{timer.title}</div>
                  <div className="text-3xl font-extrabold tracking-tight font-mono text-amber-400 mt-0.5">
                    {formatTime(timer.remainingSeconds)}
                  </div>
                </div>

                {/* Circular indicator */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-400 transition-all duration-300"
                      strokeDasharray={`${(timer.remainingSeconds / timer.totalSeconds) * 100}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <TimerIcon className="w-4 h-4 text-amber-400 absolute" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={toggleTimer}
                  className="flex-1 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold active:scale-95 transition flex items-center justify-center gap-1.5 shadow"
                >
                  {timer.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{timer.isRunning ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 active:scale-95 transition"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. DELIVERY / RIDE TRACKER */}
          {activeModule === 'delivery' && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{delivery.serviceName}</h4>
                    <p className="text-xs text-white/60">Partner: {delivery.driverName} · {delivery.orderNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Arriving in</div>
                  <div className="text-xl font-bold font-mono text-white">{delivery.etaMinutes} min</div>
                </div>
              </div>

              {/* Progress step bar */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width:
                        delivery.currentStep === 'prepped'
                          ? '33%'
                          : delivery.currentStep === 'picked_up'
                          ? '66%'
                          : '92%'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/60 font-medium">
                  <span>Prepared</span>
                  <span>On the Way</span>
                  <span className="text-emerald-300 font-bold">At Gate</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. BLUETOOTH ACCESSORY */}
          {activeModule === 'bluetooth' && (
            <motion.div
              key="bluetooth"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{bluetooth.deviceName}</h4>
                    <p className="text-xs text-emerald-400 font-medium">Connected · LHDC 5.0 Lossless</p>
                  </div>
                </div>
              </div>

              {/* Earbud Battery Levels */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/50 uppercase font-semibold">Left (L)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">{bluetooth.leftBattery}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/50 uppercase font-semibold">Right (R)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">{bluetooth.rightBattery}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/50 uppercase font-semibold">Case</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">{bluetooth.caseBattery}%</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 7. NOTIFICATION HUB / PREVIEW */}
          {activeModule === 'notification' && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {notifications.length > 0 ? (
                <div>
                  <div className="flex items-start gap-3">
                    {notifications[0].avatar ? (
                      <img
                        src={notifications[0].avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-white/15"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: notifications[0].iconColor }}
                      >
                        <Bell className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white truncate">
                          {notifications[0].sender || notifications[0].appName}
                        </span>
                        <span className="text-[10px] text-white/40">{notifications[0].time}</span>
                      </div>
                      <p className="text-xs text-white/80 line-clamp-2 mt-0.5">{notifications[0].message}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => dismissNotification(notifications[0].id)}
                      className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Inline Quick Reply */}
                  <form onSubmit={handleSendReply} className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={quickReplyText}
                      onChange={(e) => setQuickReplyText(e.target.value)}
                      placeholder="Quick reply in Island..."
                      className="flex-1 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition"
                    />
                    <button
                      type="submit"
                      disabled={!quickReplyText.trim()}
                      className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-white transition active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-white/50">No unread notifications</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
