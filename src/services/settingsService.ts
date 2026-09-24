/**
 * Business & SEO Settings Service Layer
 * Target Firestore Collection: `businessSettings`
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { AdminBusinessSettings } from '../admin/types/admin';
import { adminStore } from '../admin/data/adminStore';

const COLLECTION_NAME = 'businessSettings';
const SETTINGS_DOC_ID = 'general';

export const settingsService = {
  async get(): Promise<AdminBusinessSettings> {
    try {
      const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<AdminBusinessSettings>;
        const merged = adminStore.updateBusinessSettings(data);
        return merged;
      } else {
        // Bootstrap the settings document in Firestore on first load
        const initial = adminStore.getBusinessSettings();
        await setDoc(docRef, initial);
        return initial;
      }
    } catch (error) {
      console.warn('Firestore settings read notice, using cached store:', error);
    }
    return adminStore.getBusinessSettings();
  },

  async update(settings: Partial<AdminBusinessSettings>): Promise<AdminBusinessSettings> {
    const updated = adminStore.updateBusinessSettings(settings);
    try {
      const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
      await setDoc(docRef, updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${SETTINGS_DOC_ID}`);
    }
    return updated;
  },

  async resetToBaseline(): Promise<AdminBusinessSettings> {
    adminStore.resetAllToDemoDefaults();
    const baseline = adminStore.getBusinessSettings();
    try {
      const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
      await setDoc(docRef, baseline);
    } catch (error) {
      console.warn('Could not reset Firestore baseline doc:', error);
    }
    return baseline;
  }
};
