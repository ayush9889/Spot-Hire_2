import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CoinWallet, 
  CoinTransaction, 
  ContactReveal, 
  CoinEarning,
  DynamicCoinCost,
  PaymentGateway,
  Job,
  User
} from '../types';
import { useAuth } from './AuthContext';
import { dynamicCoinPricing } from '../lib/dynamicCoinPricing';

interface CoinWalletContextType {
  wallet: CoinWallet | null;
  loading: boolean;
  error: string | null;
  
  // Core operations
  purchaseCoins: (amount: number, paymentMethod: string) => Promise<boolean>;
  revealJobContact: (job: Job) => Promise<ContactReveal | null>;
  earnCoins: (type: CoinEarning['type'], description?: string) => Promise<boolean>;
  
  // Getters
  getBalance: () => number;
  getTransactions: () => CoinTransaction[];
  getContactReveals: () => ContactReveal[];
  getEarnings: () => CoinEarning[];
  getTodayEarnings: () => number;
  
  // Utilities
  hasEnoughCoins: (requiredCoins: number) => boolean;
  calculateContactCost: (job: Job) => DynamicCoinCost;
  canEarnToday: (type: CoinEarning['type']) => boolean;
  
  // Payment
  getPaymentGateways: () => PaymentGateway[];
  processPayment: (amount: number, gateway: string) => Promise<boolean>;
  
  // Refresh
  refreshWallet: () => Promise<void>;
}

const CoinWalletContext = createContext<CoinWalletContextType | undefined>(undefined);

export const useCoinWallet = () => {
  const context = useContext(CoinWalletContext);
  if (!context) {
    throw new Error('useCoinWallet must be used within a CoinWalletProvider');
  }
  return context;
};

interface CoinWalletProviderProps {
  children: ReactNode;
}

export const CoinWalletProvider: React.FC<CoinWalletProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wallet, setWallet] = useState<CoinWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize wallet when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      initializeWallet();
    } else {
      setWallet(null);
    }
  }, [isAuthenticated, user]);

  const initializeWallet = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const walletData = await mockGetWallet(user.id);
      setWallet(walletData);
      setError(null);
    } catch (err) {
      setError('Failed to load coin wallet');
      console.error('Wallet initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const purchaseCoins = async (amount: number, paymentMethod: string): Promise<boolean> => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const success = await processPayment(amount, paymentMethod);
      
      if (success) {
        // Add coins to wallet
        const transaction: CoinTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          type: 'purchase',
          amount: amount,
          description: `Purchased ${amount} coins via ${paymentMethod}`,
          createdAt: new Date()
        };

        setWallet(prev => prev ? {
          ...prev,
          balance: prev.balance + amount,
          totalPurchased: prev.totalPurchased + amount,
          transactions: [transaction, ...prev.transactions],
          lastUpdated: new Date()
        } : null);

        return true;
      }
      return false;
    } catch (err) {
      setError('Payment failed');
      console.error('Purchase error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revealJobContact = async (job: Job): Promise<ContactReveal | null> => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const dynamicCost = calculateContactCost(job);
    
    if (!hasEnoughCoins(dynamicCost.finalCost)) {
      throw new Error('Insufficient coins');
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call to reveal contact
      const contactInfo = await mockRevealJobContact(job.id, user.id);
      
      const contactReveal: ContactReveal = {
        id: Math.random().toString(36).substr(2, 9),
        jobSeekerId: user.id,
        jobId: job.id,
        employerId: job.employerId,
        coinsSpent: dynamicCost.finalCost,
        dynamicCost,
        contactInfo,
        timestamp: new Date()
      };

      // Deduct coins and add to reveal history
      const transaction: CoinTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        type: 'spend',
        amount: -dynamicCost.finalCost,
        description: `Revealed contact for ${job.title}`,
        createdAt: new Date(),
        relatedJobId: job.id
      };

      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance - dynamicCost.finalCost,
        totalSpent: prev.totalSpent + dynamicCost.finalCost,
        transactions: [transaction, ...prev.transactions],
        contactReveals: [contactReveal, ...prev.contactReveals],
        lastUpdated: new Date()
      } : null);

      return contactReveal;
    } catch (err) {
      setError('Failed to reveal contact');
      console.error('Contact reveal error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const earnCoins = async (type: CoinEarning['type'], description?: string): Promise<boolean> => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    if (!canEarnToday(type)) {
      throw new Error('Daily earning limit reached for this activity');
    }

    const amount = dynamicCoinPricing.calculatePotentialEarnings(type);
    if (amount <= 0) {
      throw new Error('Invalid earning type');
    }

    setLoading(true);
    setError(null);

    try {
      const earning: CoinEarning = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        type,
        amount,
        description: description || `Earned ${amount} coins for ${type}`,
        timestamp: new Date(),
        status: 'credited'
      };

      const transaction: CoinTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        type: 'bonus',
        amount: amount,
        description: description || `Earned ${amount} coins for ${type}`,
        createdAt: new Date()
      };

      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance + amount,
        totalEarned: prev.totalEarned + amount,
        transactions: [transaction, ...prev.transactions],
        lastUpdated: new Date()
      } : null);

      return true;
    } catch (err) {
      setError('Failed to earn coins');
      console.error('Earning error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBalance = (): number => {
    return wallet?.balance || 0;
  };

  const getTransactions = (): CoinTransaction[] => {
    return wallet?.transactions || [];
  };

  const getContactReveals = (): ContactReveal[] => {
    return wallet?.contactReveals || [];
  };

  const getEarnings = (): CoinEarning[] => {
    // This would come from a separate earnings table in a real app
    return [];
  };

  const getTodayEarnings = (): number => {
    const today = new Date().toDateString();
    return getTransactions()
      .filter(t => t.type === 'bonus' && t.createdAt.toDateString() === today)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const hasEnoughCoins = (requiredCoins: number): boolean => {
    return getBalance() >= requiredCoins;
  };

  const calculateContactCost = (job: Job): DynamicCoinCost => {
    return dynamicCoinPricing.calculateContactCost({
      category: job.category,
      location: job.location,
      applicationsCount: job.applicationsCount,
      postedAt: job.postedAt
    });
  };

  const canEarnToday = (type: CoinEarning['type']): boolean => {
    const todayEarnings = getTodayEarnings();
    return !dynamicCoinPricing.isDailyEarningLimitReached(todayEarnings);
  };

  const getPaymentGateways = (): PaymentGateway[] => {
    return [
      {
        id: 'razorpay',
        name: 'Razorpay',
        icon: '💳',
        isActive: true
      },
      {
        id: 'stripe',
        name: 'Stripe',
        icon: '💳',
        isActive: true
      },
      {
        id: 'paytm',
        name: 'Paytm',
        icon: '📱',
        isActive: true
      }
    ];
  };

  const processPayment = async (amount: number, gateway: string): Promise<boolean> => {
    // Mock payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        resolve(Math.random() > 0.1);
      }, 2000);
    });
  };

  const refreshWallet = async (): Promise<void> => {
    await initializeWallet();
  };

  const value: CoinWalletContextType = {
    wallet,
    loading,
    error,
    purchaseCoins,
    revealJobContact,
    earnCoins,
    getBalance,
    getTransactions,
    getContactReveals,
    getEarnings,
    getTodayEarnings,
    hasEnoughCoins,
    calculateContactCost,
    canEarnToday,
    getPaymentGateways,
    processPayment,
    refreshWallet
  };

  return (
    <CoinWalletContext.Provider value={value}>
      {children}
    </CoinWalletContext.Provider>
  );
};

// Mock API functions
const mockGetWallet = async (userId: string): Promise<CoinWallet> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    userId,
    balance: 25, // Start with 25 coins
    totalEarned: 15,
    totalSpent: 10,
    totalPurchased: 20,
    lastUpdated: new Date(),
    transactions: [
      {
        id: '1',
        userId,
        type: 'purchase',
        amount: 20,
        description: 'Purchased 20 coins via Razorpay',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        userId,
        type: 'bonus',
        amount: 10,
        description: 'Signup bonus',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '3',
        userId,
        type: 'bonus',
        amount: 5,
        description: 'Daily login bonus',
        createdAt: new Date('2024-01-16')
      },
      {
        id: '4',
        userId,
        type: 'spend',
        amount: -8,
        description: 'Revealed contact for Electrician job',
        createdAt: new Date('2024-01-17'),
        relatedJobId: 'elec-1'
      },
      {
        id: '5',
        userId,
        type: 'spend',
        amount: -2,
        description: 'Revealed contact for Delivery job',
        createdAt: new Date('2024-01-18'),
        relatedJobId: 'delivery-1'
      }
    ],
    contactReveals: [
      {
        id: '1',
        jobSeekerId: userId,
        jobId: 'elec-1',
        employerId: 'emp-1',
        coinsSpent: 8,
        dynamicCost: {
          baseCost: 5,
          locationMultiplier: 1.5,
          categoryMultiplier: 1.8,
          demandMultiplier: 1.0,
          recencyMultiplier: 1.0,
          finalCost: 8,
          breakdown: {
            location: 'Premium location (Mumbai) - 50% extra',
            category: 'High-demand category (Electricians) - 80% extra',
            demand: 'Moderate demand (15 applications)',
            recency: 'Standard recency (5 days ago)'
          }
        },
        contactInfo: {
          phone: '+91 9876543210',
          email: 'contact@electricalworks.com',
          businessName: 'Electrical Works & Services',
          address: 'Andheri West, Mumbai'
        },
        timestamp: new Date('2024-01-17')
      }
    ]
  };
};

const mockRevealJobContact = async (jobId: string, userId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock contact info based on job
  return {
    phone: '+91 9876543210',
    email: 'contact@example.com',
    businessName: 'Sample Business',
    address: 'Sample Address'
  };
}; 