import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import JobCard from '../jobs/JobCard';
import JobSearch from '../jobs/JobSearch';
import JobDetails from '../jobs/JobDetails';
import WhatsAppApplyButton from '../features/WhatsAppApplyButton';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Search,
  TrendingUp,
  MapPin,
  User,
  Coins,
  Star,
  Calendar,
  Phone,
  MessageCircle,
  Settings,
  Edit,
  Award,
  Target,
  Zap,
  ArrowRight,
  Eye,
  Heart,
  X
} from 'lucide-react';

interface JobSeekerDashboardProps {
  onBackToHome?: () => void;
}

const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { filteredJobs, applyToJob, getApplicationsByJobSeeker } = useJobs();
  const { getBalance, getTodayEarnings } = useCoinWallet();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'profile' | 'earnings'>('overview');

  const jobSeeker = user as any; // Type assertion for job seeker specific fields
  const applications = getApplicationsByJobSeeker(user?.id || '');
  const appliedJobIds = applications.map(app => app.jobId);
  const userBalance = getBalance();
  const todayEarnings = getTodayEarnings();

  const handleApply = async (jobId: string) => {
    await applyToJob(jobId);
  };

  const handleViewDetails = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const selectedJobData = filteredJobs.find(job => job.id === selectedJob);

  // Enhanced stats with more meaningful data
  const stats = [
    {
      title: 'Applied Jobs',
      value: applications.length,
      icon: Clock,
      color: 'text-blue-600 bg-blue-100',
      change: '+2 this week'
    },
    {
      title: 'Shortlisted',
      value: applications.filter(app => app.status === 'shortlisted').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
      change: '+1 this week'
    },
    {
      title: 'Profile Views',
      value: Math.floor(Math.random() * 20) + 5,
      icon: Eye,
      color: 'text-purple-600 bg-purple-100',
      change: '+3 today'
    },
    {
      title: 'Coins Earned',
      value: userBalance,
      icon: Coins,
      color: 'text-yellow-600 bg-yellow-100',
      change: `+${todayEarnings} today`
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      type: 'application',
      title: 'Applied for Delivery Partner',
      company: 'Quick Delivery Services',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'view',
      title: 'Profile viewed by employer',
      company: 'Fashion Hub Store',
      time: '1 day ago',
      status: 'viewed'
    },
    {
      type: 'shortlist',
      title: 'Shortlisted for Retail Associate',
      company: 'Mega Mart',
      time: '2 days ago',
      status: 'shortlisted'
    }
  ];

  // Recommended jobs based on user preferences
  const recommendedJobs = filteredJobs
    .filter(job => !appliedJobIds.includes(job.id))
    .filter(job => jobSeeker?.preferredCategories?.includes(job.category))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-4 text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Home
          </button>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Ready to find your next opportunity? Here's what's happening with your job search.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
              <Coins className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">{userBalance} coins</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'applications', label: 'Applications', icon: Briefcase },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'earnings', label: 'Earnings', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
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
                <div className="mt-2">
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Apply via WhatsApp</h3>
                  <p className="text-blue-100 text-sm mb-4">Send instant applications to employers</p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    Try Now
                  </button>
                </div>
                <MessageCircle className="h-12 w-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Earn Coins</h3>
                  <p className="text-green-100 text-sm mb-4">Complete tasks to earn more coins</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                    View Tasks
                  </button>
                </div>
                <Zap className="h-12 w-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Profile Boost</h3>
                  <p className="text-purple-100 text-sm mb-4">Get more profile views from employers</p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                    Boost Now
                  </button>
                </div>
                <Target className="h-12 w-12 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'application' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'view' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {activity.type === 'application' ? <Briefcase className="h-4 w-4" /> :
                       activity.type === 'view' ? <Eye className="h-4 w-4" /> :
                       <CheckCircle className="h-4 w-4" />}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.company} • {activity.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.employer.businessName}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location.city}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      ₹{job.compensation.min?.toLocaleString()}+
                    </span>
                    <button
                      onClick={() => handleViewDetails(job.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Pending</option>
                <option>Viewed</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications.map((application) => {
              const job = filteredJobs.find(j => j.id === application.jobId);
              if (!job) return null;
              
              return (
                <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.employer.businessName}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied on {application.appliedAt.toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(job.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Job
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <p className="text-gray-900">{user?.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <p className="text-gray-900">{user?.location.city}, {user?.location.state}</p>
              </div>
            </div>
            
            {jobSeeker && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Skills & Experience</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {jobSeeker.skills?.map((skill: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <p className="text-gray-900">{jobSeeker.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <p className="text-gray-900">{jobSeeker.availability}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Coins</p>
                  <p className="text-2xl font-bold text-gray-900">{userBalance}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">+{todayEarnings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">+15</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earning Opportunities</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Complete Profile</p>
                    <p className="text-sm text-gray-600">Add all your details to earn coins</p>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  +5 Coins
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Refer Friends</p>
                    <p className="text-sm text-gray-600">Invite friends to join Spot Hire</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  +10 Coins
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Daily Login</p>
                    <p className="text-sm text-gray-600">Log in daily to earn coins</p>
                  </div>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  +2 Coins
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && selectedJobData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <JobCard job={selectedJobData} onViewDetails={() => setSelectedJob(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;