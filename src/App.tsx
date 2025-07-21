import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { CoinWalletProvider } from './contexts/CoinWalletContext';
import { ToastProvider } from './components/ui/ToastContainer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/common/Layout';
import AuthModal from './components/auth/AuthModal';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import HomePage from './components/landing/HomePage';
import JobsPage from './pages/JobsPage';
import JobListingsPage from './pages/JobListingsPage';
import WorkersPage from './pages/WorkersPage';
import WhatsAppDemoPage from './pages/WhatsAppDemoPage';
import OfflineIndicator from './components/features/OfflineIndicator';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'employer' | 'jobseeker'>('jobseeker');
  const [showDashboard, setShowDashboard] = useState(false);

  const openAuthModal = (role: 'employer' | 'jobseeker' = 'jobseeker') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  // Show dashboard only when user explicitly wants to see it
  if (showDashboard && user) {
    return (
      <Layout>
        {user.role === 'employer' ? (
          <EmployerDashboard onBackToHome={() => setShowDashboard(false)} />
        ) : (
          <JobSeekerDashboard onBackToHome={() => setShowDashboard(false)} />
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <HomePage 
            onOpenAuthModal={openAuthModal} 
            onShowDashboard={() => setShowDashboard(true)}
          />
        } />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:categorySlug" element={<JobListingsPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/whatsapp-demo" element={<WhatsAppDemoPage />} />
      </Routes>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authModalRole}
      />
    </Layout>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <CoinWalletProvider>
            <JobProvider>
              <OfflineIndicator />
              <AppContent />
            </JobProvider>
          </CoinWalletProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;