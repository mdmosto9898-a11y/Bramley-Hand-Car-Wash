import {
  DEFAULT_BUSINESS_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY_IMAGES,
  DEFAULT_SERVICE_AREAS,
  DEFAULT_FAQS,
  INITIAL_SAMPLE_REVIEWS,
  heroCarImg,
  interiorImg,
  exteriorWashImg,
  fullDetailImg,
  paintCorrectionImg,
  ceramicCoatingImg,
  wheelsCareImg,
  headlightImg,
  engineBayImg,
  glassProtectionImg,
  mobileServiceImg,
  steamCleanImg,
  windowTintImg
} from './dbStore';
import { ServiceItem, GalleryItem, FAQItem } from '../types';

export {
  heroCarImg,
  interiorImg,
  exteriorWashImg,
  fullDetailImg,
  paintCorrectionImg,
  ceramicCoatingImg,
  wheelsCareImg,
  headlightImg,
  engineBayImg,
  glassProtectionImg,
  mobileServiceImg,
  steamCleanImg,
  windowTintImg
};

export const BUSINESS_INFO = {
  name: 'Bramley Hand Car Wash',
  legalName: 'Bramley Hand Car Wash',
  descriptor: 'Quality Hand Car Wash & Valeting in Leeds',
  corePositioning: 'QUALITY HAND CAR WASH & VALETING IN LEEDS',
  coreMessage: 'Professional hand washing, deep interior valeting, and vehicle care at 601 Stanningley Rd, Bramley.',
  tagline: 'Quality Hand Car Wash & Valeting in Leeds',
  phone: '+44 7838 676170',
  phoneDisplay: '+44 7838 676170',
  phoneHref: 'tel:+447838676170',
  email: 'info@bramleyhandcarwash.co.uk',
  emailHref: 'mailto:info@bramleyhandcarwash.co.uk',
  address: '601 Stanningley Rd, Bramley, Leeds, LS13 4EL, UK',
  locationShort: '601 Stanningley Rd, Bramley, Leeds',
  city: 'Leeds',
  region: 'West Yorkshire',
  postcode: 'LS13 4EL',
  country: 'United Kingdom',
  openingHours: 'Monday–Sunday 8:30 AM–6:00 PM',
  rating: 5.0,
  googleReviewText: '5.0 ★ Google Reviews',
  googleProfileUrl: 'https://www.google.com/maps/search/?api=1&query=Bramley+Hand+Car+Wash+601+Stanningley+Rd+Leeds+LS13+4EL',
  googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=601+Stanningley+Rd+Bramley+Leeds+LS13+4EL',
  tiktokUrl: 'https://www.tiktok.com/@bramley_handcarwash0',
  tiktokHandle: '@bramley_handcarwash0',
  currency: '$',
  whatsappUrl: 'https://wa.me/447838676170',
  linktree: 'https://www.tiktok.com/@bramley_handcarwash0',
  website: 'https://www.tiktok.com/@bramley_handcarwash0',
  serviceModel: 'Quality Hand Car Wash & Valeting at 601 Stanningley Rd, Bramley, Leeds'
};

export const SERVICES_LIST: ServiceItem[] = DEFAULT_SERVICES.map((s) => ({
  id: s.id,
  name: s.name,
  shortDesc: s.shortDesc,
  fullDesc: s.fullDesc,
  category: s.category,
  priceDisplay: s.priceDisplay,
  priceNote: s.priceNote,
  features: s.features,
  recommendedFor: s.recommendedFor,
  image: s.image,
  isPopular: s.isPopular
}));

export const GALLERY_ITEMS: GalleryItem[] = DEFAULT_GALLERY_IMAGES.map((g) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  beforeLabel: g.beforeLabel || 'Before Wash',
  afterLabel: g.afterLabel || 'After Clean',
  description: g.description,
  beforeImage: g.beforeImage,
  afterImage: g.afterImage,
  isDemoPlaceholder: g.isDemoPlaceholder
}));

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Safe Hand Car Washing',
    description: 'We treat your vehicle paint with respect — rich snow foam pre-wash, two-bucket gentle hand wash, and soft microfibre drying.'
  },
  {
    number: '02',
    title: 'Deep Interior Valeting',
    description: 'From routine cabin vacuuming to hot upholstery extraction, plastics rejuvenation, and crystal-clear streak-free glass polishing.'
  },
  {
    number: '03',
    title: 'Convenient Stanningley Road Site',
    description: 'Located at 601 Stanningley Rd, Bramley (LS13 4EL) with convenient drive-in access, quick turnaround, and comfortable customer waiting.'
  },
  {
    number: '04',
    title: 'Wheel & Tyre Care',
    description: 'Specialist acid-free iron fallout cleaners that dissolve baked-on brake dust, leaving rims gleaming and tyres conditioned.'
  },
  {
    number: '05',
    title: 'Open 7 Days a Week',
    description: 'We are open Monday to Sunday from 8:30 AM to 6:00 PM. Drive in today or contact us ahead for valets.'
  },
  {
    number: '06',
    title: '5.0★ Google Rating',
    description: 'Verified 5.0★ rating on Google Reviews. Customers praise our friendly staff, attention to detail, and great value for money.'
  }
];

export const SERVICE_AREAS = [
  { name: 'Bramley (Our Site)', postcode: 'LS13 4EL', highlight: true, note: '601 Stanningley Rd Facility' },
  { name: 'Stanningley & Farsley', postcode: 'LS28 / LS13', highlight: true, note: 'Immediate Area' },
  { name: 'Pudsey', postcode: 'LS28', highlight: true, note: 'Minutes away on A647' },
  { name: 'Armley & Wortley', postcode: 'LS12', highlight: true, note: 'Local Leeds Area' },
  { name: 'Kirkstall & Burley', postcode: 'LS4 / LS5', highlight: true, note: 'Across River Aire' },
  { name: 'Horsforth & Rodley', postcode: 'LS18 / LS13', highlight: true, note: 'Ring Road Access' },
  { name: 'Leeds City Centre', postcode: 'LS1 / LS2', highlight: true, note: 'Direct link via Stanningley Rd' },
  { name: 'Bradford (East Border)', postcode: 'BD3 / BD4', highlight: false, note: 'A647 Corridor' }
];

export const FAQS: FAQItem[] = DEFAULT_FAQS.map((f) => ({
  question: f.question,
  answer: f.answer
}));

export const REVIEWS = INITIAL_SAMPLE_REVIEWS;
