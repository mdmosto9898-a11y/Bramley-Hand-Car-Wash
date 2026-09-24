import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Power, Check, AlertCircle } from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { AdminServiceArea, ServiceAreaStatus } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface ServiceAreasPageProps {
  areas: AdminServiceArea[];
  onRefresh: () => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ areas, onRefresh }) => {
  const { showToast } = useToast();

  const [editingArea, setEditingArea] = useState<AdminServiceArea | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminServiceArea>>({
    name: '',
    county: 'West Yorkshire',
    postcodes: [],
    isPrimary: false,
    status: 'active',
    travelNote: ''
  });

  const [postcodesText, setPostcodesText] = useState('');

  const handleOpenEdit = (area: AdminServiceArea) => {
    setEditingArea(area);
    setFormData(area);
    setPostcodesText(area.postcodes.join(', '));
  };

  const handleOpenNew = () => {
    setFormData({
      name: '',
      county: 'West Yorkshire',
      postcodes: [],
      isPrimary: false,
      status: 'active',
      travelNote: 'Bramley and surrounding Leeds / Pudsey corridor'
    });
    setPostcodesText('LS13, LS28, LS12');
    setIsNewModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    adminStore.toggleServiceAreaStatus(id);
    const updated = adminStore.getServiceAreas().find((a) => a.id === id);
    showToast(`Coverage status updated to ${updated?.status}`, 'info');
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea) return;
    const postcodes = postcodesText
      .split(/[, \n]+/)
      .map((p) => p.trim().toUpperCase())
      .filter(Boolean);

    adminStore.updateServiceArea(editingArea.id, {
      ...formData,
      postcodes
    });

    showToast(`Area "${formData.name}" updated`, 'success');
    setEditingArea(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Please provide area name', 'error');
      return;
    }
    const postcodes = postcodesText
      .split(/[, \n]+/)
      .map((p) => p.trim().toUpperCase())
      .filter(Boolean);

    adminStore.addServiceArea({
      name: formData.name,
      county: formData.county || 'West Yorkshire',
      postcodes,
      isPrimary: !!formData.isPrimary,
      status: formData.status || 'active',
      travelNote: formData.travelNote || 'Mobile valeting route'
    });

    showToast(`New area "${formData.name}" added to coverage`, 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deleteServiceArea(deletingId);
    showToast('Service area removed', 'info');
    setDeletingId(null);
    onRefresh();
  };

  const columns: Column<AdminServiceArea>[] = [
    {
      header: 'Location / Town',
      render: (a) => (
        <div>
          <span className="font-bold text-white block text-xs">{a.name}</span>
          <span className="text-[10px] text-neutral-400">{a.county}</span>
        </div>
      )
    },
    {
      header: 'Covered Postcodes',
      render: (a) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {a.postcodes.slice(0, 4).map((p, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-neutral-900 text-neutral-300 font-mono border border-neutral-800 px-1.5 py-0.5 rounded"
            >
              {p}
            </span>
          ))}
          {a.postcodes.length > 4 && (
            <span className="text-[10px] text-neutral-500 font-mono self-center">
              +{a.postcodes.length - 4} more
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Zone Type',
      render: (a) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            a.isPrimary
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
          }`}
        >
          {a.isPrimary ? 'Primary Zone' : 'Extended Zone'}
        </span>
      )
    },
    {
      header: 'Travel Notes',
      render: (a) => (
        <span className="text-neutral-400 text-xs line-clamp-1 max-w-[200px]">
          {a.travelNote || 'Standard coverage'}
        </span>
      )
    },
    {
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (a) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleStatus(a.id)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              a.status === 'active'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-emerald-400'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-500'
            }`}
            title={a.status === 'active' ? 'Disable area' : 'Enable area'}
          >
            <Power className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(a)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Area"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingId(a.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Area"
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
            Leeds & Surrounding Service Areas
          </h2>
          <p className="text-xs text-neutral-400">
            Define local areas, postcodes, and travel policies for Bramley, Pudsey, and wider Leeds
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Area</span>
        </button>
      </div>

      {/* Areas Table */}
      <DataTable
        data={areas}
        columns={columns}
        keyExtractor={(a) => a.id}
        searchPlaceholder="Search towns or postcodes..."
        searchFilter={(a, q) =>
          a.name.toLowerCase().includes(q.toLowerCase()) ||
          a.county.toLowerCase().includes(q.toLowerCase()) ||
          a.postcodes.some((p) => p.toLowerCase().includes(q.toLowerCase()))
        }
        emptyTitle="No service areas found"
        emptyDescription="Add towns and postcodes to configure mobile service coverage."
      />

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingArea}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingArea(null);
        }}
        title={editingArea ? `Edit Area: ${editingArea.name}` : 'Add Service Area'}
        subtitle="Manage dispatch postcodes and travel policies"
        maxWidth="lg"
      >
        <form onSubmit={editingArea ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Area / Town Name" required>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Harrogate"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="County" required>
              <select
                value={formData.county || 'West Yorkshire'}
                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="West Yorkshire">West Yorkshire</option>
                <option value="North Yorkshire">North Yorkshire</option>
                <option value="South Yorkshire">South Yorkshire</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="Covered Postcodes (Comma or space separated)"
            required
            helperText="e.g. LS1, LS2, LS8, LS17"
          >
            <input
              type="text"
              required
              value={postcodesText}
              onChange={(e) => setPostcodesText(e.target.value)}
              placeholder="LS1, LS2, LS8, LS17"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
            />
          </FormField>

          <FormField label="Travel & Dispatch Notes">
            <input
              type="text"
              value={formData.travelNote || ''}
              onChange={(e) => setFormData({ ...formData, travelNote: e.target.value })}
              placeholder="e.g. Daily mobile route · Home base dispatch zone"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="rounded bg-neutral-850 border-neutral-700 text-white focus:ring-0"
              />
              <span>Mark as Primary Zone (Free travel dispatch)</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingArea(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Save Area
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Remove Service Area"
        message="Are you sure you want to remove this coverage area?"
        confirmLabel="Delete Area"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
