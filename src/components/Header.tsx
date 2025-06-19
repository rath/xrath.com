"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-effect">
        <nav className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group">
            <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              Jang-Ho
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/archive"
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
            >
              Archive
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-foreground/5 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-5 w-5 text-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div className={`fixed right-0 top-0 h-full w-56 bg-white shadow-xl transition-transform duration-300 transform z-50 md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex h-20 items-center justify-between px-4 border-b border-border">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <Link
            href="/archive"
            onClick={() => setIsMenuOpen(false)}
            className="block py-3 px-4 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200"
          >
            Archive
          </Link>
        </nav>
      </div>
    </>
  );
}
