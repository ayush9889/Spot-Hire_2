import React from 'react';
import { Star, Check, Zap, Crown, Users, Briefcase } from 'lucide-react';

interface CreditPack {
  id: string;
  name: string;
  price: number;
  credits: number;
  popular?: boolean;
  savings?: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const CreditPacks: React.FC = () => {
  const creditPacks: CreditPack[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 49,
      credits: 5,
      features: [
        '5 worker contact reveals',
        'Basic profile access',
        'Phone & WhatsApp contacts',
        'Valid for 6 months'
      ],
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'value',
      name: 'Value',
      price: 129,
      credits: 15,
      popular: true,
      savings: 'Save ₹18',
      features: [
        '15 worker contact reveals',
        'Priority profile access',
        'Phone & WhatsApp contacts',
        'Email notifications',
        'Valid for 1 year'
      ],
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 399,
      credits: 50,
      savings: 'Save ₹91',
      features: [
        '50 worker contact reveals',
        'Premium profile access',
        'Phone & WhatsApp contacts',
        'Priority customer support',
        'Advanced search filters',
        'Valid for 2 years'
      ],
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 999,
      credits: 150,
      savings: 'Save ₹471',
      features: [
        '150 worker contact reveals',
        'Bulk hiring support',
        'Dedicated account manager',
        'Custom search preferences',
        'Priority listings',
        'Multi-user access',
        'Valid for 3 years'
      ],
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const handleBuyNow = (packId: string) => {
    // In a real app, this would redirect to payment gateway
    console.log('Purchasing credit pack:', packId);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creditPacks.map((pack) => (
            <div 
              key={pack.id}
              className={`relative bg-white rounded-3xl shadow-lg ${pack.borderColor} border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${pack.popular ? 'ring-4 ring-orange-200 scale-105' : ''}`}
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
                  <div className={`w-16 h-16 ${pack.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <pack.icon className={`h-8 w-8 ${pack.color}`} />
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
                    <span className="text-5xl font-bold text-gray-900">₹{pack.price}</span>
                  </div>
                  <div className={`text-lg font-semibold ${pack.color} mb-2`}>
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
                  onClick={() => handleBuyNow(pack.id)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    pack.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' 
                      : `bg-white border-2 ${pack.borderColor} ${pack.color} hover:bg-gray-50`
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
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