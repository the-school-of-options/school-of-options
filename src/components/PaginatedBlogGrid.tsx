'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/data/blogs';
import BlogCard from './BlogCard';
import { paginateItems } from '@/lib/pagination';

interface PaginatedBlogGridProps {
  blogs: BlogPost[];
  itemsPerPage?: number;
  variant?: 'default' | 'featured' | 'compact';
  showTags?: boolean;
  className?: string;
}

export default function PaginatedBlogGrid({
  blogs,
  itemsPerPage = 9,
  variant = 'default',
  showTags = false,
  className = ''
}: PaginatedBlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationResult = useMemo(() => {
    return paginateItems(blogs, currentPage, itemsPerPage);
  }, [blogs, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {paginationResult.items.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            variant={variant}
            showTags={showTags}
          />
        ))}
      </div>

      {/* Pagination - Always show */}
      {(
        <div className="flex flex-col items-center space-y-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, paginationResult.totalItems)} of{' '}
            {paginationResult.totalItems} articles
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!paginationResult.hasPrevPage}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                paginationResult.hasPrevPage
                  ? 'text-navy bg-white border-gray-300 hover:bg-gray-50 hover:border-accent/30'
                  : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
              }`}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: paginationResult.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  pageNum === currentPage
                    ? 'bg-accent text-white border-accent'
                    : 'text-navy bg-white border-gray-300 hover:bg-accent hover:text-white hover:border-accent'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!paginationResult.hasNextPage}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                paginationResult.hasNextPage
                  ? 'text-navy bg-white border-gray-300 hover:bg-gray-50 hover:border-accent/30'
                  : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
