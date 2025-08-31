'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon, CalendarIcon, UsersIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import ModalShell from './ModalShell';

export default function FlagshipProgram() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you! Our counsellor will contact you within 24 hours.');
      closeModal();
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const features = [
    'Live Zoom classes with expert instructors',
    'Complete recorded video library',
    'Advanced backtesting and paper trading tools',
    'Trade automation setup and guidance',
    'Personal mentorship and goal setting',
    '6 months of continuous support',
    'Access to exclusive trading community',
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            One Program. One Proven Path.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0 font-semibold">
            Our flagship 6-Month Mentorship Program is the only path you need to become a successful options trader.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Program Details */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-accent">
              6-Month Options Trading Mentorship
            </h3>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start">
                  <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-accent mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base font-semibold">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={openModal}
                className="btn-primary-lg text-center w-full sm:w-auto"
              >
                <span className="sm:hidden">Talk to Counsellor</span>
                <span className="hidden sm:inline">Talk to Counsellor</span>
              </button>
              
              <Link
                href="/newsletter"
                className="border border-green text-green hover:bg-green hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center text-lg w-full sm:w-auto"
              >
                <span className="sm:hidden">Free Resources</span>
                <span className="hidden sm:inline">Explore Free Resources</span>
              </Link>
            </div>
          </div>
          
          {/* Program Highlights */}
          <div className="bg-navy-light rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="flex items-center">
                <CurrencyRupeeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green mr-3 sm:mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">₹35,000</div>
                  <div className="text-gray-300 text-sm sm:text-base font-semibold">Complete Program</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green mr-3 sm:mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">6 Months
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base font-semibold">Full Mentorship</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green mr-3 sm:mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">Limited Seats</div>
                  <div className="text-gray-300 text-sm sm:text-base font-semibold">Personalised Mentorship</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <a
                href="https://rzp.io/rzp/theschoolofoptions"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-center text-lg"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalShell 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Talk to Counsellor"
        maxWidth="md"
      >
        {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <p className="text-gray-600 mb-6 text-sm">
                Get personalized guidance for your options trading journey. Our counsellor will help you understand the program and answer all your questions.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>


              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-accent text-navy font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent/90 hover:shadow-lg transform hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We'll contact you within 24 hours to discuss the mentorship program.
              </p>
            </form>
      </ModalShell>
    </section>
  );
}
