import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Star,
  Trash2,
  Edit2,
  RefreshCw,
  Tag,
  ExternalLink,
  Sparkles,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';
import { EmptyState } from '../components/EmptyState';
import { AdminGalleryItem, GalleryCategory } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface GalleryPageProps {
  galleryItems: AdminGalleryItem[];
  onRefresh: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems, onRefresh }) => {
  const { showToast } = useToast();

  const [categoryFilter, setCategoryFilter] = useState<'all' | GalleryCategory>('all');
  const [editingItem, setEditingItem] = useState<AdminGalleryItem | null>(null);
  const [replacingItem, setReplacingItem] = useState<AdminGalleryItem | null>(null);
  const [replacementImageUrl, setReplacementImageUrl] = useState<string>('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminGalleryItem>>({
    title: '',
    category: 'interior',
    description: '',
    afterImage: '',
    beforeImage: '',
    featured: false,
    isDemoPlaceholder: true
  });

  // All 11 categories as explicitly specified
  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'interior', label: 'Interior' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'full_detail', label: 'Full Detail' },
    { id: 'paint_correction', label: 'Paint Correction' },
    { id: 'ceramic_coating', label: 'Ceramic Coating' },
    { id: 'wheels', label: 'Wheels' },
    { id: 'headlights', label: 'Headlights' },
    { id: 'engine_bay', label: 'Engine Bay' },
    { id: 'glass', label: 'Glass' },
    { id: 'mobile_detailing', label: 'Mobile Detailing' },
    { id: 'before_after', label: 'Before & After' }
  ];

  const displayedItems = categoryFilter === 'all'
    ? galleryItems
    : galleryItems.filter((g) => g.category === categoryFilter);

  const handleOpenEdit = (item: AdminGalleryItem) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleOpenReplace = (item: AdminGalleryItem) => {
    setReplacingItem(item);
    setReplacementImageUrl(item.afterImage);
  };

  const handleSaveReplacement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacingItem) return;
    if (!replacementImageUrl) {
      showToast('Please upload an image or provide an image URL', 'error');
      return;
    }
    adminStore.updateGalleryItem(replacingItem.id, {
      afterImage: replacementImageUrl,
      isDemoPlaceholder: false
    });
    showToast(`Replaced image for "${replacingItem.title}"`, 'success');
    setReplacingItem(null);
    setReplacementImageUrl('');
    onRefresh();
  };

  const handleOpenNew = () => {
    setFormData({
      title: '',
      category: 'interior',
      description: '',
      afterImage: '',
      beforeImage: '',
      featured: false,
      isDemoPlaceholder: true
    });
    setIsNewModalOpen(true);
  };

  const handleToggleFeatured = (id: string) => {
    adminStore.toggleGalleryFeatured(id);
    const updated = adminStore.getGalleryItems().find((g) => g.id === id);
    showToast(
      updated?.featured ? 'Item marked as Featured' : 'Item removed from Featured',
      'info'
    );
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    adminStore.updateGalleryItem(editingItem.id, formData);
    showToast('Gallery item updated', 'success');
    setEditingItem(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.afterImage) {
      showToast('Please provide a title and at least one image', 'error');
      return;
    }
    adminStore.addGalleryItem({
      title: formData.title,
      category: formData.category || 'interior',
      description: formData.description || '',
      afterImage: formData.afterImage,
      beforeImage: formData.beforeImage,
      featured: !!formData.featured,
      isDemoPlaceholder: true
    });
    showToast('Gallery photo added successfully', 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deleteGalleryItem(deletingId);
    showToast('Photo removed from gallery', 'info');
    setDeletingId(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display">
            Portfolio & Transformation Gallery
          </h2>
          <p className="text-xs text-neutral-400">
            Manage public gallery images, replace photography without deletion, and toggle featured work.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Image</span>
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
            categoryFilter === 'all'
              ? 'bg-white text-neutral-950 shadow-sm'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          All ({galleryItems.length})
        </button>
        {categories.map((c) => {
          const count = galleryItems.filter((g) => g.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                categoryFilter === c.id
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Gallery Cards */}
      {displayedItems.length === 0 ? (
        <EmptyState
          title="No images in this category"
          description="Upload vehicle transformation photography to populate this gallery category."
          actionLabel="Add Photo"
          onAction={handleOpenNew}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden flex flex-col group transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-neutral-700">
                    {categories.find((c) => c.id === item.category)?.label || item.category.replace('_', ' ')}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Featured star toggle */}
                <div className="absolute top-2.5 right-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(item.id)}
                    className={`p-1.5 rounded-md backdrop-blur-md border transition-colors cursor-pointer ${
                      item.featured
                        ? 'bg-amber-500 text-neutral-950 border-amber-400'
                        : 'bg-black/70 text-neutral-300 hover:text-white border-neutral-700 hover:bg-black'
                    }`}
                    title={item.featured ? 'Unmark featured' : 'Mark as featured'}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* 3 Explicit Action Controls: Replace, Edit, Delete */}
                <div className="pt-3 border-t border-neutral-850 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenReplace(item)}
                    className="flex-1 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Replace this image without deleting"
                  >
                    <RefreshCw className="w-3 h-3 text-cyan-400" />
                    <span>Replace</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="flex-1 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Edit title, category, description, featured status"
                  >
                    <Edit2 className="w-3 h-3 text-neutral-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingId(item.id)}
                    className="py-1.5 px-2.5 bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 rounded-lg border border-neutral-800 hover:border-red-800/60 text-xs transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QUICK REPLACE IMAGE MODAL */}
      <Modal
        isOpen={!!replacingItem}
        onClose={() => {
          setReplacingItem(null);
          setReplacementImageUrl('');
        }}
        title={`Replace Image: ${replacingItem?.title}`}
        subtitle="Upload a replacement image from your device or use an image URL. Existing details are preserved."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveReplacement} className="space-y-4">
          <ImageUploader
            value={replacementImageUrl}
            onChange={(url) => setReplacementImageUrl(url)}
            label="Select Replacement Image"
            helper="Upload an image from your device, or paste a publicly accessible image URL."
          />

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setReplacingItem(null);
                setReplacementImageUrl('');
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-950" />
              <span>Save Replacement</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingItem}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? `Edit Photo: ${editingItem.title}` : 'Upload Portfolio Photo'}
        subtitle="Firebase Storage ready: Upload files or enter direct image URL"
        maxWidth="xl"
      >
        <form onSubmit={editingItem ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <FormField label="Image Title" required>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Porsche 911 GT3 Paint Swirl Correction"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Image Category" required>
            <select
              value={formData.category || 'interior'}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as GalleryCategory })
              }
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Description">
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailing procedure, ceramic coating coat count, or interior extraction results..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none"
            />
          </FormField>

          {/* Primary Result Image */}
          <ImageUploader
            value={formData.afterImage || ''}
            onChange={(url) => setFormData({ ...formData, afterImage: url })}
            label="Finished Result / Main Detail Photo"
            helper="Upload an image from your device, or paste a publicly accessible image URL."
          />

          {/* Optional Before Image */}
          <ImageUploader
            value={formData.beforeImage || ''}
            onChange={(url) => setFormData({ ...formData, beforeImage: url })}
            label="Optional Before Image (For Comparison Sliders)"
            helper="Optional starting state photograph before valeting."
          />

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded bg-neutral-850 border-neutral-700 text-white focus:ring-0"
              />
              <span>Featured Image toggle (feature this transformation prominently)</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingItem(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Save Photo
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Portfolio Photo"
        message="Are you sure you want to remove this photo from the gallery?"
        confirmLabel="Delete Photo"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
