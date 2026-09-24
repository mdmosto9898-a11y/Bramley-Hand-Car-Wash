/**
 * Pricing Packages Service Layer
 * Target Firestore Collection: `pricing`
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
import { AdminPricingPackage } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'pricing';

export const pricingService = {
  async getAll(): Promise<AdminPricingPackage[]> {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminPricingPackage),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getPricingPackages().find((p) => p.id === item.id);
          if (existing) {
            adminStore.updatePricingPackage(item.id, item);
          } else {
            adminStore.addPricingPackage(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore pricing read notice, using cached store:', error);
    }
    return adminStore.getPricingPackages();
  },

  async getPublished(): Promise<AdminPricingPackage[]> {
    const all = await this.getAll();
    return all.filter((p) => p.status === 'active');
  },

  async getById(id: string): Promise<AdminPricingPackage | undefined> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as AdminPricingPackage), id: snapshot.id };
      }
    } catch (error) {
      console.warn(`Firestore read notice for pricing ${id}:`, error);
    }
    return adminStore.getPricingPackages().find((p) => p.id === id);
  },

  async create(data: Omit<AdminPricingPackage, 'id'>): Promise<AdminPricingPackage> {
    const local = adminStore.addPricingPackage(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        service: local.name,
        vehicleType: local.vehicleType,
        startingPrice: local.startingPrice,
        priceDisplay: `From $${local.startingPrice}`,
        duration: '1 - 3 hours',
        includedServices: local.includedServices || [],
        active: local.status === 'active',
        currency: 'USD'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async update(id: string, updates: Partial<AdminPricingPackage>): Promise<AdminPricingPackage | null> {
    const updated = adminStore.updatePricingPackage(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const firestorePayload: Record<string, unknown> = { ...updates };
      if (updates.status !== undefined) {
        firestorePayload.active = updates.status === 'active';
      }
      if (updates.startingPrice !== undefined) {
        firestorePayload.priceDisplay = `From $${updates.startingPrice}`;
      }
      await updateDoc(docRef, firestorePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deletePricingPackage(id);
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
