/**
 * Booking Service Layer
 * Target Firestore Collection: `bookings`
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
import { AdminBooking, BookingStatus } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'bookings';

export const bookingService = {
  async getAll(): Promise<AdminBooking[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminBooking),
          id: d.id
        }));
        // Update local memory store with latest Firestore snapshot
        items.forEach((item) => {
          const existing = adminStore.getBookings().find((b) => b.id === item.id);
          if (existing) {
            adminStore.updateBooking(item.id, item);
          } else {
            adminStore.addBooking(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore booking read notice, using cached store:', error);
    }
    return adminStore.getBookings();
  },

  async getById(id: string): Promise<AdminBooking | undefined> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as AdminBooking), id: snapshot.id };
      }
    } catch (error) {
      console.warn(`Firestore read notice for booking ${id}:`, error);
    }
    return adminStore.getBookings().find((b) => b.id === id);
  },

  async create(data: Omit<AdminBooking, 'id' | 'createdAt'>): Promise<AdminBooking> {
    const local = adminStore.addBooking(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        // Canonical fields matching requested specifications
        customerName: local.customerName,
        phone: local.customerPhone,
        email: local.customerEmail,
        vehicle: local.vehicleMakeModel,
        vehicleType: local.vehicleType,
        service: local.serviceName,
        date: local.preferredDate,
        time: local.preferredTime,
        location: local.address || 'Workshop at 601 Stanningley Rd',
        postcode: local.locationPostcode,
        message: local.additionalNotes || '',
        status: local.status,
        createdAt: local.createdAt
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  async update(id: string, updates: Partial<AdminBooking>): Promise<AdminBooking | null> {
    const updated = adminStore.updateBooking(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async updateStatus(id: string, status: BookingStatus): Promise<AdminBooking | null> {
    adminStore.updateBookingStatus(id, status);
    const updated = adminStore.getBookings().find((b) => b.id === id) || null;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    adminStore.deleteBooking(id);
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
