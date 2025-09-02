'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface EnrollCTAProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function EnrollCTA({ 
  className = '', 
  children = 'Enroll Now',
  variant = 'primary',
  size = 'md'
}: EnrollCTAProps) {
  // Environment variables with fallbacks
  const RAZORPAY_URL = process.env.NEXT_PUBLIC_RAZORPAY_URL || 'https://rzp.io/rzp/theschoolofoptions';
  
  // Add UTM parameters for tracking
  const enrollUrl = new URL(RAZORPAY_URL);
  enrollUrl.searchParams.set('utm_source', 'site');
  enrollUrl.searchParams.set('utm_medium', 'cta');
  enrollUrl.searchParams.set('utm_campaign', 'enroll');

  // Analytics tracking
  const handleClick = () => {
    // Basic analytics event - can be extended with actual analytics library
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_enroll_click', {
        event_category: 'engagement',
        event_label: 'enroll_now_button',
        value: 1
      });
    } else {
      console.log('Analytics: cta_enroll_click event fired');
    }
  };

  // CSS classes based on variant and size
  const getClasses = () => {
    const baseClasses = 'font-semibold transition-colors flex items-center justify-center gap-2 group';
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg'
    };

    const variantClasses = {
      primary: 'bg-accent text-navy hover:bg-accent/90',
      secondary: 'bg-navy text-white hover:bg-navy/90',
      outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-navy'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  return (
    <a
      href={enrollUrl.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className={getClasses()}
      onClick={handleClick}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}

// Declare global gtag type for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
