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
                href="https://www.linkedin.com/in/jang-ho-hwang-a2630170/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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

              <Link
                href="https://www.threads.com/@rath.xrath"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="Threads"
              >
                <svg className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>
                </svg>
              </Link>

              <Link
                href="https://www.facebook.com/xrath/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
          </nav>
        </div>
      </div>
    </>
  );
}
