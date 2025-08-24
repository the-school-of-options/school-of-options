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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
            Our Proven Success Formula
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            A systematic 3-step approach that transforms beginners into confident options traders
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-accent/30 z-0" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
              
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-navy" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 flex-grow text-sm sm:text-base">{step.description}</p>
                
                <ul className="space-y-2 sm:space-y-3 text-left">
                  {step.features.map((feature) => (
                    <li key={feature} className="text-xs sm:text-sm text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-navy mb-4">
            This is not just a course. It&apos;s a blueprint for a successful trading career.
          </p>
          <p className="text-gray-600">
            Join thousands who have transformed their trading journey with our proven methodology.
          </p>
        </div>
      </div>
    </section>
  );
}
