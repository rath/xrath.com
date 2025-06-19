export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-500/8 rounded-full"></div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading with gradient */}
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block gradient-text text-balance">
              Building bridges between ideas
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-xl leading-relaxed text-foreground/70 sm:text-2xl max-w-3xl mx-auto">
            Building digital experiences that feel inevitable—
            <br className="hidden sm:inline" />
            as if they had always existed, waiting to be <span className="gradient-text font-semibold">discovered</span>
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/blogs"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground/80 hover:text-foreground border-2 border-foreground/20 hover:border-foreground/40 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Read Blog Archives
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Philosophy showcase */}
          <div className="mt-16">
            <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-6">
              Current Interests
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {['AI & Creativity', 'Human-Computer Interaction', 'Distributed Systems', 'Mobile Innovation', 'Digital Philosophy'].map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur text-foreground/80 border border-white/20 hover:bg-white/20 transition-colors duration-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
