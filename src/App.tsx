import React, { useState, useEffect } from 'react';
import { PrototypeBanner } from './components/PrototypeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { MobileAdvantage } from './components/MobileAdvantage';
import { GallerySection } from './components/GallerySection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FAQSection } from './components/FAQSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { ImageReplaceModal } from './components/ImageReplaceModal';
import { PricingPackagesSection } from './components/PricingPackagesSection';
import { ServiceItem, GalleryItem } from './types';
import { getStoredData, setStoredData, DEFAULT_GALLERY_IMAGES } from './data/dbStore';
import { GalleryImage } from './types/database';
import { AdminApp } from './admin/AdminApp';

export default function App() {
  // Check if current path or hash starts with /admin
  const checkIsAdminPath = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path.startsWith('/admin') || hash.startsWith('#admin');
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminPath);
  const [currentAdminPath, setCurrentAdminPath] = useState<string>(
    window.location.pathname.startsWith('/admin') ? window.location.pathname : '/admin/login'
  );

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      const isAdm = checkIsAdminPath();
      setIsAdminRoute(isAdm);
      if (isAdm) {
        setCurrentAdminPath(window.location.pathname);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = (subPath: string = '/admin/login') => {
    setCurrentAdminPath(subPath);
    setIsAdminRoute(true);
    if (window.location.pathname !== subPath) {
      window.history.pushState({}, '', subPath);
    }
  };

  const navigateToWebsite = () => {
    setIsAdminRoute(false);
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
  };

  const [selectedModalService, setSelectedModalService] = useState<ServiceItem | null>(null);
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);

  // Image Replacement Modal state
  const [replaceTarget, setReplaceTarget] = useState<GalleryItem | null>(null);

  // Dynamic gallery items synced with dbStore
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const stored = getStoredData<GalleryImage[]>('prodetailing_gallery_v2', DEFAULT_GALLERY_IMAGES);
    return stored.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      beforeLabel: g.beforeLabel || 'Before',
      afterLabel: g.afterLabel || 'After',
      description: g.description,
      beforeImage: g.beforeImage,
      afterImage: g.afterImage,
      isDemoPlaceholder: g.isDemoPlaceholder
    }));
  });

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedBookingService(serviceName);
    }
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveImageReplacement = (targetId: string, newImageUrl: string) => {
    // Update local state
    const updated = galleryItems.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          afterImage: newImageUrl,
          isDemoPlaceholder: false
        };
      }
      return item;
    });
    setGalleryItems(updated);

    // Also persist in dbStore
    const stored = getStoredData<GalleryImage[]>('prodetailing_gallery_v2', DEFAULT_GALLERY_IMAGES);
    const updatedStored = stored.map((s) =>
      s.id === targetId ? { ...s, afterImage: newImageUrl, isDemoPlaceholder: false } : s
    );
    setStoredData('prodetailing_gallery_v2', updatedStored);
  };

  // Render Full Admin Panel if route is /admin
  if (isAdminRoute) {
    return (
      <AdminApp
        initialPath={currentAdminPath}
        onReturnToWebsite={navigateToWebsite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans pb-16 lg:pb-0">
      {/* Prototype Presentation Notice */}
      <PrototypeBanner />

      {/* Primary Top Navigation Bar */}
      <Header
        onOpenBooking={() => scrollToBooking()}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => scrollToBooking()} />

        {/* 2. Compact Trust Signals Bar with 4.9★ Google Rating */}
        <TrustBar />

        {/* 3. Core Capabilities & Detailing Services Grid (12 Services + Pricing policy) */}
        <ServicesSection
          onSelectService={(serviceName) => scrollToBooking(serviceName)}
          onOpenModal={(service) => setSelectedModalService(service)}
        />

        {/* 4. Process / How It Works & Mobile Advantage */}
        <MobileAdvantage onOpenBooking={() => scrollToBooking()} />
        <WhyChooseUs />

        {/* 5. Before & After Restorative Gallery with Category Filters & Lightbox */}
        <GallerySection
          items={galleryItems}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
          onOpenReplaceModal={(item) => setReplaceTarget(item)}
        />

        {/* 6. Pricing Packages with Vehicle Classification */}
        <PricingPackagesSection
          onSelectPackage={(packageName) => scrollToBooking(packageName)}
        />

        {/* 7. Yorkshire Service Area + Postcode Checker */}
        <ServiceAreaSection onOpenBooking={() => scrollToBooking()} />

        {/* 8. Customer Reviews with Verified 4.9★ Ratings */}
        <ReviewsSection />

        {/* 9. Comprehensive FAQ Accordion */}
        <FAQSection />

        {/* 10. Interactive Booking Request Flow */}
        <BookingSection
          preselectedService={preselectedBookingService}
          onResetPreselectedService={() => setPreselectedBookingService(undefined)}
        />

        {/* 11. Direct Contact Information & Enquiry Form */}
        <ContactSection onOpenBooking={() => scrollToBooking()} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => navigateToAdmin('/admin/login')} />

      {/* Sticky Mobile Bar */}
      <StickyMobileBar onOpenBooking={() => scrollToBooking()} />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedModalService}
        onClose={() => setSelectedModalService(null)}
        onSelectService={(name) => scrollToBooking(name)}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        items={galleryItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
      />

      {/* Image Replacement Modal */}
      <ImageReplaceModal
        isOpen={!!replaceTarget}
        onClose={() => setReplaceTarget(null)}
        targetId={replaceTarget?.id || ''}
        targetTitle={replaceTarget?.title || ''}
        currentImage={replaceTarget?.afterImage}
        onSaveImage={handleSaveImageReplacement}
      />
    </div>
  );
}
