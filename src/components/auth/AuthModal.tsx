import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Mail, Lock, User, Phone, MapPin, Building, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'employer' | 'jobseeker';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole = 'jobseeker' }) => {
  const { login, loginWithGoogle, register, sendVerificationEmail, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'employer' | 'jobseeker'>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    businessName: '',
    businessType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isForgotPassword) {
        await resetPassword(formData.email);
        setIsEmailSent(true);
        setSuccess('Password reset email sent! Check your inbox.');
      } else if (isLogin) {
        await login(formData.email, formData.password);
        setSuccess('Welcome back!');
        setTimeout(() => onClose(), 1000);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role,
          phone: formData.phone,
          location: {
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          ...(role === 'employer' && {
            businessName: formData.businessName,
            businessType: formData.businessType
          })
        });
        setSuccess('Account created successfully! Welcome to Spot Hire.');
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await loginWithGoogle();
      setSuccess('Welcome to Spot Hire!');
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setIsLogin(true);
    setIsForgotPassword(false);
    setIsEmailSent(false);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      city: '',
      state: '',
      pincode: '',
      businessName: '',
      businessType: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              {isForgotPassword && (
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="mr-3 text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Join Spot Hire'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 text-sm">{success}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Email Sent Message */}
          {isEmailSent && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900 mb-1">Check Your Email</h3>
                <p className="text-blue-800 text-sm">
                  We've sent a password reset link to <strong>{formData.email}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Google Sign In Button */}
          {!isForgotPassword && (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mb-6 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          )}

          {/* Divider */}
          {!isForgotPassword && (
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection for Registration */}
            {!isLogin && !isForgotPassword && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    role === 'jobseeker'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Job Seeker</span>
                  <p className="text-xs mt-1 opacity-75">Find your next job</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    role === 'employer'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Employer</span>
                  <p className="text-xs mt-1 opacity-75">Hire workers</p>
                </button>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  disabled={isEmailSent}
                />
              </div>
            </div>

            {/* Password Field */}
            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required={!isForgotPassword}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Registration Fields */}
            {!isLogin && !isForgotPassword && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Pincode"
                    />
                  </div>
                </div>

                {/* Employer Specific Fields */}
                {role === 'employer' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your business name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select business type</option>
                        <option value="Retail">Retail</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Construction">Construction</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Please wait...
                </div>
              ) : isForgotPassword ? (
                'Send Reset Link'
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 space-y-3">
            {!isForgotPassword && (
              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            )}

            {isLogin && !isForgotPassword && (
              <div className="text-center">
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="text-gray-600 hover:text-gray-700 text-sm"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Terms and Privacy */}
            {!isLogin && !isForgotPassword && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;