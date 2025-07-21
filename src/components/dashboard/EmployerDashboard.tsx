import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';
import JobCard from '../jobs/JobCard';
import { 
  PlusCircle,
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

interface EmployerDashboardProps {
  onBackToHome?: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { getJobsByEmployer, getApplicationsByJob, postJob, updateApplicationStatus, loading } = useJobs();
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJobApplications, setSelectedJobApplications] = useState<string | null>(null);

  const employerJobs = getJobsByEmployer(user?.id || '');
  const totalApplications = employerJobs.reduce((sum, job) => sum + job.applicationsCount, 0);

  const stats = [
    {
      title: 'Active Jobs',
      value: employerJobs.filter(job => job.status === 'active').length,
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Profile Views',
      value: 0,
      icon: Eye,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Hired',
      value: 0,
      icon: CheckCircle,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const handleViewApplications = (jobId: string) => {
    setSelectedJobApplications(jobId);
  };

  const selectedJobData = employerJobs.find(job => job.id === selectedJobApplications);
  const jobApplications = selectedJobApplications ? getApplicationsByJob(selectedJobApplications) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="mb-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">
            Manage your job postings and find the right people for your business
          </p>
        </div>
        <button
          onClick={() => setShowJobForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowJobForm(true)}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PlusCircle className="h-5 w-5 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Post New Job</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">View Analytics</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-5 w-5 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">Schedule Interviews</span>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      {totalApplications > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {employerJobs.slice(0, 3).map((job) => {
              const applications = getApplicationsByJob(job.id);
              const recentApplication = applications[0];
              
              if (!recentApplication) return null;
              
              return (
                <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      New application from {recentApplication.jobSeeker.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(recentApplication.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleViewApplications(job.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Listings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Job Postings ({employerJobs.length})
          </h2>
        </div>

        {employerJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
            <p className="text-gray-600 mb-4">
              Start by posting your first job to find reliable staff for your business.
            </p>
            <button
              onClick={() => setShowJobForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={() => handleViewApplications(job.id)}
                showEmployerInfo={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Posting Form Modal */}
      {showJobForm && (
        <JobPostingForm
          onClose={() => setShowJobForm(false)}
          onSubmit={postJob}
          loading={loading}
        />
      )}

      {/* Applications Modal */}
      {selectedJobApplications && selectedJobData && (
        <ApplicationsModal
          job={selectedJobData}
          applications={jobApplications}
          onClose={() => setSelectedJobApplications(null)}
          onUpdateStatus={updateApplicationStatus}
        />
      )}
    </div>
  );
};

// Job Posting Form Component
interface JobPostingFormProps {
  onClose: () => void;
  onSubmit: (jobData: any) => Promise<void>;
  loading: boolean;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({ onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'retail',
    type: 'full-time',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isRemote: false,
    compensationType: 'monthly',
    minSalary: '',
    maxSalary: '',
    requirements: ''
  });

  const categories = [
    { value: 'retail', label: 'Retail & Sales' },
    { value: 'food-service', label: 'Food Service' },
    { value: 'hotel-hospitality', label: 'Hotel & Hospitality' },
    { value: 'delivery', label: 'Delivery & Logistics' },
    { value: 'security', label: 'Security & Safety' },
    { value: 'cleaning-maintenance', label: 'Cleaning & Maintenance' },
    { value: 'beauty-wellness', label: 'Beauty & Wellness' },
    { value: 'construction', label: 'Construction & Labor' },
    { value: 'domestic', label: 'Domestic Help' },
    { value: 'admin', label: 'Admin & Office' },
    { value: 'driving', label: 'Driving' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isRemote: formData.isRemote
      },
      compensation: {
        type: formData.compensationType,
        min: formData.minSalary ? Number(formData.minSalary) : undefined,
        max: formData.maxSalary ? Number(formData.maxSalary) : undefined
      },
      requirements: formData.requirements.split(',').map(req => req.trim()).filter(Boolean)
    };

    await onSubmit(jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Post New Job</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Shop Assistant, Waiter, Delivery Partner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the job responsibilities, working hours, and what you're looking for..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="gig">Gig Work</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shop/business address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Maharashtra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="400001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary/Compensation
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={formData.compensationType}
                  onChange={(e) => setFormData({ ...formData, compensationType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hourly">Per Hour</option>
                  <option value="daily">Per Day</option>
                  <option value="monthly">Per Month</option>
                  <option value="negotiable">Negotiable</option>
                </select>

                {formData.compensationType !== 'negotiable' && (
                  <>
                    <input
                      type="number"
                      value={formData.minSalary}
                      onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min Amount (₹)"
                    />
                    <input
                      type="number"
                      value={formData.maxSalary}
                      onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max Amount (₹)"
                    />
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements/Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Customer Service, Basic English, No Experience Required"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Applications Modal Component
interface ApplicationsModalProps {
  job: any;
  applications: any[];
  onClose: () => void;
  onUpdateStatus: (applicationId: string, status: any) => Promise<void>;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({ 
  job, 
  applications, 
  onClose, 
  onUpdateStatus 
}) => {
  const handleStatusUpdate = async (applicationId: string, status: any) => {
    await onUpdateStatus(applicationId, status);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600">Applications ({applications.length})</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">
                Applications will appear here once people apply for this job.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{application.jobSeeker.name}</h3>
                      <p className="text-sm text-gray-600">{application.jobSeeker.email}</p>
                      <p className="text-sm text-gray-600">{application.jobSeeker.phone}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {application.message && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {application.message}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {application.jobSeeker.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'viewed')}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Mark as Viewed
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'shortlisted')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'contacted')}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'rejected')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;