#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// HTML to Markdown conversion (simplified)
function htmlToMarkdown(html) {
  // First normalize line endings to \n
  let processedHtml = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const preBlocks = [];
  let preIndex = 0;
  
  // Extract and preserve pre blocks with class="brush: language"
  // Match patterns like: <pre class="brush: bash"> or <pre class="brush:js">
  processedHtml = processedHtml.replace(/<pre\s+class=["']brush:\s*([^"']+)["'][^>]*>([\s\S]*?)<\/pre>/gi, (match, lang, code) => {
    console.log(`Found pre block with language: ${lang}`);
    const placeholder = `PRE_BLOCK_${preIndex}`;
    // Decode HTML entities in code blocks
    const decodedCode = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/<br\s*\/?>/gi, '\n'); // Also handle <br> tags in code
    
    preBlocks[preIndex] = `\n\n\`\`\`${lang.trim()}\n${decodedCode.trim()}\n\`\`\`\n\n`;
    preIndex++;
    return placeholder;
  });
  
  // Also handle plain <pre> tags (without class attribute)
  processedHtml = processedHtml.replace(/<pre(?:\s+[^>]*)?>([\s\S]*?)<\/pre>/gi, (match, code) => {
    // Skip if already processed (contains placeholder)
    if (match.includes('PRE_BLOCK_')) {
      return match;
    }
    
    const placeholder = `PRE_BLOCK_${preIndex}`;
    // Decode HTML entities in code blocks
    const decodedCode = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/<br\s*\/?>/gi, '\n'); // Also handle <br> tags in code
    
    preBlocks[preIndex] = `\n\n\`\`\`\n${decodedCode.trim()}\n\`\`\`\n\n`;
    preIndex++;
    return placeholder;
  });
  
  // Convert the rest of the HTML
  let markdown = processedHtml
    // Remove style attributes
    .replace(/\sstyle="[^"]*"/g, '')
    // Convert paragraphs
    .replace(/<p[^>]*>/g, '\n\n')
    .replace(/<\/p>/g, '')
    // Convert links
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
    // Convert bold
    .replace(/<strong[^>]*>([^<]+)<\/strong>/g, '**$1**')
    .replace(/<b[^>]*>([^<]+)<\/b>/g, '**$1**')
    // Convert italic
    .replace(/<em[^>]*>([^<]+)<\/em>/g, '*$1*')
    .replace(/<i[^>]*>([^<]+)<\/i>/g, '*$1*')
    // Convert blockquotes
    .replace(/<blockquote[^>]*>/g, '\n\n> ')
    .replace(/<\/blockquote>/g, '\n\n')
    // Convert line breaks
    .replace(/<br\s*\/?>/g, '\n')
    // Convert headers
    .replace(/<h1[^>]*>([^<]+)<\/h1>/g, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([^<]+)<\/h2>/g, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([^<]+)<\/h3>/g, '\n\n### $1\n\n')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // Restore pre blocks
  for (let i = 0; i < preBlocks.length; i++) {
    markdown = markdown.replace(`PRE_BLOCK_${i}`, preBlocks[i]);
  }
  
  return markdown;
}

// Extract slug from WordPress name field
function extractSlug(name) {
  // Remove date prefix and decode URL encoding
  const parts = name.split('/');
  const slugPart = parts[parts.length - 1];
  return decodeURIComponent(slugPart);
}

// Format date for frontmatter
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

async function migrate() {
  try {
    // Read the JSON file
    const jsonData = await fs.readFile(path.join(__dirname, '../tmp/published_posts.json'), 'utf-8');
    const posts = JSON.parse(jsonData);
    
    console.log(`Found ${posts.length} posts to migrate`);
    
    // Create content/posts directory if it doesn't exist
    const contentDir = path.join(__dirname, '../content/posts');
    await fs.mkdir(contentDir, { recursive: true });
    
    // Process each post
    for (const post of posts) {
      // Extract year and month from name
      const pathParts = post.name.split('/');
      const year = pathParts[0];
      const month = pathParts[1];
      const slug = extractSlug(post.name);
      
      // Create directory structure
      const postDir = path.join(contentDir, year, month);
      await fs.mkdir(postDir, { recursive: true });
      
      // Convert content to markdown
      const markdownContent = htmlToMarkdown(post.content);
      
      // Create markdown file content with frontmatter
      const fileContent = `---
title: "${post.title}"
date: ${formatDate(post.created)}
slug: ${year}/${month}/${slug}
lang: ko
---

${markdownContent}

---
`;
      
      // Write the file
      const fileName = `${slug}.md`;
      const filePath = path.join(postDir, fileName);
      await fs.writeFile(filePath, fileContent, 'utf-8');
      
      console.log(`✓ Migrated: ${year}/${month}/${slug}`);
    }
    
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Export for testing
module.exports = { htmlToMarkdown };

// Run migration only if called directly
if (require.main === module) {
  migrate();
}
