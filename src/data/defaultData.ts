import { AppDefinition, PermissionDefinition, MusicTrack, CallState, TimerState, DeliveryState, BluetoothState, NotificationItem, ChargingState } from '../types/launcher';

export const DEFAULT_PERMISSIONS: PermissionDefinition[] = [
  {
    id: 'accessibility',
    title: 'Accessibility Service',
    category: 'Accessibility',
    description: 'The app utilizes the AccessibilityService solely to display the Dynamic Bar view above system UI. Rest assured, no data is collected or shared using the AccessibilityService API.',
    granted: false,
    required: true,
    androidManifestName: 'android.permission.BIND_ACCESSIBILITY_SERVICE'
  },
  {
    id: 'notification_listener',
    title: 'Notification Access',
    category: 'Notifications',
    description: 'Allows Dynamic Bar to capture incoming messages, music controls, and timer updates to display in the island.',
    granted: false,
    required: true,
    androidManifestName: 'android.permission.BIND_NOTIFICATION_LISTENER_SERVICE'
  },
  {
    id: 'system_overlay',
    title: 'Display Over Other Apps',
    category: 'System',
    description: 'Permits the Dynamic Bar floating pill to render seamlessly on top of any active screen or game.',
    granted: false,
    required: true,
    androidManifestName: 'android.permission.SYSTEM_ALERT_WINDOW'
  },
  {
    id: 'battery_optimization',
    title: 'Ignore Battery Optimizations',
    category: 'System',
    description: 'Prevents Android system background killer from closing the Dynamic Island service when phone is asleep.',
    granted: false,
    required: true,
    androidManifestName: 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'
  },
  {
    id: 'phone_state',
    title: 'Phone & Call Status',
    category: 'Privacy',
    description: 'Detects incoming and active calls to show the caller pill, mute toggle, and answer button.',
    granted: false,
    required: false,
    androidManifestName: 'android.permission.READ_PHONE_STATE'
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth & Nearby Devices',
    category: 'System',
    description: 'Connects to paired Bluetooth headsets or earbuds and displays real-time battery percentage.',
    granted: false,
    required: false,
    androidManifestName: 'android.permission.BLUETOOTH_CONNECT'
  },
  {
    id: 'contacts',
    title: 'Contacts Information',
    category: 'Privacy',
    description: 'Matches incoming phone numbers with contact names and profile avatars in the dynamic call pill.',
    granted: false,
    required: false,
    androidManifestName: 'android.permission.READ_CONTACTS'
  }
];

export const DEFAULT_APPS: AppDefinition[] = [
  { id: 'phone', name: 'Phone', iconName: 'Phone', category: 'system', color: '#10b981' },
  { id: 'messages', name: 'Messages', iconName: 'MessageSquare', category: 'system', color: '#3b82f6', badgeCount: 2 },
  { id: 'music', name: 'Music', iconName: 'Music', category: 'media', color: '#ec4899' },
  { id: 'browser', name: 'Browser', iconName: 'Compass', category: 'tools', color: '#06b6d4' },
  { id: 'camera', name: 'Camera', iconName: 'Camera', category: 'system', color: '#f59e0b' },
  { id: 'settings', name: 'Settings', iconName: 'Settings', category: 'system', color: '#64748b' },
  { id: 'gallery', name: 'Photos', iconName: 'Image', category: 'media', color: '#8b5cf6' },
  { id: 'calculator', name: 'Calculator', iconName: 'Calculator', category: 'tools', color: '#f97316' },
  { id: 'notes', name: 'Atomic Notes', iconName: 'FileText', category: 'tools', color: '#eab308' },
  { id: 'clock', name: 'Clock', iconName: 'Clock', category: 'system', color: '#6366f1' },
  { id: 'files', name: 'Files', iconName: 'Folder', category: 'tools', color: '#0284c7' },
  { id: 'weather', name: 'Weather', iconName: 'CloudSun', category: 'utility', color: '#38bdf8' },
  { id: 'health', name: 'Origin Health', iconName: 'Activity', category: 'utility', color: '#14b8a6' },
  { id: 'whatsapp', name: 'WhatsApp', iconName: 'MessageCircle', category: 'social', color: '#25D366', badgeCount: 3 },
  { id: 'youtube', name: 'YouTube', iconName: 'PlaySquare', category: 'media', color: '#EF4444' },
  { id: 'maps', name: 'Maps', iconName: 'MapPin', category: 'tools', color: '#10B981' }
];

export const WALLPAPERS = [
  {
    id: 'origin_aurora',
    name: 'Origin Aurora',
    gradient: 'radial-gradient(ellipse at 80% 20%, #3b82f6 0%, #1e1b4b 50%, #030712 100%)',
    previewColor: '#2563eb'
  },
  {
    id: 'sunset_flow',
    name: 'Sunset Fluid',
    gradient: 'radial-gradient(circle at 20% 30%, #f43f5e 0%, #7c2d12 40%, #0f172a 90%)',
    previewColor: '#f43f5e'
  },
  {
    id: 'cyber_cyan',
    name: 'Cyber Cyan 17',
    gradient: 'radial-gradient(circle at 75% 75%, #06b6d4 0%, #0f172a 60%, #030712 100%)',
    previewColor: '#06b6d4'
  },
  {
    id: 'velvet_orchid',
    name: 'Velvet Orchid',
    gradient: 'linear-gradient(135deg, #180326 0%, #581c87 50%, #020617 100%)',
    previewColor: '#9333ea'
  },
  {
    id: 'pure_obsidian',
    name: 'OLED Obsidian',
    gradient: 'linear-gradient(180deg, #090a0f 0%, #111827 50%, #030712 100%)',
    previewColor: '#1f2937'
  }
];

export const INITIAL_MUSIC: MusicTrack = {
  title: 'Midnight Horizon',
  artist: 'Lofi Pulse & Luna',
  album: 'Origin Chill Vol. 4',
  coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80',
  duration: 194,
  currentTime: 0,
  isPlaying: false
};

export const INITIAL_CALL: CallState = {
  callerName: 'Priya Sharma',
  phoneNumber: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  status: 'ended',
  duration: 0,
  isMuted: false,
  isSpeaker: false
};

export const INITIAL_TIMER: TimerState = {
  title: 'Focus Sprint',
  totalSeconds: 300,
  remainingSeconds: 300,
  isRunning: false
};

export const INITIAL_DELIVERY: DeliveryState = {
  serviceName: 'Blinkit Fast',
  orderNumber: '#BL-9821',
  driverName: 'Vikram Singh',
  etaMinutes: 8,
  currentStep: 'prepped',
  destination: 'Tower 4, Flat 502'
};

export const INITIAL_BLUETOOTH: BluetoothState = {
  deviceName: 'vivo TWS 4 Pro',
  deviceType: 'earbuds',
  connected: false,
  leftBattery: 85,
  rightBattery: 90,
  caseBattery: 70
};

export const INITIAL_CHARGING: ChargingState = {
  isCharging: false,
  batteryLevel: 78,
  wattage: 120,
  chargingSpeedText: '120W FlashCharge',
  estimatedFullMinutes: 11
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    appName: 'WhatsApp',
    appPackage: 'com.whatsapp',
    sender: 'Rahul Verma',
    title: 'Rahul Verma',
    message: 'Bro, launcher is super fast! Check out the charging animation ⚡',
    time: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    iconColor: '#25D366'
  },
  {
    id: 'notif-2',
    appName: 'Gmail',
    appPackage: 'com.google.android.gm',
    sender: 'GitHub',
    title: 'OriginOS Dynamic Island v2.2 deployed',
    message: 'Your production build was successful with zero latency.',
    time: '5m ago',
    iconColor: '#EA4335'
  }
];
