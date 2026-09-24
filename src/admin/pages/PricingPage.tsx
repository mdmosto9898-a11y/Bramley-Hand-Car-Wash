import React, { useState } from 'react';
import { Coins, Plus, Edit2, Trash2, Power, Star, Image as ImageIcon } from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { AdminPricingPackage } from '../types/admin';
import { adminStore, calculateDiscountPercent } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface PricingPageProps {
  pricingPackages: AdminPricingPackage[];
  onRefresh: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ pricingPackages, onRefresh }) => {
  const { showToast } = useToast();

  const [editingPackage, setEditingPackage] = useState<AdminPricingPackage | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminPricingPackage>>({
    name: '',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 35,
    discountedPrice: 29,
    startingPrice: 29,
    priceDisplay: 'From $29',
    discountPercent: 17,
    description: '',
    image: '',
    isPopular: false,
    featured: false,
    includedServices: [],
    status: 'active'
  });

  const [servicesText, setServicesText] = useState('');

  // Handle price changes and auto-calculate discount
  const handlePriceChange = (field: 'originalPrice' | 'discountedPrice', val: number) => {
    const orig = field === 'originalPrice' ? val : (formData.originalPrice || 0);
    const disc = field === 'discountedPrice' ? val : (formData.discountedPrice || 0);
    const pct = calculateDiscountPercent(orig, disc);

    setFormData((prev) => ({
      ...prev,
      [field]: val,
      discountPercent: pct,
      startingPrice: disc || orig,
      priceDisplay: disc ? `From $${disc}` : (prev.priceDisplay || '')
    }));
  };

  const handleOpenEdit = (pkg: AdminPricingPackage) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setServicesText(pkg.includedServices ? pkg.includedServices.join('\n') : '');
  };

  const handleOpenNew = () => {
    setFormData({
      name: 'Custom Valeting Package',
      vehicleType: 'All Vehicle Sizes',
      originalPrice: 50,
      discountedPrice: 42,
      startingPrice: 42,
      priceDisplay: 'From $42',
      discountPercent: 16,
      description: 'Meticulous hand car wash and detailing procedure.',
      image: '',
      isPopular: false,
      featured: false,
      includedServices: [],
      status: 'active'
    });
    setServicesText('Exterior active snow foam wash\nPlush microfibre hand dry\nCabin deep vacuuming\nTyre dressing application');
    setIsNewModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    adminStore.togglePricingStatus(id);
    const updated = adminStore.getPricingPackages().find((p) => p.id === id);
    showToast(`Package status updated to ${updated?.status}`, 'info');
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    const includedServices = servicesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const orig = Number(formData.originalPrice) || 0;
    const disc = Number(formData.discountedPrice) || Number(formData.startingPrice) || 0;
    const pct = calculateDiscountPercent(orig, disc);

    adminStore.updatePricingPackage(editingPackage.id, {
      ...formData,
      originalPrice: orig,
      discountedPrice: disc,
      startingPrice: disc,
      discountPercent: pct,
      priceDisplay: formData.priceDisplay || `From $${disc}`,
      includedServices
    });

    showToast(`Pricing tier updated successfully`, 'success');
    setEditingPackage(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Please enter package name', 'error');
      return;
    }
    const includedServices = servicesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const orig = Number(formData.originalPrice) || 0;
    const disc = Number(formData.discountedPrice) || Number(formData.startingPrice) || 0;
    const pct = calculateDiscountPercent(orig, disc);

    adminStore.addPricingPackage({
      name: formData.name,
      vehicleType: formData.vehicleType || 'All Vehicle Sizes',
      originalPrice: orig,
      discountedPrice: disc,
      startingPrice: disc,
      discountPercent: pct,
      priceDisplay: formData.priceDisplay || `From $${disc}`,
      description: formData.description || '',
      image: formData.image || '',
      isPopular: !!formData.isPopular,
      featured: !!formData.featured,
      includedServices,
      status: formData.status || 'active'
    });

    showToast('New pricing package created', 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deletePricingPackage(deletingId);
    showToast('Pricing package removed', 'info');
    setDeletingId(null);
    onRefresh();
  };

  const columns: Column<AdminPricingPackage>[] = [
    {
      header: 'Service / Package',
      render: (p) => (
        <div className="flex items-center gap-3">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="w-12 h-10 object-cover rounded-md border border-neutral-800 shrink-0"
            />
          ) : (
            <div className="w-12 h-10 bg-neutral-900 rounded-md border border-neutral-800 flex items-center justify-center text-neutral-600 shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white block text-xs">{p.name}</span>
              {(p.isPopular || p.featured) && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  Popular
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-400 line-clamp-1">{p.description}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Pricing & Discount',
      render: (p) => {
        const orig = p.originalPrice;
        const disc = p.discountedPrice || p.startingPrice;
        const pct = p.discountPercent || calculateDiscountPercent(orig, disc);

        return (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-white text-xs">${disc}</span>
              {orig && orig > disc && (
                <span className="font-mono text-[11px] text-neutral-500 line-through">
                  ${orig}
                </span>
              )}
            </div>
            {pct > 0 && (
              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                SAVE {pct}%
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Included In Scope',
      render: (p) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {p.includedServices && p.includedServices.slice(0, 2).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded truncate max-w-[130px]"
            >
              {item}
            </span>
          ))}
          {p.includedServices && p.includedServices.length > 2 && (
            <span className="text-[10px] text-neutral-500 self-center">
              +{p.includedServices.length - 2} more
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      render: (p) => <StatusBadge status={p.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (p) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleStatus(p.id)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              p.status === 'active'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-emerald-400'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-500'
            }`}
            title={p.status === 'active' ? 'Disable tier' : 'Enable tier'}
          >
            <Power className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(p)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Package"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingId(p.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Package"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display">
            Pricing & Valeting Packages
          </h2>
          <p className="text-xs text-neutral-400">
            Manage promotional discounts, original rates, automatic SAVE % badges, and images in USD ($)
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Pricing Tier</span>
        </button>
      </div>

      {/* Pricing Table */}
      <DataTable
        data={pricingPackages}
        columns={columns}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Search packages or services..."
        searchFilter={(p, q) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
        }
        emptyTitle="No pricing packages defined"
        emptyDescription="Add a pricing package to display pricing structures on the website."
      />

      {/* MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingPackage}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingPackage(null);
        }}
        title={editingPackage ? `Edit Tier: ${editingPackage.name}` : 'New Pricing Package'}
        subtitle="Configure service rates, promotional discounts, and procedure list"
        maxWidth="lg"
      >
        <form onSubmit={editingPackage ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <FormField label="Package Title" required>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Full Valet"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <FormField label="Original Rate ($)" helperText="Standard list price">
              <input
                type="number"
                min={0}
                value={formData.originalPrice || ''}
                onChange={(e) => handlePriceChange('originalPrice', Number(e.target.value))}
                placeholder="35"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Discounted Rate ($)" required helperText="Promotional price">
              <input
                type="number"
                required
                min={0}
                value={formData.discountedPrice || formData.startingPrice || ''}
                onChange={(e) => handlePriceChange('discountedPrice', Number(e.target.value))}
                placeholder="29"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Discount % (Auto)" helperText="Calculated automatically">
              <input
                type="text"
                readOnly
                value={formData.discountPercent ? `SAVE ${formData.discountPercent}%` : 'No Discount'}
                className="w-full bg-neutral-900/60 border border-neutral-800 text-emerald-400 font-bold px-3 py-2 rounded-lg text-xs font-mono cursor-not-allowed"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Display Price Text" helperText="e.g. 'From $29' or '$79'">
              <input
                type="text"
                value={formData.priceDisplay || ''}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                placeholder="From $29"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Service Image URL" helperText="Relative path or full image URL">
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/src/assets/images/..."
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono text-[11px]"
              />
            </FormField>
          </div>

          {/* Featured / Most popular flag */}
          <div className="flex items-center gap-3 p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!formData.isPopular || !!formData.featured}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked, featured: e.target.checked })}
                className="rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0"
              />
              <span className="text-xs text-white font-semibold">Mark as &quot;Most Popular&quot; / Featured Package</span>
            </label>
          </div>

          <FormField label="Tier Description">
            <input
              type="text"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Active snow foam pre-soak, gentle two-bucket microfibre hand contact wash..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Included Procedures (One per line)">
            <textarea
              rows={4}
              value={servicesText}
              onChange={(e) => setServicesText(e.target.value)}
              placeholder="Snow foam wash&#10;Hand dry with plush microfibres&#10;Alloy wheels cleaned&#10;Tyre dressing application"
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white font-mono resize-none leading-relaxed"
            />
          </FormField>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingPackage(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Save Package
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Pricing Tier"
        message="Are you sure you want to delete this pricing package?"
        confirmLabel="Delete Package"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
