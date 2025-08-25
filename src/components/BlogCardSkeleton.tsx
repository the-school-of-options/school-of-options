interface BlogCardSkeletonProps {
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
}

export default function BlogCardSkeleton({ 
  variant = 'default', 
  showImage = true 
}: BlogCardSkeletonProps) {
  const cardClasses = {
    default: "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col h-full border border-gray-100",
    featured: "bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col h-full border-2 border-gray-100",
    compact: "bg-white rounded-lg p-4 shadow-md flex flex-col h-full border border-gray-100"
  };

  return (
    <article className={cardClasses[variant]} role="status" aria-label="Loading blog post">
      {/* Image Skeleton */}
      {showImage && (
        <div className="relative w-full h-48 sm:h-56 mb-4 sm:mb-6 rounded-lg bg-gray-200 animate-pulse" />
      )}

      {/* Category Badge Skeleton */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="mb-2 sm:mb-3">
        <div className="h-6 sm:h-7 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 sm:h-7 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>

      {/* Excerpt Skeleton */}
      <div className="flex-grow mb-4 sm:mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </article>
  );
}

// Grid of skeleton cards
export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} showImage={Math.random() > 0.3} />
      ))}
    </div>
  );
}

// List of skeleton cards
export function BlogListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
          <div className="w-full sm:w-48 h-32 sm:h-36 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
          <div className="flex-grow">
            <div className="h-4 w-20 bg-gray-200 rounded-full animate-pulse mb-3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
