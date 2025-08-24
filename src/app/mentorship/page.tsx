import { 
  CheckIcon, 
  CalendarIcon, 
  UsersIcon, 
  CurrencyRupeeIcon, 
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MentorshipPage() {
  const learningRoadmap = [
    {
      step: 1,
      title: 'Get Started',
      description: 'Lifetime access to 8 recorded courses (Hindi & English)',
      icon: AcademicCapIcon,
      duration: 'Immediate Access'
    },
    {
      step: 2,
      title: 'Pre-Mentorship Part 1',
      description: 'Basics of Futures, Options & Derivatives (Week 1 Live Classes)',
      icon: DocumentTextIcon,
      duration: 'Week 1'
    },
    {
      step: 3,
      title: 'Strategy Practice',
      description: 'Excel templates for practice and skill development',
      icon: ComputerDesktopIcon,
      duration: 'Week 2-3'
    },
    {
      step: 4,
      title: 'Pre-Mentorship Part 2',
      description: 'Advanced live classes on Volatility, Greeks, Strategies, Automation',
      icon: ChartBarIcon,
      duration: 'Week 4-5'
    },
    {
      step: 5,
      title: 'Sunday Mentorship',
      description: 'Weekly mentorship sessions (6 months, Sunday 10 AM)',
      icon: UserGroupIcon,
      duration: '6 Months'
    }
  ];

  const foundationConcepts = [
    {
      category: 'Options Basics',
      concepts: ['Call & Put Options', 'Strike Price & Expiry', 'Intrinsic & Time Value', 'Moneyness', 'Options Chain', 'Premium & Payoff', 'Exercise & Assignment']
    },
    {
      category: 'Greeks',
      concepts: ['Delta & Gamma', 'Theta Decay', 'Vega & Volatility', 'Rho & Interest Rates', 'Greeks Interaction', 'Portfolio Greeks']
    },
    {
      category: 'Strategies',
      concepts: ['Long Call/Put', 'Short Call/Put', 'Covered Call', 'Protective Put', 'Bull/Bear Spreads', 'Iron Condor', 'Straddle/Strangle', 'Butterfly Spreads']
    },
    {
      category: 'Risk Management',
      concepts: ['Position Sizing', 'Stop Loss Rules', 'Portfolio Allocation', 'Max Risk Per Trade', 'Correlation Risk', 'Liquidity Risk']
    },
    {
      category: 'Psychology',
      concepts: ['Discipline & Patience', 'Emotional Control', 'FOMO Management', 'Loss Acceptance', 'Profit Taking', 'Consistency Focus']
    },
    {
      category: 'Automation',
      concepts: ['Algo Trading Basics', 'API Integration', 'Strategy Backtesting', 'Risk Parameters', 'Order Management', 'Performance Tracking']
    }
  ];

  const trainingTools = [
    {
      title: 'Backtesting',
      description: 'Test your strategies on historical data before risking real money',
      features: ['Historical Data Analysis', 'Strategy Performance Metrics', 'Risk-Reward Optimization', 'Market Condition Testing'],
      icon: ChartBarIcon
    },
    {
      title: 'Paper Trading',
      description: 'Practice with real market data without financial risk',
      features: ['Live Market Simulation', 'Real-time Order Execution', 'Portfolio Tracking', 'Performance Analysis'],
      icon: ComputerDesktopIcon
    },
    {
      title: 'Trade Automation',
      description: 'Learn to automate strategies with Sensibull, Opstra & Algo tools',
      features: ['Strategy Automation', 'Risk Management Rules', 'Alert Systems', 'Performance Monitoring'],
      icon: CogIcon
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Options Trading with
            <br />
            <span className="text-accent">Discipline & Edge</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn high-probability setups, market neutrality, premium decay edge, and automation — 
            not jackpot trades or guesswork.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Apply Now
            </button>
            <Link href="/knowledge-hub" className="border border-accent text-accent hover:bg-accent hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors">
              Explore Free Resources First
            </Link>
          </div>
        </div>
      </section>

      {/* 6-Month Learning Roadmap */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              6-Month Learning Roadmap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic journey from complete beginner to disciplined options trader
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-accent/30"></div>
            
            <div className="space-y-12">
              {learningRoadmap.map((item, index) => (
                <div key={item.step} className={`relative flex items-center ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center mb-4 lg:hidden">
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                          <item.icon className="h-6 w-6 text-navy" />
                        </div>
                        <div className="text-2xl font-bold text-accent">Step {item.step}</div>
                      </div>
                      
                      <div className="hidden lg:flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                          <item.icon className="h-8 w-8 text-navy" />
                        </div>
                      </div>
                      
                      <div className="hidden lg:block text-2xl font-bold text-accent mb-2">Step {item.step}</div>
                      <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="text-sm font-semibold text-accent">{item.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Build Your Foundation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 1: Build Your Foundation
            </h2>
            <p className="text-xl text-gray-600">
              Master 40+ essential concepts across 6 critical areas of options trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundationConcepts.map((category) => (
              <div key={category.category} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-navy">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.concepts.map((concept) => (
                    <li key={concept} className="text-gray-600 text-sm flex items-start">
                      <CheckIcon className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Training Before Market Entry */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 2: Training Before Market Entry
            </h2>
            <p className="text-xl text-gray-600">
              Practice and perfect your skills with professional-grade tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingTools.map((tool) => (
              <div key={tool.title} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <tool.icon className="h-8 w-8 text-navy" />
                </div>
                
                <h3 className="text-2xl font-bold text-navy mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                
                <ul className="space-y-2 text-left">
                  {tool.features.map((feature) => (
                    <li key={feature} className="text-gray-600 text-sm flex items-start">
                      <CheckIcon className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: Real Mentorship */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 3: Real Mentorship
            </h2>
            <p className="text-xl text-gray-600">
              No tips, no calls — only structured guidance for disciplined trading
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Mentor Philosophy</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border-l-4 border-accent">
                  <h4 className="font-bold text-navy mb-2">Discipline Over Profits</h4>
                  <p className="text-gray-600">
                    We focus on building consistent, disciplined trading habits rather than chasing quick profits.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-accent">
                  <h4 className="font-bold text-navy mb-2">Edge-Based Trading</h4>
                  <p className="text-gray-600">
                    Learn to identify and exploit statistical edges in the market through systematic approaches.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-accent">
                  <h4 className="font-bold text-navy mb-2">Risk-First Mindset</h4>
                  <p className="text-gray-600">
                    Every strategy begins with risk management, not profit potential.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-navy mb-6">What You Get</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Weekly Sunday Calls</div>
                    <div className="text-gray-600 text-sm">Every Sunday 10 AM for 6 months</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DocumentTextIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Personal Trading Plan</div>
                    <div className="text-gray-600 text-sm">Customized strategy based on your risk profile</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <LightBulbIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Psychology & Discipline</div>
                    <div className="text-gray-600 text-sm">Mental frameworks for consistent execution</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Performance Review</div>
                    <div className="text-gray-600 text-sm">Regular analysis of your trading decisions</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                <p className="text-navy font-semibold text-center">
                  "No tips, no calls — only structured guidance to make you an independent, disciplined trader."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Journey as a Disciplined Trader
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the next cohort of serious traders who choose discipline over gambling, 
            edge over emotion, and systematic approach over guesswork.
          </p>
          
          <div className="bg-navy-light rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center justify-center">
                <CurrencyRupeeIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">₹35,000</div>
                  <div className="text-gray-300">Complete Program</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <ClockIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">6 Months</div>
                  <div className="text-gray-300">Full Mentorship</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <UsersIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">Limited</div>
                  <div className="text-gray-300">Seats Available</div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="btn-primary text-lg px-12 py-4 mb-6">
            Apply Now
          </button>
          
          <p className="text-gray-300 text-sm">
            Next cohort starts January 15, 2025 • Limited to 50 students for personalized attention
          </p>
        </div>
      </section>

    </div>
  );
}
