import React, { useState, useEffect } from 'react';
import {
  X,
  Building,
  Wrench,
  Image as ImageIcon,
  MapPin,
  HelpCircle,
  CalendarCheck,
  MessageSquare,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  BusinessSettings,
  Service,
  GalleryImage,
  ServiceArea,
  FAQ,
  Booking,
  ContactMessage
} from '../types/database';
import {
  DEFAULT_BUSINESS_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY_IMAGES,
  DEFAULT_SERVICE_AREAS,
  DEFAULT_FAQS,
  INITIAL_SAMPLE_BOOKINGS,
  getStoredData,
  setStoredData
} from '../data/dbStore';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onDataUpdated
}) => {
  const [activeTab, setActiveTab] = useState<
    'settings' | 'services' | 'gallery' | 'areas' | 'faqs' | 'bookings' | 'messages'
  >('settings');

  // State slices
  const [settings, setSettings] = useState<BusinessSettings>(() =>
    getStoredData('prodetailing_settings_v2', DEFAULT_BUSINESS_SETTINGS)
  );
  const [services, setServices] = useState<Service[]>(() =>
    getStoredData('prodetailing_services_v2', DEFAULT_SERVICES)
  );
  const [gallery, setGallery] = useState<GalleryImage[]>(() =>
    getStoredData('prodetailing_gallery_v2', DEFAULT_GALLERY_IMAGES)
  );
  const [areas, setAreas] = useState<ServiceArea[]>(() =>
    getStoredData('prodetailing_areas_v2', DEFAULT_SERVICE_AREAS)
  );
  const [faqs, setFaqs] = useState<FAQ[]>(() =>
    getStoredData('prodetailing_faqs_v2', DEFAULT_FAQS)
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    getStoredData('prodetailing_bookings_v2', INITIAL_SAMPLE_BOOKINGS)
  );
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    getStoredData('prodetailing_messages_v2', [
      {
        id: 'msg-sample',
        createdAt: new Date().toISOString(),
        fullName: 'Oliver Drake',
        phone: '07700 900789',
        email: 'oliver.d@example.co.uk',
        message: 'Looking for full machine polish and ceramic coating on Audi RS6 in Harrogate.',
        status: 'unread'
      }
    ])
  );

  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
    if (onDataUpdated) onDataUpdated();
  };

  if (!isOpen) return null;

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredData('prodetailing_settings_v2', settings);
    showNotify('Business settings successfully saved.');
  };

  // Update Service Price or Details
  const handleUpdateService = (id: string, updates: Partial<Service>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setServices(updated);
    setStoredData('prodetailing_services_v2', updated);
    showNotify('Service updated successfully.');
  };

  // Delete Service
  const handleDeleteService = (id: string) => {
    const filtered = services.filter((s) => s.id !== id);
    setServices(filtered);
    setStoredData('prodetailing_services_v2', filtered);
    showNotify('Service removed.');
  };

  // Update Booking Status
  const handleBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    setStoredData('prodetailing_bookings_v2', updated);
    showNotify(`Booking status changed to ${status}.`);
  };

  // Delete Booking
  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    setStoredData('prodetailing_bookings_v2', updated);
    showNotify('Booking record deleted.');
  };

  // Update FAQ
  const handleUpdateFaq = (id: string, question: string, answer: string) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, question, answer } : f));
    setFaqs(updated);
    setStoredData('prodetailing_faqs_v2', updated);
    showNotify('FAQ updated.');
  };

  // Reset all to Verified Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all demo data back to verified Pro Detailing defaults?')) {
      setSettings(DEFAULT_BUSINESS_SETTINGS);
      setServices(DEFAULT_SERVICES);
      setGallery(DEFAULT_GALLERY_IMAGES);
      setAreas(DEFAULT_SERVICE_AREAS);
      setFaqs(DEFAULT_FAQS);
      setBookings(INITIAL_SAMPLE_BOOKINGS);

      setStoredData('prodetailing_settings_v2', DEFAULT_BUSINESS_SETTINGS);
      setStoredData('prodetailing_services_v2', DEFAULT_SERVICES);
      setStoredData('prodetailing_gallery_v2', DEFAULT_GALLERY_IMAGES);
      setStoredData('prodetailing_areas_v2', DEFAULT_SERVICE_AREAS);
      setStoredData('prodetailing_faqs_v2', DEFAULT_FAQS);
      setStoredData('prodetailing_bookings_v2', INITIAL_SAMPLE_BOOKINGS);

      showNotify('All data reset to verified defaults.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-5xl h-[88vh] bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider bg-white text-neutral-950 px-2.5 py-1 rounded">
              Demo Admin Panel
            </span>
            <span className="text-sm font-semibold text-white">
              Pro Detailing Management Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset data to verified defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-950 border-b border-emerald-800/80 text-emerald-300 text-xs px-6 py-2 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Layout: Sidebar + Main Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <aside className="w-56 border-r border-neutral-800 bg-neutral-900/40 p-3 flex flex-col gap-1 shrink-0 overflow-y-auto">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Business Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Services & Pricing ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery Images ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('areas')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'areas'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Yorkshire Areas ({areas.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQs ({faqs.length})</span>
            </button>

            <div className="my-2 border-t border-neutral-800" />

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-semibold text-left transition-colors cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Enquiries</span>
              </div>
              <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">
                {messages.length}
              </span>
            </button>
          </aside>

          {/* Main Tab Panel */}
          <main className="flex-1 p-6 overflow-y-auto">
            {/* TAB 1: Business Settings */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Verified Business Information
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Core company details, address, telephone, hours, and branding proposition.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Business Name:
                    </label>
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Business Descriptor:
                    </label>
                    <input
                      type="text"
                      value={settings.descriptor}
                      onChange={(e) => setSettings({ ...settings, descriptor: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Contact Phone:
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value, phoneDisplay: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Contact Email:
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Physical Address (Base of Operations):
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Opening Hours:
                  </label>
                  <input
                    type="text"
                    value={settings.openingHours}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Core Message Proposition:
                  </label>
                  <input
                    type="text"
                    value={settings.coreMessage}
                    onChange={(e) => setSettings({ ...settings, coreMessage: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Business Settings</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Services & Pricing */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Services & Pricing Management
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Update prices, short descriptions, and inclusions for all 12 mobile services.
                  </p>
                </div>

                <div className="space-y-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                            {srv.category}
                          </span>
                          <h4 className="text-sm font-bold text-white font-display">
                            {srv.name}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            value={srv.priceDisplay}
                            onChange={(e) =>
                              handleUpdateService(srv.id, { priceDisplay: e.target.value })
                            }
                            title="Edit displayed price"
                            className="bg-neutral-950 border border-neutral-700 text-white px-3 py-1.5 rounded text-xs font-semibold focus:outline-none w-48"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          value={srv.shortDesc}
                          onChange={(e) =>
                            handleUpdateService(srv.id, { shortDesc: e.target.value })
                          }
                          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs p-2.5 rounded focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Gallery & Photos */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Gallery Showcase & Replacement
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Replace representative demo photos with real vehicle detailing portfolio shots.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img) => (
                    <div
                      key={img.id}
                      className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2 flex flex-col justify-between"
                    >
                      <div className="aspect-video w-full rounded overflow-hidden bg-black relative">
                        <img
                          src={img.afterImage}
                          alt={img.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[10px] text-neutral-300">
                          {img.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block truncate">
                          {img.title}
                        </span>
                        <input
                          type="text"
                          value={img.afterImage}
                          onChange={(e) => {
                            const updated = gallery.map((g) =>
                              g.id === img.id ? { ...g, afterImage: e.target.value } : g
                            );
                            setGallery(updated);
                            setStoredData('prodetailing_gallery_v2', updated);
                          }}
                          placeholder="Image URL..."
                          className="mt-1.5 w-full bg-neutral-950 border border-neutral-700 text-neutral-300 px-2 py-1 rounded text-[11px] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Yorkshire Areas */}
            {activeTab === 'areas' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Yorkshire Service Areas
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Verified regions covered by the mobile detailing unit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {areas.map((area) => (
                    <div
                      key={area.id}
                      className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{area.name}</h4>
                        <p className="text-[11px] text-neutral-400">
                          {area.postcodes.join(', ')} ({area.county})
                        </p>
                      </div>
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-1 rounded border border-neutral-700">
                        {area.isPrimary ? 'Primary Zone' : 'Standard'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: FAQs */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    FAQ Management
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Manage common questions asked by car owners across Yorkshire.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2"
                    >
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(faq.id, e.target.value, faq.answer)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-white font-semibold text-xs px-3 py-1.5 rounded focus:outline-none"
                      />
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(faq.id, faq.question, e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs p-2.5 rounded focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: Bookings */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">
                      Booking Requests ({bookings.length})
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Real client booking enquiries submitted through the 7-step booking flow.
                    </p>
                  </div>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-xs">
                    No booking requests recorded yet. Test the booking flow on the website!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((bk) => (
                      <div
                        key={bk.id}
                        className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">
                              {bk.id}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                bk.status === 'confirmed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : bk.status === 'completed'
                                  ? 'bg-neutral-800 text-neutral-300'
                                  : bk.status === 'cancelled'
                                  ? 'bg-red-950 text-red-400'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {bk.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleBookingStatus(bk.id, 'confirmed')}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 rounded border border-emerald-700/60 cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBookingStatus(bk.id, 'completed')}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 cursor-pointer"
                            >
                              Complete
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(bk.id)}
                              className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Service:</span>
                            <span className="text-white font-semibold">{bk.serviceName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Vehicle:</span>
                            <span className="text-white">{bk.vehicleMakeModel} ({bk.vehicleType})</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Schedule:</span>
                            <span className="text-white">{bk.preferredDate} · {bk.preferredTime}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 border-t border-neutral-900">
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Customer:</span>
                            <span className="text-white font-medium">{bk.customerName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Phone:</span>
                            <a href={`tel:${bk.customerPhone}`} className="text-white font-mono hover:underline">
                              {bk.customerPhone}
                            </a>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Location:</span>
                            <span className="text-white font-medium">{bk.postcode}</span>
                          </div>
                        </div>

                        {bk.additionalInfo && (
                          <div className="text-[11px] text-neutral-400 bg-neutral-950 p-2 rounded border border-neutral-850">
                            <strong>Note: </strong> {bk.additionalInfo}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    Contact Enquiries ({messages.length})
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Direct messages sent from the Contact Us form.
                  </p>
                </div>

                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{msg.fullName}</span>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 flex gap-4">
                        <span>Phone: <a href={`tel:${msg.phone}`} className="text-white hover:underline">{msg.phone}</a></span>
                        {msg.email && <span>Email: <a href={`mailto:${msg.email}`} className="text-white hover:underline">{msg.email}</a></span>}
                      </div>
                      <p className="text-neutral-300 bg-neutral-950 p-2.5 rounded border border-neutral-850 mt-1">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
