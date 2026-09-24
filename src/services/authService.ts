/**
 * Bramley Hand Car Wash — Authentication Service Layer
 * 
 * Production Target: Pure Firebase Authentication (firebase/auth)
 * 
 * Features:
 * - Direct Firebase Auth signInWithEmailAndPassword & signOut
 * - Zero hardcoded passwords
 * - No fake localStorage/sessionStorage auth tokens
 * - Verification via adminAuthorizationService
 * - Clean session lifecycle and onAuthStateChanged listener
 * - Safe password reset dispatch
 */

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { adminAuthorizationService, AuthenticatedUserIdentity } from './adminAuthorizationService';
import { AdminUser } from '../admin/types/admin';

export interface AuthSession {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

export const authService = {
  /**
   * Listen to Firebase Auth state changes
   */
  subscribeAuthState(callback: (session: AuthSession) => void): () => void {
    if (!auth) {
      callback({ user: null, isAuthenticated: false, isAdmin: false });
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (!fbUser || !fbUser.email) {
        callback({ user: null, isAuthenticated: false, isAdmin: false });
        return;
      }

      const identity: AuthenticatedUserIdentity = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName,
        role: 'Super Admin'
      };

      const isAuthorized = await adminAuthorizationService.isAuthorizedAdminAsync(identity);
      if (isAuthorized) {
        const adminUser: AdminUser = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Bramley Admin',
          email: fbUser.email,
          role: 'Super Admin',
          avatar: 'BW'
        };
        callback({ user: adminUser, isAuthenticated: true, isAdmin: true });
      } else {
        // Authenticated in Firebase but not on the authorized administrators roster
        await firebaseSignOut(auth).catch(() => {});
        callback({ user: null, isAuthenticated: false, isAdmin: false });
      }
    });

    return unsubscribe;
  },

  /**
   * Authenticate with Email and Password using Firebase Auth
   */
  async login(email: string, pass: string, _rememberMe?: boolean): Promise<AuthResult> {
    const cleanEmail = email.trim();
    const cleanPass = pass;

    if (!cleanEmail || !cleanPass) {
      return {
        success: false,
        error: 'Please enter both your administrator email and password.'
      };
    }

    if (!auth) {
      return {
        success: false,
        error: 'Firebase Authentication is not available. Please check system configuration.'
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      const fbUser = userCredential.user;

      const identity: AuthenticatedUserIdentity = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName,
        role: 'Super Admin'
      };

      const isAuthorized = await adminAuthorizationService.isAuthorizedAdminAsync(identity);
      if (!isAuthorized) {
        await firebaseSignOut(auth).catch(() => {});
        return {
          success: false,
          error: 'Access denied: This Firebase account is not authorized as a Bramley Hand Car Wash administrator.'
        };
      }

      const adminUser: AdminUser = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Bramley Admin',
        email: fbUser.email || cleanEmail,
        role: 'Super Admin',
        avatar: 'BW'
      };

      return { success: true, user: adminUser };
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.warn('Firebase login attempt failed:', firebaseError?.code || err);

      switch (firebaseError?.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-email':
          return {
            success: false,
            error: 'Invalid email or password.'
          };
        case 'auth/user-disabled':
          return {
            success: false,
            error: 'This administrator account has been disabled. Please contact the business owner.'
          };
        case 'auth/too-many-requests':
          return {
            success: false,
            error: 'Access temporarily blocked due to multiple failed login attempts. Please reset your password or try again later.'
          };
        case 'auth/network-request-failed':
          return {
            success: false,
            error: 'Network connection error. Please verify your internet connection and try again.'
          };
        default:
          return {
            success: false,
            error: 'Invalid email or password.'
          };
      }
    }
  },

  /**
   * Log out from administrative session
   */
  async logout(): Promise<void> {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error('Error signing out from Firebase:', err);
      }
    }
  },

  /**
   * Reset Password Dispatch (Firebase sendPasswordResetEmail)
   * Follows security best-practice: Never reveals whether an email exists
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid email address.'
      };
    }

    if (auth) {
      try {
        await sendPasswordResetEmail(auth, cleanEmail);
      } catch (err) {
        // Intentionally return safe success message to prevent user enumeration attacks
        console.warn('Firebase password reset dispatch note:', err);
      }
    }

    return {
      success: true,
      message: 'If this email is registered, password reset instructions have been dispatched to your inbox.'
    };
  }
};
