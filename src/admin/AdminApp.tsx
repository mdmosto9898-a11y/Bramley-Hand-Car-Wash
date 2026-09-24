import React, { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { AdminTab } from './components/Sidebar';
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { adminStore } from './data/adminStore';

// Admin Subpages
import { DashboardPage } from './pages/DashboardPage';
import { BookingsPage } from './pages/BookingsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { FaqsPage } from './pages/FaqsPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

import { AdminBooking, AdminMessage } from './types/admin';
import {
  bookingService,
  serviceService,
  pricingService,
  galleryService,
  reviewService,
  faqService,
  messageService,
  settingsService
} from '../services';

interface AdminAppProps {
  onReturnToWebsite: () => void;
  initialPath?: string;
}

const AdminContent: React.FC<{ onReturnToWebsite: () => void; initialPath?: string }> = ({
  onReturnToWebsite,
  initialPath
}) => {
  const { isAuthenticated, loading } = useAdminAuth();

  // Determine initial tab from path
  const getTabFromPath = (path: string): AdminTab => {
    const clean = path.replace(/^\/admin\/?/, '').replace(/^#admin\/?/, '').split('?')[0].split('/')[0];
    const validTabs: AdminTab[] = [
      'dashboard',
      'bookings',
      'services',
      'pricing',
      'gallery',
      'reviews',
      'service-areas',
      'faqs',
      'messages',
      'settings'
    ];
    if (validTabs.includes(clean as AdminTab)) {
      return clean as AdminTab;
    }
    return 'dashboard';
  };

  const [currentTab, setCurrentTab] = useState<AdminTab>(() =>
    getTabFromPath(initialPath || window.location.pathname || window.location.hash)
  );

  // Store data state
  const [bookings, setBookings] = useState(adminStore.getBookings());
  const [services, setServices] = useState(adminStore.getServices());
  const [pricingPackages, setPricingPackages] = useState(adminStore.getPricingPackages());
  const [galleryItems, setGalleryItems] = useState(adminStore.getGalleryItems());
  const [reviews, setReviews] = useState(adminStore.getReviews());
  const [serviceAreas, setServiceAreas] = useState(adminStore.getServiceAreas());
  const [faqs, setFaqs] = useState(adminStore.getFAQs());
  const [messages, setMessages] = useState(adminStore.getMessages());
  const [settings, setSettings] = useState(adminStore.getBusinessSettings());

  // Deep link item selection
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  const [selectedMessageId, setSelectedMessageId] = useState<string | undefined>(undefined);

  const refreshAllData = useCallback(() => {
    setBookings(adminStore.getBookings());
    setServices(adminStore.getServices());
    setPricingPackages(adminStore.getPricingPackages());
    setGalleryItems(adminStore.getGalleryItems());
    setReviews(adminStore.getReviews());
    setServiceAreas(adminStore.getServiceAreas());
    setFaqs(adminStore.getFAQs());
    setMessages(adminStore.getMessages());
    setSettings(adminStore.getBusinessSettings());
  }, []);

  // Fetch and synchronize latest Cloud Firestore collections when mounted
  useEffect(() => {
    let isMounted = true;
    const loadFromFirestore = async () => {
      try {
        await Promise.allSettled([
          bookingService.getAll(),
          serviceService.getAll(),
          pricingService.getAll(),
          galleryService.getAll(),
          reviewService.getAll(),
          faqService.getAll(),
          messageService.getAll(),
          settingsService.get()
        ]);
        if (isMounted) {
          refreshAllData();
        }
      } catch (err) {
        console.warn('Initial Firestore sync error:', err);
      }
    };
    loadFromFirestore();
    return () => {
      isMounted = false;
    };
  }, [refreshAllData]);

  // Sync URL when tab changes
  const handleNavigate = useCallback((tab: AdminTab) => {
    setCurrentTab(tab);
    const newPath = `/admin/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
  }, []);

  // Listen for browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setCurrentTab(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // If already authenticated and URL is /admin/login or /admin, redirect to /admin/dashboard
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const path = window.location.pathname;
      if (path === '/admin' || path === '/admin/' || path === '/admin/login' || path === '/admin/login/') {
        handleNavigate('dashboard');
      }
    }
  }, [isAuthenticated, loading, handleNavigate]);

  const handleQuickAction = (action: 'add_booking' | 'add_service' | 'add_gallery' | 'add_review') => {
    switch (action) {
      case 'add_booking':
        handleNavigate('bookings');
        break;
      case 'add_service':
        handleNavigate('services');
        break;
      case 'add_gallery':
        handleNavigate('gallery');
        break;
      case 'add_review':
        handleNavigate('reviews');
        break;
    }
  };

  const unreadMessagesCount = messages.filter((m) => m.status === 'new').length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending' || b.status === 'new').length;

  return (
    <ProtectedRoute onReturnToSite={onReturnToWebsite}>
      <AdminLayout
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onViewWebsite={onReturnToWebsite}
        onRefreshData={refreshAllData}
        unreadCount={unreadMessagesCount}
        pendingBookingsCount={pendingBookingsCount}
      >
        {currentTab === 'dashboard' && (
          <DashboardPage
            bookings={bookings}
            messages={messages}
            servicesCount={services.length}
            galleryCount={galleryItems.length}
            reviewsCount={reviews.length}
            onNavigateToTab={handleNavigate}
            onSelectBooking={(b: AdminBooking) => {
              setSelectedBookingId(b.id);
              handleNavigate('bookings');
            }}
            onSelectMessage={(m: AdminMessage) => {
              setSelectedMessageId(m.id);
              handleNavigate('messages');
            }}
            onQuickAction={handleQuickAction}
          />
        )}

        {currentTab === 'bookings' && (
          <BookingsPage
            bookings={bookings}
            onRefresh={refreshAllData}
            selectedBookingId={selectedBookingId}
            onClearSelectedBookingId={() => setSelectedBookingId(undefined)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage services={services} onRefresh={refreshAllData} />
        )}

        {currentTab === 'pricing' && (
          <PricingPage pricingPackages={pricingPackages} onRefresh={refreshAllData} />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage galleryItems={galleryItems} onRefresh={refreshAllData} />
        )}

        {currentTab === 'reviews' && (
          <ReviewsPage reviews={reviews} onRefresh={refreshAllData} />
        )}

        {currentTab === 'service-areas' && (
          <ServiceAreasPage areas={serviceAreas} onRefresh={refreshAllData} />
        )}

        {currentTab === 'faqs' && (
          <FaqsPage faqs={faqs} onRefresh={refreshAllData} />
        )}

        {currentTab === 'messages' && (
          <MessagesPage
            messages={messages}
            onRefresh={refreshAllData}
            selectedMessageId={selectedMessageId}
            onClearSelectedMessageId={() => setSelectedMessageId(undefined)}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsPage settings={settings} onRefresh={refreshAllData} />
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
};

export const AdminApp: React.FC<AdminAppProps> = ({ onReturnToWebsite, initialPath }) => {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminContent onReturnToWebsite={onReturnToWebsite} initialPath={initialPath} />
      </ToastProvider>
    </AdminAuthProvider>
  );
};
