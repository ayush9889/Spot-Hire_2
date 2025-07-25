# Firebase Setup Guide for Spot-Hire

This guide will help you set up Firebase authentication and Firestore database for the Spot-Hire application.

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `spot-hire` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Choose your Analytics account or create a new one
6. Click "Create project"

## 🔐 Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:

### Email/Password Authentication
- Click on "Email/Password"
- Enable "Email/Password"
- Enable "Email link (passwordless sign-in)" (optional)
- Click "Save"

### Google Authentication
- Click on "Google"
- Enable Google sign-in
- Add your authorized domain (localhost for development)
- Click "Save"

### Phone Authentication (Optional)
- Click on "Phone"
- Enable phone sign-in
- Add your test phone numbers for development
- Click "Save"

## 🗄 Step 3: Set Up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (we'll add security rules later)
4. Select a location closest to your users (e.g., `asia-south1` for India)
5. Click "Done"

## 🔒 Step 4: Configure Security Rules

1. In Firestore Database, go to "Rules" tab
2. Replace the default rules with the content from `firestore.rules` file
3. Click "Publish"

## ⚙️ Step 5: Get Firebase Configuration

1. Go to "Project settings" (gear icon next to "Project Overview")
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</>)
4. Register your app with a nickname (e.g., "Spot-Hire Web")
5. Copy the Firebase configuration object

## 🔧 Step 6: Environment Variables

1. Create a `.env` file in your project root
2. Copy the configuration values from the Firebase console:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📱 Step 7: Configure Authorized Domains

1. In Authentication > Settings > Authorized domains
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (when deployed)

## 🧪 Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Try to register a new user
3. Try to sign in with email/password
4. Try Google sign-in
5. Check Firestore to see if user data is created

## 🔍 Step 9: Monitor and Debug

### Firebase Console Features:
- **Authentication > Users**: View all registered users
- **Firestore > Data**: View and edit database documents
- **Authentication > Sign-in method**: Monitor sign-in attempts
- **Analytics**: Track user engagement (if enabled)

### Common Issues and Solutions:

#### 1. "Firebase App named '[DEFAULT]' already exists"
- This happens if Firebase is initialized multiple times
- Solution: Check that you're only importing and initializing Firebase once

#### 2. "Permission denied" in Firestore
- Check that security rules are properly configured
- Ensure user is authenticated before accessing protected data

#### 3. Google Sign-in not working
- Verify Google provider is enabled in Firebase Console
- Check that your domain is in authorized domains
- Ensure you're using HTTPS in production

#### 4. Email verification not working
- Check spam folder
- Verify email templates in Firebase Console
- Test with a real email address

## 🚀 Step 10: Production Deployment

### Before deploying to production:

1. **Update Security Rules**: Change from test mode to production rules
2. **Add Production Domain**: Add your domain to authorized domains
3. **Enable Analytics**: Set up proper analytics tracking
4. **Configure Email Templates**: Customize verification and reset emails
5. **Set up Monitoring**: Enable Firebase Performance Monitoring

### Environment Variables for Production:

```env
# Production Firebase Configuration
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📊 Step 11: Database Schema

The application uses the following Firestore collections:

### Users Collection
```typescript
{
  id: string; // Firebase Auth UID
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
```

### Jobs Collection
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  location: {
    city: string;
    state: string;
    pincode: string;
  };
  compensation: {
    amount: number;
    currency: string;
    type: 'hourly' | 'daily' | 'monthly';
  };
  requirements: string[];
  employer_id: string; // Reference to user
  status: 'active' | 'filled' | 'expired';
  posted_at: Date;
  expires_at: Date;
  contact_cost: number;
}
```

### Applications Collection
```typescript
{
  id: string;
  job_id: string; // Reference to job
  jobseeker_id: string; // Reference to user
  status: 'applied' | 'viewed' | 'shortlisted' | 'rejected' | 'hired';
  applied_at: Date;
  message?: string;
}
```

## 🔧 Step 12: Firebase CLI (Optional)

For advanced features, install Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init
```

This allows you to:
- Deploy security rules
- Use Firebase Emulator for local development
- Deploy functions (if needed)
- Manage multiple environments

## 📞 Support

If you encounter issues:

1. Check Firebase Console for error logs
2. Review Firebase documentation
3. Check browser console for JavaScript errors
4. Verify environment variables are correct
5. Ensure all required Firebase services are enabled

## 🎉 Congratulations!

Your Firebase setup is complete! The Spot-Hire application now has:
- ✅ Secure user authentication
- ✅ Real-time database
- ✅ Google OAuth integration
- ✅ Email verification
- ✅ Password reset functionality
- ✅ Role-based user profiles
- ✅ Coin system for job applications

You can now test the full authentication flow and start building additional features! 