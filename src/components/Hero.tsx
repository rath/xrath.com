"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for animated background
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between close particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ opacity: 0.5 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pink-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading with animation */}
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl animate-fade-in">
            <span className="block relative">
              <span className="gradient-text text-balance">
                Rath World
              </span>
              {/* Decorative underline */}
              <svg
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2 text-primary/30"
                viewBox="0 0 100 10"
                fill="currentColor"
              >
                <path d="M0 5 Q 25 0, 50 5 T 100 5" strokeWidth="2" stroke="currentColor" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Subtitle with better styling */}
          <p className="mt-10 text-xl leading-relaxed text-foreground/70 sm:text-2xl max-w-3xl mx-auto animate-fade-in-up">
            A developer's reflections on building meaningful software
            <br className="hidden sm:inline" />
            in an <span className="relative">
              <span className="gradient-text font-semibold">ever-evolving digital landscape</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></span>
            </span>
          </p>

          {/* Enhanced CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <a
              href="/archive"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Animated background */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

              {/* Glass effect background */}
              <span className="absolute inset-0 glass-effect rounded-2xl"></span>

              {/* Border gradient */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-px">
                <span className="flex h-full w-full items-center justify-center rounded-2xl bg-background/80"></span>
              </span>

              {/* Content */}
              <span className="relative flex items-center text-foreground/80 group-hover:text-white transition-colors duration-300">
                Read Blog Archive
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="mx-auto h-6 w-6 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
