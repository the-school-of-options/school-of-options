import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { generatePageNumbers } from '@/lib/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g., '/knowledge-hub/blogs' or '/knowledge-hub/blogs/category/tech'
  className?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  baseUrl,
  className = '' 
}: PaginationProps) {
  // Always show pagination bar, even with 1 page

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-accent/30 transition-all duration-200"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </Link>
      ) : (
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {/* First page if not in visible range */}
        {pageNumbers[0] > 1 && (
          <>
            <Link
              href={getPageUrl(1)}
              className="px-3 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
            >
              1
            </Link>
            {pageNumbers[0] > 2 && (
              <span className="px-2 py-2 text-sm text-gray-500">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {pageNumbers.map((pageNum) => (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              pageNum === currentPage
                ? 'bg-accent text-white border-accent'
                : 'text-navy bg-white border-gray-300 hover:bg-accent hover:text-white hover:border-accent'
            }`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </Link>
        ))}

        {/* Last page if not in visible range */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 py-2 text-sm text-gray-500">...</span>
            )}
            <Link
              href={getPageUrl(totalPages)}
              className="px-3 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-accent/30 transition-all duration-200"
          aria-label="Next page"
        >
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Link>
      ) : (
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </span>
      )}
    </nav>
  );
}
