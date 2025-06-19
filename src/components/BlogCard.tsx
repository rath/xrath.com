import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
}

export default function BlogCard({ title, date, excerpt, slug, tags = [] }: BlogCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="block group relative h-full"
    >
      <article className="relative h-full">
        {/* Main card container with glass effect */}
        <div className="relative h-full rounded-2xl glass-effect border border-foreground/10 p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl p-px animated-gradient">
            <div className="h-full w-full rounded-2xl bg-background/80"></div>
          </div>
        </div>

        {/* Content container */}
        <div className="relative flex flex-col gap-4 h-full">
          {/* Header with date and arrow */}
          <div className="flex items-center justify-between">
            <time className="relative text-sm font-medium text-foreground/60 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 rounded-full overflow-hidden">
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

            {/* Animated arrow icon */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
            </div>
          </div>

          {/* Title with enhanced gradient effect */}
          <h3 className="text-xl font-bold line-clamp-2 transition-all duration-300">
            <span className="relative group-hover:gradient-text">
              {title}
            </span>
          </h3>

          {/* Excerpt with better typography */}
          <p className="text-foreground/70 line-clamp-3 leading-relaxed flex-grow">
            {excerpt}
          </p>

          {/* Tags with enhanced design */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary) ${index * 20}%, var(--color-secondary) ${100 - index * 20}%)`,
                    opacity: 0.1,
                  }}
                >
                  <span className="relative z-10 gradient-text font-semibold">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 -translate-x-16 -translate-y-16 rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      </article>
    </Link>
  );
}
