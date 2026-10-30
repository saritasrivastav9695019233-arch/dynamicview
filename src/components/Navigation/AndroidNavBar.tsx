import React, { useState } from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { ChevronLeft, Circle, Square } from 'lucide-react';

export const AndroidNavBar: React.FC = () => {
  const { goBack, goHome, openScreen, currentScreen } = useLauncher();
  const [navStyle, setNavStyle] = useState<'buttons' | 'gesture'>('buttons');

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 h-11 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-8 select-none">
      {navStyle === 'buttons' ? (
        <>
          {/* Back Button */}
          <button
            type="button"
            onClick={goBack}
            className="p-2 text-white/70 hover:text-white active:scale-75 transition duration-150 flex items-center justify-center"
            title="System Back (or press Esc)"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Home Button */}
          <button
            type="button"
            onClick={goHome}
            className="p-2 text-white/70 hover:text-white active:scale-75 transition duration-150 flex items-center justify-center"
            title="System Home"
          >
            <Circle className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Recents / App Drawer Button */}
          <button
            type="button"
            onClick={() => {
              if (currentScreen === 'app_drawer') {
                goHome();
              } else {
                openScreen('app_drawer');
              }
            }}
            className="p-2 text-white/70 hover:text-white active:scale-75 transition duration-150 flex items-center justify-center"
            title="Recents / All Apps"
          >
            <Square className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </>
      ) : (
        /* Gesture Navigation Pill */
        <div className="w-full flex items-center justify-center h-full">
          <div
            onClick={goHome}
            className="w-32 h-1 bg-white/40 hover:bg-white/80 rounded-full cursor-pointer transition active:scale-95"
            title="Swipe up for Home / Tap for Home"
          />
        </div>
      )}
    </div>
  );
};
