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
import NewsletterForm from '@/components/NewsletterForm';
import EnrollCTA from '@/components/EnrollCTA';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

export const metadata: Metadata = {
  title: 'The School of Options - Learn Options Trading with Expert Mentorship',
  description: 'Get a weekly newsletter covering the most important aspects of Options Trading for traders in India. Join 10,000+ traders receiving market insights, strategies, and analysis every Tuesday.',
  keywords: 'options trading newsletter, trading insights, weekly newsletter, options education, financial newsletter, market analysis, trading strategies',
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/newsletter',
  },
  openGraph: {
    title: 'Free Options Trading Newsletter - The School of Options',
    description: 'Join 10,000+ traders receiving weekly market insights, strategies, and analysis. Get expert options trading content delivered to your inbox every Tuesday.',
    url: `${CANONICAL_ORIGIN}/newsletter`,
    siteName: 'The School of Options',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/founder-kundan-kishore.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Options Trading Newsletter - The School of Options',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Options Trading Newsletter',
    description: 'Join 10,000+ traders receiving weekly market insights, strategies, and analysis every Tuesday.',
    images: ['/images/founder-kundan-kishore.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Use very short revalidation for fresh data
export const revalidate = 0;

export default async function NewsletterPage() {
  const allBlogs = await getAllBlogs();
  const featuredBlogs = await getFeaturedBlogs();

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section - Enhanced Responsiveness */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white min-h-[70vh] flex items-center justify-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8">
            Newsletter
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 font-semibold">
            Get a weekly newsletter that covers the most important aspects of Options Trading for traders in India.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Join over 10,000+ traders who receive market insights, trading strategies, risk management tips, and weekly market analysis delivered straight to their inbox every Tuesday at 8:30 AM IST.
          </p>
          
          {/* Newsletter Signup Form - Eye level positioning */}
          <div className="max-w-sm mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
                Featured Articles
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 font-semibold leading-relaxed mb-4">
                Our most popular and impactful content
              </p>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                Handpicked articles that have helped thousands of traders improve their options trading skills, understand market dynamics, and build profitable strategies.
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
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
              Read our previous Letters
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 font-semibold leading-relaxed mb-4">
              Comprehensive collection of trading insights and educational content
            </p>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
              Browse through our archive of weekly newsletters covering market analysis, trading techniques, risk management strategies, and real-world case studies from successful options trades.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Take Your Trading to the Next Level?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 font-semibold">
            Join our comprehensive mentorship program and learn from experienced traders.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Get personalized guidance, live trading sessions, one-on-one mentorship, and access to our exclusive trading community. Transform your trading journey with proven strategies and expert support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <EnrollCTA 
              variant="primary" 
              size="lg"
              className="text-center"
            />
            <Link
              href="/newsletter"
              className="border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-xl font-semibold transition-colors text-center text-lg"
            >
              Get Free Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}