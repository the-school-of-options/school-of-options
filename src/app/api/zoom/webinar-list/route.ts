import { NextResponse } from 'next/server';

// Zoom API base URL
const ZOOM_API_BASE = 'https://api.zoom.us/v2';

// Generate OAuth token for Zoom API
async function getZoomAccessToken() {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Missing Zoom API credentials. Please set ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, and ZOOM_CLIENT_SECRET in your environment variables.');
  }

  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get Zoom access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch webinars from Zoom API
async function fetchZoomWebinars(accessToken: string) {
  const webinarsUrl = `${ZOOM_API_BASE}/users/me/webinars`;
  
  const response = await fetch(webinarsUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch webinars: ${response.status}`);
  }

  const data = await response.json();
  return data.webinars || [];
}

export async function GET() {
  try {
    // Check if Zoom API credentials are configured
    const hasCredentials = process.env.ZOOM_ACCOUNT_ID && 
                          process.env.ZOOM_CLIENT_ID && 
                          process.env.ZOOM_CLIENT_SECRET;

    if (!hasCredentials) {
      console.log('Zoom API credentials not configured. Returning empty webinar list.');
      return NextResponse.json([]);
    }

    // Get access token and fetch webinars
    const accessToken = await getZoomAccessToken();
    const webinars = await fetchZoomWebinars(accessToken);

    // Transform Zoom webinar data to our format
    const transformedWebinars = webinars.map((webinar: any) => {
      console.log('Raw Zoom webinar data:', webinar);
      return {
        id: webinar.id.toString(),
        topic: webinar.topic,
        start_time: webinar.start_time,
        join_url: webinar.join_url,
        duration: webinar.duration,
        status: webinar.status || 'waiting'
      };
    });

    // Return all webinars (let frontend decide which are live vs upcoming)
    console.log('Returning webinars:', transformedWebinars);
    return NextResponse.json(transformedWebinars);

  } catch (error) {
    console.error('Error fetching webinars:', error);
    
    // Return empty array instead of error to show "No webinars found"
    // This prevents showing error messages when credentials are missing
    return NextResponse.json([]);
  }
}

// Note: POST method for creating webinars can be added here if needed in the future
