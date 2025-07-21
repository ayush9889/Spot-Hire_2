import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  Clock, 
  Gift, 
  Users, 
  Star, 
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Zap,
  Target,
  Calendar,
  DollarSign,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import { useAuth } from '../../contexts/AuthContext';
import { CoinTransaction, ContactReveal, PaymentGateway } from '../../types';

interface CoinWalletProps {
  onClose?: () => void;
}

const CoinWallet: React.FC<CoinWalletProps> = ({ onClose }) => {
  const { user } = useAuth();
  const {
    wallet,
    loading,
    error,
    getBalance,
    getTransactions,
    getContactReveals,
    getTodayEarnings,
    canEarnToday,
    earnCoins,
    purchaseCoins,
    getPaymentGateways,
    calculateContactCost
  } = useCoinWallet();

  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'earn' | 'buy'>('overview');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [selectedGateway, setSelectedGateway] = useState<string>('razorpay');
  const [purchasing, setPurchasing] = useState(false);

  const transactions = getTransactions();
  const contactReveals = getContactReveals();
  const paymentGateways = getPaymentGateways();
  const todayEarnings = getTodayEarnings();

  const handleEarnCoins = async (type: 'daily_login' | 'profile_completion' | 'referral' | 'review') => {
    try {
      const success = await earnCoins(type);
      if (success) {
        alert(`Successfully earned coins for ${type}!`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to earn coins');
    }
  };

  const handlePurchaseCoins = async () => {
    setPurchasing(true);
    try {
      const success = await purchaseCoins(selectedAmount, selectedGateway);
      if (success) {
        alert(`Successfully purchased ${selectedAmount} coins!`);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  const getTransactionIcon = (type: CoinTransaction['type']) => {
    switch (type) {
      case 'purchase': return <Plus className="h-4 w-4 text-green-600" />;
      case 'spend': return <Minus className="h-4 w-4 text-red-600" />;
      case 'bonus': return <Gift className="h-4 w-4 text-blue-600" />;
      case 'refund': return <RefreshCw className="h-4 w-4 text-orange-600" />;
      default: return <Coins className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: CoinTransaction['type']) => {
    switch (type) {
      case 'purchase': return 'text-green-600';
      case 'spend': return 'text-red-600';
      case 'bonus': return 'text-blue-600';
      case 'refund': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const earningOpportunities = [
    {
      type: 'daily_login' as const,
      title: 'Daily Login',
      description: 'Earn coins for logging in daily',
      icon: Calendar,
      amount: 2,
      available: canEarnToday('daily_login'),
      action: () => handleEarnCoins('daily_login')
    },
    {
      type: 'profile_completion' as const,
      title: 'Complete Profile',
      description: 'Earn coins for completing your profile',
      icon: CheckCircle,
      amount: 5,
      available: canEarnToday('profile_completion'),
      action: () => handleEarnCoins('profile_completion')
    },
    {
      type: 'referral' as const,
      title: 'Refer Friends',
      description: 'Earn coins for each friend who joins',
      icon: Users,
      amount: 10,
      available: canEarnToday('referral'),
      action: () => handleEarnCoins('referral')
    },
    {
      type: 'review' as const,
      title: 'Write Reviews',
      description: 'Earn coins for reviewing jobs',
      icon: Star,
      amount: 3,
      available: canEarnToday('review'),
      action: () => handleEarnCoins('review')
    }
  ];

  const purchaseOptions = [
    { amount: 25, price: 49, popular: false },
    { amount: 50, price: 89, popular: true },
    { amount: 100, price: 159, popular: false },
    { amount: 200, price: 299, popular: false },
    { amount: 500, price: 699, popular: false },
    { amount: 1000, price: 1299, popular: false }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading wallet...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Coin Wallet</h2>
              <p className="text-blue-100 text-sm">Manage your coins and earnings</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white hover:text-blue-100">
              <ArrowRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {getBalance()} <span className="text-2xl">🪙</span>
          </div>
          <p className="text-gray-600 mb-4">Available Coins</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-600 font-semibold">+{wallet?.totalEarned || 0}</div>
              <div className="text-gray-500">Earned</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-semibold">-{wallet?.totalSpent || 0}</div>
              <div className="text-gray-500">Spent</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-semibold">+{todayEarnings}</div>
              <div className="text-gray-500">Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'transactions', label: 'History', icon: Clock },
          { id: 'earn', label: 'Earn Coins', icon: TrendingUp },
          { id: 'buy', label: 'Buy Coins', icon: DollarSign }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-green-600 font-semibold">Total Earned</div>
                    <div className="text-lg font-bold">{wallet?.totalEarned || 0} coins</div>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <div className="text-red-600 font-semibold">Total Spent</div>
                    <div className="text-lg font-bold">{wallet?.totalSpent || 0} coins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-xs text-gray-500">
                          {transaction.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} coins
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Reveals */}
            {contactReveals.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Contact Reveals</h3>
                <div className="space-y-3">
                  {contactReveals.slice(0, 3).map((reveal) => (
                    <div key={reveal.id} className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {reveal.contactInfo.businessName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {reveal.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-red-600 font-semibold">
                          -{reveal.coinsSpent} coins
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-xs text-gray-500">
                          {transaction.createdAt.toLocaleDateString()} at {transaction.createdAt.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} coins
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Free Coins</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete activities to earn coins and unlock job contacts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earningOpportunities.map((opportunity) => (
                <div
                  key={opportunity.type}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    opportunity.available
                      ? 'border-green-200 bg-green-50 hover:border-green-300 cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  }`}
                  onClick={opportunity.available ? opportunity.action : undefined}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <opportunity.icon className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">{opportunity.title}</div>
                        <div className="text-sm text-gray-600">{opportunity.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+{opportunity.amount}</div>
                      <div className="text-xs text-gray-500">coins</div>
                    </div>
                  </div>
                  {!opportunity.available && (
                    <div className="mt-2 text-xs text-gray-500">
                      Daily limit reached
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-blue-900 font-semibold">Daily Earning Limit</div>
                  <div className="text-sm text-blue-700">
                    You can earn up to 50 coins per day through activities
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buy' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Buy Coins</h3>
              <p className="text-gray-600 text-sm">
                Purchase coins to unlock job contact information
              </p>
            </div>

            {/* Purchase Options */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {purchaseOptions.map((option) => (
                <div
                  key={option.amount}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAmount === option.amount
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${option.popular ? 'ring-2 ring-orange-200' : ''}`}
                  onClick={() => setSelectedAmount(option.amount)}
                >
                  <div className="text-center">
                    {option.popular && (
                      <div className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full mb-2">
                        Popular
                      </div>
                    )}
                    <div className="text-2xl font-bold text-gray-900">{option.amount}</div>
                    <div className="text-sm text-gray-600 mb-2">coins</div>
                    <div className="text-lg font-semibold text-gray-900">₹{option.price}</div>
                    <div className="text-xs text-gray-500">
                      ₹{(option.price / option.amount).toFixed(2)} per coin
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Gateway Selection */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentGateways.map((gateway) => (
                  <div
                    key={gateway.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedGateway === gateway.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedGateway(gateway.id)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{gateway.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{gateway.name}</div>
                        <div className="text-xs text-gray-500">Secure payment</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchaseCoins}
              disabled={purchasing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {purchasing ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Buy {selectedAmount} Coins for ₹{purchaseOptions.find(opt => opt.amount === selectedAmount)?.price}
                </>
              )}
            </button>

            <div className="text-xs text-gray-500 text-center">
              Secure payment powered by {paymentGateways.find(g => g.id === selectedGateway)?.name}
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border-t border-red-200">
          <div className="text-red-700 text-sm">{error}</div>
        </div>
      )}
    </div>
  );
};

export default CoinWallet; 