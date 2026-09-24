import React, { useState } from 'react';
import {
  Settings,
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Share2,
  DollarSign,
  RotateCcw,
  Megaphone
} from 'lucide-react';
import { FormField } from '../components/FormField';
import { AdminBusinessSettings } from '../types/admin';
import { adminStore, INITIAL_DEMO_SETTINGS } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface SettingsPageProps {
  settings: AdminBusinessSettings;
  onRefresh: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onRefresh }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<AdminBusinessSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    adminStore.updateBusinessSettings(formData);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Business settings and metadata saved successfully', 'success');
      onRefresh();
    }, 300);
  };

  const handleResetToBaseline = () => {
    if (window.confirm('Reset settings to verified Bramley Hand Car Wash default data?')) {
      const reset = adminStore.updateBusinessSettings(INITIAL_DEMO_SETTINGS);
      setFormData(reset);
      showToast('Settings reset to Bramley Hand Car Wash baseline', 'info');
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display">
            Business Profile & Configuration
          </h2>
          <p className="text-xs text-neutral-400">
            Control business identity, Leeds location, TikTok & social links, currency, and SEO meta tags
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToBaseline}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-5 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Verified Identity */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-4">
          <div className="border-b border-neutral-850 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-bold text-white">Verified Business Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Business Name" required>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Telephone Contact" required>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Email Contact">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Opening Hours" required>
              <input
                type="text"
                required
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>
          </div>

          <FormField label="Registered Facility Address" required>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Business Positioning / Core Message">
            <textarea
              rows={2}
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none leading-relaxed"
            />
          </FormField>
        </div>

        {/* Card 2: Currency & Regional Settings */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-4">
          <div className="border-b border-neutral-850 pb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Currency & Pricing Configuration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Currency Code" helperText="Default: USD">
              <input
                type="text"
                value={formData.currency || 'USD'}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Currency Symbol" helperText="Must be US Dollars ($)">
              <input
                type="text"
                value={formData.currencySymbol || '$'}
                onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono font-bold"
              />
            </FormField>
          </div>
        </div>

        {/* Card 3: Social & Online Links */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-4">
          <div className="border-b border-neutral-850 pb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-bold text-white">Social Media & Direct Connect</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Official TikTok URL" helperText="@bramley_handcarwash0">
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder="https://www.tiktok.com/@bramley_handcarwash0"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="WhatsApp Link" helperText="Direct customer enquiry messaging">
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>
          </div>

          <FormField label="Google Maps / Business Profile URL">
            <input
              type="url"
              value={formData.googleBusinessUrl}
              onChange={(e) => setFormData({ ...formData, googleBusinessUrl: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>
        </div>

        {/* Card 4: SEO Configuration */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-4">
          <div className="border-b border-neutral-850 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-bold text-white">Search Engine Optimization (SEO)</h3>
          </div>

          <FormField label="Global SEO Page Title">
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Global Meta Description">
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none"
            />
          </FormField>
        </div>

        {/* Card 5: Announcement Bar */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-4">
          <div className="border-b border-neutral-850 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Promotional Announcement Bar</h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={formData.announcementActive !== false}
                onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                className="rounded border-neutral-700 bg-neutral-900 text-white focus:ring-0"
              />
              <span>Enabled on customer website</span>
            </label>
          </div>

          <FormField label="Announcement Banner Message" helperText="Displayed at the top of the customer website without obscuring the header">
            <input
              type="text"
              value={formData.announcementText || ''}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              placeholder="LIMITED-TIME OFFER • SAVE UP TO 20% ON VALETING PACKAGES"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>
        </div>
      </form>
    </div>
  );
};
