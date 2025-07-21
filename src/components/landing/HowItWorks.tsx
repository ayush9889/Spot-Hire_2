import React from 'react';
import { Search, Coins, Phone, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Browse Workers',
      description: 'Find verified workers by skill and location',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Coins,
      title: 'Buy Credits',
      description: 'Purchase credits to unlock contact info',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      icon: Phone,
      title: 'Contact Directly',
      description: 'Call or WhatsApp to hire immediately',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Three simple steps to connect with workers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center">
              {/* Step Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <step.icon className="h-8 w-8 text-white" />
              </div>

              {/* Connecting Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full">
                  <ArrowRight className="h-5 w-5 text-gray-300 absolute left-1/2 transform translate-x-4" />
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Buy Credits
            <ArrowRight className="h-4 w-4 inline ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 