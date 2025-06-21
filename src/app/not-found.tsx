import Link from 'next/link';
import { Metadata } from 'next';
import { getLatestPosts } from '@/lib/posts';
import { generateExcerpt } from '@/lib/excerpt';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Jang-Ho Hwang',
  description: 'The page you are looking for could not be found. Explore other content on my website.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function NotFound() {
  // Get latest posts to suggest to the user
  const latestPosts = await getLatestPosts(5);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      {/* Error message section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">
          <span className="gradient-text">404</span>
        </h1>

        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Page Not Found
        </h2>

        <p className="text-lg text-foreground/70 max-w-md mx-auto leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Search suggestion */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 glass-effect"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Homepage
          </Link>

          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 rounded-full border border-foreground/20 hover:border-foreground/40 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse Blog Archive
          </Link>
        </div>
      </div>

      {/* Suggested posts section */}
      {latestPosts.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="gradient-text">Recent Posts</span>
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {await Promise.all(latestPosts.map(async (post, index) => {
              const excerpt = await generateExcerpt(post.content, 100);

              return (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <article className="relative h-full rounded-2xl glass-effect border border-foreground/10 p-6 transition-all duration-300 hover:border-foreground/20 overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative">
                      <h4 className="text-lg font-semibold mb-2 line-clamp-2 transition-all duration-300 group-hover:gradient-text">
                        {post.title}
                      </h4>

                      <time className="text-xs text-foreground/60 mb-3 block">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>

                      <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>

                    {/* Decorative accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-2xl">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-secondary/10 translate-x-12 -translate-y-12 rotate-45 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  </article>
                </Link>
              );
            }))}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
