import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { getAllBlogs, getFeaturedBlogs } from '@/lib/strapi-service';
import BlogCard from '@/components/BlogCard';
import { Suspense } from 'react';
import { BlogGridSkeleton } from '@/components/BlogCardSkeleton';

export const metadata: Metadata = {
  title: 'Blogs & Articles - The School of Options',
  description: 'In-depth articles on options concepts, trading strategies, and myth-busting insights from experienced traders.',
  keywords: 'options trading blog, trading articles, options strategies, trading education, financial education',
};

// Use very short revalidation for fresh data
export const revalidate = 0;

export default async function BlogsPage() {
  const allBlogs = await getAllBlogs();
  const featuredBlogs = await getFeaturedBlogs();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      {/* <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Knowledge Hub
          </Link>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Newsletter
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-semibold"> Get a weekly newsletter that covers the most important aspects of Options Trading for traders in India.
              
            </p>
            {/* Newsletter Signup Form */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                                 <input
                   type="email"
                   placeholder="Enter your email"
                   className="flex-1 px-4 py-3 rounded-lg text-navy placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base border-2 border-white/30 focus:border-accent bg-white/95 shadow-lg"
                 />
                <button
                  type="submit"
                  className="bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mt-3 text-center">
                By subscribing, I agree to{' '}
                <a href="#" className="underline hover:text-white">Terms of Use</a> and{' '}
                <a href="#" className="underline hover:text-white">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
                Featured Articles
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-semibold">
                Our most popular and impactful content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {featuredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  variant="featured"
                  showTags={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
              Read our previous Letters
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-semibold">
              Comprehensive collection of trading insights and educational content
            </p>
          </div>

          <Suspense fallback={<BlogGridSkeleton count={6} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {allBlogs.slice(0, 6).map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  variant="default"
                />
              ))}
            </div>
          </Suspense>
          
          {/* View Archive Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/knowledge-hub/blogs/archive"
              className="inline-flex items-center bg-navy text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-navy-light transition-colors text-sm sm:text-base"
            >
              View Complete Archive
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Take Your Trading to the Next Level?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-semibold">
            Join our comprehensive mentorship program and learn from experienced traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/mentorship"
              className="bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent-light transition-colors text-center"
            >
              Join Mentorship Program
            </Link>
            <Link
              href="/newsletter"
              className="border border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors text-center"
            >
              Explore Free Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
