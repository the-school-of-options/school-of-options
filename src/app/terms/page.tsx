import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

export const metadata: Metadata = {
  title: 'Terms of Service - The School of Options',
  description: 'Terms of Service and conditions for using The School of Options services and educational content.',
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Legal Notice</p>
            <p className="text-yellow-700">
              This is a placeholder terms of service page. Please consult with a legal professional 
              to create comprehensive terms that comply with applicable laws and regulations.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using The School of Options website and services, you accept and agree 
              to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">2. Educational Content Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The content provided on this website is for educational purposes only and does not 
              constitute financial advice. Trading in options involves substantial risk and may not 
              be suitable for all investors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">3. Risk Disclosure</h2>
            <p className="text-gray-600 mb-4">
              Options trading involves significant risk of loss. Past performance is not indicative 
              of future results. You should carefully consider whether trading is suitable for you 
              in light of your financial condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">4. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us through our website 
              or newsletter subscription form.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
