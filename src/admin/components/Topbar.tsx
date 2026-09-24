import React from 'react';
import { Menu, ExternalLink, RotateCcw, ShieldCheck, LogOut } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminTab } from './Sidebar';

interface TopbarProps {
  currentTab: AdminTab;
  onOpenMobileSidebar: () => void;
  onViewWebsite: () => void;
  onResetData: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentTab,
  onOpenMobileSidebar,
  onViewWebsite,
  onResetData
}) => {
  const { user, logout } = useAdminAuth();

  const titleMap: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: { title: 'Operational Dashboard', subtitle: 'Overview of Bramley Hand Car Wash requests & operations at 601 Stanningley Rd' },
    bookings: { title: 'Booking Management', subtitle: 'Process client appointments, vehicle types, and schedules' },
    services: { title: 'Services & Treatments', subtitle: 'Manage hand wash, valeting procedures, pricing, and specs' },
    pricing: { title: 'Pricing & Packages', subtitle: 'Set package rates in USD ($) by vehicle type and included services' },
    gallery: { title: 'Work Portfolio & Gallery', subtitle: 'Manage before/after shots and vehicle transformations' },
    reviews: { title: 'Customer Reviews & Feedback', subtitle: 'Manage verified Google feedback and testimonials' },
    'service-areas': { title: 'Service Areas & Coverage', subtitle: 'Manage local Leeds service areas, postcodes, and travel notes' },
    faqs: { title: 'Frequently Asked Questions', subtitle: 'Manage customer guidance and visit instructions' },
    messages: { title: 'Contact Enquiries Inbox', subtitle: 'Direct messages submitted via the website contact form' },
    settings: { title: 'Business & SEO Settings', subtitle: 'Core company information, social links, and metadata' }
  };

  const current = titleMap[currentTab] || { title: 'Admin', subtitle: '' };

  return (
    <header className="h-16 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-850 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2">
            <span>{current.title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Demo Mode</span>
            </span>
          </h1>
          <p className="hidden md:block text-[11px] text-neutral-400 truncate max-w-xl">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Data Button */}
        <button
          type="button"
          onClick={onResetData}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
          title="Reset demo data to initial verified baseline"
        >
          <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
          <span>Reset Demo</span>
        </button>

        {/* View Customer Website */}
        <button
          type="button"
          onClick={onViewWebsite}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 rounded-lg transition-colors cursor-pointer"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* User Info Avatar & Logout */}
        {user && (
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-850">
            <div
              className="w-8 h-8 rounded-full bg-white text-neutral-950 font-bold text-xs flex items-center justify-center font-display"
              title={`${user.name} (${user.email})`}
            >
              {user.avatar || 'AD'}
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-900/50"
              title="Sign out of administrative session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
