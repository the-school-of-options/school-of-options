import Link from 'next/link';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  PlayIcon, 
  CalculatorIcon,
  CpuChipIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

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
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Knowledge Hub - Free for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Even if you never join our mentorship, we&apos;ll still make you smarter about Options than 90% of traders. 
            Access our comprehensive library of free resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources.slice(0, 3).map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <resource.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-green transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              
              <div className="flex items-center text-green font-semibold group-hover:translate-x-2 transition-transform">
                Explore <ArrowRightIcon className="h-4 w-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {resources.slice(3).map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-start">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  <resource.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-green transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center text-green font-semibold group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/knowledge-hub"
            className="btn-secondary text-lg px-8 py-4"
          >
            Visit Complete Knowledge Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
