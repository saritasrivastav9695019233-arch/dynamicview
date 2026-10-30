export type IslandMode = 'collapsed' | 'compact_dual' | 'expanded';

export type IslandModule = 
  | 'idle'
  | 'charging'
  | 'music'
  | 'call'
  | 'timer'
  | 'delivery'
  | 'bluetooth'
  | 'notification';

export interface NotificationItem {
  id: string;
  appName: string;
  appPackage: string;
  sender: string;
  title: string;
  message: string;
  time: string;
  avatar?: string;
  iconColor: string;
  isRead?: boolean;
}

export interface MusicTrack {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  currentTime: number;
  isPlaying: boolean;
}

export interface CallState {
  callerName: string;
  phoneNumber: string;
  avatar: string;
  status: 'incoming' | 'active' | 'ended';
  duration: number; // in seconds
  isMuted: boolean;
  isSpeaker: boolean;
}

export interface TimerState {
  title: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export interface DeliveryState {
  serviceName: string; // e.g. "Blinkit Fast" / "Swiggy"
  orderNumber: string;
  driverName: string;
  etaMinutes: number;
  currentStep: 'prepped' | 'picked_up' | 'arriving';
  destination: string;
}

export interface BluetoothState {
  deviceName: string;
  deviceType: 'earbuds' | 'headphones' | 'speaker' | 'watch';
  connected: boolean;
  leftBattery: number;
  rightBattery: number;
  caseBattery: number;
}

export interface ChargingState {
  isCharging: boolean;
  batteryLevel: number; // 0 - 100
  wattage: number; // e.g. 120, 80, 44, 18
  chargingSpeedText: string; // "120W FlashCharge", "SuperVOOC", etc.
  estimatedFullMinutes: number;
}

export type CutoutPosition = 'center' | 'left' | 'right';

export interface IslandSettings {
  enabled: boolean;
  position: CutoutPosition;
  yOffset: number; // vertical position in px (0 - 60)
  xOffset: number; // horizontal position in px (-60 - 60)
  widthCollapsed: number; // px (100 - 280)
  heightCollapsed: number; // px (26 - 50)
  borderRadius: number; // px (16 - 32)
  cameraHoleSize: number; // px (0 - 20)
  showCameraCutout: boolean;
  hapticEnabled: boolean;
  soundEnabled: boolean;
  autoCollapseSeconds: number;
  dualIslandEnabled: boolean;
  // Feature on/off toggles
  notificationsEnabled: boolean;
  chargingEnabled: boolean;
  musicEnabled: boolean;
  callEnabled: boolean;
  timerEnabled: boolean;
  bluetoothEnabled: boolean;
}

export type IconPackType = 'originos' | 'material_you' | 'cyber_neon' | 'glassmorphism' | 'minimal_mono';

export interface LauncherSettings {
  wallpaperId: string;
  customWallpaperUrl?: string;
  iconPack: IconPackType;
  iconSize: 'small' | 'medium' | 'large';
  showLabels: boolean;
  gridColumns: 4 | 5;
  dockPinnedAppIds: string[];
  themeMode: 'dark' | 'origin_flow';
}

export interface AppDefinition {
  id: string;
  name: string;
  iconName: string;
  category: 'system' | 'social' | 'tools' | 'media' | 'utility' | 'custom';
  color: string;
  badgeCount?: number;
  isCustomWebApp?: boolean;
  webUrl?: string;
}

export interface PermissionDefinition {
  id: string;
  title: string;
  category: 'Accessibility' | 'Notifications' | 'System' | 'Privacy';
  description: string;
  granted: boolean;
  required: boolean;
  androidManifestName: string;
}

export type ScreenView = 
  | 'home'
  | 'app_drawer'
  | 'settings'
  | 'app_phone'
  | 'app_messages'
  | 'app_music'
  | 'app_browser'
  | 'app_camera'
  | 'app_custom_web';
