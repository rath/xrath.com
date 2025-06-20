import { Components } from 'react-markdown';

export const markdownComponents: Components = {
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