import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Briefcase, Search, Coins, Settings, HelpCircle } from 'lucide-react';
import CoinPurchase from '../features/CoinPurchase';
import { formatCurrency } from '../../lib/utils';

interface HeaderProps {
  onShowDashboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowDashboard }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCoinPurchase, setShowCoinPurchase] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (onShowDashboard) {
      onShowDashboard();
    }
    setIsMenuOpen(false);
  };
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ROJGAR
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#featured-workers" className="text-gray-700 hover:text-blue-600 transition-colors">
                Browse Workers
              </a>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={handleDashboardClick}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </button>
                  {user?.role === 'employer' ? (
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Post Job
                    </a>
                  ) : (
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                      <Search className="h-4 w-4 mr-1" />
                      Find Jobs
                    </a>
                  )}
                  
                  {/* Coin Balance */}
                  <button
                    onClick={() => setShowCoinPurchase(true)}
                    className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-md"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{user?.coins || 0}</span>
                    <span className="ml-1 text-xs opacity-90">coins</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{user?.name}</span>
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </a>
                        <button
                          onClick={() => {
                            setShowCoinPurchase(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Coins className="h-4 w-4 mr-3" />
                          Buy Coins ({formatCurrency(user?.coins || 0)})
                        </button>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <HelpCircle className="h-4 w-4 mr-3" />
                          Help & Support
                        </a>
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Post Job
                  </a>
                  <button
                    onClick={() => setShowCoinPurchase(true)}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Buy Credits
                  </button>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    About
                  </a>
                  <button
                    onClick={() => {/* Open auth modal */}}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login / Signup
                  </button>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowCoinPurchase(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm"
                      >
                        <Coins className="h-3 w-3 mr-1" />
                        {user?.coins || 0}
                      </button>
                    </div>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Dashboard
                    </a>
                    {user?.role === 'employer' ? (
                      <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Post Job
                      </a>
                    ) : (
                      <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Find Jobs
                      </a>
                    )}
                  <button 
                    onClick={handleDashboardClick}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </button>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Profile
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Home
                    </a>
                    <a href="#featured-workers" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Browse Workers
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Post Job
                    </a>
                    <button
                      onClick={() => {
                        setShowCoinPurchase(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Buy Credits
                    </button>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                      About
                    </a>
                    <button
                      onClick={() => {/* Open auth modal */ setIsMenuOpen(false);}}
                      className="text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Login / Signup
                    </button>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <CoinPurchase
        isOpen={showCoinPurchase}
        onClose={() => setShowCoinPurchase(false)}
      />
    </>
  );
};

export default Header;