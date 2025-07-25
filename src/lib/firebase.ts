import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  RecaptchaVerifier,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Phone Auth Provider
export const phoneProvider = new PhoneAuthProvider(auth);

// Recaptcha Verifier for phone authentication
export const createRecaptchaVerifier = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
};

// User profile interface for Firestore
export interface UserProfile {
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
  coins: number;
  // Employer specific fields
  businessName?: string;
  businessType?: string;
  website?: string;
  description?: string;
  hideContactInfo?: boolean;
  maskedBusinessName?: string;
  // Job seeker specific fields
  skills?: string[];
  experience?: string;
  preferredJobTypes?: string[];
  availability?: string;
  preferredCategories?: string[];
  aboutMe?: string;
  profilePhoto?: string;
}

// Authentication service
export class AuthService {
  // Register new user
  static async register(email: string, password: string, userData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      if (userData.name) {
        await updateProfile(user, { displayName: userData.name });
      }

      // Send email verification
      await sendEmailVerification(user);

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        id: user.uid,
        email: user.email!,
        name: userData.name || '',
        role: userData.role || 'jobseeker',
        phone: userData.phone || '',
        location: userData.location || { city: '', state: '', pincode: '' },
        createdAt: new Date(),
        isVerified: false,
        coins: userData.role === 'employer' ? 20 : 10, // Welcome bonus
        ...userData
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);

      return userProfile;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<UserProfile> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      return userDoc.data() as UserProfile;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with Google
  static async signInWithGoogle(): Promise<UserProfile> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new profile for Google user
        const userProfile: UserProfile = {
          id: user.uid,
          email: user.email!,
          name: user.displayName || '',
          role: 'jobseeker', // Default role
          phone: user.phoneNumber || '',
          location: { city: '', state: '', pincode: '' },
          createdAt: new Date(),
          isVerified: true, // Google users are pre-verified
          coins: 10,
          profilePhoto: user.photoURL || undefined
        };

        await setDoc(doc(db, 'users', user.uid), userProfile);
        return userProfile;
      }

      return userDoc.data() as UserProfile;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Update user profile
  static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), data);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Check if email exists
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Add coins to user
  static async addCoins(userId: string, amount: number): Promise<void> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const currentCoins = userDoc.data().coins || 0;
        await updateDoc(doc(db, 'users', userId), {
          coins: currentCoins + amount
        });
      }
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Spend coins from user
  static async spendCoins(userId: string, amount: number): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const currentCoins = userDoc.data().coins || 0;
        if (currentCoins >= amount) {
          await updateDoc(doc(db, 'users', userId), {
            coins: currentCoins - amount
          });
          return true;
        }
        return false;
      }
      return false;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Auth state listener
  static onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Error message helper
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export default app; 