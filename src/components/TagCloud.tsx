import Link from 'next/link';

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  limit?: number;
}

export default function TagCloud({ tags, limit = 15 }: TagCloudProps) {
  const displayTags = tags.slice(0, limit);
  const maxCount = Math.max(...displayTags.map(t => t.count));
  const minCount = Math.min(...displayTags.map(t => t.count));

  // Calculate tag size based on count
  const getTagSize = (count: number) => {
    const range = maxCount - minCount || 1;
    const normalized = (count - minCount) / range;
    return 0.875 + normalized * 0.75; // 0.875rem to 1.625rem
  };

  // Get color intensity based on count
  const getTagIntensity = (count: number) => {
    const range = maxCount - minCount || 1;
    const normalized = (count - minCount) / range;
    return normalized;
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Popular Tags</h2>
        <Link
          href="/blogs"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
        >
          View all posts →
        </Link>
      </div>

      {/* Tag Cloud Container */}
      <div className="relative rounded-2xl glass-effect border border-foreground/10 p-8 overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

        {/* Floating orbs for depth */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Tags */}
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          {displayTags.map(({ tag, count }, index) => {
            const size = getTagSize(count);
            const intensity = getTagIntensity(count);

            return (
              <Link
                key={tag}
                href={`/blogs/tags/${encodeURIComponent(tag)}`}
                className="group relative inline-flex items-center animate-fade-in-up hover:scale-110 transition-all duration-300"
                style={{
                  fontSize: `${size}rem`,
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {/* Hover glow effect */}
                <span
                  className="absolute inset-0 rounded-lg blur-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(var(--primary-rgb), ${intensity * 0.3}) 0%,
                      rgba(var(--secondary-rgb), ${intensity * 0.3}) 100%)`
                  }}
                ></span>

                {/* Tag text */}
                <span
                  className="relative px-4 py-2 font-medium transition-all duration-300"
                  style={{
                    color: `rgba(var(--foreground-rgb), ${0.5 + intensity * 0.5})`,
                  }}
                >
                  <span className="group-hover:gradient-text transition-all duration-300">
                    {tag}
                  </span>
                  <span
                    className="ml-2 text-xs opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ fontSize: '0.7em' }}
                  >
                    ({count})
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* View More Link */}
        {tags.length > limit && (
          <div className="mt-8 text-center">
            <Link
              href="/blogs"
              className="group inline-flex items-center text-sm text-foreground/60 hover:text-foreground transition-all duration-300"
            >
              <span>Explore all {tags.length} tags</span>
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
