import Link from 'next/link';
import { 
  BookOpenIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';



export default function KnowledgeHubPreview() {
  const resource = {
    icon: BookOpenIcon,
    title: 'Blogs',
    description: 'In-depth articles on options concepts and myth-busting insights',
    href: '/newsletter/blogs'
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
            Free Resources - Start Learning Today
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 font-semibold">
            Even if you never join our mentorship, we&apos;ll still make you smarter about Options than 90% of traders. 
            Access our comprehensive library of free resources and newsletter.
          </p>
        </div>
        
        <div className="flex justify-center mb-8 sm:mb-12">
          <Link
            href={resource.href}
            className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent rounded-full flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform mx-auto">
                <resource.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-4 sm:mb-6 group-hover:text-accent transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 font-semibold leading-relaxed">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-center text-accent font-semibold group-hover:translate-x-2 transition-transform text-base sm:text-lg">
                Explore <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>
        
        {/* Latest Blog Posts */}

        
        <div className="text-center">
          <Link
            href="/newsletter"
            className="bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-light transition-colors text-lg inline-flex items-center gap-2"
          >
            Get Free Newsletter
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
