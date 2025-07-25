// Simple test file to verify Firebase configuration
// This is not a formal test suite, just a verification script

import { AuthService } from './firebase';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test if Firebase is properly initialized
    const testEmail = 'test@example.com';
    const emailExists = await AuthService.checkEmailExists(testEmail);
    
    console.log('✅ Firebase connection successful');
    console.log('✅ AuthService is working');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};

// Environment variables check
export const checkEnvironmentVariables = () => {
  console.log('🔍 Checking environment variables...');
  
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  console.log('📋 Required variables:', requiredVars);
  
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    console.log('Please check your .env file and FIREBASE_SETUP.md');
    return false;
  }

  console.log('✅ All required environment variables are set');
  
  // Log the actual values (without sensitive data)
  console.log('📊 Environment variable values:');
  console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
  console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log('Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
  console.log('Sender ID:', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
  console.log('App ID:', import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing');
  
  return true;
};

// Run checks on import
if (typeof window !== 'undefined') {
  // Only run in browser environment
  console.log('🚀 Firebase test script loaded');
  setTimeout(() => {
    console.log('⏰ Running Firebase checks...');
    checkEnvironmentVariables();
    testFirebaseConnection();
  }, 1000);
} 