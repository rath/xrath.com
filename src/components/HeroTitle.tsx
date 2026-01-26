"use client";

export default function HeroTitle() {
  return (
    <div className="relative select-none">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
        <span
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Rath World
        </span>
      </h1>

      <p className="mt-6 text-xl leading-relaxed text-foreground/60 sm:text-2xl max-w-2xl mx-auto">
        A developer&apos;s reflections on building meaningful software
        <br className="hidden sm:inline" />
        in an ever-evolving digital landscape
      </p>
    </div>
  );
}
