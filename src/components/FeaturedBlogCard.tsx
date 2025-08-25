import Link from 'next/link';
import Image from 'next/image';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { BlogPost } from '@/data/blogs';

interface FeaturedBlogCardProps {
  blog: BlogPost;
  priority?: number; // For featured ordering display
}

export default function FeaturedBlogCard({ blog, priority }: FeaturedBlogCardProps) {
  return (
    <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group relative">
      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-accent text-navy px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center shadow-lg">
          <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          Featured
          {priority && (
            <span className="ml-1 bg-navy text-white px-1.5 py-0.5 rounded-full text-xs">
              #{priority}
            </span>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority === 1} // Prioritize loading for top featured article
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header with category and date */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="bg-navy/10 text-navy px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {blog.category}
          </span>
          <span className="text-gray-500 text-xs sm:text-sm flex items-center">
            <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {blog.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-3 sm:mb-4 line-clamp-2 group-hover:text-accent transition-colors">
          {blog.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base lg:text-lg leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {blog.readTime}
            </div>
            {blog.viewCount && (
              <div className="flex items-center">
                <span>{blog.viewCount.toLocaleString()} views</span>
              </div>
            )}
          </div>
          
          <Link
            href={`/knowledge-hub/blogs/${blog.slug}`}
            className="text-accent font-bold hover:text-accent-dark flex items-center gap-2 text-sm sm:text-base group-hover:translate-x-1 transition-transform"
          >
            Read Article
            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>

      {/* Hover overlay for better interactivity */}
      <Link
        href={`/knowledge-hub/blogs/${blog.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Read ${blog.title}`}
      />
    </article>
  );
}
