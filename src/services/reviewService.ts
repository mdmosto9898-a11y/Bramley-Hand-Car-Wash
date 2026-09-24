/**
 * Reviews & Feedback Service Layer
 * Target Firestore Collection: `reviews`
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { AdminReview } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'reviews';

export const reviewService = {
  async getAll(): Promise<AdminReview[]> {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminReview),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getReviews().find((r) => r.id === item.id);
          if (existing) {
            adminStore.updateReview(item.id, item);
          } else {
            adminStore.addReview(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore reviews read notice, using cached store:', error);
    }
    return adminStore.getReviews();
  },

  async getPublished(): Promise<AdminReview[]> {
    const all = await this.getAll();
    return all.filter((r) => r.status === 'published' || r.published === true);
  },

  async create(data: Omit<AdminReview, 'id'>): Promise<AdminReview> {
    const local = adminStore.addReview(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        customerName: local.customerName,
        reviewText: local.reviewText,
        rating: local.rating,
        source: local.source || 'Direct Verified Feedback',
        date: local.date,
        featured: local.featured,
        published: local.status === 'published' || local.published === true,
        status: local.status
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async update(id: string, updates: Partial<AdminReview>): Promise<AdminReview | null> {
    const updated = adminStore.updateReview(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const firestorePayload: Record<string, unknown> = { ...updates };
      if (updates.status !== undefined) {
        firestorePayload.published = updates.status === 'published';
      }
      await updateDoc(docRef, firestorePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async toggleFeatured(id: string): Promise<AdminReview | null> {
    adminStore.toggleReviewFeatured(id);
    const updated = adminStore.getReviews().find((r) => r.id === id) || null;
    if (updated) {
      try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { featured: updated.featured });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
      }
    }
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deleteReview(id);
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
