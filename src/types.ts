export type UserRole = 'member' | 'trainer' | 'admin' | 'guest';

export type ViewMode = 
  | 'home'
  | 'memberships'
  | 'locations'
  | 'schedule'
  | 'trainers'
  | 'store'
  | 'community'
  | 'dashboard'
  | 'scan-pass';

export type MembershipTierId = 'day_pass' | 'kinetic_pro' | 'black_tier' | 'elite_vip';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tier: MembershipTierId;
  avatar: string;
  qrCodeId: string;
  membershipActive: boolean;
  joinedDate: string;
  stats: {
    workoutsCompleted: number;
    totalVolumeKg: number;
    streakDays: number;
    caloriesBurned: number;
    rank: string;
  };
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  tempo?: string;
  formNotes: string;
  targetMuscle: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: WorkoutExercise[];
  cardioFinisher?: string;
}

export interface AIWorkoutPlan {
  title: string;
  goal: string;
  level: string;
  split: string;
  weeklyOverview: string;
  days: WorkoutDay[];
  recoveryTips: string[];
}

export interface MealItem {
  mealName: string;
  time: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  description: string;
  ingredients: string[];
}

export interface AIDietPlan {
  title: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  hydrationLiters: number;
  meals: MealItem[];
  supplementStack: string[];
}

export interface AIFormAnalysis {
  exercise: string;
  overallScore: number; // 0-100
  status: 'OPTIMAL' | 'GOOD' | 'NEEDS_CORRECTION' | 'INJURY_RISK';
  keyCritiques: string[];
  jointAlignmentNotes: string;
  correctiveDrills: string[];
}

export interface GymLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  image: string;
  rating: number;
  liveCapacityPercent: number;
  amenities: string[];
  hours: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  avatar: string;
  rating: number;
  experienceYears: number;
  availableDays: string[];
}

export interface ClassSession {
  id: string;
  title: string;
  trainerName: string;
  trainerAvatar: string;
  locationName: string;
  category: 'HYPERTROPHY' | 'HIIT & METCON' | 'OLYMPIC LIFTING' | 'CRYO & RECOVERY' | 'BOXING & POWER';
  time: string;
  date: string;
  durationMinutes: number;
  spotsLeft: number;
  maxCapacity: number;
  intensity: 'High' | 'Extreme' | 'Moderate';
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'Supplements' | 'Apparel' | 'Gear' | 'Tech';
  price: number;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: StoreItem;
  quantity: number;
  size?: string;
  flavor?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorTier: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  prBadge?: string;
  likedByMe?: boolean;
}
