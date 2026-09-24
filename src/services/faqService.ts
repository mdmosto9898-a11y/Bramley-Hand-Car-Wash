/**
 * FAQ Service Layer
 * Target Firestore Collection: `faqs`
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
import { AdminFAQ } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'faqs';

export const faqService = {
  async getAll(): Promise<AdminFAQ[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminFAQ),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getFAQs().find((f) => f.id === item.id);
          if (existing) {
            adminStore.updateFAQ(item.id, item);
          } else {
            adminStore.addFAQ(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore FAQs read notice, using cached store:', error);
    }
    return adminStore.getFAQs();
  },

  async getPublished(): Promise<AdminFAQ[]> {
    const all = await this.getAll();
    return all.filter((f) => f.published);
  },

  async getById(id: string): Promise<AdminFAQ | undefined> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as AdminFAQ), id: snapshot.id };
      }
    } catch (error) {
      console.warn(`Firestore read notice for FAQ ${id}:`, error);
    }
    return adminStore.getFAQs().find((f) => f.id === id);
  },

  async create(data: Omit<AdminFAQ, 'id' | 'order'>): Promise<AdminFAQ> {
    const local = adminStore.addFAQ(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        question: local.question,
        answer: local.answer,
        published: local.published,
        sortOrder: local.order,
        order: local.order
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async update(id: string, updates: Partial<AdminFAQ>): Promise<AdminFAQ | null> {
    const updated = adminStore.updateFAQ(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const firestorePayload: Record<string, unknown> = { ...updates };
      if (updates.order !== undefined) {
        firestorePayload.sortOrder = updates.order;
      }
      await updateDoc(docRef, firestorePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async reorder(id: string, direction: 'up' | 'down'): Promise<AdminFAQ[]> {
    adminStore.reorderFAQ(id, direction);
    const faqs = adminStore.getFAQs();
    try {
      for (const faq of faqs) {
        const docRef = doc(db, COLLECTION_NAME, faq.id);
        await updateDoc(docRef, { order: faq.order, sortOrder: faq.order });
      }
    } catch (error) {
      console.warn('Firestore reorder sync warning:', error);
    }
    return faqs;
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deleteFAQ(id);
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
