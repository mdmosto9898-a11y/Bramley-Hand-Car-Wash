/**
 * Dedicated Admin Authorization Service
 * 
 * Verifies that an authenticated Firebase user has administrative privileges
 * for Bramley Hand Car Wash before granting access to protected operational views.
 */

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AuthenticatedUserIdentity {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role?: string;
}

// Configured authorized administrator identities
const AUTHORIZED_ADMIN_EMAILS = [
  (import.meta.env.VITE_ADMIN_EMAIL || 'admin@bramleyhandcarwash.co.uk').toLowerCase().trim(),
  'admin@bramleyhandcarwash.co.uk',
  'mdmosto9898@gmail.com'
];

export const adminAuthorizationService = {
  /**
   * Fast synchronous check based on authorized email identities
   */
  isAuthorizedAdmin(user: AuthenticatedUserIdentity | null): boolean {
    if (!user || !user.email) {
      return false;
    }

    const normalizedEmail = user.email.toLowerCase().trim();
    return AUTHORIZED_ADMIN_EMAILS.includes(normalizedEmail);
  },

  /**
   * Full asynchronous verification checking authorized email list and Firestore admin collections
   */
  async isAuthorizedAdminAsync(user: AuthenticatedUserIdentity | null): Promise<boolean> {
    if (!user || !user.email) {
      return false;
    }

    // 1. Immediate whitelist verification
    const normalizedEmail = user.email.toLowerCase().trim();
    if (AUTHORIZED_ADMIN_EMAILS.includes(normalizedEmail)) {
      return true;
    }

    // 2. Firestore database check in /admins/{uid}
    try {
      if (db && user.uid) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          return true;
        }
      }
    } catch (e) {
      console.warn('Admin Firestore validation notice:', e);
    }

    return false;
  },

  /**
   * Returns primary configured admin email
   */
  getConfiguredAdminEmail(): string {
    return (import.meta.env.VITE_ADMIN_EMAIL || 'admin@bramleyhandcarwash.co.uk').trim();
  }
};
