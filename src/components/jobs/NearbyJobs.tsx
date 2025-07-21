import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, RefreshCw, TrendingUp, Clock, Users } from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import JobCard from './JobCard';
import { Job } from '../../types';

interface NearbyJobsProps {
  onViewJob: (jobId: string) => void;
}

const NearbyJobs: React.FC<NearbyJobsProps> = ({ onViewJob }) => {
  const { jobs, loading } = useJobs();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<{
    city: string;
    state: string;
    coordinates?: { lat: number; lng: number };
  } | null>(null);
  const [nearbyJobs, setNearbyJobs] = useState<Job[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // In production, use a geocoding service like Google Maps API
            // For demo, we'll simulate location detection
            const mockLocation = {
              city: 'Mumbai',
              state: 'Maharashtra',
              coordinates: { lat: latitude, lng: longitude }
            };
            
            setUserLocation(mockLocation);
            localStorage.setItem('userLocation', JSON.stringify(mockLocation));
          } catch (error) {
            console.error('Error getting location details:', error);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to user's profile location
          if (user?.location) {
            setUserLocation({
              city: user.location.city,
              state: user.location.state
            });
          }
          setLocationLoading(false);
        }
      );
    } else {
      // Fallback to user's profile location
      if (user?.location) {
        setUserLocation({
          city: user.location.city,
          state: user.location.state
        });
      }
      setLocationLoading(false);
    }
  };

  // Calculate distance between two points (simplified)
  const calculateDistance = (job: Job, userCoords?: { lat: number; lng: number }) => {
    if (!userCoords) return Math.random() * 10; // Random distance for demo
    
    // In production, use proper distance calculation
    // For demo, return random distance based on city match
    const isSameCity = job.location.city.toLowerCase() === userLocation?.city.toLowerCase();
    return isSameCity ? Math.random() * 5 : Math.random() * 20 + 10;
  };

  // Filter and sort jobs by location
  useEffect(() => {
    if (userLocation) {
      const filtered = jobs
        .map(job => ({
          ...job,
          distance: calculateDistance(job, userLocation.coordinates)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6); // Show top 6 nearby jobs

      setNearbyJobs(filtered);
    }
  }, [jobs, userLocation]);

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    } else if (user?.location) {
      setUserLocation({
        city: user.location.city,
        state: user.location.state
      });
    }
  }, [user]);

  const stats = [
    {
      label: 'Jobs Near You',
      value: nearbyJobs.length,
      icon: MapPin,
      color: 'text-blue-600'
    },
    {
      label: 'Posted Today',
      value: nearbyJobs.filter(job => {
        const today = new Date();
        const jobDate = new Date(job.postedAt);
        return jobDate.toDateString() === today.toDateString();
      }).length,
      icon: Clock,
      color: 'text-green-600'
    },
    {
      label: 'Total Applications',
      value: nearbyJobs.reduce((sum, job) => sum + job.applicationsCount, 0),
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            Personalized for You
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Jobs Near You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {userLocation 
              ? `Discover opportunities in ${userLocation.city}, ${userLocation.state}`
              : 'Find local job opportunities in your area'
            }
          </p>
          
          {/* Location Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {userLocation ? (
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-gray-700 font-medium">
                  {userLocation.city}, {userLocation.state}
                </span>
              </div>
            ) : null}
            
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {locationLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              {locationLoading ? 'Detecting...' : 'Use Current Location'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nearby Jobs Grid */}
        {nearbyJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nearbyJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  <JobCard
                    job={job}
                    onViewDetails={() => onViewJob(job.id)}
                    showEmployerInfo={true}
                  />
                  {/* Distance Badge */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {job.distance?.toFixed(1)} km away
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {userLocation ? 'No jobs found nearby' : 'Enable location to see nearby jobs'}
            </h3>
            <p className="text-gray-600 mb-4">
              {userLocation 
                ? 'Try expanding your search radius or check back later for new opportunities'
                : 'Allow location access to discover personalized job opportunities in your area'
              }
            </p>
            {!userLocation && (
              <button
                onClick={getCurrentLocation}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Enable Location
              </button>
            )}
          </div>
        )}

        {/* View More Button */}
        {nearbyJobs.length > 0 && (
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold">
              <TrendingUp className="h-5 w-5 mr-2" />
              View All Jobs in {userLocation?.city}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyJobs;