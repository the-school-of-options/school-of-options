import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight">
            90% of Traders Lose Money in Options.
            <br />
            <span className="text-accent">We Simplify It.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The only dedicated school for Options Trading — learn, train, and succeed with our 6-Month Mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/mentorship"
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
            >
              Join the Next Cohort
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/newsletter"
              className="text-accent hover:text-accent-light font-semibold text-lg flex items-center gap-2"
            >
              Get Free Daily Newsletter
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          

        </div>
      </div>
    </section>
  );
}
