import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { getLatestPosts } from "@/lib/posts";
import { generateExcerpt } from "@/lib/excerpt";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(4);
  return (
    <>
      <Hero />

      {/* Latest Posts Section - Bento Grid */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Latest Posts
                </span>
              </h2>
              <p className="mt-2 text-lg text-foreground/60">
                Reflection, Self-awareness, and Thoughts
              </p>
            </div>
            <a
              href="/blogs"
              className="group inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              View all posts
              <svg
                className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
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
            </a>
          </div>

          {/* Bento Grid Layout */}
          <div
            className="gap-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "minmax(200px, auto)",
            }}
          >
            {await Promise.all(
              latestPosts.slice(0, 3).map(async (post, index) => {
                const excerpt = await generateExcerpt(post.content, index === 0 ? 300 : 120);
                const isFeatured = index === 0;

                if (isFeatured) {
                  return (
                    <div
                      key={post.slug}
                      style={{
                        gridColumn: "span 7",
                        gridRow: "span 2",
                      }}
                    >
                      <BlogCard
                        title={post.title}
                        date={post.date}
                        excerpt={excerpt}
                        slug={post.slug}
                        index={index}
                        featured={true}
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={post.slug}
                    style={{
                      gridColumn: "span 5",
                    }}
                  >
                    <BlogCard
                      title={post.title}
                      date={post.date}
                      excerpt={excerpt}
                      slug={post.slug}
                      index={index}
                      featured={false}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Minimal */}
      <section className="relative py-24 sm:py-32">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#8b5cf6]/[0.03] to-transparent"></div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Explore </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                My Work
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-foreground/60 mb-10 leading-relaxed">
              Check out the iOS apps and projects I&apos;ve built over the years.
              Each one reflects my journey as a developer.
            </p>

            {/* CTA Button */}
            <a
              href="/works"
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)",
                color: "white",
              }}
            >
              View Portfolio
              <svg
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
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
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
