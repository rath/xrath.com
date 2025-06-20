import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getLatestPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateExcerpt } from '@/lib/excerpt';
import { CommentDateFormatter } from '@/components/CommentDateFormatter';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

// Extract first image from markdown content
function extractFirstImage(content: string): string | null {
  // Match markdown image syntax: ![alt](url)
  const markdownImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (markdownImageMatch) {
    return markdownImageMatch[1];
  }

  // Also check for HTML img tags
  const htmlImageMatch = content.match(/<img.*?src=["'](.*?)["']/);
  if (htmlImageMatch) {
    return htmlImageMatch[1];
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.map(segment => decodeURIComponent(segment)).join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = await generateExcerpt(post.content, 160);
  const firstImage = extractFirstImage(post.content);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      ...(firstImage && { images: [{ url: firstImage }] }),
    },
    twitter: {
      card: firstImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      ...(firstImage && { images: [firstImage] }),
    },
  };
}

// Parse comments from markdown content
function parseComments(content: string) {
  const commentsSectionMatch = content.match(/## Comments\s*\n([\s\S]*)$/)
  if (!commentsSectionMatch) return { content, comments: [] };

  const contentWithoutComments = content.substring(0, commentsSectionMatch.index);
  const commentsText = commentsSectionMatch[1];

  const comments = [];
  const commentBlocks = commentsText.split(/\n---\n/);

  for (const block of commentBlocks) {
    if (!block.trim()) continue;

    const authorMatch = block.match(/^### (.+)$/m);
    const lines = block.split('\n');

    let author = '';
    let authorUrl = '';
    let dateStr = '';
    let contentStart = 0;

    if (authorMatch) {
      author = authorMatch[1];

      // Find the italic lines after the author
      let lineIndex = lines.findIndex(line => line.includes(authorMatch[0])) + 1;

      // Check if the next line is a URL (first italic line)
      if (lineIndex < lines.length && lines[lineIndex].match(/^\*(.+)\*$/)) {
        const match = lines[lineIndex].match(/^\*(.+)\*$/);
        if (match) {
          const content = match[1];
          // Check if it's a URL
          if (content.startsWith('http://') || content.startsWith('https://')) {
            authorUrl = content;
            lineIndex++;
          }
        }
      }

      // The next italic line should be the date
      if (lineIndex < lines.length && lines[lineIndex].match(/^\*(.+)\*$/)) {
        const match = lines[lineIndex].match(/^\*(.+)\*$/);
        if (match) {
          dateStr = match[1];
          contentStart = block.indexOf(lines[lineIndex]) + lines[lineIndex].length;
        }
      }

      if (author && dateStr) {
        const content = block.substring(contentStart).trim();
        comments.push({ author, authorUrl, date: dateStr, content });
      }
    }
  }

  return { content: contentWithoutComments, comments };
}


export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.map(segment => decodeURIComponent(segment)).join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse comments from the post content
  const { content: postContent, comments } = parseComments(post.content);

  // Get more posts for navigation (excluding current post)
  const allPosts = await getLatestPosts(7); // Get 7 to ensure we have 6 after filtering
  const morePosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 6);

  const components: Components = {
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          className="text-primary hover:text-primary-hover underline decoration-primary/30 hover:decoration-primary transition-colors"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-4xl font-semibold mt-10 mb-6 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-10 mb-5 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-8 mb-4 text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 leading-relaxed text-lg font-light text-foreground/85">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-lg text-foreground/85 leading-relaxed font-light">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 my-4 italic text-lg text-foreground/80">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Check if this is part of a code block with language
      const isInlineCode = !className;

      if (isInlineCode) {
        return (
          <code className="bg-surface px-1.5 py-0.5 rounded text-sm font-mono text-primary">
            {children}
          </code>
        );
      }

      // For code blocks, preserve the content without additional styling
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => {
      // Check if the code block has a language identifier
      const codeElement = children && typeof children === 'object' && 'props' in children ? children as any : null;
      const className = codeElement?.props?.className || '';
      const hasLanguage = className.includes('language-');

      return (
        <pre className={`bg-surface p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono ${hasLanguage ? 'border-l-4 border-primary/30' : ''}`}>
          {children}
        </pre>
      );
    },
    hr: () => (
      <hr className="my-8 border-t border-border" />
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg shadow-md my-6 mx-auto max-w-full"
      />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">{children}</em>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-surface">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-surface/50 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-sm text-foreground/90">
        {children}
      </td>
    ),
  };

  return (
    <>
      {/* Hero section with animated background */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>

          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.01]" preserveAspectRatio="none">
            <defs>
              <pattern id="post-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#post-grid)" />
          </svg>
        </div>

        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text leading-tight">{post.title}</span>
            </h1>

            {/* Post metadata */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <time className="inline-flex items-center text-foreground/60 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full glass-effect" dateTime={post.date}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              {/* Reading time estimate */}
              <span className="inline-flex items-center text-foreground/60 bg-gradient-to-r from-secondary/10 to-accent/10 px-4 py-2 rounded-full glass-effect">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </span>
            </div>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50"></div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50"></div>
            </div>
          </header>
        </div>
      </section>

      {/* Main content */}
      <article className="mx-auto max-w-screen-lg px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl glass-effect border border-foreground/10 p-8 sm:p-12">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-secondary/20 rounded-br-2xl"></div>

          <div className="prose prose-xl max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-p:text-foreground/85 prose-p:leading-loose prose-p:font-light prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-medium prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-surface prose-blockquote:border-l-primary/30 prose-blockquote:text-foreground/80 prose-li:text-foreground/85 prose-li:leading-relaxed prose-li:font-light">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{postContent}</ReactMarkdown>
          </div>
        </div>

        {comments.length > 0 && (
          <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Comments header */}
            <div className="relative mb-10">
              <h2 className="text-3xl font-bold gradient-text mb-2">Comments</h2>
              <p className="text-foreground/60">{comments.length} thoughts shared</p>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-50"></div>
            </div>

            {/* Comments list */}
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative rounded-2xl glass-effect border border-foreground/10 p-6 transition-all duration-300 hover:border-foreground/20 overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Comment number indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="text-xs font-bold gradient-text">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Comment content */}
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar placeholder */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-lg font-bold gradient-text">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold">
                              {comment.authorUrl ? (
                                <a
                                  href={comment.authorUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-foreground hover:gradient-text transition-all duration-300"
                                >
                                  {comment.author}
                                </a>
                              ) : (
                                <span className="text-foreground">{comment.author}</span>
                              )}
                            </h3>
                            <time className="text-xs text-foreground/60 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <CommentDateFormatter date={comment.date} />
                            </time>
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:font-light prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{comment.content}</ReactMarkdown>
                      </div>
                    </div>

                    {/* Decorative accent */}
                    <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden rounded-2xl">
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-secondary/5 -translate-x-12 translate-y-12 rotate-45 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More posts section */}
        {morePosts.length > 0 && (
          <section className="mt-20 animate-fade-in-up" style={{ animationDelay: `${comments.length > 0 ? '0.6s' : '0.4s'}` }}>
            {/* Section header */}
            <div className="relative mb-10">
              <h2 className="text-3xl font-bold gradient-text mb-2">Continue Reading</h2>
              <p className="text-foreground/60">Discover more thoughts and insights</p>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-50"></div>
            </div>

            {/* Posts grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {await Promise.all(morePosts.map(async (relatedPost, index) => {
                const excerpt = await generateExcerpt(relatedPost.content, 120);

                return (
                  <Link
                    key={relatedPost.slug}
                    href={`/${relatedPost.slug}`}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${(comments.length > 0 ? 0.7 : 0.5) + index * 0.1}s` }}
                  >
                    <article className="relative h-full rounded-2xl glass-effect border border-foreground/10 p-6 transition-all duration-300 hover:border-foreground/20 overflow-hidden">
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative flex flex-col h-full">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 transition-all duration-300 group-hover:gradient-text">
                          {relatedPost.title}
                        </h3>

                        <time className="text-xs text-foreground/60 mb-3">
                          {new Date(relatedPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>

                        <p className="text-sm text-foreground/70 line-clamp-3 leading-loose font-light flex-1">
                          {excerpt}
                        </p>

                        {/* Read more indicator */}
                        <div className="mt-4 flex items-center text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                          <span>Read more</span>
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
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

            {/* View all posts link */}
            <div className="mt-10 text-center">
              <Link
                href="/archive"
                className="group inline-flex items-center text-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                <span className="font-medium">View all posts</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
