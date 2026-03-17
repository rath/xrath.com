# Rath World - xrath.com

A personal blog and portfolio site built with Next.js.

## Overview

This is a bilingual personal homepage for a software developer. The site features a modern design, responsive layouts, and a comprehensive blog archive.

## Tech Stack

- **Framework**: Next.js 15.3.4 (App Router, Server Components, Turbopack)
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
- **Blog Archive** - Paginated listing (20 posts per page) at `/blogs`
- **Individual Blog Posts** - Dynamic routing with markdown rendering
- **Works/Portfolio Section** - iOS app showcase at `/works`
  - Featured Mouton Journal section with interactive screenshot gallery
  - Grid layout of 10 iOS apps with App Store links
  - Custom Open Graph image generation with app icons
  - Responsive design for mobile and desktop
- **Tag System** - Comprehensive tagging and filtering
  - 700+ posts automatically tagged using OpenAI `gpt-4.1-mini`
  - Dedicated tag pages at `/blogs/tags/[tag]`
  - Tag cloud component with size variation based on popularity
  - Tag filtering and browsing
  - Related tags discovery
- **Responsive Design** - Mobile-first approach
- **Korean Language Support** - Noto Sans KR font
- **Legacy Comments** - Preserved from WordPress migration
- **Advanced SEO**
  - JSON-LD structured data (Organization, Article, Breadcrumb schemas)
  - RSS 2.0 and Atom 1.0 feeds
  - Sitemap generation with 900+ URLs
  - OpenGraph and Twitter Card meta tags
  - Custom 404 page with content suggestions
  - Reading time estimates
  - Breadcrumb navigation
- **GitHub Flavored Markdown** - Tables and extended syntax
- **Search Functionality** - Full-text search for blog posts at `/blogs`
- **Emoji Support** - MSN-style emoticons in posts and comments
  - Supports :( :@ :$ (@) :'( (7) (&) (L) :| :p :P (H) :S ;)
  - Client-side rendering with inline images
- **Performance Optimizations**
  - Image optimization with lazy loading
  - Cache headers for static assets
  - Font preloading
  - Security headers

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with theme provider
│   │   ├── page.tsx      # Homepage
│   │   ├── not-found.tsx # Custom 404 page
│   │   ├── blogs/        # Blog archive page
│   │   │   └── tags/     # Tag pages
│   │   │       └── [tag]/ # Individual tag pages
│   │   ├── works/        # Portfolio/iOS apps page
│   │   ├── [...slug]/    # Dynamic blog post pages
│   │   └── img/          # Image serving route
│   ├── components/       # React components
│   │   ├── Header.tsx    # Navigation with theme switcher
│   │   ├── Hero.tsx      # Homepage hero section
│   │   ├── BlogCard.tsx  # Post preview cards
│   │   ├── TagCloud.tsx  # Tag cloud component
│   │   ├── SearchBar.tsx # Search functionality
│   │   ├── Breadcrumb.tsx # Breadcrumb navigation
│   │   ├── JsonLd.tsx    # Structured data component
│   │   ├── OptimizedImage.tsx # Image optimization
│   │   ├── MDXImage.tsx  # Markdown image component
│   │   ├── EmojiText.tsx # Emoji rendering component
│   │   ├── BlogPostContent.tsx # Blog post markdown renderer
│   │   ├── CommentContent.tsx # Comment markdown renderer
│   │   ├── MobileWorksGrid.tsx # iOS apps grid layout
│   │   └── ScreenshotsGallery.tsx # Interactive screenshot viewer
│   └── lib/             # Utility functions
│       ├── posts.ts      # Post data handling
│       ├── excerpt.ts    # Excerpt generation
│       ├── seo.ts        # SEO utilities
│       ├── emoji.ts      # Emoji mapping configuration
│       └── mobile-works-data.ts # iOS apps portfolio data
├── content/
│   ├── posts/           # Markdown blog posts (year/month structure)
│   └── images/          # Image resources for posts
├── public/              # Static assets
│   ├── robots.txt       # Search engine crawling rules
│   ├── sitemap.xml      # Generated sitemap
│   ├── feed.xml         # RSS feed
│   ├── atom.xml         # Atom feed
│   ├── emoticons/       # Emoji image assets
│   └── images/
│       └── works/       # iOS app icons and screenshots
├── scripts/             # Build and utility scripts
│   ├── generate-sitemap.js # Sitemap generation
│   ├── generate-feeds.js   # RSS/Atom feed generation
│   ├── generate-tags.js    # Automatic tag extraction using OpenAI
│   ├── README-tags.md      # Tag extraction documentation
│   ├── appstore-scraper.mjs # App Store data scraper
│   └── create-og-image.mjs # Open Graph image generator for Portfolio
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
tags: ["tag1", "tag2"]  # Tags for categorization and SEO
---

Post content in markdown...
```

## Development

### Prerequisites

- Node.js 18+
- bun

### Setup

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production (includes sitemap & feed generation)
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run generate-seo` - Manually generate sitemap and feeds

## Performance

Optimizations implemented:
- Static generation for all 900+ blog posts
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

All blog content © 2004-2026 by the Jang-Ho Hwang. Code is available under MIT license.
