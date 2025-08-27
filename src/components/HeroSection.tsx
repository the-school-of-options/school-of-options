import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 md:py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 lg:mb-10 leading-tight">
            <span className="block sm:inline">90% of Traders Lose Money</span>
            <span className="block sm:inline"> in Options.</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-accent mt-2 sm:mt-0">We Simplify It.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 md:px-8 lg:px-0 font-semibold">
            The only dedicated school for Options Trading - learn, train, and succeed with our <span className="whitespace-nowrap">6-Month Mentorship Program</span>.
          </p>
          
          <div className="flex justify-center px-4 sm:px-0">
            <Link
              href="/mentorship"
              className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 flex items-center gap-2 group w-full sm:w-auto max-w-sm sm:max-w-none"
            >
              <span className="sm:hidden">Enroll Now</span>
              <span className="hidden sm:inline">Enroll Now</span>
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          

        </div>
      </div>
    </section>
  );
}
