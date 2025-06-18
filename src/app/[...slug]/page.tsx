import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
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

  return {
    title: post.title,
    description,
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
      <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground/90">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 my-4 italic text-foreground/80">
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
    <article className="mx-auto max-w-screen-lg px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">{post.title}</h1>
        <time className="text-foreground/60" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-surface prose-blockquote:border-l-primary/30 prose-blockquote:text-foreground/80 prose-li:text-foreground/90">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{postContent}</ReactMarkdown>
      </div>

      {comments.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Comments</h2>
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div key={index} className="bg-surface rounded-lg p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {comment.authorUrl ? (
                      <a 
                        href={comment.authorUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {comment.author}
                      </a>
                    ) : (
                      comment.author
                    )}
                  </h3>
                  <time className="text-sm text-foreground/60">
                    <CommentDateFormatter date={comment.date} />
                  </time>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-foreground/80">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{comment.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
