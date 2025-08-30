'use client';

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api-service';

interface NewsletterFormProps {
  variant?: 'unified' | 'original';
  placeholder?: string;
  buttonText?: string;
  showTerms?: boolean;
  className?: string;
}

export default function NewsletterForm({ 
  variant = 'unified',
  placeholder = "Type your email...",
  buttonText = "Subscribe",
  showTerms = true,
  className = ""
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setIsSuccess(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setRetryCount(0);

    try {
      const result = await newsletterAPI.subscribe({ email });
      setMessage(result.message || 'Successfully subscribed! Thank you for joining our newsletter.');
      setIsSuccess(true);
      setEmail('');
      setRetryCount(0);
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error. Please try again.';
      setMessage(errorMessage);
      setIsSuccess(false);
      
      // Increment retry count for user feedback
      setRetryCount(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Unified design matching the image
  if (variant === 'unified') {
    return (
      <div className={`w-full max-w-sm mx-auto px-2 xs:px-4 sm:px-0 ${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-accent transition-colors shadow-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="newsletter-input flex-1 px-3 py-2.5 text-gray-700 placeholder-gray-400 bg-transparent rounded-l-lg focus:outline-none text-sm min-h-[40px]"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`newsletter-button bg-accent text-navy px-4 py-2.5 rounded-r-lg font-medium transition-colors text-sm whitespace-nowrap min-h-[40px] ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-accent-light active:bg-accent-dark'
              }`}
            >
              {isSubmitting 
                ? (retryCount > 0 ? `Retrying...` : 'Subscribing...') 
                : buttonText
              }
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            isSuccess 
              ? 'bg-accent/10 text-navy border border-accent/20' 
              : 'bg-gray-100 text-navy border border-gray-200'
          }`}>
            {message}
          </div>
        )}
        
        {showTerms && (
          <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed">
            By subscribing, I agree to{' '}
            <a href="#" className="text-navy underline hover:text-navy-light">Terms of Use</a> and acknowledge its{' '}
            <a href="#" className="text-navy underline hover:text-navy-light">Information Collection Notice</a> and{' '}
            <a href="#" className="text-navy underline hover:text-navy-light">Privacy Policy</a>
          </p>
        )}
        
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
      </div>
    );
  }

  // Original design for backward compatibility
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg text-navy placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base border-2 border-white/30 focus:border-accent bg-white/95 shadow-lg"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-accent text-navy px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-accent/90'
          }`}
        >
          {isSubmitting 
            ? (retryCount > 0 ? `Retrying... (${retryCount + 1}/3)` : 'Subscribing...') 
            : 'Subscribe'
          }
        </button>
      </form>
      
      {message && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${
          isSuccess 
            ? 'bg-accent/10 text-navy border border-accent/20' 
            : 'bg-gray-100 text-navy border border-gray-200'
        }`}>
          {message}
        </div>
      )}
      
      <p className="text-xs sm:text-sm text-gray-300 mt-3 text-center">
        By subscribing, I agree to{' '}
        <a href="#" className="underline hover:text-white">Terms of Use</a> and{' '}
        <a href="#" className="underline hover:text-white">Privacy Policy</a>
      </p>
    </div>
  );
}
