import React from 'react';
import { useLauncher } from '../../context/LauncherContext';
import { AppDefinition } from '../../types/launcher';
import * as Icons from 'lucide-react';

interface AppIconProps {
  app: AppDefinition;
  onClick?: () => void;
  showBadge?: boolean;
}

export const AppIcon: React.FC<AppIconProps> = ({ app, onClick, showBadge = true }) => {
  const { launcherSettings, openScreen } = useLauncher();

  // Find icon component dynamically or fallback
  const iconMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = iconMap[app.iconName] || Icons.Grid;

  // Icon pack shape & styling
  const getPackStyles = () => {
    switch (launcherSettings.iconPack) {
      case 'material_you':
        return {
          container: 'rounded-[20px] bg-neutral-800/80 border border-neutral-700/50',
          iconColor: 'text-cyan-300'
        };
      case 'cyber_neon':
        return {
          container: 'rounded-2xl bg-black border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]',
          iconColor: 'text-cyan-400'
        };
      case 'glassmorphism':
        return {
          container: 'rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg',
          iconColor: 'text-white'
        };
      case 'minimal_mono':
        return {
          container: 'rounded-2xl bg-neutral-900 border border-neutral-800',
          iconColor: 'text-white/80'
        };
      case 'originos':
      default:
        return {
          // Signature OriginOS continuous curvature squircle
          container: 'rounded-[22px] shadow-md border border-white/10 hover:border-white/30',
          iconColor: 'text-white'
        };
    }
  };

  const getDimensions = () => {
    switch (launcherSettings.iconSize) {
      case 'small':
        return { box: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-[10px]' };
      case 'large':
        return { box: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xs' };
      case 'medium':
      default:
        return { box: 'w-14 h-14', icon: 'w-7 h-7', text: 'text-[11px]' };
    }
  };

  const packStyles = getPackStyles();
  const dims = getDimensions();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (app.id === 'settings') {
      openScreen('settings');
    } else if (app.id === 'phone') {
      openScreen('app_phone');
    } else if (app.id === 'messages') {
      openScreen('app_messages');
    } else if (app.id === 'music') {
      openScreen('app_music');
    } else if (app.id === 'browser') {
      openScreen('app_browser');
    } else if (app.isCustomWebApp) {
      openScreen('app_custom_web', app.id);
    } else {
      // Default fallback screen view or open app
      openScreen('app_phone', app.id);
    }
  };

  const isOriginTheme = launcherSettings.iconPack === 'originos';

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center cursor-pointer group active:scale-90 transition-transform duration-150 select-none"
    >
      <div className="relative">
        <div
          className={`${dims.box} ${packStyles.container} flex items-center justify-center transition-all duration-200`}
          style={
            isOriginTheme
              ? { backgroundColor: app.color, background: `linear-gradient(135deg, ${app.color} 0%, #0f172a 140%)` }
              : undefined
          }
        >
          <IconComponent className={`${dims.icon} ${packStyles.iconColor}`} />
        </div>

        {/* Badge counter */}
        {showBadge && app.badgeCount && app.badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full border border-black shadow">
            {app.badgeCount}
          </span>
        )}

        {/* Custom web app indicator */}
        {app.isCustomWebApp && (
          <span className="absolute -bottom-1 -right-1 bg-cyan-600 text-[8px] font-bold text-white px-1 rounded border border-black">
            WEB
          </span>
        )}
      </div>

      {launcherSettings.showLabels && (
        <span
          className={`mt-1.5 ${dims.text} font-medium text-white/90 group-hover:text-white truncate max-w-[70px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
        >
          {app.name}
        </span>
      )}
    </div>
  );
};
