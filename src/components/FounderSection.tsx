
import Image from 'next/image';

export default function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Founder Image & Info */}
          <div className="text-center md:text-left space-y-4 sm:space-y-6 md:space-y-8">
            {/* Photo Section */}
            <div className="relative">
              {/* Decorative background elements - hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-48 h-48 bg-navy/5 rounded-full blur-2xl"></div>
              
              {/* Main photo container - responsive sizing */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto md:mx-0">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                  <Image
                    src="/images/founder-kundan-kishore.jpg"
                    alt="Kundan Kishore - Founder & Chief Mentor"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* Floating badge - responsive positioning */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-accent rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-3 shadow-xl">
                  <div className="text-navy font-bold text-xs sm:text-sm">20+ Years</div>
                  <div className="text-navy text-xs">Experience</div>
                </div>
              </div>
            </div>
            
            {/* Founder Info Card - responsive padding and text */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="text-center md:text-left mb-3 sm:mb-4 md:mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Kundan Kishore</h3>
                <p className="text-accent font-semibold text-base sm:text-lg mb-3 sm:mb-4">Founder & Chief Mentor</p>
                <div className="w-12 sm:w-16 h-1 bg-accent rounded-full mx-auto md:mx-0"></div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs sm:text-sm font-bold">🎓</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-navy text-xs sm:text-sm">BITS Pilani Alumnus</div>
                    <div className="text-gray-600 text-xs">Engineering Excellence</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs sm:text-sm font-bold">🏦</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-navy text-xs sm:text-sm">Ex-Investment Banks</div>
                    <div className="text-gray-600 text-xs">Morgan Stanley, Barclays, RBS</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs sm:text-sm font-bold">📈</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-navy text-xs sm:text-sm">20+ Years Trading</div>
                    <div className="text-gray-600 text-xs">Institutional Experience</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs sm:text-sm font-bold">🎯</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-navy text-xs sm:text-sm">2,00,000+ Students</div>
                    <div className="text-gray-600 text-xs">Successfully Trained</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Founder Story */}
          <div className="space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-3 sm:mb-4">
                A Message from Our Founder
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-accent rounded-full mx-auto md:mx-0 mb-4 sm:mb-6 md:mb-8"></div>
            </div>
            
            {/* Story Cards - responsive padding and spacing */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-accent">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  <span className="text-navy font-bold">After 20 years in trading and 10 years of teaching,</span> I&apos;ve seen the same pattern repeat: 
                  brilliant people losing money in options because they lack proper guidance and systematic approach.
                </p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  During my time at <span className="text-navy font-semibold">Morgan Stanley, Barclays, and RBS</span>, I realized that institutional trading success 
                  comes from discipline, proper risk management, and systematic strategies - not from gut feelings or tips.
                </p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-accent">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  <span className="text-navy font-bold">The School of Options was born from a simple belief:</span> if we can teach complex derivatives 
                  to institutional traders, we can certainly simplify it for retail traders who are serious about learning.
                </p>
              </div>
            </div>
            
            {/* Mission Quote - responsive padding and text */}
            <div className="bg-gradient-to-r from-navy to-navy-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-navy font-bold text-lg sm:text-xl">&quot;</span>
                </div>
                <p className="text-white font-medium text-base sm:text-lg leading-relaxed italic">
                  My mission is not just to teach options trading, but to create a generation of disciplined, 
                  profitable traders who understand the science behind every trade.
                </p>
              </div>
            </div>
            
            {/* Why I Started Section - responsive padding and layout */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-navy font-bold text-sm sm:text-base">🎯</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy">Why I Started This School</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <span className="text-navy text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">Bridge the gap between academic theory and practical trading</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <span className="text-navy text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">Provide institutional-quality education to retail traders</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <span className="text-navy text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">Create a systematic path from learning to profitable trading</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <span className="text-navy text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">Build a community of serious, disciplined traders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
