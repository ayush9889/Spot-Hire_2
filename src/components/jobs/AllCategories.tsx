import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Users, X, ArrowRight } from 'lucide-react';
import { JOB_CATEGORIES } from '../../lib/constants';
import { JobCategory } from '../../types';

interface AllCategoriesProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: JobCategory) => void;
  userLocation?: { city: string; state: string };
}

const AllCategories: React.FC<AllCategoriesProps> = ({ 
  isOpen, 
  onClose, 
  onCategorySelect,
  userLocation 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);

  const filteredCategories = JOB_CATEGORIES.filter(category =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category: JobCategory) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Job Categories</h2>
              {userLocation && (
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  Jobs in {userLocation.city}, {userLocation.state}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search job categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((category, index) => {
              // Mock job counts based on location
              const baseCount = Math.floor(Math.random() * 500) + 100;
              const locationMultiplier = userLocation?.city === 'Mumbai' ? 1.5 : 
                                       userLocation?.city === 'Delhi' ? 1.3 : 1.0;
              const jobCount = Math.floor(baseCount * locationMultiplier);
              
              return (
                <motion.div
                  key={category.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category.value)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                          {jobCount} jobs
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                      {category.label}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {userLocation ? `Available in ${userLocation.city}` : 'Available nationwide'}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      <span>View Jobs</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>Updated daily with new opportunities</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{filteredCategories.length} categories available</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AllCategories;