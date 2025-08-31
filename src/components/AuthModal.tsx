'use client';

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  EyeIcon, 
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup' | 'forgot';
}

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset' | 'otp';

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
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
      const otpType = mode === 'signup' ? 'signup' : 'forgot_password'; // Only signup and forgot password use OTP
      const result = await generateOTP(formData.email, otpType);
      
      if (result.success) {
        setOtpSent(true);
        setOtpCountdown(60); // 60 second countdown
        setSuccess('OTP sent to your email. Please check your inbox.');
        setMode('otp');
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
      const otpType = mode === 'signup' ? 'signup' : 'forgot_password'; // Only signup and forgot password use OTP
      const result = await verifyOTP(formData.email, formData.otp, otpType);
      
      if (result.success) {
        setSuccess('OTP verified successfully!');
        
        // After OTP verification, proceed with the actual action
        if (otpType === 'signup') {
          // Proceed with signup
          await handleActualSignup();
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

  const handleActualSignup = async () => {
    const signupResult = await signup(formData.email, formData.password, formData.fullName);
    if (signupResult.success) {
      handleClose();
    } else {
      setError(signupResult.error || 'Signup failed');
    }
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
          
          // For signup, we need OTP verification first
          await handleSendOTP();
          break;

        case 'forgot':
          if (!formData.email) {
            setError('Please enter your email address');
            return;
          }
          
          // For forgot password, we need OTP verification
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold text-navy">
                    {getTitle()}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700 text-sm">{success}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name field (signup only) */}
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email field */}
                  {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* OTP field */}
                  {mode === 'otp' && (
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Enter OTP
                      </label>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-center text-lg tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                      </div>
                      {otpCountdown > 0 && (
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Resend OTP in {otpCountdown} seconds
                        </p>
                      )}
                      {otpCountdown === 0 && otpSent && (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="text-sm text-accent hover:text-accent/80 font-semibold mt-2 block mx-auto"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  )}

                  {/* Password field */}
                  {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder={mode === 'reset' ? 'Enter new password' : 'Enter your password'}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password field */}
                  {(mode === 'signup' || mode === 'reset') && (
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 text-navy px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {getSubmitText()}
                  </button>
                </form>

                {/* Mode Switchers */}
                <div className="mt-6 text-center space-y-2">
                  {mode === 'login' && (
                    <>
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                          onClick={() => handleModeChange('signup')}
                          className="text-accent hover:text-accent/80 font-semibold"
                        >
                          Sign up here
                        </button>
                      </p>
                      <p className="text-sm text-gray-600">
                        Forgot your password?{' '}
                        <button
                          onClick={() => handleModeChange('forgot')}
                          className="text-accent hover:text-accent/80 font-semibold"
                        >
                          Reset it here
                        </button>
                      </p>
                    </>
                  )}

                  {mode === 'signup' && (
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={() => handleModeChange('login')}
                        className="text-accent hover:text-accent/80 font-semibold"
                      >
                        Sign in here
                      </button>
                    </p>
                  )}

                  {mode === 'forgot' && (
                    <p className="text-sm text-gray-600">
                      Remember your password?{' '}
                      <button
                        onClick={() => handleModeChange('login')}
                        className="text-accent hover:text-accent/80 font-semibold"
                      >
                        Sign in here
                      </button>
                    </p>
                  )}

                  {(mode === 'reset' || mode === 'otp') && (
                    <p className="text-sm text-gray-600">
                      Back to{' '}
                      <button
                        onClick={() => handleModeChange('login')}
                        className="text-accent hover:text-accent/80 font-semibold"
                      >
                        sign in
                      </button>
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
