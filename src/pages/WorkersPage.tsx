import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Phone, MessageCircle, Shield, Clock, ChevronDown, Users, Briefcase } from 'lucide-react';
import { Worker } from '../types';
import ContactRevealModal from '../components/modals/ContactRevealModal';

const WorkersPage: React.FC = () => {
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const workers: Worker[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      skill: 'Electrician',
      location: 'Karol Bagh, Delhi',
      experience: '8 years',
      rating: 4.8,
      totalRatings: 156,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹300-500/hr'
    },
    {
      id: '2',
      name: 'Sunita Sharma',
      skill: 'Maid',
      location: 'Lajpat Nagar, Delhi',
      experience: '5 years',
      rating: 4.9,
      totalRatings: 203,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b194?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available tomorrow',
      hourlyRate: '₹200-350/hr'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      skill: 'Plumber',
      location: 'Rohini, Delhi',
      experience: '12 years',
      rating: 4.7,
      totalRatings: 89,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available now',
      hourlyRate: '₹400-600/hr'
    },
    {
      id: '4',
      name: 'Priya Patel',
      skill: 'Cook',
      location: 'Saket, Delhi',
      experience: '6 years',
      rating: 4.9,
      totalRatings: 167,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹250-400/hr'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      skill: 'Carpenter',
      location: 'Gurgaon, Haryana',
      experience: '10 years',
      rating: 4.6,
      totalRatings: 134,
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available this week',
      hourlyRate: '₹350-550/hr'
    },
    {
      id: '6',
      name: 'Geeta Devi',
      skill: 'Housekeeper',
      location: 'Dwarka, Delhi',
      experience: '4 years',
      rating: 4.8,
      totalRatings: 92,
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹180-300/hr'
    },
    {
      id: '7',
      name: 'Ravi Sharma',
      skill: 'Driver',
      location: 'Noida, UP',
      experience: '7 years',
      rating: 4.7,
      totalRatings: 78,
      profileImage: 'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available now',
      hourlyRate: '₹400-700/day'
    },
    {
      id: '8',
      name: 'Kamala Bai',
      skill: 'Cleaner',
      location: 'Vasant Kunj, Delhi',
      experience: '9 years',
      rating: 4.9,
      totalRatings: 145,
      profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹150-250/hr'
    },
    {
      id: '9',
      name: 'Suresh Yadav',
      skill: 'Security Guard',
      location: 'CP, Delhi',
      experience: '6 years',
      rating: 4.5,
      totalRatings: 67,
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹250-400/hr'
    },
    {
      id: '10',
      name: 'Anita Kumari',
      skill: 'Beautician',
      location: 'Khan Market, Delhi',
      experience: '5 years',
      rating: 4.8,
      totalRatings: 123,
      profileImage: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available tomorrow',
      hourlyRate: '₹300-500/hr'
    },
    {
      id: '11',
      name: 'Deepak Kumar',
      skill: 'Painter',
      location: 'Mayur Vihar, Delhi',
      experience: '8 years',
      rating: 4.6,
      totalRatings: 89,
      profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available this week',
      hourlyRate: '₹280-450/hr'
    },
    {
      id: '12',
      name: 'Maya Singh',
      skill: 'Tutor',
      location: 'South Ex, Delhi',
      experience: '3 years',
      rating: 4.9,
      totalRatings: 156,
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      availability: 'Available today',
      hourlyRate: '₹400-800/hr'
    }
  ];

  const locations = [
    'All Locations',
    'Delhi NCR',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune'
  ];

  const experienceLevels = [
    'All Experience',
    'Fresher (0-1 years)',
    'Experienced (1-3 years)',
    'Senior (3-5 years)',
    'Expert (5+ years)'
  ];

  const availabilityOptions = [
    'All Availability',
    'Available now',
    'Available today',
    'Available tomorrow',
    'Available this week'
  ];

  const genderOptions = [
    'All Genders',
    'Male',
    'Female'
  ];

  const pricingOptions = [
    'All Price Ranges',
    'Under ₹200/hr',
    '₹200-400/hr',
    '₹400-600/hr',
    'Above ₹600/hr'
  ];

  const handleRevealContact = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowContactModal(true);
  };

  const handleSearch = () => {
    console.log('Searching workers with filters:', {
      skill: skillSearch,
      location: selectedLocation,
      experience: selectedExperience,
      availability: selectedAvailability,
      gender: selectedGender,
      pricing: selectedPricing
    });
  };

  const filteredWorkers = workers.filter(worker => 
    worker.skill.toLowerCase().includes(skillSearch.toLowerCase()) ||
    worker.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const activeFiltersCount = [selectedLocation, selectedExperience, selectedAvailability, selectedGender, selectedPricing]
    .filter(filter => filter && filter !== 'All Locations' && filter !== 'All Experience' && filter !== 'All Availability' && filter !== 'All Genders' && filter !== 'All Price Ranges').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Skilled People
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified, skilled workers in your area. All profiles are background-checked for your safety and peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters - Sticky */}
      <div className="sticky top-16 bg-white shadow-sm border-b z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by skill (e.g., Electrician, Cook, Driver)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {pricingOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center">
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5 inline mr-2" />
              Search Workers
            </button>
          </div>
        </div>
      </div>

      {/* Filter Summary Bar */}
      <div className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">{filteredWorkers.length}</span> skilled workers found
              {skillSearch && <span> for "<span className="font-medium">{skillSearch}</span>"</span>}
            </div>
            <div className="text-sm text-gray-500">
              Sorted by: Relevance & Rating
            </div>
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkers.map((worker) => (
            <div 
              key={worker.id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={worker.profileImage}
                  alt={worker.name}
                  className="w-full h-48 object-cover"
                />
                {worker.isVerified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {worker.availability}
                </div>
              </div>

              <div className="p-6">
                {/* Name & Skill */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{worker.name}</h3>
                  <p className="text-blue-600 font-semibold">{worker.skill}</p>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{worker.location}</span>
                </div>

                {/* Experience & Rate */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600">{worker.experience} exp.</span>
                  <span className="font-semibold text-gray-900">{worker.hourlyRate}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold text-gray-900">{worker.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({worker.totalRatings})</span>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => handleRevealContact(worker)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ⭐ Reveal Contact (1 Credit)
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  🔒 Phone & WhatsApp details
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold">
            Load More Workers
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Verified Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">15,000+</div>
              <div className="text-gray-600">Happy Employers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Reveal Modal */}
      {selectedWorker && (
        <ContactRevealModal
          isOpen={showContactModal}
          onClose={() => {
            setShowContactModal(false);
            setSelectedWorker(null);
          }}
          worker={selectedWorker}
        />
      )}
    </div>
  );
};

export default WorkersPage; 