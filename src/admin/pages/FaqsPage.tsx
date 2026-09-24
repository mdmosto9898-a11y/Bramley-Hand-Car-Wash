import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Tag
} from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';
import { AdminFAQ, FAQCategory } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface FaqsPageProps {
  faqs: AdminFAQ[];
  onRefresh: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ faqs, onRefresh }) => {
  const { showToast } = useToast();

  const [categoryFilter, setCategoryFilter] = useState<'all' | FAQCategory>('all');
  const [editingFaq, setEditingFaq] = useState<AdminFAQ | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminFAQ>>({
    question: '',
    answer: '',
    category: 'service',
    published: true
  });

  const categories: { id: FAQCategory; label: string }[] = [
    { id: 'service', label: 'Service & Procedures' },
    { id: 'pricing', label: 'Pricing & Packages' },
    { id: 'booking', label: 'Booking & Appointments' },
    { id: 'location', label: 'Location & Mobile Area' }
  ];

  const displayedFaqs = categoryFilter === 'all'
    ? faqs
    : faqs.filter((f) => f.category === categoryFilter);

  const handleOpenEdit = (faq: AdminFAQ) => {
    setEditingFaq(faq);
    setFormData(faq);
  };

  const handleOpenNew = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'service',
      published: true
    });
    setIsNewModalOpen(true);
  };

  const handleTogglePublished = (id: string) => {
    adminStore.toggleFAQPublished(id);
    const updated = adminStore.getFAQs().find((f) => f.id === id);
    showToast(
      updated?.published ? 'FAQ published to live site' : 'FAQ hidden from public',
      'info'
    );
    onRefresh();
  };

  const handleReorder = (id: string, dir: 'up' | 'down') => {
    adminStore.reorderFAQ(id, dir);
    onRefresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    adminStore.updateFAQ(editingFaq.id, formData);
    showToast('FAQ updated successfully', 'success');
    setEditingFaq(null);
    onRefresh();
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      showToast('Please enter both question and answer', 'error');
      return;
    }
    adminStore.addFAQ({
      question: formData.question,
      answer: formData.answer,
      category: formData.category || 'service',
      published: formData.published ?? true
    });
    showToast('FAQ added to knowledge base', 'success');
    setIsNewModalOpen(false);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deleteFAQ(deletingId);
    showToast('FAQ entry removed', 'info');
    setDeletingId(null);
    onRefresh();
  };

  const columns: Column<AdminFAQ>[] = [
    {
      header: 'Order',
      className: 'w-16 text-center',
      render: (f) => (
        <div className="flex items-center gap-1 justify-center">
          <button
            type="button"
            onClick={() => handleReorder(f.id, 'up')}
            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            title="Move Up"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <span className="font-mono text-xs font-semibold text-neutral-300 w-4 text-center">
            {f.order}
          </span>
          <button
            type="button"
            onClick={() => handleReorder(f.id, 'down')}
            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            title="Move Down"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      header: 'Question',
      render: (f) => (
        <div>
          <span className="font-bold text-white block text-xs">{f.question}</span>
          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{f.answer}</p>
        </div>
      )
    },
    {
      header: 'Category',
      render: (f) => (
        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] uppercase font-mono text-neutral-300">
          {f.category}
        </span>
      )
    },
    {
      header: 'Status',
      render: (f) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            f.published
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
              : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
          }`}
        >
          {f.published ? 'Published' : 'Draft'}
        </span>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (f) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleTogglePublished(f.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={f.published ? 'Unpublish FAQ' : 'Publish FAQ'}
          >
            {f.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => handleOpenEdit(f)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Edit FAQ"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setDeletingId(f.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete FAQ"
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
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-neutral-400">
            Manage customer guidance on hand car wash, valeting services, and visit information
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* Category filter tabs */}
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
          All ({faqs.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategoryFilter(c.id)}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              categoryFilter === c.id
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {c.label} ({faqs.filter((f) => f.category === c.id).length})
          </button>
        ))}
      </div>

      {/* FAQs Table */}
      <DataTable
        data={displayedFaqs}
        columns={columns}
        keyExtractor={(f) => f.id}
        searchPlaceholder="Search questions and answers..."
        searchFilter={(f, q) =>
          f.question.toLowerCase().includes(q.toLowerCase()) ||
          f.answer.toLowerCase().includes(q.toLowerCase())
        }
        emptyTitle="No FAQs found"
        emptyDescription="Add questions to clarify mobile car detailing procedures for website visitors."
      />

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isNewModalOpen || !!editingFaq}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingFaq(null);
        }}
        title={editingFaq ? 'Edit FAQ Entry' : 'Create New FAQ'}
        subtitle="Manage customer questions regarding mobile detailing service"
        maxWidth="lg"
      >
        <form onSubmit={editingFaq ? handleSaveEdit : handleSaveNew} className="space-y-4">
          <FormField label="Category Classification" required>
            <select
              value={formData.category || 'service'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as FAQCategory })}
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Customer Question" required>
            <input
              type="text"
              required
              value={formData.question || ''}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. Do I need to supply water or electricity?"
              className="w-full bg-neutral-900 border border-neutral-750 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white"
            />
          </FormField>

          <FormField label="Clear, Helpful Answer" required>
            <textarea
              rows={4}
              required
              value={formData.answer || ''}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Our mobile unit carries its own pure water supply..."
              className="w-full bg-neutral-900 border border-neutral-750 text-white p-2.5 rounded-lg text-xs focus:outline-none focus:border-white resize-none leading-relaxed"
            />
          </FormField>

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published ?? true}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded bg-neutral-850 border-neutral-700 text-white focus:ring-0"
              />
              <span>Publish this question immediately to website FAQ accordion</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-850 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingFaq(null);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
            >
              Save FAQ
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete FAQ"
        message="Are you sure you want to permanently remove this question from your knowledge base?"
        confirmLabel="Delete FAQ"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
