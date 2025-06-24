#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://xrath.com';

// Get current date in W3C datetime format
const currentDate = new Date().toISOString();

// Define static pages with their priorities and change frequencies
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
  { loc: '/works', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
  { loc: '/blogs', priority: '0.8', changefreq: 'weekly', lastmod: currentDate }
];

// Extract frontmatter from markdown content
function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  });

  return frontmatter;
}

// Determine change frequency based on post age
function getChangeFreq(dateStr) {
  if (!dateStr) return 'monthly';

  const postDate = new Date(dateStr);
  const now = new Date();
  const yearDiff = now.getFullYear() - postDate.getFullYear();

  if (yearDiff >= 10) return 'yearly';
  if (yearDiff >= 5) return 'yearly';
  if (yearDiff >= 2) return 'monthly';
  if (yearDiff >= 1) return 'weekly';
  return 'weekly';
}

// Get priority based on post age
function getPriority(dateStr) {
  if (!dateStr) return '0.5';

  const postDate = new Date(dateStr);
  const now = new Date();
  const yearDiff = now.getFullYear() - postDate.getFullYear();

  if (yearDiff >= 10) return '0.3';
  if (yearDiff >= 5) return '0.4';
  if (yearDiff >= 2) return '0.5';
  if (yearDiff >= 1) return '0.6';
  return '0.7';
}

// Recursively read directory
function readDirRecursive(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readDirRecursive(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Get all blog posts
const contentDir = path.join(process.cwd(), 'content/posts');
const postFiles = readDirRecursive(contentDir);

// Generate blog post URLs from file paths
const blogPosts = postFiles.map(file => {
  // Read file content to extract frontmatter
  const content = fs.readFileSync(file, 'utf-8');
  const frontmatter = extractFrontmatter(content);

  // Remove absolute path prefix and .md/.mdx extension
  const relativePath = file
    .replace(contentDir + path.sep, '')
    .replace(/\.(md|mdx)$/, '')
    .split(path.sep)
    .join('/');

  // Use frontmatter date or fall back to file stats
  let lastmod = currentDate;
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    if (!isNaN(date.getTime())) {
      lastmod = date.toISOString();
    }
  }

  return {
    loc: encodeURI(`/${relativePath}`),
    lastmod: lastmod,
    priority: getPriority(frontmatter.date),
    changefreq: getChangeFreq(frontmatter.date)
  };
});

// Sort blog posts by path (year/month/title)
blogPosts.sort((a, b) => b.loc.localeCompare(a.loc));

// Combine all URLs
const allUrls = [...staticPages, ...blogPosts];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public directory
const outputPath = path.join(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
console.log(`   - ${staticPages.length} static pages`);
console.log(`   - ${blogPosts.length} blog posts`);
console.log(`   - Written to: ${outputPath}`);
