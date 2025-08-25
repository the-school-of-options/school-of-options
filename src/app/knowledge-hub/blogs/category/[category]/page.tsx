import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon,
  ClockIcon,
  TagIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import { getAllBlogs } from '@/lib/strapi-service';
import { getBlogCategories, paginateBlogs } from '@/data/blog-archive';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();
  const categories = getBlogCategories(allBlogs);
  
  return categories.map((category) => ({
    category: category.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const allBlogs = await getAllBlogs();
  const categories = getBlogCategories(allBlogs);
  const category = categories.find(cat => cat.id === categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found - The School of Options',
    };
  }

  return {
    title: `${category.name} Articles - The School of Options`,
    description: `${category.description}. Browse ${category.postCount} articles in this category.`,
    keywords: `${category.name.toLowerCase()}, options trading, trading education, ${category.name.toLowerCase()} articles`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;
  
  const allBlogs = await getAllBlogs();
  const categories = getBlogCategories(allBlogs);
  const category = categories.find(cat => cat.id === categorySlug);
  
  if (!category) {
    notFound();
  }

  // Pagination
  const currentPage = parseInt(page || '1');
  const postsPerPage = 9;
  const paginatedResult = paginateBlogs(category.posts, currentPage, postsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <Link
              href="/knowledge-hub/blogs"
              className="text-navy hover:text-accent transition-colors"
            >
              Blogs
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Category Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FolderIcon className="h-4 w-4 mr-2" />
              Category
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {category.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm sm:text-base">
              <div className="flex items-center">
                <span className="text-gray-400">Total Articles:</span>
                <span className="ml-2 font-semibold text-accent">{category.postCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Navigation */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-semibold text-navy mb-4">Browse Other Categories</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/knowledge-hub/blogs/category/${cat.id}`}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    cat.id === category.id
                      ? 'bg-accent text-navy'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name} ({cat.postCount})
                </Link>
              ))}
            </div>
          </div>

          {/* Articles */}
          {paginatedResult.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {paginatedResult.items.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow group border border-gray-100"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="bg-accent text-navy px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">{post.date}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-navy mb-2 sm:mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                      
                      <Link
                        href={`/knowledge-hub/blogs/${post.slug}`}
                        className="text-accent font-semibold hover:text-accent-dark flex items-center gap-1 text-sm group-hover:translate-x-1 transition-transform"
                      >
                        Read More
                        <ArrowRightIcon className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {paginatedResult.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  {paginatedResult.hasPrevPage && (
                    <Link
                      href={`/knowledge-hub/blogs/category/${category.id}?page=${paginatedResult.currentPage - 1}`}
                      className="flex items-center px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Previous
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: paginatedResult.totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/knowledge-hub/blogs/category/${category.id}?page=${pageNum}`}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          pageNum === paginatedResult.currentPage
                            ? 'bg-accent text-navy'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>
                  
                  {paginatedResult.hasNextPage && (
                    <Link
                      href={`/knowledge-hub/blogs/category/${category.id}?page=${paginatedResult.currentPage + 1}`}
                      className="flex items-center px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Next
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No articles in this category</h3>
              <p className="text-gray-500 mb-6">Check back soon for new content!</p>
              <Link
                href="/knowledge-hub/blogs"
                className="text-accent font-semibold hover:text-accent-dark"
              >
                Browse All Articles →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Ready to Master {category.name}?
          </h2>
          <p className="text-lg text-gray-300 mb-6 sm:mb-8">
            Join our comprehensive mentorship program for hands-on learning and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/mentorship"
              className="bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent-light transition-colors text-center"
            >
              Join Mentorship Program
            </Link>
            <Link
              href="/knowledge-hub/blogs"
              className="border border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors text-center"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
