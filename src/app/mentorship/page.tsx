
"use client"
  // import { Metadata } from 'next';
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
import EnrollCTA from '@/components/EnrollCTA';
import CloudflareVideoPlayer from '@/components/CloudflareVideoPlayer';
import { useCloudFlare } from '@/hooks/cloudflare.hook';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

// export const metadata: Metadata = {
//   title: '6-Month Options Trading Mentorship Program - The School of Options',
//   description: 'Master options trading with our comprehensive 6-month mentorship program. Learn from 20+ years of experience with structured guidance, risk management, and disciplined trading strategies.',
//   keywords: 'options trading mentorship, trading course, options education, trading program, financial mentorship, options strategies course',
//   metadataBase: new URL(CANONICAL_ORIGIN),
//   alternates: {
//     canonical: '/mentorship',
//   },
//   openGraph: {
//     title: '6-Month Options Trading Mentorship Program - The School of Options',
//     description: 'Master options trading with our comprehensive 6-month mentorship program. Learn structured guidance, risk management, and disciplined trading strategies.',
//     url: `${CANONICAL_ORIGIN}/mentorship`,
//     siteName: 'The School of Options',
//     locale: 'en_US',
//     type: 'website',
//     images: [
//       {
//         url: '/images/founder-kundan-kishore.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Options Trading Mentorship Program - The School of Options',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: '6-Month Options Trading Mentorship Program',
//     description: 'Master options trading with structured guidance, risk management, and disciplined trading strategies.',
//     images: ['/images/founder-kundan-kishore.jpg'],
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
// };

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

  const {isUploading,
      uploadProgress,
      uploadResult,
      error,
      fileInputRef,
      handleFileSelect,
      handleFileUpload,  } = useCloudFlare()

      console.log("Upload Result:", uploadResult);  

  return (
    <div>
      {/* Hero Section - Enhanced Responsiveness */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white min-h-[70vh] flex items-center justify-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8">
            <span className="block sm:inline">6-Month Mentorship Program</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-accent mt-2 sm:mt-0">on Options Trading</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 font-semibold">
          Master Options Trading with Discipline & Edge. Learn high-probability setups, market neutrality, premium decay edge, and automation - not jackpot trades or guesswork
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-2xl mx-auto">
            <EnrollCTA 
              variant="primary" 
              size="md"
              className="w-full sm:w-auto text-center"
            />
            <Link href="/newsletter" className="border border-accent text-accent hover:bg-accent hover:text-navy px-6 py-3 rounded-lg font-semibold transition-colors text-base w-full sm:w-auto text-center">
              <span className="sm:hidden">Free Newsletter</span>
              <span className="hidden sm:inline">Explore Free Resources First</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6-Month Learning Roadmap - Enhanced Responsiveness */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
              6-Month Learning Roadmap
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 font-semibold">
              A systematic journey from complete beginner to disciplined options trader
            </p>
          </div>

                      {/* Mobile Layout - Keep existing clean design */}
            <div className="lg:hidden space-y-8">
              {learningRoadmap.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-accent/10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-navy" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-bold text-accent mb-1">Step {item.step}</div>
                        <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 font-semibold">{item.description}</p>
                    <div className="text-sm font-bold text-white bg-navy px-4 py-2 rounded-lg inline-block">{item.duration}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Layout - Clean Modern Design */}
            <div className="hidden lg:block">
              <div className="relative max-w-6xl mx-auto">
                {/* Progress Bar Background */}
                <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-full"></div>
                
                {/* Steps Container */}
                <div className="grid grid-cols-5 gap-8">
                  {learningRoadmap.map((item, index) => (
                    <div key={item.step} className="relative group">
                      {/* Step Number Circle */}
                      <div className="flex justify-center mb-8">
                        <div className="relative z-10 w-10 h-10 bg-white border-4 border-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <span className="text-sm font-bold text-accent">{item.step}</span>
                        </div>
                      </div>
                      
                      {/* Card */}
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group-hover:border-accent/30 h-[300px] flex flex-col">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                            <item.icon className="h-7 w-7 text-accent" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center flex-grow flex flex-col">
                          {/* Title - Fixed height */}
                          <div className="h-14 flex items-center justify-center mb-3">
                            <h3 className="text-lg font-bold text-navy group-hover:text-accent transition-colors duration-300 leading-tight">
                              {item.title}
                            </h3>
                          </div>
                          
                          {/* Description - Flexible height */}
                          <div className="flex-grow flex items-start justify-center mb-4">
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Duration Badge - Fixed at bottom */}
                        <div className="mt-auto">
                          <div className="inline-flex items-center justify-center w-full px-3 py-2 bg-navy/5 text-navy text-xs font-semibold rounded-lg border border-navy/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                            <CalendarIcon className="h-3 w-3 mr-1.5" />
                            {item.duration}
                          </div>
                        </div>
                      </div>
                      
                      {/* Connecting Arrow */}
                      {index < learningRoadmap.length - 1 && (
                        <div className="absolute top-20 -right-4 z-20 w-8 h-8 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white border-2 border-accent rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-accent border-l-transparent border-r-transparent transform rotate-90"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                  <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-accent/5 to-navy/5 rounded-xl border border-accent/20">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-lg font-semibold text-navy">Complete Your Options Trading Journey</span>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Step 1: Build Your Foundation */}
      <section className="py-16 bg-gradient-to-br from-navy/5 to-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 1: Build Your Foundation
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Master 40+ essential concepts across 6 critical areas of options trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundationConcepts.map((category) => (
              <div key={category.category} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-navy/10 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-navy">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.concepts.map((concept) => (
                    <li key={concept} className="text-gray-600 text-sm font-semibold flex items-start">
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
      <section className="py-16 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 2: Training Before Market Entry
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Practice and perfect your skills with professional-grade tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingTools.map((tool) => (
              <div key={tool.title} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-accent/10 hover:border-accent/30 hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <tool.icon className="h-8 w-8 text-navy" />
                </div>
                
                <h3 className="text-2xl font-bold text-navy mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6 font-semibold">{tool.description}</p>
                
                <ul className="space-y-2 text-left">
                  {tool.features.map((feature) => (
                    <li key={feature} className="text-gray-600 text-sm font-semibold flex items-start">
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
      <section className="py-16 bg-gradient-to-br from-navy-light/10 to-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Step 3: Real Mentorship
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              No tips, no calls - only structured guidance for disciplined trading
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Mentor Philosophy</h3>
              
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border-l-4 border-accent shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-navy mb-2">Discipline Over Profits</h4>
                  <p className="text-gray-600 font-semibold">
                    We focus on building consistent, disciplined trading habits rather than chasing quick profits.
                  </p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border-l-4 border-accent shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-navy mb-2">Edge-Based Trading</h4>
                  <p className="text-gray-600 font-semibold">
                    Learn to identify and exploit statistical edges in the market through systematic approaches.
                  </p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border-l-4 border-accent shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h4 className="font-bold text-navy mb-2">Risk-First Mindset</h4>
                  <p className="text-gray-600 font-semibold">
                    Every strategy begins with risk management, not profit potential.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-navy/10">
              <h3 className="text-2xl font-bold text-navy mb-6">What You Get</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Weekly Sunday Calls</div>
                    <div className="text-gray-600 text-sm font-semibold">Every Sunday 10 AM for 6 months</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DocumentTextIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Personal Trading Plan</div>
                    <div className="text-gray-600 text-sm font-semibold">Customized strategy based on your risk profile</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <LightBulbIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Psychology & Discipline</div>
                    <div className="text-gray-600 text-sm font-semibold">Mental frameworks for consistent execution</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-accent mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Performance Review</div>
                    <div className="text-gray-600 text-sm font-semibold">Regular analysis of your trading decisions</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                <p className="text-navy font-semibold text-center">
                  &quot;No tips, no calls - only structured guidance to make you an independent, disciplined trader.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-navy to-navy-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent"></div>
        </div>
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Journey as a Disciplined Trader
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-semibold">
            Join a community of serious traders who choose discipline over gambling, 
            edge over emotion, and systematic approach over guesswork.
          </p>
          
          <div className="bg-navy-light rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center justify-center">
                <CurrencyRupeeIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">₹35,000</div>
                  <div className="text-gray-300 font-semibold">Complete Program</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <ClockIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">6 Months</div>
                  <div className="text-gray-300 font-semibold">Full Mentorship</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <UsersIcon className="h-12 w-12 text-accent mr-4" />
                <div>
                  <div className="text-4xl font-bold">Limited</div>
                  <div className="text-gray-300 font-semibold">Personalised<br/>Mentorship</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <EnrollCTA 
              variant="primary" 
              size="lg"
              className="px-12"
            />
          </div>
        </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Watch Our Mentorship Program in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our structured approach to options trading education transforms beginners into confident traders
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <CloudflareVideoPlayer
              videoId="eec7ae3b26fa405d96352bf105deae4f"
              hlsUrl="https://customer-7rtovmkzy70zi3se.cloudflarestream.com/eec7ae3b26fa405d96352bf105deae4f/manifest/video.m3u8"
              title="Mentorship Program Overview"
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
