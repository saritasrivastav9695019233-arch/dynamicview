import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { ArrowLeft, X, Send, Search, Bell, CheckCheck } from 'lucide-react';

export const MessagesApp: React.FC = () => {
  const { goBack, goHome, notifications, addNotification } = useLauncher();
  const [inputText, setInputText] = useState('');

  const sampleChats = [
    {
      id: 'c1',
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Bro, launcher is super fast! Check out the charging animation ⚡',
      time: 'Just now',
      unread: true
    },
    {
      id: 'c2',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Let me know once you finish the OriginOS Dynamic Island setup!',
      time: '12m ago',
      unread: false
    },
    {
      id: 'c3',
      name: 'Blinkit Delivery',
      avatar: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Rider is arriving at your gate.',
      time: '1h ago',
      unread: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const sent = inputText.trim();
    setInputText('');

    // Trigger notification popup on Dynamic Island
    setTimeout(() => {
      addNotification({
        appName: 'Origin Messages',
        appPackage: 'com.android.mms',
        sender: 'Rahul Verma',
        title: 'Rahul Verma',
        message: `Got it: "${sent}"! The dynamic island notification system works flawlessly 👌`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        iconColor: '#3b82f6'
      });
    }, 1500);
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
            <h2 className="text-base font-bold">Messages</h2>
            <p className="text-[10px] text-white/50">End-to-end encrypted</p>
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

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
          />
        </div>

        {sampleChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-11 h-11 rounded-full object-cover border border-white/10"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white truncate">{chat.name}</h4>
                <span className="text-[10px] text-white/40">{chat.time}</span>
              </div>
              <p className="text-xs text-white/70 truncate mt-0.5">{chat.lastMessage}</p>
            </div>
            {chat.unread && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Send message bar to test Island notifications */}
      <form onSubmit={handleSendMessage} className="p-3 bg-neutral-900 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send test message to trigger Island..."
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-white transition active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
