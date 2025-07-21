import React, { useState } from 'react';
import { 
  MessageCircle, 
  Users, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  Plus, 
  Settings,
  Coins,
  TrendingUp,
  Shield,
  Eye,
  Send,
  Phone,
  X
} from 'lucide-react';
import { JobCategory } from '../../types';
import { whatsappIntegration, WhatsAppBroadcastChannel } from '../../lib/whatsappIntegration';

interface WhatsAppChannelsProps {
  userCity?: string;
  userRole?: 'employer' | 'jobseeker';
}

const WhatsAppChannels: React.FC<WhatsAppChannelsProps> = ({ userCity, userRole }) => {
  const [selectedChannel, setSelectedChannel] = useState<WhatsAppBroadcastChannel | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Mock channels data
  const channels: WhatsAppBroadcastChannel[] = [
    {
      id: '1',
      name: 'Electricians | Mumbai Jobs',
      description: 'Verified electrician jobs in Mumbai',
      city: 'Mumbai',
      skill: 'electricians',
      memberCount: 1250,
      isVerified: true,
      adminPhone: '+91 9876543210',
      coinCost: 5,
      isActive: true
    },
    {
      id: '2',
      name: 'Drivers | Delhi Jobs',
      description: 'Driver opportunities in Delhi NCR',
      city: 'Delhi',
      skill: 'driving',
      memberCount: 890,
      isVerified: true,
      adminPhone: '+91 9876543211',
      coinCost: 3,
      isActive: true
    },
    {
      id: '3',
      name: 'Housekeeping | Bangalore',
      description: 'Housekeeping and cleaning jobs',
      city: 'Bangalore',
      skill: 'housekeeping-cleaning',
      memberCount: 650,
      isVerified: false,
      adminPhone: '+91 9876543212',
      coinCost: 2,
      isActive: true
    },
    {
      id: '4',
      name: 'Cooks & Chefs | Pune',
      description: 'Kitchen staff and chef positions',
      city: 'Pune',
      skill: 'cooks-chefs',
      memberCount: 420,
      isVerified: true,
      adminPhone: '+91 9876543213',
      coinCost: 4,
      isActive: true
    }
  ];

  const handleJoinChannel = async (channel: WhatsAppBroadcastChannel) => {
    setIsJoining(true);
    try {
      // Mock API call to join channel
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Open WhatsApp with join link
      const message = `Hi! I'd like to join the ${channel.name} group. I'm looking for ${channel.skill} jobs in ${channel.city}.`;
      const whatsappUrl = `https://wa.me/${channel.adminPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Failed to join channel:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateChannel = async (formData: {
    name: string;
    city: string;
    skill: JobCategory;
    adminPhone: string;
    coinCost: number;
  }) => {
    try {
      const channel = await whatsappIntegration.createBroadcastChannel(
        formData.name,
        formData.city,
        formData.skill,
        formData.adminPhone,
        formData.coinCost
      );
      
      setShowCreateModal(false);
      // Refresh channels list
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  const getSkillIcon = (skill: JobCategory) => {
    switch (skill) {
      case 'electricians': return '⚡';
      case 'driving': return '🚗';
      case 'housekeeping-cleaning': return '🧹';
      case 'cooks-chefs': return '👨‍🍳';
      case 'plumbers': return '🔧';
      case 'security-guards': return '🛡️';
      case 'delivery-logistics': return '📦';
      case 'construction-labor': return '🏗️';
      default: return '💼';
    }
  };

  const getSkillName = (skill: JobCategory) => {
    switch (skill) {
      case 'electricians': return 'Electricians';
      case 'driving': return 'Drivers';
      case 'housekeeping-cleaning': return 'Housekeeping';
      case 'cooks-chefs': return 'Cooks & Chefs';
      case 'plumbers': return 'Plumbers';
      case 'security-guards': return 'Security Guards';
      case 'delivery-logistics': return 'Delivery';
      case 'construction-labor': return 'Construction';
      default: return skill;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">WhatsApp Job Channels</h2>
          <p className="text-gray-600">Join hyperlocal job groups for instant updates</p>
        </div>
        {userRole === 'employer' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Channel
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-blue-900">3,210</div>
              <div className="text-blue-700">Total Members</div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-900">4</div>
              <div className="text-green-700">Active Channels</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-purple-900">156</div>
              <div className="text-purple-700">Jobs Posted Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* Channel Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getSkillIcon(channel.skill)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                </div>
                {channel.isVerified && (
                  <CheckCircle className="h-5 w-5 text-blue-600" title="Verified Channel" />
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {channel.city}
                <span className="mx-2">•</span>
                <Users className="h-4 w-4 mr-1" />
                {channel.memberCount.toLocaleString()} members
              </div>
            </div>

            {/* Channel Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm text-gray-600">
                    {channel.coinCost} coins to post
                  </span>
                </div>
                <div className="flex items-center">
                  {channel.isVerified ? (
                    <Shield className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs ${channel.isVerified ? 'text-green-600' : 'text-gray-500'}`}>
                    {channel.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleJoinChannel(channel)}
                  disabled={isJoining}
                  className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isJoining ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Joining...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Join Channel
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setSelectedChannel(channel)}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Details Modal */}
      {selectedChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Channel Details</h3>
                <button
                  onClick={() => setSelectedChannel(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{getSkillIcon(selectedChannel.skill)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedChannel.name}</h4>
                      <p className="text-gray-600">{selectedChannel.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedChannel.memberCount}</div>
                    <div className="text-sm text-blue-700">Members</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedChannel.coinCost}</div>
                    <div className="text-sm text-green-700">Coins to Post</div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-900 mb-2">How it works:</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Join the WhatsApp group for instant job updates</li>
                    <li>• Employers can post jobs for {selectedChannel.coinCost} coins</li>
                    <li>• All posts are verified and spam-free</li>
                    <li>• Get notified immediately when new jobs are posted</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleJoinChannel(selectedChannel)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    Join via WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(`tel:${selectedChannel.adminPhone}`, '_self')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="h-4 w-4 inline mr-2" />
                    Call Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Channel Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create WhatsApp Channel</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Electricians | Mumbai Jobs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mumbai"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="electricians">Electricians</option>
                    <option value="driving">Drivers</option>
                    <option value="housekeeping-cleaning">Housekeeping</option>
                    <option value="cooks-chefs">Cooks & Chefs</option>
                    <option value="plumbers">Plumbers</option>
                    <option value="security-guards">Security Guards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coin Cost per Post
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Create Channel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChannels; 