'use client';

import { useState } from 'react';
import WebinarList from './WebinarList';
import WebinarRegistrationModal from './WebinarRegistrationModal';
import { Webinar, LiveWebinar } from '@/types/webinar';

interface WebinarsClientProps {
  upcomingWebinars: Webinar[];
  liveWebinars: LiveWebinar[];
}

export default function WebinarsClient({ upcomingWebinars, liveWebinars }: WebinarsClientProps) {
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // Handler functions for webinar actions
  const handleRegister = (webinarId: number) => {
    const webinar = upcomingWebinars.find(w => w.id === webinarId);
    if (webinar) {
      setSelectedWebinar(webinar);
      setIsRegistrationModalOpen(true);
    }
  };

  const handleRegistrationSubmit = async (registrationData: {
    webinarId: number;
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      // TODO: Call Zoom API to register user
      // POST /webinars/{webinarId}/registrants
      console.log('Registering user:', registrationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle success - show success message, send confirmation email
      alert(`Registration successful! Check your email for the Zoom join link.`);
      
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw to let modal handle the error
    }
  };

  const handleJoin = (webinarId: number, zoomLink: string) => {
    if (zoomLink) {
      window.open(zoomLink, '_blank');
    } else {
      // For live webinars, we would get the join link from Zoom API
      console.log('Getting join link for live webinar:', webinarId);
      // TODO: Fetch join link from Zoom API and redirect
      alert('Getting your join link... Please wait.');
    }
  };

  const handleViewDetails = (webinarId: number) => {
    // TODO: Navigate to webinar details page
    // router.push(`/webinars/${webinarId}`);
    console.log('View details for webinar:', webinarId);
  };

  return (
    <>
      <WebinarList
        upcomingWebinars={upcomingWebinars}
        liveWebinars={liveWebinars}
        onRegister={handleRegister}
        onJoin={handleJoin}
        onViewDetails={handleViewDetails}
        showFilters={false}
        showSearch={false}
      />
      
      <WebinarRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setSelectedWebinar(null);
        }}
        webinar={selectedWebinar}
        onRegister={handleRegistrationSubmit}
      />
    </>
  );
}
