import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Archive,
  Trash2,
  Eye,
  CornerUpLeft,
  ExternalLink
} from 'lucide-react';
import { DataTable, Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { AdminMessage, MessageStatus } from '../types/admin';
import { adminStore } from '../data/adminStore';
import { useToast } from '../context/ToastContext';

interface MessagesPageProps {
  messages: AdminMessage[];
  onRefresh: () => void;
  selectedMessageId?: string;
  onClearSelectedMessageId?: () => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({
  messages,
  onRefresh,
  selectedMessageId,
  onClearSelectedMessageId
}) => {
  const { showToast } = useToast();

  const [statusFilter, setStatusFilter] = useState<'all' | MessageStatus>('all');
  const [viewingMessage, setViewingMessage] = useState<AdminMessage | null>(() => {
    if (selectedMessageId) {
      return messages.find((m) => m.id === selectedMessageId) || null;
    }
    return null;
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const displayedMessages = statusFilter === 'all'
    ? messages
    : messages.filter((m) => m.status === statusFilter);

  const handleOpenMessage = (msg: AdminMessage) => {
    setViewingMessage(msg);
    if (msg.status === 'new') {
      adminStore.updateMessageStatus(msg.id, 'read');
      onRefresh();
    }
  };

  const handleStatusChange = (id: string, newStatus: MessageStatus) => {
    adminStore.updateMessageStatus(id, newStatus);
    showToast(`Message marked as ${newStatus}`, 'info');
    onRefresh();
    if (viewingMessage && viewingMessage.id === id) {
      setViewingMessage({ ...viewingMessage, status: newStatus });
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    adminStore.deleteMessage(deletingId);
    showToast('Enquiry deleted from inbox', 'info');
    setDeletingId(null);
    if (viewingMessage && viewingMessage.id === deletingId) {
      setViewingMessage(null);
    }
    onRefresh();
  };

  const columns: Column<AdminMessage>[] = [
    {
      header: 'Sender',
      render: (m) => (
        <div>
          <span className="font-bold text-white block text-xs">{m.name}</span>
          <span className="text-[11px] text-neutral-400 font-mono">{m.phone}</span>
        </div>
      )
    },
    {
      header: 'Enquiry Message',
      render: (m) => (
        <div>
          <p className="text-neutral-300 text-xs line-clamp-1 max-w-md font-medium">
            {m.message}
          </p>
          <span className="text-[10px] text-neutral-500">{m.email}</span>
        </div>
      )
    },
    {
      header: 'Received Date',
      render: (m) => (
        <span className="font-mono text-neutral-400 text-xs">
          {new Date(m.date).toLocaleDateString()} {new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )
    },
    {
      header: 'Status',
      render: (m) => <StatusBadge status={m.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (m) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => handleOpenMessage(m)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Read Message"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {m.status !== 'archived' ? (
            <button
              type="button"
              onClick={() => handleStatusChange(m.id, 'archived')}
              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Archive Message"
            >
              <Archive className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleStatusChange(m.id, 'read')}
              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Unarchive"
            >
              <CornerUpLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setDeletingId(m.id)}
            className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Delete Message"
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
            Contact Enquiries & Customer Messages
          </h2>
          <p className="text-xs text-neutral-400">
            Messages submitted through the public website contact form
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit text-xs">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
          }`}
        >
          All ({messages.length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('new')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'new' ? 'bg-neutral-800 text-red-300' : 'text-neutral-400 hover:text-white'
          }`}
        >
          New ({messages.filter((m) => m.status === 'new').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('read')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'read' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Read ({messages.filter((m) => m.status === 'read').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('replied')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'replied' ? 'bg-neutral-800 text-teal-300' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Replied ({messages.filter((m) => m.status === 'replied').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('archived')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
            statusFilter === 'archived' ? 'bg-neutral-800 text-neutral-400' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Archived ({messages.filter((m) => m.status === 'archived').length})
        </button>
      </div>

      {/* Messages Table */}
      <DataTable
        data={displayedMessages}
        columns={columns}
        keyExtractor={(m) => m.id}
        searchPlaceholder="Search messages by name, email, or content..."
        searchFilter={(m, q) =>
          m.name.toLowerCase().includes(q.toLowerCase()) ||
          m.email.toLowerCase().includes(q.toLowerCase()) ||
          m.phone.toLowerCase().includes(q.toLowerCase()) ||
          m.message.toLowerCase().includes(q.toLowerCase())
        }
        emptyTitle="No messages found"
        emptyDescription="There are no contact enquiries matching this filter."
      />

      {/* VIEW MESSAGE MODAL */}
      <Modal
        isOpen={!!viewingMessage}
        onClose={() => {
          setViewingMessage(null);
          if (onClearSelectedMessageId) onClearSelectedMessageId();
        }}
        title={`Message from ${viewingMessage?.name || 'Customer'}`}
        subtitle={`Received on ${viewingMessage ? new Date(viewingMessage.date).toLocaleString() : ''}`}
        maxWidth="lg"
        footer={
          viewingMessage && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Mark Status:</span>
                <select
                  value={viewingMessage.status}
                  onChange={(e) => handleStatusChange(viewingMessage.id, e.target.value as MessageStatus)}
                  className="bg-neutral-900 border border-neutral-700 text-white rounded px-2.5 py-1 text-xs focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewingMessage(null);
                    if (onClearSelectedMessageId) onClearSelectedMessageId();
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
        {viewingMessage && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{viewingMessage.name}</span>
                <StatusBadge status={viewingMessage.status} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
                <a
                  href={`tel:${viewingMessage.phone}`}
                  className="flex items-center gap-1.5 text-emerald-400 font-mono hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{viewingMessage.phone}</span>
                </a>

                <a
                  href={`mailto:${viewingMessage.email}`}
                  className="flex items-center gap-1.5 text-neutral-300 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{viewingMessage.email}</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-2">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Enquiry Description
              </h4>
              <p className="text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed">
                {viewingMessage.message}
              </p>
            </div>

            {/* Quick Response Shortcuts */}
            <div className="p-3 rounded-lg bg-neutral-900/30 border border-neutral-850 flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-medium">Quick Communication:</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/44${viewingMessage.phone.replace(/^0/, '').replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleStatusChange(viewingMessage.id, 'replied')}
                  className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 transition-colors text-[11px] font-semibold flex items-center gap-1"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`mailto:${viewingMessage.email}?subject=Pro%20Detailing%20Enquiry`}
                  onClick={() => handleStatusChange(viewingMessage.id, 'replied')}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-750 transition-colors text-[11px] font-semibold flex items-center gap-1"
                >
                  <span>Email Reply</span>
                  <CornerUpLeft className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Customer Message"
        message="Are you sure you want to remove this message from your inbox?"
        confirmLabel="Delete Message"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
