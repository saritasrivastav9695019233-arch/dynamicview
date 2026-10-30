import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import { ShieldCheck, Check, X, Bell, Layers, BatteryCharging, AlertCircle, Sparkles } from 'lucide-react';

export const PermissionRequestModal: React.FC = () => {
  const {
    isPermissionModalOpen,
    closePermissionModal,
    grantPermissionsAndProceed,
    pendingFeatureToEnable,
    permissions
  } = useLauncher();

  if (!isPermissionModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        className="w-full max-w-md rounded-3xl bg-neutral-900 border border-cyan-500/30 p-5 text-white shadow-2xl space-y-4 select-none max-h-[85vh] overflow-y-auto scrollbar-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System Permission Setup</h3>
              <p className="text-xs text-cyan-300">
                {pendingFeatureToEnable
                  ? `Required to activate ${pendingFeatureToEnable}`
                  : 'Enable services to show Dynamic Island on your screen'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closePermissionModal}
            className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Disclosure Card (verbatim from user screenshot) */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AccessibilityService Disclosure</span>
          </div>
          <p className="text-[11px] text-white/75 italic leading-relaxed">
            "The app utilizes the AccessibilityService solely to display the Dynamic Bar view. Rest assured, no data is collected or shared using the AccessibilityService API."
          </p>
        </div>

        {/* Permission List Items */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">
            Permissions to be Granted
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-white">Accessibility Service</div>
                <div className="text-[10px] text-white/50">Renders floating notch island over display</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full">
              Required
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-white">Notification Listener</div>
                <div className="text-[10px] text-white/50">Captures incoming messages & media controls</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
              Required
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BatteryCharging className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-white">Ignore Battery Optimization</div>
                <div className="text-[10px] text-white/50">Prevents background sleeping / killing</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
              Essential
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <button
            type="button"
            onClick={closePermissionModal}
            className="flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white/80 active:scale-95 transition"
          >
            Cancel / Deny
          </button>

          <button
            type="button"
            onClick={grantPermissionsAndProceed}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-xs font-bold text-black shadow-lg shadow-cyan-500/25 active:scale-95 flex items-center justify-center gap-2 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Allow & Agree</span>
          </button>
        </div>

        <div className="text-center text-[10px] text-white/40">
          Once allowed, the Dynamic Island will appear instantly at the top of your screen.
        </div>
      </motion.div>
    </div>
  );
};
