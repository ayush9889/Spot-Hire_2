import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import WhatsAppBot from '../features/WhatsAppBot';
import { MessageCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onShowDashboard?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onShowDashboard }) => {
  const { isAuthenticated, user } = useAuth();
  const [showWhatsAppBot, setShowWhatsAppBot] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onShowDashboard={onShowDashboard} />
      <main className="flex-1">
        {children}
      </main>
      {!isAuthenticated && <Footer />}
      
      {/* WhatsApp Bot */}
      <WhatsAppBot 
        isOpen={showWhatsAppBot}
        onClose={() => setShowWhatsAppBot(false)}
        userPhone={user?.phone}
      />
      
      {/* WhatsApp Bot Toggle Button */}
      <button
        onClick={() => setShowWhatsAppBot(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Layout;