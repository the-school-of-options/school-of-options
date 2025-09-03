'use client';

import { useState } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Webinar } from '@/types/webinar';

interface WebinarRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  webinar: Webinar | null;
  onRegister: (registrationData: {
    webinarId: number;
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

export default function WebinarRegistrationModal({
  isOpen,
  onClose,
  webinar,
  onRegister
}: WebinarRegistrationModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !webinar) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onRegister({
        webinarId: webinar.id,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim()
      });
      
      // Reset form and close modal
      setFormData({ firstName: '', lastName: '', email: '' });
      onClose();
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-2">Register for Webinar</h2>
            <p className="text-sm text-gray-600">Get instant access to join the live session</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Webinar Info */}
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="font-bold text-navy mb-3">{webinar.title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {new Date(webinar.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" />
              {webinar.time} IST ({webinar.duration} minutes)
            </div>
            <div className="flex items-center">
              <UsersIcon className="h-4 w-4 mr-2" />
              {webinar.instructor}
            </div>
          </div>

        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-navy mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-navy mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                We'll send your Zoom join link to this email
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-navy/5 rounded-lg">
            <h4 className="font-semibold text-navy mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Instant email with Zoom join link</li>
              <li>✓ Calendar invite with webinar details</li>
              <li>✓ Pre-webinar preparation materials</li>
              <li>✓ Live Q&A and interactive sessions</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-navy px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Register Free'}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By registering, you agree to receive webinar-related communications. 
            You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
