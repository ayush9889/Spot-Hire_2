import React from 'react';
import { Search, Coins, Phone, ArrowRight, MessageCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Browse Workers Near You',
      description: 'Search through thousands of verified local workers by skill, location, and availability. View profiles, ratings, and experience.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      icon: Coins,
      title: 'Buy Credits & Unlock Contact',
      description: 'Purchase credits securely and unlock contact information of workers you want to hire. Pay only for connections you make.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      id: 3,
      icon: Phone,
      title: 'Hire Directly via Phone or WhatsApp',
      description: 'Contact workers directly through phone or WhatsApp. Negotiate terms, schedule work, and build lasting business relationships.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Contact Reveal Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with skilled workers in just three simple steps. Our credit-based system ensures fair pricing and quality connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Number & Icon */}
              <div className="flex flex-col items-center text-center">
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>

                {/* Connecting Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full">
                    <ArrowRight className="h-6 w-6 text-gray-400 absolute left-1/2 transform translate-x-6" />
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
                  {step.description}
                </p>

                {/* Step Features */}
                <div className={`w-full p-6 ${step.bgColor} rounded-xl`}>
                  {step.id === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>View profiles & ratings</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>Filter by location & skill</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>Check availability status</span>
                      </div>
                    </div>
                  )}

                  {step.id === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Secure payment gateway</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Credits never expire</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Flexible credit packages</span>
                      </div>
                    </div>
                  )}

                  {step.id === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Direct phone numbers</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>WhatsApp integration</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>No platform commission</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Credit System?
            </h3>
            <p className="text-lg text-gray-600">
              Fair pricing, verified workers, and direct communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">No Hidden Fees</h4>
              <p className="text-sm text-gray-600">Pay only for contact reveals. No subscription or monthly fees.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Direct Contact</h4>
              <p className="text-sm text-gray-600">Connect directly with workers without any intermediaries.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Multiple Channels</h4>
              <p className="text-sm text-gray-600">Contact via phone, WhatsApp, or SMS as per your preference.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">All workers are verified and rated by previous employers.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Buy Credits Now
            <ArrowRight className="h-5 w-5 inline ml-2" />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Start connecting with verified workers today
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 