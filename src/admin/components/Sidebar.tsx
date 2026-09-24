import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Wrench,
  Coins,
  Image as ImageIcon,
  Star,
  MapPin,
  HelpCircle,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Logo } from '../../components/Logo';

export type AdminTab =
  | 'dashboard'
  | 'bookings'
  | 'services'
  | 'pricing'
  | 'gallery'
  | 'reviews'
  | 'service-areas'
  | 'faqs'
  | 'messages'
  | 'settings';

interface SidebarProps {
  currentTab: AdminTab;
  onNavigate: (tab: AdminTab) => void;
  onViewWebsite: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unreadCount?: number;
  pendingBookingsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  onViewWebsite,
  isOpenMobile,
  onCloseMobile,
  unreadCount = 0,
  pendingBookingsCount = 0
}) => {
  const { user, logout } = useAdminAuth();

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: pendingBookingsCount },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'pricing', label: 'Pricing', icon: Coins },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'service-areas', label: 'Service Areas', icon: MapPin },
    { id: 'faqs', label: 'FAQ', icon: HelpCircle },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (id: AdminTab) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-neutral-950 border-r border-neutral-850 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-neutral-850 flex items-center justify-between">
          <Logo variant="horizontal" size="sm" />

          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Admin Status Badge */}
        <div className="px-4 py-2 bg-neutral-900/60 border-b border-neutral-850 flex items-center gap-2 text-[10px] text-neutral-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Bramley Leeds · Admin Console</span>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-neutral-950 text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: View Website & Logout */}
        <div className="p-3 border-t border-neutral-850 bg-neutral-900/30 space-y-1.5">
          <button
            type="button"
            onClick={onViewWebsite}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-neutral-400" />
            <span>View Website</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          {/* User profile preview */}
          {user && (
            <div className="pt-2 mt-2 border-t border-neutral-850 flex items-center gap-2.5 px-2">
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                {user.avatar || 'AD'}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-white truncate block">
                  {user.name}
                </span>
                <span className="text-[10px] text-neutral-500 truncate block">
                  {user.role}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
