import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, Employer, JobSeeker } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<void>;
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

// Mock data for demonstration
const mockUsers: (Employer | JobSeeker)[] = [
  {
    id: '1',
    email: 'employer@example.com',
    name: 'Ramesh Gupta',
    role: 'employer',
    phone: '+91 9876543210',
    location: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
    createdAt: new Date(),
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
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Check for stored user session with no expiration
    const storedUser = localStorage.getItem('user');
    const sessionTimestamp = localStorage.getItem('userSessionTimestamp');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Session never expires - keep user logged in permanently
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
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
    // Mock login logic
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      // Store user with permanent session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userSessionTimestamp', Date.now().toString());
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: Partial<User>) => {
    // Mock registration logic
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'jobseeker',
      phone: userData.phone || '',
      location: userData.location || { city: '', state: '', pincode: '' },
      createdAt: new Date(),
      isVerified: false,
      coins: userData.role === 'jobseeker' ? 5 : 20 // Welcome bonus
    };

    // Store user with permanent session
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userSessionTimestamp', Date.now().toString());
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      loading: false
    });
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

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    addCoins,
    spendCoins
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};