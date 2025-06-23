# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal homepage for a software developer, replacing a legacy WordPress site. The project uses Next.js 15 with React 19, deployed on AWS EC2.

**Current Status**: Core functionality implemented with advanced SEO, comprehensive tagging system, and iOS app portfolio. All 700+ posts have been automatically tagged using OpenAI GPT. Works section features 10 iOS apps with Mouton Journal highlighted.

## Technology Stack

- **Framework**: Next.js 15 (App Router, Server Components, Turbopack)
- **Language**: TypeScript
- **Internationalization**: Planned with next-intl 4 (English default, Korean optional)
- **Content**: Markdown with gray-matter for frontmatter parsing
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography
- **SEO**: JSON-LD structured data, RSS/Atom feeds, sitemap generation
- **Performance**: Image optimization, caching headers, lazy loading
- **Deployment**: AWS EC2 with Nginx + Docker

## Project Structure

```
/
├─ src/                # Next.js app directory
│  ├─ app/             # App router pages
│  ├─ components/      # React components
│  └─ lib/             # Utility functions (posts, excerpt, seo)
├─ public/             # Static assets & generated files
│  ├─ robots.txt       # SEO crawling rules
│  ├─ sitemap.xml      # Generated sitemap (760+ URLs)
│  ├─ feed.xml         # RSS 2.0 feed
│  └─ atom.xml         # Atom 1.0 feed
├─ content/            # Markdown posts
│  ├─ posts/           # Year/month directory structure
│  └─ images/          # Post images
├─ scripts/            # Build scripts
│  ├─ generate-sitemap.js
│  ├─ generate-feeds.js
│  ├─ generate-tags.js     # Tag extraction with OpenAI
│  ├─ appstore-scraper.mjs # App Store data scraper
│  └─ create-og-image.mjs  # Open Graph image generator for Portfolio
├─ package.json        # Dependencies
└─ next.config.ts      # Next.js config with optimization settings
```

**Note**: This is a standard Next.js project structure with additional directories for content management and uploads.

## Architecture & Key Patterns

### 1. Content Management
- All content in Markdown format (700+ posts migrated from WordPress)
- Posts stored in `/content/posts/` with frontmatter:
  ```yaml
  ---
  title: "Post title"
  date: 2025-06-18
  slug: post-title
  lang: en
  tags: ["technology", "programming"]  # Required - all posts are tagged
  ---
  ```
- Type-safe post handling with TypeScript interfaces
- react-markdown with GitHub Flavored Markdown support

### 2. Page Structure
- `/` - Homepage with latest 6 posts
- `/blogs` - Paginated blog listing (20 posts/page) with tag browsing
- `/blogs/tags/[tag]` - Individual tag pages with related tags
- `/works` - Portfolio page showcasing iOS apps
- `/[...slug]` - Dynamic blog post pages with comments and tags
- `/not-found` - Custom 404 page with content suggestions
- `/img/[...path]` - Legacy image serving route

### 3. Design System
- Max width: `max-w-screen-lg mx-auto px-4`
- Colors: Light `#fafafa`, Dark `#1a1a1a`, Accent `indigo-600`
- Typography: `text-2xl` headers, `leading-relaxed` body
- Dark mode support throughout
- Responsive grid layouts
- Accessibility with ARIA labels

### 4. Performance & SEO
- Static generation for all 760+ blog posts
- Lighthouse scores target ≥90 across all metrics
- Comprehensive SEO implementation:
  - JSON-LD structured data (Organization, Article, Breadcrumb)
  - RSS 2.0 and Atom 1.0 feeds
  - XML sitemap with priorities and change frequencies
  - OpenGraph and Twitter Card meta tags
  - Reading time estimates
  - Breadcrumb navigation
- Image optimization:
  - Next.js Image component with lazy loading
  - WebP and AVIF format support
  - Responsive image sizes
- Caching strategy:
  - Static assets: 1 year cache
  - Feeds & sitemap: 1 hour cache with stale-while-revalidate
  - Security headers for all responses

## Key Implementation Notes

1. **Server Components First**: Use React Server Components by default, client components only when needed for interactivity
2. **Type Safety**: Full TypeScript coverage with strict type checking
3. **SEO Excellence**: 
   - Structured data for rich snippets
   - Automated sitemap and feed generation on build
   - Custom meta tags per page type
   - robots.txt with crawler-specific rules
4. **Build Process**: 
   - `npm run build` automatically generates sitemap and feeds
   - `npm run generate-seo` for manual SEO asset generation
5. **Error Handling**: Custom 404 page with related content suggestions
6. **Performance**: Optimized images, fonts, and caching headers

## Recent Updates

- ✅ Implemented comprehensive SEO with structured data
- ✅ Added RSS/Atom feed generation
- ✅ Created optimized image components
- ✅ Configured caching and security headers
- ✅ Built custom 404 page
- ✅ Fixed TypeScript build errors
- ✅ Added emoji support for blog posts and comments
- ✅ Implemented comprehensive tag system
  - Automatic tag extraction for 700+ posts using OpenAI GPT
  - Dedicated tag pages at `/blogs/tags/[tag]`
  - Tag cloud component with popularity-based sizing
  - Enhanced UI with glass-morphism effects
  - Related tags discovery
- ✅ Created Works/Portfolio page (`/works`) showcasing iOS apps
  - Featured Mouton Journal section with technical details
  - Interactive screenshot gallery with modal viewer
  - Grid layout of 10 iOS apps with metadata
  - Custom Open Graph image generation script
  - App Store data scraper for automation

## Tag System Implementation

The tag system uses OpenAI GPT to automatically categorize posts into 4 main categories:
1. **Technology** - programming languages, frameworks, tools
2. **Daily Life** - work experiences, entertainment, personal events  
3. **Thoughts** - philosophy, self-improvement, reflections
4. **Quotes/Culture** - quotes, cultural references, humor

Key implementation details:
- Tags are stored in post frontmatter as an array of strings
- `getAllTags()` function returns all unique tags with post counts
- Tag pages show related tags based on co-occurrence
- Search functionality includes tag content
- Tag URLs follow pattern: `/blogs/tags/[tag]`

## Works Page Implementation

The Works page showcases a portfolio of iOS applications with a featured section for Mouton Journal:

### Key Components:
1. **MobileWorksGrid** - Responsive grid layout for app cards
2. **ScreenshotsGallery** - Interactive image viewer with modal dialog
3. **mobile-works-data.ts** - Centralized data for all iOS apps

### Open Graph Image Generation:
- `create-og-image.mjs` script generates a composite image with app icons
- Uses Sharp library for image processing
- Creates a 1200x630 image with:
  - Custom background with app screenshots
  - Left-aligned title card with 40% opacity
  - 3x3 grid of app icons with rounded borders
  - Optimized for social media sharing

### App Store Integration:
- `appstore-scraper.mjs` fetches current app data from App Store
- Updates release dates and version information automatically
- Uses Cheerio for HTML parsing

## Known Issues & Solutions

### ReactMarkdown className Error
**Issue**: ReactMarkdown v9+ no longer accepts `className` prop directly, causing assertion errors.

**Solution**: 
1. Wrap ReactMarkdown in a div element that receives the className
2. Do not spread props in component overrides that might contain className
3. Explicitly destructure and ignore className in custom components if needed

**Example**:
```tsx
// ❌ Wrong
<ReactMarkdown className="prose" />

// ✅ Correct
<div className="prose">
  <ReactMarkdown />
</div>
```

