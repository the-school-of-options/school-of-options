
import Image from 'next/image';

export default function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            A Message from Our Founder
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto"></div>
        </div>

        {/* Main Content - Symmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column - Founder Profile */}
          <div className="space-y-6">
            {/* Founder Image & Basic Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {/* Photo Section */}
              <div className="relative mb-6">
                {/* Decorative background */}
                <div className="absolute -top-2 -left-2 w-full h-full bg-accent/5 rounded-3xl"></div>
                
                {/* Main photo container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                    <Image
                      src="/images/founder-kundan-kishore.jpg"
                      alt="Kundan Kishore - Founder & Chief Mentor"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-3 -right-3 bg-accent rounded-xl px-3 py-2 shadow-lg">
                    <div className="text-navy font-bold text-xs">20+ Years</div>
                  </div>
                </div>
              </div>
              
              {/* Founder Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-navy mb-1">Kundan Kishore</h3>
                <p className="text-accent font-semibold text-base mb-4">Founder & Chief Mentor</p>
                <div className="w-12 h-1 bg-accent rounded-full mx-auto mb-6"></div>
              </div>
              
              {/* Credentials List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-accent text-xs">🎓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">BITS Pilani Alumnus</div>
                    <div className="text-gray-600 text-xs">Engineering Excellence</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-accent text-xs">🏦</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">Ex-Morgan Stanley, Barclays, RBS</div>
                    <div className="text-gray-600 text-xs">Investment Banking Experience</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-accent text-xs">📈</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">20+ Years Trading</div>
                    <div className="text-gray-600 text-xs">Institutional Experience</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-accent text-xs">🎯</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">2,00,000+ Students</div>
                    <div className="text-gray-600 text-xs">Successfully Trained</div>
                  </div>
                </div>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-navy">20+</div>
                  <div className="text-xs text-gray-600">Years Trading</div>
                </div>
                <div className="bg-gradient-to-br from-navy/10 to-navy/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-navy">2L+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>
            </div>

            {/* Mission Quote - Moved to Left Column */}
            <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl p-8 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-navy font-bold text-2xl">"</span>
                </div>
                <p className="text-white font-medium text-lg leading-relaxed italic">
                  My mission is not just to teach options trading, but to create a generation of disciplined, 
                  profitable traders who understand the science behind every trade.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Story & Goals */}
          <div className="space-y-6">
            {/* Story Content */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    <span className="text-navy font-bold">After 20 years in trading and 10 years of teaching,</span> I've seen the same pattern repeat: 
                    brilliant people losing money in options because they lack proper guidance and systematic approach.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    During my time at <span className="text-navy font-semibold">Morgan Stanley, Barclays, and RBS</span>, I realized that institutional trading success 
                    comes from discipline, proper risk management, and systematic strategies - not from gut feelings or tips.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <span className="text-navy font-bold">The School of Options was born from a simple belief:</span> if we can teach complex derivatives 
                    to institutional traders, we can certainly simplify it for retail traders who are serious about learning.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Why I Started Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-navy font-bold text-lg">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-navy">Why I Started This School:</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-navy text-sm font-bold">•</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">To bridge the gap between academic theory and practical trading</p>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-navy text-sm font-bold">•</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">To provide institutional-quality education to retail traders</p>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-navy text-sm font-bold">•</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">To create a systematic path from learning to profitable trading</p>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-navy text-sm font-bold">•</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">To build a community of serious, disciplined traders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
