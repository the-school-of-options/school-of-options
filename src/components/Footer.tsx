import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              The School of <span className="text-accent">Options</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The first institution dedicated 100% to Options Trading. Learn, train, and succeed with our proven methodology.
            </p>
            <div className="flex space-x-4">
              <Link href="/newsletter" className="text-accent hover:text-accent/80">
                Daily Newsletter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentorship" className="text-gray-300 hover:text-white">
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-300 hover:text-white">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Free Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsletter" className="text-gray-300 hover:text-white">
                  Daily Newsletter
                </Link>
              </li>
              {/* TODO: Enable when actual routes exist
              <li>
                <Link href="/newsletter/insights" className="text-gray-300 hover:text-white">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/newsletter/tips" className="text-gray-300 hover:text-white">
                  Trading Tips
                </Link>
              </li>
              <li>
                <Link href="/newsletter/weekly-analysis" className="text-gray-300 hover:text-white">
                  Weekly Analysis
                </Link>
              </li>
              */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-gray-300 text-sm font-semibold">
              © 2025 The School of Options. All rights reserved.
            </div>
            <div className="text-gray-300 text-sm font-semibold mt-4 md:mt-0">
              <span>Founded by Kundan Kishore</span>
              <span className="mx-2">•</span>
              <span>Gurgaon & Gaya</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <span>Educational content only - not financial advice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
