import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import TagCloud from "@/components/TagCloud";
import { getLatestPosts, getAllTags } from "@/lib/posts";
import { generateExcerpt } from "@/lib/excerpt";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(6);
  const allTags = await getAllTags();
  return (
    <>
      <Hero />

      <section className="relative py-20 sm:py-32">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="gradient-text">Latest Posts</span>
              </h2>
              <p className="mt-2 text-lg text-foreground/70">
                Reflection, Self-awareness, and Thoughts
              </p>
              {/* Decorative accent */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-50"></div>
            </div>
            <a
              href="/archive"
              className="group relative inline-flex items-center text-sm font-medium overflow-hidden rounded-lg px-4 py-2 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center text-foreground/80 group-hover:text-foreground">
                View all posts
                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {await Promise.all(latestPosts.map(async (post, index) => {
              const excerpt = await generateExcerpt(post.content, 150);
              return (
                <div
                  key={post.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BlogCard
                    title={post.title}
                    date={post.date}
                    excerpt={excerpt}
                    slug={post.slug}
                  />
                </div>
              );
            }))}
          </div>
        </div>
      </section>

      {/* Tag Cloud Section */}
      {allTags.length > 0 && (
        <section className="relative py-20 sm:py-32">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
          </div>

          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <TagCloud tags={allTags} limit={20} />
          </div>
        </section>
      )}

      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/20 rotate-45 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg rotate-12 animate-glow"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg -rotate-12 animate-glow" style={{ animationDelay: "1.5s" }}></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated heading */}
            <h2 className="text-3xl font-bold sm:text-4xl mb-6 animate-fade-in">
              <span className="inline-block">Code,</span>{' '}
              <span className="inline-block animate-float" style={{ animationDelay: "0.2s" }}>Create,</span>{' '}
              <span className="inline-block gradient-text animate-glow">Connect</span>
            </h2>
            
            {/* Enhanced description */}
            <div className="relative max-w-2xl mx-auto mb-10">
              <p className="text-xl text-foreground/70 animate-fade-in-up">
                Take a look at the iPhone apps and projects I've developed
                to get a better sense of who I am as a person and a developer.
              </p>
              {/* Decorative lines */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-transparent to-primary/50"></div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-l from-transparent to-secondary/50"></div>
            </div>
            
            {/* CTA with glassmorphism effect */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a
                href="/portfolio"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 glass-effect"
              >
                {/* Animated gradient border */}
                <span className="absolute inset-0 rounded-2xl p-px">
                  <span className="absolute inset-0 rounded-2xl animated-gradient opacity-50"></span>
                  <span className="absolute inset-0 rounded-2xl bg-background/90"></span>
                </span>
                
                {/* Content */}
                <span className="relative flex items-center">
                  Explore My Work
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
