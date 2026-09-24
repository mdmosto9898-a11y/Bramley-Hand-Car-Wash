/**
 * Service Catalogue Service Layer
 * Target Firestore Collection: `services`
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
import { AdminService } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'services';

export const serviceService = {
  async getAll(): Promise<AdminService[]> {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminService),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getServices().find((s) => s.id === item.id);
          if (existing) {
            adminStore.updateService(item.id, item);
          } else {
            adminStore.addService(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore service read notice, using cached store:', error);
    }
    return adminStore.getServices();
  },

  async getPublished(): Promise<AdminService[]> {
    const all = await this.getAll();
    return all.filter((s) => s.status === 'active');
  },

  async getById(id: string): Promise<AdminService | undefined> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as AdminService), id: snapshot.id };
      }
    } catch (error) {
      console.warn(`Firestore read notice for service ${id}:`, error);
    }
    return adminStore.getServices().find((s) => s.id === id);
  },

  async create(data: Omit<AdminService, 'id'>): Promise<AdminService> {
    const local = adminStore.addService(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        name: local.name,
        description: local.fullDesc || local.shortDesc,
        image: local.image,
        startingPrice: local.startingPrice,
        duration: local.duration,
        active: local.status === 'active',
        featured: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async update(id: string, updates: Partial<AdminService>): Promise<AdminService | null> {
    const updated = adminStore.updateService(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const firestorePayload: Record<string, unknown> = { ...updates };
      if (updates.status !== undefined) {
        firestorePayload.active = updates.status === 'active';
      }
      if (updates.fullDesc || updates.shortDesc) {
        firestorePayload.description = updates.fullDesc || updates.shortDesc;
      }
      await updateDoc(docRef, firestorePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async setStatus(id: string, status: 'active' | 'disabled'): Promise<AdminService | null> {
    return this.update(id, { status });
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deleteService(id);
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
