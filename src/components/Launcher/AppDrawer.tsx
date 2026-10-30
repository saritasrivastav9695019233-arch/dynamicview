import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLauncher } from '../../context/LauncherContext';
import { AppIcon } from './AppIcon';
import { Search, ArrowLeft, Plus, X } from 'lucide-react';
import { AddWebAppModal } from './AddWebAppModal';

export const AppDrawer: React.FC = () => {
  const { apps, goHome } = useLauncher();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddWebModalOpen, setIsAddWebModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Apps' },
    { id: 'system', label: 'System' },
    { id: 'tools', label: 'Tools' },
    { id: 'social', label: 'Social' },
    { id: 'media', label: 'Media' },
    { id: 'custom', label: 'Web Apps' }
  ];

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || app.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [apps, searchQuery, selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      className="absolute inset-0 z-30 bg-black/85 backdrop-blur-2xl flex flex-col pt-16 px-4 pb-16 overflow-hidden text-white"
    >
      {/* Search Header with Back Button */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={goHome}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
          title="Back to Home Screen"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 relative flex items-center">
          <Search className="w-4 h-4 text-white/40 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-2xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsAddWebModalOpen(true)}
          className="p-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition text-white shadow-lg shadow-cyan-500/20"
          title="Add Custom Web App"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none mb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-white text-black font-semibold shadow'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-none">
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-4 gap-y-5 gap-x-2 py-3">
            {filteredApps.map((app) => (
              <AppIcon key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center text-white/50">
            <p className="text-sm">No apps found for "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => setIsAddWebModalOpen(true)}
              className="mt-3 text-xs text-cyan-400 underline font-medium"
            >
              Add as a new Web App?
            </button>
          </div>
        )}
      </div>

      {/* Add Web App Modal */}
      <AddWebAppModal
        isOpen={isAddWebModalOpen}
        onClose={() => setIsAddWebModalOpen(false)}
      />
    </motion.div>
  );
};
