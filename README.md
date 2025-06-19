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

## Features

### Implemented ✅

- **Homepage** - Hero section with latest 6 blog posts
- **Archive** - Paginated listing (20 posts per page) at `/archive`
- **Individual Blog Posts** - Dynamic routing with markdown rendering
- **Responsive Design** - Mobile-first approach
- **Korean Language Support** - Noto Sans KR font
- **Legacy Comments** - Preserved from WordPress migration
- **SEO** - Basic meta tags and Open Graph support
- **GitHub Flavored Markdown** - Tables and extended syntax

### Planned 🚧

- Internationalization (EN/KR language toggle)
- Search functionality for blog posts
- Tag/category filtering
- Portfolio/Work section
- OG image generation per post
- Performance optimizations (Lighthouse score ≥90)
- AWS deployment configuration

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with theme provider
│   │   ├── page.tsx      # Homepage
│   │   ├── archive/      # Blog archive page
│   │   └── [...slug]/    # Dynamic blog post pages
│   └── components/       # React components
│       ├── Header.tsx    # Navigation with theme switcher
│       ├── Hero.tsx      # Homepage hero section
│       ├── BlogCard.tsx  # Post preview cards
│       └── ...
├── content/
│   └── posts/           # Markdown blog posts (year/month structure)
│   └── images/          # Image resources for posts
├── public/              # Static assets
├── scripts/             # Migration and utility scripts
└── next.config.ts       # Next.js configuration
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
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Performance

Target metrics (pending optimization):
- Lighthouse Performance: ≥90
- Lighthouse SEO: ≥90
- Lighthouse Best Practices: ≥90
- Static generation for all blog posts

## Contributing

This is a personal project, but suggestions and bug reports are welcome via GitHub issues.

## License

All blog content © 2004-2025 by the Jang-Ho Hwang. Code is available under MIT license.
