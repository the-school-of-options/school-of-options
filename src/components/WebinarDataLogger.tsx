'use client';

import { useEffect } from 'react';

interface WebinarDataLoggerProps {
  liveWebinars: any[];
  upcomingWebinars: any[];
}

export default function WebinarDataLogger({ liveWebinars, upcomingWebinars }: WebinarDataLoggerProps) {
  useEffect(() => {
    console.log('📊 WEBINAR DATA FROM BACKEND API:');
    console.log('🔴 Live Webinars:', liveWebinars);
    console.log('📅 Upcoming Webinars:', upcomingWebinars);
    console.log('📈 Total Count:', {
      live: liveWebinars.length,
      upcoming: upcomingWebinars.length,
      total: liveWebinars.length + upcomingWebinars.length
    });
  }, [liveWebinars, upcomingWebinars]);

  return null; // This component only logs, doesn't render anything
}
