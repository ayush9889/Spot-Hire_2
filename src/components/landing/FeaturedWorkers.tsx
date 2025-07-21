import React, { useState } from 'react';
import { Star, MapPin, Phone, MessageCircle, Shield, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Worker } from '../../types';

const FeaturedWorkers: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredWorkers: Worker[] = [
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
    }
  ];

  const handleViewProfile = (workerId: string) => {
    // In a real app, this would open the worker's profile
    console.log('Viewing profile for worker:', workerId);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredWorkers.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredWorkers.length / 4)) % Math.ceil(featuredWorkers.length / 4));
  };

  const getVisibleWorkers = () => {
    const startIndex = currentSlide * 4;
    return featuredWorkers.slice(startIndex, startIndex + 4);
  };

  return (
    <section id="featured-workers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Local Workers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, skilled workers in your area. All profiles are verified for your safety.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getVisibleWorkers().map((worker) => (
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
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">{worker.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({worker.totalRatings})</span>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewProfile(worker.id)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                    >
                      View Profile
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center text-sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition-all duration-200 flex items-center justify-center text-sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-2">
                      🔒 Contact info revealed after credit purchase
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(featuredWorkers.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold">
            View All Workers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkers; 