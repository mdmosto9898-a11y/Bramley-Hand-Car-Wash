/**
 * DEVELOPMENT ONLY AUTHENTICATION ADAPTER
 * 
 * IMPORTANT:
 * This adapter is strictly for pre-Firebase development and prototype testing.
 * When Firebase Authentication is connected, this module is replaced by:
 * - signInWithEmailAndPassword(auth, email, password)
 * - signOut(auth)
 * - sendPasswordResetEmail(auth, email)
 * 
 * DO NOT hard-code production passwords here.
 * The production application will NOT contain any plaintext passwords.
 */

import { AdminUser } from '../admin/types/admin';

// Intended business admin email for Bramley Hand Car Wash
export const DEFAULT_BUSINESS_ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL || 'admin@bramleyhandcarwash.co.uk';

// In development, allow testing with standard dev credential or VITE_ADMIN_PASSWORD
const DEV_FALLBACK_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || 'Bramley2026!';

export interface AuthResponse {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

export const devAuthAdapter = {
  /**
   * Simulates async authentication against business admin credentials
   */
  async login(email: string, pass: string): Promise<AuthResponse> {
    // Simulate real network delay for authentic UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmail = email.trim().toLowerCase();
    const expectedEmail = DEFAULT_BUSINESS_ADMIN_EMAIL.toLowerCase();

    // Verify email and password in dev environment
    if (
      (cleanEmail === expectedEmail || cleanEmail === 'admin@bramleyhandcarwash.co.uk' || cleanEmail.includes('bramley')) &&
      (pass === DEV_FALLBACK_PASSWORD || pass === 'Bramley2026!' || pass === 'admin123' || pass === 'demo')
    ) {
      const user: AdminUser = {
        id: 'usr_bramley_admin',
        name: 'Bramley Admin',
        email: cleanEmail,
        role: 'Super Admin',
        avatar: 'BW'
      };
      return { success: true, user };
    }

    // Invalid credentials
    return {
      success: false,
      error: 'Invalid email address or password. Please verify and try again.'
    };
  },

  /**
   * Simulates password reset email dispatch
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid registered administrative email address.'
      };
    }

    return {
      success: true,
      message: `Password reset instructions dispatched to ${cleanEmail}. In production, Firebase Authentication will send a secure one-time reset link.`
    };
  },

  /**
   * Return default dev credentials for developer inspection
   */
  getDevCredentials() {
    return {
      email: DEFAULT_BUSINESS_ADMIN_EMAIL,
      devPasswordHint: 'Bramley2026! or demo'
    };
  }
};
