import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 md:py-20 lg:py-28 xl:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight">
            <span className="block sm:inline">90% of Traders Lose Money</span>
            <span className="block sm:inline"> in Options.</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-accent mt-2 sm:mt-0">We Simplify It.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-300 mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 md:px-6 lg:px-0 font-semibold">
            The only dedicated school for Options Trading - learn, train, and succeed with our <span className="whitespace-nowrap">6-Month Mentorship Program</span>.
          </p>
          
          <div className="flex justify-center px-4 sm:px-0">
            <Link
              href="/mentorship"
              className="btn-primary-lg flex items-center gap-2 group w-full sm:w-auto max-w-sm sm:max-w-none px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6"
            >
              <span className="text-base sm:text-lg md:text-xl">Explore the 6-Month Mentorship</span>
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
