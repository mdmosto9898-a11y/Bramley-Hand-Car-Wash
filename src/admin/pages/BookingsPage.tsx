import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Car,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { AdminBooking, BookingStatus } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface BookingsPageProps {
  bookings: AdminBooking[];
  onRefresh: () => void;
  selectedBookingId?: string;
  onClearSelectedBookingId?: () => void;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({
  bookings,
  onRefresh,
  selectedBookingId,
  onClearSelectedBookingId
}) => {
  const { showToast } = useToast();

  // Modals state
  const [viewingBooking, setViewingBooking] = useState<AdminBooking | null>(() => {
    if (selectedBookingId) {
      return bookings.find((b) => b.id === selectedBookingId) || null;
    }
    return null;
  });

  const [editingBooking, setEditingBooking] = useState<AdminBooking | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  // Status Filter State
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

  // Form state for creating / editing
  const [formData, setFormData] = useState<Partial<AdminBooking>>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleMakeModel: '',
    vehicleType: 'Saloon / Estate',
    serviceName: 'Full Valet Package',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (08:30 - 12:00)',
    locationPostcode: 'LS13 4EL',
    address: 'Leeds, West Yorkshire',
    additionalNotes: '',
    status: 'pending',
    estimatedPrice: 'From $50'
  });

  // Filter bookings by status
  const displayedBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter);

  // Handle Quick Status Change
  const handleQuickStatusChange = (id: string, newStatus: BookingStatus) => {
    adminStore.updateBookingStatus(id, newStatus);
    showToast(`Booking ${id} status updated to ${newStatus}`, 'success');
    onRefresh();
    if (viewingBooking && viewingBooking.id === id) {
      setViewingBooking({ ...viewingBooking, status: newStatus });
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (booking: AdminBooking) => {
    setEditingBooking(booking);
    setFormData(booking);
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    adminStore.updateBooking(editingBooking.id, formData);
    showToast(`Booking ${editingBooking.id} updated successfully`, 'success');
    setEditingBooking(null);
    onRefresh();
  };

  // Open New Booking Modal
  const handleOpenNew = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      vehicleMakeModel: '',
      vehicleType: 'Saloon / Estate',
      serviceName: 'Full Valet Package',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning (08:30 - 12:00)',
      locationPostcode: 'LS13 4EL',
      address: '',
      additionalNotes: '',
      status: 'pending',
      estimatedPrice: 'From $50'
    });
    setIsNewBookingModalOpen(true);
  };

  // Save New Booking
  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      showToast('Please enter customer name and phone', 'error');
      return;
    }
    const created = adminStore.addBooking(formData as Omit<AdminBooking, 'id' | 'createdAt'>);
    showToast(`Booking ${created.id} created successfully`, 'success');
    setIsNewBookingModalOpen(false);
    onRefresh();
  };

  // Delete Booking
  const handleConfirmDelete = () => {
    if (!deletingBookingId) return;
    adminStore.deleteBooking(deletingBookingId);
    showToast(`Booking ${deletingBookingId} removed`, 'info');
    setDeletingBookingId(null);
    if (viewingBooking && viewingBooking.id === deletingBookingId) {
      setViewingBooking(null);
    }
    onRefresh();
  };

  // Columns definition
  const columns: Column<AdminBooking>[] = [
    {
      header: 'Booking ID',
      className: 'font-mono font-bold text-white',
      render: (b) => (
        <div>
          <span>{b.id}</span>
          <span className="block text-[10px] text-neutral-500 font-normal">
            {new Date(b.createdAt).toLocaleDateString()}
          </span>
        </div>
      )
    },
    {
      header: 'Customer',
      render: (b) => (
        <div>
          <span className="font-semibold text-white block">{b.customerName}</span>
          <span className="text-[11px] text-neutral-400 font-mono">{b.customerPhone}</span>
        </div>
      )
    },
    {
      header: 'Vehicle',
      render: (b) => (
        <div>
          <span className="text-neutral-200 font-medium block">{b.vehicleMakeModel}</span>
          <span className="text-[10px] text-neutral-400 block">{b.vehicleType}</span>
        </div>
      )
    },
    {
      header: 'Service',
      render: (b) => (
        <span className="text-neutral-300 font-medium line-clamp-1 max-w-[180px]">
          {b.serviceName}
        </span>
      )
    },
    {
      header: 'Schedule',
      render: (b) => (
        <div>
          <span className="text-white font-mono block">{b.preferredDate}</span>
          <span className="text-[10px] text-neutral-400 block">{b.preferredTime}</span>
        </div>
      )
    },
    {
      header: 'Location',
      render: (b) => (
        <span className="font-mono bg-neutral-900 px-2 py-0.5 rounded text-neutral-300 border border-neutral-800 text-[11px]">
          {b.locationPostcode}
        </span>
      )
    },
    {
      header: 'Status',
      render: (b) => <StatusBadge status={b.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (b) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setViewingBooking(b)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(b)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Booking"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingBookingId(b.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display">
            Bramley Valeting & Wash Bookings
          </h2>
          <p className="text-xs text-neutral-400">
            Manage vehicle valeting and wash bookings for 601 Stanningley Rd, Bramley, Leeds
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Status Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit text-xs">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('pending')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'pending'
              ? 'bg-neutral-800 text-amber-300'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Pending ({bookings.filter((b) => b.status === 'pending').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('confirmed')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'confirmed'
              ? 'bg-neutral-800 text-sky-300'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('completed')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'completed'
              ? 'bg-neutral-800 text-emerald-300'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Completed ({bookings.filter((b) => b.status === 'completed').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('cancelled')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'cancelled'
              ? 'bg-neutral-800 text-neutral-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        data={displayedBookings}
        columns={columns}
        keyExtractor={(b) => b.id}
        searchPlaceholder="Search customer, phone, vehicle or postcode..."
        searchFilter={(b, query) => {
          const q = query.toLowerCase();
          return (
            b.id.toLowerCase().includes(q) ||
            b.customerName.toLowerCase().includes(q) ||
            b.customerPhone.toLowerCase().includes(q) ||
            b.vehicleMakeModel.toLowerCase().includes(q) ||
            b.locationPostcode.toLowerCase().includes(q) ||
            b.serviceName.toLowerCase().includes(q)
          );
        }}
        emptyTitle="No bookings found"
        emptyDescription="There are no booking records matching your current filter criteria."
        actionComponent={undefined}
      />

      {/* 1. DETAILED BOOKING VIEW MODAL */}
      <Modal
        isOpen={!!viewingBooking}
        onClose={() => {
          setViewingBooking(null);
          if (onClearSelectedBookingId) onClearSelectedBookingId();
        }}
        title={`Booking Record: ${viewingBooking?.id || ''}`}
        subtitle={`Submitted on ${viewingBooking ? new Date(viewingBooking.createdAt).toLocaleString() : ''}`}
        maxWidth="2xl"
        footer={
          viewingBooking && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Change Status:</span>
                <select
                  value={viewingBooking.status}
                  onChange={(e) => handleQuickStatusChange(viewingBooking.id, e.target.value as BookingStatus)}
                  className="bg-neutral-900 border border-neutral-700 text-white rounded px-2.5 py-1 text-xs focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleOpenEdit(viewingBooking);
                    setViewingBooking(null);
                  }}
                  className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-neutral-700 cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewingBooking(null);
                    if (onClearSelectedBookingId) onClearSelectedBookingId();
                  }}
                  className="px-4 py-1.5 rounded bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )
        }
      >
        {viewingBooking && (
          <div className="space-y-4">
            {/* Status & Price Highlight */}
            <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Status:</span>
                <StatusBadge status={viewingBooking.status} />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Estimated Price</span>
                <span className="text-sm font-bold text-white font-mono">{viewingBooking.estimatedPrice || 'Subject to inspection'}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Customer Information</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Full Name:</span>
                  <span className="text-xs font-bold text-white">{viewingBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Telephone:</span>
                  <a href={`tel:${viewingBooking.customerPhone}`} className="text-xs font-mono text-emerald-400 hover:underline">
                    {viewingBooking.customerPhone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Email:</span>
                  <a href={`mailto:${viewingBooking.customerEmail}`} className="text-xs text-neutral-300 hover:underline truncate block">
                    {viewingBooking.customerEmail || 'Not provided'}
                  </a>
                </div>
              </div>
            </div>

            {/* Vehicle & Service Info */}
            <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-neutral-400" />
                <span>Vehicle & Detailing Scope</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Vehicle Model:</span>
                  <span className="text-xs font-semibold text-white">{viewingBooking.vehicleMakeModel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Body Classification:</span>
                  <span className="text-xs text-neutral-300">{viewingBooking.vehicleType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Requested Treatment:</span>
                  <span className="text-xs text-white font-medium">{viewingBooking.serviceName}</span>
                </div>
              </div>
            </div>

            {/* Scheduling & Location */}
            <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Appointment Location & Schedule</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Preferred Date:</span>
                  <span className="text-xs font-mono font-bold text-white">{viewingBooking.preferredDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Time Slot:</span>
                  <span className="text-xs text-neutral-300">{viewingBooking.preferredTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Postcode:</span>
                  <span className="text-xs font-mono font-bold text-white">{viewingBooking.locationPostcode}</span>
                </div>
              </div>
              {viewingBooking.address && (
                <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                  <span className="text-neutral-500">Full Address: </span> {viewingBooking.address}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            {viewingBooking.additionalNotes && (
              <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Customer Work Notes:
                </span>
                <p className="text-xs text-neutral-300 italic bg-neutral-950 p-2.5 rounded border border-neutral-850">
                  &ldquo;{viewingBooking.additionalNotes}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 2. CREATE OR EDIT BOOKING MODAL */}
      <Modal
        isOpen={isNewBookingModalOpen || !!editingBooking}
        onClose={() => {
          setIsNewBookingModalOpen(false);
          setEditingBooking(null);
        }}
        title={editingBooking ? `Edit Booking ${editingBooking.id}` : 'Create Manual Booking'}
        subtitle="Manage customer, vehicle specifications, and scheduling details"
        maxWidth="2xl"
      >
        <form onSubmit={editingBooking ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Customer Name" required>
              <input
                type="text"
                required
                value={formData.customerName || ''}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. David Higgins"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Telephone Number" required>
              <input
                type="tel"
                required
                value={formData.customerPhone || ''}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="07700 900123"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Customer Email">
              <input
                type="email"
                value={formData.customerEmail || ''}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="name@example.co.uk"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Status" required>
              <select
                value={formData.status || 'pending'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Vehicle Make & Model" required>
              <input
                type="text"
                required
                value={formData.vehicleMakeModel || ''}
                onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                placeholder="e.g. Audi RS4 Avant"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Vehicle Classification" required>
              <select
                value={formData.vehicleType || 'Saloon / Estate'}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="Hatchback / City Car">Hatchback / City Car</option>
                <option value="Saloon / Estate">Saloon / Estate</option>
                <option value="Compact SUV / Crossover">Compact SUV / Crossover</option>
                <option value="Large SUV / 4x4 / 7-Seater">Large SUV / 4x4 / 7-Seater</option>
                <option value="Sports / Performance / Coupe">Sports / Performance / Coupe</option>
                <option value="Commercial Van / Pickup">Commercial Van / Pickup</option>
              </select>
            </FormField>
          </div>

          <FormField label="Service Treatment" required>
            <input
              type="text"
              required
              value={formData.serviceName || ''}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              placeholder="e.g. Interior Reset / Deep Interior Detailing"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Preferred Date" required>
              <input
                type="date"
                required
                value={formData.preferredDate || ''}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Time Window" required>
              <select
                value={formData.preferredTime || 'Morning (08:30 - 12:00)'}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="Morning (08:30 - 12:00)">Morning (08:30 - 12:00)</option>
                <option value="Afternoon (12:30 - 16:30)">Afternoon (12:30 - 16:30)</option>
                <option value="Full Day (Deep Detail)">Full Day (Deep Detail)</option>
              </select>
            </FormField>

            <FormField label="Yorkshire Postcode" required>
              <input
                type="text"
                required
                value={formData.locationPostcode || ''}
                onChange={(e) => setFormData({ ...formData, locationPostcode: e.target.value.toUpperCase() })}
                placeholder="LS8 3LG"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>
          </div>

          <FormField label="Full Address / Location Notes">
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. 14 Oakwood Lane, Leeds (driveway access available)"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Customer Special Requests / Defect Notes">
            <textarea
              rows={3}
              value={formData.additionalNotes || ''}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder="Child seats, pet hair, deep scratches, swirl marks..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none"
            />
          </FormField>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewBookingModalOpen(false);
                setEditingBooking(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              {editingBooking ? 'Save Changes' : 'Create Booking'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 3. CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={!!deletingBookingId}
        title="Delete Booking Record"
        message={`Are you sure you want to permanently delete booking ${deletingBookingId}? This cannot be undone.`}
        confirmLabel="Delete Booking"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingBookingId(null)}
      />
    </div>
  );
};
