import React, { useState } from 'react';
import { Job } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import { MapPin, Clock, DollarSign, Building, Users, Coins, Phone, Eye, EyeOff, MessageCircle } from 'lucide-react';
import WhatsAppApplyButton from '../features/WhatsAppApplyButton';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  showEmployerInfo?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onApply, 
  onViewDetails, 
  showEmployerInfo = true 
}) => {
  const { user } = useAuth();
  const { purchaseContact, hasContactAccess } = useJobs();
  const { calculateContactCost, hasEnoughCoins, getBalance } = useCoinWallet();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const hasAccess = user ? hasContactAccess(job.id, user.id) : false;
  const dynamicCost = calculateContactCost(job);
  const canAffordContact = user ? hasEnoughCoins(dynamicCost.finalCost) : false;

  const formatSalary = (compensation: Job['compensation']) => {
    if (compensation.type === 'negotiable') return 'Negotiable';
    if (compensation.min && compensation.max) {
      return `₹${compensation.min.toLocaleString()} - ₹${compensation.max.toLocaleString()}`;
    }
    return 'Not specified';
  };

  const formatJobType = (type: Job['type']) => {
    switch (type) {
      case 'full-time': return 'Full Time';
      case 'part-time': return 'Part Time';
      case 'gig': return 'Gig Work';
      case 'temporary': return 'Temporary';
      default: return type;
    }
  };

  const getJobTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'gig': return 'bg-purple-100 text-purple-800';
      case 'temporary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContactPurchase = async () => {
    if (!user) {
      // Show login modal instead of blocking
      alert('Please login to contact employers');
      return;
    }
    
    if (!canAffordContact) {
      alert('Insufficient coins. Please buy more coins to contact this employer.');
      return;
    }

    setLoading(true);
    try {
      await spendCoins(job.contactCost);
      const contact = await purchaseContact(job.id);
      setContactInfo(contact.contactInfo);
      setShowContactModal(true);
    } catch (error) {
      alert('Failed to purchase contact information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            {showEmployerInfo && (
              <div className="flex items-center text-gray-600 mb-2">
                <Building className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {job.employer.hideContactInfo ? job.employer.maskedBusinessName : job.employer.businessName}
                </span>
                {job.employer.isVerified && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {job.location.city}, {job.location.state}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
              {formatJobType(job.type)}
            </span>
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{job.applicationsCount} applied</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              {formatSalary(job.compensation)}
              {job.compensation.type !== 'negotiable' && (
                <span className="text-gray-500 ml-1">
                  / {job.compensation.type === 'hourly' ? 'hour' : 
                     job.compensation.type === 'daily' ? 'day' : 'month'}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {job.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Cost Display */}
        {user?.role === 'jobseeker' && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">
                  Contact info costs {dynamicCost.finalCost} coins
                </span>
              </div>
              {hasAccess && (
                <div className="flex items-center text-green-600">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-xs">Purchased</span>
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-yellow-700">
              Dynamic pricing based on location, category, demand & recency
            </div>
          </div>
        )}

        {/* WhatsApp Apply Button */}
        <div className="mb-4">
          {user?.role === 'jobseeker' ? (
            <WhatsAppApplyButton 
              job={job}
              onSuccess={(application) => {
                console.log('WhatsApp application sent:', application);
              }}
              onError={(error) => {
                console.error('WhatsApp application error:', error);
              }}
            />
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-green-800 font-medium">Apply via WhatsApp</div>
                    <div className="text-green-700 text-sm">Login as a job seeker to apply directly via WhatsApp</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Login to Apply
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails?.(job.id)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          
          {user?.role === 'jobseeker' && (
            <>
              {hasAccess ? (
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </button>
              ) : (
                <button
                  onClick={handleContactPurchase}
                  disabled={!canAffordContact || loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    'Purchasing...'
                  ) : (
                    <>
                                        <Coins className="h-4 w-4 mr-1" />
                  Get Contact ({dynamicCost.finalCost})
                    </>
                  )}
                </button>
              )}
            </>
          )}

          {onApply && user?.role === 'jobseeker' && (
            <button
              onClick={() => onApply(job.id)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* Contact Info Modal */}
      {showContactModal && contactInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <p className="text-gray-900 font-medium">{contactInfo.businessName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-600 mr-2" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="text-gray-700">{contactInfo.address}</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Call during business hours for better response. 
                  Mention you found this job on Spot Hire.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;