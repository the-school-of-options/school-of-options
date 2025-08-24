'use client';

import { useState } from 'react';
import { EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Newsletter signup:', { name, email });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
    }, 3000);
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
          
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
            Join thousands of traders who start their day with our free newsletter at 8:30 AM
          </p>
          
          <div className="flex items-center justify-center mb-8 text-gray-500">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>Delivered daily at 8:30 AM IST</span>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-base"
                />
                
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-base"
                />
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full text-base sm:text-lg py-3 sm:py-4"
              >
                Get Free Daily Newsletter
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                No spam. Unsubscribe anytime. 50,000+ traders already subscribed.
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Welcome Aboard!</h3>
              <p className="text-gray-600">
                You&apos;ll receive your first newsletter tomorrow at 8:30 AM.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
