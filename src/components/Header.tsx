import Link from "next/link";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full glass-effect">
      <nav className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group">
          <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
            Rath World
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
