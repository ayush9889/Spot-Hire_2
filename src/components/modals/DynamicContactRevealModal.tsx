import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  Phone, 
  MessageCircle, 
  Shield, 
  Star, 
  MapPin, 
  Clock, 
  ExternalLink, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
  Zap
} from 'lucide-react';
import { Job, DynamicCoinCost, ContactReveal } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';

interface DynamicContactRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

const DynamicContactRevealModal: React.FC<DynamicContactRevealModalProps> = ({ 
  isOpen, 
  onClose, 
  job 
}) => {
  const { user } = useAuth();
  const {
    getBalance,
    hasEnoughCoins,
    revealJobContact,
    calculateContactCost,
    loading: walletLoading,
    error: walletError
  } = useCoinWallet();

  const [isRevealing, setIsRevealing] = useState(false);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [revealData, setRevealData] = useState<ContactReveal | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dynamicCost = calculateContactCost(job);
  const userBalance = getBalance();
  const hasSufficientCoins = hasEnoughCoins(dynamicCost.finalCost);

  const handleRevealContact = async () => {
    if (!user) {
      setError('Please login to reveal contact information');
      return;
    }

    if (!hasSufficientCoins) {
      setError('Insufficient coins. Please purchase more coins.');
      return;
    }

    setIsRevealing(true);
    setError(null);

    try {
      const reveal = await revealJobContact(job);
      if (reveal) {
        setRevealData(reveal);
        setContactRevealed(true);
      } else {
        setError('Failed to reveal contact information');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reveal contact');
    } finally {
      setIsRevealing(false);
    }
  };

  const handleWhatsAppContact = (phone: string) => {
    const message = `Hi, I'm interested in the ${job.title} position. I found this job on Spot Hire.`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getCostBreakdownIcon = (multiplier: number) => {
    if (multiplier > 1.0) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    } else if (multiplier < 1.0) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-blue-500" />;
  };

  const getCostBreakdownColor = (multiplier: number) => {
    if (multiplier > 1.0) {
      return 'text-red-600';
    } else if (multiplier < 1.0) {
      return 'text-green-600';
    }
    return 'text-blue-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Reveal Contact Information</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Error Display */}
          {(error || walletError) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">{error || walletError}</span>
              </div>
            </div>
          )}

          {/* Job Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location.city}, {job.location.state}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Posted {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>

          {/* Dynamic Cost Breakdown */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">Base Cost</span>
                </div>
                <span className="text-sm font-semibold">{dynamicCost.baseCost} coins</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getCostBreakdownIcon(dynamicCost.locationMultiplier)}
                  <span className="text-sm font-medium ml-2">Location Factor</span>
                </div>
                <span className={`text-sm font-semibold ${getCostBreakdownColor(dynamicCost.locationMultiplier)}`}>
                  {dynamicCost.locationMultiplier > 1 ? '+' : ''}{Math.round((dynamicCost.locationMultiplier - 1) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getCostBreakdownIcon(dynamicCost.categoryMultiplier)}
                  <span className="text-sm font-medium ml-2">Category Factor</span>
                </div>
                <span className={`text-sm font-semibold ${getCostBreakdownColor(dynamicCost.categoryMultiplier)}`}>
                  {dynamicCost.categoryMultiplier > 1 ? '+' : ''}{Math.round((dynamicCost.categoryMultiplier - 1) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getCostBreakdownIcon(dynamicCost.demandMultiplier)}
                  <span className="text-sm font-medium ml-2">Demand Factor</span>
                </div>
                <span className={`text-sm font-semibold ${getCostBreakdownColor(dynamicCost.demandMultiplier)}`}>
                  {dynamicCost.demandMultiplier > 1 ? '+' : ''}{Math.round((dynamicCost.demandMultiplier - 1) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getCostBreakdownIcon(dynamicCost.recencyMultiplier)}
                  <span className="text-sm font-medium ml-2">Recency Factor</span>
                </div>
                <span className={`text-sm font-semibold ${getCostBreakdownColor(dynamicCost.recencyMultiplier)}`}>
                  {dynamicCost.recencyMultiplier > 1 ? '+' : ''}{Math.round((dynamicCost.recencyMultiplier - 1) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-900">Final Cost</span>
                </div>
                <span className="text-xl font-bold text-blue-600">{dynamicCost.finalCost} coins</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown Details */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Why this cost?</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span>{dynamicCost.breakdown.location}</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span>{dynamicCost.breakdown.category}</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span>{dynamicCost.breakdown.demand}</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span>{dynamicCost.breakdown.recency}</span>
              </div>
            </div>
          </div>

          {/* User Balance */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Your Balance</span>
              </div>
              <span className="text-lg font-bold text-yellow-800">{userBalance} coins</span>
            </div>
            {!hasSufficientCoins && (
              <div className="mt-2 text-sm text-yellow-700">
                You need {dynamicCost.finalCost - userBalance} more coins to reveal this contact
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!contactRevealed ? (
            <div className="space-y-3">
              {hasSufficientCoins ? (
                <button
                  onClick={handleRevealContact}
                  disabled={isRevealing || walletLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isRevealing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Revealing Contact...
                    </>
                  ) : (
                    <>
                      <Coins className="h-5 w-5 mr-2" />
                      Reveal Contact ({dynamicCost.finalCost} coins)
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {/* Open coin purchase modal */}}
                    className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    <Coins className="h-5 w-5 inline mr-2" />
                    Buy More Coins
                  </button>
                  <button
                    onClick={() => {/* Open coin earning modal */}}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    <TrendingUp className="h-5 w-5 inline mr-2" />
                    Earn Free Coins
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Contact information revealed!</span>
                </div>
              </div>

              {revealData && (
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm text-gray-600">Primary Phone</div>
                        <div className="text-lg font-bold text-gray-900">{revealData.contactInfo.phone}</div>
                      </div>
                      <button
                        onClick={() => handlePhoneCall(revealData.contactInfo.phone)}
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleWhatsAppContact(revealData.contactInfo.phone)}
                      className="w-full bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center text-sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact via WhatsApp
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Business Name</div>
                    <div className="font-semibold text-gray-900">{revealData.contactInfo.businessName}</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Email</div>
                    <div className="font-semibold text-gray-900">{revealData.contactInfo.email}</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Address</div>
                    <div className="font-semibold text-gray-900">{revealData.contactInfo.address}</div>
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

export default DynamicContactRevealModal; 