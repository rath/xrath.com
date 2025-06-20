import { Metadata } from 'next';
import Link from 'next/link';
import { getPaginatedPosts } from '@/lib/posts';
import { generateExcerpt } from '@/lib/excerpt';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Blog Archive',
  description: 'Browse through all blog posts from 2004 to present. Thoughts on software development, technology, and life.',
  url: 'https://xrath.com/archive',
  keywords: ['blog', 'archive', 'software development', 'technology', 'programming'],
});

interface PageProps {
  searchParams: Promise<{ page?: string; year?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const year = resolvedSearchParams.year ? Number(resolvedSearchParams.year) : undefined;
  const { posts, totalPages, totalPosts } = await getPaginatedPosts(currentPage, 20, year);

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
              <span className="font-semibold text-foreground">{totalPosts}</span> posts{year ? ` from ${year}` : ' from 2004 to 2015'}
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

      {/* Main content */}
      <section className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-6 lg:px-8">
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

        {/* Enhanced pagination */}
        {totalPages > 1 && (
          <nav className="mt-16 flex items-center justify-center gap-2">
            {/* Previous button */}
            {currentPage > 1 && (
              <Link
                href={`/archive?page=${currentPage - 1}${year ? `&year=${year}` : ''}`}
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
                    href={`/archive?page=${pageNumber}${year ? `&year=${year}` : ''}`}
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
                href={`/archive?page=${currentPage + 1}${year ? `&year=${year}` : ''}`}
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
      </section>
    </>
  );
}
