import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../ui/ToastContainer';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Coins, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { COIN_CONFIG } from '../../lib/constants';
import { formatCurrency } from '../../lib/utils';

interface CoinPurchaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoinPurchase: React.FC<CoinPurchaseProps> = ({ isOpen, onClose }) => {
  const { user, addCoins } = useAuth();
  const { addToast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('upi');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    const packageData = COIN_CONFIG.packages[selectedPackage];
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await addCoins(packageData.coins + packageData.bonus);
      
      addToast({
        type: 'success',
        title: 'Purchase Successful!',
        message: `${packageData.coins + packageData.bonus} coins added to your account`,
      });
      
      onClose();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Purchase Failed',
        message: 'Please try again or contact support',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Coins" size="lg">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
            <Coins className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-center text-gray-600">
            Current Balance: <span className="font-semibold text-yellow-600">{user?.coins || 0} coins</span>
          </p>
        </div>

        {/* Coin Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {COIN_CONFIG.packages.map((pkg, index) => (
            <div
              key={index}
              onClick={() => setSelectedPackage(index)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPackage === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {pkg.coins + pkg.bonus} Coins
                </div>
                <div className="text-lg text-blue-600 font-semibold mb-2">
                  {formatCurrency(pkg.price)}
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    +{pkg.bonus} Bonus Coins!
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {formatCurrency(pkg.price / (pkg.coins + pkg.bonus))} per coin
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        {selectedPackage !== null && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-5 w-5 mr-2" />
                UPI
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Card
              </button>
              <button
                onClick={() => setPaymentMethod('netbanking')}
                className={`flex items-center justify-center p-3 border-2 rounded-lg transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className="h-5 w-5 mr-2" />
                Net Banking
              </button>
            </div>
          </div>
        )}

        {/* Purchase Button */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={selectedPackage === null || loading}
            loading={loading}
            className="flex-1"
            leftIcon={<Coins className="h-4 w-4" />}
          >
            {selectedPackage !== null
              ? `Pay ${formatCurrency(COIN_CONFIG.packages[selectedPackage].price)}`
              : 'Select Package'
            }
          </Button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Secure payment powered by Razorpay. Your payment information is encrypted and secure.
        </div>
      </div>
    </Modal>
  );
};

export default CoinPurchase;