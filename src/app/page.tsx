import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { getLatestPosts } from "@/lib/posts";
import { generateExcerpt } from "@/lib/excerpt";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(6);
  return (
    <>
      <Hero />
      
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl gradient-text">Latest Insights</h2>
              <p className="mt-2 text-lg text-foreground/70">Thoughts on technology, development, and innovation</p>
            </div>
            <a
              href="/blogs"
              className="group inline-flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              View all posts
              <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {await Promise.all(latestPosts.map(async (post) => {
              const excerpt = await generateExcerpt(post.content, 150);
              return (
                <BlogCard 
                  key={post.slug} 
                  title={post.title}
                  date={post.date}
                  excerpt={excerpt}
                  slug={post.slug}
                />
              );
            }))}
          </div>
        </div>
      </section>
      
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              Thoughts in <span className="gradient-text">motion</span>
            </h2>
            <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
              Ideas evolve through dialogue. If something here resonates with you, 
              or if you see connections I've missed, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/portfolio"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-foreground/80 hover:text-foreground border-2 border-foreground/20 hover:border-foreground/40 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                Explore My Work
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}