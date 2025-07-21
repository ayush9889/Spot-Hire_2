import React, { useState } from 'react';
import { 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Users, 
  DollarSign, 
  BarChart3, 
  Save,
  RefreshCw,
  Eye,
  Edit,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Briefcase,
  Zap,
  X
} from 'lucide-react';
import { AdminCoinSettings } from '../../types';
import { dynamicCoinPricing, defaultAdminSettings } from '../../lib/dynamicCoinPricing';

interface CoinSystemAdminProps {
  onClose?: () => void;
}

const CoinSystemAdmin: React.FC<CoinSystemAdminProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<AdminCoinSettings>(dynamicCoinPricing.getSettings());
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'earnings' | 'insights'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mock analytics data
  const analytics = {
    totalRevenue: 125000,
    totalCoinsSold: 25000,
    totalContactReveals: 8500,
    averageCostPerReveal: 8.5,
    topEarningCategories: [
      { category: 'Electricians', revenue: 25000, reveals: 1200 },
      { category: 'Plumbers', revenue: 22000, reveals: 1100 },
      { category: 'Delivery & Logistics', revenue: 18000, reveals: 900 },
      { category: 'Security Guards', revenue: 15000, reveals: 750 },
      { category: 'Cooks & Chefs', revenue: 12000, reveals: 600 }
    ],
    topEarningLocations: [
      { location: 'Mumbai', revenue: 35000, multiplier: 1.5 },
      { location: 'Delhi', revenue: 30000, multiplier: 1.4 },
      { location: 'Bangalore', revenue: 25000, multiplier: 1.3 },
      { location: 'Hyderabad', revenue: 15000, multiplier: 1.2 },
      { location: 'Chennai', revenue: 10000, multiplier: 1.1 }
    ],
    dailyStats: {
      todayRevenue: 2500,
      todayReveals: 120,
      todayNewUsers: 45,
      todayCoinPurchases: 35
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Mock API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      dynamicCoinPricing.updateSettings(settings);
      setIsEditing(false);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings(defaultAdminSettings);
    }
  };

  const updateSetting = (key: keyof AdminCoinSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateLocationMultiplier = (location: string, multiplier: number) => {
    setSettings(prev => ({
      ...prev,
      locationMultipliers: {
        ...prev.locationMultipliers,
        [location]: multiplier
      }
    }));
  };

  const updateCategoryMultiplier = (category: string, multiplier: number) => {
    setSettings(prev => ({
      ...prev,
      categoryMultipliers: {
        ...prev.categoryMultipliers,
        [category]: multiplier
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Coin System Admin</h2>
              <p className="text-purple-100 text-sm">Manage dynamic pricing and coin system</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white hover:text-purple-100">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'pricing', label: 'Pricing', icon: DollarSign },
          { id: 'earnings', label: 'Earnings', icon: TrendingUp },
          { id: 'insights', label: 'Insights', icon: Eye }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-green-600 font-semibold">Total Revenue</div>
                    <div className="text-lg font-bold">₹{analytics.totalRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-blue-600 font-semibold">Coins Sold</div>
                    <div className="text-lg font-bold">{analytics.totalCoinsSold.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  <div>
                    <div className="text-purple-600 font-semibold">Contact Reveals</div>
                    <div className="text-lg font-bold">{analytics.totalContactReveals.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                  <div>
                    <div className="text-orange-600 font-semibold">Avg Cost/Reveal</div>
                    <div className="text-lg font-bold">{analytics.averageCostPerReveal} coins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Today's Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{analytics.dailyStats.todayRevenue}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analytics.dailyStats.todayReveals}</div>
                  <div className="text-sm text-gray-600">Reveals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analytics.dailyStats.todayNewUsers}</div>
                  <div className="text-sm text-gray-600">New Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analytics.dailyStats.todayCoinPurchases}</div>
                  <div className="text-sm text-gray-600">Purchases</div>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Top Earning Categories</h3>
              <div className="space-y-2">
                {analytics.topEarningCategories.map((cat, index) => (
                  <div key={cat.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{cat.category}</div>
                        <div className="text-sm text-gray-600">{cat.reveals} reveals</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">₹{cat.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Dynamic Pricing Settings</h3>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveSettings}
                      disabled={saving}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleResetToDefaults}
                      className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reset
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Base Cost */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Contact Cost (coins)
              </label>
              <input
                type="number"
                value={settings.baseContactCost}
                onChange={(e) => updateSetting('baseContactCost', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                min="1"
                max="50"
              />
              <p className="text-sm text-gray-600 mt-1">
                Base cost for revealing any job contact information
              </p>
            </div>

            {/* Location Multipliers */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Location Multipliers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.locationMultipliers).map(([location, multiplier]) => (
                  <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="font-medium">{location}</span>
                    </div>
                    <input
                      type="number"
                      value={multiplier}
                      onChange={(e) => updateLocationMultiplier(location, parseFloat(e.target.value))}
                      disabled={!isEditing}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center disabled:bg-gray-100"
                      min="0.5"
                      max="3"
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Category Multipliers */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Category Multipliers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.categoryMultipliers).map(([category, multiplier]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="font-medium">{category}</span>
                    </div>
                    <input
                      type="number"
                      value={multiplier}
                      onChange={(e) => updateCategoryMultiplier(category, parseFloat(e.target.value))}
                      disabled={!isEditing}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center disabled:bg-gray-100"
                      min="0.5"
                      max="3"
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Demand Thresholds */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Demand Thresholds</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Low Demand</label>
                  <input
                    type="number"
                    value={settings.demandThresholds.low}
                    onChange={(e) => updateSetting('demandThresholds', { ...settings.demandThresholds, low: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="1"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medium Demand</label>
                  <input
                    type="number"
                    value={settings.demandThresholds.medium}
                    onChange={(e) => updateSetting('demandThresholds', { ...settings.demandThresholds, medium: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="1"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">High Demand</label>
                  <input
                    type="number"
                    value={settings.demandThresholds.high}
                    onChange={(e) => updateSetting('demandThresholds', { ...settings.demandThresholds, high: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Earning System Settings</h3>

            {/* Earning Rates */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Earning Rates (coins per activity)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Login</label>
                  <input
                    type="number"
                    value={settings.earningRates.dailyLogin}
                    onChange={(e) => updateSetting('earningRates', { ...settings.earningRates, dailyLogin: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="0"
                    max="10"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Completion</label>
                  <input
                    type="number"
                    value={settings.earningRates.profileCompletion}
                    onChange={(e) => updateSetting('earningRates', { ...settings.earningRates, profileCompletion: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="0"
                    max="20"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referral Bonus</label>
                  <input
                    type="number"
                    value={settings.earningRates.referral}
                    onChange={(e) => updateSetting('earningRates', { ...settings.earningRates, referral: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="0"
                    max="50"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Bonus</label>
                  <input
                    type="number"
                    value={settings.earningRates.review}
                    onChange={(e) => updateSetting('earningRates', { ...settings.earningRates, review: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
            </div>

            {/* Limits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Daily Earnings (coins)</label>
                <input
                  type="number"
                  value={settings.maxDailyEarnings}
                  onChange={(e) => updateSetting('maxDailyEarnings', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                  min="10"
                  max="200"
                />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Coin Expiry (days)</label>
                <input
                  type="number"
                  value={settings.coinExpiryDays}
                  onChange={(e) => updateSetting('coinExpiryDays', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-2 py-1 border border-gray-300 rounded disabled:bg-gray-100"
                  min="30"
                  max="1095"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">System Insights</h3>

            {/* Top Locations */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Top Earning Locations</h4>
              <div className="space-y-2">
                {analytics.topEarningLocations.map((loc, index) => (
                  <div key={loc.location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{loc.location}</div>
                        <div className="text-sm text-gray-600">Multiplier: {loc.multiplier}x</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">₹{loc.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">System Health</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">Dynamic Pricing</div>
                    <div className="text-sm text-gray-600">Active and working correctly</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">Payment Gateways</div>
                    <div className="text-sm text-gray-600">All gateways operational</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">Coin System</div>
                    <div className="text-sm text-gray-600">Balances synced correctly</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">Analytics</div>
                    <div className="text-sm text-gray-600">Real-time data available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinSystemAdmin; 