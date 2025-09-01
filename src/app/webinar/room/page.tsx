"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ZoomWebinarPlayer from '@/components/ZoomWebinarPlayer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ExclamationTriangleIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

function WebinarRoomContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [error, setError] = useState<string | null>(null);
  const [webinarData, setWebinarData] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    // Get webinar details from URL parameters
    const meetingNumber = searchParams.get('mn');
    const password = searchParams.get('pwd');
    const title = searchParams.get('title') || 'Live Webinar';

    if (!meetingNumber) {
      setError('Invalid webinar link. Meeting number is required.');
      return;
    }

    // Construct webinar ID (can be meeting number or full URL)
    const webinarId = password 
      ? `https://zoom.us/w/${meetingNumber}?pwd=${password}`
      : meetingNumber;

    setWebinarData({
      id: webinarId,
      title: decodeURIComponent(title)
    });
  }, [searchParams]);

  const handleClose = () => {
    router.push('/webinar');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Join Webinar</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setError(null)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Webinars
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!webinarData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading webinar...</p>
        </div>
      </div>
    );
  }

  return (
    <ZoomWebinarPlayer
      webinarId={webinarData.id}
      webinarTitle={webinarData.title}
      userName={user?.fullName || "Guest"}
      userEmail={user?.email || "guest@example.com"}
      onClose={handleClose}
      onError={handleError}
    />
  );
}

export default function WebinarRoomPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading webinar...</p>
        </div>
      </div>
    }>
      <WebinarRoomContent />
    </Suspense>
  );
}