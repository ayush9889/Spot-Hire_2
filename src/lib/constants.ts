export const APP_CONFIG = {
  name: 'Spot Hire',
  description: 'Find Local Jobs & Hire Staff',
  version: '1.0.0',
  supportEmail: 'support@spothire.com',
  supportPhone: '+91 9876543210',
} as const;

export const COIN_CONFIG = {
  value: 1, // 1 coin = ₹1
  welcomeBonus: {
    jobseeker: 5,
    employer: 20,
  },
  contactCosts: {
    min: 2,
    max: 5,
    default: 3,
  },
  packages: [
    { coins: 10, price: 10, bonus: 0 },
    { coins: 50, price: 45, bonus: 5 },
    { coins: 100, price: 85, bonus: 15 },
    { coins: 500, price: 400, bonus: 100 },
  ],
} as const;

export const JOB_CATEGORIES = [
  { value: 'retail', label: 'Retail & Sales', icon: '🛍️' },
  { value: 'food-service', label: 'Food Service', icon: '🍽️' },
  { value: 'hotel-hospitality', label: 'Hotel & Hospitality', icon: '🏨' },
  { value: 'delivery', label: 'Delivery & Logistics', icon: '🚚' },
  { value: 'security', label: 'Security & Safety', icon: '🛡️' },
  { value: 'cleaning-maintenance', label: 'Cleaning & Maintenance', icon: '🧹' },
  { value: 'beauty-wellness', label: 'Beauty & Wellness', icon: '💄' },
  { value: 'construction', label: 'Construction & Labor', icon: '🏗️' },
  { value: 'domestic', label: 'Domestic Help', icon: '🏠' },
  { value: 'admin', label: 'Admin & Office', icon: '📋' },
  { value: 'driving', label: 'Driving', icon: '🚗' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'other', label: 'Other', icon: '💼' },
] as const;

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time', color: 'bg-green-100 text-green-800' },
  { value: 'part-time', label: 'Part Time', color: 'bg-blue-100 text-blue-800' },
  { value: 'gig', label: 'Gig Work', color: 'bg-purple-100 text-purple-800' },
  { value: 'temporary', label: 'Temporary', color: 'bg-yellow-100 text-yellow-800' },
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Jammu and Kashmir', 'Ladakh',
] as const;

export const COMPENSATION_TYPES = [
  { value: 'hourly', label: 'Per Hour' },
  { value: 'daily', label: 'Per Day' },
  { value: 'monthly', label: 'Per Month' },
  { value: 'negotiable', label: 'Negotiable' },
] as const;

export const APPLICATION_STATUSES = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  { value: 'viewed', label: 'Viewed', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'shortlisted', label: 'Shortlisted', color: 'bg-green-100 text-green-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  { value: 'hired', label: 'Hired', color: 'bg-emerald-100 text-emerald-800' },
] as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  jobs: '/jobs',
  profile: '/profile',
  settings: '/settings',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms',
} as const;