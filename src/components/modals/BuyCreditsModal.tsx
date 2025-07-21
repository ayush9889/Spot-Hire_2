import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Wallet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import { creditPacks } from '../../lib/creditPacks';
import { CreditPack } from '../../types';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { purchaseCoins, getBalance, loading, error } = useCoinWallet();
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Paytm, PhonePe, Amazon Pay' }
  ];

  const handlePurchase = async () => {
    if (!selectedPack) return;
    
    if (!isAuthenticated) {
      setPurchaseError('Please login to purchase credits');
      return;
    }

    if (user?.role !== 'employer') {
      setPurchaseError('Only employers can purchase credits');
      return;
    }

    setPurchaseError(null);
    
    try {
      const success = await purchaseCoins(selectedPack.credits, paymentMethod);
      
      if (success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          onClose();
          setPurchaseSuccess(false);
          setSelectedPack(null);
        }, 3000);
      } else {
        setPurchaseError('Payment failed');
      }
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : 'Payment failed');
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setSelectedPack(null);
      setPurchaseError(null);
      setPurchaseSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Buy Credits</h2>
            <p className="text-gray-600 mt-1">Purchase credits to reveal worker contact information</p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Current Balance */}
        {isAuthenticated && user?.role === 'employer' && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Balance</h3>
                <p className="text-2xl font-bold text-blue-600">{getBalance()} Credits</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Each credit reveals</p>
                <p className="text-sm font-semibold text-gray-900">1 worker contact</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {(purchaseError || error) && (
          <div className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">{purchaseError || error}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {purchaseSuccess && (
          <div className="mx-6 mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">
                Successfully purchased {selectedPack?.credits} credits! Your new balance: {getBalance()} credits
              </span>
            </div>
          </div>
        )}

        {/* Credit Packs */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Choose a Credit Pack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {creditPacks.map((pack) => {
              const isSelected = selectedPack?.id === pack.id;
              const isPopular = pack.popular;
              
              return (
                <div
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  } ${isPopular ? 'ring-2 ring-orange-200' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-gray-900">{pack.name}</h4>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">₹{pack.price}</span>
                      {pack.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">₹{pack.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-blue-600 font-semibold mt-1">{pack.credits} Credits</div>
                    {pack.savings && (
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {pack.savings}
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mt-2">
                      ₹{Math.round(pack.price / pack.credits)} per contact
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Method Selection */}
          {selectedPack && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 text-gray-600 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Purchase Summary */}
          {selectedPack && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Purchase Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Pack:</span>
                  <span className="font-semibold">{selectedPack.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-semibold">{selectedPack.credits} credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">{paymentMethod}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-lg font-bold text-blue-600">₹{selectedPack.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={!selectedPack || loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${selectedPack?.price || 0}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsModal; 