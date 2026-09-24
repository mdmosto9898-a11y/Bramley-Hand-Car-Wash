export * from './types/database';

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: 'interior' | 'exterior' | 'paint' | 'specialist';
  priceDisplay: string;
  priceNote?: string;
  features: string[];
  recommendedFor: string;
  image?: string;
  isPopular?: boolean;
}

export interface GalleryItem {
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
  isDemoPlaceholder?: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleType: string;
  serviceRequired: string;
  preferredDate: string;
  preferredTime: string;
  locationPostcode: string;
  additionalInfo: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
