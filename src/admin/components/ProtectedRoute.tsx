import React, { useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { LoadingState } from './LoadingState';
import { LoginPage } from '../pages/LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onReturnToSite: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onReturnToSite }) => {
  const { isAuthenticated, isAdmin, loading } = useAdminAuth();

  // If unauthenticated and on a protected sub-path, sync browser URL to /admin/login
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.history.replaceState({ tab: 'login' }, '', '/admin/login');
      }
    }
  }, [loading, isAuthenticated, isAdmin]);

  // If loading: show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <LoadingState message="Verifying administrative credentials..." />
      </div>
    );
  }

  // If user is not authenticated: render login page
  if (!isAuthenticated || !isAdmin) {
    return <LoginPage onReturnToSite={onReturnToSite} />;
  }

  // If user is authenticated and authorized: allow Admin route
  return <>{children}</>;
};
