/**
 * Pro Detailing — Complete Database Schema & Models
 * Prepared for future persistent backend integration (Firebase / Cloud SQL / PostgreSQL)
 */

export interface BusinessSettings {
  id: string;
  businessName: string;
  descriptor: string;
  corePositioning: string;
  coreMessage: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
  openingHours: string;
  rating: number;
  googleReviewText: string;
  googleProfileUrl: string;
  googleDirectionsUrl?: string;
  tiktokUrl?: string;
  tiktokHandle?: string;
  currency?: string;
  whatsappUrl: string;
  linktreeUrl: string;
  appointmentOnly: boolean;
  is100PercentMobile: boolean;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: 'interior' | 'exterior' | 'paint' | 'specialist';
  priceDisplay: string;
  priceNote?: string;
  features: string[];
  recommendedFor: string;
  image: string;
  isPopular?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  fromPrice: string;
  priceNote: string;
  includedServices: string[];
  recommendedFrequency: string;
}

export interface PricingItem {
  id: string;
  serviceId: string;
  serviceName: string;
  priceFrom: string;
  pricingType: 'fixed_from' | 'quote_required';
  notes: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category:
    | 'all'
    | 'car_wash'
    | 'interior'
    | 'exterior'
    | 'full_valet'
    | 'full_detail'
    | 'wheels'
    | 'paint'
    | 'paint_correction'
    | 'headlights'
    | 'ceramic_coating'
    | 'engine_bay'
    | 'glass'
    | 'mobile_detailing'
    | 'before_after'
    | 'paintwork'
    | 'ceramic'
    | 'mobile_service';
  beforeLabel?: string;
  afterLabel?: string;
  description: string;
  beforeImage?: string;
  afterImage: string;
  isDemoPlaceholder: boolean;
  uploadedAt: string;
}

export interface Review {
  id: string;
  source: 'google';
  rating: number;
  highlightText: string;
  verifiedReviewer: boolean;
  date?: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  county: string;
  postcodes: string[];
  isPrimary: boolean;
  travelNote?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'service' | 'pricing' | 'location';
  order: number;
}

export interface Booking {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  serviceName: string;
  vehicleMakeModel: string;
  vehicleType: string;
  preferredDate: string;
  preferredTime: string;
  postcode: string;
  address?: string;
  additionalInfo?: string;
  notes?: string;
  depositPaid?: boolean;
  estimatedPrice?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  vehicleMakeModel?: string;
  totalBookings: number;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName?: string;
  name?: string;
  phone: string;
  email: string;
  message: string;
  status: 'new' | 'unread' | 'read' | 'replied' | 'archived';
}
