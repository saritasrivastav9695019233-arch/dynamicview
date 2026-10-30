import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  IslandMode,
  IslandModule,
  IslandSettings,
  LauncherSettings,
  AppDefinition,
  PermissionDefinition,
  MusicTrack,
  CallState,
  TimerState,
  DeliveryState,
  BluetoothState,
  ChargingState,
  NotificationItem,
  ScreenView
} from '../types/launcher';
import {
  DEFAULT_APPS,
  DEFAULT_PERMISSIONS,
  INITIAL_BLUETOOTH,
  INITIAL_CALL,
  INITIAL_CHARGING,
  INITIAL_DELIVERY,
  INITIAL_MUSIC,
  INITIAL_NOTIFICATIONS,
  INITIAL_TIMER
} from '../data/defaultData';
import { soundFX } from '../utils/audio';

interface LauncherContextType {
  // Island State
  islandMode: IslandMode;
  setIslandMode: (mode: IslandMode) => void;
  activeModule: IslandModule;
  setActiveModule: (mod: IslandModule) => void;
  secondaryModule: IslandModule;
  setSecondaryModule: (mod: IslandModule) => void;
  expandIsland: (mod?: IslandModule) => void;
  collapseIsland: () => void;

  // Settings
  islandSettings: IslandSettings;
  updateIslandSettings: (settings: Partial<IslandSettings>) => void;
  launcherSettings: LauncherSettings;
  updateLauncherSettings: (settings: Partial<LauncherSettings>) => void;

  // Live Modules
  music: MusicTrack;
  togglePlayMusic: () => void;
  seekMusic: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;

  charging: ChargingState;
  setChargingState: (charging: Partial<ChargingState>) => void;
  toggleCharging: () => void;

  call: CallState;
  triggerIncomingCall: () => void;
  answerCall: () => void;
  endCall: () => void;
  toggleMuteCall: () => void;

  timer: TimerState;
  toggleTimer: () => void;
  resetTimer: () => void;

  delivery: DeliveryState;
  triggerDeliveryUpdate: () => void;

  bluetooth: BluetoothState;
  toggleBluetoothConnection: () => void;

  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, 'id' | 'time'>) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Apps & Web Apps
  apps: AppDefinition[];
  addCustomWebApp: (name: string, url: string, color?: string) => void;
  removeApp: (id: string) => void;

  // Permissions & Permission Modal Flow
  permissions: PermissionDefinition[];
  togglePermission: (id: string) => void;
  grantAllPermissions: () => void;
  isPermissionModalOpen: boolean;
  pendingFeatureToEnable: string | null;
  requestPermissionForFeature: (featureName: string) => void;
  grantPermissionsAndProceed: () => void;
  closePermissionModal: () => void;

  // Real-time Live Island Positioning (Upar / Neeche / Left / Right)
  moveIslandUp: (step?: number) => void;
  moveIslandDown: (step?: number) => void;
  moveIslandLeft: (step?: number) => void;
  moveIslandRight: (step?: number) => void;
  adjustIslandWidth: (step?: number) => void;
  adjustIslandHeight: (step?: number) => void;

  // Navigation Stack
  currentScreen: ScreenView;
  activeAppId: string | null;
  openScreen: (screen: ScreenView, appId?: string) => void;
  goBack: () => void;
  goHome: () => void;
  historyStack: ScreenView[];

  // Global Device Simulation
  deviceTime: string;
  isLandscape: boolean;
  isDeviceFrameMode: boolean;
  setIsDeviceFrameMode: (v: boolean) => void;
  activeCustomWebUrl: string | null;
}

const DEFAULT_ISLAND_SETTINGS: IslandSettings = {
  enabled: false, // Starts OFF until permissions are granted
  position: 'center',
  yOffset: 12,
  xOffset: 0,
  widthCollapsed: 140,
  heightCollapsed: 36,
  borderRadius: 22,
  cameraHoleSize: 12,
  showCameraCutout: true,
  hapticEnabled: true,
  soundEnabled: true,
  autoCollapseSeconds: 5,
  dualIslandEnabled: true,
  notificationsEnabled: true,
  chargingEnabled: true,
  musicEnabled: true,
  callEnabled: true,
  timerEnabled: true,
  bluetoothEnabled: true
};

const DEFAULT_LAUNCHER_SETTINGS: LauncherSettings = {
  wallpaperId: 'origin_aurora',
  iconPack: 'originos',
  iconSize: 'medium',
  showLabels: true,
  gridColumns: 4,
  dockPinnedAppIds: ['phone', 'messages', 'browser', 'camera'],
  themeMode: 'dark'
};

const LauncherContext = createContext<LauncherContextType | null>(null);

export const LauncherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved settings from localStorage or fallback
  const [islandSettings, setIslandSettings] = useState<IslandSettings>(() => {
    try {
      const saved = localStorage.getItem('origin_island_settings');
      if (saved) {
        return { ...DEFAULT_ISLAND_SETTINGS, ...JSON.parse(saved) };
      }
      return DEFAULT_ISLAND_SETTINGS;
    } catch {
      return DEFAULT_ISLAND_SETTINGS;
    }
  });

  const [launcherSettings, setLauncherSettings] = useState<LauncherSettings>(() => {
    try {
      const saved = localStorage.getItem('origin_launcher_settings');
      if (saved) {
        return { ...DEFAULT_LAUNCHER_SETTINGS, ...JSON.parse(saved) };
      }
      return DEFAULT_LAUNCHER_SETTINGS;
    } catch {
      return DEFAULT_LAUNCHER_SETTINGS;
    }
  });

  const [apps, setApps] = useState<AppDefinition[]>(() => {
    try {
      const saved = localStorage.getItem('origin_apps_list');
      return saved ? JSON.parse(saved) : DEFAULT_APPS;
    } catch {
      return DEFAULT_APPS;
    }
  });

  const [permissions, setPermissions] = useState<PermissionDefinition[]>(() => {
    try {
      const saved = localStorage.getItem('origin_permissions');
      return saved ? JSON.parse(saved) : DEFAULT_PERMISSIONS;
    } catch {
      return DEFAULT_PERMISSIONS;
    }
  });

  // Device simulation states
  const [isDeviceFrameMode, setIsDeviceFrameMode] = useState<boolean>(() => {
    return window.innerWidth > 640;
  });
  const [isLandscape] = useState<boolean>(false);
  const [deviceTime, setDeviceTime] = useState<string>('08:52');

  // Dynamic Island interactive states - IDLE by default, no uninvited popups!
  const [islandMode, setIslandMode] = useState<IslandMode>('collapsed');
  const [activeModule, setActiveModule] = useState<IslandModule>('idle');
  const [secondaryModule, setSecondaryModule] = useState<IslandModule>('idle');

  // Live feature states - all idle until triggered
  const [music, setMusic] = useState<MusicTrack>(INITIAL_MUSIC);
  const [charging, setCharging] = useState<ChargingState>(INITIAL_CHARGING);
  const [call, setCall] = useState<CallState>(INITIAL_CALL);
  const [timer, setTimer] = useState<TimerState>(INITIAL_TIMER);
  const [delivery, setDelivery] = useState<DeliveryState>(INITIAL_DELIVERY);
  const [bluetooth, setBluetooth] = useState<BluetoothState>(INITIAL_BLUETOOTH);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Screen Navigation Stack - default to settings (Dynamic Island Control App)
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('settings');
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [activeCustomWebUrl, setActiveCustomWebUrl] = useState<string | null>(null);
  const [historyStack, setHistoryStack] = useState<ScreenView[]>(['settings']);

  // Permission modal flow states
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState<boolean>(false);
  const [pendingFeatureToEnable, setPendingFeatureToEnable] = useState<string | null>(null);

  const autoCollapseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Save changes to localStorage for offline persistence
  useEffect(() => {
    try {
      localStorage.setItem('origin_island_settings', JSON.stringify(islandSettings));
    } catch { /* ignore */ }
  }, [islandSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('origin_launcher_settings', JSON.stringify(launcherSettings));
    } catch { /* ignore */ }
  }, [launcherSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('origin_apps_list', JSON.stringify(apps));
    } catch { /* ignore */ }
  }, [apps]);

  useEffect(() => {
    try {
      localStorage.setItem('origin_permissions', JSON.stringify(permissions));
    } catch { /* ignore */ }
  }, [permissions]);

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hrs = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      setDeviceTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Music progress playback simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (music.isPlaying) {
      interval = setInterval(() => {
        setMusic((prev) => {
          if (prev.currentTime >= prev.duration) {
            return { ...prev, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [music.isPlaying]);

  // Timer countdown simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning && timer.remainingSeconds > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.remainingSeconds <= 1) {
            if (islandSettings.soundEnabled) soundFX.playNotificationChime();
            return { ...prev, remainingSeconds: 0, isRunning: false };
          }
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.remainingSeconds, islandSettings.soundEnabled]);

  // Call duration counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (call.status === 'active') {
      interval = setInterval(() => {
        setCall((prev) => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [call.status]);

  // Charging animation & battery trickle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (charging.isCharging) {
      interval = setInterval(() => {
        setCharging((prev) => {
          if (prev.batteryLevel >= 100) return prev;
          const nextVal = Math.min(100, prev.batteryLevel + 1);
          return { ...prev, batteryLevel: nextVal };
        });
      }, 12000); // realistic slow trickle
    }
    return () => clearInterval(interval);
  }, [charging.isCharging]);

  // Auto-collapse expanded island after timeout if configured
  useEffect(() => {
    if (islandMode === 'expanded' && islandSettings.autoCollapseSeconds > 0) {
      if (autoCollapseTimerRef.current) clearTimeout(autoCollapseTimerRef.current);
      // Keep open if call is incoming or active
      if (activeModule !== 'call') {
        autoCollapseTimerRef.current = setTimeout(() => {
          collapseIsland();
        }, islandSettings.autoCollapseSeconds * 1000);
      }
    }
    return () => {
      if (autoCollapseTimerRef.current) clearTimeout(autoCollapseTimerRef.current);
    };
  }, [islandMode, activeModule, islandSettings.autoCollapseSeconds]);

  // Keyboard escape for back navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (islandMode === 'expanded') {
          collapseIsland();
        } else {
          goBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [islandMode, historyStack]);

  const expandIsland = (mod?: IslandModule) => {
    if (mod) setActiveModule(mod);
    setIslandMode('expanded');
    if (islandSettings.soundEnabled) soundFX.playIslandPop();
  };

  const collapseIsland = () => {
    setIslandMode(islandSettings.dualIslandEnabled && secondaryModule !== 'idle' ? 'compact_dual' : 'collapsed');
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const updateIslandSettings = (newSettings: Partial<IslandSettings>) => {
    setIslandSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateLauncherSettings = (newSettings: Partial<LauncherSettings>) => {
    setLauncherSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Music controls
  const togglePlayMusic = () => {
    setMusic((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const seekMusic = (time: number) => {
    setMusic((prev) => ({ ...prev, currentTime: time }));
  };

  const nextTrack = () => {
    setMusic((prev) => ({
      ...prev,
      title: prev.title === 'Midnight Horizon' ? 'Solar Flare 17' : 'Midnight Horizon',
      artist: prev.title === 'Midnight Horizon' ? 'Origin Sound Lab' : 'Lofi Pulse & Luna',
      currentTime: 0,
      duration: 210,
      isPlaying: true
    }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const prevTrack = () => {
    setMusic((prev) => ({ ...prev, currentTime: 0 }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  // Charging controls
  const toggleCharging = () => {
    const nextCharging = !charging.isCharging;
    setCharging((prev) => ({
      ...prev,
      isCharging: nextCharging,
      batteryLevel: nextCharging ? Math.max(15, prev.batteryLevel) : prev.batteryLevel
    }));
    if (nextCharging) {
      if (islandSettings.soundEnabled) soundFX.playChargeSound();
      setActiveModule('charging');
      expandIsland('charging');
    } else {
      if (activeModule === 'charging') {
        collapseIsland();
      }
    }
  };

  const setChargingState = (state: Partial<ChargingState>) => {
    setCharging((prev) => ({ ...prev, ...state }));
  };

  // Call controls
  const triggerIncomingCall = () => {
    setCall({
      callerName: 'Priya Sharma',
      phoneNumber: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'incoming',
      duration: 0,
      isMuted: false,
      isSpeaker: false
    });
    setActiveModule('call');
    expandIsland('call');
    if (islandSettings.soundEnabled) soundFX.playNotificationChime();
  };

  const answerCall = () => {
    setCall((prev) => ({ ...prev, status: 'active', duration: 1 }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const endCall = () => {
    setCall((prev) => ({ ...prev, status: 'ended' }));
    if (islandSettings.soundEnabled) soundFX.playTick();
    setTimeout(() => {
      collapseIsland();
      setActiveModule('music');
    }, 400);
  };

  const toggleMuteCall = () => {
    setCall((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  // Timer controls
  const toggleTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const resetTimer = () => {
    setTimer((prev) => ({ ...prev, remainingSeconds: prev.totalSeconds, isRunning: false }));
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  // Delivery controls
  const triggerDeliveryUpdate = () => {
    setDelivery((prev) => ({
      ...prev,
      etaMinutes: Math.max(2, prev.etaMinutes - 2),
      currentStep: prev.currentStep === 'prepped' ? 'picked_up' : 'arriving'
    }));
    setActiveModule('delivery');
    expandIsland('delivery');
    if (islandSettings.soundEnabled) soundFX.playNotificationChime();
  };

  // Bluetooth controls
  const toggleBluetoothConnection = () => {
    const nextConnected = !bluetooth.connected;
    setBluetooth((prev) => ({ ...prev, connected: nextConnected }));
    if (nextConnected) {
      setActiveModule('bluetooth');
      expandIsland('bluetooth');
      if (islandSettings.soundEnabled) soundFX.playTick();
    }
  };

  // Notification controls
  const addNotification = (n: Omit<NotificationItem, 'id' | 'time'>) => {
    const newItem: NotificationItem = {
      ...n,
      id: 'notif-' + Date.now(),
      time: 'Just now',
      isRead: false
    };
    setNotifications((prev) => [newItem, ...prev]);
    setActiveModule('notification');
    expandIsland('notification');
    if (islandSettings.soundEnabled) soundFX.playNotificationChime();
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    if (islandSettings.soundEnabled) soundFX.playTick();
    if (notifications.length <= 1) {
      collapseIsland();
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  // App & Web App additions
  const addCustomWebApp = (name: string, url: string, color: string = '#3b82f6') => {
    const newApp: AppDefinition = {
      id: 'custom-' + Date.now(),
      name,
      iconName: 'Globe',
      category: 'custom',
      color,
      isCustomWebApp: true,
      webUrl: url.startsWith('http') ? url : `https://${url}`
    };
    setApps((prev) => [...prev, newApp]);
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const removeApp = (id: string) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
  };

  // Permission controls
  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p))
    );
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const grantAllPermissions = () => {
    setPermissions((prev) => prev.map((p) => ({ ...p, granted: true })));
    if (islandSettings.soundEnabled) soundFX.playNotificationChime();
  };

  // Navigation Stack
  const openScreen = (screen: ScreenView, appId?: string) => {
    if (appId) {
      setActiveAppId(appId);
      const targetApp = apps.find((a) => a.id === appId);
      if (targetApp?.isCustomWebApp && targetApp.webUrl) {
        setActiveCustomWebUrl(targetApp.webUrl);
      }
    }
    setHistoryStack((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  const goBack = () => {
    if (islandMode === 'expanded') {
      collapseIsland();
      return;
    }
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentScreen(prevScreen);
      if (islandSettings.soundEnabled) soundFX.playTick();
    } else if (currentScreen !== 'home') {
      setCurrentScreen('home');
      setHistoryStack(['home']);
      if (islandSettings.soundEnabled) soundFX.playTick();
    }
  };

  const goHome = () => {
    if (islandMode === 'expanded') {
      collapseIsland();
    }
    setCurrentScreen('home');
    setActiveAppId(null);
    setActiveCustomWebUrl(null);
    setHistoryStack(['home']);
    if (islandSettings.soundEnabled) soundFX.playTick();
  };

  // Permission Flow Management
  const requestPermissionForFeature = (featureName: string) => {
    const requiredGranted = permissions
      .filter((p) => p.required)
      .every((p) => p.granted);

    if (requiredGranted) {
      // All required permissions already granted -> toggle directly
      if (featureName === 'master_island') {
        updateIslandSettings({ enabled: !islandSettings.enabled });
      } else if (featureName === 'notifications') {
        updateIslandSettings({ notificationsEnabled: !islandSettings.notificationsEnabled });
      } else if (featureName === 'charging') {
        updateIslandSettings({ chargingEnabled: !islandSettings.chargingEnabled });
      } else if (featureName === 'music') {
        updateIslandSettings({ musicEnabled: !islandSettings.musicEnabled });
      } else if (featureName === 'call') {
        updateIslandSettings({ callEnabled: !islandSettings.callEnabled });
      } else if (featureName === 'timer') {
        updateIslandSettings({ timerEnabled: !islandSettings.timerEnabled });
      } else if (featureName === 'bluetooth') {
        updateIslandSettings({ bluetoothEnabled: !islandSettings.bluetoothEnabled });
      }
    } else {
      // Missing permissions -> open interactive modal
      setPendingFeatureToEnable(featureName);
      setIsPermissionModalOpen(true);
      if (islandSettings.soundEnabled) soundFX.playTick();
    }
  };

  const grantPermissionsAndProceed = () => {
    // Mark permissions as granted
    setPermissions((prev) => prev.map((p) => ({ ...p, granted: true })));
    setIsPermissionModalOpen(false);

    // Turn ON master island and any requested feature
    updateIslandSettings({
      enabled: true,
      ...(pendingFeatureToEnable === 'notifications' ? { notificationsEnabled: true } : {}),
      ...(pendingFeatureToEnable === 'charging' ? { chargingEnabled: true } : {}),
      ...(pendingFeatureToEnable === 'music' ? { musicEnabled: true } : {}),
      ...(pendingFeatureToEnable === 'call' ? { callEnabled: true } : {}),
      ...(pendingFeatureToEnable === 'timer' ? { timerEnabled: true } : {}),
      ...(pendingFeatureToEnable === 'bluetooth' ? { bluetoothEnabled: true } : {})
    });
    setPendingFeatureToEnable(null);

    if (islandSettings.soundEnabled) {
      soundFX.playNotificationChime();
      soundFX.playIslandPop();
    }

    // Show instant visual confirmation: expand and collapse
    expandIsland('charging');
    setTimeout(() => {
      collapseIsland();
    }, 2400);
  };

  const closePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setPendingFeatureToEnable(null);
  };

  // Live Island Positioning (Upar / Neeche / Left / Right)
  const moveIslandUp = (step = 2) => {
    setIslandSettings((prev) => ({
      ...prev,
      yOffset: Math.max(0, prev.yOffset - step)
    }));
  };

  const moveIslandDown = (step = 2) => {
    setIslandSettings((prev) => ({
      ...prev,
      yOffset: Math.min(60, prev.yOffset + step)
    }));
  };

  const moveIslandLeft = (step = 2) => {
    setIslandSettings((prev) => ({
      ...prev,
      xOffset: Math.max(-60, prev.xOffset - step)
    }));
  };

  const moveIslandRight = (step = 2) => {
    setIslandSettings((prev) => ({
      ...prev,
      xOffset: Math.min(60, prev.xOffset + step)
    }));
  };

  const adjustIslandWidth = (step = 10) => {
    setIslandSettings((prev) => ({
      ...prev,
      widthCollapsed: Math.min(280, Math.max(100, prev.widthCollapsed + step))
    }));
  };

  const adjustIslandHeight = (step = 2) => {
    setIslandSettings((prev) => ({
      ...prev,
      heightCollapsed: Math.min(50, Math.max(26, prev.heightCollapsed + step))
    }));
  };

  return (
    <LauncherContext.Provider
      value={{
        islandMode,
        setIslandMode,
        activeModule,
        setActiveModule,
        secondaryModule,
        setSecondaryModule,
        expandIsland,
        collapseIsland,
        islandSettings,
        updateIslandSettings,
        launcherSettings,
        updateLauncherSettings,
        music,
        togglePlayMusic,
        seekMusic,
        nextTrack,
        prevTrack,
        charging,
        setChargingState,
        toggleCharging,
        call,
        triggerIncomingCall,
        answerCall,
        endCall,
        toggleMuteCall,
        timer,
        toggleTimer,
        resetTimer,
        delivery,
        triggerDeliveryUpdate,
        bluetooth,
        toggleBluetoothConnection,
        notifications,
        addNotification,
        dismissNotification,
        clearAllNotifications,
        apps,
        addCustomWebApp,
        removeApp,
        permissions,
        togglePermission,
        grantAllPermissions,
        isPermissionModalOpen,
        pendingFeatureToEnable,
        requestPermissionForFeature,
        grantPermissionsAndProceed,
        closePermissionModal,
        moveIslandUp,
        moveIslandDown,
        moveIslandLeft,
        moveIslandRight,
        adjustIslandWidth,
        adjustIslandHeight,
        currentScreen,
        activeAppId,
        openScreen,
        goBack,
        goHome,
        historyStack,
        deviceTime,
        isLandscape,
        isDeviceFrameMode,
        setIsDeviceFrameMode,
        activeCustomWebUrl
      }}
    >
      {children}
    </LauncherContext.Provider>
  );
};

export const useLauncher = () => {
  const context = useContext(LauncherContext);
  if (!context) {
    throw new Error('useLauncher must be used within a LauncherProvider');
  }
  return context;
};
