"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  PlayIcon,
  ArrowRightIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import WebinarRegistrationModal from '@/components/WebinarRegistrationModal';

// ---- Zoom UMD loader (React 19-safe) ----------------------------------------

declare global {
  interface Window {
    ZoomMtgEmbedded?: any;
  }
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
async function loadZoomEmbeddedUMD() {
  if (typeof window === "undefined") {
    throw new Error("Zoom SDK can only be loaded on the client side");
  }
  if (ZoomMtgEmbeddedSingleton) return ZoomMtgEmbeddedSingleton;

  // Pin to a single version family; keep all three URLs in sync.
  const ZOOM_VER = "4.0.0"; // update if you target a newer SDK

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
}

// -----------------------------------------------------------------------------

type Webinar = {
  id: string;
  topic: string;
  start_time?: string;
  join_url?: string;
  duration?: number;
  status?: string;
};

type SignatureResponse = {
  signature: string;
  sdkKey: string;
  meetingNumber?: string;
  role?: number;
};

export default function WebinarsPage() {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<Webinar[]>([]);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loadingWebinars, setLoadingWebinars] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Zoom SDK refs
  const zoomClientRef = useRef<any | null>(null);
  const zoomRootRef = useRef<HTMLDivElement | null>(null);
  const joiningOnceRef = useRef(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load webinars
  useEffect(() => {
    if (!isClient) return;

    const loadWebinars = async () => {
      try {
        setLoadingWebinars(true);
        const response = await fetch("/api/zoom/webinar-list");

        if (!response.ok) {
          throw new Error(`Failed to load webinars: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (e: any) {
        console.error("Error loading webinars:", e);
        setError(
          e?.message?.includes('fetch') 
            ? "Unable to connect to webinar service. Please check your internet connection."
            : "Failed to load webinars. Please try again later."
        );
      } finally {
        setLoadingWebinars(false);
      }
    };

    loadWebinars();
  }, [isClient]);

  // Helper function to determine if webinar is live/ongoing
  const isWebinarLive = (webinar: Webinar) => {
    // Check status first - if Zoom says it's live/started, trust that
    if (webinar.status === 'started' || webinar.status === 'live') {
      return true;
    }
    
    // Time-based check - only consider webinars live if they're currently within their time window
    if (!webinar.start_time) return false;
    
    const now = new Date();
    const startTime = new Date(webinar.start_time);
    const scheduledEndTime = new Date(startTime.getTime() + (webinar.duration || 60) * 60 * 1000);
    
    // A webinar is live if:
    // 1. Current time is after start time
    // 2. Current time is before scheduled end time (no buffer for now)
    const isCurrentlyLive = now >= startTime && now < scheduledEndTime;
    
    return isCurrentlyLive;
  };

  // Helper function to determine if webinar is upcoming
  const isWebinarUpcoming = (webinar: Webinar) => {
    if (!webinar.start_time) return true;
    
    const now = new Date();
    const startTime = new Date(webinar.start_time);
    
    // A webinar is upcoming if it hasn't started yet (strict check)
    return now < startTime;
  };

  // Filter webinars
  const liveWebinars = items.filter(isWebinarLive);
  const upcomingWebinars = items.filter(isWebinarUpcoming);

  // Parse https://zoom.us/w/123...?pwd=XXXX or .../j/123...?pwd=XXXX
  const parseJoinUrl = useCallback((joinUrl?: string) => {
    if (!joinUrl) return null;
    try {
      const u = new URL(joinUrl);
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "w" || p === "j");
      const meetingNumber =
        idx !== -1 && parts[idx + 1] ? parts[idx + 1].replace(/\D/g, "") : "";
      const pwd = u.searchParams.get("pwd") || "";
      return { meetingNumber, password: pwd };
    } catch {
      return null;
    }
  }, []);

  const leaveMeeting = useCallback(async () => {
    try {
      if (zoomClientRef.current) {
        await zoomClientRef.current.leave();
        await zoomClientRef.current.destroy();
      }
    } catch (e) {
      console.warn("Error leaving meeting", e);
    } finally {
      zoomClientRef.current = null;
      joiningOnceRef.current = false;
      setOverlayOpen(false);
      setJoining(false);
    }
  }, []);

  const joinInsidePage = useCallback(
    async (webinar: Webinar) => {
      if (joiningOnceRef.current || !isClient) return;

      // Check if webinar is live and user needs authentication
      if (isWebinarLive(webinar) && !isAuthenticated) {
        setAuthModalOpen(true);
        return;
      }

      setError(null);

      const parsed = parseJoinUrl(webinar.join_url);
      if (!parsed?.meetingNumber) {
        setError("Invalid join URL for this webinar.");
        return;
      }

      setJoining(true);
      setOverlayOpen(true);
      joiningOnceRef.current = true;

      try {
        const { meetingNumber, password } = parsed;
        console.log("[DEBUG] Parsed join URL →", { meetingNumber, password });

        // 1) Get signature
        console.log("[DEBUG] Fetching signature for meeting:", meetingNumber);

        const sigRes = await fetch("/api/zoom/webinar-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meetingNumber,
            role: 0, // attendee
          }),
        });

        console.log("[DEBUG] Signature fetch response status:", sigRes.status);

        if (!sigRes.ok) {
          const text = await sigRes.text();
          console.error("[DEBUG] Signature fetch failed. Body:", text);
          throw new Error(`Failed to fetch signature: ${sigRes.status}`);
        }

        const json = await sigRes.json();
        console.log("[DEBUG] Signature response JSON:", json);

        const { signature, sdkKey } = json as SignatureResponse;

        if (!signature) throw new Error("Authentication failed: No signature received");
        if (!sdkKey) throw new Error("Configuration error: SDK Key not available");

        // 2) Load Zoom SDK (UMD)
        console.log("[DEBUG] Loading Zoom Embedded UMD…");
        const ZME = await loadZoomEmbeddedUMD();
        console.log("[DEBUG] Zoom Embedded loaded:", !!ZME);

        if (!ZME) throw new Error("Failed to load Zoom SDK");

        // 3) Create client
        const client = ZME.createClient();
        zoomClientRef.current = client;
        console.log("[DEBUG] Zoom client created");

        // 4) Init
        const zoomRoot = zoomRootRef.current;
        if (!zoomRoot) throw new Error("Zoom container not ready");
        console.log("[DEBUG] Zoom container ready:", zoomRoot);

        await client.init({
          language: "en-US",
          zoomAppRoot: zoomRoot,
          customize: {
            video: { isResizable: true, popper: { disableDraggable: false } },
            meetingInfo: [
              "topic",
              "host",
              "mn",
              "participant",
              "dc",
              "enctype",
            ],
            toolbar: { buttons: [] },
          },
        });
        console.log("[DEBUG] Zoom client initialized");

        // 5) Join
        console.log("[DEBUG] Attempting to join meeting:", meetingNumber);
        await client.join({
          signature,
          role: 1,
          sdkKey,
          meetingNumber,
          password,
          userName: user?.fullName || "Guest",
          userEmail: user?.email || "guest@example.com",
        });

        console.log("[DEBUG] Successfully joined meeting");
        setJoining(false);
      } catch (e: any) {
        console.error("Join error:", e);
        setError(e?.message || "Failed to join the webinar.");
        setJoining(false);
        setOverlayOpen(false);
        joiningOnceRef.current = false;
      }
    },
    [isClient, parseJoinUrl, isWebinarLive, isAuthenticated, user]
  );

  const handleRegisterForWebinar = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setRegistrationModalOpen(true);
  };

  // Function to generate calendar event data
  const generateCalendarEvent = (webinar: Webinar) => {
    if (!webinar.start_time) return;

    const startDate = new Date(webinar.start_time);
    const endDate = new Date(startDate.getTime() + (webinar.duration || 60) * 60 * 1000);
    
    // Format dates for ICS format (YYYYMMDDTHHMMSSZ)
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);
    
    // Create ICS content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The School of Options//Webinar//EN',
      'BEGIN:VEVENT',
      `UID:${webinar.id}@theschoolofoptions.com`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${webinar.topic}`,
      'DESCRIPTION:Options Trading Webinar by The School of Options\\n\\nJoin us for an interactive session on advanced options trading strategies and market analysis.\\n\\nRegister at: https://theschoolofoptions.com/webinar',
      'LOCATION:Online Webinar',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Webinar starts in 15 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create and download the ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `webinar-${webinar.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (zoomClientRef.current) {
        zoomClientRef.current.leave().catch(() => {});
        zoomClientRef.current.destroy().catch(() => {});
      }
    };
  }, []);

  // Don't render on server side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
            <div className="text-lg font-medium text-navy">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="block sm:inline">Live Webinars</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-accent mt-2 sm:mt-0">& Training Sessions</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 font-semibold">
            Join our interactive webinars to learn advanced options trading strategies, market analysis, and risk management techniques from experienced traders.
          </p>
          
          {/* Auth Status */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-2xl mx-auto">
            {authLoading ? (
              <div className="bg-gray-500/10 border border-gray-500/20 text-gray-300 px-6 py-3 rounded-lg font-semibold text-base w-full sm:w-auto text-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300 inline mr-2"></div>
                Loading...
              </div>
            ) : isAuthenticated ? (
              <div className="bg-accent/10 border border-accent/20 text-accent px-6 py-3 rounded-lg font-semibold text-base w-full sm:w-auto text-center">
                <UserIcon className="h-5 w-5 inline mr-2" />
                Welcome, {user?.fullName}
              </div>
            ) : (
              <div className="bg-accent/10 border border-accent/20 text-accent px-6 py-3 rounded-lg font-semibold text-base w-full sm:w-auto text-center">
                <VideoCameraIcon className="h-5 w-5 inline mr-2" />
                Sign in to join live sessions
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="rounded-lg border border-navy/30 bg-navy/5 p-4 text-sm text-navy">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-navy hover:text-navy/80 font-bold text-lg"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {loadingWebinars ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
              <div className="text-lg font-medium text-navy">Loading webinars...</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Live/Ongoing Webinars Section */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-accent rounded-full mr-3 animate-pulse"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy">Live Webinars</h2>
                </div>
                <p className="text-xl text-gray-600 font-semibold">
                  {isAuthenticated 
                    ? "Join ongoing sessions - Click to enter immediately" 
                    : "Sign in to join live sessions"}
                </p>
              </div>

              {liveWebinars.length === 0 ? (
                <div className="text-center py-8">
                  <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
                    <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-navy mb-2">No Live Sessions</h3>
                    <p className="text-gray-600 font-semibold text-sm">
                      There are no webinars currently live. Check back during scheduled session times or browse upcoming webinars below.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveWebinars.map((webinar) => (
                    <div key={webinar.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-accent/20 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 bg-accent rounded-full mr-3 animate-pulse"></div>
                        <span className="text-accent font-bold text-sm uppercase tracking-wide">LIVE NOW</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                        {webinar.topic}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600 text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {webinar.start_time ? new Date(webinar.start_time).toLocaleDateString() : "Today"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {webinar.start_time ? new Date(webinar.start_time).toLocaleTimeString() : "Now"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <UsersIcon className="h-4 w-4 mr-2" />
                          Interactive Session
                        </div>
                      </div>
                      
                      <button
                        onClick={() => joinInsidePage(webinar)}
                        disabled={joining}
                        className="w-full bg-accent hover:bg-accent/90 text-navy px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <PlayIcon className="h-5 w-5 mr-2" />
                        {joining ? "Joining..." : isAuthenticated ? "Join Live" : "Sign In to Join"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Webinars Section */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  Upcoming Webinars
                </h2>
                <p className="text-xl text-gray-600 font-semibold">
                  Register for future sessions and get notified when they go live
                </p>
              </div>

              {upcomingWebinars.length === 0 ? (
                <div className="text-center py-8">
                  <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6 shadow-lg">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-navy mb-2">No Upcoming Sessions</h3>
                    <p className="text-gray-600 font-semibold mb-4 text-sm">
                      We're planning new webinar sessions. Stay tuned for announcements about upcoming training sessions.
                    </p>
                    <a
                      href="https://rzp.io/rzp/theschoolofoptions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Join Mentorship Program
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingWebinars.map((webinar) => (
                    <div key={webinar.id} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-4 h-4 bg-accent rounded-full mr-3"></div>
                        <span className="text-accent font-bold text-sm uppercase tracking-wide">Upcoming</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                        {webinar.topic}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600 text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {webinar.start_time ? new Date(webinar.start_time).toLocaleDateString() : "TBD"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {webinar.start_time ? new Date(webinar.start_time).toLocaleTimeString() : "TBD"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <UsersIcon className="h-4 w-4 mr-2" />
                          {webinar.duration ? `${webinar.duration} minutes` : "Interactive Session"}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleRegisterForWebinar(webinar)}
                          className="flex-1 bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Register
                        </button>
                        
                        <button
                          onClick={() => generateCalendarEvent(webinar)}
                          disabled={!webinar.start_time}
                          className="bg-accent hover:bg-accent/90 text-navy px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          title={!webinar.start_time ? "Date/time not available" : "Add to calendar"}
                        >
                          <CalendarDaysIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want More Structured Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-6 font-semibold">
            Join our comprehensive 6-month mentorship program for personalized guidance and systematic options trading education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://rzp.io/rzp/theschoolofoptions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-lg"
            >
              Enroll in Mentorship Program
            </a>
            <a
              href="/newsletter"
              className="border border-accent text-accent hover:bg-accent hover:text-navy px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Get Free Newsletter
            </a>
          </div>
        </div>
      </section>

      {/* Zoom Meeting Overlay */}
      {overlayOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[95vw] h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-50">
              <button
                className="px-6 py-3 rounded-lg bg-navy hover:bg-navy/90 text-white font-semibold transition-colors shadow-lg"
                onClick={leaveMeeting}
                disabled={joining}
              >
                {joining ? "Connecting..." : "Leave Meeting"}
              </button>
            </div>

            {joining && (
              <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-40">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-6 border-navy"></div>
                  <div className="text-2xl font-bold text-navy mb-2">
                    Connecting to webinar...
                  </div>
                  <div className="text-lg text-gray-600">
                    Please wait a moment while we set up your session
                  </div>
                </div>
              </div>
            )}

            <div ref={zoomRootRef} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      <WebinarRegistrationModal 
        isOpen={registrationModalOpen} 
        onClose={() => setRegistrationModalOpen(false)} 
        webinar={selectedWebinar}
      />
    </div>
  );
}
