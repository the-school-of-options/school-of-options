import { Metadata } from 'next';
import { 
  VideoCameraIcon,
  UsersIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import WebinarsClient from '@/components/WebinarsClient';
import WebinarDataLogger from '@/components/WebinarDataLogger';
import { backendAPI } from '@/lib/backend-api';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

export const metadata: Metadata = {
  title: 'The School of Options - Learn Options Trading with Expert Mentorship',
  description: 'Join our live options trading webinars and interactive learning sessions. Learn from expert traders, get real-time market insights, and master trading strategies.',
  keywords: 'options trading webinars, live trading sessions, options education, trading webinars, financial education webinars',
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/webinars',
  },
  openGraph: {
    title: 'Options Trading Webinars - Live Learning Sessions | The School of Options',
    description: 'Join our live options trading webinars and interactive learning sessions. Learn from expert traders and master trading strategies.',
    url: `${CANONICAL_ORIGIN}/webinars`,
    siteName: 'The School of Options',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/founder-kundan-kishore.jpg',
        width: 1200,
        height: 630,
        alt: 'Options Trading Webinars - The School of Options',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Options Trading Webinars - Live Learning Sessions',
    description: 'Join our live options trading webinars and interactive learning sessions. Learn from expert traders and master trading strategies.',
    images: ['/images/founder-kundan-kishore.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default async function WebinarsPage() {
  // Fetch real webinars from backend API
  let liveWebinars: any[] = [];
  let upcomingWebinars: any[] = [];

  try {
    const webinarsData = await backendAPI.getAllWebinars();
    liveWebinars = webinarsData.liveWebinars;
    upcomingWebinars = webinarsData.upcomingWebinars;
  } catch (error) {
    console.error('Failed to fetch webinars from backend:', error);
    // Fallback to empty arrays - component will show "no webinars" state
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="block">Learn Options Trading</span>
              <span className="block text-accent mt-2">Through Live Webinars</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join expert-led webinars, register instantly, and get direct access to Zoom sessions. 
              Interactive learning with live Q&A sessions.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-navy-light/50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-2">Live Access</div>
              <div className="text-sm text-gray-300">Join directly via Zoom with one click</div>
            </div>
            <div className="bg-navy-light/50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-2">Instant Registration</div>
              <div className="text-sm text-gray-300">Register and get your join link immediately</div>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars List Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WebinarDataLogger 
            liveWebinars={liveWebinars}
            upcomingWebinars={upcomingWebinars}
          />
          <WebinarsClient
            upcomingWebinars={upcomingWebinars}
            liveWebinars={liveWebinars}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-navy/5 to-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
              How Our Webinar System Works
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Powered by Zoom API for seamless registration and access
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-navy">1</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Register Instantly</h3>
              <p className="text-gray-600 font-semibold">
                Fill out a simple form with your name and email. 
                Our system automatically registers you via Zoom API.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-navy">2</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Get Your Link</h3>
              <p className="text-gray-600 font-semibold">
                Receive an immediate email with your unique Zoom join link, 
                calendar invite, and pre-webinar materials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-navy">3</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">Join & Learn</h3>
              <p className="text-gray-600 font-semibold">
                Click your link to join the live Zoom webinar. 
                Participate in interactive Q&A sessions.
              </p>
            </div>
          </div>

          {/* Technical Note */}
          <div className="mt-12 bg-white/80 rounded-xl p-6 border border-accent/20">
            <h4 className="font-bold text-navy mb-3">✨ Zoom Integration Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p>✓ Automatic registration via Zoom API</p>
                <p>✓ Unique join links for each participant</p>
                <p>✓ Calendar invites with webinar details</p>
              </div>
              <div>
                <p>✓ Email confirmations and reminders</p>
                <p>✓ Live Q&A and interactive sessions</p>
                <p>✓ Registration status tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
            Ready to Join Our Next Webinar?
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-semibold">
            Don't miss out on valuable learning opportunities. Register for upcoming sessions 
            or join our newsletter to get notified about new webinars.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-navy px-8 py-4 rounded-lg font-semibold transition-colors">
              View All Webinars
            </button>
            <Link href="/newsletter" className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Get Notified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
