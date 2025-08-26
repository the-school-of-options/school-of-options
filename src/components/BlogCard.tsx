import Link from 'next/link';
import { ClockIcon, TagIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '@/data/blogs';

// Function to generate meaningful preview text from actual blog content
function generatePreviewText(blog: BlogPost): string {
  // First, try to use the excerpt if it exists
  let content = blog.excerpt || '';
  
  // If no excerpt or excerpt is too short, try to use the main content
  if (!content || content.trim().length < 50) {
    content = blog.content || '';
  }
  
  if (!content || !content.trim()) {
    return 'Read this article to learn more about the latest insights and analysis.';
  }
  
  // Clean the content to create a proper preview
  const cleaned = content
    // Remove image URLs (standalone)
    .replace(/https?:\/\/[^\s]+\.(png|jpg|jpeg|gif|webp|svg)(\?[^\s]*)?/gi, '')
    // Remove markdown image syntax ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    // Remove image references like ![Screenshot 2025-08-25 143359.png]
    .replace(/!\[[^\]]*\]/gi, '')
    // Remove image file references in parentheses
    .replace(/\([^)]*\.(png|jpg|jpeg|gif|webp|svg)[^)]*\)/gi, '')
    // Remove markdown headers but keep the text
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown bold/italic formatting but keep the text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    // Remove markdown links but keep the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove extra whitespace and line breaks
    .replace(/\s+/g, ' ')
    // Remove common testing/placeholder text
    .replace(/testing\s+image[^\s]*/gi, '')
    .replace(/screenshot\s+\d{4}-\d{2}-\d{2}[^\s]*/gi, '')
    // Clean up any remaining artifacts
    .replace(/\(\s*\)/g, '')
    .replace(/\[\s*\]/g, '')
    .trim();
  
  // If after cleaning we have meaningful content, use it
  if (cleaned && cleaned.length > 20) {
    // Take the first few sentences or up to 150 characters
    const sentences = cleaned.split(/[.!?]+/);
    let preview = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence && preview.length + trimmedSentence.length < 150) {
        preview += (preview ? '. ' : '') + trimmedSentence;
      } else {
        break;
      }
    }
    
    // If we have a good preview, return it
    if (preview && preview.length > 20) {
      return preview + (preview.endsWith('.') ? '' : '.');
    }
  }
  
  // Fallback to a generic but relevant message
  return 'Read this article to discover valuable insights and expert analysis on options trading.';
}

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
    default: "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 hover:border-accent/20 group min-h-[400px]",
    featured: "bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col border-2 border-accent/10 hover:border-accent/30 group min-h-[400px]",
    compact: "bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100 hover:border-accent/20 group min-h-[400px]"
  };

  const titleClasses = {
    default: "text-lg sm:text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-accent transition-colors",
    featured: "text-xl sm:text-2xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-accent transition-colors",
    compact: "text-base sm:text-lg font-bold text-navy mb-2 line-clamp-2 group-hover:text-accent transition-colors"
  };

  return (
    <Link href={`/knowledge-hub/blogs/${blog.slug}`} className="block">
      <article className={`${cardClasses[variant]} cursor-pointer`}>
        {/* No images - text-only design */}

        {/* 1. Tag at top - Always show for consistency */}
        {showCategory && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-accent/10 text-accent border border-accent/20">
              <TagIcon className="w-3 h-3" />
              {blog.category}
            </span>
          </div>
        )}

        {/* 2. Headline */}
        <h3 className={titleClasses[variant]}>
          {blog.title}
        </h3>

        {/* 3. Source and team */}
        <div className="mb-2">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <UserIcon className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
        </div>

        {/* 4. Date */}
        {showDate && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">{blog.date}</span>
          </div>
        )}

        {/* Excerpt - Always show meaningful preview text */}
        <div className="flex-grow mb-4 min-h-[80px]">
          <p className="text-gray-600 text-sm sm:text-base line-clamp-4 leading-relaxed">
            {generatePreviewText(blog)}
          </p>
        </div>

        {/* Tags (if enabled) */}
        {showTags && blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-accent/10 hover:text-accent transition-colors"
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
          <div className="text-accent font-semibold flex items-center gap-1 text-xs sm:text-sm transition-all group-hover:translate-x-1">
            Read More
            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}