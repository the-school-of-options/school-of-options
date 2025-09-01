# Enhanced Zoom Webinar Integration Setup

This document explains the comprehensive Zoom webinar functionality in The School of Options website, featuring iframe-like embedded streaming and enhanced user experience.

## Prerequisites

1. A Zoom Pro, Business, or Enterprise account
2. Zoom Meeting SDK App created in Zoom Marketplace
3. Zoom API credentials (optional, for fetching real webinar data)

## Key Features

- **Embedded Webinar Streaming**: Full iframe-like experience without leaving your website
- **Enhanced Player Controls**: Fullscreen toggle, connection quality indicator, participant count
- **Mobile Optimized**: Responsive design that works seamlessly on all devices
- **Advanced Error Handling**: Comprehensive error recovery and user feedback
- **Real-time Status Updates**: Live connection monitoring and participant tracking

## Environment Variables Setup

Create or update your `.env.local` file with the following variables:

```env
# Zoom Meeting SDK Configuration (Required)
ZOOM_MEETING_SDK_KEY=your_meeting_sdk_key_here
ZOOM_MEETING_SDK_SECRET=your_meeting_sdk_secret_here

# Alternative naming (for backward compatibility)
ZOOM_SDK_KEY=your_meeting_sdk_key_here
ZOOM_SDK_SECRET=your_meeting_sdk_secret_here

# Zoom API Configuration (Optional - for real webinar data)
ZOOM_CLIENT_ID=your_zoom_client_id_here
ZOOM_CLIENT_SECRET=your_zoom_client_secret_here
ZOOM_ACCOUNT_ID=your_zoom_account_id_here
```

## Updated Architecture

### Components

1. **ZoomWebinarPlayer** (`/src/components/ZoomWebinarPlayer.tsx`)
   - Main webinar streaming component with iframe-like experience
   - Features fullscreen mode, error recovery, and real-time status updates
   - Optimized for both desktop and mobile devices

2. **Enhanced Webinar Page** (`/src/app/webinar/page.tsx`)
   - Improved webinar listing with live/upcoming categorization
   - Seamless integration with the new player component
   - Better authentication flow and error handling

3. **Direct Room Access** (`/src/app/webinar/room/page.tsx`)
   - Direct webinar room access via URL parameters
   - Support for meeting number and password parameters
   - Fallback error handling for invalid links

## How to Get Zoom Credentials

### Meeting SDK Credentials

1. Go to [Zoom Marketplace](https://marketplace.zoom.us/)
2. Sign in with your Zoom account
3. Click "Develop" → "Build App"
4. Choose "Meeting SDK" app type
5. Fill in the required information
6. Once created, you'll get:
   - SDK Key (use for `ZOOM_MEETING_SDK_KEY`)
   - SDK Secret (use for `ZOOM_MEETING_SDK_SECRET`)

### API Credentials (Optional)

1. In Zoom Marketplace, create a "Server-to-Server OAuth" app
2. Fill in the required information
3. Add required scopes: `webinar:read:admin`, `meeting:read:admin`
4. You'll get:
   - Account ID (use for `ZOOM_ACCOUNT_ID`)
   - Client ID (use for `ZOOM_CLIENT_ID`)
   - Client Secret (use for `ZOOM_CLIENT_SECRET`)

## Features

### Enhanced Implementation

- **Iframe-like Streaming**: Webinars stream directly within your website without redirects
- **Advanced Player Controls**: Fullscreen toggle, connection quality monitoring, participant count
- **Real-time Status Updates**: Live connection monitoring and error recovery
- **Mobile Optimized**: Responsive design with touch-friendly controls
- **Enhanced Error Handling**: Comprehensive error recovery with user-friendly messages
- **Direct Room Access**: Support for direct webinar room URLs with parameters

### API Endpoints

- `GET /api/zoom/webinar-list` - Fetches real webinars from Zoom API (requires API credentials)
- `POST /api/zoom/webinar-signature` - Generates JWT signature for joining webinars

## Usage

### Accessing Webinars

1. **Main Webinar Page**: Navigate to `/webinar` to see live and upcoming webinars
2. **Join Live Webinars**: Click "Join Live" to stream webinars directly in your browser
3. **Direct Room Access**: Use `/webinar/room?mn=MEETING_NUMBER&pwd=PASSWORD&title=WEBINAR_TITLE` for direct access
4. **Enhanced Controls**: Use fullscreen mode, monitor connection quality, and view participant count
5. **Mobile Experience**: Optimized touch controls and responsive design for mobile devices

### Customizing Webinar Data

To use real Zoom webinar data instead of mock data:

1. Update `/src/app/api/zoom/webinar-list/route.ts`
2. Implement Zoom API calls to fetch real webinar information
3. Add proper authentication using your Zoom API credentials

## Troubleshooting

### Common Issues

1. **"SDK Key not configured"**: Check your environment variables
2. **"Failed to load Zoom SDK"**: Network issue or CDN problem
3. **"Authentication failed"**: Invalid meeting number or SDK credentials

### Debug Mode

The application includes extensive console logging. Open browser developer tools to see detailed debug information.

## Security Notes

- Never expose SDK secrets in client-side code
- JWT signatures are generated server-side for security
- Environment variables are only accessible on the server

## Browser Compatibility

- Chrome 58+
- Firefox 55+
- Safari 11+
- Edge 79+

## Support

For Zoom-specific issues, refer to:
- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/)
- [Zoom API Documentation](https://developers.zoom.us/docs/api/)
