"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    ZoomMtgEmbedded?: any;
  }
}

let ZoomMtgEmbeddedSingleton: any = null;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
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

async function loadZoomEmbeddedUMD() {
  if (typeof window === "undefined") {
    throw new Error("Zoom SDK can only be loaded on the client side");
  }
  if (ZoomMtgEmbeddedSingleton) return ZoomMtgEmbeddedSingleton;

  const ZOOM_VER = "4.0.0";
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

type Webinar = {
  id: string;
  topic: string;
  start_time?: string;
  join_url?: string;
};

type SignatureResponse = {
  signature: string;
  sdkKey?: string;
};

export default function Webinars() {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<Webinar[]>([]);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loadingWebinars, setLoadingWebinars] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const zoomClientRef = useRef<any | null>(null);
  const zoomRootRef = useRef<HTMLDivElement | null>(null);
  const joiningOnceRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
    const href = `https://source.zoom.us/4.0.0/css/bootstrap.css`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.crossOrigin = "anonymous";
    link.dataset.zoomCss = "true";
    document.head.appendChild(link);

    return () => {
      try {
        document.head.removeChild(link);
      } catch {}
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadWebinars = async () => {
      try {
        setLoadingWebinars(true);
        // Mock data for demo purposes since localhost endpoint won't work
        const mockWebinars: Webinar[] = [
          {
            id: "1",
            topic: "Marketing Strategies for 2025",
            start_time: "2025-09-01T14:00:00Z",
            join_url: "https://zoom.us/j/123456789?pwd=abcd1234",
          },
          {
            id: "2",
            topic: "AI in Business: Future Trends",
            start_time: "2025-09-02T16:00:00Z",
            join_url: "https://zoom.us/j/987654321?pwd=efgh5678",
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItems(mockWebinars);
      } catch (e) {
        console.error("Error loading webinars:", e);
        setError("Failed to load webinars.");
      } finally {
        setLoadingWebinars(false);
      }
    };

    loadWebinars();
  }, [isClient]);

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

  const enterFullScreen = useCallback(async () => {
    try {
      const zoomContainer = zoomRootRef.current?.closest(".zoom-overlay");
      if (zoomContainer && zoomContainer.requestFullscreen) {
        await zoomContainer.requestFullscreen();
      }
    } catch (e) {
      console.warn("Could not enter fullscreen:", e);
    }
  }, []);

  const exitFullScreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn("Could not exit fullscreen:", e);
    }
  }, []);

  const leaveMeeting = useCallback(async () => {
    try {
      // Exit fullscreen first if active
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

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
      setIsFullScreen(false);
    }
  }, []);

  const joinInsidePage = useCallback(
    async (webinar: Webinar) => {
      if (joiningOnceRef.current || !isClient) return;

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

        // Mock signature response for demo
        const signature = "mock_signature_" + Date.now();
        const sdkKey = "9BnsBTacTiSBf1vE4pX9A";

        console.log("[DEBUG] Using sdkKey:", sdkKey);
        console.log(
          "[DEBUG] Using signature (first 50 chars):",
          signature?.slice(0, 50)
        );

        console.log("[DEBUG] Loading Zoom Embedded UMD…");
        const ZME = await loadZoomEmbeddedUMD();
        console.log("[DEBUG] Zoom Embedded loaded:", !!ZME);

        if (!ZME) throw new Error("Failed to load Zoom SDK");

        const client = ZME.createClient();
        zoomClientRef.current = client;
        console.log("[DEBUG] Zoom client created");

        const zoomRoot = zoomRootRef.current;
        if (!zoomRoot) throw new Error("Zoom container not ready");
        console.log("[DEBUG] Zoom container ready:", zoomRoot);

        await client.init({
          language: "en-US",
          zoomAppRoot: zoomRoot,
          customize: {
            video: {
              isResizable: true,
              popper: { disableDraggable: false },
              viewSizes: {
                default: {
                  width: "100%",
                  height: "100%",
                },
              },
            },
            meetingInfo: [
              "topic",
              "host",
              "mn",
              "participant",
              "dc",
              "enctype",
            ],
            toolbar: {
              buttons: [
                {
                  text: "Fullscreen",
                  className: "CustomButton",
                  onClick: () => {
                    if (isFullScreen) {
                      exitFullScreen();
                    } else {
                      enterFullScreen();
                    }
                  },
                },
              ],
            },
          },
        });
        console.log("[DEBUG] Zoom client initialized");

        console.log("[DEBUG] Attempting to join meeting:", meetingNumber);
        await client.join({
          signature,
          role: 1,
          sdkKey,
          meetingNumber,
          password,
          userName: "Guest",
          userEmail: "nandeeshbasavarajaiah1@gmail.com",
        });

        console.log("[DEBUG] Successfully joined meeting");
        setJoining(false);

        // Auto-enter fullscreen after joining
        setTimeout(() => {
          enterFullScreen();
        }, 1000);
      } catch (e: any) {
        console.error("Join error:", e);
        setError(e?.message || "Failed to join the webinar.");
        setJoining(false);
        setOverlayOpen(false);
        joiningOnceRef.current = false;
      }
    },
    [isClient, parseJoinUrl, isFullScreen, enterFullScreen, exitFullScreen]
  );

  useEffect(() => {
    return () => {
      if (zoomClientRef.current) {
        zoomClientRef.current.leave().catch(() => {});
        zoomClientRef.current.destroy().catch(() => {});
      }
    };
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        exitFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, exitFullScreen]);

  if (!isClient) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center h-64">
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upcoming Webinars</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {loadingWebinars ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-600">Loading webinars...</div>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.length === 0 ? (
            <li className="text-gray-600 text-center py-8">
              No webinars available at the moment.
            </li>
          ) : (
            items.map((w) => (
              <li key={w.id} className="border rounded p-4 hover:bg-gray-50">
                <div className="font-medium">{w.topic}</div>
                <div className="text-sm opacity-70 mb-2">
                  {w.start_time
                    ? new Date(w.start_time).toLocaleString()
                    : "TBD"}
                </div>

                <button
                  type="button"
                  className="text-blue-600 underline hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={joining}
                  onClick={() => joinInsidePage(w)}
                >
                  {joining ? "Joining…" : "Join Webinar"}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {overlayOpen && (
        <div className="zoom-overlay fixed inset-0 bg-black z-50 flex flex-col">
          {/* Control Bar - Only visible when not in browser fullscreen */}
          {!isFullScreen && (
            <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
              <div className="flex justify-between items-center p-4">
                <div className="text-white text-sm">
                  Press F11 or click Fullscreen for best experience
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                    onClick={enterFullScreen}
                    disabled={joining}
                  >
                    Fullscreen
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                    onClick={leaveMeeting}
                    disabled={joining}
                  >
                    {joining ? "Connecting..." : "Leave Meeting"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fullscreen Exit Button - Only visible in browser fullscreen */}
          {isFullScreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-800/80 hover:bg-gray-700/80 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                onClick={exitFullScreen}
              >
                Exit Fullscreen
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600/80 hover:bg-red-700/80 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                onClick={leaveMeeting}
                disabled={joining}
              >
                Leave Meeting
              </button>
            </div>
          )}

          {/* Loading Overlay */}
          {joining && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-40">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4 border-blue-500"></div>
                <div className="text-xl font-medium text-white">
                  Connecting to webinar...
                </div>
                <div className="text-sm text-gray-300 mt-2">
                  Please wait a moment
                </div>
              </div>
            </div>
          )}

          {/* Zoom Container - Full Screen */}
          <div
            ref={zoomRootRef}
            className={`w-full h-full ${isFullScreen ? "pt-0" : "pt-16"}`}
            style={{
              width: "100vw",
              height: "100vh",
              position: "relative",
            }}
          />
        </div>
      )}
    </main>
  );
}
