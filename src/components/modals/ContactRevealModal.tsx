import React, { useState } from 'react';
import { X, Coins, Phone, MessageCircle, Shield, Star, MapPin, Clock, ExternalLink, CreditCard } from 'lucide-react';
import { Worker } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ContactRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker;
}

const ContactRevealModal: React.FC<ContactRevealModalProps> = ({ isOpen, onClose, worker }) => {
  const { user } = useAuth();
  const [isRevealing, setIsRevealing] = useState(false);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [revealedContactInfo, setRevealedContactInfo] = useState<{
    phone: string;
    whatsapp: string;
    alternatePhone?: string;
  } | null>(null);

  const creditCost = 1;
  const userCredits = user?.coins || 0;
  const hasEnoughCredits = userCredits >= creditCost;

  if (!isOpen) return null;

  const handleRevealContact = async () => {
    if (!hasEnoughCredits) {
      // Redirect to buy credits
      return;
    }

    setIsRevealing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRevealedContactInfo({
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        alternatePhone: '+91 87654 32109'
      });
      setContactRevealed(true);
      setIsRevealing(false);
    }, 1500);
  };

  const handleBuyCredits = () => {
    // In a real app, this would redirect to credit purchase page
    console.log('Redirecting to buy credits page');
    onClose();
  };

  const handleWhatsAppContact = () => {
    if (revealedContactInfo?.whatsapp) {
      const message = `Hi ${worker.name}, I found your profile on ROJGAR and I'm interested in hiring you for ${worker.skill} work. Please let me know your availability.`;
      const whatsappUrl = `https://wa.me/${revealedContactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handlePhoneCall = () => {
    if (revealedContactInfo?.phone) {
      window.location.href = `tel:${revealedContactInfo.phone}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Worker Info */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={worker.profileImage}
              alt={worker.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{worker.name}</h3>
              <p className="text-blue-600 font-semibold">{worker.skill}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-semibold text-gray-900">{worker.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({worker.totalRatings})</span>
                {worker.isVerified && (
                  <>
                    <Shield className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-xs text-green-600 ml-1">Verified</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Worker Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-3" />
              <span className="text-sm">{worker.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-3" />
              <span className="text-sm">{worker.availability}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Coins className="h-4 w-4 mr-3" />
              <span className="text-sm">{worker.hourlyRate}</span>
            </div>
          </div>

          {!contactRevealed ? (
            // Credit Purchase Section
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Use Credits to Reveal Contact
                </h4>
                <p className="text-gray-600 text-sm">
                  Get direct access to {worker.name}'s phone number and WhatsApp for instant communication.
                </p>
              </div>

              <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Cost to reveal</div>
                  <div className="text-lg font-bold text-blue-600">{creditCost} Credit</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Your balance</div>
                  <div className={`text-lg font-bold ${hasEnoughCredits ? 'text-green-600' : 'text-red-600'}`}>
                    {userCredits} Credits
                  </div>
                </div>
              </div>

              {hasEnoughCredits ? (
                <button
                  onClick={handleRevealContact}
                  disabled={isRevealing}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isRevealing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Revealing Contact...
                    </div>
                  ) : (
                    <>
                      <Coins className="h-5 w-5 inline mr-2" />
                      Reveal Contact Details
                    </>
                  )}
                </button>
              ) : (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-red-700 font-medium">Insufficient Credits</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1">
                      You need {creditCost} credit to reveal this contact. Buy credits to continue.
                    </p>
                  </div>
                  <button
                    onClick={handleBuyCredits}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <CreditCard className="h-5 w-5 inline mr-2" />
                    Buy Credits
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Contact Information Revealed
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Contact Details Revealed!
                </h4>
                <p className="text-gray-600 text-sm">
                  You can now contact {worker.name} directly via phone or WhatsApp.
                </p>
              </div>

              {revealedContactInfo && (
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Primary Phone</div>
                        <div className="text-lg font-bold text-gray-900">{revealedContactInfo.phone}</div>
                      </div>
                      <button
                        onClick={handlePhoneCall}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">WhatsApp</div>
                        <div className="text-lg font-bold text-gray-900">{revealedContactInfo.whatsapp}</div>
                      </div>
                      <button
                        onClick={handleWhatsAppContact}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {revealedContactInfo.alternatePhone && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Alternate Phone</div>
                          <div className="text-lg font-bold text-gray-900">{revealedContactInfo.alternatePhone}</div>
                        </div>
                        <button
                          onClick={() => window.location.href = `tel:${revealedContactInfo.alternatePhone}`}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Phone className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handlePhoneCall}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </button>
                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-3">What you get:</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Direct phone numbers for instant contact
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                WhatsApp contact for easy messaging
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                No platform commission on negotiations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                24/7 access to contact information
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactRevealModal; 