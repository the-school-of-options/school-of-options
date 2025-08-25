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

      {/* Founder Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Meet Our Founder
            </h2>
            <p className="text-xl text-gray-600">
              The story behind The School of Options
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Founder Photo */}
              <div className="relative mb-6 sm:mb-8">
                <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
                  <Image
                    src="/images/founder-kundan-kishore.jpg"
                    alt="Kundan Kishore - Founder & Chief Mentor"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-green rounded-xl px-4 py-2 shadow-xl">
                  <div className="text-navy font-bold text-sm">Founder</div>
                  <div className="text-navy text-xs">& Mentor</div>
                </div>
              </div>
              
              {/* Founder Info Card */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3 sm:mb-4">Kundan Kishore</h3>
                <div className="space-y-2 sm:space-y-3 text-gray-600">
                  <div className="flex items-center text-sm sm:text-base">
                    <AcademicCapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green mr-2 flex-shrink-0" />
                    <span>BITS Pilani Alumnus</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base">
                    <BuildingOffice2Icon className="h-4 w-4 sm:h-5 sm:w-5 text-green mr-2 flex-shrink-0" />
                    <span>Ex-Morgan Stanley, Barclays, RBS</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base">
                    <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green mr-2 flex-shrink-0" />
                    <span>20+ Years Trading Experience</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base">
                    <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green mr-2 flex-shrink-0" />
                    <span>2,00,000+ Students Trained</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-3 sm:mb-4">The Journey</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  After graduating from BITS Pilani, Kundan began his career in institutional trading at Morgan Stanley. 
                  Over the next 20 years, he worked with leading financial institutions including Barclays and RBS, 
                  mastering the art and science of derivatives trading.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-3 sm:mb-4">The Realization</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Despite the complexity of options being decoded by Nobel Prize winners, 90% of retail traders were still losing money. 
                  Kundan realized the gap wasn&apos;t in the knowledge itself, but in how it was being taught and applied.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-3 sm:mb-4">The Mission</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  In 2020, Kundan founded The School of Options with a simple mission: to bridge the gap between 
                  institutional-quality education and retail trader success. Today, over 2,00,000 students have 
                  benefited from his systematic approach to options trading.
                </p>
              </div>
              
              <div className="bg-green rounded-lg p-4 sm:p-6 mt-6">
                <blockquote className="text-navy font-medium italic text-sm sm:text-base">
                  &quot;My goal is not just to teach options trading, but to create a generation of disciplined, 
                  profitable traders who understand the science behind every trade.&quot;
                </blockquote>
                <cite className="text-navy font-semibold mt-2 block text-sm sm:text-base">- Kundan Kishore</cite>
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
