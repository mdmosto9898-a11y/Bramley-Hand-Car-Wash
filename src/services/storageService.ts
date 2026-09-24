/**
 * Firebase Storage Service
 * Handles uploading files to Firebase Storage buckets under:
 * - /gallery
 * - /services
 * - /logo
 * - /before-after
 */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot
} from 'firebase/storage';
import { storage } from '../lib/firebase';

export type StorageFolder = 'gallery' | 'services' | 'logo' | 'before-after';

export interface UploadProgressCallback {
  (progress: number, snapshot: UploadTaskSnapshot): void;
}

export const storageService = {
  /**
   * Upload an image File or Blob to Firebase Storage
   * @param file The image file (JPG, JPEG, PNG, WEBP)
   * @param folder The target folder ('gallery' | 'services' | 'logo' | 'before-after')
   * @param customFilename Optional specific filename
   * @param onProgress Optional progress callback
   */
  async uploadImage(
    file: File | Blob,
    folder: StorageFolder = 'gallery',
    customFilename?: string,
    onProgress?: UploadProgressCallback
  ): Promise<{ downloadUrl: string; storagePath: string }> {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const originalName = file instanceof File ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_') : 'image.jpg';
    const extension = originalName.split('.').pop() || 'jpg';
    const filename = customFilename || `${timestamp}_${randomSuffix}.${extension}`;
    const storagePath = `${folder}/${filename}`;

    const storageRef = ref(storage, storagePath);
    const metadata = {
      contentType: file.type || 'image/jpeg'
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(Math.round(progress), snapshot);
          }
        },
        (error) => {
          console.error(`Firebase Storage upload error for ${storagePath}:`, error);
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ downloadUrl, storagePath });
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  },

  /**
   * Delete an image from Firebase Storage by its storage path or full download URL
   */
  async deleteImage(storagePathOrUrl: string): Promise<boolean> {
    try {
      if (!storagePathOrUrl) return false;
      let targetRef;
      if (storagePathOrUrl.startsWith('http://') || storagePathOrUrl.startsWith('https://')) {
        targetRef = ref(storage, storagePathOrUrl);
      } else {
        targetRef = ref(storage, storagePathOrUrl);
      }
      await deleteObject(targetRef);
      return true;
    } catch (err) {
      console.warn('Could not delete storage object:', err);
      return false;
    }
  }
};
