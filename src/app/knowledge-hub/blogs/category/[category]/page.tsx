import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  FolderIcon
} from '@heroicons/react/24/outline';
import { getAllBlogs } from '@/lib/strapi-service';
import { getBlogCategories } from '@/data/blog-archive';
import PaginatedBlogGrid from '@/components/PaginatedBlogGrid';

interface CategoryPageProps {
  params: Promise<{
    category: string;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  const allBlogs = await getAllBlogs();
  const categories = getBlogCategories(allBlogs);
  const category = categories.find(cat => cat.id === categorySlug);
  
  if (!category) {
    notFound();
  }

  // For static export, show all posts without pagination
  const allPosts = category.posts;

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
            <span className="text-gray-600 font-semibold">{category.name}</span>
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
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-semibold">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm sm:text-base">
              <div className="flex items-center">
                <span className="text-gray-400 font-semibold">Total Articles:</span>
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
          <PaginatedBlogGrid 
            blogs={allPosts}
            itemsPerPage={9}
            variant="default"
            showTags={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Ready to Master {category.name}?
          </h2>
          <p className="text-lg text-gray-300 mb-6 sm:mb-8 font-semibold">
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
