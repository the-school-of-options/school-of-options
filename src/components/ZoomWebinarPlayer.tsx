"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { 
  ExclamationTriangleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import axios from "axios";

// Zoom SDK types
declare global {
  interface Window {
    ZoomMtgEmbedded?: any;
    ZoomMtg?: any;
    _?: any; // Lodash
    React?: any;
    ReactDOM?: any;
    Redux?: any;
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
  connectionQuality: 'excellent' | 'good' | 'poor' | 'unknown';
  hasError: boolean;
  errorMessage: string;
}

// Keep a singleton so we don't reload scripts on every join
let ZoomMtgSingleton: any = null;

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
 * Loads Zoom Embedded Meeting SDK with better full-screen configuration
 */
async function loadZoomEmbeddedSDK() {
  if (typeof window === "undefined") {
    throw new Error("Zoom SDK can only be loaded on the client side");
  }
  if (ZoomMtgSingleton) return ZoomMtgSingleton;

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

    ZoomMtgSingleton = window.ZoomMtgEmbedded;
    return ZoomMtgSingleton;
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
    connectionQuality: 'unknown',
    hasError: false,
    errorMessage: ''
  });

  const zoomClientRef = useRef<any | null>(null);
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);
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
      console.log('[DEBUG] Fetching signature for meeting:', meetingNumber);
      
      const response = await axios.post('https://api.theschoolofoptions.com/api/v1/zoom/webinar-signature',{
        meetingNumber,
      })

      console.log('[DEBUG] Signature fetch response status:', response.status);

      if (response.status !== 200) {
        const text = await response.data;
        console.error('[DEBUG] Signature fetch failed. Body:', text);
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.data
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

  // Initialize and join webinar with embedded SDK optimized for full screen
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

      // Load Zoom Embedded SDK
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

      // Initialize the client within the modal container
      console.log('[DEBUG] Initializing Zoom client...');
      const zoomRoot = zoomContainerRef.current;
      if (!zoomRoot) throw new Error("Zoom container not ready");
      
      // Use the full container dimensions (modal is already 80% of viewport)
      const containerRect = zoomRoot.getBoundingClientRect();
      const videoWidth = Math.floor(containerRect.width);
      const videoHeight = Math.floor(containerRect.height);
      
      await client.init({
        language: 'en-US',
        zoomAppRoot: zoomRoot,
        patchJsMedia: true,
        customize: {
          video: {
            isResizable: true,
            viewSizes: {
              default: {
                width: videoWidth,
                height: videoHeight
              }
            }
          },
          meetingInfo: ['topic', 'host', 'mn', 'participant'],
          toolbar: { buttons: [] }
        }
      });
      console.log('[DEBUG] Zoom client initialized');

      // Join the webinar
      const joinParams = {
        signature: authData.signature,
        sdkKey: authData.sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
        password: password,
      };
      
      console.log('[DEBUG] Joining webinar...');
      await client.join(joinParams);

      console.log('[DEBUG] Successfully joined webinar');
      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: true,
        connectionQuality: 'excellent'
      }));

    } catch (error: any) {
      console.error('Webinar initialization failed:', error);
      
      let errorMessage = 'Failed to join webinar. Please try again.';
      
      if (error.message) {
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





  // Add CSS for modal container approach
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Remove scroll bars and ensure clean layout */
      body {
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Style for the modal container */
      .zoom-modal-container {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 80vw !important;
        height: 80vh !important;
        background: #000 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        z-index: 1000 !important;
      }
      
      /* Zoom content should fill the modal container */
      .zoom-modal-container .zm-video-container,
      .zoom-modal-container [class*="video-container"],
      .zoom-modal-container [class*="zm-video"] {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        transform: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 0 !important;
      }
      
      /* Video elements should fill container */
      .zoom-modal-container video,
      .zoom-modal-container canvas {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        object-fit: contain !important;
        object-position: center !important;
      }
      
      /* Any nested containers */
      .zoom-modal-container > div,
      .zoom-modal-container [class*="canvas-container"] {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
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
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      {/* Loading State */}
      {state.isConnecting && (
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold mb-2">Connecting to webinar...</h3>
          <p className="text-gray-300">Please wait while we set up your session</p>
          <button
            onClick={leaveWebinar}
            className="mt-6 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Error State */}
      {state.hasError && (
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
      )}

      {/* Modal Container for Zoom Player */}
      <div 
        ref={zoomContainerRef}
        className="zoom-modal-container"
        style={{
          width: '80vw',
          height: '80vh',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#000',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}
      />

      {/* Close button for when connected */}
      {state.isConnected && (
        <button
          onClick={leaveWebinar}
          className="fixed top-4 right-4 z-[1100] p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors shadow-lg"
          title="Leave webinar"
        >
          ✕
        </button>
      )}
    </div>
  );
}
