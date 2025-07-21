import React, { useState } from 'react';
import { Job } from '../../types';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
  const { applyToJob, loading } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!isAuthenticated) {
      alert('Please login to apply for jobs');
      return;
    }

    try {
      await applyToJob(job.id, applicationMessage);
      setIsApplying(false);
      setApplicationMessage('');
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <Building className="h-5 w-5 mr-2" />
                <span className="font-medium">{job.employer.businessName}</span>
                {job.employer.isVerified && (
                  <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
                )}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location.address}, {job.location.city}, {job.location.state}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-700 mb-1">
                <DollarSign className="h-4 w-4 mr-2" />
                <span className="font-medium">Compensation</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatSalary(job.compensation)}
              </p>
              {job.compensation.type !== 'negotiable' && (
                <p className="text-sm text-gray-600">
                  per {job.compensation.type === 'hourly' ? 'hour' : 
                      job.compensation.type === 'daily' ? 'day' : 'month'}
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-700 mb-1">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">Job Type</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatJobType(job.type)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-700 mb-1">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">Applications</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {job.applicationsCount}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          {job.requirements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h2>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{job.employer.businessName}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.employer.businessType}</p>
              {job.employer.description && (
                <p className="text-sm text-gray-700">{job.employer.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Posted on {new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Expires on {new Date(job.expiresAt).toLocaleDateString()}</span>
            </div>
          </div>

          {user?.role === 'jobseeker' && (
            <div className="border-t border-gray-200 pt-6">
              {!isApplying ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsApplying(true)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Apply for this Job
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Message (Optional)
                    </label>
                    <textarea
                      value={applicationMessage}
                      onChange={(e) => setApplicationMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell the employer why you're interested in this position..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleApply}
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      onClick={() => setIsApplying(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;