import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  EmployerCreditWallet, 
  CreditTransaction, 
  ContactRevealLog, 
  CreditPack, 
  PaymentRequest, 
  PaymentResponse,
  Worker 
} from '../types';
import { useAuth } from './AuthContext';

interface CreditWalletContextType {
  wallet: EmployerCreditWallet | null;
  loading: boolean;
  error: string | null;
  
  // Credit operations
  purchaseCredits: (pack: CreditPack, paymentMethod: string) => Promise<PaymentResponse>;
  revealContact: (worker: Worker) => Promise<ContactRevealLog | null>;
  
  // Getters
  getBalance: () => number;
  getTransactions: () => CreditTransaction[];
  getRevealHistory: () => ContactRevealLog[];
  
  // Utilities
  hasEnoughCredits: (requiredCredits: number) => boolean;
  refreshWallet: () => Promise<void>;
}

const CreditWalletContext = createContext<CreditWalletContextType | undefined>(undefined);

export const useCreditWallet = () => {
  const context = useContext(CreditWalletContext);
  if (!context) {
    throw new Error('useCreditWallet must be used within a CreditWalletProvider');
  }
  return context;
};

interface CreditWalletProviderProps {
  children: ReactNode;
}

export const CreditWalletProvider: React.FC<CreditWalletProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wallet, setWallet] = useState<EmployerCreditWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize wallet when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.role === 'employer') {
      initializeWallet();
    } else {
      setWallet(null);
    }
  }, [isAuthenticated, user]);

  const initializeWallet = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const walletData = await mockGetWallet(user.id);
      setWallet(walletData);
      setError(null);
    } catch (err) {
      setError('Failed to load credit wallet');
      console.error('Wallet initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const purchaseCredits = async (pack: CreditPack, paymentMethod: string): Promise<PaymentResponse> => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const paymentRequest: PaymentRequest = {
        packId: pack.id,
        amount: pack.price,
        credits: pack.credits,
        paymentMethod: paymentMethod as any,
        employerId: user.id
      };

      // Mock payment processing - replace with actual payment gateway
      const response = await mockProcessPayment(paymentRequest);
      
      if (response.success) {
        // Update wallet with new credits
        await refreshWallet();
        
        // Add transaction log
        const transaction: CreditTransaction = {
          id: `txn_${Date.now()}`,
          employerId: user.id,
          type: 'purchase',
          amount: pack.credits,
          description: `Purchased ${pack.name} pack`,
          reference: response.paymentId,
          timestamp: new Date(),
          balanceAfter: (wallet?.balance || 0) + pack.credits
        };

        // Update local state
        if (wallet) {
          setWallet({
            ...wallet,
            balance: wallet.balance + pack.credits,
            totalPurchased: wallet.totalPurchased + pack.credits,
            transactions: [transaction, ...wallet.transactions],
            lastUpdated: new Date()
          });
        }
      }

      return response;
    } catch (err) {
      const errorMessage = 'Payment processing failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const revealContact = async (worker: Worker): Promise<ContactRevealLog | null> => {
    if (!user?.id || !wallet) {
      throw new Error('User not authenticated or wallet not loaded');
    }

    if (wallet.balance < 1) {
      throw new Error('Insufficient credits');
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call to reveal contact - replace with actual API
      const contactInfo = await mockRevealContact(user.id, worker.id);
      
      // Create reveal log
      const revealLog: ContactRevealLog = {
        id: `reveal_${Date.now()}`,
        employerId: user.id,
        workerId: worker.id,
        workerName: worker.name,
        workerSkill: worker.skill,
        creditsUsed: 1,
        contactInfo,
        timestamp: new Date()
      };

      // Create deduction transaction
      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        employerId: user.id,
        type: 'deduct',
        amount: -1,
        description: `Contact reveal for ${worker.name}`,
        reference: worker.id,
        timestamp: new Date(),
        balanceAfter: wallet.balance - 1
      };

      // Update wallet state
      setWallet({
        ...wallet,
        balance: wallet.balance - 1,
        totalSpent: wallet.totalSpent + 1,
        transactions: [transaction, ...wallet.transactions],
        revealHistory: [revealLog, ...wallet.revealHistory],
        lastUpdated: new Date()
      });

      return revealLog;
    } catch (err) {
      const errorMessage = 'Contact reveal failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getBalance = (): number => {
    return wallet?.balance || 0;
  };

  const getTransactions = (): CreditTransaction[] => {
    return wallet?.transactions || [];
  };

  const getRevealHistory = (): ContactRevealLog[] => {
    return wallet?.revealHistory || [];
  };

  const hasEnoughCredits = (requiredCredits: number): boolean => {
    return getBalance() >= requiredCredits;
  };

  const refreshWallet = async (): Promise<void> => {
    if (!user?.id) return;
    
    try {
      const walletData = await mockGetWallet(user.id);
      setWallet(walletData);
    } catch (err) {
      console.error('Failed to refresh wallet:', err);
    }
  };

  const value: CreditWalletContextType = {
    wallet,
    loading,
    error,
    purchaseCredits,
    revealContact,
    getBalance,
    getTransactions,
    getRevealHistory,
    hasEnoughCredits,
    refreshWallet
  };

  return (
    <CreditWalletContext.Provider value={value}>
      {children}
    </CreditWalletContext.Provider>
  );
};

// Mock API functions - replace with actual API calls
const mockGetWallet = async (employerId: string): Promise<EmployerCreditWallet> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - in real app, this would come from your backend
  return {
    employerId,
    balance: 5, // Give new employers 5 free credits
    totalPurchased: 5,
    totalSpent: 0,
    lastUpdated: new Date(),
    transactions: [
      {
        id: 'signup_bonus',
        employerId,
        type: 'signup_bonus',
        amount: 5,
        description: 'Welcome bonus - 5 free credits',
        timestamp: new Date(),
        balanceAfter: 5
      }
    ],
    revealHistory: []
  };
};

const mockProcessPayment = async (request: PaymentRequest): Promise<PaymentResponse> => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock successful payment - in real app, integrate with Razorpay/Stripe/UPI
  return {
    success: true,
    transactionId: `txn_${Date.now()}`,
    paymentId: `pay_${Date.now()}`,
    creditsAdded: request.credits,
    newBalance: request.credits // This would be calculated by backend
  };
};

const mockRevealContact = async (employerId: string, workerId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock contact info - in real app, this would be fetched securely from backend
  return {
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    alternatePhone: '+91 87654 32109'
  };
};

export default CreditWalletProvider; 