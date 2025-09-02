'use client';

import { useState } from 'react';
import WebinarCard from './WebinarCard';
import WebinarPagination from './WebinarPagination';
import { Webinar, LiveWebinar } from '@/types/webinar';
import { 
  VideoCameraIcon
} from '@heroicons/react/24/outline';

interface WebinarListProps {
  upcomingWebinars: Webinar[];
  liveWebinars: LiveWebinar[];
  onRegister?: (webinarId: number) => void;
  onJoin?: (webinarId: number, zoomLink: string) => void;
  onViewDetails?: (webinarId: number) => void;
  showFilters?: boolean;
  showSearch?: boolean;
}

export default function WebinarList({
  upcomingWebinars,
  liveWebinars,
  onRegister,
  onJoin,
  onViewDetails,
  showFilters = true,
  showSearch = true
}: WebinarListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const webinarsPerPage = 4;

  // Calculate pagination for upcoming webinars
  const totalPages = Math.ceil(upcomingWebinars.length / webinarsPerPage);
  const startIndex = (currentPage - 1) * webinarsPerPage;
  const endIndex = startIndex + webinarsPerPage;
  const currentWebinars = upcomingWebinars.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of webinars section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Live Webinars Section */}
      {liveWebinars.length > 0 && (
        <div>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-2xl font-bold text-navy">Live Now</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveWebinars.map((webinar) => (
              <WebinarCard
                key={webinar.id}
                webinar={webinar}
                type="live"
                onJoin={onJoin}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Webinars Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy">
            Upcoming Webinars
            {upcomingWebinars.length > webinarsPerPage && (
              <span className="text-lg text-gray-600 font-normal ml-2">
                ({upcomingWebinars.length} total)
              </span>
            )}
          </h2>
        </div>

        {upcomingWebinars.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <VideoCameraIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No upcoming webinars</h3>
            <p className="text-gray-500">Check back soon for new sessions</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentWebinars.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  type="upcoming"
                  onRegister={onRegister}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            <WebinarPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
