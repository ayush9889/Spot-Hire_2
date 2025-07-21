import { DynamicCoinCost, JobCategory, AdminCoinSettings } from '../types';

// Default admin settings for dynamic pricing
export const defaultAdminSettings: AdminCoinSettings = {
  baseContactCost: 5,
  locationMultipliers: {
    'Mumbai': 1.5,
    'Delhi': 1.4,
    'Bangalore': 1.3,
    'Hyderabad': 1.2,
    'Chennai': 1.1,
    'Kolkata': 1.1,
    'Pune': 1.2,
    'Ahmedabad': 1.0,
    'Jaipur': 1.0,
    'Noida': 1.3,
    'Gurgaon': 1.4,
    'Faridabad': 1.1,
    'Ghaziabad': 1.1,
    'Thane': 1.2,
    'Navi Mumbai': 1.3,
    'default': 1.0
  },
  categoryMultipliers: {
    'electricians': 1.8,
    'plumbers': 1.6,
    'delivery-logistics': 1.2,
    'housekeeping-cleaning': 1.0,
    'security-guards': 1.3,
    'cooks-chefs': 1.4,
    'office-assistants': 1.1,
    'drivers': 1.5,
    'construction-labor': 1.7,
    'beauty-wellness': 1.3,
    'healthcare-support': 1.6,
    'education-support': 1.2,
    'default': 1.0
  },
  demandThresholds: {
    low: 5,    // Less than 5 applications
    medium: 15, // 5-15 applications
    high: 15    // More than 15 applications
  },
  recencyDecay: {
    daily: 0.1,   // 10% reduction per day
    weekly: 0.05, // 5% reduction per week
    monthly: 0.02 // 2% reduction per month
  },
  earningRates: {
    referral: 10,
    dailyLogin: 2,
    profileCompletion: 5,
    review: 3
  },
  maxDailyEarnings: 50,
  coinExpiryDays: 365
};

export class DynamicCoinPricing {
  private settings: AdminCoinSettings;

  constructor(settings: AdminCoinSettings = defaultAdminSettings) {
    this.settings = settings;
  }

  /**
   * Calculate dynamic coin cost for revealing job contact info
   */
  calculateContactCost(
    job: {
      category: JobCategory;
      location: { city: string; state: string };
      applicationsCount: number;
      postedAt: Date;
    }
  ): DynamicCoinCost {
    const baseCost = this.settings.baseContactCost;
    
    // Location multiplier
    const locationMultiplier = this.getLocationMultiplier(job.location.city);
    
    // Category multiplier
    const categoryMultiplier = this.getCategoryMultiplier(job.category);
    
    // Demand multiplier based on application count
    const demandMultiplier = this.getDemandMultiplier(job.applicationsCount);
    
    // Recency multiplier based on post age
    const recencyMultiplier = this.getRecencyMultiplier(job.postedAt);
    
    // Calculate final cost
    const finalCost = Math.round(
      baseCost * locationMultiplier * categoryMultiplier * demandMultiplier * recencyMultiplier
    );
    
    return {
      baseCost,
      locationMultiplier,
      categoryMultiplier,
      demandMultiplier,
      recencyMultiplier,
      finalCost: Math.max(1, finalCost), // Minimum 1 coin
      breakdown: {
        location: this.getLocationBreakdown(job.location.city, locationMultiplier),
        category: this.getCategoryBreakdown(job.category, categoryMultiplier),
        demand: this.getDemandBreakdown(job.applicationsCount, demandMultiplier),
        recency: this.getRecencyBreakdown(job.postedAt, recencyMultiplier)
      }
    };
  }

  private getLocationMultiplier(city: string): number {
    const normalizedCity = city.toLowerCase().trim();
    return this.settings.locationMultipliers[normalizedCity] || 
           this.settings.locationMultipliers['default'] || 1.0;
  }

  private getCategoryMultiplier(category: JobCategory): number {
    return this.settings.categoryMultipliers[category] || 
           this.settings.categoryMultipliers['default'] || 1.0;
  }

  private getDemandMultiplier(applicationsCount: number): number {
    if (applicationsCount >= this.settings.demandThresholds.high) {
      return 1.5; // High demand - 50% more expensive
    } else if (applicationsCount >= this.settings.demandThresholds.medium) {
      return 1.2; // Medium demand - 20% more expensive
    } else {
      return 1.0; // Low demand - base price
    }
  }

  private getRecencyMultiplier(postedAt: Date): number {
    const now = new Date();
    const daysSincePosted = Math.floor((now.getTime() - postedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSincePosted <= 1) {
      return 1.3; // Very recent - 30% more expensive
    } else if (daysSincePosted <= 7) {
      return 1.1; // Recent - 10% more expensive
    } else if (daysSincePosted <= 30) {
      return 1.0; // Standard price
    } else if (daysSincePosted <= 90) {
      return 0.9; // Older - 10% discount
    } else {
      return 0.7; // Very old - 30% discount
    }
  }

  private getLocationBreakdown(city: string, multiplier: number): string {
    if (multiplier > 1.0) {
      return `Premium location (${city}) - ${Math.round((multiplier - 1) * 100)}% extra`;
    } else if (multiplier < 1.0) {
      return `Standard location (${city}) - ${Math.round((1 - multiplier) * 100)}% discount`;
    }
    return `Standard location (${city})`;
  }

  private getCategoryBreakdown(category: JobCategory, multiplier: number): string {
    const categoryNames: Record<JobCategory, string> = {
      'electricians': 'Electricians',
      'plumbers': 'Plumbers',
      'delivery-logistics': 'Delivery & Logistics',
      'housekeeping-cleaning': 'Housekeeping & Cleaning',
      'security-guards': 'Security Guards',
      'cooks-chefs': 'Cooks & Chefs',
      'office-assistants': 'Office Assistants',
      'drivers': 'Drivers',
      'construction-labor': 'Construction & Labor',
      'beauty-wellness': 'Beauty & Wellness',
      'healthcare-support': 'Healthcare Support',
      'education-support': 'Education Support',
      'retail': 'Retail',
      'food-service': 'Food Service',
      'hotel-hospitality': 'Hotel & Hospitality',
      'delivery': 'Delivery',
      'security': 'Security',
      'cleaning-maintenance': 'Cleaning & Maintenance',
      'construction': 'Construction',
      'domestic': 'Domestic Help',
      'admin': 'Admin & Office',
      'driving': 'Driving',
      'healthcare': 'Healthcare',
      'education': 'Education',
      'other': 'Other'
    };

    const categoryName = categoryNames[category] || category;
    
    if (multiplier > 1.0) {
      return `High-demand category (${categoryName}) - ${Math.round((multiplier - 1) * 100)}% extra`;
    } else if (multiplier < 1.0) {
      return `Standard category (${categoryName}) - ${Math.round((1 - multiplier) * 100)}% discount`;
    }
    return `Standard category (${categoryName})`;
  }

  private getDemandBreakdown(applicationsCount: number, multiplier: number): string {
    if (multiplier > 1.0) {
      return `High demand (${applicationsCount} applications) - ${Math.round((multiplier - 1) * 100)}% extra`;
    } else if (multiplier < 1.0) {
      return `Low demand (${applicationsCount} applications) - ${Math.round((1 - multiplier) * 100)}% discount`;
    }
    return `Moderate demand (${applicationsCount} applications)`;
  }

  private getRecencyBreakdown(postedAt: Date, multiplier: number): string {
    const now = new Date();
    const daysSincePosted = Math.floor((now.getTime() - postedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (multiplier > 1.0) {
      return `Recently posted (${daysSincePosted} days ago) - ${Math.round((multiplier - 1) * 100)}% extra`;
    } else if (multiplier < 1.0) {
      return `Older post (${daysSincePosted} days ago) - ${Math.round((1 - multiplier) * 100)}% discount`;
    }
    return `Standard recency (${daysSincePosted} days ago)`;
  }

  /**
   * Update admin settings
   */
  updateSettings(newSettings: Partial<AdminCoinSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  /**
   * Get current settings
   */
  getSettings(): AdminCoinSettings {
    return { ...this.settings };
  }

  /**
   * Calculate potential earnings for different activities
   */
  calculatePotentialEarnings(activity: keyof AdminCoinSettings['earningRates']): number {
    return this.settings.earningRates[activity] || 0;
  }

  /**
   * Check if daily earning limit is reached
   */
  isDailyEarningLimitReached(todayEarnings: number): boolean {
    return todayEarnings >= this.settings.maxDailyEarnings;
  }
}

// Export singleton instance
export const dynamicCoinPricing = new DynamicCoinPricing(); 