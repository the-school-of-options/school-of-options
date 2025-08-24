

export default function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image */}
          <div className="text-center lg:text-left">
            <div className="relative w-80 h-80 mx-auto lg:mx-0 mb-8">
              <div className="w-80 h-80 bg-navy rounded-2xl flex items-center justify-center">
                <div className="text-6xl font-bold text-green">KK</div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-navy mb-2">Kundan Kishore</h3>
              <p className="text-green font-semibold mb-4">Founder & Chief Mentor</p>
              
              <div className="space-y-2 text-gray-600">
                <div>🎓 BITS Pilani Alumnus</div>
                <div>🏦 Ex-Morgan Stanley, Barclays, RBS</div>
                <div>📈 20+ Years Trading Experience</div>
                <div>👨‍🏫 10+ Years Teaching Experience</div>
                <div>🎯 2,00,000+ Students Trained</div>
              </div>
            </div>
          </div>
          
          {/* Founder Story */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">
              A Message from Our Founder
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <strong>After 20 years in trading and 10 years of teaching,</strong> I&apos;ve seen the same pattern repeat: 
                brilliant people losing money in options because they lack proper guidance and systematic approach.
              </p>
              
              <p>
                During my time at Morgan Stanley, Barclays, and RBS, I realized that institutional trading success 
                comes from discipline, proper risk management, and systematic strategies - not from gut feelings or tips.
              </p>
              
              <p>
                <strong>The School of Options was born from a simple belief:</strong> if we can teach complex derivatives 
                to institutional traders, we can certainly simplify it for retail traders who are serious about learning.
              </p>
              
              <p className="text-navy font-semibold text-lg">
                &quot;My mission is not just to teach options trading, but to create a generation of disciplined, 
                profitable traders who understand the science behind every trade.&quot;
              </p>
              
              <div className="bg-white rounded-lg p-6 border-l-4 border-green">
                <p className="font-semibold text-navy mb-2">Why I Started This School:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• To bridge the gap between academic theory and practical trading</li>
                  <li>• To provide institutional-quality education to retail traders</li>
                  <li>• To create a systematic path from learning to profitable trading</li>
                  <li>• To build a community of serious, disciplined traders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
