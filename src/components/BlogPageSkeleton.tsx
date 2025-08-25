export default function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading blog post">
      {/* Header Navigation Skeleton */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Badge Skeleton */}
        <div className="mb-4 sm:mb-6">
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>

        {/* Meta Information Skeleton */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full h-64 sm:h-96 bg-gray-200 rounded-xl animate-pulse mb-8 sm:mb-12" />

        {/* Content Skeleton */}
        <div className="prose prose-lg max-w-none">
          {/* Paragraphs */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mb-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
            </div>
          ))}

          {/* Subheading */}
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mb-4 mt-8" />
          
          {/* More paragraphs */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`second-${index}`} className="mb-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Share Buttons Skeleton */}
        <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-200">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </article>

      {/* Related Articles Skeleton */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-6" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
