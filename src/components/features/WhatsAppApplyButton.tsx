import React, { useState } from 'react';
import { MessageCircle, Phone, CheckCircle, AlertCircle, Loader2, Eye, X, Info } from 'lucide-react';
import { Job, JobSeeker } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCoinWallet } from '../../contexts/CoinWalletContext';
import { whatsappIntegration, WhatsAppJobApplication } from '../../lib/whatsappIntegration';

interface WhatsAppApplyButtonProps {
  job: Job;
  onSuccess?: (application: WhatsAppJobApplication) => void;
  onError?: (error: string) => void;
}

const WhatsAppApplyButton: React.FC<WhatsAppApplyButtonProps> = ({ 
  job, 
  onSuccess, 
  onError 
}) => {
  const { user } = useAuth();
  const { getBalance, hasEnoughCoins, calculateContactCost } = useCoinWallet();
  const [isApplying, setIsApplying] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [application, setApplication] = useState<WhatsAppJobApplication | null>(null);

  const dynamicCost = calculateContactCost(job);
  const userBalance = getBalance();
  const hasSufficientCoins = hasEnoughCoins(dynamicCost.finalCost);

  const handleWhatsAppApply = async () => {
    if (!user || user.role !== 'jobseeker') {
      onError?.('Please login as a job seeker to apply');
      return;
    }

    if (!hasSufficientCoins) {
      onError?.('Insufficient coins to apply via WhatsApp');
      return;
    }

    setIsApplying(true);

    try {
      const candidate = user as JobSeeker;
      const employerPhone = job.employer.phone; // This would be revealed after coin deduction
      
      const application = await whatsappIntegration.sendJobApplication(
        job, 
        candidate, 
        employerPhone
      );

      setApplication(application);
      onSuccess?.(application);
      
      // Show success message
      setTimeout(() => {
        setShowPreview(false);
        setApplication(null);
      }, 5000);

    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to send application');
    } finally {
      setIsApplying(false);
    }
  };

  const handlePreviewMessage = () => {
    if (!user || user.role !== 'jobseeker') {
      onError?.('Please login as a job seeker to preview');
      return;
    }

    const candidate = user as JobSeeker;
    const message = whatsappIntegration.generateJobApplicationMessage(job, candidate);
    setApplication({
      id: 'preview',
      jobId: job.id,
      candidatePhone: candidate.phone,
      candidateName: candidate.name,
      candidateAge: candidate.age,
      candidateSkills: candidate.skills,
      candidateArea: `${candidate.location.city}, ${candidate.location.state}`,
      status: 'pending',
      messageContent: message,
      timestamp: new Date()
    });
    setShowPreview(true);
  };

  const openWhatsAppDirectly = () => {
    if (!user || user.role !== 'jobseeker') {
      onError?.('Please login as a job seeker to apply');
      return;
    }

    const candidate = user as JobSeeker;
    const message = whatsappIntegration.generateJobApplicationMessage(job, candidate);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${job.employer.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Main Apply Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleWhatsAppApply}
          disabled={isApplying || !hasSufficientCoins}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isApplying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5 mr-2" />
              Apply via WhatsApp ({dynamicCost.finalCost} coins)
            </>
          )}
        </button>

        <button
          onClick={handlePreviewMessage}
          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <Eye className="h-5 w-5 mr-2" />
          Preview
        </button>

        <button
          onClick={openWhatsAppDirectly}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Phone className="h-5 w-5 mr-2" />
          Direct Chat
        </button>
      </div>

      {/* Balance Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-yellow-800">Your balance: {userBalance} coins</span>
          {!hasSufficientCoins && (
            <span className="text-red-600 font-medium">
              Need {dynamicCost.finalCost - userBalance} more coins
            </span>
          )}
        </div>
      </div>

      {/* Message Preview Modal */}
      {showPreview && application && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Application Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Message to {job.employer.businessName}</span>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {application.messageContent}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">What happens next?</span>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your message will be sent directly to the employer</li>
                  <li>• They can reply immediately via WhatsApp</li>
                  <li>• You'll get instant notifications of their response</li>
                  <li>• No waiting for email responses or callbacks</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleWhatsAppApply}
                  disabled={isApplying}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isApplying ? 'Sending...' : 'Send Application'}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {application && application.status === 'sent' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <div className="text-green-800 font-medium">Application sent successfully!</div>
              <div className="text-green-700 text-sm">
                Your WhatsApp message has been sent to {job.employer.businessName}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {!hasSufficientCoins && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <div className="text-red-800 font-medium">Insufficient coins</div>
              <div className="text-red-700 text-sm">
                You need {dynamicCost.finalCost} coins to apply via WhatsApp. 
                <button className="text-blue-600 hover:underline ml-1">
                  Buy coins now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppApplyButton; 