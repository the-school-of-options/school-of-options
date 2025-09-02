export interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string for upcoming webinars
  time: string; // Time in HH:MM format
  duration: number; // Duration in minutes
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  zoomLink: string;
  registrationRequired: boolean;
  topics: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  category?: 'fundamentals' | 'strategies' | 'analysis' | 'psychology' | 'automation';
  prerequisites?: string[];
  materials?: string[]; // Links to pre-webinar materials
  recordingAvailable?: boolean;
  recordingLink?: string;
  price?: number; // 0 for free webinars
}

export interface LiveWebinar {
  id: number;
  title: string;
  description: string;
  startTime: string; // Time in HH:MM format
  endTime: string; // Time in HH:MM format
  instructor: string;
  currentParticipants: number;
  maxParticipants: number;
  zoomLink: string;
  status: 'live';
  topics: string[];
  category?: string;
  streamStarted?: string; // ISO timestamp when stream started
}

export interface WebinarRegistration {
  id: string;
  webinarId: number;
  userId: string;
  userEmail: string;
  userName: string;
  registeredAt: string; // ISO timestamp
  attended?: boolean;
  joinedAt?: string; // ISO timestamp when user joined
  leftAt?: string; // ISO timestamp when user left
  feedback?: {
    rating: number; // 1-5 stars
    comment?: string;
  };
}

export interface WebinarSeries {
  id: number;
  title: string;
  description: string;
  webinarIds: number[];
  totalSessions: number;
  price: number;
  startDate: string;
  endDate: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
}

export interface WebinarFilters {
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: 'fundamentals' | 'strategies' | 'analysis' | 'psychology' | 'automation';
  dateRange?: {
    start: string;
    end: string;
  };
  instructor?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  availableOnly?: boolean; // Only show webinars with available spots
}

export interface WebinarStats {
  totalWebinars: number;
  upcomingWebinars: number;
  liveWebinars: number;
  completedWebinars: number;
  totalRegistrations: number;
  averageAttendance: number;
  popularTopics: string[];
}
