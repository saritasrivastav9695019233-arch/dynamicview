import React from 'react';
import { motion } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import {
  ArrowLeft,
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Repeat,
  Shuffle,
  Music2
} from 'lucide-react';

export const MusicApp: React.FC = () => {
  const { goBack, goHome, music, togglePlayMusic, nextTrack, prevTrack, seekMusic, expandIsland } = useLauncher();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="absolute inset-0 z-40 bg-neutral-950 flex flex-col pt-12 pb-16 overflow-hidden text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-900/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold">Origin Music</h2>
            <p className="text-[10px] text-pink-400">Hi-Res Lossless 24-bit</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => expandIsland('music')}
            className="text-xs text-cyan-400 font-semibold px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 mr-1"
          >
            View in Island
          </button>
          <button
            type="button"
            onClick={goHome}
            className="p-2 rounded-2xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition text-white/70"
            title="Direct Close to Home"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Music View */}
      <div className="flex-1 flex flex-col items-center justify-between p-6">
        {/* Rotating Vinyl Record Animation */}
        <div className="relative my-auto">
          <motion.div
            animate={{ rotate: music.isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="w-52 h-52 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 border-4 border-neutral-700 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center p-8 relative"
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />

            {/* Album Center Sticker */}
            <img
              src={music.coverUrl}
              alt={music.title}
              className="w-24 h-24 rounded-full object-cover shadow-inner border-2 border-white/20"
            />
            <div className="w-4 h-4 rounded-full bg-neutral-950 border border-neutral-600 absolute" />
          </motion.div>
        </div>

        {/* Track Title & Artist */}
        <div className="w-full text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl font-bold text-white truncate">{music.title}</h3>
            <button type="button" className="text-rose-400 hover:scale-110 transition">
              <Heart className="w-4 h-4 fill-rose-500" />
            </button>
          </div>
          <p className="text-xs text-white/60">{music.artist} · {music.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1.5 my-3">
          <div
            className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden cursor-pointer"
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
          <div className="flex justify-between text-[11px] font-mono text-white/50">
            <span>{formatTime(music.currentTime)}</span>
            <span>{formatTime(music.duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-around w-full max-w-xs">
          <button type="button" className="text-white/60 hover:text-white">
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={prevTrack}
            className="p-3 rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <SkipBack className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={togglePlayMusic}
            className="p-4 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 shadow-xl transition"
          >
            {music.isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black translate-x-0.5" />}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            className="p-3 rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
          <button type="button" className="text-white/60 hover:text-white">
            <Repeat className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
