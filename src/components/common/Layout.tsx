import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onShowDashboard?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onShowDashboard }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onShowDashboard={onShowDashboard} />
      <main className="flex-1">
        {children}
      </main>
      {!isAuthenticated && <Footer />}
    </div>
  );
};

export default Layout;