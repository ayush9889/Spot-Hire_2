import React, { useState } from 'react';
import { Star, Check, Zap, Crown, Users, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { useCreditWallet } from '../../contexts/CreditWalletContext';
import { useAuth } from '../../contexts/AuthContext';
import { creditPacks } from '../../lib/creditPacks';
import { CreditPack } from '../../types';

const CreditPacks: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { purchaseCredits, loading, error } = useCreditWallet();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const getPackIcon = (packId: string) => {
    switch (packId) {
      case 'starter': return Star;
      case 'value': return Zap;
      case 'pro': return Crown;
      case 'agency': return Briefcase;
      default: return Star;
    }
  };

  const getPackColors = (packId: string) => {
    switch (packId) {
      case 'starter': return { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
      case 'value': return { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
      case 'pro': return { color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' };
      case 'agency': return { color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      default: return { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    }
  };

  const handleBuyNow = async (pack: CreditPack) => {
    if (!isAuthenticated) {
      // In a real app, this would open the auth modal
      alert('Please login to purchase credits');
      return;
    }

    if (user?.role !== 'employer') {
      alert('Only employers can purchase credits');
      return;
    }

    setPurchaseError(null);
    setSelectedPack(pack.id);

    try {
      // Start payment process
      const response = await purchaseCredits(pack, paymentMethod);
      
      if (response.success) {
        alert(`Successfully purchased ${pack.credits} credits! Your new balance: ${response.newBalance} credits`);
      } else {
        setPurchaseError(response.error || 'Payment failed');
      }
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setSelectedPack(null);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Buy Credits to Connect with Workers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect credit package for your hiring needs. All packages include secure payments and never expire.
          </p>
        </div>

        {/* Error Display */}
        {(purchaseError || error) && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">{purchaseError || error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creditPacks.map((pack) => {
            const IconComponent = getPackIcon(pack.id);
            const colors = getPackColors(pack.id);
            const isProcessing = selectedPack === pack.id && loading;
            
            return (
              <div 
                key={pack.id}
                className={`relative bg-white rounded-3xl shadow-lg ${colors.borderColor} border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${pack.popular ? 'ring-4 ring-orange-200 scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon & Name */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${colors.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 ${colors.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{pack.name}</h3>
                    {pack.savings && (
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {pack.savings}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                      {pack.originalPrice && (
                        <span className="text-lg text-gray-400 line-through mr-2">₹{pack.originalPrice}</span>
                      )}
                      <span className="text-5xl font-bold text-gray-900">₹{pack.price}</span>
                    </div>
                    <div className={`text-lg font-semibold ${colors.color} mb-2`}>
                      {pack.credits} Credits
                    </div>
                    <div className="text-sm text-gray-600">
                      ₹{Math.round(pack.price / pack.credits)} per contact
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Buy Button */}
                  <button
                    onClick={() => handleBuyNow(pack)}
                    disabled={isProcessing || loading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' 
                        : `bg-white border-2 ${colors.borderColor} ${colors.color} hover:bg-gray-50`
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      'Buy Now'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Workers Only</h3>
              <p className="text-gray-600 text-sm">All workers are background-verified and rated by previous employers for your safety.</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-gray-600 text-sm">Get immediate access to worker contact details after credit purchase. No waiting time.</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Support</h3>
              <p className="text-gray-600 text-sm">Get dedicated customer support for all your hiring needs and queries.</p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
            <Check className="h-5 w-5 mr-2" />
            7-day money-back guarantee
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Not satisfied with your experience? Get a full refund within 7 days of purchase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreditPacks; 