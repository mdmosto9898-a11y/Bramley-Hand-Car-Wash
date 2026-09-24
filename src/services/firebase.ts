export { app, auth, db, storage, OperationType, handleFirestoreError, testConnection } from '../lib/firebase';
export type { FirestoreErrorInfo } from '../lib/firebase';

export const hasFirebaseAuth = (): boolean => true;
