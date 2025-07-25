import React, { useState, useEffect } from 'react';
import { AuthService } from '../../lib/firebase';

const FirebaseDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirebase = async () => {
      const info: any = {};

      // Check environment variables
      info.envVars = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
      };

      // Check Firebase connection
      try {
        await AuthService.checkEmailExists('test@example.com');
        info.connection = '✅ Connected';
      } catch (error) {
        info.connection = `❌ Error: ${error}`;
      }

      setDebugInfo(info);
      setLoading(false);
    };

    checkFirebase();
  }, []);

  if (loading) {
    return <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">Loading debug info...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded mb-4">
      <h3 className="font-bold text-lg mb-2">Firebase Debug Info</h3>
      <div className="space-y-2 text-sm">
        <div><strong>Connection:</strong> {debugInfo.connection}</div>
        <div><strong>API Key:</strong> {debugInfo.envVars?.apiKey}</div>
        <div><strong>Auth Domain:</strong> {debugInfo.envVars?.authDomain}</div>
        <div><strong>Project ID:</strong> {debugInfo.envVars?.projectId}</div>
        <div><strong>Storage Bucket:</strong> {debugInfo.envVars?.storageBucket}</div>
        <div><strong>Sender ID:</strong> {debugInfo.envVars?.messagingSenderId}</div>
        <div><strong>App ID:</strong> {debugInfo.envVars?.appId}</div>
        <div><strong>Measurement ID:</strong> {debugInfo.envVars?.measurementId}</div>
      </div>
    </div>
  );
};

export default FirebaseDebug; 