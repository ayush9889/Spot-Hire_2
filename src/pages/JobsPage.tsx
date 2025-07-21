import React, { useState } from 'react';
import { Search, MapPin, Filter, Briefcase, TrendingUp, ChevronRight, Clock, DollarSign, Users } from 'lucide-react';
import { getAllCategories, searchCategories, JobCategoryData } from '../lib/jobCategories';

const JobsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = getAllCategories();

  const locations = [
    'All Locations',
    'Delhi NCR',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur'
  ];

  const salaryRanges = [
    'All Salary Ranges',
    'Under ₹10,000',
    '₹10,000 - ₹15,000',
    '₹15,000 - ₹20,000',
    '₹20,000 - ₹25,000',
    'Above ₹25,000'
  ];

  const jobTypes = [
    'All Types',
    'Full-Time',
    'Part-Time',
    'Contract',
    'Temporary'
  ];

  const experienceLevels = [
    'All Experience',
    'Fresher (0-1 years)',
    'Experienced (1-3 years)',
    'Senior (3-5 years)',
    'Expert (5+ years)'
  ];

  const handleCategoryClick = (category: JobCategoryData) => {
    // In a real app, this would navigate to /jobs/[category-slug]
    console.log('Navigating to category:', category.slug);
  };

  const handleSearch = () => {
    console.log('Searching with filters:', {
      query: searchQuery,
      location: selectedLocation,
      salary: selectedSalaryRange,
      type: selectedJobType,
      experience: selectedExperience
    });
  };

  const filteredCategories = searchQuery 
    ? searchCategories(searchQuery)
    : allCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Jobs by Category
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of job opportunities across various skill categories. 
              Find the perfect role that matches your expertise and location.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search job categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <select
                value={selectedSalaryRange}
                onChange={(e) => setSelectedSalaryRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5 inline mr-2" />
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Job Categories</h2>
          <div className="text-sm text-gray-600">
            {filteredCategories.length} categories available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
            >
              <div className="p-6">
                {/* Icon & Growth Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                    {category.growth}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-blue-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span className="font-semibold">{category.jobCount.toLocaleString()} jobs</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{category.averageSalary}</span>
                    </div>
                  </div>
                </div>

                {/* View Jobs Button */}
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium group-hover:bg-blue-600 group-hover:text-white">
                  <span>View Jobs</span>
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {allCategories.reduce((total, cat) => total + cat.jobCount, 0).toLocaleString()}+
              </div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{allCategories.length}+</div>
              <div className="text-gray-600">Job Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">15,000+</div>
              <div className="text-gray-600">Employers</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find Local Jobs Across India
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Discover thousands of job opportunities in your city. From electrician jobs in Delhi to 
            housekeeping positions in Mumbai, find the perfect local job that matches your skills and experience. 
            Our platform connects job seekers with trusted employers across major Indian cities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobsPage; 