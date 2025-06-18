"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { isDark, toggleDark } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full glass-effect">
      <nav className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group">
          <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
            Rath
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/about" 
            className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/portfolio" 
            className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
          >
            Portfolio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/blogs" 
            className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            className="relative p-3 rounded-xl hover:bg-foreground/5 transition-colors duration-300 group"
            aria-label="Toggle theme"
            onClick={toggleDark}
          >
            {isDark ? (
              <svg className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          
          {/* Language toggle */}
          <button
            className="relative p-3 rounded-xl hover:bg-foreground/5 transition-colors duration-300 group"
            aria-label="Toggle language"
          >
            <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">EN</span>
          </button>


          {/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-foreground/5 transition-colors duration-300"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5 text-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}