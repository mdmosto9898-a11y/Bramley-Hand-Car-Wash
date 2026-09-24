import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { adminStore } from '../admin/data/adminStore';

export const PrototypeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [settings, setSettings] = useState(() => adminStore.getBusinessSettings());

  useEffect(() => {
    const handleStorage = () => {
      setSettings(adminStore.getBusinessSettings());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (dismissed || settings.announcementActive === false) {
    return null;
  }

  const announcementMessage =
    settings.announcementText || 'LIMITED-TIME OFFER • SAVE UP TO 20% ON VALETING PACKAGES';

  return (
    <aside
      aria-label="Bramley Hand Car Wash Promotional Announcement"
      className="w-full bg-neutral-950 border-b border-neutral-800/90 text-neutral-300 text-xs py-2 px-3 sm:px-6 relative z-30 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-center sm:justify-start text-center sm:text-left">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>Special Offer</span>
          </span>
          <p className="text-[11px] sm:text-xs text-neutral-200 font-medium tracking-wide truncate sm:overflow-visible">
            {announcementMessage}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-white p-1 rounded shrink-0 transition-colors cursor-pointer"
          aria-label="Close announcement"
          title="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
