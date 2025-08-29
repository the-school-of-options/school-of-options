import Link from 'next/link';
import { Metadata } from 'next';
import { 
  CalendarIcon, 
  FolderIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { getAllBlogs } from '@/lib/strapi-service';
import { getBlogCategories } from '@/data/blog-archive';
import PaginatedBlogGrid from '@/components/PaginatedBlogGrid';

export const metadata: Metadata = {
  title: 'Blog Archive - The School of Options Newsletter',
  description: 'Browse our complete collection of options trading articles organized by date and category.',
  keywords: 'blog archive, options trading articles, trading education history',
};

export default async function BlogArchivePage() {
  const allBlogs = await getAllBlogs();
  const categories = getBlogCategories(allBlogs);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/newsletter"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Newsletter
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Blog Archive
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-semibold">
              Explore our complete collection of articles on options trading, organized by date and category.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Sidebar - Categories & Archive */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            
            {/* Categories */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-navy mb-4 flex items-center">
                <FolderIcon className="h-5 w-5 mr-2" />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                                      <Link
                      key={category.id}
                      href={`/newsletter/blogs/category/${category.id}`}
                      className="block p-2 sm:p-3 rounded-lg hover:bg-white transition-colors group"
                    >
                    <div className="flex items-center justify-between">
                      <span className="text-navy group-hover:text-accent font-medium text-sm sm:text-base">
                        {category.name}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm font-semibold">
                        {category.postCount}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 font-semibold">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base font-semibold">Total Articles</span>
                  <span className="font-semibold text-navy">{allBlogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base font-semibold">Categories</span>
                  <span className="font-semibold text-navy">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base font-semibold">Latest Post</span>
                  <span className="font-semibold text-navy text-xs sm:text-sm">
                    {allBlogs.length > 0 ? new Date(allBlogs[0].date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - All Articles with Pagination */}
          <div className="lg:col-span-3">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy flex items-center">
                <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
                All Articles
              </h2>
              <p className="text-gray-600 mt-2 font-semibold">
                Browse through all articles, sorted by latest first
              </p>
            </div>

            {/* Paginated Blog Grid */}
            {allBlogs.length > 0 ? (
              <PaginatedBlogGrid
                blogs={allBlogs}
                itemsPerPage={12}
                variant="default"
                showTags={false}
              />
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500 font-semibold">Check back soon for new content!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Want More Trading Insights?
          </h2>
          <p className="text-lg text-gray-300 mb-6 sm:mb-8 font-semibold">
            Subscribe to our newsletter for daily market levels and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/newsletter"
              className="btn-primary-lg text-center"
            >
              Subscribe to Newsletter
            </Link>
                            <a
                  href="https://rzp.io/rzp/theschoolofoptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors text-center text-lg"
                >
                  Enroll Now
                </a>
          </div>
        </div>
      </section>
    </div>
  );
}
