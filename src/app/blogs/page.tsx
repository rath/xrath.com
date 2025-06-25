import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getPaginatedPosts, searchPosts, getAllTags } from '@/lib/posts';
import { generateExcerpt } from '@/lib/excerpt';
import { generateSEO } from '@/lib/seo';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = generateSEO({
  title: 'Blog Archive',
  description: 'Browse through all blog posts from 2004 to present. Thoughts on software development, technology, and life.',
  url: 'https://xrath.com/blogs',
  keywords: ['blog', 'archive', 'software development', 'technology', 'programming'],
});

interface PageProps {
  searchParams: Promise<{ page?: string; year?: string; q?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const year = resolvedSearchParams.year ? Number(resolvedSearchParams.year) : undefined;
  const query = resolvedSearchParams.q || '';

  const { posts, totalPages, totalPosts } = query
    ? await searchPosts(query, currentPage, 20, year)
    : await getPaginatedPosts(currentPage, 20, year);

  // Get all tags for filtering
  const allTags = await getAllTags();

  return (
    <>
      {/* Hero section with animated background */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>

          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="none">
            <defs>
              <pattern id="blog-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="gradient-text">Blog Archive</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in-up">
              {query ? (
                <>
                  <span className="font-semibold text-foreground">{totalPosts}</span> results for &ldquo;{query}&rdquo;
                  {year && ` from ${year}`}
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">{totalPosts}</span> posts
                  {year && ` from ${year}`}
                  {!year && ' from 2004'}
                </>
              )}
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"></div>
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50"></div>
            </div>
          </header>
        </div>
      </section>

      {/* Search section */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <input
                type="text"
                disabled
                placeholder="Search posts by title, content, or tags..."
                className="w-full pl-14 pr-12 py-4 text-base rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/10 placeholder:text-foreground/40 opacity-50 cursor-not-allowed"
              />
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
            </div>
          </div>
        }>
          <SearchBar />
        </Suspense>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-screen-xl mt-12 px-4 pb-20 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-foreground/80">No posts found</h3>
            <p className="text-foreground/60 mb-6">
              {query ? `No posts match "${query}". Try different keywords.` : 'No posts available.'}
            </p>
            {query && (
              <Link
                href="/blogs"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                Clear search
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {await Promise.all(posts.map(async (post, index) => {
            const excerpt = await generateExcerpt(post.content, 150);

            return (
              <article
                key={post.slug}
                className="group relative"
              >
                <Link href={`/${post.slug}`} className="block">
                  <div className="relative h-full rounded-2xl border border-foreground/10 p-6 transition-all duration-300 hover:border-foreground/20 glass-effect overflow-hidden flex flex-col">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative flex-1 flex flex-col">
                      <div className="mb-3">
                        <h2 className="text-xl lg:text-lg xl:text-xl font-bold mb-2 transition-all duration-300 group-hover:gradient-text line-clamp-2">
                          {post.title}
                        </h2>
                        <time className="inline-flex items-center text-xs text-foreground/60 bg-gradient-to-r from-primary/10 to-secondary/10 px-2.5 py-1 rounded-full" dateTime={post.date}>
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>

                      <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed flex-1">
                        {excerpt}
                      </p>

                      {/* Tags display */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((postTag) => (
                            <span
                              key={postTag}
                              className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground/70"
                            >
                              {postTag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-[10px] text-foreground/60 px-1">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read more indicator */}
                      <div className="mt-4 flex items-center text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                        <span>Read full post</span>
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 overflow-hidden rounded-2xl">
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/5 to-secondary/5 -translate-x-24 translate-y-24 rotate-45 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          }))}
          </div>
        )}

        {/* Enhanced pagination */}
        {totalPages > 1 && posts.length > 0 && (
          <nav className="mt-16 flex items-center justify-center gap-2">
            {/* Previous button */}
            {currentPage > 1 && (
              <Link
                href={`/blogs?page=${currentPage - 1}${year ? `&year=${year}` : ''}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className="group relative px-6 py-3 text-sm font-medium overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 rounded-xl glass-effect"></span>
                <span className="relative flex items-center text-foreground/80 group-hover:text-foreground">
                  <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
              </Link>
            )}

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-4">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <Link
                    key={i}
                    href={`/blogs?page=${pageNumber}${year ? `&year=${year}` : ''}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                    className={`
                      relative w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium
                      transition-all duration-300 hover:scale-110
                      ${currentPage === pageNumber
                        ? 'gradient-primary text-white shadow-lg'
                        : 'text-foreground/60 hover:text-foreground glass-effect'
                      }
                    `}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {/* Next button */}
            {currentPage < totalPages && (
              <Link
                href={`/blogs?page=${currentPage + 1}${year ? `&year=${year}` : ''}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className="group relative px-6 py-3 text-sm font-medium overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 rounded-xl glass-effect"></span>
                <span className="relative flex items-center text-foreground/80 group-hover:text-foreground">
                  Next
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Enhanced Tag Filter Section */}
        {allTags.length > 0 && (
          <div className="mt-10 relative">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold gradient-text">Browse by tags</h2>
              <span className="text-sm text-foreground/60">
                {allTags.length} tags total
              </span>
            </div>

            {/* Tag Cloud Container */}
            <div className="relative rounded-2xl glass-effect border border-foreground/10 p-6 overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>

              {/* Tags Grid */}
              <div className="relative flex flex-wrap gap-2">
                {/* Top tags with size variation based on count */}
                {allTags.slice(0, 24).map(({ tag: tagName, count }, index) => {
                  const isPopular = index < 5;
                  const maxCount = allTags[0]?.count || 1;
                  const relativeSize = Math.max(0.7, count / maxCount);

                  return (
                    <Link
                      key={tagName}
                      href={`/blogs/tags/${encodeURIComponent(tagName)}`}
                      className={`
                        group relative inline-flex items-center rounded-xl transition-all duration-300
                        ${isPopular
                          ? 'px-4 py-2 text-sm font-medium glass-effect border border-foreground/10 hover:border-primary/30'
                          : 'px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-primary/10 hover:to-secondary/10'
                        }
                        hover:scale-105 hover:shadow-lg
                      `}
                      style={{
                        fontSize: isPopular ? `${0.875 + (relativeSize - 0.7) * 0.25}rem` : undefined
                      }}
                    >
                      {/* Tag icon */}
                      <svg className={`${isPopular ? 'w-4 h-4' : 'w-3 h-3'} mr-1.5 opacity-50 group-hover:opacity-100 transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 4-4 4H7l4-4-4-4z" />
                      </svg>

                      {/* Tag name */}
                      <span className="group-hover:gradient-text transition-all duration-300">
                        {tagName}
                      </span>

                      {/* Post count badge */}
                      <span className={`
                        ml-2 inline-flex items-center justify-center rounded-full
                        ${isPopular
                          ? 'w-6 h-6 text-[10px] bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30'
                          : 'px-1.5 py-0.5 text-[10px] bg-foreground/10 group-hover:bg-primary/20'
                        }
                        font-bold transition-all duration-300
                      `}>
                        {count}
                      </span>

                      {/* Hover effect for popular tags */}
                      {isPopular && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
