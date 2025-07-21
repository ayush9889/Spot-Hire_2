import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { ToastProvider } from './components/ui/ToastContainer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/common/Layout';
import AuthModal from './components/auth/AuthModal';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import HomePage from './components/landing/HomePage';
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
      <HomePage 
        onOpenAuthModal={openAuthModal} 
        onShowDashboard={() => setShowDashboard(true)}
      />
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
          <JobProvider>
            <OfflineIndicator />
            <AppContent />
          </JobProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;