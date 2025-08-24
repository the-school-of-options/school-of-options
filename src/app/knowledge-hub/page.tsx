import Link from 'next/link';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  PlayIcon, 
  CalculatorIcon,
  CpuChipIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function KnowledgeHubPage() {
  const resourceCategories = [
    {
      icon: BookOpenIcon,
      title: 'Blogs & Articles',
      description: 'In-depth articles on options concepts, trading strategies, and myth-busting insights',
      href: '/knowledge-hub/blogs',
      color: 'bg-blue-500',
      featured: [
        'Understanding Options Greeks in Simple Terms',
        'Why 90% of Traders Lose Money in Options',
        'The Complete Guide to Volatility Trading',
        'Options vs Futures: Which is Better?'
      ]
    },
    {
      icon: ChartBarIcon,
      title: 'Market Research',
      description: 'Weekly market outlook, volatility analysis, and institutional-grade research reports',
      href: '/knowledge-hub/research',
      color: 'bg-green',
      featured: [
        'Weekly Market Outlook & Levels',
        'Volatility Analysis & Predictions',
        'Sector-wise Options Activity',
        'Institutional Trading Patterns'
      ]
    },
    {
      icon: PlayIcon,
      title: 'Video Library',
      description: 'Comprehensive video tutorials from basics to advanced trading strategies',
      href: '/knowledge-hub/videos',
      color: 'bg-red-500',
      featured: [
        'Options Trading for Beginners (10-part series)',
        'Live Trading Sessions & Analysis',
        'Strategy Backtesting Tutorials',
        'Risk Management Masterclass'
      ]
    },
    {
      icon: CalculatorIcon,
      title: 'Trading Tools',
      description: 'Free calculators, analyzers, and tools to enhance your trading decisions',
      href: '/knowledge-hub/tools',
      color: 'bg-purple-500',
      featured: [
        'Options Profit/Loss Calculator',
        'Volatility Analyzer',
        'Greeks Calculator',
        'Position Size Calculator'
      ]
    },
    {
      icon: CpuChipIcon,
      title: 'AI Resources',
      description: 'AI-powered trading assistants and automated analysis tools',
      href: '/knowledge-hub/ai',
      color: 'bg-indigo-500',
      featured: [
        'AI Options Strategy Recommender',
        'Market Sentiment Analyzer',
        'Automated Risk Assessment',
        'Trade Idea Generator'
      ]
    }
  ];

  const latestContent = [
    {
      type: 'Blog',
      title: 'The Psychology Behind Options Trading Losses',
      excerpt: 'Understanding the behavioral biases that lead to consistent losses in options trading...',
      readTime: '8 min read',
      date: 'Dec 20, 2024'
    },
    {
      type: 'Research',
      title: 'Weekly Market Outlook: Nifty 50 Levels & Strategy',
      excerpt: 'Key support and resistance levels for the upcoming week with recommended strategies...',
      readTime: '5 min read',
      date: 'Dec 19, 2024'
    },
    {
      type: 'Video',
      title: 'Live Trading Session: Iron Condor Strategy',
      excerpt: 'Watch how to execute a perfect Iron Condor trade with real market examples...',
      readTime: '25 min watch',
      date: 'Dec 18, 2024'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Knowledge Hub
            <br />
            <span className="text-green">Free for Everyone</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Access our comprehensive library of free resources. Even if you never join our mentorship, 
            we&apos;ll make you smarter about Options than 90% of traders.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">500+</div>
              <div className="text-gray-300">Free Articles & Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">50+</div>
              <div className="text-gray-300">Trading Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">Weekly</div>
              <div className="text-gray-300">Fresh Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Explore Our Free Resources
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to understand options trading, completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resourceCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-green transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="font-semibold text-navy mb-2">Featured Content:</div>
                  {category.featured.map((item) => (
                    <div key={item} className="flex items-center text-gray-600 text-sm">
                      <ArrowRightIcon className="h-4 w-4 text-green mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-green font-semibold group-hover:translate-x-2 transition-transform">
                  Explore All Content <ArrowRightIcon className="h-4 w-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Latest Content
            </h2>
            <p className="text-xl text-gray-600">
              Fresh insights and analysis updated regularly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestContent.map((content) => (
              <div key={content.title} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="bg-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {content.type}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{content.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-3">
                  {content.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {content.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{content.readTime}</span>
                  <button className="text-green font-semibold hover:text-green-dark">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss an Update
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Get daily market levels, insights, and new content delivered to your inbox at 8:30 AM.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newsletter" className="btn-primary text-lg px-8 py-4">
              Subscribe to Newsletter
            </Link>
            <Link href="/mentorship" className="border border-green text-green hover:bg-green hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Join Mentorship Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
