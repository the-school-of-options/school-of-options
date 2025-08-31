import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

export const metadata: Metadata = {
  title: 'Privacy Policy - The School of Options',
  description: 'Privacy Policy explaining how The School of Options collects, uses, and protects your personal information.',
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 font-semibold mb-2">🔒 Privacy Notice</p>
            <p className="text-blue-700">
              This is a placeholder privacy policy. Please consult with a legal professional 
              to create a comprehensive privacy policy that complies with applicable privacy laws.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect information you provide directly to us, such as when you subscribe 
              to our newsletter, enroll in our mentorship program, or contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              send you educational content, and communicate with you about our programs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us through 
              our website or newsletter subscription form.
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
