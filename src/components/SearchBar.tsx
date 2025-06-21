'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize query from searchParams on client side only
  useEffect(() => {
    const initialQuery = searchParams.get('q') || '';
    setQuery(initialQuery);
    setIsInitialized(true);
  }, [searchParams]);

  const handleSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('q', value);
      params.delete('page'); // Reset to page 1 when searching
    } else {
      params.delete('q');
    }

    router.push(`/blogs?${params.toString()}`);
  }, [router, searchParams]);

  // Debounced search
  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = setTimeout(() => {
      if (query !== searchParams.get('q')) {
        handleSearch(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, handleSearch, searchParams, isInitialized]);

  const handleClear = () => {
    setQuery('');
    handleSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, content, or tags..."
          className="w-full pl-14 pr-12 py-4 text-base rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-foreground/40"
        />

        {/* Search icon */}
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground/40 hover:text-foreground/60 hover:bg-foreground/5 transition-all duration-200"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Gradient border effect on focus */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
    </div>
  );
}
