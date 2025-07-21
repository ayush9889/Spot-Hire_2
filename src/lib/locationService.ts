// Location service for handling geolocation and address resolution
export interface LocationData {
  city: string;
  state: string;
  country: string;
  pincode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NearbyJobsFilter {
  radius: number; // in kilometers
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Mock geocoding service (in production, use Google Maps API or similar)
export async function reverseGeocode(lat: number, lng: number): Promise<LocationData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data based on coordinates (in production, use real geocoding service)
  const mockLocations: { [key: string]: LocationData } = {
    'mumbai': {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      coordinates: { lat, lng }
    },
    'delhi': {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001',
      coordinates: { lat, lng }
    },
    'bangalore': {
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001',
      coordinates: { lat, lng }
    }
  };
  
  // Simple logic to determine city based on coordinates
  if (lat >= 19.0 && lat <= 19.3 && lng >= 72.8 && lng <= 73.0) {
    return mockLocations.mumbai;
  } else if (lat >= 28.4 && lat <= 28.8 && lng >= 77.0 && lng <= 77.4) {
    return mockLocations.delhi;
  } else {
    return mockLocations.bangalore;
  }
}

// Get nearby jobs based on user location
export function filterJobsByLocation<T extends { location: { city: string; state: string } }>(
  jobs: T[],
  userLocation: LocationData,
  radius: number = 25
): T[] {
  return jobs.filter(job => {
    // Simple city-based filtering (in production, use coordinate-based filtering)
    const isSameCity = job.location.city.toLowerCase() === userLocation.city.toLowerCase();
    const isSameState = job.location.state.toLowerCase() === userLocation.state.toLowerCase();
    
    // Prioritize same city, then same state
    return isSameCity || isSameState;
  });
}

// Sort jobs by distance from user location
export function sortJobsByDistance<T extends { 
  location: { city: string; state: string };
  distance?: number;
}>(
  jobs: T[],
  userLocation: LocationData
): T[] {
  return jobs
    .map(job => ({
      ...job,
      distance: job.location.city.toLowerCase() === userLocation.city.toLowerCase() 
        ? Math.random() * 5 // Same city: 0-5 km
        : Math.random() * 20 + 10 // Different city: 10-30 km
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Get popular locations for job search suggestions
export function getPopularLocations(): string[] {
  return [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Hyderabad, Telangana',
    'Pune, Maharashtra',
    'Ahmedabad, Gujarat',
    'Surat, Gujarat',
    'Jaipur, Rajasthan',
    'Lucknow, Uttar Pradesh',
    'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra',
    'Indore, Madhya Pradesh',
    'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh',
    'Pimpri-Chinchwad, Maharashtra',
    'Patna, Bihar',
    'Vadodara, Gujarat'
  ];
}