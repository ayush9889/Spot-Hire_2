import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../contexts/JobContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Eye,
  Phone,
  MessageCircle,
  Settings,
  Edit,
  Award,
  Target,
  Zap,
  ArrowRight,
  Plus,
  Filter,
  Calendar,
  Coins,
  Building,
  CheckCircle,
  Clock,
  Star,
  X,
  User
} from 'lucide-react';

interface EmployerDashboardProps {
  onBackToHome?: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { filteredJobs, getApplicationsByEmployer } = useJobs();
  const { getBalance, getTodayEarnings } = useCoinWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'profile' | 'earnings'>('overview');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const employer = user as any; // Type assertion for employer specific fields
  const userBalance = getBalance();
  const todayEarnings = getTodayEarnings();
  
  // Get employer's jobs
  const employerJobs = filteredJobs.filter(job => job.employerId === user?.id);
  const totalApplications = employerJobs.reduce((total, job) => {
    const jobApplications = getApplicationsByEmployer(job.id);
    return total + jobApplications.length;
  }, 0);

  // Enhanced stats with more meaningful data
  const stats = [
    {
      title: 'Active Jobs',
      value: employerJobs.filter(job => job.status === 'active').length,
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100',
      change: '+1 this week'
    },
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: Users,
      color: 'text-green-600 bg-green-100',
      change: '+5 this week'
    },
    {
      title: 'Profile Views',
      value: Math.floor(Math.random() * 50) + 10,
      icon: Eye,
      color: 'text-purple-600 bg-purple-100',
      change: '+8 today'
    },
    {
      title: 'Coins Balance',
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
      title: 'New application for Delivery Partner',
      candidate: 'Rajesh Kumar',
      time: '2 hours ago',
      status: 'new'
    },
    {
      type: 'view',
      title: 'Profile viewed by candidate',
      candidate: 'Priya Sharma',
      time: '1 day ago',
      status: 'viewed'
    },
    {
      type: 'contact',
      title: 'Contact purchased for Electrician job',
      candidate: 'Amit Patel',
      time: '2 days ago',
      status: 'contacted'
    }
  ];

  // Recent applications
  const recentApplications = employerJobs.flatMap(job => {
    const applications = getApplicationsByEmployer(job.id);
    return applications.map(app => ({
      ...app,
      jobTitle: job.title,
      candidateName: `Candidate ${app.jobSeekerId.slice(-4)}` // Mock candidate name
    }));
  }).slice(0, 5);

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
              Manage your job postings and find the perfect candidates for your business.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
              <Coins className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">{userBalance} coins</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </button>
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
            { id: 'jobs', label: 'My Jobs', icon: Briefcase },
            { id: 'applications', label: 'Applications', icon: Users },
            { id: 'profile', label: 'Profile', icon: Building },
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
                  <h3 className="text-lg font-semibold mb-2">Post New Job</h3>
                  <p className="text-blue-100 text-sm mb-4">Create a new job posting to find candidates</p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    Create Job
                  </button>
                </div>
                <Plus className="h-12 w-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">WhatsApp Integration</h3>
                  <p className="text-green-100 text-sm mb-4">Get instant applications via WhatsApp</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                    Set Up
                  </button>
                </div>
                <MessageCircle className="h-12 w-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Buy Coins</h3>
                  <p className="text-purple-100 text-sm mb-4">Purchase coins to unlock candidate contacts</p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                    Buy Now
                  </button>
                </div>
                <Coins className="h-12 w-12 text-purple-200" />
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
                      {activity.type === 'application' ? <Users className="h-4 w-4" /> :
                       activity.type === 'view' ? <Eye className="h-4 w-4" /> :
                       <Phone className="h-4 w-4" />}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.candidate} • {activity.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    activity.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{application.candidateName}</p>
                      <p className="text-sm text-gray-600">{application.jobTitle}</p>
                      <p className="text-xs text-gray-500">
                        Applied {application.appliedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      View
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Job Postings</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {employerJobs.map((job) => {
              const applications = getApplicationsByEmployer(job.id);
              
              return (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.location.city}, {job.location.state}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{applications.length}</div>
                      <div className="text-xs text-blue-700">Applications</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        ₹{job.compensation.min?.toLocaleString()}+
                      </div>
                      <div className="text-xs text-green-700">Salary</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {job.postedAt.toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Applications
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Applications</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Jobs</option>
                {employerJobs.map(job => (
                  <option key={job.id}>{job.title}</option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>New</option>
                <option>Viewed</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((application, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {application.candidateName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.jobTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {application.appliedAt.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-green-600 hover:text-green-900">Contact</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Business Profile</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <p className="text-gray-900">{employer?.businessName || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <p className="text-gray-900">{employer?.businessType || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
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
            
            {employer?.description && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                <p className="text-gray-900">{employer.description}</p>
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
                  <p className="text-sm font-medium text-gray-600">Today's Spending</p>
                  <p className="text-2xl font-bold text-gray-900">-{todayEarnings}</p>
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
                  <p className="text-2xl font-bold text-gray-900">-25</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coin Usage History</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Contact Purchase</p>
                    <p className="text-sm text-gray-600">Unlocked Rajesh Kumar's contact</p>
                  </div>
                </div>
                <span className="text-red-600 font-medium">-5 Coins</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Contact Purchase</p>
                    <p className="text-sm text-gray-600">Unlocked Priya Sharma's contact</p>
                  </div>
                </div>
                <span className="text-red-600 font-medium">-5 Coins</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Plus className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Coin Purchase</p>
                    <p className="text-sm text-gray-600">Bought 50 coins</p>
                  </div>
                </div>
                <span className="text-green-600 font-medium">+50 Coins</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;