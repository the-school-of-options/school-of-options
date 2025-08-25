import { BlogGridSkeleton } from '@/components/BlogCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation Skeleton */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-12 sm:h-16 bg-white/20 rounded animate-pulse mb-4 sm:mb-6 mx-auto max-w-md" />
            <div className="h-6 bg-white/20 rounded animate-pulse mb-2 mx-auto max-w-2xl" />
            <div className="h-6 bg-white/20 rounded animate-pulse mb-6 sm:mb-8 mx-auto max-w-xl" />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <div className="h-12 w-48 bg-white/20 rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Skeleton */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-4 mx-auto" />
            <div className="h-6 w-80 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <BlogGridSkeleton count={2} />
          </div>
        </div>
      </section>

      {/* All Articles Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-4 mx-auto" />
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          <BlogGridSkeleton count={6} />
          
          {/* View Archive Button Skeleton */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="h-12 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 w-80 bg-white/20 rounded animate-pulse mb-4 sm:mb-6 mx-auto" />
          <div className="h-6 w-96 bg-white/20 rounded animate-pulse mb-6 sm:mb-8 mx-auto" />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <div className="h-12 w-56 bg-white/20 rounded-lg animate-pulse" />
            <div className="h-12 w-44 bg-white/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
