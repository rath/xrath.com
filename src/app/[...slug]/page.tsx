import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getRandomPosts } from '@/lib/posts';
import BlogPostContent from '@/components/BlogPostContent';
import CommentContent from '@/components/CommentContent';
import { generateExcerpt } from '@/lib/excerpt';
import { CommentDateFormatter } from '@/components/CommentDateFormatter';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema, getReadingTime } from '@/lib/seo';

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
      robots: { index: false },
    };
  }

  const description = await generateExcerpt(post.content, 160);
  const firstImage = extractFirstImage(post.content);
  const postUrl = `https://xrath.com/${slug}`;

  // Extract tags from frontmatter if available
  const keywords = post.tags || [];

  return generateSEO({
    title: post.title,
    description,
    url: postUrl,
    type: 'article',
    publishedTime: post.date,
    image: firstImage || undefined,
    keywords,
  });
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

  // Get random posts for navigation (excluding current post)
  const morePosts = await getRandomPosts(3, post.slug);

  // Generate structured data
  const postUrl = `https://xrath.com/${slug}`;
  const description = await generateExcerpt(post.content, 160);
  const firstImage = extractFirstImage(post.content);
  const readingTime = getReadingTime(postContent);

  const articleSchema = generateArticleSchema({
    title: post.title,
    description,
    url: postUrl,
    publishedTime: post.date,
    image: firstImage || undefined,
  });

  // Generate breadcrumb data
  const pathSegments = slug.split('/');
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Archive', url: '/archive' },
  ];
  
  // Add year if present
  if (pathSegments.length > 0 && /^\d{4}$/.test(pathSegments[0])) {
    breadcrumbItems.push({
      name: pathSegments[0],
      url: `/archive?year=${pathSegments[0]}`,
    });
  }
  
  breadcrumbItems.push({
    name: post.title,
    url: postUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
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
          {/* Breadcrumb navigation */}
          <Breadcrumb 
            items={breadcrumbItems.map(item => ({ 
              name: item.name, 
              url: item.url !== postUrl ? item.url : undefined 
            }))} 
            className="mb-8 animate-fade-in"
          />
          
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
                {readingTime} min read
              </span>
            </div>

            {/* Enhanced Tags Display */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={tag}
                      href={`/archive/tags/${encodeURIComponent(tag)}`}
                      className="group relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl glass-effect border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 overflow-hidden"
                      style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                    >
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Tag content */}
                      <svg className="relative w-3.5 h-3.5 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 4-4 4H7l4-4-4-4z" />
                      </svg>
                      <span className="relative group-hover:gradient-text transition-all duration-300">
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
            <BlogPostContent content={postContent} />
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
                        <CommentContent content={comment.content} />
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
