import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Briefcase, TrendingUp, MapPin, Star, ChevronRight, Clock, Shield, ArrowRight, Plus, MessageCircle, Coins } from 'lucide-react';
import AllCategories from '../jobs/AllCategories';
import NearbyJobs from '../jobs/NearbyJobs';
import { JobCategory } from '../../types';

interface HeroProps {
  onOpenAuthModal: (role?: 'employer' | 'jobseeker') => void;
  onShowDashboard?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAuthModal, onShowDashboard }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  const handleCategorySelect = (category: JobCategory) => {
    // In a real app, this would filter jobs by category
    console.log('Selected category:', category);
  };

  const handleViewJob = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const popularCategories = [
    { 
      name: 'Retail & Sales', 
      count: '4,200+ jobs', 
      icon: '🛍️', 
      description: 'Shop assistants, cashiers, sales staff',
      growth: '+15%'
    },
    { 
      name: 'Food Service', 
      count: '3,800+ jobs', 
      icon: '🍽️', 
      description: 'Waiters, cooks, kitchen helpers',
      growth: '+22%'
    },
    { 
      name: 'Hotel & Hospitality', 
      count: '2,100+ jobs', 
      icon: '🏨', 
      description: 'Housekeeping, front desk, bellhops',
      growth: '+18%'
    },
    { 
      name: 'Delivery & Logistics', 
      count: '3,500+ jobs', 
      icon: '🚚', 
      description: 'Delivery partners, drivers, packers',
      growth: '+35%'
    },
    { 
      name: 'Security & Safety', 
      count: '1,900+ jobs', 
      icon: '🛡️', 
      description: 'Security guards, watchmen',
      growth: '+12%'
    },
    { 
      name: 'Cleaning & Maintenance', 
      count: '2,400+ jobs', 
      icon: '🧹', 
      description: 'Cleaners, maintenance staff',
      growth: '+20%'
    },
    { 
      name: 'Beauty & Wellness', 
      count: '1,200+ jobs', 
      icon: '💄', 
      description: 'Salon staff, spa workers, beauticians',
      growth: '+28%'
    },
    { 
      name: 'Construction & Labor', 
      count: '2,800+ jobs', 
      icon: '🏗️', 
      description: 'Construction workers, painters, electricians',
      growth: '+25%'
    }
  ];

  const additionalCategories = [
    { name: 'Domestic Help', icon: '🏠', count: '1,800+ jobs' },
    { name: 'Admin & Office', icon: '📋', count: '1,500+ jobs' },
    { name: 'Driving', icon: '🚗', count: '2,200+ jobs' },
    { name: 'Healthcare Support', icon: '🏥', count: '900+ jobs' },
    { name: 'Education Support', icon: '📚', count: '700+ jobs' },
    { name: 'Manufacturing', icon: '🏭', count: '1,600+ jobs' },
    { name: 'Agriculture', icon: '🌾', count: '1,100+ jobs' },
    { name: 'Textile & Garments', icon: '👕', count: '1,300+ jobs' },
    { name: 'Auto & Repair', icon: '🔧', count: '800+ jobs' },
    { name: 'Event Services', icon: '🎉', count: '600+ jobs' },
    { name: 'Pet Care', icon: '🐕', count: '400+ jobs' },
    { name: 'Fitness & Sports', icon: '💪', count: '500+ jobs' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                <TrendingUp className="h-4 w-4 mr-2" />
                India's #1 Platform for Local Jobs
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  Spot Hire
                </span>
                <br />
                Find work in shops, restaurants & local businesses
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with local employers hiring for retail, food service, hospitality, and service jobs. 
                No experience? No problem. Start your career today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onShowDashboard?.()}
                  className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Search className="h-5 w-5 inline mr-2" />
                  Find Local Jobs
                  <ChevronRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onOpenAuthModal('employer')}
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
                >
                  <Briefcase className="h-5 w-5 inline mr-2" />
                  Hire Staff
                  <ChevronRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    25,000+ Local Jobs
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    150,000+ Workers
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    12,000+ Local Businesses
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative space-y-6">
              {/* Live Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-blue-600">24,847</p>
                      <p className="text-xs text-green-600">+12% this week</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hired Today</p>
                      <p className="text-2xl font-bold text-green-600">1,247</p>
                      <p className="text-xs text-green-600">+8% vs yesterday</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending WhatsApp Feature */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg mr-3">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Apply via WhatsApp</h3>
                      <p className="text-green-100 text-sm">Instant job applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-green-100 text-xs">Success Rate</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">2,847</span> applications sent today
                  </div>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                    Try Now
                  </button>
                </div>
              </div>

              {/* Hot Job Alert */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg mr-3">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">🔥 Hot Job Alert</h3>
                      <p className="text-orange-100 text-sm">High demand positions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      LIVE
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Delivery Partners</span>
                    <span className="font-medium">₹25,000+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Restaurant Staff</span>
                    <span className="font-medium">₹18,000+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Retail Associates</span>
                    <span className="font-medium">₹20,000+</span>
                  </div>
                </div>
              </div>

              {/* Success Stories */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Success Stories</h3>
                    <p className="text-gray-600 text-sm">Real people, real jobs</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">RK</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Rajesh Kumar</p>
                      <p className="text-xs text-gray-600">Hired as Delivery Partner • ₹28,000/month</p>
                    </div>
                    <div className="text-xs text-green-600">2 days ago</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs font-medium">PS</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                      <p className="text-xs text-gray-600">Hired as Retail Associate • ₹22,000/month</p>
                    </div>
                    <div className="text-xs text-green-600">1 week ago</div>
                  </div>
                </div>
              </div>

              {/* Coin System Promo */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg mr-3">
                      <Coins className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Earn Coins Daily</h3>
                      <p className="text-yellow-100 text-sm">Unlock premium features</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">+5</div>
                    <div className="text-xs text-yellow-100">Daily Login</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">+10</div>
                    <div className="text-xs text-yellow-100">Profile Complete</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">+15</div>
                    <div className="text-xs text-yellow-100">Refer Friends</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Nearby Jobs Section */}
      <NearbyJobs onViewJob={handleViewJob} />

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Spot Hire
            </h2>
            <p className="text-lg text-gray-600">
              Simple, fast, and reliable local hiring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Quick Hiring',
                description: 'Post jobs and get responses within hours',
                color: 'text-blue-600 bg-blue-100'
              },
              {
                icon: MapPin,
                title: 'Local Focus',
                description: 'Find workers in your neighborhood',
                color: 'text-green-600 bg-green-100'
              },
              {
                icon: Shield,
                title: 'Verified Workers',
                description: 'All workers are verified and trusted',
                color: 'text-purple-600 bg-purple-100'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md relative z-10`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative z-10">
            Start Your Journey with Spot Hire Today
          </h2>
          <p className="text-2xl text-blue-100 mb-12 leading-relaxed relative z-10">
            Whether you're looking for your first job or need to hire reliable staff, we're here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <button
              onClick={() => onShowDashboard?.()}
              className="group px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <Search className="h-5 w-5 inline mr-2" />
              Find Local Work
              <ChevronRight className="h-5 w-5 inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onOpenAuthModal('employer')}
              className="group px-10 py-5 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Briefcase className="h-5 w-5 inline mr-2" />
              Hire Local Staff
              <ChevronRight className="h-5 w-5 inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* All Categories Modal */}
      <AllCategories
        isOpen={showAllCategories}
        onClose={() => setShowAllCategories(false)}
        onCategorySelect={handleCategorySelect}
      />
    </div>
  );
};

export default Hero;