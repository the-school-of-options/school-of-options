/* eslint-disable @typescript-eslint/ban-ts-comment */
// app/webinar/room/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

//
// ── Settings ───────────────────────────────────────────────────────────────────
//
const ZOOM_VER = "4.0.0"; // keep all 3 CDN URLs on the same version
// Your backend that returns a Meeting SDK signature (use Meeting SDK Key/Secret)
const SIGNATURE_ENDPOINT =
  "https://api.theschoolofoptions.com/api/v1/zoom/webinar-signature";

//
// ── Types ──────────────────────────────────────────────────────────────────────
//
declare global {
  interface Window {
    ZoomMtgEmbedded?: any;
  }
}

type SigResponse = {
  signature: string;
  sdkKey: string;
  meetingNumber?: string;
  role?: number;
};

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
  if (ZoomMtgEmbeddedSingleton) return ZoomMtgEmbeddedSingleton;

  await loadScriptOnce(
    `https://source.zoom.us/${ZOOM_VER}/lib/vendor/react.min.js`
  );
  await loadScriptOnce(
    `https://source.zoom.us/${ZOOM_VER}/lib/vendor/react-dom.min.js`
  );
  await loadScriptOnce(
    `https://source.zoom.us/${ZOOM_VER}/zoom-meeting-embedded-${ZOOM_VER}.min.js`
  );

  if (!window.ZoomMtgEmbedded)
    throw new Error("Zoom UMD not available on window");

  ZoomMtgEmbeddedSingleton = window.ZoomMtgEmbedded;
  return ZoomMtgEmbeddedSingleton;
}

//
// ── Page component ─────────────────────────────────────────────────────────────
//
export default function WebinarRoom() {
  const sp = useSearchParams();
  const meetingNumber = (sp.get("mn") || "").replace(/\D/g, ""); // digits only
  const password = sp.get("pwd") || "";
  const userName = sp.get("name") || "Guest";
  const userEmail = sp.get("email") || "nandi@example.com";

  const zoomRootRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<any>(null);

  const [joining, setJoining] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fullscreen experience: lock page scroll when mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Cleanly leave/destroy on unload/unmount
  useEffect(() => {
    const cleanup = async () => {
      try {
        if (clientRef.current) {
          await clientRef.current.leave();
          await clientRef.current.destroy();
        }
      } catch {}
    };
    window.addEventListener("beforeunload", cleanup);
    return () => {
      cleanup();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  // Join flow
  useEffect(() => {
    (async () => {
      try {
        if (!meetingNumber)
          throw new Error("Missing meeting number (mn query param).");

        const sigRes = await fetch(SIGNATURE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetingNumber, role: 0 }), // attendee
        });

        if (!sigRes.ok) {
          const txt = await sigRes.text();
          console.error("[ROOM] signature fetch failed:", sigRes.status, txt);
          throw new Error(`Signature fetch failed: ${sigRes.status}`);
        }

        const { signature, sdkKey } = (await sigRes.json()) as SigResponse;
        if (!signature || !sdkKey)
          throw new Error("Invalid signature response.");

        // Optional: decode to verify payload
        try {
          const payloadPart = signature.split(".")[1];
          const b64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
          const json = JSON.parse(
            atob(b64 + "===".slice((4 - (b64.length % 4)) % 4))
          );
          console.log("[ROOM] decoded JWT payload:", json);
        } catch (e) {
          console.warn("[ROOM] could not decode JWT payload:", e);
        }

        console.log("[ROOM] Loading Zoom SDK...");
        const ZME = await loadZoomEmbeddedUMD();
        console.log("[ROOM] Creating client...");
        const client = ZME.createClient();
        clientRef.current = client;

        const zoomRoot = zoomRootRef.current;
        if (!zoomRoot) throw new Error("Zoom container not ready");

        console.log("[ROOM] Initializing client...");
        await client.init({
          language: "en-US",
          zoomAppRoot: zoomRoot,
          customize: {
            video: { isResizable: true, popper: { disableDraggable: false } },
            toolbar: { buttons: [] },
          },
        });

        console.log("[ROOM] Client initialized, joining meeting...");

        // Add a small delay to ensure initialization is complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Ensure meeting number is a string
        const meetingNumberStr = String(meetingNumber);

        console.log("[ROOM] Join parameters:", {
          signature: signature.substring(0, 20) + "...",
          sdkKey: sdkKey.substring(0, 10) + "...",
          meetingNumber: meetingNumberStr,
          userName,
          userEmail,
        });

        await client.join({
          signature,
          role: 1,
          sdkKey,
          meetingNumber,
          password,
          userName: "Guest",
          userEmail: "nandeeshbasavarajaiah1@gmail.com",
        });

        console.log("[ROOM] Successfully joined meeting");
        setJoining(false);
      } catch (e: any) {
        console.error("[ROOM] join error:", e);
        console.error("[ROOM] error stack:", e.stack);
        setError(e?.message || "Failed to join");
        setJoining(false);
      }
    })();
  }, [meetingNumber, password, userName, userEmail]);

  const leave = () => {
    if (window.history.length > 1) window.history.back();
    else window.close();
  };

  return (
    <div className="fixed inset-0 bg-black">
      <button
        className="fixed top-[env(safe-area-inset-top,0)] right-[env(safe-area-inset-right,0)] m-4 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow z-20"
        onClick={leave}
        disabled={joining}
      >
        {joining ? "Connecting..." : "Leave"}
      </button>

      {joining && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white bg-black/40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"></div>
            <div className="text-lg font-medium">Connecting…</div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 z-20 rounded bg-red-600 text-white px-3 py-2 text-sm shadow">
          {error}
        </div>
      )}

      <div
        ref={zoomRootRef}
        className="absolute inset-0"
        style={{ width: "100vw", height: "100dvh" }}
      />
    </div>
  );
}
