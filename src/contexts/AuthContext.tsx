import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, Employer, JobSeeker } from '../types';
import { AuthService, UserProfile } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
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

// Convert UserProfile to User type
const convertUserProfileToUser = (profile: UserProfile): User => {
  if (profile.role === 'employer') {
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      phone: profile.phone,
      location: profile.location,
      createdAt: profile.createdAt,
      isVerified: profile.isVerified,
      coins: profile.coins,
      businessName: profile.businessName || '',
      businessType: profile.businessType || '',
      website: profile.website || '',
      description: profile.description || '',
      hideContactInfo: profile.hideContactInfo || true,
      maskedBusinessName: profile.maskedBusinessName || ''
    } as Employer;
  } else {
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      phone: profile.phone,
      location: profile.location,
      createdAt: profile.createdAt,
      isVerified: profile.isVerified,
      coins: profile.coins,
      skills: profile.skills || [],
      experience: profile.experience || '',
      preferredJobTypes: profile.preferredJobTypes || ['full-time'],
      availability: profile.availability || 'Immediate',
      preferredCategories: profile.preferredCategories || ['retail'],
      aboutMe: profile.aboutMe || '',
      profilePhoto: profile.profilePhoto || ''
    } as JobSeeker;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userProfile = await AuthService.getUserProfile(firebaseUser.uid);
          if (userProfile) {
            const user = convertUserProfileToUser(userProfile);
            setAuthState({
              user,
              isAuthenticated: true,
              loading: false
            });
          } else {
            // User exists in Firebase Auth but not in Firestore
            setAuthState({
              user: null,
              isAuthenticated: false,
              loading: false
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false
          });
        }
      } else {
        // User is signed out
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      const userProfile = await AuthService.signIn(email, password);
      const user = convertUserProfileToUser(userProfile);
      
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

  const loginWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      const userProfile = await AuthService.signInWithGoogle();
      const user = convertUserProfileToUser(userProfile);
      
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
      // Extract email and password for Firebase auth
      const { email, password, ...profileData } = userData as any;
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const userProfile = await AuthService.register(email, password, profileData);
      const user = convertUserProfileToUser(userProfile);
      
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

  const logout = async () => {
    try {
      await AuthService.signOut();
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Firebase logout fails
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false
      });
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (authState.user) {
      try {
        await AuthService.updateProfile(authState.user.id, data);
        
        // Update local state
        const updatedUser = { ...authState.user, ...data };
        setAuthState(prev => ({ ...prev, user: updatedUser }));
      } catch (error) {
        throw error;
      }
    }
  };

  const addCoins = async (amount: number) => {
    if (authState.user) {
      try {
        await AuthService.addCoins(authState.user.id, amount);
        
        // Update local state
        const updatedUser = { ...authState.user, coins: authState.user.coins + amount };
        setAuthState(prev => ({ ...prev, user: updatedUser }));
      } catch (error) {
        throw error;
      }
    }
  };

  const spendCoins = async (amount: number) => {
    if (authState.user && authState.user.coins >= amount) {
      try {
        const success = await AuthService.spendCoins(authState.user.id, amount);
        if (success) {
          // Update local state
          const updatedUser = { ...authState.user, coins: authState.user.coins - amount };
          setAuthState(prev => ({ ...prev, user: updatedUser }));
        } else {
          throw new Error('Insufficient coins');
        }
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Insufficient coins');
    }
  };

  const sendVerificationEmail = async (email: string) => {
    // This would be handled by Firebase automatically during registration
    // For manual sending, we'd need to implement it
    console.log(`Verification email would be sent to ${email}`);
    return Promise.resolve();
  };

  const verifyEmail = async (token: string) => {
    // Email verification is handled by Firebase
    // This would be called when user clicks verification link
    if (authState.user) {
      const updatedUser = { ...authState.user, isVerified: true };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
    return Promise.resolve();
  };

  const resetPassword = async (email: string) => {
    try {
      await AuthService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    // This would require re-authentication with Firebase
    // For now, we'll throw an error indicating it's not implemented
    throw new Error('Password change not implemented yet');
  };

  const value: AuthContextType = {
    ...authState,
    login,
    loginWithGoogle,
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