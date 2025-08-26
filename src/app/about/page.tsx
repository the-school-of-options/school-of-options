import Link from 'next/link';
import Image from 'next/image';
import { 
  AcademicCapIcon, 
  BuildingOffice2Icon, 
  ChartBarIcon, 
  UsersIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const milestones = [
    {
      year: '2004',
      title: 'Started Trading Career',
      description: 'Began professional trading journey at Morgan Stanley'
    },
    {
      year: '2014',
      title: 'Started Teaching',
      description: 'Began sharing knowledge and mentoring aspiring traders'
    },
    {
      year: '2020',
      title: 'Founded The School',
      description: 'Established The School of Options as dedicated institution'
    },
    {
      year: '2024',
      title: '2,00,000+ Students',
      description: 'Reached milestone of training over 2 lakh learners'
    }
  ];

  const values = [
    {
      icon: AcademicCapIcon,
      title: 'Education First',
      description: 'We believe in building strong fundamentals before advanced strategies. Every concept is explained in simple, practical terms.'
    },
    {
      icon: HeartIcon,
      title: 'Authentic Guidance',
      description: 'No false promises or get-rich-quick schemes. We focus on sustainable, long-term trading success through proper education.'
    },
    {
      icon: ChartBarIcon,
      title: 'Practical Approach',
      description: 'Every lesson is backed by real market examples and practical applications. Theory without practice is meaningless.'
    },
    {
      icon: UsersIcon,
      title: 'Community Focus',
      description: 'Building a community of serious, disciplined traders who support each other\'s growth and learning journey.'
    }
  ];

  const achievements = [
    { number: '2,00,000+', label: 'Students Trained' },
    { number: '20+', label: 'Years Experience' },
    { number: '10+', label: 'Years Teaching' },
    { number: '85%', label: 'Success Rate' }
  ];

  return (
    <div>
      {/* Hero Section - Enhanced Responsiveness */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                About The School of <span className="text-green">Options</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                The first institution dedicated 100% to Options Trading. We exist to simplify options trading 
                for everyone and provide opportunities for research in this field.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/mentorship" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 text-center w-full sm:w-auto">
                  Join Our Program
                </Link>
                <Link href="/knowledge-hub" className="border border-green text-green hover:bg-green hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center text-base sm:text-lg w-full sm:w-auto">
                  <span className="sm:hidden">Free Resources</span>
                  <span className="hidden sm:inline">Explore Free Resources</span>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-navy-light rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8">
                <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-green">TSO</div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base px-4 sm:px-0">
                Dedicated to making options trading accessible and profitable for everyone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-navy mb-6">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the global center of excellence for options trading education, 
                where anyone serious about learning can transform from a losing trader to a consistently profitable one.
              </p>
              <div className="mt-6 p-4 bg-green rounded-lg">
                <p className="text-white font-semibold">
                  &quot;Making options trading as accessible as traditional investing&quot;
                </p>
              </div>
            </div>
            
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To simplify options trading through systematic education, practical training, 
                and personalized mentorship, ensuring every student develops the skills and discipline needed for long-term success.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green rounded-full mr-3 mt-3" />
                  <span>Provide world-class options trading education</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green rounded-full mr-3 mt-3" />
                  <span>Build a community of disciplined traders</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green rounded-full mr-3 mt-3" />
                  <span>Advance research in options trading strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story - Redesigned */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Meet Our Founder
            </h2>
            <div className="w-24 h-1 bg-accent rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionary behind The School of Options and his journey from Wall Street to empowering retail traders
            </p>
          </div>

          {/* Main Content - Symmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Founder Profile & Credentials */}
            <div className="space-y-8">
              {/* Hero Image Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="relative mb-6">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-navy/10 rounded-full blur-lg"></div>
                  
                  {/* Main photo */}
                  <div className="relative w-56 h-56 mx-auto">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                      <Image
                        src="/images/founder-kundan-kishore.jpg"
                        alt="Kundan Kishore - Founder & Chief Mentor"
                        width={224}
                        height={224}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>
                    
                    {/* Experience badge */}
                    <div className="absolute -bottom-3 -right-3 bg-accent rounded-xl px-3 py-2 shadow-lg">
                      <div className="text-navy font-bold text-xs">20+ Years</div>
                    </div>
                  </div>
                </div>
                
                {/* Name and title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-navy mb-2">Kundan Kishore</h3>
                  <p className="text-accent font-semibold text-lg">Founder & Chief Mentor</p>
                  <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-3"></div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                    <div className="text-2xl font-bold text-navy">20+</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-navy/10 to-navy/5 rounded-xl">
                    <div className="text-2xl font-bold text-navy">2L+</div>
                    <div className="text-xs text-gray-600">Students Trained</div>
                  </div>
                </div>
              </div>

              {/* Credentials Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h4 className="text-2xl font-bold text-navy mb-6 text-center">Credentials</h4>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <AcademicCapIcon className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-navy text-base">BITS Pilani Alumnus</div>
                      <div className="text-gray-600 text-sm">Engineering Excellence</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <BuildingOffice2Icon className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-navy text-base">Investment Banking</div>
                      <div className="text-gray-600 text-sm">Morgan Stanley, Barclays, RBS</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <ChartBarIcon className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-navy text-base">Trading Expertise</div>
                      <div className="text-gray-600 text-sm">Derivatives & Options</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Story Content */}
            <div className="space-y-8">
              
              {/* Journey Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mr-4">
                    <span className="text-navy font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy">The Journey</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  After graduating from BITS Pilani, Kundan began his career in institutional trading at Morgan Stanley. 
                  Over the next 20 years, he worked with leading financial institutions including Barclays and RBS, 
                  mastering the art and science of derivatives trading.
                </p>
              </div>

              {/* Realization Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-dark rounded-full flex items-center justify-center mr-4">
                    <span className="text-accent font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy">The Realization</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Despite the complexity of options being decoded by Nobel Prize winners, 90% of retail traders were still losing money. 
                  Kundan realized the gap wasn't in the knowledge itself, but in how it was being taught and applied.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mr-4">
                    <span className="text-navy font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy">The Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  In 2020, Kundan founded The School of Options with a simple mission: to bridge the gap between 
                  institutional-quality education and retail trader success. Today, over 2,00,000 students have 
                  benefited from his systematic approach to options trading.
                </p>
              </div>

              {/* Quote Card */}
              <div className="bg-gradient-to-r from-navy to-navy-dark rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-navy font-bold text-2xl">"</span>
                  </div>
                  <div>
                    <blockquote className="text-white font-medium text-xl leading-relaxed italic mb-4">
                      My goal is not just to teach options trading, but to create a generation of disciplined, 
                      profitable traders who understand the science behind every trade.
                    </blockquote>
                    <cite className="text-accent font-bold text-lg">— Kundan Kishore</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to democratize options trading education
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-green"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-green mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-navy mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-navy mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-300">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-300">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful traders who transformed their trading with our guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentorship" className="btn-primary text-lg px-8 py-4">
              Join Mentorship Program
            </Link>
            <Link href="/knowledge-hub" className="btn-secondary text-lg px-8 py-4">
              Explore Free Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
