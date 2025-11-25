'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="container-page">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/schneider-law-logo.svg" 
                alt="Schneider Law" 
                width={360} 
                height={120}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-nav hover:text-primary-dark px-3 py-2 text-sm font-semibold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-nav hover:text-primary-dark px-3 py-2 text-sm font-semibold transition-colors"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-nav hover:text-primary-dark px-3 py-2 text-sm font-semibold transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-nav hover:text-primary-dark px-3 py-2 text-sm font-semibold transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="btn-nav"
              >
                Consultation
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-nav hover:text-primary-dark focus:outline-none focus:text-primary-dark"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t">
              <Link
                href="/"
                className="text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-nav hover:text-primary-dark block px-3 py-2 text-base font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="btn-nav-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
