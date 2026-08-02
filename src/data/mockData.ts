import { GymLocation, Trainer, ClassSession, StoreItem, CommunityPost, MembershipTierId } from '../types';

export interface MembershipPlan {
  id: MembershipTierId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'day_pass',
    name: 'GLOBAL DAY PASS',
    tagline: 'Single-day keyless VIP access to any flagship Kinetic club',
    priceMonthly: 45,
    priceAnnualMonthly: 45,
    features: [
      'Full 24-hour access to any flagship club',
      'Hyper-focused recovery suite & cold plunge',
      'AI Form Analyzer 1-day pass',
      'Complimentary Kinetic Hydro-Electrolyte bar',
      'Smart locker & high-speed Wi-Fi access'
    ]
  },
  {
    id: 'kinetic_pro',
    name: 'KINETIC PRO',
    tagline: 'Our premier performance tier for dedicated lifters and athletes',
    priceMonthly: 219,
    priceAnnualMonthly: 189,
    badge: 'MOST POPULAR',
    isPopular: true,
    features: [
      'Unlimited 24/7 access to your primary home club',
      'Unlimited AI Workout & Nutrition Generation',
      'Full biometric QR digital keyless entry',
      '4 Master Trainer guided sessions per month',
      'Cryotherapy & infrared sauna unlimited access',
      'Priority booking for Kinetic HIIT & Power classes',
      '15% discount on Kinetic Nutrition & Apparel'
    ]
  },
  {
    id: 'black_tier',
    name: 'BLACK TIER VIP',
    tagline: 'Unrestricted passport to every Kinetic club worldwide',
    priceMonthly: 349,
    priceAnnualMonthly: 299,
    badge: 'ULTRA PREMIUM',
    features: [
      'Global passport to all NYC, London, Tokyo & Dubai locations',
      'Dedicated 1-on-1 Elite Master Trainer & Nutritionist',
      'Unlimited AI Form & Pose Scanner + Video Critique',
      'Private VIP Locker, Garment Laundry & Towel Service',
      'Complimentary post-workout Hydro-Protein Shake daily',
      'Bring up to 3 guests per month',
      'Exclusive Kinetic VIP Lounge & Co-Working Access'
    ]
  },
  {
    id: 'elite_vip',
    name: 'ELITE EXECUTIVE',
    tagline: 'White-glove concierge fitness with private biometric suites',
    priceMonthly: 599,
    priceAnnualMonthly: 499,
    badge: 'INVITATION ONLY',
    features: [
      'Private biometric training suite reservations',
      'Custom hormonal, bloodwork & VO2 Max AI tracking',
      'Unlimited guest passes for business associates',
      'Chauffeur pickup to home club within 15 miles',
      'Personalized Kinetic custom-embroidered gear kit',
      '24/7 Concierge line & direct Master Trainer chat'
    ]
  }
];

export const GYM_LOCATIONS: GymLocation[] = [
  {
    id: 'soho-nyc',
    name: 'KINETIC SOHO — NEW YORK',
    city: 'New York City',
    address: '520 Broadway, SoHo, NY 10012',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    rating: 4.98,
    liveCapacityPercent: 42,
    hours: '24/7 Keyless Access',
    phone: '+1 (212) 890-9090',
    amenities: [
      'Eleiko Olympic Lifting Platforms',
      'Cryotherapy & Contrast Plunges',
      'InBody 770 Body Composition',
      'Biometric AI Locker Room',
      'Hydration & Protein Bar'
    ],
    coordinates: { lat: 40.7233, lng: -73.9982 }
  },
  {
    id: 'mayfair-london',
    name: 'KINETIC MAYFAIR — LONDON',
    city: 'London',
    address: '14 Berkeley Square, Mayfair, London W1J 6EB',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200',
    rating: 4.96,
    liveCapacityPercent: 68,
    hours: '24/7 Keyless Access',
    phone: '+44 20 7946 0912',
    amenities: [
      'Custom Matte Black Power Racks',
      'Infrared Sauna & Steam Rooms',
      'Hyperice Percussion Lounge',
      'Rooftop Kinetic Sprint Track',
      'Private Training Suites'
    ],
    coordinates: { lat: 51.509, lng: -0.145 }
  },
  {
    id: 'shibuya-tokyo',
    name: 'KINETIC SHIBUYA — TOKYO',
    city: 'Tokyo',
    address: '1-19-11 Jinnan, Shibuya-ku, Tokyo 150-0041',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    rating: 4.99,
    liveCapacityPercent: 35,
    hours: '24/7 Keyless Access',
    phone: '+81 3 5456 8800',
    amenities: [
      'Keiser Pneumatic Functional Trainers',
      'Oxygen Therapy Lounge',
      'Biometric Scan Speed Gates',
      'Japanese Zen Hydrotherapy',
      'Cold Brew & Electrolyte Drafts'
    ],
    coordinates: { lat: 35.662, lng: 139.7038 }
  },
  {
    id: 'dubai-downtown',
    name: 'KINETIC DOWNTOWN — DUBAI',
    city: 'Dubai',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200',
    rating: 4.97,
    liveCapacityPercent: 55,
    hours: '24/7 Keyless Access',
    phone: '+971 4 366 1111',
    amenities: [
      'Indoor Sprint Track & Turf',
      'Cryo Chambers (-110°C)',
      'Private VIP Valet Parking',
      'Custom Hammer Strength Line',
      'Metabolic Testing Lab'
    ],
    coordinates: { lat: 25.1972, lng: 55.2744 }
  }
];

export const MASTER_TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Marcus Vance',
    specialty: 'Hypertrophy & Olympic Powerlifting',
    bio: 'Former IFBB Pro and Strength Conditioning Coach for Elite Athletes. 12+ years optimizing human biomechanics.',
    avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
    rating: 4.99,
    experienceYears: 12,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: 'trainer-2',
    name: 'Elena Rostova',
    specialty: 'Kinetic HIIT, Athletic Speed & Mobility',
    bio: 'Ex-Olympic track sprinter with deep expertise in VO2 max expansion, neuromuscular speed, and injury-proofing.',
    avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600',
    rating: 4.98,
    experienceYears: 9,
    availableDays: ['Tue', 'Thu', 'Sat', 'Sun']
  },
  {
    id: 'trainer-3',
    name: 'Darius Thorne',
    specialty: 'Combat Conditioning & Functional Strength',
    bio: 'Pro MMA striking specialist and certified strength coach. Master of power output and anaerobic capacity.',
    avatar: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&q=80&w=600',
    rating: 4.95,
    experienceYears: 11,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri']
  }
];

export const SCHEDULED_CLASSES: ClassSession[] = [
  {
    id: 'class-1',
    title: 'KINETIC HYPERTROPHY — PUSH METCON',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300',
    locationName: 'SoHo NYC',
    category: 'HYPERTROPHY',
    time: '07:00 AM - 08:00 AM',
    date: 'Today',
    durationMinutes: 60,
    spotsLeft: 3,
    maxCapacity: 12,
    intensity: 'Extreme'
  },
  {
    id: 'class-2',
    title: 'NEUROMUSCULAR SPEED & SPRINT TURF',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300',
    locationName: 'Mayfair London',
    category: 'HIIT & METCON',
    time: '09:00 AM - 10:00 AM',
    date: 'Today',
    durationMinutes: 60,
    spotsLeft: 5,
    maxCapacity: 15,
    intensity: 'High'
  },
  {
    id: 'class-3',
    title: 'OLYMPIC BARBELL MECHANICS & CLEAN',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300',
    locationName: 'Shibuya Tokyo',
    category: 'OLYMPIC LIFTING',
    time: '05:30 PM - 06:45 PM',
    date: 'Today',
    durationMinutes: 75,
    spotsLeft: 2,
    maxCapacity: 10,
    intensity: 'Extreme'
  },
  {
    id: 'class-4',
    title: 'INFRARED CRYO RECOVERY & MOBILITY',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=300',
    locationName: 'Downtown Dubai',
    category: 'CRYO & RECOVERY',
    time: '07:00 PM - 08:00 PM',
    date: 'Today',
    durationMinutes: 60,
    spotsLeft: 6,
    maxCapacity: 12,
    intensity: 'Moderate'
  }
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'supp-1',
    name: 'KINETIC ISO-ZERO PROTEIN (CHOCOLATE TRUFFLE)',
    category: 'Supplements',
    price: 79,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800',
    description: '100% Cold-Filtered Whey Protein Isolate. 28g Pure Protein, 0g Sugar, infused with AstraGin for 99% absorption.',
    inStock: true,
    featured: true
  },
  {
    id: 'supp-2',
    name: 'NEON IGNITE PRE-WORKOUT FORMULA',
    category: 'Supplements',
    price: 64,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=800',
    description: 'High-stimulant vasodilation matrix. 8000mg L-Citrulline, 3200mg Beta-Alanine & Alpha-GPC for laser Focus.',
    inStock: true,
    featured: true
  },
  {
    id: 'gear-1',
    name: 'HEAVYWEIGHT OVERSIZED PULLOVER HOODIE (BLACK/LIME)',
    category: 'Apparel',
    price: 110,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    description: '480GSM organic French Terry Cotton. Custom drop shoulder design with high-density neon lime Kinetic branding.',
    inStock: true,
    featured: true
  },
  {
    id: 'gear-2',
    name: '10MM LEVER LIFTING BELT (MATTE BLACK)',
    category: 'Gear',
    price: 145,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    description: 'Competition grade genuine vegetable-tanned leather. Steel alloy quick-release lever mechanism for maximum intra-abdominal pressure.',
    inStock: true,
    featured: false
  },
  {
    id: 'tech-1',
    name: 'KINETIC PULSE BIOMETRIC SENSING BAND',
    category: 'Tech',
    price: 199,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800',
    description: 'Sub-second optical heart rate, strain meter & recovery score sensor. Direct syncing with Kinetic AI Gym Stations.',
    inStock: true,
    featured: true
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Alex Mercer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    authorTier: 'BLACK TIER VIP',
    timestamp: '2 hours ago',
    content: 'Hit a lifelong milestone today at Kinetic SoHo NYC! 260kg (573 lbs) Deadlift for a crisp double. The Eleiko platform quality is unmatched!',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    likes: 84,
    commentsCount: 14,
    prBadge: 'NEW PR: 260KG DEADLIFT',
    likedByMe: false
  },
  {
    id: 'post-2',
    authorName: 'Dr. Sophia Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    authorTier: 'KINETIC PRO',
    timestamp: '5 hours ago',
    content: 'The new AI Form Analyzer caught a slight hip shift in my 3rd rep during squat testing. Made a 2-inch stance adjustment and completed 140kg flawlessly. Game changer.',
    likes: 52,
    commentsCount: 8,
    likedByMe: true
  }
];
