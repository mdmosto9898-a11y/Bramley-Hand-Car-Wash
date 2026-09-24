import {
  BusinessSettings,
  Service,
  GalleryImage,
  ServiceArea,
  FAQ,
  Review,
  Booking,
  ContactMessage
} from '../types/database';

// Service-specific authentic photographic assets
import heroCarImg from '../assets/images/hero_car_detailing_1790184158353.jpg';
import interiorImg from '../assets/images/detailing_interior_1790184174191.jpg';
import exteriorWashImg from '../assets/images/exterior_wash_foam_1790228820923.jpg';
import fullDetailImg from '../assets/images/full_car_detail_1790228927317.jpg';
import paintCorrectionImg from '../assets/images/detailing_paint_correction_1790184186461.jpg';
import ceramicCoatingImg from '../assets/images/ceramic_coating_apply_1790228834895.jpg';
import wheelsCareImg from '../assets/images/wheel_alloy_detailing_1790228856274.jpg';
import headlightImg from '../assets/images/headlight_polish_restore_1790228868705.jpg';
import engineBayImg from '../assets/images/engine_bay_detail_1790228881881.jpg';
import glassProtectionImg from '../assets/images/glass_water_beading_1790228899327.jpg';
import mobileServiceImg from '../assets/images/mobile_detailing_driveway_1790228912414.jpg';
import steamCleanImg from '../assets/images/interior_steam_clean_1790228941925.jpg';
import windowTintImg from '../assets/images/window_tinting_film_1790228960664.jpg';

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

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  id: 'biz_default',
  businessName: 'Bramley Hand Car Wash',
  descriptor: 'Quality Hand Car Wash & Valeting in Leeds',
  corePositioning: 'QUALITY HAND CAR WASH & VALETING IN LEEDS',
  coreMessage: 'Professional hand washing, deep interior valeting, and vehicle care at 601 Stanningley Rd, Bramley.',
  phone: '+44 7838 676170',
  phoneDisplay: '+44 7838 676170',
  email: 'info@bramleyhandcarwash.co.uk',
  address: '601 Stanningley Rd, Bramley, Leeds, LS13 4EL, UK',
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
  linktreeUrl: 'https://www.tiktok.com/@bramley_handcarwash0',
  appointmentOnly: false,
  is100PercentMobile: false,
  updatedAt: new Date().toISOString()
};

// Hand Car Wash & Valeting Services — Displayed in USD ($)
export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'mini-valet',
    name: 'Mini Valet',
    shortDesc: 'Quick and thorough hand wash, dry, wheel face cleaning, cabin vacuum, and streak-free glass.',
    fullDesc: 'Our popular routine upkeep service. Includes pH-neutral hand shampoo, high-pressure rinse, chamois/microfibre dry, tyre dressing, interior vacuum, and dashboard wipe down.',
    category: 'exterior',
    priceDisplay: 'From $20',
    priceNote: 'Demo starting rate in USD ($) — subject to vehicle size and condition.',
    recommendedFor: 'Weekly or fortnightly regular vehicle maintenance and clean commute.',
    isPopular: true,
    image: exteriorWashImg,
    features: [
      'High-pressure pre-wash rinse & road grit removal',
      'pH-neutral hand car wash with clean microfibre mitts',
      'Alloy wheel faces cleaned & brake dust removed',
      'Microfibre hand dry with door shuts wiped',
      'Cabin vacuum including footwells, seats & boot area',
      'Dashboard & centre console wipe down',
      'Tyre shine dressing applied'
    ]
  },
  {
    id: 'exterior-hand-wash',
    name: 'Exterior Hand Car Wash',
    shortDesc: 'Multi-stage snow foam pre-wash, two-bucket gentle hand wash, wheel cleaning, and protective gloss dry.',
    fullDesc: 'A meticulous exterior hand wash designed to protect vehicle clear coat. Uses rich snow foam to lift grime before contact washing with plush mitts.',
    category: 'exterior',
    priceDisplay: 'From $25',
    priceNote: 'Demo starting rate in USD ($) — subject to vehicle size and condition.',
    recommendedFor: 'Drivers seeking safe, scratch-free hand washing on Stanningley Rd.',
    isPopular: false,
    image: heroCarImg,
    features: [
      'Citrus pre-wash & thick snow foam bath',
      'Two-bucket scratch-safe hand wash method',
      'Alloy wheels, arches & barrel face cleaning',
      'Plush microfibre warm air dry',
      'Exterior glass and side mirrors polished',
      'Natural satin tyre dressing with zero sling'
    ]
  },
  {
    id: 'full-valet',
    name: 'Full Valet',
    shortDesc: 'Complete interior and exterior transformation including deep seat shampoo, plastics dressing, and hand wax.',
    fullDesc: 'Our signature inside-and-out revitalisation. We combine our thorough exterior hand wash and decontamination with hot upholstery shampooing, plastics conditioning, and glass clarity.',
    category: 'exterior',
    priceDisplay: 'From $50',
    priceNote: 'Demo starting rate in USD ($) — subject to vehicle size and condition.',
    recommendedFor: 'Vehicles needing complete revival, family runabouts, or pre-sale turnaround.',
    isPopular: true,
    image: fullDetailImg,
    features: [
      'Full exterior multi-stage hand wash & high-pressure rinse',
      'Carpets & upholstery seats deep shampooed & extracted',
      'Interior plastics cleaned, degreased & UV-matte dressed',
      'Air vents, crevices, cup holders & consoles detailed',
      'Interior & exterior streak-free glass polishing',
      'Door jambs, boot shut lines & sills cleansed',
      'Protective gloss sealant & tyre nourishment'
    ]
  },
  {
    id: 'interior-valet',
    name: 'Interior Deep Clean & Valet',
    shortDesc: 'Deep cabin overhaul restoring freshness, hygiene, and factory-crisp matte surfaces.',
    fullDesc: 'Comprehensive passenger cabin deep clean. Hot-water seat extraction, high-temperature steam sanitisation, carpet revival, and odour neutralisation.',
    category: 'interior',
    priceDisplay: 'From $75',
    priceNote: 'Demo starting rate in USD ($) — subject to vehicle size and condition.',
    recommendedFor: 'Stained seats, pet hair removal, odour elimination, and deep cabin hygiene.',
    isPopular: false,
    image: interiorImg,
    features: [
      'De-cluttering & deep mechanical vacuuming',
      'Hot water upholstery & seat shampoo extraction',
      'Leather seating cleaned & conditioned where fitted',
      'High-temperature steam sanitisation of vents and seams',
      'Interior plastics degreased and given factory matte finish',
      'Streak-free interior glass and mirror polishing',
      'Odour neutralizing cabin mist'
    ]
  },
  {
    id: 'paint-polishing',
    name: 'Paint Polishing & Gloss Enhancement',
    shortDesc: 'Machine polishing to safely reduce wash swirls, enhance optical clarity, and boost gloss depth.',
    fullDesc: 'Precision machine polishing that refines dull paint, eliminates light swirl marks, and reveals authentic metallic flake depth before applying high-grade wax or sealant.',
    category: 'paint',
    priceDisplay: 'From $95',
    priceNote: 'Demo starting rate in USD ($) — quote confirmed on inspection.',
    recommendedFor: 'Cars showing swirl marks, wash marring, or dull paint finish.',
    isPopular: false,
    image: paintCorrectionImg,
    features: [
      'Clay bar and chemical fallout surface decontamination',
      'Machine compounding and optical finishing polish',
      'Significant reduction in swirl marks and clear coat defects',
      'High-gloss synthetic sealant or carnauba wax protection',
      'Refined mirror reflections across all metal panels'
    ]
  },
  {
    id: 'wheels-tyres',
    name: 'Wheel & Tyre Detailing',
    shortDesc: 'Deep alloy wheel de-ironing, barrel brushing, brake caliper detail, and tyre nourishment.',
    fullDesc: 'Targeted alloy rim decontamination. We dissolve hot brake dust, brush inner wheel barrels, and apply non-sling tyre dressing for a showroom finish.',
    category: 'exterior',
    priceDisplay: 'From $30',
    priceNote: 'Demo starting rate in USD ($) — subject to wheel size and condition.',
    recommendedFor: 'Sporting alloys, diamond-cut rims, and heavily soiled wheels.',
    image: wheelsCareImg,
    features: [
      'Acid-free chemical iron fallout dissolve',
      'Inner rim barrels & brake caliper face brushed',
      'Tar spot removal from rim faces',
      'Durable satin tyre dressing with zero sling'
    ]
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Cleaning & Restoration',
    shortDesc: 'Multi-stage wet sanding and optical compounding to clear cloudy, yellowed polycarbonate lenses.',
    fullDesc: 'Restores nighttime headlight beam clarity and road safety. We sand away UV-degraded oxidation and compound lenses to crystal clarity with UV protection.',
    category: 'specialist',
    priceDisplay: 'From $35',
    priceNote: 'Demo starting rate in USD ($) per pair.',
    recommendedFor: 'Vehicles with cloudy, hazy, or sun-oxidised headlight lenses.',
    image: headlightImg,
    features: [
      'Graduated wet sanding to remove yellowed oxidation',
      'Machine compounding with optical refining polish',
      'Significantly increases nighttime illumination',
      'UV-blocking polymer sealant to prevent re-yellowing'
    ]
  },
  {
    id: 'engine-bay',
    name: 'Engine Bay Cleaning',
    shortDesc: 'Safe degreasing, steam agitation, and satin dressing of the engine compartment.',
    fullDesc: 'Delicate citrus degreasing with soft natural bristle brushes and low-moisture steam to safely revive engine plastics, hoses, and engine bay aesthetics.',
    category: 'specialist',
    priceDisplay: 'From $40',
    priceNote: 'Demo starting rate in USD ($) — subject to vehicle condition.',
    recommendedFor: 'Car enthusiasts, pre-sale inspection, and post-winter engine care.',
    image: engineBayImg,
    features: [
      'Sensitive electrical components shielded and protected',
      'Gentle citrus degreasing and soft detail brush agitation',
      'Low-moisture steam cleaning for safe grime removal',
      'Warm air dry and OEM dry-touch satin plastics dressing'
    ]
  }
];

// Gallery Transformations with requested categories: ALL, CAR WASH, INTERIOR, EXTERIOR, FULL VALET, WHEELS & TYRES, PAINT, HEADLIGHTS
export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-car-wash',
    title: 'Snow Foam Hand Wash & Rinse',
    category: 'car_wash',
    beforeLabel: 'Road Grime & Traffic Film',
    afterLabel: 'Clean Gloss Hand Wash',
    description: 'Thick snow foam encapsulation followed by gentle two-bucket contact washing and microfibre dry at Bramley Hand Car Wash.',
    beforeImage: exteriorWashImg,
    afterImage: exteriorWashImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'gal-interior-valet',
    title: 'Cabin Vacuum & Seat Extraction',
    category: 'interior',
    beforeLabel: 'Soiled Seats & Crevice Dust',
    afterLabel: 'Fresh Matte Factory Finish',
    description: 'Hot water upholstery extraction, dashboard controls detailing, and deep carpet vacuuming in Leeds.',
    beforeImage: interiorImg,
    afterImage: interiorImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-02T11:00:00Z'
  },
  {
    id: 'gal-exterior-detail',
    title: 'Exterior Hand Wash & High-Gloss Sealant',
    category: 'exterior',
    beforeLabel: 'Mud & Road Tar Splatter',
    afterLabel: 'Streak-Free Mirror Finish',
    description: 'Hand wash, door jamb degreasing, tyre shine, and protective sealant applied at 601 Stanningley Rd.',
    beforeImage: heroCarImg,
    afterImage: heroCarImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-03T12:00:00Z'
  },
  {
    id: 'gal-full-valet',
    title: 'Complete Full Valet Inside & Out',
    category: 'full_valet',
    beforeLabel: 'Heavily Used Daily Driver',
    afterLabel: 'Spotless Showroom Reset',
    description: 'Comprehensive inside-and-out valet leaving the vehicle spotless, fresh, and protected.',
    beforeImage: fullDetailImg,
    afterImage: fullDetailImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-04T14:00:00Z'
  },
  {
    id: 'gal-wheels-tyres',
    title: 'Alloy Wheel Iron Decontamination',
    category: 'wheels',
    beforeLabel: 'Burnt Brake Dust & Grime',
    afterLabel: 'Clean Silver Alloy Barrels',
    description: 'Acid-free iron fallout dissolve and high-pressure barrel cleaning with non-sling tyre dressing.',
    beforeImage: wheelsCareImg,
    afterImage: wheelsCareImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-05T15:00:00Z'
  },
  {
    id: 'gal-paint-polish',
    title: 'Machine Paint Polishing & Swirl Reduction',
    category: 'paint',
    beforeLabel: 'Wash Scratches & Dull Clear Coat',
    afterLabel: 'Glossy Reflective Paint Finish',
    description: 'Machine compounding and optical finishing polish removing light wash marring to restore vibrant gloss.',
    beforeImage: paintCorrectionImg,
    afterImage: paintCorrectionImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-06T16:00:00Z'
  },
  {
    id: 'gal-headlight-restore',
    title: 'Headlight Lens Clarity Restoration',
    category: 'headlights',
    beforeLabel: 'Cloudy Oxidised Polycarbonate',
    afterLabel: 'Crystal Clear Optical Beam',
    description: 'Wet sanding and compounding removing hazy yellow oxidation with UV-blocking sealant protection.',
    beforeImage: headlightImg,
    afterImage: headlightImg,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-07T09:00:00Z'
  }
];

// Local service areas around Bramley Hand Car Wash (601 Stanningley Rd, Leeds LS13 4EL)
export const DEFAULT_SERVICE_AREAS: ServiceArea[] = [
  { id: 'bramley', name: 'Bramley', county: 'Leeds (West Yorkshire)', postcodes: ['LS13 (Our Base at 601 Stanningley Rd)'], isPrimary: true, travelNote: 'Visit our site on Stanningley Rd' },
  { id: 'stanningley', name: 'Stanningley & Farsley', county: 'Leeds / West Yorkshire', postcodes: ['LS28', 'LS13'], isPrimary: true, travelNote: 'Right by our facility' },
  { id: 'pudsey', name: 'Pudsey', county: 'Leeds', postcodes: ['LS28'], isPrimary: true, travelNote: 'Minutes away from our wash' },
  { id: 'armley', name: 'Armley & Wortley', county: 'Leeds', postcodes: ['LS12'], isPrimary: true, travelNote: 'Local customer area' },
  { id: 'kirkstall', name: 'Kirkstall & Burley', county: 'Leeds', postcodes: ['LS4', 'LS5'], isPrimary: true, travelNote: 'Just across the river' },
  { id: 'horsforth', name: 'Horsforth & Rodley', county: 'Leeds', postcodes: ['LS18', 'LS13'], isPrimary: true, travelNote: 'Convenient drive along the ring road' },
  { id: 'leeds-central', name: 'Leeds City Centre', county: 'Leeds', postcodes: ['LS1', 'LS2', 'LS3'], isPrimary: true, travelNote: 'Direct link via Stanningley Road' },
  { id: 'bradford-east', name: 'Bradford (East Border)', county: 'West Yorkshire', postcodes: ['BD3', 'BD4'], isPrimary: false, travelNote: 'Convenient access on the A647 corridor' }
];

// Real customer reviews from verified Google Reviews for Bramley Hand Car Wash
export const INITIAL_SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    source: 'google',
    rating: 5.0,
    highlightText: 'Great service and very friendly staff. My car looks spotless inside and out, and the attention to detail was impressive. Quick, professional, and good value for money. I\'ll definitely be coming back.',
    verifiedReviewer: true,
    date: 'Recent Google Review'
  },
  {
    id: 'rev-02',
    source: 'google',
    rating: 5.0,
    highlightText: 'Took my (very dirty) car this morning and I have to say it was the best wash it has ever had. Service was friendly and very thorough. It literally looks brand new. Worth every one of the 5 stars.',
    verifiedReviewer: true,
    date: 'Recent Google Review'
  },
  {
    id: 'rev-03',
    source: 'google',
    rating: 5.0,
    highlightText: 'Spotless inside and out, brilliant hand car wash and valeting in Bramley. Very cheap as well for the quality they deliver. Highly recommended on Stanningley Rd.',
    verifiedReviewer: true,
    date: 'Recent Google Review'
  },
  {
    id: 'rev-04',
    source: 'google',
    rating: 5.0,
    highlightText: 'Friendly and professional staff, fast turnaround and meticulous cleaning on wheels and paintwork. Always does a fantastic job every time.',
    verifiedReviewer: true,
    date: 'Recent Google Review'
  }
];

export const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Where is Bramley Hand Car Wash located?',
    answer: 'We are conveniently located at 601 Stanningley Rd, Bramley, Leeds, LS13 4EL. We are open 7 days a week from 8:30 AM to 6:00 PM for drive-in hand washing and valeting.',
    category: 'location',
    order: 1
  },
  {
    id: 'faq-2',
    question: 'Do I need to book in advance or can I just drive in?',
    answer: 'Drive-ins and walk-ins are welcome every day for hand car washing and mini valets! For extensive full valets or specialized machine paint polishing, booking or calling ahead on +44 7838 676170 helps ensure your slot with zero wait.',
    category: 'booking',
    order: 2
  },
  {
    id: 'faq-3',
    question: 'What is included in the Full Valet service?',
    answer: 'Our Full Valet (From $50) includes a complete multi-stage exterior hand wash, high-pressure rinse, alloy wheel de-ironing, tyre dressing, deep carpet & upholstery shampooing, plastics cleaning & UV conditioning, and streak-free interior glass polishing.',
    category: 'service',
    order: 3
  },
  {
    id: 'faq-4',
    question: 'How does pricing work?',
    answer: 'All displayed prices on this website are shown in USD ($) as starting demo rates based on vehicle size and initial condition. Final confirmed prices are given upon vehicle arrival at 601 Stanningley Rd. Give us a call on +44 7838 676170 for instant pricing questions.',
    category: 'pricing',
    order: 4
  },
  {
    id: 'faq-5',
    question: 'What are your opening hours?',
    answer: 'Bramley Hand Car Wash operates seven days a week: Monday to Sunday from 8:30 AM to 6:00 PM.',
    category: 'service',
    order: 5
  },
  {
    id: 'faq-6',
    question: 'Do you have an official TikTok channel?',
    answer: 'Yes! Follow our real TikTok account @bramley_handcarwash0 to see vehicle transformation clips, foam washing videos, and customer results.',
    category: 'service',
    order: 6
  }
];

export const INITIAL_SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    createdAt: '2026-09-21T09:30:00Z',
    status: 'confirmed',
    serviceName: 'Full Valet',
    vehicleMakeModel: 'Volkswagen Golf',
    vehicleType: 'Hatchback',
    preferredDate: '2026-09-28',
    preferredTime: 'Morning (09:00 - 12:00)',
    postcode: 'LS13 4EL',
    customerName: 'Marcus Reynolds',
    customerPhone: '07700 900123',
    customerEmail: 'm.reynolds@example.co.uk',
    address: '601 Stanningley Rd, Bramley',
    notes: 'Standard road dirt and mats vacuum.',
    depositPaid: false,
    estimatedPrice: 'From $50'
  },
  {
    id: 'bk-102',
    createdAt: '2026-09-20T14:15:00Z',
    status: 'confirmed',
    serviceName: 'Mini Valet',
    vehicleMakeModel: 'Audi A3',
    vehicleType: 'Saloon',
    preferredDate: '2026-09-29',
    preferredTime: 'Afternoon (13:00 - 16:00)',
    postcode: 'LS28 7DE',
    customerName: 'Claire Thornton',
    customerPhone: '07700 900456',
    customerEmail: 'claire.t@example.co.uk',
    address: 'Pudsey, Leeds',
    notes: 'Exterior hand wash and interior vacuum.',
    depositPaid: true,
    estimatedPrice: 'From $20'
  }
];

export const INITIAL_SAMPLE_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'David Harrison',
    email: 'dharrison@example.co.uk',
    phone: '07712 345678',
    message: 'Hello, what is your current wait time on Saturdays for a Full Valet on a Ford Focus at 601 Stanningley Rd?',
    status: 'new',
    createdAt: '2026-09-22T10:45:00Z'
  },
  {
    id: 'msg-02',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.co.uk',
    phone: '07798 765432',
    message: 'Could you provide a quote for headlight restoration on a 2014 Honda Civic? Both headlights are cloudy.',
    status: 'replied',
    createdAt: '2026-09-21T16:20:00Z'
  }
];

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}
