'use client';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export default function WhatsAppWidget() {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX';
    const message = 'Hi! I\'m interested in learning more about The School of Options.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_widget',
        value: 1
      });
    } else {
      console.log('Analytics: whatsapp_click event fired');
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-accent hover:bg-accent/90 focus:bg-accent/90 focus:outline-none focus:ring-4 focus:ring-accent/20 text-navy p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:scale-110 group"
        aria-label="Contact us on WhatsApp - opens in new window"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
}
