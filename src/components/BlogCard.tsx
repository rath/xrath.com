import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  index?: number;
  featured?: boolean;
}

export default function BlogCard({
  title,
  date,
  excerpt,
  slug,
  tags = [],
  index,
  featured = false,
}: BlogCardProps) {
  const displayNumber = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={`/${slug}`} className="block group relative h-full">
      <article className="relative h-full">
        {/* Main card container with glass effect */}
        <div
          className={`relative h-full rounded-2xl glass-effect border border-foreground/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            featured ? "p-8" : "p-6"
          }`}
        >
          {/* Post number in background */}
          {displayNumber && (
            <span className="post-number">{displayNumber}</span>
          )}

          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-2xl p-px animated-gradient-bold">
              <div className="h-full w-full rounded-2xl bg-background/80"></div>
            </div>
          </div>

          {/* Content container */}
          <div className="relative flex flex-col gap-4 h-full">
            {/* Header with date and arrow */}
            <div className="flex items-center justify-between">
              <time className="relative text-sm font-medium text-foreground/60 bg-gradient-to-r from-[var(--color-electric-violet)]/10 to-[var(--color-hot-pink)]/10 px-3 py-1 rounded-full overflow-hidden">
                {/* Animated shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></span>
                <span className="relative">
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </time>

              {/* Animated arrow icon - slides in on hover */}
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[var(--color-electric-violet)]/10 to-[var(--color-cyber-cyan)]/10 flex items-center justify-center overflow-hidden">
                <svg
                  className="h-5 w-5 text-foreground/30 group-hover:text-[var(--color-electric-violet)] transition-all duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-full bg-[var(--color-electric-violet)]/20 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
              </div>
            </div>

            {/* Title with underline animation */}
            <h3
              className={`font-bold line-clamp-2 transition-all duration-300 ${
                featured ? "text-2xl sm:text-3xl" : "text-xl"
              }`}
            >
              <span className="title-underline">
                {title}
              </span>
            </h3>

            {/* Excerpt with better typography */}
            <p
              className={`text-foreground/70 leading-relaxed flex-grow ${
                featured ? "line-clamp-4 text-lg" : "line-clamp-3"
              }`}
            >
              {excerpt}
            </p>

            {/* Read more link that appears on hover */}
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/50 group-hover:text-[var(--color-electric-violet)] transition-colors duration-300">
              <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                Read more
              </span>
              <svg
                className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Tags with enhanced design */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-[var(--color-electric-violet)]/10 to-[var(--color-cyber-cyan)]/10 text-foreground/70 group-hover:from-[var(--color-electric-violet)]/20 group-hover:to-[var(--color-cyber-cyan)]/20 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-electric-violet)]/10 to-[var(--color-hot-pink)]/10 -translate-x-20 -translate-y-20 rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[var(--color-electric-violet)]/20 via-[var(--color-hot-pink)]/20 to-[var(--color-cyber-cyan)]/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      </article>
    </Link>
  );
}
