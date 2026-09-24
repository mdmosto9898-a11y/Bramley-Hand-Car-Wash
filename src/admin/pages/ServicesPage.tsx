import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Coins,
  Tag,
  Eye,
  Power
} from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';
import { AdminService, ServiceCategory, ServiceStatus } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface ServicesPageProps {
  services: AdminService[];
  onRefresh: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ services, onRefresh }) => {
  const { showToast } = useToast();

  const [categoryFilter, setCategoryFilter] = useState<'all' | ServiceCategory>('all');
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminService>>({
    name: '',
    category: 'interior',
    shortDesc: '',
    fullDesc: '',
    startingPrice: 50,
    priceDisplay: 'From $50',
    duration: '1 - 2 Hours',
    image: '',
    status: 'active',
    features: ['Safe hand wash', 'Professional inspection']
  });

  const [featuresText, setFeaturesText] = useState('');

  const displayedServices = categoryFilter === 'all'
    ? services
    : services.filter((s) => s.category === categoryFilter);

  const handleOpenEdit = (srv: AdminService) => {
    setEditingService(srv);
    setFormData(srv);
    setFeaturesText(srv.features.join('\n'));
  };

  const handleOpenNew = () => {
    const blank: Partial<AdminService> = {
      name: '',
      category: 'interior',
      shortDesc: '',
      fullDesc: '',
      startingPrice: 50,
      priceDisplay: 'From $50',
      duration: '1 - 2 Hours',
      image: '',
      status: 'active',
      features: []
    };
    setFormData(blank);
    setFeaturesText('Deep vacuuming\nShampoo extraction\nStreak-free glass');
    setIsNewModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    adminStore.toggleServiceStatus(id);
    const updated = adminStore.getServices().find((s) => s.id === id);
    showToast(`Service status updated to ${updated?.status}`, 'info');
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const features = featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    adminStore.updateService(editingService.id, {
      ...formData,
      features
    });

    showToast(`Service "${formData.name}" updated successfully`, 'success');
    setEditingService(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.shortDesc) {
      showToast('Please provide service title and short description', 'error');
      return;
    }
    const features = featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    adminStore.addService({
      name: formData.name,
      category: formData.category || 'interior',
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc || formData.shortDesc,
      startingPrice: Number(formData.startingPrice) || 50,
      priceDisplay: formData.priceDisplay || `From $${formData.startingPrice || 50}`,
      duration: formData.duration || '1 - 2 Hours',
      image: formData.image || '',
      status: formData.status || 'active',
      features
    });

    showToast(`New service "${formData.name}" created`, 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingServiceId) return;
    adminStore.deleteService(deletingServiceId);
    showToast('Service deleted from catalogue', 'info');
    setDeletingServiceId(null);
    onRefresh();
  };

  const columns: Column<AdminService>[] = [
    {
      header: 'Service',
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-10 rounded bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0">
            {s.image ? (
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600">
                <Wrench className="w-4 h-4" />
              </div>
            )}
          </div>
          <div>
            <span className="font-bold text-white block text-xs">{s.name}</span>
            <span className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">
              {s.shortDesc}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      render: (s) => (
        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-mono font-semibold text-neutral-300">
          {s.category}
        </span>
      )
    },
    {
      header: 'Starting Rate',
      render: (s) => (
        <div>
          <span className="font-mono font-bold text-white block">{s.priceDisplay}</span>
          <span className="text-[10px] text-neutral-500">Base: ${s.startingPrice}</span>
        </div>
      )
    },
    {
      header: 'Est. Duration',
      render: (s) => (
        <span className="text-neutral-300 text-xs flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3 text-neutral-500" />
          <span>{s.duration}</span>
        </span>
      )
    },
    {
      header: 'Status',
      render: (s) => <StatusBadge status={s.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (s) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleStatus(s.id)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              s.status === 'active'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-emerald-400'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-500'
            }`}
            title={s.status === 'active' ? 'Disable service' : 'Enable service'}
          >
            <Power className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(s)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Service"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingServiceId(s.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Service"
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
            Services & Valeting Catalogue
          </h2>
          <p className="text-xs text-neutral-400">
            Define hand car wash and valeting services, descriptions, duration and pricing tiers
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit text-xs">
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            categoryFilter === 'all'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          All ({services.length})
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('interior')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            categoryFilter === 'interior'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Interior ({services.filter((s) => s.category === 'interior').length})
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('exterior')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            categoryFilter === 'exterior'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Exterior ({services.filter((s) => s.category === 'exterior').length})
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('paint')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            categoryFilter === 'paint'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Paint & Ceramic ({services.filter((s) => s.category === 'paint').length})
        </button>
        <button
          type="button"
          onClick={() => setCategoryFilter('specialist')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            categoryFilter === 'specialist'
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Specialist ({services.filter((s) => s.category === 'specialist').length})
        </button>
      </div>

      {/* Services Table */}
      <DataTable
        data={displayedServices}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Search service by name or description..."
        searchFilter={(s, query) => {
          const q = query.toLowerCase();
          return (
            s.name.toLowerCase().includes(q) ||
            s.shortDesc.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q)
          );
        }}
        emptyTitle="No services found"
        emptyDescription="There are no services matching this category or search filter."
      />

      {/* CREATE / EDIT SERVICE MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingService}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingService(null);
        }}
        title={editingService ? `Edit Service: ${editingService.name}` : 'Add New Detailing Service'}
        subtitle="Configure service specification, pricing label, and included procedures"
        maxWidth="2xl"
      >
        <form onSubmit={editingService ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <FormField label="Service Name" required>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Leather Deep Nourishment"
                  className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
                />
              </FormField>
            </div>

            <FormField label="Category" required>
              <select
                value={formData.category || 'interior'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="paint">Paint Correction</option>
                <option value="specialist">Specialist Treatment</option>
              </select>
            </FormField>
          </div>

          <FormField label="Short Summary" required helperText="Displayed in grids & summaries">
            <input
              type="text"
              required
              value={formData.shortDesc || ''}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              placeholder="e.g. Intensive hot water extraction removing stubborn ground-in stains."
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Full Description">
            <textarea
              rows={3}
              value={formData.fullDesc || ''}
              onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
              placeholder="Detailed treatment description explaining steps, tools, and results..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Base Price ($)" required>
              <input
                type="number"
                required
                min={0}
                value={formData.startingPrice || 50}
                onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Pricing Label" required>
              <input
                type="text"
                required
                value={formData.priceDisplay || ''}
                onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                placeholder="From $50 or Contact Bramley Hand Car Wash"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Expected Duration" required>
              <input
                type="text"
                required
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 3.5 - 5 Hours"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>
          </div>

          <FormField label="Included Procedures & Features (One per line)">
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Rubbish removal&#10;Deep mechanical vacuuming&#10;Seats hot shampooing&#10;Odour neutralisation"
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white font-mono resize-none leading-relaxed"
            />
          </FormField>

          {/* Image Uploader */}
          <ImageUploader
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Service Demonstration Photography"
            helper="Upload photo showcasing the treatment result. Local data preview saved."
          />

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'active'}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked ? 'active' : 'disabled' })
                }
                className="rounded bg-neutral-850 border-neutral-700 text-white focus:ring-0"
              />
              <span>Enable this service immediately on the website</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingService(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              {editingService ? 'Save Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={!!deletingServiceId}
        title="Remove Detailing Service"
        message="Are you sure you want to remove this service from your administrative catalogue?"
        confirmLabel="Delete Service"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingServiceId(null)}
      />
    </div>
  );
};
