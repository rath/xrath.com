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
    <article className="group relative rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-6 card-hover">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <time className="text-sm font-medium text-foreground/60 bg-foreground/5 px-3 py-1 rounded-full">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <svg className="h-5 w-5 text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300 line-clamp-2">
          <Link href={`/blogs/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        
        <p className="text-foreground/70 line-clamp-3 leading-relaxed">{excerpt}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </article>
  );
}