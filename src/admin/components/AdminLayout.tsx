import React, { useState } from 'react';
import { Sidebar, AdminTab } from './Sidebar';
import { Topbar } from './Topbar';
import { useToast } from '../context/ToastContext';
import { adminStore } from '../data/adminStore';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onNavigate: (tab: AdminTab) => void;
  onViewWebsite: () => void;
  children: React.ReactNode;
  onRefreshData?: () => void;
  unreadCount?: number;
  pendingBookingsCount?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onNavigate,
  onViewWebsite,
  children,
  onRefreshData,
  unreadCount,
  pendingBookingsCount
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { showToast } = useToast();

  const handleResetData = () => {
    if (window.confirm('Reset all demo administrative records back to verified baseline?')) {
      adminStore.resetAllToDemoDefaults();
      showToast('All administrative data reset to demo defaults', 'info');
      if (onRefreshData) onRefreshData();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onNavigate={onNavigate}
        onViewWebsite={onViewWebsite}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        unreadCount={unreadCount}
        pendingBookingsCount={pendingBookingsCount}
      />

      {/* Main App Container (Shifted right on desktop by sidebar width 16rem = 256px) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Topbar
          currentTab={currentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onViewWebsite={onViewWebsite}
          onResetData={handleResetData}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
