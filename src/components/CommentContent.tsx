'use client';

import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EmojiText from './EmojiText';

interface CommentContentProps {
  content: string;
  className?: string;
}

export default function CommentContent({ content, className }: CommentContentProps) {
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
          {processChildren(children)}
        </a>
      );
    },
    p: ({ children }) => (
      <p className="mb-4 text-foreground/80 leading-relaxed font-light">{processChildren(children)}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{processChildren(children)}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">{processChildren(children)}</em>
    ),
    code: ({ children }) => (
      <code className="bg-surface px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground/80 leading-relaxed font-light">{processChildren(children)}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 my-4 italic text-foreground/70">
        {processChildren(children)}
      </blockquote>
    ),
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function processChildren(children: React.ReactNode): React.ReactNode {
  if (!children) return children;
  
  if (typeof children === 'string') {
    return <EmojiText text={children} />;
  }
  
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') {
        return <EmojiText key={index} text={child} />;
      }
      return child;
    });
  }
  
  return children;
}