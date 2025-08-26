import Link from 'next/link';
import { Suspense } from 'react';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  PlayIcon, 
  CalculatorIcon,
  CpuChipIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { getRecentBlogs } from '@/lib/strapi-service';
import BlogCard from './BlogCard';
import { BlogGridSkeleton } from './BlogCardSkeleton';

// Component to render recent blogs
async function RecentBlogs() {
  const recentBlogs = await getRecentBlogs(3);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {recentBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          variant="default"
        />
      ))}
    </div>
  );
}

export default function KnowledgeHubPreview() {
  const resources = [
    {
      icon: BookOpenIcon,
      title: 'Blogs',
      description: 'In-depth articles on options concepts and myth-busting insights',
      href: '/knowledge-hub/blogs'
    },
    {
      icon: ChartBarIcon,
      title: 'Research',
      description: 'Market outlook, volatility analysis, and trading strategies',
      href: '/knowledge-hub/research'
    },
    {
      icon: PlayIcon,
      title: 'Videos',
      description: 'Comprehensive video library with practical trading examples',
      href: '/knowledge-hub/videos'
    },
    {
      icon: CalculatorIcon,
      title: 'Tools',
      description: 'Options calculators, chain decoders, and risk analyzers',
      href: '/knowledge-hub/tools'
    },
    {
      icon: CpuChipIcon,
      title: 'AI Resources',
      description: 'AI-powered trading assistants and automated analysis tools',
      href: '/knowledge-hub/ai'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
            Knowledge Hub - Free for Everyone
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Even if you never join our mentorship, we&apos;ll still make you smarter about Options than 90% of traders. 
            Access our comprehensive library of free resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {resources.slice(0, 3).map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <resource.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-navy mb-3 sm:mb-4 group-hover:text-accent transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                {resource.description}
              </p>
              
              <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                Explore <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {resources.slice(3).map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center mr-3 sm:mr-4 lg:mr-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  <resource.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-navy mb-3 sm:mb-4 group-hover:text-accent transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                    Explore <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Latest Blog Posts */}

        
        <div className="text-center">
          <Link
            href="/knowledge-hub"
            className="btn-secondary text-base px-6 py-3 inline-flex items-center gap-2"
          >
            View All Resources
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
