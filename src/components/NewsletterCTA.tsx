'use client';

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api-service';
import { EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setRetryCount(0);

    try {
      const result = await newsletterAPI.subscribe({ email });
      setIsSubmitted(true);
      setEmail('');
      setMessage('');
      setRetryCount(0);
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error. Please try again.';
      setMessage(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy rounded-full flex items-center justify-center">
              <EnvelopeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
            Get Daily Market Levels & Insights
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0 font-semibold">
            Join thousands of traders who start their day with our free newsletter at 8:30 AM
          </p>
          
          <div className="flex items-center justify-center mb-8 text-gray-500 font-semibold">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>Delivered daily at 8:30 AM IST</span>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto px-2 xs:px-4 sm:px-0">
              <div className="flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-accent transition-colors shadow-sm mb-4 sm:mb-6">
                <input
                  type="email"
                  placeholder="Type your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-gray-700 placeholder-gray-400 bg-transparent rounded-l-lg focus:outline-none text-sm sm:text-base min-h-[40px] sm:min-h-[44px]"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-accent text-navy px-4 sm:px-6 py-2.5 sm:py-3 rounded-r-lg font-bold transition-colors text-sm sm:text-base whitespace-nowrap min-h-[40px] sm:min-h-[44px] ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent-light active:bg-accent-dark'
                  }`}
                >
                  {isSubmitting 
                    ? (retryCount > 0 ? `Retrying...` : 'Subscribing...') 
                    : 'Subscribe'
                  }
                </button>
              </div>
              
              {message && (
                <div className="mt-3 p-3 rounded-lg text-sm bg-gray-100 text-navy border border-gray-200">
                  {message}
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-4 font-semibold">
                By subscribing, I agree to{' '}
                <a href="#" className="text-navy underline hover:text-navy-light">Terms of Use</a> and acknowledge its{' '}
                <a href="#" className="text-navy underline hover:text-navy-light">Information Collection Notice</a> and{' '}
                <a href="#" className="text-navy underline hover:text-navy-light">Privacy Policy</a>
              </p>
              
              {/* <div className="mt-2 text-center">
                <button
                  type="button"
                  className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                  onClick={() => {
                    // Handle "No thanks" action if needed
                    console.log('No thanks clicked');
                  }}
                >
                  No thanks <span className="ml-1">›</span>
                </button>
              </div> */}
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Welcome Aboard!</h3>
              <p className="text-gray-600 font-semibold">
                You&apos;ll receive your first newsletter tomorrow at 8:30 AM.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
