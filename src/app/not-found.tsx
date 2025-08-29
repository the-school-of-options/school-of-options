import Link from 'next/link';
import { HomeIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-green mb-4">404</div>
        
        <h1 className="text-3xl font-bold text-navy mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track with your options trading journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <HomeIcon className="h-5 w-5" />
            Go Home
          </Link>
          
          {/* <Link
            href="/knowledge-hub"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <BookOpenIcon className="h-5 w-5" />
            Browse Resources
          </Link> */}
        </div>
        
        <div className="mt-8 p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-500 mb-2">Popular pages:</p>
          <div className="space-y-1">
            <Link href="/mentorship" className="block text-green hover:text-green-dark text-sm">
              Mentorship Program
            </Link>
            <Link href="/newsletter" className="block text-green hover:text-green-dark text-sm">
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
