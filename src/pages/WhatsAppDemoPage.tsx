import React from 'react';
import JobCard from '../components/jobs/JobCard';
import WhatsAppApplyButton from '../components/features/WhatsAppApplyButton';
import { Job, JobSeeker } from '../types';

const WhatsAppDemoPage: React.FC = () => {
  // Mock job data with employer phone for testing
  const mockJob: Job = {
    id: '1',
    title: 'Delivery Partner',
    description: 'We are looking for reliable delivery partners to join our team. Must have own vehicle and valid license.',
    category: 'delivery',
    type: 'full-time',
    location: {
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isRemote: false
    },
    compensation: {
      type: 'monthly',
      min: 15000,
      max: 25000
    },
    requirements: [
      'Valid driving license',
      'Own vehicle (bike/scooter)',
      'Good communication skills',
      'Flexible working hours'
    ],
    employerId: 'emp1',
    employer: {
      id: 'emp1',
      email: 'hr@deliverycompany.com',
      name: 'Rahul Sharma',
      role: 'employer',
      phone: '+91 9876543210', // This will be hidden initially
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      createdAt: new Date(),
      isVerified: true,
      coins: 100,
      businessName: 'Quick Delivery Services',
      businessType: 'Logistics',
      hideContactInfo: true,
      maskedBusinessName: 'Q*** D*** Services'
    },
    status: 'active',
    postedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    applicationsCount: 5,
    contactCost: 5
  };

  // Mock job seeker for testing
  const mockJobSeeker: JobSeeker = {
    id: 'js1',
    email: 'rajesh@example.com',
    name: 'Rajesh Kumar',
    role: 'jobseeker',
    phone: '+91 9876543211',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002'
    },
    createdAt: new Date(),
    isVerified: true,
    coins: 20,
    skills: ['Driving', 'Customer Service', 'Navigation'],
    experience: '2 years',
    preferredJobTypes: ['full-time', 'part-time'],
    availability: 'Immediate',
    preferredCategories: ['delivery', 'driving']
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            WhatsApp Apply Button Demo
          </h1>
          <p className="text-gray-600">
            This page demonstrates the WhatsApp Apply Button functionality. 
            You need to be logged in as a job seeker to see the button.
          </p>
        </div>

        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Test:</h2>
          <ol className="text-blue-800 space-y-2">
            <li>1. <strong>Login as a Job Seeker:</strong> Use the login modal to create a job seeker account</li>
            <li>2. <strong>Check Coin Balance:</strong> Make sure you have enough coins (you start with 20)</li>
            <li>3. <strong>Purchase Contact:</strong> Click "Get Contact" to reveal the employer's phone number</li>
            <li>4. <strong>Apply via WhatsApp:</strong> Use the WhatsApp Apply Button to send a pre-filled message</li>
            <li>5. <strong>Preview Message:</strong> Click "Preview" to see what the message will look like</li>
            <li>6. <strong>Direct Chat:</strong> Use "Direct Chat" to open WhatsApp directly</li>
          </ol>
        </div>

        {/* Quick Test Button */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-3">Quick Test - WhatsApp Apply Button</h2>
          <p className="text-green-800 mb-4">
            Look for the green WhatsApp Apply Button below. It should show different states based on your login status:
          </p>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <WhatsAppApplyButton 
              job={mockJob}
              onSuccess={(application) => {
                console.log('WhatsApp application sent:', application);
                alert('WhatsApp application sent successfully!');
              }}
              onError={(error) => {
                console.error('WhatsApp application error:', error);
                alert('Error: ' + error);
              }}
            />
          </div>
        </div>

        {/* Job Card with WhatsApp Apply Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Job Posting</h2>
          <JobCard 
            job={mockJob}
            onViewDetails={(jobId) => console.log('View details for job:', jobId)}
          />
        </div>

        {/* Standalone WhatsApp Apply Button Demo */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Apply Button (Standalone)</h2>
          <p className="text-gray-600 mb-4">
            This is the WhatsApp Apply Button component. It should be visible below:
          </p>
          <WhatsAppApplyButton 
            job={mockJob}
            onSuccess={(application) => {
              console.log('WhatsApp application sent:', application);
              alert('WhatsApp application sent successfully!');
            }}
            onError={(error) => {
              console.error('WhatsApp application error:', error);
              alert('Error: ' + error);
            }}
          />
        </div>

        {/* WhatsApp Bot Demo */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Bot Demo</h2>
          <p className="text-gray-600 mb-4">
            Click the floating WhatsApp button in the bottom right corner to test the smart bot.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Bot Features:</h3>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• <strong>Role Detection:</strong> Automatically detects if you're a job seeker or employer</li>
              <li>• <strong>Location & Skill Extraction:</strong> Understands natural language queries</li>
              <li>• <strong>Job Recommendations:</strong> Shows relevant jobs based on your needs</li>
              <li>• <strong>Quick Replies:</strong> Pre-built responses for common queries</li>
              <li>• <strong>App Download Prompts:</strong> Encourages app installation for full features</li>
            </ul>
          </div>
        </div>

        {/* Test Scenarios */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Job Seeker Flow:</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• "I'm looking for a job as a driver in Mumbai"</li>
                <li>• "Need electrician jobs near me"</li>
                <li>• "Housekeeping jobs available?"</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Employer Flow:</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• "I want to hire 2 cooks in Delhi"</li>
                <li>• "Need delivery partners for my business"</li>
                <li>• "Looking for domestic help"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDemoPage; 