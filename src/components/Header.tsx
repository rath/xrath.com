"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative overflow-hidden rounded-full ring-2 ring-foreground/10">
              <Image
                src="/profile.png"
                alt="Jang-Ho Hwang"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            </div>
            <span className="text-lg font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              Jang-Ho Hwang
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/blogs"
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/works"
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
            >
              Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Social icons - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="https://github.com/rath"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>

              <Link
                href="https://x.com/xrath"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>

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
      <div className={`fixed right-0 top-0 h-full w-50 bg-white shadow-2xl transition-transform duration-300 transform z-50 md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold gradient-text">
              Go to
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium text-right"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium text-right"
            >
              Blog
            </Link>
            <Link
              href="/works"
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 px-4 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium text-right"
            >
              Works
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
