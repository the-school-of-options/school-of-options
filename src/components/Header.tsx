'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isUserMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Mentorship Program', href: '/mentorship' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Newsletter', href: '/newsletter' },
    // { name: 'Knowledge Hub', href: '/knowledge-hub' },
    
    // { name: 'About', href: '/about' },
    // { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo - Enhanced Responsive */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-navy">
                <span className="hidden sm:inline">The School of </span>
                <span className="sm:hidden">TheSchoolOf</span>
                <span className="text-accent">Options</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Enhanced Responsive */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm xl:text-base font-semibold transition-colors rounded-md ${
                      isActive 
                        ? 'text-accent font-bold bg-accent/10' // Active state with background
                        : 'text-navy hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth & CTA Section - Enhanced Responsive */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Authentication UI */}
            {isLoading ? (
              <div className="w-9 h-9 xl:w-10 xl:h-10 animate-pulse bg-gray-200 rounded-full"></div>
            ) : isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative p-1.5 xl:p-2 rounded-full hover:bg-gray-50 transition-colors"
                  title={`Signed in as ${user.fullName}`}
                >
                  <div className="w-9 h-9 xl:w-10 xl:h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-sm xl:text-base font-bold text-navy">
                      {user.fullName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-navy">{user.fullName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold text-navy hover:text-accent transition-colors rounded-md hover:bg-accent/5"
              >
                Sign In
              </button>
            )}
            
            {/* CTA Button - Responsive Sizing */}
            <a
              href="https://rzp.io/rzp/theschoolofoptions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-navy px-4 xl:px-6 py-2 xl:py-3 rounded-lg text-sm xl:text-base font-semibold hover:bg-accent/90 transition-colors"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-navy hover:text-accent p-2 rounded-md hover:bg-accent/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation - Enhanced */}
        {isMenuOpen && (
          <div className="mobile-menu lg:hidden absolute top-16 sm:top-18 md:top-20 left-0 right-0 bg-white shadow-lg border-t z-40">
            <div className="px-4 sm:px-6 pt-4 pb-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                      isActive 
                        ? 'text-accent font-bold bg-accent/10 border border-accent/20' // Enhanced active style
                        : 'text-navy hover:text-accent hover:bg-accent/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                {/* Authentication Section - Enhanced */}
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-navy">{user.fullName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-accent hover:bg-accent/5 flex items-center space-x-2 border border-gray-200 rounded-lg transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-3 text-base font-semibold text-navy hover:text-accent hover:bg-accent/5 border border-navy rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                )}
                
                {/* Enhanced CTA Button - Center Aligned */}
                <a
                  href="https://rzp.io/rzp/theschoolofoptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-4 bg-accent text-navy font-semibold rounded-lg hover:bg-accent/90 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode="login"
      />
    </header>
  );
}
