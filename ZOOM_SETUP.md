# Zoom Webinar Integration Setup

This document explains how to set up the Zoom webinar functionality in The School of Options website.

## Prerequisites

1. A Zoom Pro, Business, or Enterprise account
2. Zoom Meeting SDK App created in Zoom Marketplace
3. Zoom API credentials (optional, for fetching real webinar data)

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

### Current Implementation

- **Webinar List**: Fetches real webinar data from Zoom API (shows "No webinars found" when none exist)
- **Join Webinar**: Allows users to join webinars using Zoom Meeting SDK
- **Full-Screen Experience**: Webinars open in a full-screen overlay
- **Mobile Responsive**: Works on desktop and mobile devices

### API Endpoints

- `GET /api/zoom/webinar-list` - Fetches real webinars from Zoom API (requires API credentials)
- `POST /api/zoom/webinar-signature` - Generates JWT signature for joining webinars

## Usage

### Accessing Webinars

1. Navigate to `/webinar` to see the list of available webinars
2. Click "Join Webinar" to join a webinar in an overlay
3. Use `/webinar/room?mn=MEETING_NUMBER&pwd=PASSWORD` for direct access

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
