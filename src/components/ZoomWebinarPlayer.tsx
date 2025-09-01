"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { 
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  Cog6ToothIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
  HandRaisedIcon,
  ExclamationTriangleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

// Zoom SDK types
declare global {
  interface Window {
    ZoomMtgEmbedded?: any;
  }
}

interface ZoomWebinarPlayerProps {
  webinarId: string;
  webinarTitle: string;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onError: (error: string) => void;
}

interface WebinarState {
  isConnecting: boolean;
  isConnected: boolean;
  isFullscreen: boolean;
  audioMuted: boolean;
  videoMuted: boolean;
  participantCount: number;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'unknown';
  hasError: boolean;
  errorMessage: string;
}

// Keep a singleton so we don't reload scripts on every join
let ZoomMtgEmbeddedSingleton: any = null;

/**
 * Dynamically load a script exactly once.
 */
function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already added?
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error(`Failed to load ${src}`))
      );
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", () => {
      s.setAttribute("data-loaded", "true");
      resolve();
    });
    s.addEventListener("error", () =>
      reject(new Error(`Failed to load ${src}`))
    );
    document.head.appendChild(s);
  });
}

/**
 * Loads Zoom Embedded Meeting SDK (UMD) + its vendor React(18)/ReactDOM(18) that the SDK expects.
 * This avoids the ESM path that touches removed React 19 internals.
 */
async function loadZoomEmbeddedSDK() {
  if (typeof window === "undefined") {
    throw new Error("Zoom SDK can only be loaded on the client side");
  }
  if (ZoomMtgEmbeddedSingleton) return ZoomMtgEmbeddedSingleton;

  try {
    // Pin to a single version family; keep all three URLs in sync.
    const ZOOM_VER = "3.8.10";

    // The embedded SDK expects its own vendor React/DOM (scoped to its bundle),
    // not your app's React 19. Load their copies first.
    const vendorReact = `https://source.zoom.us/${ZOOM_VER}/lib/vendor/react.min.js`;
    const vendorReactDOM = `https://source.zoom.us/${ZOOM_VER}/lib/vendor/react-dom.min.js`;
    const embeddedSDK = `https://source.zoom.us/${ZOOM_VER}/zoom-meeting-embedded-${ZOOM_VER}.min.js`;

    await loadScriptOnce(vendorReact);
    await loadScriptOnce(vendorReactDOM);
    await loadScriptOnce(embeddedSDK);

    if (!window.ZoomMtgEmbedded) {
      throw new Error("Zoom UMD not available on window");
    }

    ZoomMtgEmbeddedSingleton = window.ZoomMtgEmbedded;
    return ZoomMtgEmbeddedSingleton;
  } catch (error) {
    console.error("Failed to load Zoom SDK:", error);
    throw new Error("Unable to load Zoom webinar player. Please check your internet connection and try again.");
  }
}

export default function ZoomWebinarPlayer({
  webinarId,
  webinarTitle,
  userName,
  userEmail,
  onClose,
  onError
}: ZoomWebinarPlayerProps) {
  const [state, setState] = useState<WebinarState>({
    isConnecting: true,
    isConnected: false,
    isFullscreen: false,
    audioMuted: true,
    videoMuted: true,
    participantCount: 0,
    connectionQuality: 'unknown',
    hasError: false,
    errorMessage: ''
  });

  const zoomClientRef = useRef<any | null>(null);
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const initializationRef = useRef(false);

  // Parse webinar join URL to get meeting number and password
  const parseWebinarUrl = useCallback((webinarId: string) => {
    console.log('[DEBUG] Parsing webinar ID:', webinarId);
    
    // If it's already a meeting number, return it
    if (/^\d+$/.test(webinarId)) {
      console.log('[DEBUG] Direct meeting number detected:', webinarId);
      return { meetingNumber: webinarId, password: '' };
    }
    
    // If it's a URL, parse it
    try {
      const url = new URL(webinarId);
      console.log('[DEBUG] Parsing URL:', url.href);
      
      const pathParts = url.pathname.split('/').filter(Boolean);
      console.log('[DEBUG] URL path parts:', pathParts);
      
      // Look for meeting number in different URL patterns
      let meetingNumber = '';
      
      // Pattern 1: /w/123456789 or /j/123456789
      const wIndex = pathParts.findIndex(p => p === 'w' || p === 'j');
      if (wIndex !== -1 && pathParts[wIndex + 1]) {
        meetingNumber = pathParts[wIndex + 1].replace(/\D/g, '');
      }
      
      // Pattern 2: Last part of path contains numbers
      if (!meetingNumber) {
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart) {
          meetingNumber = lastPart.replace(/\D/g, '');
        }
      }
      
      // Fallback: extract all numbers from the URL
      if (!meetingNumber) {
        const allNumbers = webinarId.match(/\d+/g);
        if (allNumbers && allNumbers.length > 0) {
          // Take the longest number sequence (likely the meeting ID)
          meetingNumber = allNumbers.reduce((a, b) => a.length > b.length ? a : b);
        }
      }
      
      let password = url.searchParams.get('pwd') || url.searchParams.get('password') || '';
      
      // URL decode the password if needed
      if (password) {
        try {
          const decodedPassword = decodeURIComponent(password);
          console.log('[DEBUG] Password decoding:', {
            original: password,
            decoded: decodedPassword,
            needsDecoding: password !== decodedPassword
          });
          password = decodedPassword;
        } catch (e) {
          console.log('[DEBUG] Password decode failed, using original:', password);
        }
      }
      
      console.log('[DEBUG] Extracted meeting number:', meetingNumber, 'password:', password ? '[REDACTED]' : 'none');
      
      return { meetingNumber: meetingNumber || webinarId, password };
    } catch (error) {
      console.log('[DEBUG] URL parsing failed, treating as direct meeting number:', webinarId);
      return { meetingNumber: webinarId, password: '' };
    }
  }, []);

  // Get signature for webinar
  const getWebinarSignature = useCallback(async (meetingNumber: string, role: number = 0) => {
    try {
      console.log('[DEBUG] Fetching signature for meeting:', meetingNumber, 'with role:', role);
      
      const response = await fetch('/api/zoom/webinar-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber,
          role // Allow different roles
        })
      });

      console.log('[DEBUG] Signature fetch response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('[DEBUG] Signature fetch failed. Body:', text);
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('[DEBUG] Signature response JSON:', data);
      
      if (!data.signature || !data.sdkKey) {
        throw new Error('Invalid authentication response');
      }

      return data;
    } catch (error) {
      console.error('Signature generation failed:', error);
      throw new Error('Unable to authenticate for webinar access. Please try again.');
    }
  }, []);

  // Initialize and join webinar
  const initializeWebinar = useCallback(async () => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    try {
      setState(prev => ({ ...prev, isConnecting: true, hasError: false }));

      // Parse webinar details
      const { meetingNumber, password } = parseWebinarUrl(webinarId);
      console.log('Joining webinar:', { meetingNumber, password: password ? '[REDACTED]' : 'none' });
      
      // Validate required parameters for webinars
      if (!meetingNumber) {
        throw new Error('Meeting number is required to join the webinar');
      }
      if (!userEmail) {
        throw new Error('Email address is required to join webinars');
      }
      if (!userName) {
        throw new Error('User name is required to join the webinar');
      }

      // Load Zoom SDK
      console.log('[DEBUG] Loading Zoom Embedded SDK...');
      const ZoomMtgEmbedded = await loadZoomEmbeddedSDK();
      console.log('[DEBUG] Zoom Embedded loaded:', !!ZoomMtgEmbedded);
      
      // Get authentication signature
      const authData = await getWebinarSignature(meetingNumber);

      // Create Zoom client
      console.log('[DEBUG] Creating Zoom client...');
      const client = ZoomMtgEmbedded.createClient();
      zoomClientRef.current = client;
      console.log('[DEBUG] Zoom client created');

      // Initialize the client first, then set up event listeners
      console.log('[DEBUG] Initializing Zoom client...');
      const zoomRoot = zoomContainerRef.current;
      if (!zoomRoot) throw new Error("Zoom container not ready");
      console.log('[DEBUG] Zoom container ready:', zoomRoot);

      await client.init({
        language: 'en-US',
        zoomAppRoot: zoomRoot,
        patchJsMedia: true, // Important for webinar compatibility
        customize: {
          video: {
            isResizable: true,
            popper: {
              disableDraggable: false
            }
          },
          meetingInfo: [
            'topic',
            'host',
            'mn',
            'participant',
            'dc',
            'enctype'
          ],
          toolbar: { buttons: [] }
        }
      });
      console.log('[DEBUG] Zoom client initialized');

      // Set up event listeners after initialization
      try {
        client.on('connection-change', (payload: any) => {
          console.log('Connection status:', payload);
          if (payload && payload.state) {
            // Only update connection quality for successful connections
            // Ignore intermediate failure states during connection process
            if (payload.state === 'Connected') {
              setState(prev => ({
                ...prev,
                connectionQuality: 'excellent',
                isConnected: true,
                isConnecting: false,
                hasError: false
              }));
            } else if (payload.state === 'Fail' && payload.reason && !payload.reason.includes('Meeting Passcode wrong')) {
              // Only treat as error if it's not a password retry scenario
              setState(prev => ({
                ...prev,
                connectionQuality: 'poor'
              }));
            }
          }
        });
        console.log('[DEBUG] Event listeners set up');
      } catch (e) {
        console.warn('Could not set up event listeners:', e);
      }

      // Join the webinar
      console.log('[DEBUG] Attempting to join meeting:', meetingNumber);
      
      // Join webinar using the correct parameters for webinars
      // According to Zoom docs, userEmail is mandatory for webinars
      const joinParams = {
        signature: authData.signature,
        sdkKey: authData.sdkKey, // Required for embedded SDK
        meetingNumber: meetingNumber, // Ensure this matches the signature
        userName: userName,
        userEmail: userEmail, // Mandatory for webinars
        password: password, // Use 'password' parameter (not 'passWord')
      };
      
      console.log('[DEBUG] Join parameters:', {
        ...joinParams,
        signature: '[REDACTED]',
        password: password ? '[REDACTED]' : 'none',
        passwordLength: password ? password.length : 0,
        passwordPreview: password ? password.substring(0, 3) + '...' : 'none',
        // fullPassword: password // Removed for security
      });
      
      // Join the webinar with fallback strategies
      try {
        await client.join(joinParams);
      } catch (joinError: any) {
        console.log('[DEBUG] Initial join failed:', joinError);
        
        if (joinError.errorCode === 3004 && password) {
          console.log('[DEBUG] Password error, trying with passWord parameter...');
          
          // Try with 'passWord' as fallback (some Zoom versions use this)
          const joinParamsAltPassword = {
            ...joinParams,
            passWord: password,
          };
          delete (joinParamsAltPassword as any).password;
          
          try {
            await client.join(joinParamsAltPassword);
          } catch (altPasswordError: any) {
            if (altPasswordError.errorCode === 3004) {
              console.log('[DEBUG] Both password formats failed, trying without password...');
              const joinParamsNoPassword = {
                signature: authData.signature,
                sdkKey: authData.sdkKey,
                meetingNumber: meetingNumber,
                userName: userName,
                userEmail: userEmail,
              };
              await client.join(joinParamsNoPassword);
            } else {
              throw altPasswordError;
            }
          }
        } else if (joinError.errorCode === 3008) {
          console.log('[DEBUG] Meeting not started error. Trying with webinar-specific parameters...');
          
          // Get a new signature for panelist role (role 1)
          const panelistAuthData = await getWebinarSignature(meetingNumber, 1);
          
          const webinarJoinParams = {
            signature: panelistAuthData.signature,
            sdkKey: panelistAuthData.sdkKey,
            meetingNumber: meetingNumber,
            userName: userName,
            userEmail: userEmail,
            password: password,
            role: 1, // Try as panelist instead of attendee
          };
          
          console.log('[DEBUG] Trying webinar join as panelist with role 1 signature...');
          await client.join(webinarJoinParams);
        } else {
          throw joinError;
        }
      }

      console.log('[DEBUG] Successfully joined webinar');
      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: true
      }));

    } catch (error: any) {
      console.error('Webinar initialization failed:', error);
      
      let errorMessage = 'Failed to join webinar. Please try again.';
      
      // Handle specific Zoom error codes
      if (error.errorCode) {
        switch (error.errorCode) {
          case 3706:
            errorMessage = 'The webinar meeting number is invalid or the webinar is not currently active. Please check the meeting number and try again.';
            break;
          case 3707:
            errorMessage = 'The webinar password is incorrect. Please check the password and try again.';
            break;
          case 3708:
            errorMessage = 'The webinar has not started yet or has already ended.';
            break;
          case 3709:
            errorMessage = 'You are not authorized to join this webinar.';
            break;
          default:
            errorMessage = `Webinar join failed: ${error.reason || error.message || 'Unknown error'}`;
        }
      } else if (error.reason) {
        errorMessage = `Connection failed: ${error.reason}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setState(prev => ({
        ...prev,
        isConnecting: false,
        hasError: true,
        errorMessage
      }));
      
      onError(errorMessage);
    }
  }, [webinarId, userName, userEmail, parseWebinarUrl, getWebinarSignature, onError]);

  // Leave webinar
  const leaveWebinar = useCallback(async () => {
    try {
      if (zoomClientRef.current) {
        // Check if methods exist before calling them
        if (typeof zoomClientRef.current.leave === 'function') {
          await zoomClientRef.current.leave();
        }
        if (typeof zoomClientRef.current.destroy === 'function') {
          await zoomClientRef.current.destroy();
        }
      }
    } catch (error) {
      console.warn('Error leaving webinar:', error);
    } finally {
      zoomClientRef.current = null;
      initializationRef.current = false;
      onClose();
    }
  }, [onClose]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => {
        setState(prev => ({ ...prev, isFullscreen: true }));
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setState(prev => ({ ...prev, isFullscreen: false }));
      }).catch(console.error);
    }
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setState(prev => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize webinar on mount
  useEffect(() => {
    initializeWebinar();
    
    return () => {
      if (zoomClientRef.current) {
        try {
          if (typeof zoomClientRef.current.leave === 'function') {
            zoomClientRef.current.leave().catch(console.error);
          }
          if (typeof zoomClientRef.current.destroy === 'function') {
            zoomClientRef.current.destroy().catch(console.error);
          }
        } catch (error) {
          console.warn('Error in cleanup:', error);
        }
      }
    };
  }, [initializeWebinar]);

  // Connection quality indicator
  const getConnectionIcon = () => {
    switch (state.connectionQuality) {
      case 'excellent':
        return <SignalIcon className="h-4 w-4 text-green-500" />;
      case 'good':
        return <SignalIcon className="h-4 w-4 text-yellow-500" />;
      case 'poor':
        return <SignalIcon className="h-4 w-4 text-red-500" />;
      default:
        return <SignalIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className={`fixed inset-0 bg-black z-50 flex flex-col ${
        state.isFullscreen ? 'p-0' : 'p-1 sm:p-2'
      }`}
    >
      {/* Header Controls */}
      <div className={`flex items-center justify-between bg-gray-900/90 text-white p-3 rounded-t-lg ${
        state.isFullscreen ? 'absolute top-0 left-0 right-0 z-10' : ''
      }`}>
        <div className="flex items-center space-x-4">
          <h3 className="font-semibold text-sm sm:text-base truncate max-w-xs sm:max-w-md">
            {webinarTitle}
          </h3>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
            {getConnectionIcon()}
            <span className="hidden sm:inline">
              {state.connectionQuality === 'unknown' ? 'Connecting...' : state.connectionQuality}
            </span>
          </div>
          {state.participantCount > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-300">
              <UsersIcon className="h-4 w-4" />
              <span>{state.participantCount}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={state.isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {state.isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={leaveWebinar}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
            title="Leave webinar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Webinar Container */}
      <div className={`flex-1 bg-gray-100 relative ${
        state.isFullscreen ? 'mt-16' : 'rounded-lg mt-2'
      } overflow-hidden`}>
        
        {/* Loading State */}
        {state.isConnecting && (
          <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Connecting to webinar...</h3>
              <p className="text-gray-300">Please wait while we set up your session</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.hasError && (
          <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-20">
            <div className="text-center text-white max-w-md mx-auto p-6">
              <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connection Failed</h3>
              <p className="text-gray-300 mb-6">{state.errorMessage}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setState(prev => ({ ...prev, hasError: false }));
                    initializationRef.current = false;
                    initializeWebinar();
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={leaveWebinar}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Zoom SDK Container */}
        <div 
          ref={zoomContainerRef}
          className="w-full h-full"
          style={{ 
            minHeight: state.isFullscreen ? '100vh' : '70vh',
            height: state.isFullscreen ? '100vh' : '70vh'
          }}
        />
      </div>

      {/* Bottom Controls (when not in fullscreen) */}
      {!state.isFullscreen && state.isConnected && (
        <div className="bg-gray-900/90 text-white p-3 rounded-b-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">
              Webinar Controls
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Settings"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
            
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Chat"
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
            </button>
            
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Raise hand"
            >
              <HandRaisedIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
