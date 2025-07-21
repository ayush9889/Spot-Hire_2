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
  // Electricians
  {
    id: 'elec-1',
    title: 'Electrician - Residential & Commercial',
    description: 'Experienced electrician needed for residential and commercial electrical work. Must have 2+ years experience in wiring, installation, and maintenance. Own tools required.',
    category: 'electricians',
    type: 'full-time',
    location: {
      address: 'Andheri West, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 18000,
      max: 25000
    },
    requirements: ['Electrical Certification', '2+ Years Experience', 'Own Tools', 'Hindi/English'],
    employerId: 'emp-1',
    employer: {
      id: 'emp-1',
      email: 'contact@electricalworks.com',
      name: 'Rajesh Kumar',
      role: 'employer',
      phone: '+91 9876543210',
      location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400058' },
      createdAt: new Date(),
      isVerified: true,
      coins: 50,
      businessName: 'Electrical Works & Services',
      businessType: 'Electrical Services',
      hideContactInfo: true,
      maskedBusinessName: 'Electrical W*** & Services'
    },
    status: 'active',
    postedAt: new Date('2024-01-20'),
    expiresAt: new Date('2024-02-20'),
    applicationsCount: 15,
    contactCost: 3
  },
  {
    id: 'elec-2',
    title: 'Junior Electrician - Training Provided',
    description: 'Looking for a junior electrician with basic knowledge. We will provide training and certification. Must be willing to learn and work hard.',
    category: 'electricians',
    type: 'full-time',
    location: {
      address: 'Thane West, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400601',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 12000,
      max: 16000
    },
    requirements: ['Basic Electrical Knowledge', 'Willing to Learn', '10th Pass', 'Hindi/English'],
    employerId: 'emp-2',
    employer: {
      id: 'emp-2',
      email: 'info@thaneelectrical.com',
      name: 'Amit Patel',
      role: 'employer',
      phone: '+91 9876543211',
      location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400601' },
      createdAt: new Date(),
      isVerified: true,
      coins: 30,
      businessName: 'Thane Electrical Services',
      businessType: 'Electrical Services',
      hideContactInfo: true,
      maskedBusinessName: 'Thane E*** Services'
    },
    status: 'active',
    postedAt: new Date('2024-01-18'),
    expiresAt: new Date('2024-02-18'),
    applicationsCount: 8,
    contactCost: 2
  },
  // Plumbers
  {
    id: 'plumb-1',
    title: 'Experienced Plumber - Construction Site',
    description: 'Experienced plumber needed for large construction project. Must have 3+ years experience in residential plumbing. Good salary and benefits.',
    category: 'plumbers',
    type: 'full-time',
    location: {
      address: 'Noida Sector 62, UP',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 20000,
      max: 28000
    },
    requirements: ['3+ Years Experience', 'Construction Knowledge', 'Own Tools', 'Hindi/English'],
    employerId: 'emp-3',
    employer: {
      id: 'emp-3',
      email: 'hr@constructionco.com',
      name: 'Suresh Verma',
      role: 'employer',
      phone: '+91 9876543212',
      location: { city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
      createdAt: new Date(),
      isVerified: true,
      coins: 40,
      businessName: 'ABC Construction Company',
      businessType: 'Construction',
      hideContactInfo: true,
      maskedBusinessName: 'ABC C*** Company'
    },
    status: 'active',
    postedAt: new Date('2024-01-19'),
    expiresAt: new Date('2024-02-19'),
    applicationsCount: 12,
    contactCost: 3
  },
  // Delivery & Logistics
  {
    id: 'delivery-1',
    title: 'Delivery Partner - Food Delivery',
    description: 'Flexible delivery job with good earnings. Deliver food orders to customers using your own vehicle (bike/scooter). Flexible timing - work when you want.',
    category: 'delivery-logistics',
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
    requirements: ['Own Vehicle', 'Valid License', 'Smartphone', 'Hindi/English'],
    employerId: 'emp-4',
    employer: {
      id: 'emp-4',
      email: 'partners@fooddelivery.com',
      name: 'Food Delivery Co',
      role: 'employer',
      phone: '+91 9876543213',
      location: { city: 'Delhi', state: 'Delhi', pincode: '110001' },
      createdAt: new Date(),
      isVerified: true,
      coins: 25,
      businessName: 'Quick Food Delivery',
      businessType: 'Food Delivery',
      hideContactInfo: true,
      maskedBusinessName: 'Quick F*** Delivery'
    },
    status: 'active',
    postedAt: new Date('2024-01-17'),
    expiresAt: new Date('2024-02-17'),
    applicationsCount: 25,
    contactCost: 2
  },
  // Housekeeping & Cleaning
  {
    id: 'clean-1',
    title: 'Housekeeper - Residential Complex',
    description: 'Looking for reliable housekeeper for residential complex. Duties include cleaning common areas, garbage collection, and basic maintenance.',
    category: 'housekeeping-cleaning',
    type: 'full-time',
    location: {
      address: 'Whitefield, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 10000,
      max: 14000
    },
    requirements: ['Reliable', 'Basic Cleaning Skills', 'Hindi/Kannada', 'Morning Shift'],
    employerId: 'emp-5',
    employer: {
      id: 'emp-5',
      email: 'admin@residentialcomplex.com',
      name: 'Residential Complex',
      role: 'employer',
      phone: '+91 9876543214',
      location: { city: 'Bangalore', state: 'Karnataka', pincode: '560066' },
      createdAt: new Date(),
      isVerified: true,
      coins: 20,
      businessName: 'Green Valley Residential Complex',
      businessType: 'Real Estate',
      hideContactInfo: true,
      maskedBusinessName: 'Green V*** Residential Complex'
    },
    status: 'active',
    postedAt: new Date('2024-01-16'),
    expiresAt: new Date('2024-02-16'),
    applicationsCount: 18,
    contactCost: 2
  },
  // Security Guards
  {
    id: 'security-1',
    title: 'Security Guard - Commercial Building',
    description: 'Experienced security guard needed for commercial building. 12-hour shifts, good salary. Must have security guard license.',
    category: 'security-guards',
    type: 'full-time',
    location: {
      address: 'Bandra Kurla Complex, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 15000,
      max: 20000
    },
    requirements: ['Security License', '2+ Years Experience', '12-Hour Shifts', 'Hindi/English'],
    employerId: 'emp-6',
    employer: {
      id: 'emp-6',
      email: 'security@commercialbuilding.com',
      name: 'Commercial Building',
      role: 'employer',
      phone: '+91 9876543215',
      location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400051' },
      createdAt: new Date(),
      isVerified: true,
      coins: 35,
      businessName: 'BKC Commercial Tower',
      businessType: 'Commercial Real Estate',
      hideContactInfo: true,
      maskedBusinessName: 'BKC C*** Tower'
    },
    status: 'active',
    postedAt: new Date('2024-01-15'),
    expiresAt: new Date('2024-02-15'),
    applicationsCount: 22,
    contactCost: 3
  },
  // Cooks & Chefs
  {
    id: 'cook-1',
    title: 'Cook - North Indian Restaurant',
    description: 'Experienced cook needed for North Indian restaurant. Must know Punjabi, Mughlai, and basic Indian cooking. Good salary and tips.',
    category: 'cooks-chefs',
    type: 'full-time',
    location: {
      address: 'Koramangala, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 18000,
      max: 25000
    },
    requirements: ['North Indian Cooking', '3+ Years Experience', 'Evening Shift', 'Hindi/English'],
    employerId: 'emp-7',
    employer: {
      id: 'emp-7',
      email: 'chef@northindianrestaurant.com',
      name: 'North Indian Restaurant',
      role: 'employer',
      phone: '+91 9876543216',
      location: { city: 'Bangalore', state: 'Karnataka', pincode: '560034' },
      createdAt: new Date(),
      isVerified: true,
      coins: 30,
      businessName: 'Punjabi Dhaba Restaurant',
      businessType: 'Restaurant',
      hideContactInfo: true,
      maskedBusinessName: 'Punjabi D*** Restaurant'
    },
    status: 'active',
    postedAt: new Date('2024-01-14'),
    expiresAt: new Date('2024-02-14'),
    applicationsCount: 16,
    contactCost: 3
  },
  // Office Assistants
  {
    id: 'office-1',
    title: 'Office Assistant - Small Business',
    description: 'Office assistant needed for small business. Duties include answering calls, data entry, filing, and basic admin work. No experience required.',
    category: 'office-assistants',
    type: 'full-time',
    location: {
      address: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560102',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 12000,
      max: 16000
    },
    requirements: ['Basic Computer Skills', 'Good Communication', '10th Pass', 'English'],
    employerId: 'emp-8',
    employer: {
      id: 'emp-8',
      email: 'admin@smallbusiness.com',
      name: 'Small Business',
      role: 'employer',
      phone: '+91 9876543217',
      location: { city: 'Bangalore', state: 'Karnataka', pincode: '560102' },
      createdAt: new Date(),
      isVerified: true,
      coins: 25,
      businessName: 'Tech Solutions Pvt Ltd',
      businessType: 'Technology',
      hideContactInfo: true,
      maskedBusinessName: 'Tech S*** Pvt Ltd'
    },
    status: 'active',
    postedAt: new Date('2024-01-13'),
    expiresAt: new Date('2024-02-13'),
    applicationsCount: 14,
    contactCost: 2
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