import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Application, SearchFilters, ContactPurchase, CoinTransaction } from '../types';

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  contactPurchases: ContactPurchase[];
  coinTransactions: CoinTransaction[];
  searchFilters: SearchFilters;
  filteredJobs: Job[];
  loading: boolean;
  searchJobs: (filters: SearchFilters) => void;
  applyToJob: (jobId: string, message?: string) => Promise<void>;
  postJob: (jobData: Partial<Job>) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => Promise<void>;
  purchaseContact: (jobId: string) => Promise<ContactPurchase>;
  getJobsByEmployer: (employerId: string) => Job[];
  getApplicationsByJob: (jobId: string) => Application[];
  getApplicationsByJobSeeker: (jobSeekerId: string) => Application[];
  getContactPurchasesByJobSeeker: (jobSeekerId: string) => ContactPurchase[];
  hasContactAccess: (jobId: string, jobSeekerId: string) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

// Mock data focused on blue-collar jobs with masked contact info
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Shop Assistant - Fashion Store',
    description: 'Looking for a friendly shop assistant to help customers, manage inventory, and handle billing. No prior experience required - we will train you. Must be comfortable standing for long hours and have basic English communication skills.',
    category: 'retail',
    type: 'full-time',
    location: {
      address: 'Main Market Area, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 15000,
      max: 20000
    },
    requirements: ['Basic English', 'Customer Service', 'Willing to Learn'],
    employerId: '1',
    employer: {
      id: '1',
      email: 'owner@fashionhub.com',
      name: 'Ramesh Gupta',
      role: 'employer',
      phone: '+91 9876543210',
      location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400058' },
      createdAt: new Date(),
      isVerified: true,
      coins: 50,
      businessName: 'Fashion Hub Store',
      businessType: 'Retail Clothing',
      hideContactInfo: true,
      maskedBusinessName: 'Fashion H*** Store'
    },
    status: 'active',
    postedAt: new Date('2024-01-15'),
    expiresAt: new Date('2024-02-15'),
    applicationsCount: 12,
    contactCost: 3
  },
  {
    id: '2',
    title: 'Waiter/Waitress - Family Restaurant',
    description: 'Join our busy family restaurant as a waiter/waitress. Responsibilities include taking orders, serving food, and ensuring customer satisfaction. Previous restaurant experience preferred but not mandatory.',
    category: 'food-service',
    type: 'full-time',
    location: {
      address: 'Near Metro Station, Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 12000,
      max: 18000
    },
    requirements: ['Customer Service', 'Basic Hindi/English', 'Evening Availability'],
    employerId: '2',
    employer: {
      id: '2',
      email: 'contact@sharmarestaurant.com',
      name: 'Suresh Sharma',
      role: 'employer',
      phone: '+91 9876543211',
      location: { city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
      createdAt: new Date(),
      isVerified: true,
      coins: 30,
      businessName: 'Sharma Family Restaurant',
      businessType: 'Restaurant',
      hideContactInfo: true,
      maskedBusinessName: 'Sharma F*** Restaurant'
    },
    status: 'active',
    postedAt: new Date('2024-01-12'),
    expiresAt: new Date('2024-02-12'),
    applicationsCount: 8,
    contactCost: 2
  },
  {
    id: '3',
    title: 'Delivery Partner - Food Delivery',
    description: 'Flexible delivery job with good earnings. Deliver food orders to customers using your own vehicle (bike/scooter). Flexible timing - work when you want.',
    category: 'delivery',
    type: 'gig',
    location: {
      address: 'Multiple locations across Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      isRemote: false
    },
    compensation: {
      type: 'hourly',
      min: 80,
      max: 120
    },
    requirements: ['Driving License', 'Own Vehicle', 'Local Area Knowledge'],
    employerId: '3',
    employer: {
      id: '3',
      email: 'hr@quickfood.com',
      name: 'Quick Food Delivery',
      role: 'employer',
      phone: '+91 9876543212',
      location: { city: 'Delhi', state: 'Delhi', pincode: '110001' },
      createdAt: new Date(),
      isVerified: true,
      coins: 100,
      businessName: 'Quick Food Delivery',
      businessType: 'Food Delivery Service',
      hideContactInfo: true,
      maskedBusinessName: 'Quick F*** Delivery'
    },
    status: 'active',
    postedAt: new Date('2024-01-10'),
    expiresAt: new Date('2024-02-10'),
    applicationsCount: 25,
    contactCost: 4
  }
];

const mockApplications: Application[] = [];
const mockContactPurchases: ContactPurchase[] = [];
const mockCoinTransactions: CoinTransaction[] = [];

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [contactPurchases, setContactPurchases] = useState<ContactPurchase[]>(mockContactPurchases);
  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>(mockCoinTransactions);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [loading, setLoading] = useState(false);

  const filteredJobs = jobs.filter(job => {
    if (searchFilters.keyword && !job.title.toLowerCase().includes(searchFilters.keyword.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchFilters.keyword.toLowerCase())) {
      return false;
    }
    if (searchFilters.location && !job.location.city.toLowerCase().includes(searchFilters.location.toLowerCase())) {
      return false;
    }
    if (searchFilters.category && job.category !== searchFilters.category) {
      return false;
    }
    if (searchFilters.type && job.type !== searchFilters.type) {
      return false;
    }
    return true;
  });

  const searchJobs = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const applyToJob = async (jobId: string, message?: string) => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        const newApplication: Application = {
          id: Math.random().toString(36).substr(2, 9),
          jobId,
          jobSeekerId: '2', // Mock current user ID
          status: 'applied',
          appliedAt: new Date(),
          message,
          job,
          jobSeeker: {
            id: '2',
            email: 'priya.worker@gmail.com',
            name: 'Priya Sharma',
            role: 'jobseeker',
            phone: '+91 9876543211',
            location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400058' },
            createdAt: new Date(),
            isVerified: true,
            coins: 10,
            skills: ['Customer Service', 'Basic English', 'Retail Experience'],
            experience: '1 year in local shop',
            preferredJobTypes: ['full-time', 'part-time'],
            availability: 'Weekdays and Weekends',
            preferredCategories: ['retail', 'food-service'],
            aboutMe: 'Hardworking individual looking for stable employment in retail sector'
          }
        };
        setApplications(prev => [...prev, newApplication]);
        setJobs(prev => prev.map(job => 
          job.id === jobId ? { ...job, applicationsCount: job.applicationsCount + 1 } : job
        ));
      }
      setLoading(false);
    }, 1000);
  };

  const postJob = async (jobData: Partial<Job>) => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      const newJob: Job = {
        id: Math.random().toString(36).substr(2, 9),
        title: jobData.title || '',
        description: jobData.description || '',
        category: jobData.category || 'other',
        type: jobData.type || 'full-time',
        location: jobData.location || { address: '', city: '', state: '', pincode: '', isRemote: false },
        compensation: jobData.compensation || { type: 'negotiable' },
        requirements: jobData.requirements || [],
        employerId: '1', // Mock current user ID
        employer: {
          id: '1',
          email: 'owner@business.com',
          name: 'Business Owner',
          role: 'employer',
          phone: '+91 9876543210',
          location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
          createdAt: new Date(),
          isVerified: true,
          coins: 50,
          businessName: 'Local Business',
          businessType: 'Retail',
          hideContactInfo: true,
          maskedBusinessName: 'Local B***'
        },
        status: 'active',
        postedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        applicationsCount: 0,
        contactCost: 3
      };
      setJobs(prev => [newJob, ...prev]);
      setLoading(false);
    }, 1000);
  };

  const purchaseContact = async (jobId: string): Promise<ContactPurchase> => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) throw new Error('Job not found');

    // Mock purchase logic
    const contactPurchase: ContactPurchase = {
      id: Math.random().toString(36).substr(2, 9),
      jobSeekerId: '2', // Mock current user ID
      jobId,
      employerId: job.employerId,
      coinsSpent: job.contactCost,
      purchasedAt: new Date(),
      contactInfo: {
        phone: job.employer.phone,
        businessName: job.employer.businessName,
        address: job.location.address
      }
    };

    setContactPurchases(prev => [...prev, contactPurchase]);

    // Add coin transaction
    const transaction: CoinTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: '2',
      type: 'spend',
      amount: -job.contactCost,
      description: `Contact info for ${job.title}`,
      createdAt: new Date(),
      relatedJobId: jobId
    };

    setCoinTransactions(prev => [...prev, transaction]);

    return contactPurchase;
  };

  const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const getJobsByEmployer = (employerId: string) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const getApplicationsByJob = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const getApplicationsByJobSeeker = (jobSeekerId: string) => {
    return applications.filter(app => app.jobSeekerId === jobSeekerId);
  };

  const getContactPurchasesByJobSeeker = (jobSeekerId: string) => {
    return contactPurchases.filter(cp => cp.jobSeekerId === jobSeekerId);
  };

  const hasContactAccess = (jobId: string, jobSeekerId: string) => {
    return contactPurchases.some(cp => cp.jobId === jobId && cp.jobSeekerId === jobSeekerId);
  };

  const value: JobContextType = {
    jobs,
    applications,
    contactPurchases,
    coinTransactions,
    searchFilters,
    filteredJobs,
    loading,
    searchJobs,
    applyToJob,
    postJob,
    updateApplicationStatus,
    purchaseContact,
    getJobsByEmployer,
    getApplicationsByJob,
    getApplicationsByJobSeeker,
    getContactPurchasesByJobSeeker,
    hasContactAccess
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};