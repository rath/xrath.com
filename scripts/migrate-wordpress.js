#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Helper function to decode HTML entities
function decodeHtmlEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n'); // Also handle <br> tags
}

// Helper function to process pre blocks
function processPreBlock(code, lang, preBlocks, preIndex) {
  const decodedCode = decodeHtmlEntities(code);
  const langSuffix = lang ? lang.trim() : '';
  preBlocks[preIndex] = `\n\n\`\`\`${langSuffix}\n${decodedCode.trim()}\n\`\`\`\n\n`;
  return `PRE_BLOCK_${preIndex}`;
}

// HTML to Markdown conversion (simplified)
function htmlToMarkdown(html) {
  // First normalize line endings to \n
  let processedHtml = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const preBlocks = [];
  let preIndex = 0;
  const blockquotes = [];
  let blockquoteIndex = 0;

  // Extract and preserve pre blocks with class="brush: language"
  // Match patterns like: <pre class="brush: bash"> or <pre class="brush:js">
  processedHtml = processedHtml.replace(/<pre\s+class=["']brush:\s*([^"']+)["'][^>]*>([\s\S]*?)<\/pre>/gi, (match, lang, code) => {
    const placeholder = processPreBlock(code, lang, preBlocks, preIndex);
    preIndex++;
    return placeholder;
  });

  // Also handle plain <pre> tags (without class attribute)
  processedHtml = processedHtml.replace(/<pre(?:\s+[^>]*)?>([\s\S]*?)<\/pre>/gi, (match, code) => {
    // Skip if already processed (contains placeholder)
    if (match.includes('PRE_BLOCK_')) {
      return match;
    }
    const placeholder = processPreBlock(code, null, preBlocks, preIndex);
    preIndex++;
    return placeholder;
  });

  // Extract and preserve blockquote blocks to handle nested content
  processedHtml = processedHtml.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
    const placeholder = `BLOCKQUOTE_${blockquoteIndex}`;
    // Decode HTML entities in blockquote content
    const decodedContent = decodeHtmlEntities(content)
      .replace(/<p[^>]*>/g, '\n\n')
      .replace(/<\/p>/g, '')
      .replace(/<[^>]+>/g, ''); // Remove remaining HTML tags
    
    blockquotes[blockquoteIndex] = `\n\n\`\`\`\n${decodedContent.trim()}\n\`\`\`\n\n`;
    blockquoteIndex++;
    return placeholder;
  });
  
  // Convert the rest of the HTML
  let markdown = processedHtml
    // Remove style attributes
    .replace(/\sstyle="[^"]*"/g, '')
    // Convert paragraphs
    .replace(/<p[^>]*>/g, '\n\n')
    .replace(/<\/p>/g, '')
    // Convert images - must come before removing all tags
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '\n\n![$2]($1)\n\n')
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/gi, '\n\n![]($1)\n\n')
    // Convert links
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
    // Convert bold
    .replace(/<strong[^>]*>([^<]+)<\/strong>/g, '**$1**')
    .replace(/<b[^>]*>([^<]+)<\/b>/g, '**$1**')
    // Convert italic
    .replace(/<em[^>]*>([^<]+)<\/em>/g, '*$1*')
    .replace(/<i[^>]*>([^<]+)<\/i>/g, '*$1*')
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
  
  // Restore blockquotes
  for (let i = 0; i < blockquotes.length; i++) {
    markdown = markdown.replace(`BLOCKQUOTE_${i}`, blockquotes[i]);
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

const INPUT_JSON_PATH = path.join(__dirname, './wp_posts.json');
const OUTPUT_POSTS_DIR = path.join(__dirname, '../content/posts');

async function migrate() {
  try {
    // Read the JSON file
    const jsonData = await fs.readFile(INPUT_JSON_PATH, 'utf-8');
    const posts = JSON.parse(jsonData);
    
    console.log(`Found ${posts.length} posts to migrate`);
    
    // Create content/posts directory if it doesn't exist
    await fs.mkdir(OUTPUT_POSTS_DIR, { recursive: true });
    
    // Process each post
    for (const post of posts) {
      // Extract year and month from name
      const pathParts = post.name.split('/');
      const year = pathParts[0];
      const month = pathParts[1];
      const slug = extractSlug(post.name);
      
      // Create directory structure
      const postDir = path.join(OUTPUT_POSTS_DIR, year, month);
      await fs.mkdir(postDir, { recursive: true });
      
      // Convert content to markdown
      const markdownContent = htmlToMarkdown(post.content);
      
      // Process comments if they exist
      let commentsSection = '';
      if (post.comments && post.comments.length > 0) {
        commentsSection = '\n\n## Comments\n\n';
        for (const comment of post.comments) {
          const commentDate = new Date(comment.created + ' GMT').toISOString();
          const commentContent = htmlToMarkdown(comment.content);
          commentsSection += `### ${comment.author}\n`;
          if (comment.author_url) {
            commentsSection += `*${comment.author_url}*\n`;
          }
          commentsSection += `*${commentDate}*\n\n`;
          commentsSection += `${commentContent}\n\n`;
          commentsSection += '---\n\n';
        }
      }
      
      // Create markdown file content with frontmatter
      const fileContent = `---
title: "${post.title}"
date: ${formatDate(post.created)}
slug: ${year}/${month}/${slug}
lang: ko
---

${markdownContent}${commentsSection}`;
      
      // Write the file
      const fileName = `${slug}.md`;
      const filePath = path.join(postDir, fileName);
      await fs.writeFile(filePath, fileContent, 'utf-8');
      
      console.log(`✓ Migrated: ${year}/${month}/${slug}${post.comments ? ` (${post.comments.length} comments)` : ''}`);
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
