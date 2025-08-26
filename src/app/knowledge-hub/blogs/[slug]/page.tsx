import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  TagIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { getBlogBySlug, getAllBlogs } from '@/lib/strapi-service';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found - The School of Options',
    };
  }

  return {
    title: `${blog.title} - The School of Options`,
    description: blog.excerpt,
    keywords: blog.tags.join(', '),
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Format content with proper markdown-style rendering
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Handle image URLs (both markdown format and plain URLs)
        const imageUrlRegex = /https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg)(\?[^\s]*)?/i;
        const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
        
        if (imageUrlRegex.test(line) || markdownImageRegex.test(line)) {
          let imageUrl = '';
          let altText = '';
          
          // Check for markdown image format first
          const markdownMatch = line.match(markdownImageRegex);
          if (markdownMatch) {
            altText = markdownMatch[1] || 'Blog image';
            imageUrl = markdownMatch[2];
          } else {
            // Plain URL format
            const urlMatch = line.match(imageUrlRegex);
            if (urlMatch) {
              imageUrl = urlMatch[0];
              altText = 'Blog image';
            }
          }
          
          if (imageUrl) {
            return (
              <div key={index} className="my-6 sm:my-8">
                <figure className="relative w-full max-w-4xl mx-auto">
                  {/* Image container with proper centering and no visible background */}
                  <div className="relative inline-block w-full text-center">
                    <Image
                      src={imageUrl}
                      alt={altText}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                      className="inline-block w-auto h-auto max-w-full max-h-[600px] object-contain rounded-lg shadow-lg"
                      style={{ 
                        width: 'auto', 
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '600px'
                      }}
                    />
                  </div>
                  {/* Caption */}
                  {altText && altText !== 'Blog image' && (
                    <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                      {altText}
                    </figcaption>
                  )}
                </figure>
              </div>
            );
          }
        }
        
        // Handle headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6 mt-6 sm:mt-8">
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-3 sm:mb-4 mt-5 sm:mt-6">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-lg sm:text-xl md:text-2xl font-bold text-navy mb-2 sm:mb-3 mt-4 sm:mt-5">
              {line.substring(4)}
            </h3>
          );
        }
        
        // Handle bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={index} className="font-bold text-navy mb-2 sm:mb-3 text-sm sm:text-base">
              {line.substring(2, line.length - 2)}
            </p>
          );
        }
        
        // Handle list items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-700 mb-1 sm:mb-2 ml-4 sm:ml-6 text-sm sm:text-base">
              {line.substring(2)}
            </li>
          );
        }
        
        // Handle numbered lists
        if (line.match(/^\d+\./)) {
          return (
            <li key={index} className="text-gray-700 mb-1 sm:mb-2 ml-4 sm:ml-6 text-sm sm:text-base list-decimal">
              {line.substring(line.indexOf('.') + 2)}
            </li>
          );
        }
        
        // Handle empty lines
        if (line.trim() === '') {
          return <div key={index} className="mb-2 sm:mb-4"></div>;
        }
        
        // Skip lines that are just image URLs (already handled above)
        if (imageUrlRegex.test(line.trim()) && line.trim().match(imageUrlRegex)?.[0] === line.trim()) {
          return null;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
            {line}
          </p>
        );
      })
      .filter(Boolean); // Remove null entries
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Knowledge Hub
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12">
          {/* Category Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="bg-accent text-navy px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center"
              >
                <TagIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Button */}
          <div className="border-b border-gray-200 pb-6 sm:pb-8">
            <button className="inline-flex items-center text-accent hover:text-accent-dark transition-colors text-sm sm:text-base font-semibold">
              <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Share Article
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <div className="space-y-2 sm:space-y-4">
            {formatContent(blog.content)}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
          <div className="bg-gradient-to-r from-navy to-navy-dark rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Want to Learn More About Options Trading?
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                Join our 6-month mentorship program and learn from 20+ years of trading experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/mentorship"
                  className="bg-accent text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-accent-light transition-colors text-center text-sm sm:text-base"
                >
                  Join Mentorship Program
                </Link>
                <Link
                  href="/knowledge-hub"
                  className="border border-white text-white hover:bg-white hover:text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  Explore More Resources
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
