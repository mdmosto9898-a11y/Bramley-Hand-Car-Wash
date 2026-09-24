import React, { useState } from 'react';
import { Star, Plus, Edit2, Trash2, ShieldCheck, CheckCircle2, EyeOff, Eye } from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { AdminReview, ReviewStatus } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface ReviewsPageProps {
  reviews: AdminReview[];
  onRefresh: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ reviews, onRefresh }) => {
  const { showToast } = useToast();

  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminReview>>({
    customerName: '',
    rating: 5,
    reviewText: '',
    date: new Date().toISOString().split('T')[0],
    featured: true,
    status: 'published',
    isDemo: true
  });

  const handleOpenEdit = (r: AdminReview) => {
    setEditingReview(r);
    setFormData(r);
  };

  const handleOpenNew = () => {
    setFormData({
      customerName: '',
      rating: 5,
      reviewText: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      status: 'published',
      isDemo: true
    });
    setIsNewModalOpen(true);
  };

  const handleToggleFeatured = (id: string) => {
    adminStore.toggleReviewFeatured(id);
    const updated = adminStore.getReviews().find((r) => r.id === id);
    showToast(
      updated?.featured ? 'Review pinned as featured' : 'Review unpinned',
      'info'
    );
    onRefresh();
  };

  const handleToggleStatus = (id: string) => {
    const rev = reviews.find((r) => r.id === id);
    if (!rev) return;
    const newStatus: ReviewStatus = rev.status === 'published' ? 'hidden' : 'published';
    adminStore.updateReview(id, { status: newStatus });
    showToast(`Review status set to ${newStatus}`, 'info');
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    adminStore.updateReview(editingReview.id, formData);
    showToast('Customer review updated', 'success');
    setEditingReview(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.reviewText) {
      showToast('Please provide customer name and review quote', 'error');
      return;
    }
    adminStore.addReview({
      customerName: formData.customerName,
      rating: Number(formData.rating) || 5,
      reviewText: formData.reviewText,
      date: formData.date || new Date().toISOString().split('T')[0],
      featured: !!formData.featured,
      status: formData.status || 'published',
      isDemo: true
    });
    showToast('New review added to administrative roster', 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deleteReview(deletingId);
    showToast('Review deleted', 'info');
    setDeletingId(null);
    onRefresh();
  };

  const columns: Column<AdminReview>[] = [
    {
      header: 'Customer',
      render: (r) => (
        <div>
          <span className="font-bold text-white block text-xs">{r.customerName}</span>
          <span className="text-[10px] text-neutral-500 font-mono">{r.date}</span>
        </div>
      )
    },
    {
      header: 'Rating',
      render: (r) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'
              }`}
            />
          ))}
          <span className="text-[11px] font-mono text-neutral-400 ml-1 font-bold">
            {r.rating}.0
          </span>
        </div>
      )
    },
    {
      header: 'Review Content',
      render: (r) => (
        <p className="text-neutral-300 text-xs line-clamp-2 max-w-md italic">
          &ldquo;{r.reviewText}&rdquo;
        </p>
      )
    },
    {
      header: 'Featured',
      render: (r) => (
        <button
          type="button"
          onClick={() => handleToggleFeatured(r.id)}
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors ${
            r.featured
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:text-neutral-300'
          }`}
        >
          <Star className={`w-3 h-3 ${r.featured ? 'fill-current' : ''}`} />
          <span>{r.featured ? 'Featured' : 'Standard'}</span>
        </button>
      )
    },
    {
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleToggleStatus(r.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={r.status === 'published' ? 'Hide review' : 'Publish review'}
          >
            {r.status === 'published' ? (
              <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(r)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Review"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingId(r.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Review"
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
            Customer Reviews & Public Testimonials
          </h2>
          <p className="text-xs text-neutral-400">
            Public rating context: 5.0★ Google Reviews for Bramley Hand Car Wash.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <span className="font-bold text-white block">
              Google Business Profile Rating: 5.0 ★
            </span>
            <span className="text-neutral-400">
              Verified customer feedback for Bramley Hand Car Wash.
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <DataTable
        data={reviews}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search reviews by customer name or text..."
        searchFilter={(r, q) =>
          r.customerName.toLowerCase().includes(q.toLowerCase()) ||
          r.reviewText.toLowerCase().includes(q.toLowerCase())
        }
        emptyTitle="No reviews found"
        emptyDescription="Add customer feedback to display social proof on the website."
      />

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingReview}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingReview(null);
        }}
        title={editingReview ? 'Edit Customer Review' : 'Add New Review'}
        subtitle="Manage customer feedback quote and star rating"
        maxWidth="lg"
      >
        <form onSubmit={editingReview ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Customer Name & Location" required>
              <input
                type="text"
                required
                value={formData.customerName || ''}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Thomas R. (Roundhay, Leeds)"
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              />
            </FormField>

            <FormField label="Star Rating (1 - 5)" required>
              <select
                value={formData.rating || 5}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
                <option value={2}>2 Stars ★★☆☆☆</option>
                <option value={1}>1 Star ★☆☆☆☆</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Review Date" required>
              <input
                type="date"
                required
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white font-mono"
              />
            </FormField>

            <FormField label="Publication Status" required>
              <select
                value={formData.status || 'published'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ReviewStatus })}
                className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
              >
                <option value="published">Published (Visible)</option>
                <option value="pending">Pending Moderation</option>
                <option value="hidden">Hidden</option>
              </select>
            </FormField>
          </div>

          <FormField label="Customer Feedback Quote" required>
            <textarea
              rows={4}
              required
              value={formData.reviewText || ''}
              onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
              placeholder="Outstanding service. Came out to our home in Roundhay. Car looked better than showroom..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none"
            />
          </FormField>

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded bg-neutral-850 border-neutral-700 text-white focus:ring-0"
              />
              <span>Display prominently in website testimonial carousels</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingReview(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Save Review
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Customer Review"
        message="Are you sure you want to remove this review entry?"
        confirmLabel="Delete Review"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
