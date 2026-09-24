import {
  AdminBooking,
  AdminService,
  AdminPricingPackage,
  AdminGalleryItem,
  AdminReview,
  AdminServiceArea,
  AdminFAQ,
  AdminMessage,
  AdminBusinessSettings,
  BookingStatus,
  MessageStatus
} from '../types/admin';
import heroCarImg from '../../assets/images/hero_car_detailing_1790184158353.jpg';
import interiorImg from '../../assets/images/detailing_interior_1790184174191.jpg';
import exteriorWashImg from '../../assets/images/exterior_wash_foam_1790228820923.jpg';
import fullDetailImg from '../../assets/images/full_car_detail_1790228927317.jpg';
import paintCorrectionImg from '../../assets/images/detailing_paint_correction_1790184186461.jpg';
import ceramicCoatingImg from '../../assets/images/ceramic_coating_apply_1790228834895.jpg';
import wheelsCareImg from '../../assets/images/wheel_alloy_detailing_1790228856274.jpg';
import headlightImg from '../../assets/images/headlight_polish_restore_1790228868705.jpg';
import engineBayImg from '../../assets/images/engine_bay_detail_1790228881881.jpg';
import glassProtectionImg from '../../assets/images/glass_water_beading_1790228899327.jpg';
import mobileServiceImg from '../../assets/images/mobile_detailing_driveway_1790228912414.jpg';
import steamCleanImg from '../../assets/images/interior_steam_clean_1790228941925.jpg';
import windowTintImg from '../../assets/images/window_tinting_film_1790228960664.jpg';

// Storage Keys
const KEYS = {
  BOOKINGS: 'bramley_admin_bookings_v2',
  SERVICES: 'bramley_admin_services_v2',
  PRICING: 'bramley_admin_pricing_v2',
  GALLERY: 'bramley_admin_gallery_v2',
  REVIEWS: 'bramley_admin_reviews_v2',
  AREAS: 'bramley_admin_areas_v2',
  FAQS: 'bramley_admin_faqs_v2',
  MESSAGES: 'bramley_admin_messages_v2',
  SETTINGS: 'bramley_admin_settings_v2',
  AUTH_USER: 'bramley_admin_user_v2'
};

// Initial Demo Bookings (All USD $ pricing)
export const INITIAL_DEMO_BOOKINGS: AdminBooking[] = [
  {
    id: 'BK-2026-081',
    createdAt: '2026-09-22T10:14:00Z',
    status: 'pending',
    customerName: 'James Henderson',
    customerPhone: '07700 900142',
    customerEmail: 'j.henderson@example.co.uk',
    vehicleMakeModel: 'Volkswagen Golf R',
    vehicleType: 'Hatchback / Saloon',
    serviceName: 'Full Valet Package',
    serviceId: 'full-valet',
    preferredDate: '2026-09-29',
    preferredTime: 'Morning (08:30 – 12:00)',
    locationPostcode: 'LS13 4EL',
    address: 'Bramley, Leeds',
    additionalNotes: 'Vehicle has light road salt and brake dust buildup on alloy rims.',
    estimatedPrice: 'From $50'
  },
  {
    id: 'BK-2026-080',
    createdAt: '2026-09-21T16:45:00Z',
    status: 'confirmed',
    customerName: 'Marcus Reynolds',
    customerPhone: '07700 900123',
    customerEmail: 'marcus.reynolds@example.co.uk',
    vehicleMakeModel: 'BMW 330e Touring',
    vehicleType: 'Estate / Touring',
    serviceName: 'Deep Interior Clean & Shampoo',
    serviceId: 'interior-valet',
    preferredDate: '2026-09-28',
    preferredTime: 'Morning (08:30 – 12:00)',
    locationPostcode: 'LS28 5DY',
    address: 'Farsley, Pudsey',
    additionalNotes: 'Family car, child seat milk spill and boot pet hair extraction needed.',
    estimatedPrice: 'From $40'
  },
  {
    id: 'BK-2026-079',
    createdAt: '2026-09-20T11:20:00Z',
    status: 'confirmed',
    customerName: 'Claire Thornton',
    customerPhone: '07700 900456',
    customerEmail: 'claire.t@example.co.uk',
    vehicleMakeModel: 'Audi Q5 S-Line',
    vehicleType: 'Large SUV / 4x4',
    serviceName: 'Premium Detail & Hand Wax',
    serviceId: 'premium-detail',
    preferredDate: '2026-09-30',
    preferredTime: 'Midday (12:00 – 15:00)',
    locationPostcode: 'LS13 3HR',
    address: 'Stanningley Rd, Leeds',
    additionalNotes: 'Drive-in bay booked for full wash, clay bar, and carnauba wax.',
    estimatedPrice: 'From $75'
  },
  {
    id: 'BK-2026-078',
    createdAt: '2026-09-19T09:05:00Z',
    status: 'completed',
    customerName: 'David Whitaker',
    customerPhone: '07700 900789',
    customerEmail: 'd.whitaker@example.co.uk',
    vehicleMakeModel: 'Ford Focus ST',
    vehicleType: 'Hatchback',
    serviceName: 'Mini Valet',
    serviceId: 'mini-valet',
    preferredDate: '2026-09-21',
    preferredTime: 'Flexible / Drive-in',
    locationPostcode: 'LS12 4NE',
    address: 'Armley, Leeds',
    additionalNotes: 'Fast 30-minute mini valet completed at 601 Stanningley Rd.',
    estimatedPrice: 'From $20'
  },
  {
    id: 'BK-2026-077',
    createdAt: '2026-09-18T14:30:00Z',
    status: 'completed',
    customerName: 'Sophie Bennett',
    customerPhone: '07700 900321',
    customerEmail: 'sophie.b@example.co.uk',
    vehicleMakeModel: 'Mercedes-Benz A-Class',
    vehicleType: 'Hatchback',
    serviceName: 'Hand Wash & Wax',
    serviceId: 'hand-wash-wax',
    preferredDate: '2026-09-20',
    preferredTime: 'Morning (08:30 – 12:00)',
    locationPostcode: 'LS13 1AA',
    address: 'Bramley Town End, Leeds',
    additionalNotes: 'Snow foam wash, hand dry, and wheel sparkle complete.',
    estimatedPrice: 'From $30'
  },
  {
    id: 'BK-2026-076',
    createdAt: '2026-09-17T08:15:00Z',
    status: 'cancelled',
    customerName: 'Richard Vance',
    customerPhone: '07700 900654',
    customerEmail: 'r.vance@example.co.uk',
    vehicleMakeModel: 'Nissan Qashqai',
    vehicleType: 'Compact SUV / Crossover',
    serviceName: 'Engine Bay & Exterior Wash',
    serviceId: 'engine-bay',
    preferredDate: '2026-09-19',
    preferredTime: 'Afternoon (15:00 – 18:00)',
    locationPostcode: 'LS28 7AA',
    address: 'Pudsey, Leeds',
    additionalNotes: 'Customer rescheduled due to vehicle mechanical service.',
    estimatedPrice: 'From $65'
  }
];

// Initial Services for Bramley Hand Car Wash
export const INITIAL_DEMO_SERVICES: AdminService[] = [
  {
    id: 'hand-car-wash',
    name: 'Exterior Hand Car Wash',
    category: 'exterior',
    shortDesc: 'Safe pressure wash, thick snow foam, two-bucket gentle hand wash, and microfibre dry.',
    fullDesc: 'A thorough exterior cleanse that lifts road film, grime, and mud without micro-scratching. Includes wheel face wash, tyre dressing, door shut wipedown, and streak-free exterior windows.',
    startingPrice: 15,
    priceDisplay: 'From $15',
    duration: '20 - 30 Mins',
    image: exteriorWashImg,
    status: 'active',
    recommendedFor: 'Weekly or fortnightly vehicle upkeep for daily drivers.',
    features: [
      'High-pressure pre-rinse to strip loose dirt',
      'Thick snow foam coating to soften traffic film',
      'Two-bucket scratch-safe hand wash with plush mitts',
      'Wheel faces cleansed and brake dust loosened',
      'Streak-free microfibre towel drying',
      'Gloss tyre dressing applied'
    ]
  },
  {
    id: 'mini-valet',
    name: 'Mini Valet',
    category: 'exterior',
    shortDesc: 'Quick and thorough interior vacuum, dashboard wipe, plus exterior hand car wash.',
    fullDesc: 'The perfect balance of speed and cleanliness. Combines our signature exterior hand wash with an interior floor and seats vacuum, dashboard dust removal, and glass polish.',
    startingPrice: 20,
    priceDisplay: 'From $20',
    duration: '35 - 45 Mins',
    image: fullDetailImg,
    status: 'active',
    recommendedFor: 'Busy commuters wanting a clean car inside and out in under an hour.',
    features: [
      'Complete exterior snow foam and hand wash',
      'Wheel faces and arches high-pressure rinsed',
      'Interior cabin vacuum (seats, carpets, mats)',
      'Dashboard and centre console wipe',
      'Glass cleaned inside and out',
      'Tyre shine dressing'
    ]
  },
  {
    id: 'full-valet',
    name: 'Full Valet Package',
    category: 'interior',
    shortDesc: 'Complete deep clean: upholstery shampoo, steam extraction, leather care, and exterior gloss.',
    fullDesc: 'Comprehensive inside-and-out revival. Seats and carpets are deep vacuumed and hot-water extracted, plastics conditioned, leather cleaned and nourished, followed by full hand wash and hand wax.',
    startingPrice: 50,
    priceDisplay: 'From $50',
    duration: '1.5 - 2.5 Hours',
    image: interiorImg,
    status: 'active',
    recommendedFor: 'Vehicles needing complete rejuvenation, lease returns, or family cars before/after road trips.',
    features: [
      'Full exterior hand wash with wheel barrel cleanse',
      'Deep carpet and fabric upholstery wet extraction',
      'Leather seats conditioned and cleansed',
      'All interior plastics, vents, and cup holders detailed',
      'Boot and spare wheel compartment vacuumed',
      'Hand wax applied for paint protection and gloss'
    ]
  },
  {
    id: 'premium-detail',
    name: 'Premium Detail & Hand Wax',
    category: 'paint',
    shortDesc: 'Decontamination, clay bar, gloss enhancement, and long-life carnauba wax seal.',
    fullDesc: 'Engineered for exceptional depth and paint slickness. We remove embedded iron fallout and industrial fallout, polish paintwork to enhance gloss, and seal with high-grade protective wax.',
    startingPrice: 75,
    priceDisplay: 'From $75',
    duration: '3 - 4 Hours',
    image: paintCorrectionImg,
    status: 'active',
    recommendedFor: 'Enthusiasts, weekend cars, or preparing paintwork for seasonal protection.',
    features: [
      'Chemical iron fallout dissolve on paint and wheels',
      'Clay bar mechanical decontamination',
      'Machine single-stage gloss enhancement polish',
      'Hand-applied carnauba or synthetic wax sealant',
      'Plastics and trims dressed with UV inhibitor',
      'Exhaust tips polished'
    ]
  },
  {
    id: 'machine-polishing',
    name: 'Machine Polishing / Paint Correction',
    category: 'paint',
    shortDesc: 'Precision machine compounding to remove swirl marks, light scratches, and restore clarity.',
    fullDesc: 'Restores authentic optical reflection and metallic flake pop. Safely eradicates spider-web swirls, wash marring, and dull oxidation using professional rotary and dual-action polishers.',
    startingPrice: 160,
    priceDisplay: 'From $160',
    duration: '4 - 7 Hours',
    image: paintCorrectionImg,
    status: 'active',
    recommendedFor: 'Cars showing swirl marks, faint scratches, or dull clear coat.',
    features: [
      'Digital paint depth gauge assessment across panels',
      'Multi-stage machine compounding and finishing polish',
      'Removes up to 85%+ of clear coat swirl marks',
      'Zero chalky fillers or temporary glazes',
      'Protective sealant applied post-correction'
    ]
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating / Paint Protection',
    category: 'paint',
    shortDesc: 'Ultra-hydrophobic ceramic glass barrier protecting paint from salt, bird lime, and UV rays.',
    fullDesc: 'Nanotechnology coating that forms a permanent chemical bond with your vehicle clear coat. Delivers intense water beading, extreme chemical resistance, and makes subsequent washes effortless.',
    startingPrice: 320,
    priceDisplay: 'From $320',
    duration: '1 - 2 Days',
    image: ceramicCoatingImg,
    status: 'active',
    recommendedFor: 'New vehicles and owners looking for durable multi-year protection and wet-look shine.',
    features: [
      'Multi-year chemical and environmental paint defense',
      'High-contact-angle hydrophobic water beading',
      'Protection against road salt, bird lime, and acid rain',
      'Cured under infrared detailing lamps',
      'Includes complimentary maintenance wash guide'
    ]
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    category: 'specialist',
    shortDesc: 'Wet sanding and optical compounding to clear hazy, yellowed, cloudy headlight lenses.',
    fullDesc: 'Restores nighttime headlight beam clarity and visibility. We sand away UV-degraded polycarbonate, machine compound the lenses to crystal transparency, and apply UV-blocking sealant.',
    startingPrice: 40,
    priceDisplay: 'From $40 / Pair',
    duration: '1 Hour',
    image: headlightImg,
    status: 'active',
    recommendedFor: 'Cloudy, faded, or yellowed headlight lenses.',
    features: [
      'Graduated multi-grit wet sanding',
      'Machine compounding with optical refining polish',
      'UV-blocking polymer sealant application',
      'Greatly enhances nighttime road illumination'
    ]
  },
  {
    id: 'engine-bay-cleaning',
    name: 'Engine Bay Steam Cleaning',
    category: 'specialist',
    shortDesc: 'Safe degreasing, steam agitation, and satin dressing of the engine compartment.',
    fullDesc: 'A meticulously detailed engine bay elevates the presentation and resale value of your car. Sensitive electronics and air intakes are protected before safe low-moisture steam lifts grime.',
    startingPrice: 50,
    priceDisplay: 'From $50',
    duration: '1 Hour',
    image: engineBayImg,
    status: 'active',
    recommendedFor: 'Engine compartments with oil residue, dust, or pre-sale presentation.',
    features: [
      'Masking and isolation of sensitive electronics',
      'Citrus degreasing and soft brush agitation',
      'Low-moisture steam cleaning',
      'Warm air blow-dry to evacuate moisture',
      'OEM dry-touch satin dressing on plastics and hoses'
    ]
  },
  {
    id: 'wheel-tyre-detailing',
    name: 'Wheel & Tyre Detailing',
    category: 'exterior',
    shortDesc: 'Deep iron fallout dissolve, inner rim barrel scrub, and high-gloss tyre dressing.',
    fullDesc: 'Hot brake dust pits into alloy wheels if neglected. We use acid-free bleeding de-ironisers, barrel brushes, caliper detailing, and long-lasting tyre nourishment.',
    startingPrice: 35,
    priceDisplay: 'From $35',
    duration: '45 Mins',
    image: wheelsCareImg,
    status: 'active',
    recommendedFor: 'Alloy wheels with stubborn baked-on brake dust.',
    features: [
      'Acid-free chemical iron fallout dissolve',
      'Deep inner barrel cleaning with soft woollies',
      'Brake caliper face detailed',
      'High-gloss tyre dressing'
    ]
  }
];

// Helper to compute discount percentage
export function calculateDiscountPercent(original?: number, discounted?: number): number {
  if (!original || !discounted || original <= discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

// Initial Pricing Packages (Strictly USD $ client-ready demonstration pricing)
export const INITIAL_DEMO_PRICING: AdminPricingPackage[] = [
  {
    id: 'pkg-exterior-hand-wash',
    name: 'Exterior Hand Car Wash',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 35,
    discountedPrice: 29,
    startingPrice: 29,
    priceDisplay: 'From $29',
    discountPercent: 17,
    image: exteriorWashImg,
    description: 'Active snow foam pre-soak, gentle two-bucket microfibre hand contact wash, wheel face wash, and towel dry.',
    includedServices: [
      'High-pressure pre-wash foam & road grime lift',
      'pH-neutral gentle hand wash with soft microfibres',
      'Alloy wheels cleaned & brake dust removed',
      'Door shuts & sills wiped down',
      'Plush microfibre towel hand dry'
    ],
    status: 'active',
    isPopular: false
  },
  {
    id: 'pkg-interior-cleaning',
    name: 'Interior Cleaning',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 55,
    discountedPrice: 45,
    startingPrice: 45,
    priceDisplay: 'From $45',
    discountPercent: 18,
    image: interiorImg,
    description: 'Deep cabin vacuuming, hot water upholstery extraction shampoo, dashboard UV wipe, and streak-free interior glass.',
    includedServices: [
      'Cabin & boot thorough vacuuming',
      'Upholstery seats & floor carpets shampooed',
      'Dashboard, vents, cup holders & console detailed',
      'Interior plastics cleaned & UV dressed',
      'Streak-free interior crystal glass clean'
    ],
    status: 'active',
    isPopular: false
  },
  {
    id: 'pkg-full-valet',
    name: 'Full Valet',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 95,
    discountedPrice: 79,
    startingPrice: 79,
    priceDisplay: 'From $79',
    discountPercent: 17,
    image: fullDetailImg,
    description: 'Our most comprehensive interior deep extraction shampoo combined with complete exterior snow foam hand wash & hand wax.',
    includedServices: [
      'Complete exterior snow foam hand wash & hand wax',
      'Deep hot-water extraction on all seats & carpets',
      'Leather cleansed, conditioned & fed',
      'Wheels deep cleaned & tyres dressed in satin gloss',
      'Door jambs, boot shut lines & engine surround wiped',
      'Fresh vehicle deodoriser scent'
    ],
    status: 'active',
    isPopular: true,
    featured: true
  },
  {
    id: 'pkg-wheels-tyres',
    name: 'Wheels & Tyres',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 35,
    discountedPrice: 29,
    startingPrice: 29,
    priceDisplay: 'From $29',
    discountPercent: 17,
    image: wheelsCareImg,
    description: 'Intense non-acid wheel barrel clean, iron fallout chemical decontaminant, brake dust removal, and satin tyre nourishment.',
    includedServices: [
      'Dedicated non-acid wheel cleaner application',
      'Inner barrel & spoke soft-brush detailing',
      'Chemical iron fallout dissolved (purple reaction)',
      'High-pressure power rinse',
      'Long-lasting silicone-free tyre dressing'
    ],
    status: 'active',
    isPopular: false
  },
  {
    id: 'pkg-paint-polishing',
    name: 'Paint Polishing',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 120,
    discountedPrice: 99,
    startingPrice: 99,
    priceDisplay: 'From $99',
    discountPercent: 18,
    image: paintCorrectionImg,
    description: 'Single-stage dual-action machine polishing compounding out clear-coat swirl marks and restoring brilliant mirror gloss.',
    includedServices: [
      'Clay bar mechanical surface decontamination',
      'Single-stage machine dual-action paint polishing',
      'Removes up to 80% light wash scratches & swirls',
      'Enhances paint clarity, depth & metallic flake',
      'Protective synthetic sealant applied'
    ],
    status: 'active',
    isPopular: false
  },
  {
    id: 'pkg-headlight-restoration',
    name: 'Headlight Restoration',
    vehicleType: 'All Vehicle Sizes',
    originalPrice: 70,
    discountedPrice: 59,
    startingPrice: 59,
    priceDisplay: 'From $59',
    discountPercent: 16,
    image: headlightImg,
    description: 'Multi-stage wet-sanding and machine compounding restoring yellowed, cloudy headlight lenses back to crystal clarity.',
    includedServices: [
      'Surrounding paintwork precision masked',
      'Multi-stage wet sanding removing oxidation layer',
      'Rotary optical compound & polish refining',
      'Restores MOT beam pattern & night visibility',
      'UV-blocking protective sealant coat'
    ],
    status: 'active',
    isPopular: false
  }
];

// Initial Gallery Items
export const INITIAL_DEMO_GALLERY: AdminGalleryItem[] = [
  {
    id: 'gal-wash-1',
    title: 'Snow Foam Exterior Hand Wash',
    category: 'exterior',
    description: 'High-foaming active shampoo lifting road grit before two-bucket contact wash.',
    afterImage: exteriorWashImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-21T12:00:00Z'
  },
  {
    id: 'gal-interior-1',
    title: 'Deep Interior Extraction & Valet',
    category: 'interior',
    description: 'Hot water shampoo extraction removing deep seat stains and ground-in carpet dirt.',
    afterImage: interiorImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-20T14:30:00Z'
  },
  {
    id: 'gal-paint-1',
    title: 'Machine Polishing Swirl Correction',
    category: 'paint_correction',
    description: 'Dual-action machine polishing refining clear coat gloss on black metallic paint.',
    afterImage: paintCorrectionImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-19T10:15:00Z'
  },
  {
    id: 'gal-ceramic-1',
    title: 'Ceramic Coating Application',
    category: 'ceramic_coating',
    description: 'Nano-ceramic protection applied panel by panel under inspection lighting.',
    afterImage: ceramicCoatingImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-18T16:00:00Z'
  },
  {
    id: 'gal-wheels-1',
    title: 'Alloy Wheel Iron Decontamination',
    category: 'wheels',
    description: 'Brake dust chemically dissolved and inner barrel cleaned to showroom state.',
    afterImage: wheelsCareImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-17T11:00:00Z'
  },
  {
    id: 'gal-full-1',
    title: 'Full Vehicle Hand Wash & Valet',
    category: 'full_detail',
    description: 'Complete inside-and-out finish at our 601 Stanningley Rd wash bay.',
    afterImage: fullDetailImg,
    featured: true,
    isDemoPlaceholder: true,
    uploadedAt: '2026-09-16T15:20:00Z'
  }
];

// Real Google Customer Reviews for Bramley Hand Car Wash (5.0★ Rating)
export const INITIAL_DEMO_REVIEWS: AdminReview[] = [
  {
    id: 'rev-01',
    customerName: 'Mohammed Al-Thawr',
    rating: 5,
    reviewText: 'Good service and good price. Staff were polite and attentive, left the car gleaming.',
    date: '2026-09-02',
    featured: true,
    status: 'published',
    isDemo: false
  },
  {
    id: 'rev-02',
    customerName: 'Sean',
    rating: 5,
    reviewText: 'Great service and great price. Very thorough with the wheels and door shuts.',
    date: '2026-08-18',
    featured: true,
    status: 'published',
    isDemo: false
  },
  {
    id: 'rev-03',
    customerName: 'Mark',
    rating: 5,
    reviewText: 'Great service. The guys work fast without rushing the quality of the wash.',
    date: '2026-08-04',
    featured: true,
    status: 'published',
    isDemo: false
  },
  {
    id: 'rev-04',
    customerName: 'Bradley',
    rating: 5,
    reviewText: 'Very good job on my car today. Excellent hand wash and spotless windows.',
    date: '2026-07-22',
    featured: true,
    status: 'published',
    isDemo: false
  },
  {
    id: 'rev-05',
    customerName: 'Keith',
    rating: 5,
    reviewText: 'Top quality car wash on Stanningley Road. Always friendly and efficient.',
    date: '2026-07-10',
    featured: true,
    status: 'published',
    isDemo: false
  }
];

// Initial Service Areas (Bramley, Stanningley & Surrounds)
export const INITIAL_DEMO_AREAS: AdminServiceArea[] = [
  {
    id: 'bramley',
    name: 'Bramley',
    county: 'Leeds',
    postcodes: ['LS13'],
    isPrimary: true,
    status: 'active',
    travelNote: 'Immediate facility location on Stanningley Road'
  },
  {
    id: 'stanningley',
    name: 'Stanningley',
    county: 'Leeds',
    postcodes: ['LS28'],
    isPrimary: true,
    status: 'active',
    travelNote: 'Adjacent neighbourhood along A647 corridor'
  },
  {
    id: 'pudsey',
    name: 'Pudsey',
    county: 'Leeds',
    postcodes: ['LS28'],
    isPrimary: true,
    status: 'active',
    travelNote: 'Direct 5-minute drive via Stanningley Bypass'
  },
  {
    id: 'farsley',
    name: 'Farsley',
    county: 'Leeds',
    postcodes: ['LS28'],
    isPrimary: true,
    status: 'active',
    travelNote: 'Minutes away from Town Street & Stanningley'
  },
  {
    id: 'armley',
    name: 'Armley & Wortley',
    county: 'Leeds',
    postcodes: ['LS12'],
    isPrimary: false,
    status: 'active',
    travelNote: 'Short drive from Armley Gyratory & Town Street'
  },
  {
    id: 'kirkstall',
    name: 'Kirkstall & Horsforth',
    county: 'Leeds',
    postcodes: ['LS4', 'LS5', 'LS18'],
    isPrimary: false,
    status: 'active',
    travelNote: 'Convenient connection via Leeds Ring Road'
  }
];

// Initial FAQs
export const INITIAL_DEMO_FAQS: AdminFAQ[] = [
  {
    id: 'faq-01',
    question: 'Where is Bramley Hand Car Wash located?',
    answer: 'We are situated at 601 Stanningley Rd, Bramley, Leeds LS13 4EL. We are conveniently located on the main road between Bramley and Pudsey with easy turn-in access.',
    category: 'location',
    order: 1,
    published: true
  },
  {
    id: 'faq-02',
    question: 'Do I need to book in advance for a car wash?',
    answer: 'No appointment is necessary for our standard hand car wash or mini valets — simply drive in 7 days a week between 8:30 AM and 6:00 PM. For deep upholstery shampooing, full valets, or machine polishing, booking ahead guarantees dedicated bay time.',
    category: 'booking',
    order: 2,
    published: true
  },
  {
    id: 'faq-03',
    question: 'Why choose hand car washing over automatic drive-thru washes?',
    answer: 'Automatic roller brushes carry road dirt and grit from previous cars, causing severe swirl marks and clear coat scratches. Our hand wash uses pre-wash snow foam, fresh clean microfibres, and gentle hand mitts that protect your clear coat.',
    category: 'service',
    order: 3,
    published: true
  },
  {
    id: 'faq-04',
    question: 'How are prices structured?',
    answer: 'All pricing shown on our site is in US Dollars ($). Routine Mini Valets start from $20, Full Valet Packages from $50, and Premium Details from $75 depending on vehicle size and starting condition.',
    category: 'pricing',
    order: 4,
    published: true
  },
  {
    id: 'faq-05',
    question: 'What are your opening hours?',
    answer: 'We are open 7 days a week, Monday through Sunday from 8:30 AM to 6:00 PM.',
    category: 'service',
    order: 5,
    published: true
  }
];

// Initial Messages
export const INITIAL_DEMO_MESSAGES: AdminMessage[] = [
  {
    id: 'msg-201',
    name: 'David Harrison',
    email: 'd.harrison@example.co.uk',
    phone: '07700 900789',
    message: 'Looking for a full valet on a Ford Focus estate on Stanningley Road. Do you have bay availability this Friday morning?',
    date: '2026-09-23T08:15:00Z',
    status: 'new'
  },
  {
    id: 'msg-200',
    name: 'Sarah Jenkins',
    email: 's.jenkins@example.co.uk',
    phone: '07700 900542',
    message: 'Can I drop off an SUV for deep upholstery shampoo while I run errands in Bramley? How long does a full valet take?',
    date: '2026-09-22T15:40:00Z',
    status: 'read'
  }
];

// Initial Business Settings (Strictly USD $ and Bramley Hand Car Wash)
export const INITIAL_DEMO_SETTINGS: AdminBusinessSettings = {
  businessName: 'Bramley Hand Car Wash',
  businessDescription: 'Quality hand car wash, deep valeting, and vehicle care at 601 Stanningley Rd, Bramley, Leeds LS13 4EL. Open 7 days a week with verified 5.0★ Google reviews.',
  phone: '+44 7838 676170',
  email: 'info@bramleyhandcarwash.co.uk',
  address: '601 Stanningley Rd, Bramley, Leeds, LS13 4EL, UK',
  openingHours: 'Monday – Sunday: 8:30 AM – 6:00 PM',
  logoUrl: '',
  instagram: '',
  facebook: '',
  tiktok: 'https://www.tiktok.com/@bramley_handcarwash0',
  whatsapp: 'https://wa.me/447838676170',
  googleBusinessUrl: 'https://www.google.com/maps/search/?api=1&query=601+Stanningley+Rd+Bramley+Leeds+LS13+4EL',
  currency: 'USD',
  currencySymbol: '$',
  seoTitle: 'Bramley Hand Car Wash | Car Wash & Valeting in Leeds',
  seoDescription: 'Bramley Hand Car Wash in Bramley, Leeds. Professional hand car washing and valeting services at 601 Stanningley Rd.',
  announcementText: 'LIMITED-TIME OFFER • SAVE UP TO 20% ON VALETING PACKAGES',
  announcementActive: true
};

// Helper methods with localStorage fallback
function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[AdminStore] Failed to write key ${key}:`, e);
  }
}

// Data Store Repository — Ready for future Firebase Firestore drop-in
export const adminStore = {
  // --- BOOKINGS ---
  getBookings(): AdminBooking[] {
    return readStorage<AdminBooking[]>(KEYS.BOOKINGS, INITIAL_DEMO_BOOKINGS);
  },
  addBooking(booking: Omit<AdminBooking, 'id' | 'createdAt'>): AdminBooking {
    const all = this.getBookings();
    const newBooking: AdminBooking = {
      ...booking,
      id: `BK-2026-${String(all.length + 82).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...all];
    writeStorage(KEYS.BOOKINGS, updated);
    return newBooking;
  },
  updateBooking(id: string, updates: Partial<AdminBooking>): AdminBooking | null {
    const all = this.getBookings();
    let updatedItem: AdminBooking | null = null;
    const updated = all.map((b) => {
      if (b.id === id) {
        updatedItem = { ...b, ...updates };
        return updatedItem;
      }
      return b;
    });
    writeStorage(KEYS.BOOKINGS, updated);
    return updatedItem;
  },
  updateBookingStatus(id: string, status: BookingStatus): void {
    this.updateBooking(id, { status });
  },
  deleteBooking(id: string): void {
    const all = this.getBookings().filter((b) => b.id !== id);
    writeStorage(KEYS.BOOKINGS, all);
  },

  // --- SERVICES ---
  getServices(): AdminService[] {
    return readStorage<AdminService[]>(KEYS.SERVICES, INITIAL_DEMO_SERVICES);
  },
  addService(service: Omit<AdminService, 'id'>): AdminService {
    const all = this.getServices();
    const newId = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newService: AdminService = {
      ...service,
      id: `${newId}-${Date.now().toString().slice(-4)}`
    };
    const updated = [...all, newService];
    writeStorage(KEYS.SERVICES, updated);
    return newService;
  },
  updateService(id: string, updates: Partial<AdminService>): AdminService | null {
    const all = this.getServices();
    let updatedItem: AdminService | null = null;
    const updated = all.map((s) => {
      if (s.id === id) {
        updatedItem = { ...s, ...updates };
        return updatedItem;
      }
      return s;
    });
    writeStorage(KEYS.SERVICES, updated);
    return updatedItem;
  },
  deleteService(id: string): void {
    const all = this.getServices().filter((s) => s.id !== id);
    writeStorage(KEYS.SERVICES, all);
  },
  toggleServiceStatus(id: string): void {
    const s = this.getServices().find((item) => item.id === id);
    if (s) {
      this.updateService(id, { status: s.status === 'active' ? 'disabled' : 'active' });
    }
  },

  // --- PRICING PACKAGES ---
  getPricingPackages(): AdminPricingPackage[] {
    return readStorage<AdminPricingPackage[]>(KEYS.PRICING, INITIAL_DEMO_PRICING);
  },
  addPricingPackage(pkg: Omit<AdminPricingPackage, 'id'>): AdminPricingPackage {
    const all = this.getPricingPackages();
    const newPkg: AdminPricingPackage = {
      ...pkg,
      id: `price-pkg-${Date.now().toString().slice(-4)}`
    };
    const updated = [...all, newPkg];
    writeStorage(KEYS.PRICING, updated);
    return newPkg;
  },
  updatePricingPackage(id: string, updates: Partial<AdminPricingPackage>): AdminPricingPackage | null {
    const all = this.getPricingPackages();
    let updatedItem: AdminPricingPackage | null = null;
    const updated = all.map((p) => {
      if (p.id === id) {
        updatedItem = { ...p, ...updates };
        return updatedItem;
      }
      return p;
    });
    writeStorage(KEYS.PRICING, updated);
    return updatedItem;
  },
  deletePricingPackage(id: string): void {
    const all = this.getPricingPackages().filter((p) => p.id !== id);
    writeStorage(KEYS.PRICING, all);
  },
  togglePricingStatus(id: string): void {
    const pkg = this.getPricingPackages().find((p) => p.id === id);
    if (pkg) {
      this.updatePricingPackage(id, { status: pkg.status === 'active' ? 'disabled' : 'active' });
    }
  },

  // --- GALLERY ITEMS ---
  getGalleryItems(): AdminGalleryItem[] {
    return readStorage<AdminGalleryItem[]>(KEYS.GALLERY, INITIAL_DEMO_GALLERY);
  },
  addGalleryItem(item: Omit<AdminGalleryItem, 'id' | 'uploadedAt'>): AdminGalleryItem {
    const all = this.getGalleryItems();
    const newItem: AdminGalleryItem = {
      ...item,
      id: `gal-item-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    const updated = [newItem, ...all];
    writeStorage(KEYS.GALLERY, updated);
    return newItem;
  },
  updateGalleryItem(id: string, updates: Partial<AdminGalleryItem>): AdminGalleryItem | null {
    const all = this.getGalleryItems();
    let updatedItem: AdminGalleryItem | null = null;
    const updated = all.map((g) => {
      if (g.id === id) {
        updatedItem = { ...g, ...updates };
        return updatedItem;
      }
      return g;
    });
    writeStorage(KEYS.GALLERY, updated);
    return updatedItem;
  },
  deleteGalleryItem(id: string): void {
    const all = this.getGalleryItems().filter((g) => g.id !== id);
    writeStorage(KEYS.GALLERY, all);
  },
  toggleGalleryFeatured(id: string): void {
    const item = this.getGalleryItems().find((g) => g.id === id);
    if (item) {
      this.updateGalleryItem(id, { featured: !item.featured });
    }
  },

  // --- REVIEWS ---
  getReviews(): AdminReview[] {
    return readStorage<AdminReview[]>(KEYS.REVIEWS, INITIAL_DEMO_REVIEWS);
  },
  addReview(review: Omit<AdminReview, 'id'>): AdminReview {
    const all = this.getReviews();
    const newReview: AdminReview = {
      ...review,
      id: `rev-${Date.now()}`
    };
    const updated = [newReview, ...all];
    writeStorage(KEYS.REVIEWS, updated);
    return newReview;
  },
  updateReview(id: string, updates: Partial<AdminReview>): AdminReview | null {
    const all = this.getReviews();
    let updatedItem: AdminReview | null = null;
    const updated = all.map((r) => {
      if (r.id === id) {
        updatedItem = { ...r, ...updates };
        return updatedItem;
      }
      return r;
    });
    writeStorage(KEYS.REVIEWS, updated);
    return updatedItem;
  },
  deleteReview(id: string): void {
    const all = this.getReviews().filter((r) => r.id !== id);
    writeStorage(KEYS.REVIEWS, all);
  },
  toggleReviewFeatured(id: string): void {
    const item = this.getReviews().find((r) => r.id === id);
    if (item) {
      this.updateReview(id, { featured: !item.featured });
    }
  },

  // --- SERVICE AREAS ---
  getServiceAreas(): AdminServiceArea[] {
    return readStorage<AdminServiceArea[]>(KEYS.AREAS, INITIAL_DEMO_AREAS);
  },
  addServiceArea(area: Omit<AdminServiceArea, 'id'>): AdminServiceArea {
    const all = this.getServiceAreas();
    const newArea: AdminServiceArea = {
      ...area,
      id: area.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    const updated = [...all, newArea];
    writeStorage(KEYS.AREAS, updated);
    return newArea;
  },
  updateServiceArea(id: string, updates: Partial<AdminServiceArea>): AdminServiceArea | null {
    const all = this.getServiceAreas();
    let updatedItem: AdminServiceArea | null = null;
    const updated = all.map((a) => {
      if (a.id === id) {
        updatedItem = { ...a, ...updates };
        return updatedItem;
      }
      return a;
    });
    writeStorage(KEYS.AREAS, updated);
    return updatedItem;
  },
  deleteServiceArea(id: string): void {
    const all = this.getServiceAreas().filter((a) => a.id !== id);
    writeStorage(KEYS.AREAS, all);
  },
  toggleServiceAreaStatus(id: string): void {
    const item = this.getServiceAreas().find((a) => a.id === id);
    if (item) {
      this.updateServiceArea(id, { status: item.status === 'active' ? 'disabled' : 'active' });
    }
  },

  // --- FAQS ---
  getFAQs(): AdminFAQ[] {
    return readStorage<AdminFAQ[]>(KEYS.FAQS, INITIAL_DEMO_FAQS).sort((a, b) => a.order - b.order);
  },
  addFAQ(faq: Omit<AdminFAQ, 'id' | 'order'>): AdminFAQ {
    const all = this.getFAQs();
    const newFAQ: AdminFAQ = {
      ...faq,
      id: `faq-${Date.now()}`,
      order: all.length + 1
    };
    const updated = [...all, newFAQ];
    writeStorage(KEYS.FAQS, updated);
    return newFAQ;
  },
  updateFAQ(id: string, updates: Partial<AdminFAQ>): AdminFAQ | null {
    const all = this.getFAQs();
    let updatedItem: AdminFAQ | null = null;
    const updated = all.map((f) => {
      if (f.id === id) {
        updatedItem = { ...f, ...updates };
        return updatedItem;
      }
      return f;
    });
    writeStorage(KEYS.FAQS, updated);
    return updatedItem;
  },
  deleteFAQ(id: string): void {
    const all = this.getFAQs().filter((f) => f.id !== id);
    writeStorage(KEYS.FAQS, all);
  },
  toggleFAQPublished(id: string): void {
    const item = this.getFAQs().find((f) => f.id === id);
    if (item) {
      this.updateFAQ(id, { published: !item.published });
    }
  },
  reorderFAQ(id: string, direction: 'up' | 'down'): void {
    const list = this.getFAQs();
    const index = list.findIndex((f) => f.id === id);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      const temp = list[index].order;
      list[index].order = list[index - 1].order;
      list[index - 1].order = temp;
      writeStorage(KEYS.FAQS, list);
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index].order;
      list[index].order = list[index + 1].order;
      list[index + 1].order = temp;
      writeStorage(KEYS.FAQS, list);
    }
  },

  // --- MESSAGES ---
  getMessages(): AdminMessage[] {
    return readStorage<AdminMessage[]>(KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  },
  addMessage(msg: Omit<AdminMessage, 'id' | 'date'>): AdminMessage {
    const all = this.getMessages();
    const newMsg: AdminMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString()
    };
    const updated = [newMsg, ...all];
    writeStorage(KEYS.MESSAGES, updated);
    return newMsg;
  },
  updateMessage(id: string, updates: Partial<AdminMessage>): AdminMessage | null {
    const all = this.getMessages();
    let updatedItem: AdminMessage | null = null;
    const updated = all.map((m) => {
      if (m.id === id) {
        updatedItem = { ...m, ...updates };
        return updatedItem;
      }
      return m;
    });
    writeStorage(KEYS.MESSAGES, updated);
    return updatedItem;
  },
  updateMessageStatus(id: string, status: MessageStatus): void {
    const all = this.getMessages();
    const updated = all.map((m) => (m.id === id ? { ...m, status } : m));
    writeStorage(KEYS.MESSAGES, updated);
  },
  deleteMessage(id: string): void {
    const all = this.getMessages().filter((m) => m.id !== id);
    writeStorage(KEYS.MESSAGES, all);
  },

  // --- BUSINESS SETTINGS ---
  getBusinessSettings(): AdminBusinessSettings {
    return readStorage<AdminBusinessSettings>(KEYS.SETTINGS, INITIAL_DEMO_SETTINGS);
  },
  updateBusinessSettings(settings: Partial<AdminBusinessSettings>): AdminBusinessSettings {
    const current = this.getBusinessSettings();
    const updated = { ...current, ...settings };
    writeStorage(KEYS.SETTINGS, updated);
    return updated;
  },

  // --- RESET ALL DATA ---
  resetAllToDemoDefaults(): void {
    writeStorage(KEYS.BOOKINGS, INITIAL_DEMO_BOOKINGS);
    writeStorage(KEYS.SERVICES, INITIAL_DEMO_SERVICES);
    writeStorage(KEYS.PRICING, INITIAL_DEMO_PRICING);
    writeStorage(KEYS.GALLERY, INITIAL_DEMO_GALLERY);
    writeStorage(KEYS.REVIEWS, INITIAL_DEMO_REVIEWS);
    writeStorage(KEYS.AREAS, INITIAL_DEMO_AREAS);
    writeStorage(KEYS.FAQS, INITIAL_DEMO_FAQS);
    writeStorage(KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
    writeStorage(KEYS.SETTINGS, INITIAL_DEMO_SETTINGS);
  }
};
