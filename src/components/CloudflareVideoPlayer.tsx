'use client';

import { useEffect, useRef } from 'react';

interface CloudflareVideoPlayerProps {
  videoId: string;
  hlsUrl: string;
  title?: string;
  className?: string;
}

export default function CloudflareVideoPlayer({ 
  videoId, 
  hlsUrl, 
  title = "Video Player",
  className = ""
}: CloudflareVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if HLS is supported
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = hlsUrl;
    } else if (typeof window !== 'undefined' && (window as any).Hls) {
      // HLS.js support for other browsers
      const hls = new (window as any).Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      
      return () => {
        hls.destroy();
      };
    } else {
      // Fallback: try to load HLS.js dynamically
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
      script.onload = () => {
        if ((window as any).Hls && (window as any).Hls.isSupported()) {
          const hls = new (window as any).Hls();
          hls.loadSource(hlsUrl);
          hls.attachMedia(video);
        }
      };
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [hlsUrl]);

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            controls
            className="w-full h-auto max-h-96"
            poster={`https://customer-7rtovmkzy70zi3se.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=2s`}
          >
            <source src={hlsUrl} type="application/vnd.apple.mpegurl" />
            <p className="text-white p-4">
              Your browser doesn't support HTML5 video or HLS streaming.
            </p>
          </video>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Video ID: {videoId}</p>
          <p>Streaming via Cloudflare Stream</p>
        </div>
      </div>
    </div>
  );
}
