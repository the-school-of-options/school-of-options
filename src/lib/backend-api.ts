// Backend API service for The School of Options
// Integrates with https://api.theschoolofoptions.com

interface BackendWebinarResponse {
  uuid: string;
  id: number;
  host_id: string;
  host_email?: string;
  topic: string;
  type: number;
  start_time: string; // ISO string
  duration: number; // minutes
  timezone: string;
  agenda?: string;
  created_at: string;
  join_url: string;
  start_url?: string;
  password?: string;
  is_simulive: boolean;
  supportGoLive: boolean;
  transition_to_live: boolean;
  settings?: {
    host_video: boolean;
    panelists_video: boolean;
    approval_type: number;
    audio: string;
    auto_recording: string;
    question_answer?: boolean;
    question_and_answer?: {
      enable: boolean;
      allow_anonymous_questions: boolean;
      answer_questions: string;
      attendees_can_upvote: boolean;
      attendees_can_comment: boolean;
      allow_submit_questions: boolean;
    };
    registrants_confirmation_email?: boolean;
    registrants_email_notification?: boolean;
    contact_email?: string;
  };
}

export class BackendAPIService {
  private baseURL = 'https://api.theschoolofoptions.com/api/v1';

  /**
   * Fetch all webinars from backend
   */
  async getWebinarList(): Promise<BackendWebinarResponse[]> {
    const response = await fetch(`${this.baseURL}/zoom/webinar-list`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch webinars: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Fetch single webinar details from backend
   */
  async getSingleWebinar(webinarId: number): Promise<BackendWebinarResponse> {
    const response = await fetch(`${this.baseURL}/zoom/single-webinar/${webinarId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch webinar: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Transform backend webinar data to our frontend format
   */
  transformToFrontendFormat(backendWebinar: BackendWebinarResponse) {
    const startDate = new Date(backendWebinar.start_time);
    const isLive = this.isWebinarLive(backendWebinar);

    // Extract instructor name from host_email if available
    const instructor = this.extractInstructorName(backendWebinar.host_email);
    
    // Determine if Q&A is enabled
    const hasQA = backendWebinar.settings?.question_and_answer?.enable || 
                  backendWebinar.settings?.question_answer || false;

    const baseData = {
      id: backendWebinar.id,
      title: backendWebinar.topic,
      description: this.formatDescription(backendWebinar.agenda),
      instructor: instructor,
      maxParticipants: 500, // Default from Zoom
      currentParticipants: 0,
      zoomLink: backendWebinar.join_url,
      topics: this.extractTopicsFromAgenda(backendWebinar.agenda, hasQA),
      category: this.determineCategory(backendWebinar.topic),
      prerequisites: [],
      materials: [],
      recordingAvailable: backendWebinar.settings?.auto_recording !== 'none',
      price: 0,
      hasQA: hasQA,
      timezone: backendWebinar.timezone,
      password: backendWebinar.password
    };

    if (isLive) {
      return {
        ...baseData,
        startTime: startDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
        }),
        endTime: new Date(startDate.getTime() + backendWebinar.duration * 60000)
          .toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          }),
        status: 'live' as const
      };
    } else {
      return {
        ...baseData,
        date: startDate.toISOString().split('T')[0],
        time: startDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
        }),
        duration: backendWebinar.duration,
        registrationRequired: true,
        level: 'Beginner' as const,
        status: 'scheduled' as const
      };
    }
  }

  /**
   * Check if webinar is currently live
   */
  private isWebinarLive(webinar: BackendWebinarResponse): boolean {
    const now = new Date();
    const startTime = new Date(webinar.start_time);
    const endTime = new Date(startTime.getTime() + webinar.duration * 60000);
    
    return now >= startTime && now <= endTime;
  }

  /**
   * Extract instructor name from host email
   */
  private extractInstructorName(hostEmail?: string): string {
    if (hostEmail === 'kundan1kishore@gmail.com') {
      return 'Kundan Kishore';
    }
    // Default fallback
    return 'Expert Instructor';
  }

  /**
   * Format description from agenda - use first line only
   */
  private formatDescription(agenda?: string): string {
    if (!agenda) {
      return 'Join this expert-led options trading session to enhance your trading skills and knowledge.';
    }

    // Use only the first line as description
    const firstLine = agenda
      .split('\n')[0]
      .trim();

    return firstLine || 'Join this expert-led options trading session.';
  }

  /**
   * Determine category from webinar topic
   */
  private determineCategory(topic: string): 'fundamentals' | 'strategies' | 'analysis' | 'psychology' | 'automation' {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('fundamental') || topicLower.includes('basic') || topicLower.includes('introduction')) {
      return 'fundamentals';
    } else if (topicLower.includes('strategy') || topicLower.includes('spread') || topicLower.includes('condor')) {
      return 'strategies';
    } else if (topicLower.includes('analysis') || topicLower.includes('market') || topicLower.includes('volatility')) {
      return 'analysis';
    } else if (topicLower.includes('psychology') || topicLower.includes('mindset') || topicLower.includes('discipline')) {
      return 'psychology';
    } else if (topicLower.includes('algorithm') || topicLower.includes('automation') || topicLower.includes('api')) {
      return 'automation';
    }
    
    return 'fundamentals'; // Default
  }

  /**
   * Extract topics from agenda text - use lines after the first line
   */
  private extractTopicsFromAgenda(agenda?: string, hasQA: boolean = false): string[] {
    const defaultTopics = [
      'Options Trading Concepts',
      'Market Analysis',
      'Trading Strategies',
      'Risk Management'
    ];

    if (hasQA) {
      defaultTopics.push('Live Q&A Session');
    }

    if (!agenda) {
      return defaultTopics;
    }

    // Split agenda by lines, skip first line (used for description), get remaining lines
    const allLines = agenda.split('\n');
    const topicLines = allLines
      .slice(1) // Skip first line (that's the description)
      .map(line => line.trim())
      .filter(line => line.length > 2) // Filter very short lines
      .slice(0, 5); // Limit to 5 topics

    // Add Q&A if enabled and not already present
    if (hasQA && !topicLines.some(topic => topic.toLowerCase().includes('q&a'))) {
      topicLines.push('Live Q&A Session');
    }

    // If no topics from agenda, use defaults
    return topicLines.length > 0 ? topicLines : defaultTopics;
  }

  /**
   * Get all webinars with detailed data and separate into live and upcoming
   */
  async getAllWebinars(): Promise<{
    liveWebinars: any[];
    upcomingWebinars: any[];
  }> {
    const webinarList = await this.getWebinarList();
    
    const liveWebinars: any[] = [];
    const upcomingWebinars: any[] = [];

    // Fetch detailed data for each webinar
    for (const webinar of webinarList) {
      try {
        const detailedWebinar = await this.getSingleWebinar(webinar.id);
        const transformed = this.transformToFrontendFormat(detailedWebinar);
        
        if (this.isWebinarLive(detailedWebinar)) {
          liveWebinars.push(transformed);
        } else {
          upcomingWebinars.push(transformed);
        }
      } catch (error) {
        console.error(`Failed to fetch details for webinar ${webinar.id}:`, error);
        // Fallback to basic data if detailed fetch fails
        const transformed = this.transformToFrontendFormat(webinar);
        upcomingWebinars.push(transformed);
      }
    }

    return { liveWebinars, upcomingWebinars };
  }
}

export const backendAPI = new BackendAPIService();
