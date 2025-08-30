'use client';

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api-service';

interface UnifiedNewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
  showTerms?: boolean;
  className?: string;
}

export default function UnifiedNewsletterForm({ 
  placeholder = "Type your email...",
  buttonText = "Subscribe",
  showTerms = true,
  className = ""
}: UnifiedNewsletterFormProps) {
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

  return (
    <div className={`w-full max-w-sm mx-auto px-2 xs:px-4 sm:px-0 ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-accent transition-colors shadow-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2.5 text-gray-700 placeholder-gray-400 bg-transparent rounded-l-lg focus:outline-none text-sm min-h-[40px]"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-accent text-navy px-4 py-2.5 rounded-r-lg font-medium transition-colors text-sm whitespace-nowrap min-h-[40px] ${
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
      
      <div className="mt-2 text-center">
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
      </div>
    </div>
  );
}
