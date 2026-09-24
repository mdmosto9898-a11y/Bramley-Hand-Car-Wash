/**
 * Gallery Portfolio Service Layer
 * Target Firestore Collection: `gallery`
 * Target Storage Folder: `/gallery/`
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
import { AdminGalleryItem } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';
import { storageService, StorageFolder } from './storageService';

const COLLECTION_NAME = 'gallery';

export const galleryService = {
  async getAll(): Promise<AdminGalleryItem[]> {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({
          ...(d.data() as AdminGalleryItem),
          id: d.id
        }));
        items.forEach((item) => {
          const existing = adminStore.getGalleryItems().find((g) => g.id === item.id);
          if (existing) {
            adminStore.updateGalleryItem(item.id, item);
          } else {
            adminStore.addGalleryItem(item);
          }
        });
        return items;
      }
    } catch (error) {
      console.warn('Firestore gallery read notice, using cached store:', error);
    }
    return adminStore.getGalleryItems();
  },

  async getFeatured(): Promise<AdminGalleryItem[]> {
    const all = await this.getAll();
    return all.filter((item) => item.featured);
  },

  async getByCategory(category: string): Promise<AdminGalleryItem[]> {
    const all = await this.getAll();
    if (category === 'all') return all;
    return all.filter((item) => item.category === category);
  },

  async create(data: Omit<AdminGalleryItem, 'id' | 'uploadedAt'>): Promise<AdminGalleryItem> {
    const local = adminStore.addGalleryItem(data);
    try {
      const docRef = doc(db, COLLECTION_NAME, local.id);
      await setDoc(docRef, {
        ...local,
        imageUrl: local.afterImage,
        afterImage: local.afterImage,
        beforeImage: local.beforeImage || '',
        title: local.title,
        category: local.category,
        description: local.description,
        featured: local.featured,
        uploadedAt: local.uploadedAt,
        published: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${local.id}`);
    }
    return local;
  },

  /**
   * Upload an image file to Firebase Storage then save metadata to Firestore
   */
  async uploadAndCreate(
    file: File,
    meta: {
      title: string;
      category: AdminGalleryItem['category'];
      description: string;
      featured?: boolean;
      folder?: StorageFolder;
    }
  ): Promise<AdminGalleryItem> {
    const folder = meta.folder || 'gallery';
    const { downloadUrl, storagePath } = await storageService.uploadImage(file, folder);

    const newItem = await this.create({
      title: meta.title,
      category: meta.category,
      description: meta.description,
      afterImage: downloadUrl,
      featured: !!meta.featured,
      isDemoPlaceholder: false
    });

    // Optionally update storagePath reference in Firestore
    try {
      const docRef = doc(db, COLLECTION_NAME, newItem.id);
      await updateDoc(docRef, { storagePath });
    } catch {
      // Non-critical metadata update
    }

    return newItem;
  },

  async update(id: string, updates: Partial<AdminGalleryItem>): Promise<AdminGalleryItem | null> {
    const updated = adminStore.updateGalleryItem(id, updates);
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const existing = adminStore.getGalleryItems().find((g) => g.id === id);
    adminStore.deleteGalleryItem(id);
    try {
      if (existing?.afterImage && existing.afterImage.includes('firebasestorage')) {
        await storageService.deleteImage(existing.afterImage);
      }
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
      return false;
    }
  }
};
