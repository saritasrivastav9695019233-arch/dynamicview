import React from 'react';
import { LauncherProvider, useLauncher } from './context/LauncherContext';
import { DynamicIsland } from './components/DynamicIsland/DynamicIsland';
import { HomeScreen } from './components/Launcher/HomeScreen';
import { AppDrawer } from './components/Launcher/AppDrawer';
import { SettingsApp } from './components/Settings/SettingsApp';
import { PhoneApp } from './components/Apps/PhoneApp';
import { MessagesApp } from './components/Apps/MessagesApp';
import { MusicApp } from './components/Apps/MusicApp';
import { BrowserApp } from './components/Apps/BrowserApp';
import { StatusBar } from './components/Navigation/StatusBar';
import { AndroidNavBar } from './components/Navigation/AndroidNavBar';
import { SimulatorFab } from './components/SimulatorControls/SimulatorFab';
import { PermissionRequestModal } from './components/Permissions/PermissionRequestModal';
import { WALLPAPERS } from './data/defaultData';
import { AnimatePresence, motion } from 'motion/react';

const LauncherScreenContent: React.FC = () => {
  const { currentScreen, launcherSettings } = useLauncher();

  // Find active wallpaper background
  const activeWall = WALLPAPERS.find((w) => w.id === launcherSettings.wallpaperId) || WALLPAPERS[0];
  const backgroundStyle = launcherSettings.customWallpaperUrl
    ? {
        backgroundImage: `url(${launcherSettings.customWallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {
        background: activeWall.gradient
      };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none transition-all duration-500"
      style={backgroundStyle}
    >
      {/* Dynamic Ambient Blur Layer */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Top Status Bar */}
      <StatusBar />

      {/* OriginOS Dynamic Island */}
      <DynamicIsland />

      {/* Active Screen View */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full h-full"
            >
              <HomeScreen />
            </motion.div>
          )}

          {currentScreen === 'app_drawer' && (
            <AppDrawer key="drawer" />
          )}

          {currentScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <SettingsApp />
            </motion.div>
          )}

          {currentScreen === 'app_phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <PhoneApp />
            </motion.div>
          )}

          {currentScreen === 'app_messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <MessagesApp />
            </motion.div>
          )}

          {currentScreen === 'app_music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <MusicApp />
            </motion.div>
          )}

          {(currentScreen === 'app_browser' || currentScreen === 'app_custom_web') && (
            <motion.div
              key="browser"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <BrowserApp />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Android 17 Navigation Bar (Back, Home, Recents) */}
      <AndroidNavBar />
    </div>
  );
};

const MainAppLayout: React.FC = () => {
  const { isDeviceFrameMode } = useLauncher();

  return (
    <div className="relative w-screen h-screen min-h-screen bg-[#07080c] flex items-center justify-center overflow-hidden font-sans antialiased text-white">
      {/* Interactive Permission Flow Modal */}
      <PermissionRequestModal />

      {/* Floating Interactive Simulation Tool */}
      <SimulatorFab />

      {isDeviceFrameMode ? (
        /* Realistic Flagship Smartphone Chassis (OriginOS Android 17 Flagship) */
        <div className="relative w-[390px] h-[844px] max-h-[96vh] rounded-[52px] p-3 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col justify-center items-center">
          {/* Outer metal bezel reflection */}
          <div className="absolute inset-0 rounded-[52px] border border-white/10 pointer-events-none" />

          {/* Volume rocker buttons on left */}
          <div className="absolute -left-1.5 top-28 w-1.5 h-12 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -left-1.5 top-44 w-1.5 h-12 bg-neutral-700 rounded-l-sm" />
          {/* Power button on right */}
          <div className="absolute -right-1.5 top-32 w-1.5 h-16 bg-neutral-700 rounded-r-sm" />

          {/* Inner Display Screen */}
          <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black shadow-inner">
            <LauncherScreenContent />
          </div>
        </div>
      ) : (
        /* Full Screen Immersive View */
        <div className="w-full h-full">
          <LauncherScreenContent />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LauncherProvider>
      <MainAppLayout />
    </LauncherProvider>
  );
}
