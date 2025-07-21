import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, ArrowRight, Star, Phone, MessageCircle, Shield, Clock, Zap, CheckCircle, Briefcase, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FeaturedWorkers from './FeaturedWorkers';
import CreditPacks from './CreditPacks';
import HowItWorks from './HowItWorks';
import { getFeaturedCategories } from '../../lib/jobCategories';

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
                Find Local Jobs
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  & Hire Workers
                </span>
                Near You
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whether you're looking for work or need to hire staff, connect with local opportunities instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={() => onShowDashboard?.()}
                  className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Search className="h-5 w-5 inline mr-2" />
                  Find Jobs
                  <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('featured-workers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Users className="h-5 w-5 inline mr-2" />
                  Hire Workers
                  <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  25,000+ Local Jobs
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  50,000+ Workers
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  12,000+ Businesses
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
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find What You're Looking For</h3>
            <p className="text-gray-600">Search for jobs or browse workers in your area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Type Toggle */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">I'm Looking For</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="jobs">Jobs to Apply</option>
                <option value="workers">Workers to Hire</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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

      {/* Browse Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 mb-6 shadow-sm">
              <Briefcase className="h-4 w-4 mr-2" />
              For Job Seekers
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Next
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 block">
                Job Opportunity
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Browse thousands of local job opportunities. From entry-level positions to skilled trades, find work that matches your experience and location.
            </p>
          </div>
          
          {/* Featured Categories Grid - Show only 4 categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {getFeaturedCategories().slice(0, 4).map((category, index) => (
              <Link
                key={category.id}
                to={`/jobs`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:border-blue-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-teal-50 rounded-bl-full opacity-50"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl group-hover:scale-125 transition-transform duration-500 relative z-10">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-700 font-bold bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 rounded-full shadow-sm">
                        {category.growth} growth
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-3 text-xl group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-base text-blue-600 font-bold mb-4">
                    {category.jobCount.toLocaleString()} jobs
                  </p>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 text-sm font-bold group-hover:text-blue-700 transition-colors duration-300">
                    <span>Explore Jobs</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              to="/jobs"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <TrendingUp className="h-6 w-6 mr-3" />
              View All 100+ Job Categories
              <ChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <p className="text-gray-600 text-sm mt-4">
              Discover opportunities in electricians, drivers, cooks, cleaners, security, and many more categories
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600 font-medium">Job Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">25,000+</div>
                <div className="text-gray-600 font-medium">Active Jobs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Job Match Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 mb-6 shadow-sm">
              <Users className="h-4 w-4 mr-2" />
              For Employers
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Skilled
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 block">
                Local Workers
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with verified workers in your area. From skilled trades to service staff, find reliable people for your business needs.
            </p>
          </div>

          {/* Featured Workers Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: 'Rajesh Kumar',
                skill: 'Electrician',
                location: 'Mumbai, Maharashtra',
                rating: 4.8,
                experience: '5 years',
                image: '👨‍🔧'
              },
              {
                name: 'Priya Sharma',
                skill: 'Housekeeper',
                location: 'Delhi, NCR',
                rating: 4.9,
                experience: '3 years',
                image: '👩‍💼'
              },
              {
                name: 'Amit Patel',
                skill: 'Driver',
                location: 'Bangalore, Karnataka',
                rating: 4.7,
                experience: '8 years',
                image: '👨‍💼'
              },
              {
                name: 'Sunita Devi',
                skill: 'Cook',
                location: 'Chennai, Tamil Nadu',
                rating: 4.9,
                experience: '6 years',
                image: '👩‍🍳'
              }
            ].map((worker, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{worker.image}</div>
                  <h3 className="font-bold text-gray-900 text-lg">{worker.name}</h3>
                  <p className="text-blue-600 font-semibold">{worker.skill}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {worker.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    {worker.rating} ({worker.experience})
                  </div>
                </div>
                
                <button
                  onClick={() => document.getElementById('featured-workers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>

          {/* View All Workers Button */}
          <div className="text-center">
            <button
              onClick={() => document.getElementById('featured-workers')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Users className="h-6 w-6 mr-3" />
              Browse All Workers
              <ChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <p className="text-gray-600 text-sm mt-4">
              Find electricians, drivers, cooks, cleaners, security guards, and many more skilled workers
            </p>
          </div>

          {/* Employer Benefits */}
          <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Workers</h3>
                <p className="text-gray-600">All workers are background checked</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Hiring</h3>
                <p className="text-gray-600">Connect and hire within hours</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Focus</h3>
                <p className="text-gray-600">Workers from your neighborhood</p>
              </div>
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

      {/* Job Seeker Join CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Looking for Work?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of job seekers finding work in their local area. Start your job search today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenAuthModal('jobseeker')}
              className="group px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <Search className="h-5 w-5 inline mr-2" />
              Find Jobs Now
              <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Job Seeker Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
              <p className="text-blue-100">Build trust with employers</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Work Flexibly</h3>
              <p className="text-blue-100">Choose your own schedule</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Earn More</h3>
              <p className="text-blue-100">Get paid fairly for your skills</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 