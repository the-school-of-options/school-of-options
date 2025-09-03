
import Image from 'next/image';

export default function FounderSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6">
            A Message from Our Founder
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto"></div>
        </div>

        {/* Main Content - Symmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-stretch mb-8 sm:mb-10 md:mb-12">
          
          {/* Left Column - Founder Profile */}
          <div className="flex flex-col">
            {/* Founder Image & Basic Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex-1 flex flex-col">
              {/* Photo Section */}
              <div className="relative mb-8">
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
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-navy mb-2">Kundan Kishore</h3>
                <p className="text-accent font-semibold text-base mb-4">Founder & Chief Mentor</p>
                <div className="w-12 h-1 bg-accent rounded-full mx-auto"></div>
              </div>
              
              {/* Credentials List - Increased spacing */}
              <div className="space-y-5 mb-8 flex-grow">
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-accent text-xs">🎓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">BITS Pilani Alumnus</div>
                    <div className="text-gray-600 text-xs font-semibold">Engineering Excellence</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-accent text-xs">🏦</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">Assistant Vice President-Barclays Investment Bank</div>
                    <div className="text-gray-600 text-xs font-semibold">Investment Banking Experience</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-accent text-xs">🏢</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">Morgan Stanley</div>
                    <div className="text-gray-600 text-xs font-semibold">Derivatives Trading</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-accent text-xs">📈</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">20+ Years Trading</div>
                    <div className="text-gray-600 text-xs font-semibold">Institutional Experience</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-accent text-xs">🎯</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">2,00,000+ Students</div>
                    <div className="text-gray-600 text-xs font-semibold">Successfully Trained</div>
                  </div>
                </div>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-navy">20+</div>
                  <div className="text-xs text-gray-600 font-semibold">Years Trading</div>
                </div>
                <div className="bg-gradient-to-br from-navy/10 to-navy/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-navy">2L+</div>
                  <div className="text-xs text-gray-600 font-semibold">Students</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Story & Goals */}
          <div className="flex flex-col space-y-6">
            {/* Story Content */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex-1">
              <div className="space-y-8 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      <span className="text-navy font-bold">After 20 years in trading and 10 years of teaching,</span> I&apos;ve seen the same pattern repeat: 
                      brilliant people losing money in options because they lack proper guidance and systematic approach.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      During my time at <span className="text-navy font-bold">Morgan Stanley, Barclays, and RBS</span>, I realized that institutional trading success 
                      comes from discipline, proper risk management, and systematic strategies - not from gut feelings or tips.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      <span className="text-navy font-bold">The School of Options was born from a simple belief:</span> if we can teach complex derivatives 
                      to institutional traders, we can certainly simplify it for retail traders who are serious about learning.
                    </p>
                  </div>
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
              
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                Our aim is to bridge the gap between academic theory and practical trading by providing institutional-quality education to retail traders, creating a systematic path from learning to profitable trading, and building a community of serious, disciplined traders.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Quote - Spanning Both Columns */}
        <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="flex items-start space-x-4 lg:space-x-6 max-w-5xl mx-auto">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-navy font-bold text-2xl lg:text-3xl">&quot;</span>
            </div>
            <p className="text-white font-semibold text-lg lg:text-xl xl:text-2xl leading-relaxed italic">
              My mission is not just to teach options trading, but to create a generation of disciplined, 
              profitable traders who understand the science behind every trade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
