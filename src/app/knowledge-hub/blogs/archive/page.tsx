import Link from 'next/link';
import { Metadata } from 'next';
import { 
  CalendarIcon, 
  FolderIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { getAllBlogs } from '@/lib/strapi-service';
import { getBlogArchive, getBlogCategories } from '@/data/blog-archive';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog Archive - The School of Options',
  description: 'Browse our complete collection of options trading articles organized by date and category.',
  keywords: 'blog archive, options trading articles, trading education history',
};

export default async function BlogArchivePage() {
  const allBlogs = await getAllBlogs();
  const archive = getBlogArchive(allBlogs);
  const categories = getBlogCategories(allBlogs);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/knowledge-hub/blogs"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Blogs
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
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
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
                    href={`/knowledge-hub/blogs/category/${category.id}`}
                    className="block p-2 sm:p-3 rounded-lg hover:bg-white transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-navy group-hover:text-accent font-medium text-sm sm:text-base">
                        {category.name}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {category.postCount}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
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
                  <span className="text-gray-600 text-sm sm:text-base">Total Articles</span>
                  <span className="font-semibold text-navy">{allBlogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Categories</span>
                  <span className="font-semibold text-navy">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Years</span>
                  <span className="font-semibold text-navy">{archive.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Archive by Date */}
          <div className="lg:col-span-3">
            <div className="space-y-8 sm:space-y-12">
              {archive.map((yearData) => (
                <div key={yearData.year} className="border-b border-gray-200 pb-8 sm:pb-12 last:border-b-0">
                  
                  {/* Year Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy flex items-center">
                      <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
                      {yearData.year}
                    </h2>
                    <span className="text-gray-500 text-sm sm:text-base">
                      {yearData.totalPosts} article{yearData.totalPosts !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Months */}
                  <div className="space-y-6 sm:space-y-8">
                    {yearData.months.map((monthData) => (
                      <div key={monthData.month}>
                        
                        {/* Month Header */}
                        <h3 className="text-lg sm:text-xl font-semibold text-navy mb-4 flex items-center justify-between">
                          <span>{monthData.monthName}</span>
                          <span className="text-sm text-gray-500">
                            {monthData.postCount} post{monthData.postCount !== 1 ? 's' : ''}
                          </span>
                        </h3>

                        {/* Posts for this month */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          {monthData.posts.map((post) => (
                            <BlogCard
                              key={post.id}
                              blog={post}
                              variant="compact"
                              showDate={true}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No content message if empty */}
            {archive.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Check back soon for new content!</p>
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
          <p className="text-lg text-gray-300 mb-6 sm:mb-8">
            Subscribe to our newsletter for daily market levels and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/newsletter"
              className="bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent-light transition-colors text-center"
            >
              Subscribe to Newsletter
            </Link>
            <Link
              href="/mentorship"
              className="border border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors text-center"
            >
              Join Mentorship
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
