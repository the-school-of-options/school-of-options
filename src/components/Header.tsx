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
            <div className="flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-base font-semibold transition-colors ${
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

          {/* Auth & CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authentication UI */}
            {isLoading ? (
              <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full"></div>
            ) : isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
                  title={`Signed in as ${user.fullName}`}
                >
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-base font-bold text-navy">
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
                className="px-4 py-2 text-base font-semibold text-navy hover:text-accent transition-colors"
              >
                Sign In
              </button>
            )}
            
            {/* CTA Button */}
            <a
              href="https://rzp.io/rzp/theschoolofoptions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Enroll Now
            </a>
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
                    className={`block px-4 py-3 text-base font-semibold border-b border-gray-100 last:border-b-0 ${
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
              <div className="pt-4 space-y-3">
                {/* Authentication Section */}
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-navy">{user.fullName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-accent flex items-center space-x-2 border border-gray-200 rounded-lg"
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
                    className="w-full text-center px-4 py-3 text-base font-semibold text-navy hover:text-accent border border-navy rounded-lg"
                  >
                    Sign In
                  </button>
                )}
                
                {/* Always visible CTA Button */}
                <a
                  href="https://rzp.io/rzp/theschoolofoptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center py-4"
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
