/**
 * Contact Enquiries & Messages Service Layer
 * Target Firestore Collection: `messages`
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { AdminMessage, MessageStatus } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'messages';

export const messageService = {
  async getAll(): Promise<AdminMessage[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminMessage),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getMessages().find((m) => m.id === item.id);
          if (existing) {
            adminStore.updateMessage(item.id, item);
          } else {
            adminStore.addMessage(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore messages read notice, using cached store:', error);
    }
    return adminStore.getMessages();
  },

  async getUnreadCount(): Promise<number> {
    const all = await this.getAll();
    return all.filter((m) => m.status === 'new' || (m.status as string) === 'unread').length;
  },

  async create(data: Omit<AdminMessage, 'id' | 'date'> & { subject?: string }): Promise<AdminMessage> {
    const local = adminStore.addMessage(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        name: local.name,
        email: local.email,
        phone: local.phone,
        subject: data.subject || 'Website General Detailing Enquiry',
        message: local.message,
        createdAt: local.date,
        status: local.status === 'new' ? 'unread' : local.status
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async updateStatus(id: string, status: MessageStatus): Promise<AdminMessage | null> {
    adminStore.updateMessageStatus(id, status);
    const updated = adminStore.getMessages().find((m) => m.id === id) || null;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deleteMessage(id);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
      return false;
    }
  }
};
