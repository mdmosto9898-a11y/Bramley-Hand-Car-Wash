import React from 'react';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Wrench,
  Image as ImageIcon,
  Star,
  Plus,
  AlertCircle,
  XCircle,
  Inbox,
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { AdminBooking, AdminMessage } from '../types/admin';

interface DashboardPageProps {
  bookings: AdminBooking[];
  messages: AdminMessage[];
  servicesCount?: number;
  galleryCount?: number;
  reviewsCount?: number;
  onNavigateToTab: (tab: any) => void;
  onSelectBooking: (booking: AdminBooking) => void;
  onSelectMessage: (msg: AdminMessage) => void;
  onQuickAction?: (action: 'add_booking' | 'add_service' | 'add_gallery' | 'add_review') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  bookings,
  messages,
  servicesCount = 12,
  galleryCount = 8,
  reviewsCount = 5,
  onNavigateToTab,
  onSelectBooking,
  onSelectMessage,
  onQuickAction
}) => {
  const totalBookings = bookings.length;
  const newBookings = bookings.filter((b) => b.status === 'new').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const completedBookings = bookings.filter((b) => b.status === 'completed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
  const unreadMessages = messages.filter((m) => m.status === 'new').length;

  const recentBookings = bookings.slice(0, 5);
  const recentMessages = messages.slice(0, 4);

  // Status breakdown percentages
  const pendingPct = totalBookings ? Math.round(((newBookings + pendingBookings) / totalBookings) * 100) : 0;
  const confirmedPct = totalBookings ? Math.round((confirmedBookings / totalBookings) * 100) : 0;
  const completedPct = totalBookings ? Math.round((completedBookings / totalBookings) * 100) : 0;
  const cancelledPct = totalBookings ? Math.round((cancelledBookings / totalBookings) * 100) : 0;

  const handleAction = (action: 'add_booking' | 'add_service' | 'add_gallery' | 'add_review') => {
    if (onQuickAction) {
      onQuickAction(action);
    } else {
      if (action === 'add_booking') onNavigateToTab('bookings');
      if (action === 'add_service') onNavigateToTab('services');
      if (action === 'add_gallery') onNavigateToTab('gallery');
      if (action === 'add_review') onNavigateToTab('reviews');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="p-4 sm:p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                Bramley Hand Car Wash Operational Console
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                DEMO DATA
              </span>
            </div>
            <span className="text-xs text-neutral-400">
              601 Stanningley Rd, Bramley, Leeds LS13 4EL · USD ($) Architecture · Firebase Ready
            </span>
          </div>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => handleAction('add_booking')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Booking</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction('add_service')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-400" />
            <span>Add Service</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction('add_gallery')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-400" />
            <span>Add Image</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction('add_review')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-400" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Stats Grid (Total, New, Pending, Confirmed, Completed, Cancelled, Unread, Services, Gallery, Reviews) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Operations & Catalog Overview
          </h2>
          <span className="text-[11px] text-neutral-500 font-mono">10 Key Metrics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Total Bookings */}
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={Calendar}
            subtext="All customer bookings"
          />

          {/* 2. New Bookings */}
          <StatCard
            title="New Bookings"
            value={newBookings}
            icon={Inbox}
            subtext="Incoming new requests"
            highlight={newBookings > 0}
            badge={newBookings > 0 ? 'New' : undefined}
          />

          {/* 3. Pending */}
          <StatCard
            title="Pending"
            value={pendingBookings}
            icon={Clock}
            subtext="Awaiting confirmation"
            highlight={pendingBookings > 0}
            badge={pendingBookings > 0 ? 'Action' : undefined}
          />

          {/* 4. Confirmed */}
          <StatCard
            title="Confirmed"
            value={confirmedBookings}
            icon={CalendarCheck}
            subtext="Scheduled in calendar"
          />

          {/* 5. Completed */}
          <StatCard
            title="Completed"
            value={completedBookings}
            icon={CheckCircle2}
            subtext="Washed & detailed"
          />

          {/* 6. Cancelled */}
          <StatCard
            title="Cancelled"
            value={cancelledBookings}
            icon={XCircle}
            subtext="Rescheduled/void"
          />

          {/* 7. Unread Messages */}
          <StatCard
            title="Unread Messages"
            value={unreadMessages}
            icon={MessageSquare}
            subtext="Contact inquiries"
            highlight={unreadMessages > 0}
            badge={unreadMessages > 0 ? 'Enquiries' : undefined}
          />

          {/* 8. Services */}
          <StatCard
            title="Active Services"
            value={servicesCount}
            icon={Wrench}
            subtext="Catalogue entries"
          />

          {/* 9. Gallery Images */}
          <StatCard
            title="Gallery Images"
            value={galleryCount}
            icon={ImageIcon}
            subtext="Portfolio showcase"
          />

          {/* 10. Reviews */}
          <StatCard
            title="Verified Reviews"
            value={reviewsCount}
            icon={Star}
            subtext="5.0★ Google reviews"
          />
        </div>
      </div>

      {/* Status Distribution Progress Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Booking Status Distribution
          </h3>
          <span className="text-[10px] font-mono text-neutral-500">
            {totalBookings} Total Recorded
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-3 w-full rounded-full bg-neutral-900 overflow-hidden flex">
          {pendingPct > 0 && (
            <div
              style={{ width: `${pendingPct}%` }}
              className="bg-amber-500 h-full transition-all"
              title={`Pending / New: ${newBookings + pendingBookings} (${pendingPct}%)`}
            />
          )}
          {confirmedPct > 0 && (
            <div
              style={{ width: `${confirmedPct}%` }}
              className="bg-sky-500 h-full transition-all"
              title={`Confirmed: ${confirmedBookings} (${confirmedPct}%)`}
            />
          )}
          {completedPct > 0 && (
            <div
              style={{ width: `${completedPct}%` }}
              className="bg-emerald-500 h-full transition-all"
              title={`Completed: ${completedBookings} (${completedPct}%)`}
            />
          )}
          {cancelledPct > 0 && (
            <div
              style={{ width: `${cancelledPct}%` }}
              className="bg-neutral-700 h-full transition-all"
              title={`Cancelled: ${cancelledBookings} (${cancelledPct}%)`}
            />
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-neutral-300">
              Pending / New: <strong>{newBookings + pendingBookings}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-neutral-300">
              Confirmed: <strong>{confirmedBookings}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-neutral-300">
              Completed: <strong>{completedBookings}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <span className="text-neutral-300">
              Cancelled: <strong>{cancelledBookings}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Bookings & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Bookings (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-850 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Recent Booking Requests
              </h2>
              <p className="text-[11px] text-neutral-400">
                Latest customer enquiries requiring scheduling
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('bookings')}
              className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4 text-center">No bookings recorded yet.</p>
            ) : (
              recentBookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onSelectBooking(b)}
                  className="p-3.5 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {b.id}
                      </span>
                      <StatusBadge status={b.status} />
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-neutral-200">
                      {b.customerName} · <span className="font-normal text-neutral-300">{b.vehicleMakeModel}</span>
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                      <span>{b.serviceName}</span>
                      <span>•</span>
                      <span>{b.locationPostcode}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">{b.estimatedPrice}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-semibold text-neutral-200 block">
                      {b.preferredDate}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      {b.preferredTime}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Recent Messages (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-850 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Recent Contact Messages
              </h2>
              <p className="text-[11px] text-neutral-400">
                Direct client queries via website form
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('messages')}
              className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Inbox</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4 text-center">No contact enquiries received yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => onSelectMessage(msg)}
                  className="p-3 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{msg.name}</span>
                    <StatusBadge status={msg.status} />
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">
                    {msg.message}
                  </p>
                  <span className="text-[10px] text-neutral-500 block">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
