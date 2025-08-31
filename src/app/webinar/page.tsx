// app/webinars/page.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

  // Zoom SDK refs
  const zoomClientRef = useRef<any | null>(null);
  const zoomRootRef = useRef<HTMLDivElement | null>(null);
  const joiningOnceRef = useRef(false);

  // Ensure client-side rendering
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

  // Load webinars
  useEffect(() => {
    if (!isClient) return;

    const loadWebinars = async () => {
      try {
        setLoadingWebinars(true);
        const response = await fetch(
          "http://localhost:8000/api/v1/zoom/webinar-list"
        );

        if (!response.ok) {
          throw new Error(`Failed to load webinars: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (e) {
        console.error("Error loading webinars:", e);
        setError("Failed to load webinars.");
      } finally {
        setLoadingWebinars(false);
      }
    };

    loadWebinars();
  }, [isClient]);

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

        const sigRes = await fetch(
          "http://localhost:8000/api/v1/zoom/webinar-signature",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              meetingNumber,
              role: 0, // attendee
            }),
          }
        );

        console.log("[DEBUG] Signature fetch response status:", sigRes.status);

        if (!sigRes.ok) {
          const text = await sigRes.text();
          console.error("[DEBUG] Signature fetch failed. Body:", text);
          throw new Error(`Failed to fetch signature: ${sigRes.status}`);
        }

        const json = await sigRes.json();
        console.log("[DEBUG] Signature response JSON:", json);

        const { signature } = json as SignatureResponse;
        const sdkKey = "9BnsBTacTiSBf1vE4pX9A";

        console.log("[DEBUG] Using sdkKey:", sdkKey);
        console.log(
          "[DEBUG] Using signature (first 50 chars):",
          signature?.slice(0, 50)
        );

        if (!signature) throw new Error("No signature received");
        if (!sdkKey) throw new Error("SDK Key not configured");

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
          userName: "Guest",
          userEmail: "nandeeshbasavarajaiah1@gmail.com",
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
    [isClient, parseJoinUrl]
  );

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
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[95vw] h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-50">
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                onClick={leaveMeeting}
                disabled={joining}
              >
                {joining ? "Connecting..." : "Leave Meeting"}
              </button>
            </div>

            {joining && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-40">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-blue-600"></div>
                  <div className="text-lg font-medium">
                    Connecting to webinar...
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Please wait a moment
                  </div>
                </div>
              </div>
            )}

            <div ref={zoomRootRef} className="w-full h-full" />
          </div>
        </div>
      )}
    </main>
  );
} ///////////////////i need to display zoom meeting window in full length and full with of screen
