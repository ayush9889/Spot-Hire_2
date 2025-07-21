import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';
import JobCard from '../jobs/JobCard';
import JobSearch from '../jobs/JobSearch';
import JobDetails from '../jobs/JobDetails';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Search,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface JobSeekerDashboardProps {
  onBackToHome?: () => void;
}

const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { filteredJobs, applyToJob, getApplicationsByJobSeeker } = useJobs();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const applications = getApplicationsByJobSeeker(user?.id || '');
  const appliedJobIds = applications.map(app => app.jobId);

  const handleApply = async (jobId: string) => {
    await applyToJob(jobId);
  };

  const handleViewDetails = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const selectedJobData = filteredJobs.find(job => job.id === selectedJob);

  const stats = [
    {
      title: 'Applied Jobs',
      value: applications.length,
      icon: Clock,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Shortlisted',
      value: applications.filter(app => app.status === 'shortlisted').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Available Jobs',
      value: filteredJobs.length,
      icon: Search,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Profile Views',
      value: 0,
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user ? `Welcome back, ${user.name}` : 'Find Your Next Job'}
        </h1>
        <p className="text-gray-600">
          {user ? 'Find your next opportunity and track your applications' : 'Browse thousands of local job opportunities'}
        </p>
      </div>

      {/* Stats - Only show if user is logged in */}
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions - Only show if user is logged in */}
      {user && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Search className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">Search Jobs</span>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Briefcase className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium text-gray-900">Update Profile</span>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">Set Job Alerts</span>
            </button>
          </div>
        </div>
      )}

      {/* Recent Applications - Only show if user is logged in and has applications */}
      {user && applications.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {applications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{application.job.title}</h3>
                  <p className="text-sm text-gray-600">{application.job.employer.businessName}</p>
                  <p className="text-sm text-gray-500">
                    Applied on {new Date(application.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                    application.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Search */}
      <JobSearch />

      {/* Job Listings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {user ? 'Recommended Jobs' : 'Available Jobs'} ({filteredJobs.length})
          </h2>
          {!user && (
            <button
              onClick={() => {/* This will be handled by the auth modal */}}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up to apply →
            </button>
          )}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={user && !appliedJobIds.includes(job.id) ? handleApply : undefined}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && selectedJobData && (
        <JobDetails
          job={selectedJobData}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;