import { Metadata } from 'next';
import Link from 'next/link';
import { getPaginatedPosts } from '@/lib/posts';
import { generateExcerpt } from '@/lib/excerpt';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'All blog posts from xrath.com',
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const { posts, totalPages, totalPosts } = await getPaginatedPosts(currentPage);

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">Blog Archives</h1>
        <p className="text-lg text-foreground/70">
          {totalPosts} posts from 2004 to present
        </p>
      </header>

      <div className="space-y-12">
        {await Promise.all(posts.map(async (post) => {
          const excerpt = await generateExcerpt(post.content, 200);
          
          return (
            <article key={post.slug} className="border-b border-foreground/10 pb-8">
              <Link href={`/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-foreground/60" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="mt-3 text-foreground/80 line-clamp-3">
                  {excerpt}
                </p>
              </Link>
            </article>
          );
        }))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blogs?page=${currentPage - 1}`}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-foreground/20 rounded-lg hover:border-foreground/40 transition-all"
            >
              Previous
            </Link>
          )}
          
          <span className="px-4 py-2 text-sm text-foreground/60">
            Page {currentPage} of {totalPages}
          </span>
          
          {currentPage < totalPages && (
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-foreground/20 rounded-lg hover:border-foreground/40 transition-all"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
