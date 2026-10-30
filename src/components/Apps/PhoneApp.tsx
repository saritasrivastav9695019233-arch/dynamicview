import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { ArrowLeft, X, Phone, PhoneCall, Delete, UserPlus, Clock } from 'lucide-react';

export const PhoneApp: React.FC = () => {
  const { goBack, goHome, triggerIncomingCall, answerCall, call } = useLauncher();
  const [dialedNumber, setDialedNumber] = useState('');

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const handleKeyPress = (num: string) => {
    if (dialedNumber.length < 15) {
      setDialedNumber((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
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
            <h2 className="text-base font-bold">Origin Phone</h2>
            <p className="text-[10px] text-emerald-400">5G Ultra HD Voice</p>
          </div>
        </div>
        <button
          type="button"
          onClick={goHome}
          className="p-2 rounded-2xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition text-white/70"
          title="Direct Close to Home"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Number Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-3xl font-mono font-bold tracking-widest text-white min-h-[48px] flex items-center">
          {dialedNumber || <span className="text-white/20">Dial number</span>}
        </div>
        {dialedNumber && (
          <button
            type="button"
            className="mt-2 text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add to Contacts</span>
          </button>
        )}

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mt-6">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeyPress(k)}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xl font-bold flex items-center justify-center transition m-auto shadow"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Call Action Row */}
        <div className="flex items-center justify-center gap-6 mt-6 w-full max-w-[280px]">
          <button
            type="button"
            onClick={triggerIncomingCall}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5"
            title="Simulate incoming call to Island"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Test Call</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (dialedNumber) {
                triggerIncomingCall();
              }
            }}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition"
          >
            <PhoneCall className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={!dialedNumber}
            className="w-12 h-12 rounded-full text-white/60 hover:text-white disabled:opacity-20 flex items-center justify-center transition active:scale-95"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
