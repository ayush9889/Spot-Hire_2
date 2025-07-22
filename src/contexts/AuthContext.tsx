import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, Employer, JobSeeker } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Enhanced mock data with more realistic user profiles
const mockUsers: (Employer | JobSeeker)[] = [
  {
    id: '1',
    email: 'employer@example.com',
    name: 'Ramesh Gupta',
    role: 'employer',
    phone: '+91 9876543210',
    location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
    createdAt: new Date('2024-01-15'),
    isVerified: true,
    coins: 50,
    businessName: 'Fashion Hub Store',
    businessType: 'Retail Clothing',
    website: 'https://fashionhub.com',
    description: 'Leading fashion retail store in Andheri',
    hideContactInfo: true,
    maskedBusinessName: 'Fashion H*** Store'
  },
  {
    id: '2',
    email: 'jobseeker@example.com',
    name: 'Priya Sharma',
    role: 'jobseeker',
    phone: '+91 9876543211',
    location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400058' },
    createdAt: new Date('2024-02-01'),
    isVerified: true,
    coins: 25,
    skills: ['Customer Service', 'Basic English', 'Retail Experience', 'Cash Handling'],
    experience: '2 years in retail',
    preferredJobTypes: ['full-time', 'part-time'],
    availability: 'Weekdays and Weekends',
    preferredCategories: ['retail', 'food-service'],
    aboutMe: 'Hardworking individual with 2 years of retail experience. Looking for stable employment in customer service roles.',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    email: 'driver@example.com',
    name: 'Rajesh Kumar',
    role: 'jobseeker',
    phone: '+91 9876543212',
    location: { city: 'Delhi', state: 'Delhi', pincode: '110001' },
    createdAt: new Date('2024-01-20'),
    isVerified: true,
    coins: 15,
    skills: ['Driving', 'Navigation', 'Customer Service', 'Vehicle Maintenance'],
    experience: '3 years as delivery driver',
    preferredJobTypes: ['full-time', 'gig'],
    availability: 'Flexible hours',
    preferredCategories: ['delivery', 'driving'],
    aboutMe: 'Experienced driver with clean record. Own vehicle available for delivery work.',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    const sessionTimestamp = localStorage.getItem('userSessionTimestamp');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Check if session is still valid (7 days)
        const sessionAge = Date.now() - parseInt(sessionTimestamp || '0');
        const sessionValid = sessionAge < 7 * 24 * 60 * 60 * 1000; // 7 days
        
        if (sessionValid) {
          setAuthState({
            user,
            isAuthenticated: true,
            loading: false
          });
        } else {
          // Session expired, clear storage
          localStorage.removeItem('user');
          localStorage.removeItem('userSessionTimestamp');
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        // Clear corrupted session
        localStorage.removeItem('user');
        localStorage.removeItem('userSessionTimestamp');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Mock login logic with email validation
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('No account found with this email address');
      }
      
      if (password !== 'password') {
        throw new Error('Incorrect password');
      }

      // Store user session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const register = async (userData: Partial<User>) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Create new user based on role
      let newUser: User;
      
      if (userData.role === 'employer') {
        newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email || '',
          name: userData.name || '',
          role: 'employer',
          phone: userData.phone || '',
          location: userData.location || { city: '', state: '', pincode: '' },
          createdAt: new Date(),
          isVerified: false,
          coins: 20, // Welcome bonus for employers
          businessName: '',
          businessType: '',
          hideContactInfo: true,
          maskedBusinessName: ''
        } as Employer;
      } else {
        newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email || '',
          name: userData.name || '',
          role: 'jobseeker',
          phone: userData.phone || '',
          location: userData.location || { city: '', state: '', pincode: '' },
          createdAt: new Date(),
          isVerified: false,
          coins: 10, // Welcome bonus for job seekers
          skills: [],
          experience: '',
          preferredJobTypes: ['full-time'],
          availability: 'Immediate',
          preferredCategories: ['retail']
        } as JobSeeker;
      }

      // Store user session
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userSessionTimestamp');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...data };
      // Update stored session
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  const addCoins = async (amount: number) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, coins: authState.user.coins + amount };
      // Update stored session
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  const spendCoins = async (amount: number) => {
    if (authState.user && authState.user.coins >= amount) {
      const updatedUser = { ...authState.user, coins: authState.user.coins - amount };
      // Update stored session
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    } else {
      throw new Error('Insufficient coins');
    }
  };

  const sendVerificationEmail = async (email: string) => {
    // Mock email verification
    console.log(`Verification email sent to ${email}`);
    return Promise.resolve();
  };

  const verifyEmail = async (token: string) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, isVerified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
    return Promise.resolve();
  };

  const resetPassword = async (email: string) => {
    // Mock password reset
    console.log(`Password reset email sent to ${email}`);
    return Promise.resolve();
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    // Mock password change
    if (oldPassword !== 'password') {
      throw new Error('Current password is incorrect');
    }
    console.log('Password changed successfully');
    return Promise.resolve();
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    addCoins,
    spendCoins,
    sendVerificationEmail,
    verifyEmail,
    resetPassword,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};