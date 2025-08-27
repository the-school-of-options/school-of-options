'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Mentorship Program', href: '/mentorship' },
    { name: 'Newsletter', href: '/newsletter' },
    // { name: 'Knowledge Hub', href: '/knowledge-hub' },
    
    // { name: 'About', href: '/about' },
    // { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-navy">
                <span className="hidden sm:inline">The School of </span>
                <span className="sm:hidden">TheSchoolOf</span>
                <span className="text-accent">Options</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-4 lg:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                                                                className={`px-2 lg:px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'text-accent font-bold' // Active state with bold weight
                        : 'text-navy hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button - responsive sizing */}
          <div className="hidden md:block">
            <Link
              href="/mentorship"
              className="btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              <span className="hidden lg:inline">Enroll Now</span>
              <span className="lg:hidden">Enroll Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-navy hover:text-accent p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold border-b border-gray-100 last:border-b-0 ${
                      isActive 
                        ? 'text-accent font-bold bg-accent/5' // Mobile active style with bold weight
                        : 'text-navy hover:text-accent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/mentorship"
                  className="btn-primary w-full text-center py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
