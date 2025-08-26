import Link from 'next/link';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  PlayIcon, 
  CpuChipIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Suspense } from 'react';
import { BlogGridSkeleton } from '@/components/BlogCardSkeleton';
import { getRecentBlogs } from '@/lib/strapi-service';
import BlogCard from '@/components/BlogCard';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function KnowledgeHubPage() {
  const latestBlogs = await getRecentBlogs(3); // Get the 3 most recent blogs
  
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
    // {
    //   icon: CalculatorIcon,
    //   title: 'Trading Tools',
    //   description: 'Free calculators, analyzers, and tools to enhance your trading decisions',
    //   href: '/knowledge-hub/tools',
    //   color: 'bg-purple-500',
    //   featured: [
    //     'Options Profit/Loss Calculator',
    //     'Volatility Analyzer',
    //     'Greeks Calculator',
    //     'Position Size Calculator'
    //   ]
    // },
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



  return (
    <div>
      {/* Hero Section - Enhanced Responsiveness */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            <span className="block">Knowledge Hub</span>
            <span className="text-green">Free for Everyone</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-0">
            Access our comprehensive library of free resources. Even if you never join our mentorship, 
            we&apos;ll make you smarter about Options than 90% of traders.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">500+</div>
              <div className="text-gray-300 text-sm sm:text-base">Free Articles & Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">50+</div>
              <div className="text-gray-300 text-sm sm:text-base">Trading Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">Weekly</div>
              <div className="text-gray-300 text-sm sm:text-base">Fresh Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
              Latest Articles
            </h3>
            <p className="text-base sm:text-lg text-gray-600">
              Fresh insights from our trading experts
            </p>
          </div>
          
          <Suspense fallback={<BlogGridSkeleton count={3} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {latestBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  variant="default"
                />
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Resource Categories - Enhanced Responsiveness */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
              Explore Our Free Resources
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0">
              Everything you need to understand options trading, completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {resourceCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${category.color} rounded-full flex items-center justify-center mr-3 sm:mr-4 lg:mr-6 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <category.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-2 sm:mb-3 group-hover:text-green transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <div className="font-semibold text-navy mb-2 text-sm sm:text-base">Featured Content:</div>
                  {category.featured.map((item) => (
                    <div key={item} className="flex items-start text-gray-600 text-xs sm:text-sm">
                      <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center text-green font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                  Explore All Content <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content - Enhanced Responsiveness */}


      {/* Newsletter CTA - Enhanced Responsiveness */}
      <section className="py-12 sm:py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Never Miss an Update
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
            Get daily market levels, insights, and new content delivered to your inbox at 8:30 AM.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
            <Link href="/newsletter" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
              <span className="sm:hidden">Subscribe</span>
              <span className="hidden sm:inline">Subscribe to Newsletter</span>
            </Link>
            <Link href="/mentorship" className="border border-green text-green hover:bg-green hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-base sm:text-lg w-full sm:w-auto">
              <span className="sm:hidden">Join Program</span>
              <span className="hidden sm:inline">Join Mentorship Program</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
