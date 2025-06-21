import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, searchPosts } from '@/lib/posts';
import { generateExcerpt } from '@/lib/excerpt';
import { generateSEO } from '@/lib/seo';

interface PageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  return generateSEO({
    title: `Posts tagged "${tag}"`,
    description: `Browse all blog posts tagged with "${tag}". Explore thoughts on ${tag} and related topics.`,
    url: `https://xrath.com/blogs/tags/${encodeURIComponent(tag)}`,
    keywords: [tag, 'blog', 'posts', 'tags'],
  });
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const tag = decodeURIComponent(resolvedParams.tag);
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Get all tags to find the current tag
  const allTags = await getAllTags();
  const tagInfo = allTags.find(t => t.tag === tag);

  if (!tagInfo) {
    notFound();
  }

  // Get posts for this tag
  const { posts, totalPages, totalPosts } = await searchPosts('', currentPage, 20, undefined, tag);

  // Get related tags (tags that appear in posts with this tag)
  const relatedTagsMap = new Map<string, number>();
  for (const post of posts) {
    if (post.tags) {
      for (const postTag of post.tags) {
        if (postTag !== tag) {
          relatedTagsMap.set(postTag, (relatedTagsMap.get(postTag) || 0) + 1);
        }
      }
    }
  }
  const relatedTags = Array.from(relatedTagsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            {/* Tag icon */}
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 4-4 4H7l4-4-4-4z" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">{tag}</span>
            </h1>

            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              <span className="font-semibold text-foreground">{totalPosts}</span> posts tagged with "{tag}"
            </p>

            {/* Navigation breadcrumb */}
            <nav className="mt-6 flex items-center justify-center gap-2 text-sm text-foreground/60">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-foreground">{tag}</span>
            </nav>
          </header>
        </div>
      </section>

      {/* Related tags section */}
      {relatedTags.length > 0 && (
        <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="rounded-2xl glass-effect border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold mb-4 gradient-text">Related tags</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map(({ tag: relatedTag, count }) => (
                <Link
                  key={relatedTag}
                  href={`/blogs/tags/${encodeURIComponent(relatedTag)}`}
                  className="group inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-xl bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-3 h-3 mr-1.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 4-4 4H7l4-4-4-4z" />
                  </svg>
                  <span className="group-hover:gradient-text transition-all duration-300">
                    {relatedTag}
                  </span>
                  <span className="ml-2 text-xs opacity-70">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-foreground/60">No posts found with this tag.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {await Promise.all(posts.map(async (post, index) => {
              const excerpt = await generateExcerpt(post.content, 150);

              return (
                <article
                  key={post.slug}
                  className="group relative">
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

                        {/* Other tags */}
                        {post.tags && post.tags.length > 1 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.filter(t => t !== tag).slice(0, 2).map((otherTag) => (
                              <span
                                key={otherTag}
                                className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground/70"
                              >
                                {otherTag}
                              </span>
                            ))}
                            {post.tags.filter(t => t !== tag).length > 2 && (
                              <span className="text-[10px] text-foreground/60 px-1">
                                +{post.tags.filter(t => t !== tag).length - 2}
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

        {/* Pagination */}
        {totalPages > 1 && posts.length > 0 && (
          <nav className="mt-16 flex items-center justify-center gap-2">
            {/* Previous button */}
            {currentPage > 1 && (
              <Link
                href={`/blogs/tags/${encodeURIComponent(tag)}?page=${currentPage - 1}`}
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
                    href={`/blogs/tags/${encodeURIComponent(tag)}?page=${pageNumber}`}
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
                href={`/blogs/tags/${encodeURIComponent(tag)}?page=${currentPage + 1}`}
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
