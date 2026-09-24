export type BookingStatus = 'new' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AdminBooking {
  id: string;
  createdAt: string;
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMakeModel: string;
  vehicleType: string;
  serviceName: string;
  serviceId?: string;
  preferredDate: string;
  preferredTime: string;
  locationPostcode: string;
  address?: string;
  additionalNotes?: string;
  estimatedPrice?: string;
}

export type ServiceStatus = 'active' | 'disabled';
export type ServiceCategory = 'interior' | 'exterior' | 'paint' | 'specialist';

export interface AdminService {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  priceDisplay: string;
  duration: string;
  image: string;
  status: ServiceStatus;
  features: string[];
  recommendedFor?: string;
}

export type PricingStatus = 'active' | 'disabled';

export interface AdminPricingPackage {
  id: string;
  name: string;
  vehicleType: string;
  originalPrice?: number;
  discountedPrice?: number;
  startingPrice: number;
  priceDisplay: string;
  discountPercent?: number;
  description: string;
  image?: string;
  isPopular?: boolean;
  featured?: boolean;
  includedServices: string[];
  status: PricingStatus;
}

export type GalleryCategory =
  | 'car_wash'
  | 'interior'
  | 'exterior'
  | 'full_valet'
  | 'full_detail'
  | 'paint'
  | 'paint_correction'
  | 'wheels'
  | 'headlights'
  | 'ceramic_coating'
  | 'engine_bay'
  | 'glass'
  | 'mobile_detailing'
  | 'before_after';

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  beforeImage?: string;
  afterImage: string;
  featured: boolean;
  isDemoPlaceholder: boolean;
  uploadedAt: string;
}

export type ReviewStatus = 'published' | 'pending' | 'hidden';

export interface AdminReview {
  id: string;
  customerName: string;
  rating: number; // 1-5
  reviewText: string;
  date: string;
  featured: boolean;
  status: ReviewStatus;
  isDemo: boolean;
  source?: 'google' | 'other';
  published?: boolean;
}

export type ServiceAreaStatus = 'active' | 'disabled';

export interface AdminServiceArea {
  id: string;
  name: string;
  county: string;
  postcodes: string[];
  isPrimary: boolean;
  status: ServiceAreaStatus;
  travelNote?: string;
}

export type FAQCategory = 'booking' | 'service' | 'pricing' | 'location';

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  published: boolean;
}

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: MessageStatus;
  notes?: string;
}

export interface AdminBusinessSettings {
  businessName: string;
  businessDescription: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  logoUrl: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  googleBusinessUrl: string;
  currency?: string;
  currencySymbol?: string;
  seoTitle: string;
  seoDescription: string;
  announcementText?: string;
  announcementActive?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Detailing Manager';
  avatar?: string;
}
