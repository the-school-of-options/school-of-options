import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, TagIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  blog: BlogPost;
  showCategory?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ 
  blog, 
  showCategory = true, 
  showDate = true, 
  showTags = false,
  variant = 'default' 
}: BlogCardProps) {
  const cardClasses = {
    default: "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-accent/20 group",
    featured: "bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-2 border-accent/10 hover:border-accent/30 group",
    compact: "bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-accent/20 group"
  };

  const titleClasses = {
    default: "text-lg sm:text-xl font-bold text-navy mb-3 sm:mb-4 line-clamp-2 group-hover:text-accent transition-colors",
    featured: "text-xl sm:text-2xl font-bold text-navy mb-3 sm:mb-4 line-clamp-2 group-hover:text-accent transition-colors",
    compact: "text-base sm:text-lg font-bold text-navy mb-2 sm:mb-3 line-clamp-2 group-hover:text-accent transition-colors"
  };

  return (
    <article className={cardClasses[variant]}>
      {/* Featured Image (if available) */}
      {blog.featuredImage && (
        <div className="relative w-full h-48 sm:h-56 mb-4 sm:mb-6 rounded-lg overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {blog.featured && (
            <div className="absolute top-3 left-3 bg-accent text-navy px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
      )}

      {/* 1. Tag at top - Always show for consistency */}
      {showCategory && (
        <div className="mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent border border-accent/20">
            <TagIcon className="w-3 h-3" />
            {blog.category}
          </span>
        </div>
      )}

      {/* 2. Headline */}
      <Link href={`/knowledge-hub/blogs/${blog.slug}`}>
        <h3 className={titleClasses[variant]}>
          {blog.title}
        </h3>
      </Link>

      {/* 3. Source and team */}
      <div className="mb-2 sm:mb-3">
        <div className="flex items-center gap-1 text-sm sm:text-base text-gray-600">
          <UserIcon className="w-4 h-4" />
          <span>{blog.author}</span>
        </div>
      </div>

      {/* 4. Date */}
      {showDate && (
        <div className="mb-4 sm:mb-6">
          <span className="text-sm text-gray-500">{blog.date}</span>
        </div>
      )}

      {/* Excerpt - Different behavior based on image presence */}
      {!blog.featuredImage ? (
        // Extended preview for cards WITHOUT images
        <div className="flex-grow mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base line-clamp-6 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      ) : (
        // No preview text for cards WITH images - just a spacer
        <div className="flex-grow mb-4 sm:mb-6">
          {/* Empty div to maintain spacing */}
        </div>
      )}

      {/* Tags (if enabled) */}
      {showTags && blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* 5. Bottom section - Read time and Read More */}
      <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{blog.readTime}</span>
        </div>
        <Link
          href={`/knowledge-hub/blogs/${blog.slug}`}
          className="text-accent font-semibold hover:text-accent-dark flex items-center gap-1 text-xs sm:text-sm transition-all group-hover:translate-x-1"
        >
          Read More 
          <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </article>
  );
}