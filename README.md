# Rath World - xrath.com

A personal blog and portfolio site built with Next.js, featuring 700+ posts migrated from WordPress (2004-2015).

## Overview

This is a bilingual personal homepage for a software developer. The site features a modern design, responsive layouts, and a comprehensive blog archive.

## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router, Server Components, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography
- **Content**: Markdown files with gray-matter for frontmatter parsing
- **Markdown Rendering**: react-markdown with GitHub Flavored Markdown support
- **Font**: Inter & Noto Sans KR (Google Fonts)
- **SEO**: JSON-LD structured data, RSS/Atom feeds, sitemap generation
- **Image Optimization**: Next.js Image with WebP/AVIF support

## Features

### Implemented ✅

- **Homepage** - Hero section with latest 6 blog posts
- **Archive** - Paginated listing (20 posts per page) at `/archive`
- **Individual Blog Posts** - Dynamic routing with markdown rendering
- **Responsive Design** - Mobile-first approach
- **Korean Language Support** - Noto Sans KR font
- **Legacy Comments** - Preserved from WordPress migration
- **Advanced SEO**
  - JSON-LD structured data (Organization, Article, Breadcrumb schemas)
  - RSS 2.0 and Atom 1.0 feeds
  - Sitemap generation with 760+ URLs
  - OpenGraph and Twitter Card meta tags
  - Custom 404 page with content suggestions
  - Reading time estimates
  - Breadcrumb navigation
- **GitHub Flavored Markdown** - Tables and extended syntax
- **Performance Optimizations**
  - Image optimization with lazy loading
  - Cache headers for static assets
  - Font preloading
  - Security headers

### Planned 🚧

- Search functionality for blog posts
- Tag/category filtering
- Portfolio/Work section

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with theme provider
│   │   ├── page.tsx      # Homepage
│   │   ├── not-found.tsx # Custom 404 page
│   │   ├── archive/      # Blog archive page
│   │   ├── [...slug]/    # Dynamic blog post pages
│   │   └── img/          # Image serving route
│   ├── components/       # React components
│   │   ├── Header.tsx    # Navigation with theme switcher
│   │   ├── Hero.tsx      # Homepage hero section
│   │   ├── BlogCard.tsx  # Post preview cards
│   │   ├── Breadcrumb.tsx # Breadcrumb navigation
│   │   ├── JsonLd.tsx    # Structured data component
│   │   ├── OptimizedImage.tsx # Image optimization
│   │   └── MDXImage.tsx  # Markdown image component
│   └── lib/             # Utility functions
│       ├── posts.ts      # Post data handling
│       ├── excerpt.ts    # Excerpt generation
│       └── seo.ts        # SEO utilities
├── content/
│   ├── posts/           # Markdown blog posts (year/month structure)
│   └── images/          # Image resources for posts
├── public/              # Static assets
│   ├── robots.txt       # Search engine crawling rules
│   ├── sitemap.xml      # Generated sitemap
│   ├── feed.xml         # RSS feed
│   └── atom.xml         # Atom feed
├── scripts/             # Build and utility scripts
│   ├── generate-sitemap.js # Sitemap generation
│   └── generate-feeds.js   # RSS/Atom feed generation
└── next.config.ts       # Next.js configuration with caching headers
```

## Content Structure

Blog posts are stored in `/content/posts/` with the following structure:

```
content/posts/
├── 2004/
│   ├── 07/
│   │   └── post-slug.md
├── 2005/
│   └── ...
└── 2015/
```

Each post uses frontmatter:

```markdown
---
title: "Post Title"
date: 2025-06-18
slug: post-slug
lang: en
tags: [tag1, tag2]  # Optional tags for SEO
---

Post content in markdown...
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (includes sitemap & feed generation)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-seo` - Manually generate sitemap and feeds

## Performance

Optimizations implemented:
- Static generation for all 760+ blog posts
- Image optimization with lazy loading and WebP/AVIF formats
- Font preloading for Inter and Noto Sans KR
- Cache headers for static assets (1 year)
- Structured data for better SEO
- Optimized bundle size with dynamic imports

Target metrics:
- Lighthouse Performance: ≥90
- Lighthouse SEO: ≥90
- Lighthouse Best Practices: ≥90
- Lighthouse Accessibility: ≥90

## Contributing

This is a personal project, but suggestions and bug reports are welcome via GitHub issues.

## License

All blog content © 2004-2025 by the Jang-Ho Hwang. Code is available under MIT license.
