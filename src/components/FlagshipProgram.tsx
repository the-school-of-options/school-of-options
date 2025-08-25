import Link from 'next/link';
import { CheckIcon, CalendarIcon, UsersIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

export default function FlagshipProgram() {
  const features = [
    'Live Zoom classes with expert instructors',
    'Complete recorded video library',
    'Advanced backtesting and paper trading tools',
    'Trade automation setup and guidance',
    'Personal mentorship and goal setting',
    '6 months of continuous support',
    'Access to exclusive trading community',
    'Monthly cohorts with limited seats'
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            One Program. One Proven Path.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            Our flagship 6-Month Mentorship Program is the only path you need to become a successful options trader.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Program Details */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green">
              6-Month Options Trading Mentorship
            </h3>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start">
                  <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/mentorship"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 text-center w-full sm:w-auto"
              >
                <span className="sm:hidden">Apply Now</span>
                <span className="hidden sm:inline">Apply Now for Next Cohort</span>
              </Link>
              
              <Link
                href="/knowledge-hub"
                className="border border-green text-green hover:bg-green hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center text-base sm:text-lg w-full sm:w-auto"
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
                  <div className="text-gray-300 text-sm sm:text-base">Complete 6-Month Program</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green mr-3 sm:mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">Monthly Cohorts</div>
                  <div className="text-gray-300 text-sm sm:text-base">New batch every month</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green mr-3 sm:mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">Limited Seats</div>
                  <div className="text-gray-300 text-sm sm:text-base">Exclusive small batch learning</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green rounded-lg">
              <div className="text-center">
                <div className="font-bold text-navy text-sm sm:text-base">Next Cohort Starts</div>
                <div className="text-xl sm:text-2xl font-bold text-navy">January 15, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
