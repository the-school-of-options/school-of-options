'use client';

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api-service';

export default function NewsletterForm() {
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
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
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
