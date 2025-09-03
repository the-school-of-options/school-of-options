'use client';

import { 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon,
  CheckIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Webinar, LiveWebinar } from '@/types/webinar';

interface WebinarCardProps {
  webinar: Webinar | LiveWebinar;
  type?: 'upcoming' | 'live';
  onRegister?: (webinarId: number) => void;
  onJoin?: (webinarId: number, zoomLink: string) => void;
  onViewDetails?: (webinarId: number) => void;
}

export default function WebinarCard({ 
  webinar, 
  type = 'upcoming', 
  onRegister,
  onJoin,
  onViewDetails 
}: WebinarCardProps) {
  const isLive = type === 'live';
  const spotsLeft = webinar.maxParticipants - webinar.currentParticipants;
  const isFullyBooked = spotsLeft <= 0;

  const handleRegisterClick = () => {
    if (onRegister && !isFullyBooked) {
      onRegister(webinar.id);
    }
  };

  const handleJoinClick = () => {
    if (onJoin) {
      onJoin(webinar.id, webinar.zoomLink);
    }
  };

  const handleDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(webinar.id);
    }
  };

  // Type guard to check if webinar is upcoming
  const isUpcomingWebinar = (webinar: Webinar | LiveWebinar): webinar is Webinar => {
    return 'date' in webinar;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-navy/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Header with Live indicator only */}
      <div className="flex justify-between items-start mb-4">
        {isLive && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-bold text-sm uppercase tracking-wide">Live Now</span>
          </div>
        )}
      </div>

      {/* Content Area - Flexible */}
      <div className="flex-1 flex flex-col">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-navy mb-3">{webinar.title}</h3>
        <p className="text-gray-600 mb-4 font-semibold">{webinar.description}</p>

        {/* Date/Time Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          {!isLive && isUpcomingWebinar(webinar) && (
            <>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(webinar.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-4 w-4 mr-1" />
                {webinar.time} IST ({webinar.duration} mins)
              </div>
            </>
          )}
          {isLive && !isUpcomingWebinar(webinar) && (
            <>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Today
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-4 w-4 mr-1" />
                {webinar.startTime} - {webinar.endTime} IST
              </div>
            </>
          )}
          <div className="flex items-center text-gray-600">
            <UsersIcon className="h-4 w-4 mr-1" />
            {webinar.instructor}
          </div>
        </div>

        {/* Topics - Flexible content */}
        <div className="flex-1 mb-6">
          <h4 className="font-semibold text-navy mb-2">What You'll Learn:</h4>
          <ul className="space-y-1">
            {webinar.topics.slice(0, 3).map((topic: string, index: number) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <CheckIcon className="h-3 w-3 text-accent mr-2 mt-0.5 flex-shrink-0" />
                {topic}
              </li>
            ))}
            {webinar.topics.length > 3 && (
              <li className="text-sm text-gray-500 ml-5">
                +{webinar.topics.length - 3} more topics
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Buttons - Anchored to bottom */}
      <div className="flex gap-3 mt-auto">
        {isLive ? (
          <button 
            onClick={handleJoinClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Join via Zoom
          </button>
        ) : (
          <>
            <button 
              onClick={handleRegisterClick}
              className="flex-1 bg-accent hover:bg-accent/90 text-navy px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Register Free
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
            <button 
              onClick={handleDetailsClick}
              className="px-4 py-3 border border-navy text-navy hover:bg-navy hover:text-white rounded-lg font-semibold transition-colors"
            >
              Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}
