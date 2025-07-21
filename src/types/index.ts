export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employer' | 'jobseeker';
  phone: string;
  location: {
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: Date;
  isVerified: boolean;
  coins: number; // New field for coin balance
}

export interface Employer extends User {
  businessName: string;
  businessType: string;
  website?: string;
  description?: string;
  logo?: string;
  hideContactInfo: boolean; // New field to hide direct contact info
  maskedBusinessName: string; // Masked version of business name
}

export interface JobSeeker extends User {
  skills: string[];
  experience: string;
  preferredJobTypes: JobType[];
  availability: string;
  preferredCategories: JobCategory[];
  profilePhoto?: string;
  aboutMe?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  type: JobType;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    isRemote: boolean;
  };
  compensation: {
    type: 'hourly' | 'daily' | 'monthly' | 'negotiable';
    min?: number;
    max?: number;
  };
  requirements: string[];
  employerId: string;
  employer: Employer;
  status: 'active' | 'paused' | 'expired' | 'filled';
  postedAt: Date;
  expiresAt: Date;
  applicationsCount: number;
  contactCost: number; // Cost in coins to contact employer
}

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: 'applied' | 'viewed' | 'shortlisted' | 'contacted' | 'rejected' | 'hired';
  appliedAt: Date;
  message?: string;
  job: Job;
  jobSeeker: JobSeeker;
}

export interface ContactPurchase {
  id: string;
  jobSeekerId: string;
  jobId: string;
  employerId: string;
  coinsSpent: number;
  purchasedAt: Date;
  contactInfo: {
    phone: string;
    businessName: string;
    address: string;
  };
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: 'purchase' | 'spend' | 'refund' | 'bonus';
  amount: number;
  description: string;
  createdAt: Date;
  relatedJobId?: string;
}

// Credit System Types
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  features: string[];
  savings?: string;
}

export interface CreditTransaction {
  id: string;
  employerId: string;
  type: 'purchase' | 'deduct' | 'refund' | 'bonus' | 'signup_bonus';
  amount: number;
  description: string;
  reference?: string; // Payment ID, Worker ID, etc.
  timestamp: Date;
  balanceAfter: number;
}

export interface ContactRevealLog {
  id: string;
  employerId: string;
  workerId: string;
  workerName: string;
  workerSkill: string;
  creditsUsed: number;
  contactInfo: {
    phone: string;
    whatsapp: string;
    alternatePhone?: string;
  };
  timestamp: Date;
}

export interface EmployerCreditWallet {
  employerId: string;
  balance: number;
  totalPurchased: number;
  totalSpent: number;
  lastUpdated: Date;
  transactions: CreditTransaction[];
  revealHistory: ContactRevealLog[];
}

export interface PaymentRequest {
  packId: string;
  amount: number;
  credits: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  employerId: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  paymentId?: string;
  error?: string;
  creditsAdded?: number;
  newBalance?: number;
}

export type JobCategory = 
  | 'retail'
  | 'food-service'
  | 'hotel-hospitality'
  | 'delivery'
  | 'security'
  | 'cleaning-maintenance'
  | 'beauty-wellness'
  | 'construction'
  | 'domestic'
  | 'admin'
  | 'driving'
  | 'healthcare'
  | 'education'
  | 'other';

export type JobType = 'full-time' | 'part-time' | 'gig' | 'temporary';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface SearchFilters {
  keyword?: string;
  location?: string;
  category?: JobCategory;
  type?: JobType;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: 'newest' | 'closest' | 'salary';
}

// Worker interface for featured workers display
export interface Worker {
  id: string;
  name: string;
  skill: string;
  location: string;
  experience: string;
  rating: number;
  totalRatings: number;
  profileImage: string;
  isVerified: boolean;
  availability: string;
  hourlyRate: string;
}