import React, { useState } from 'react';
import { Search, MapPin, Users, ArrowRight, Star, Phone, MessageCircle, Shield, Clock, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FeaturedWorkers from './FeaturedWorkers';
import CreditPacks from './CreditPacks';
import HowItWorks from './HowItWorks';

interface HomePageProps {
  onOpenAuthModal: (role?: 'employer' | 'jobseeker') => void;
  onShowDashboard?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenAuthModal, onShowDashboard }) => {
  const { user } = useAuth();
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const jobCategories = [
    'All Categories',
    'Plumber', 
    'Maid', 
    'Cook', 
    'Carpenter', 
    'Electrician',
    'Driver',
    'Security Guard',
    'Housekeeper',
    'Gardener',
    'Painter',
    'Mechanic'
  ];

  const handleSearch = () => {
    // In a real app, this would trigger search functionality
    console.log('Searching for:', { category: searchCategory, location: searchLocation });
    if (onShowDashboard) {
      onShowDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Skilled
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  Local Workers
                </span>
                in Seconds
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Hire verified workers near you. Pay only when you want to connect.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={() => document.getElementById('featured-workers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Browse Workers
                  <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onOpenAuthModal('employer')}
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
                >
                  Post a Job
                  <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  50,000+ Verified Workers
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  15,000+ Happy Employers
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  99% Success Rate
                </div>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                  alt="Local workers and employers connecting"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 rounded-2xl -z-10 opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-gradient-to-tr from-purple-400 to-pink-400 rounded-2xl -z-20 opacity-15"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Widget */}
      <section className="py-12 bg-white shadow-lg relative -mt-10 mx-4 sm:mx-6 lg:mx-8 rounded-2xl max-w-6xl lg:max-w-7xl mx-auto">
        <div className="px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Category</label>
              <select 
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              >
                {jobCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter city or locality"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workers Grid */}
      <FeaturedWorkers />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Credit Packs Section */}
      <CreditPacks />

      {/* Worker Join CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Are You a Local Worker?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join our platform to get discovered by employers in your area. Start earning today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenAuthModal('jobseeker')}
              className="group px-10 py-5 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <Users className="h-5 w-5 inline mr-2" />
              Register as Worker
              <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Worker Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
              <p className="text-green-100">Build trust with employers</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Work Flexibly</h3>
              <p className="text-green-100">Choose your own schedule</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Earn More</h3>
              <p className="text-green-100">Get paid fairly for your skills</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 