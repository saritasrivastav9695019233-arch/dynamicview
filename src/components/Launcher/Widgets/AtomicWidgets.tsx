import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLauncher } from '../../../context/LauncherContext';
import {
  CloudSun,
  Activity,
  Cpu,
  CheckCircle2,
  Circle,
  Plus,
  Play,
  Pause,
  Zap,
  Sparkles,
  Droplets,
  Wind
} from 'lucide-react';

export const ClockWidget: React.FC = () => {
  const { deviceTime } = useLauncher();
  const dateObj = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
  const dateString = dateObj.toLocaleDateString('en-US', options);

  return (
    <div className="p-4 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white shadow-lg">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-4xl font-extrabold tracking-tight font-mono text-white/95">
            {deviceTime}
          </div>
          <div className="text-xs text-white/70 font-medium mt-0.5">{dateString}</div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-cyan-300">
          <CloudSun className="w-3.5 h-3.5" />
          <span>28°C</span>
        </div>
      </div>
    </div>
  );
};

export const RamBoosterWidget: React.FC = () => {
  const [ramUsed, setRamUsed] = useState(4.6);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanedMsg, setCleanedMsg] = useState<string | null>(null);

  const handleClean = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setRamUsed(2.9);
      setIsCleaning(false);
      setCleanedMsg('Freed 1.7 GB RAM!');
      setTimeout(() => setCleanedMsg(null), 3000);
    }, 1200);
  };

  return (
    <div className="p-3.5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white/80">Memory Boost</span>
        </div>
        <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Origin 17</span>
      </div>

      <div className="my-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono">{ramUsed.toFixed(1)} GB</span>
          <span className="text-xs text-white/50">/ 12 GB RAM</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
          <motion.div
            animate={{ width: `${(ramUsed / 12) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          />
        </div>
      </div>

      <button
        type="button"
        disabled={isCleaning}
        onClick={handleClean}
        className="w-full py-1.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-medium text-cyan-300 flex items-center justify-center gap-1.5 transition"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isCleaning ? 'animate-spin' : ''}`} />
        <span>{isCleaning ? 'Boosting...' : cleanedMsg || 'One-Tap Boost'}</span>
      </button>
    </div>
  );
};

export const HealthWidget: React.FC = () => {
  const steps = 6840;
  const goal = 10000;
  const percent = Math.min(100, Math.round((steps / goal) * 100));

  return (
    <div className="p-3.5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white/80">Atomic Walk</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold uppercase">{percent}%</span>
      </div>

      <div className="flex items-center justify-between my-1">
        <div>
          <div className="text-xl font-bold font-mono">{steps.toLocaleString()}</div>
          <div className="text-[10px] text-white/50">Goal: 10,000 steps</div>
        </div>

        {/* Mini progress circle */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-400"
              strokeDasharray={`${percent}, 100`}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="text-[9px] font-bold text-white absolute">320 kcal</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-white/60 pt-1 border-t border-white/5">
        <span>Active: 48m</span>
        <span>Distance: 5.2 km</span>
      </div>
    </div>
  );
};

export const WeatherWidget: React.FC = () => {
  return (
    <div className="p-3.5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
            <CloudSun className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white/80">Weather</span>
        </div>
        <span className="text-[10px] text-white/50">New Delhi</span>
      </div>

      <div className="flex items-baseline justify-between my-1">
        <div>
          <span className="text-2xl font-bold font-mono">28°</span>
          <span className="text-xs text-white/70 ml-1">Partly Cloudy</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-white/60 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1">
          <Droplets className="w-3 h-3 text-cyan-400" />
          <span>45%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3 h-3 text-blue-400" />
          <span>12 km/h</span>
        </div>
        <div className="text-emerald-400 font-medium">AQI 42</div>
      </div>
    </div>
  );
};

export const QuickNotesWidget: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Customize Dynamic Island position', done: true },
    { id: '2', text: 'Enable 120W FlashCharge effect', done: false }
  ]);
  const [newText, setNewText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), text: newText.trim(), done: false }]);
    setNewText('');
    setIsAdding(false);
  };

  return (
    <div className="p-3.5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/80">Atomic Notes</span>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={addTask} className="my-1">
          <input
            type="text"
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New quick note..."
            className="w-full text-xs bg-white/10 border border-white/20 rounded-xl px-2 py-1 text-white placeholder-white/40 focus:outline-none"
          />
        </form>
      ) : (
        <div className="space-y-1.5 overflow-y-auto max-h-16 my-1 scrollbar-none">
          {tasks.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className="flex items-center gap-2 text-xs cursor-pointer select-none text-white/80 hover:text-white"
            >
              {t.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-white/40 shrink-0" />
              )}
              <span className={`truncate ${t.done ? 'line-through text-white/40' : ''}`}>
                {t.text}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="text-[10px] text-white/40 pt-1 border-t border-white/5">
        Tap to toggle checkmark
      </div>
    </div>
  );
};

export const MusicWidget: React.FC = () => {
  const { music, togglePlayMusic, expandIsland, islandSettings } = useLauncher();

  return (
    <div
      onClick={() => {
        if (music.isPlaying && islandSettings.enabled) {
          expandIsland('music');
        } else {
          togglePlayMusic();
        }
      }}
      className="p-3.5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 text-white flex flex-col justify-between h-36 cursor-pointer hover:border-white/20 transition group"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/80">Origin Vinyl</span>
        <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Stereo</span>
      </div>

      <div className="flex items-center gap-3 my-1">
        <div className="relative">
          <img
            src={music.coverUrl}
            alt=""
            className="w-12 h-12 rounded-2xl object-cover shadow border border-white/10 group-hover:scale-105 transition"
          />
          {music.isPlaying && (
            <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/50 animate-ping" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold truncate text-white">{music.title}</h4>
          <p className="text-[11px] text-white/60 truncate">{music.artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span className="text-[10px] text-white/40">
          {music.isPlaying ? 'Playing · Tap for Island' : 'Tap to play music'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayMusic();
          }}
          className="p-1.5 rounded-full bg-pink-500 text-white hover:bg-pink-400 active:scale-95 transition"
        >
          {music.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
        </button>
      </div>
    </div>
  );
};
