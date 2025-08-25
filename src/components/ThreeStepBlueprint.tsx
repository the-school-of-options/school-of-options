import { AcademicCapIcon, WrenchScrewdriverIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function ThreeStepBlueprint() {
  const steps = [
    {
      icon: AcademicCapIcon,
      title: 'Teaching',
      description: 'Live classes, recorded videos, and 1-on-1 sessions with expert instructors.',
      features: ['Live Zoom Classes', 'Recorded Sessions', 'Personal Guidance', 'Q&A Support']
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Training',
      description: 'Hands-on tools, backtesting, paper trading, and automation to build real skills.',
      features: ['Backtesting Tools', 'Paper Trading', 'Trade Automation', 'Risk Management']
    },
    {
      icon: UserGroupIcon,
      title: 'Mentorship',
      description: 'Measurable goals with personalized plans and 6 months of continuous follow-up.',
      features: ['Personal Trading Plan', 'Goal Setting', '6-Month Support', 'Performance Tracking']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-3 sm:mb-4 lg:mb-6">
            Our Proven Success Formula
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            A systematic 3-step approach that transforms beginners into confident options traders
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connection Line - only show on large screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-accent/30 z-0" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center relative z-10 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                  <step.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-navy" />
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-2 sm:mb-3 lg:mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 lg:mb-6 flex-grow text-xs sm:text-sm lg:text-base">{step.description}</p>
                
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-left">
                  {step.features.map((feature) => (
                    <li key={feature} className="text-xs sm:text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full mr-2 sm:mr-3 mt-1 sm:mt-1.5 lg:mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-3 sm:mb-4 px-4 sm:px-0">
            This is not just a course. It&apos;s a blueprint for a successful trading career.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4 sm:px-0">
            Join thousands who have transformed their trading journey with our proven methodology.
          </p>
        </div>
      </div>
    </section>
  );
}
