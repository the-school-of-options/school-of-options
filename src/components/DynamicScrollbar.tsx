'use client';

import { useEffect, useState } from 'react';

export default function DynamicScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    // Initial call
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    // Apply navy blue scrollbar theme
    const root = document.documentElement;
    root.style.setProperty('--scrollbar-track-color', 'rgba(0, 53, 102, 0.1)');
    root.style.setProperty('--scrollbar-thumb-color', '#003566');
    root.style.setProperty('--scrollbar-thumb-hover-color', '#001d3d');
    root.style.setProperty('--scroll-progress', `${scrollProgress}%`);
  }, [scrollProgress]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-navy transition-all duration-300 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Custom scrollbar styles injected via CSS */}
      <style jsx global>{`
        /* Enhanced Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
          background: transparent;
        }

        ::-webkit-scrollbar-track {
          background: var(--scrollbar-track-color, rgba(255, 195, 0, 0.1));
          border-radius: 6px;
          margin: 4px;
          transition: background-color 0.3s ease;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb-color, #ffc300);
          border-radius: 6px;
          border: 2px solid transparent;
          background-clip: content-box;
          transition: all 0.3s ease;
          min-height: 40px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--scrollbar-thumb-hover-color, #e6af00);
          border-width: 1px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        ::-webkit-scrollbar-thumb:active {
          background: var(--scrollbar-thumb-hover-color, #e6af00);
          border-width: 0px;
        }

        ::-webkit-scrollbar-corner {
          background: var(--scrollbar-track-color, rgba(255, 195, 0, 0.1));
        }

        /* Firefox scrollbar */
        html {
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-thumb-color, #ffc300) var(--scrollbar-track-color, rgba(255, 195, 0, 0.1));
        }

        /* Smooth scrolling enhancement */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for specific containers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--scrollbar-track-color, rgba(255, 195, 0, 0.1));
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb-color, #ffc300);
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--scrollbar-thumb-hover-color, #e6af00);
        }
      `}</style>
    </>
  );
}
