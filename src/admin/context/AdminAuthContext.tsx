import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AdminUser } from '../types/admin';
import { authService, AuthResult } from '../../services/authService';

export interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<AuthResult>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  // Subscribe to auth state on mount
  useEffect(() => {
    const unsubscribe = authService.subscribeAuthState((session) => {
      setUser(session.user);
      setIsAuthenticated(session.isAuthenticated);
      setIsAdmin(session.isAdmin);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const login = useCallback(
    async (email: string, pass: string, rememberMe: boolean = false): Promise<AuthResult> => {
      setLoading(true);
      try {
        const result = await authService.login(email, pass, rememberMe);
        if (result.success && result.user) {
          setUser(result.user);
          setIsAuthenticated(true);
          setIsAdmin(true);
          return { success: true, user: result.user };
        }
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        return { success: false, error: result.error || 'Invalid email or password.' };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    return authService.sendPasswordReset(email);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
};
