'use client';

import { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import ModalShell from './ModalShell';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup' | 'forgot';
}

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset' | 'otp';

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [originalMode, setOriginalMode] = useState<'signup' | 'forgot'>('signup'); // Track original mode for OTP flow
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    resetToken: '',
    otp: ''
  });

  const { login, signup, forgotPassword, resetPassword, generateOTP, verifyOTP } = useAuth();

  // OTP countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      resetToken: '',
      otp: ''
    });
    setError(null);
    setSuccess(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setOtpSent(false);
    setOtpCountdown(0);
    setOriginalMode('signup');
  };

  const handleClose = () => {
    resetForm();
    setMode(defaultMode);
    onClose();
  };

  const handleModeChange = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const otpType = originalMode === 'signup' ? 'signup' : 'forgot_password';
      const result = await generateOTP(formData.email, otpType);
      
      if (result.success) {
        setOtpSent(true);
        setOtpCountdown(60); // 60 second countdown
        const message = mode === 'otp' ? 'OTP resent to your email. Please check your inbox.' : 'OTP sent to your email. Please check your inbox.';
        setSuccess(message);
        if (mode !== 'otp') {
          setMode('otp');
        }
      } else {
        setError(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const otpType = originalMode === 'signup' ? 'signup' : 'forgot_password';
      const result = await verifyOTP(formData.email, formData.otp, otpType);
      
      if (result.success) {
        setSuccess('OTP verified successfully!');
        
        // After OTP verification, proceed with the actual action
        if (otpType === 'signup') {
          // Complete signup process (account already created, just verify)
          await handleCompleteSignup();
        } else if (otpType === 'forgot_password') {
          // Switch to reset password mode
          setMode('reset');
          setSuccess('OTP verified. Please set your new password.');
        }
      } else {
        setError(result.error || 'OTP verification failed');
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActualLogin = async () => {
    const loginResult = await login(formData.email, formData.password);
    if (loginResult.success) {
      handleClose();
    } else {
      setError(loginResult.error || 'Login failed');
    }
  };

  const handleInitialSignup = async () => {
    // Call /auth/signup which will send OTP automatically
    const signupResult = await signup(formData.email, formData.password, formData.fullName);
    if (signupResult.success) {
      // Signup initiated successfully, OTP sent by backend
      setOriginalMode('signup');
      setOtpSent(true);
      setOtpCountdown(60); // 60 second countdown
      setSuccess('Account created! OTP sent to your email. Please check your inbox.');
      setMode('otp');
    } else {
      setError(signupResult.error || 'Signup failed');
    }
  };

  const handleCompleteSignup = async () => {
    // This function is called after OTP verification for signup
    // At this point, the account should already be created and activated
    setSuccess('Account verified successfully!');
    handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      switch (mode) {
        case 'login':
          if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
          }
          
          // For login, directly authenticate without OTP
          await handleActualLogin();
          break;

        case 'signup':
          if (!formData.email || !formData.password || !formData.fullName) {
            setError('Please fill in all fields');
            return;
          }
          
          if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
          }
          
          if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
          }
          
          // Call /auth/signup directly which will send OTP automatically
          await handleInitialSignup();
          break;

        case 'forgot':
          if (!formData.email) {
            setError('Please enter your email address');
            return;
          }
          
          // For forgot password, we need OTP verification
          setOriginalMode('forgot');
          await handleSendOTP();
          break;

        case 'reset':
          if (!formData.password) {
            setError('Please enter your new password');
            return;
          }
          
          if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
          }
          
          if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
          }
          
          const resetResult = await resetPassword(formData.otp, formData.password); // Using OTP as token
          if (resetResult.success) {
            setSuccess('Password reset successfully! You can now login.');
            setTimeout(() => handleModeChange('login'), 2000);
          } else {
            setError(resetResult.error || 'Failed to reset password');
          }
          break;

        case 'otp':
          await handleVerifyOTP();
          break;
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Sign In to Your Account';
      case 'signup': return 'Create Your Account';
      case 'forgot': return 'Reset Your Password';
      case 'reset': return 'Set New Password';
      case 'otp': return 'Verify OTP';
    }
  };

  const getSubmitText = () => {
    if (isLoading) return 'Processing...';
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signup': return 'Send OTP & Create Account';
      case 'forgot': return 'Send OTP';
      case 'reset': return 'Reset Password';
      case 'otp': return 'Verify OTP';
    }
  };

  return (
    <ModalShell 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={getTitle()}
      maxWidth="md"
    >

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name field (signup only) */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {/* Email field */}
            {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            )}

            {/* OTP field */}
            {mode === 'otp' && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500 text-center tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <div className="mt-2 text-center">
                  {otpCountdown > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in {otpCountdown} seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isLoading}
                      className="text-sm text-accent hover:text-accent/80 font-semibold underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Resend OTP'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Password field */}
            {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                    placeholder={mode === 'reset' ? 'Enter new password' : 'Enter your password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password field */}
            {(mode === 'signup' || mode === 'reset') && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-accent text-navy font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-accent/90 hover:shadow-lg transform hover:scale-[1.02]'
              }`}
            >
              {getSubmitText()}
            </button>
          </div>
        </form>

        {/* Mode Switchers */}
        <div className="px-6 pb-6">
          <div className="text-center space-y-2">
            {mode === 'login' && (
              <>
                <p className="text-xs text-gray-500">
                  Don't have an account?{' '}
                  <button
                    onClick={() => handleModeChange('signup')}
                    className="text-accent hover:text-accent/80 font-semibold underline"
                  >
                    Sign up here
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  Forgot your password?{' '}
                  <button
                    onClick={() => handleModeChange('forgot')}
                    className="text-accent hover:text-accent/80 font-semibold underline"
                  >
                    Reset it here
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className="text-xs text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={() => handleModeChange('login')}
                  className="text-accent hover:text-accent/80 font-semibold underline"
                >
                  Sign in here
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p className="text-xs text-gray-500">
                Remember your password?{' '}
                <button
                  onClick={() => handleModeChange('login')}
                  className="text-accent hover:text-accent/80 font-semibold underline"
                >
                  Sign in here
                </button>
              </p>
            )}

            {(mode === 'reset' || mode === 'otp') && (
              <p className="text-xs text-gray-500">
                Back to{' '}
                <button
                  onClick={() => handleModeChange('login')}
                  className="text-accent hover:text-accent/80 font-semibold underline"
                >
                  sign in
                </button>
              </p>
            )}
          </div>
        </div>
    </ModalShell>
  );
}
