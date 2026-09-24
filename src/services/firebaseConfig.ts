/**
 * Firebase Production Target Configuration Scaffolding
 * 
 * When connecting Firebase in production:
 * 1. Set environment variables in .env:
 *    VITE_FIREBASE_API_KEY
 *    VITE_FIREBASE_AUTH_DOMAIN
 *    VITE_FIREBASE_PROJECT_ID
 *    VITE_FIREBASE_STORAGE_BUCKET
 *    VITE_FIREBASE_MESSAGING_SENDER_ID
 *    VITE_FIREBASE_APP_ID
 * 
 * 2. In this architecture:
 *    - authService connects to getAuth(app)
 *    - bookingService, serviceService, pricingService, etc. connect to getFirestore(app)
 *    - galleryService connects to getStorage(app)
 */

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bramley-hand-car-wash',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};
