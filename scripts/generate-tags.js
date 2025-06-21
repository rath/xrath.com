#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const OpenAI = require('openai');

// Configuration
const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const BATCH_SIZE = 20;
const DELAY_MS = 1000; // Delay between API calls to avoid rate limits

// Initialize OpenAI client (you'll need to set OPENAI_API_KEY environment variable)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Tag categories for better organization
const TAG_CATEGORIES = {
  technology: [
    'programming', 'java', 'javascript', 'python', 'web-development',
    'asp', 'jsp', 'html', 'css', 'react', 'nextjs', 'nodejs',
    'database', 'oracle', 'mysql', 'linux', 'docker', 'aws', 'nginx',
    'mobile', 'android', 'ios', 'api', 'git', 'devops', 'security',
    'performance', 'debugging', 'testing', 'ai', 'llm', 'machine-learning'
  ],
  dailyLife: [
    'work-life', 'interview', 'career', 'company', 'freelance',
    'personal-growth', 'habits', 'health', 'exercise', 'quit-smoking',
    'entertainment', 'movies', 'music', 'games', 'books',
    'food', 'drinks', 'coffee', 'travel', 'places', 'events'
  ],
  thoughts: [
    'life-reflections', 'philosophy', 'self-improvement', 'motivation',
    'relationships', 'friendship', 'family', 'love', 'emotions',
    'writing', 'creativity', 'productivity', 'goals', 'dreams'
  ],
  quotes: [
    'quotes', 'movie-quotes', 'book-quotes', 'humor', 'jokes',
    'culture', 'korean-culture', 'references', 'memes'
  ]
};

// Master tag list for normalization
const MASTER_TAGS = new Set([
  ...TAG_CATEGORIES.technology,
  ...TAG_CATEGORIES.dailyLife,
  ...TAG_CATEGORIES.thoughts,
  ...TAG_CATEGORIES.quotes
]);

// Tag normalization map
const TAG_NORMALIZATION = {
  'java': ['java', 'jdk', 'jvm', 'j2se', 'j2ee'],
  'javascript': ['javascript', 'js', 'es6', 'es5'],
  'programming': ['programming', 'coding', 'development', 'software'],
  'web-development': ['web', 'website', 'web-dev', 'webdev'],
  'self-improvement': ['self-improvement', 'self-help', 'personal-development'],
  'work-life': ['work', 'job', 'office', 'workplace'],
};

async function getAllMarkdownFiles(dir) {
  const files = [];
  
  async function scanDirectory(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  await scanDirectory(dir);
  return files;
}

async function extractTagsWithLLM(posts) {
  const postsContent = posts.map(post => {
    // Limit content to first 1500 characters to save tokens
    const truncatedContent = post.content.substring(0, 1500);
    return `
Post ${posts.indexOf(post) + 1}:
Title: ${post.title}
Date: ${post.date}
Content: ${truncatedContent}
---
`;
  }).join('\n');

  const prompt = `You are a blog post tagging system. Analyze the following blog posts and generate 2-4 relevant English tags for each post.

Tag Categories to consider:
1. Technology: programming languages, frameworks, tools, concepts
2. Daily Life: work, personal experiences, entertainment, food, travel
3. Thoughts: philosophy, self-improvement, reflections, emotions
4. Quotes/Culture: quotes, cultural references, humor

Guidelines:
- Output only English tags, even if the content is in Korean
- Use lowercase, hyphenated format (e.g., "web-development", not "Web Development")
- Be specific but not too granular
- Focus on the main themes and topics

Response format:
- return a JSON array for each post:
[
  ["tag1", "tag2", "tag3", "tag4"], // Post 1
  ["tag1", "tag2"], // Post 2
  ...
]

${postsContent}
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content tagger that generates relevant tags for blog posts.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

function normalizeTags(tags) {
  const normalized = new Set();
  
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase().trim();
    
    // Check if tag should be normalized to a master tag
    let normalizedTag = lowerTag;
    for (const [master, variants] of Object.entries(TAG_NORMALIZATION)) {
      if (variants.includes(lowerTag)) {
        normalizedTag = master;
        break;
      }
    }
    
    // Only add if it's in our master list or seems reasonable
    if (MASTER_TAGS.has(normalizedTag) || normalizedTag.length > 2) {
      normalized.add(normalizedTag);
    }
  }
  
  return Array.from(normalized).slice(0, 8); // Limit to 8 tags
}

async function updatePostWithTags(filePath, tags) {
  const content = await fs.readFile(filePath, 'utf8');
  const { data, content: postContent } = matter(content);
  
  // Skip if tags already exist and are not empty
  if (data.tags && data.tags.length > 0) {
    console.log(`Skipping ${filePath} - tags already exist`);
    return false;
  }
  
  // Update frontmatter with tags
  data.tags = tags;
  
  // Rebuild the file content with proper formatting
  // Ensure title is quoted if it contains special characters
  const frontmatterLines = ['---'];
  
  // Add title with quotes
  if (data.title) {
    frontmatterLines.push(`title: "${data.title.replace(/"/g, '\\"')}"`);
  }
  
  // Add other fields
  if (data.date) {
    frontmatterLines.push(`date: ${data.date}`);
  }
  
  if (data.slug) {
    frontmatterLines.push(`slug: ${data.slug}`);
  }
  
  if (data.lang) {
    frontmatterLines.push(`lang: ${data.lang}`);
  }
  
  // Add tags
  if (tags && tags.length > 0) {
    frontmatterLines.push(`tags: [${tags.map(tag => `"${tag}"`).join(', ')}]`);
  }
  
  // Add any other fields that might exist
  for (const [key, value] of Object.entries(data)) {
    if (!['title', 'date', 'slug', 'lang', 'tags'].includes(key)) {
      if (typeof value === 'string') {
        frontmatterLines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        frontmatterLines.push(`${key}: ${JSON.stringify(value)}`);
      }
    }
  }
  
  frontmatterLines.push('---');
  
  // Combine frontmatter and content
  const newContent = frontmatterLines.join('\n') + '\n\n' + postContent.trim() + '\n';
  await fs.writeFile(filePath, newContent);
  
  return true;
}

async function processPosts(dryRun = false) {
  console.log('Starting tag generation process...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    console.log('Please set it using: export OPENAI_API_KEY="your-api-key"');
    process.exit(1);
  }
  
  // Get all markdown files
  const files = await getAllMarkdownFiles(POSTS_DIR);
  console.log(`Found ${files.length} markdown files`);
  
  // Process in batches
  let processedCount = 0;
  let updatedCount = 0;
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const posts = [];
    
    // Read posts in batch
    for (const file of batch) {
      const content = await fs.readFile(file, 'utf8');
      const { data, content: postContent } = matter(content);
      
      // Skip if already has tags
      if (data.tags && data.tags.length > 0) {
        continue;
      }
      
      posts.push({
        file,
        title: data.title || '',
        date: data.date || '',
        content: postContent,
        lang: data.lang || 'ko'
      });
    }
    
    if (posts.length === 0) {
      console.log(`Batch ${i / BATCH_SIZE + 1}: All posts already have tags, skipping...`);
      continue;
    }
    
    console.log(`Processing batch ${i / BATCH_SIZE + 1} (${posts.length} posts)...`);
    
    try {
      // Get tags from LLM
      const tagsBatch = await extractTagsWithLLM(posts);
      
      // Update posts with tags
      for (let j = 0; j < posts.length; j++) {
        const post = posts[j];
        const tags = normalizeTags(tagsBatch[j] || []);
        
        console.log(`${post.title}: ${tags.join(', ')}`);
        
        if (!dryRun) {
          const updated = await updatePostWithTags(post.file, tags);
          if (updated) updatedCount++;
        }
      }
      
      processedCount += posts.length;
      
      // Delay between batches to avoid rate limits
      if (i + BATCH_SIZE < files.length) {
        console.log(`Waiting ${DELAY_MS}ms before next batch...`);
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    } catch (error) {
      console.error(`Error processing batch ${i / BATCH_SIZE + 1}:`, error);
      // Continue with next batch instead of stopping
    }
  }
  
  console.log(`\nProcessing complete!`);
  console.log(`Total files: ${files.length}`);
  console.log(`Processed: ${processedCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Skipped (already had tags): ${files.length - processedCount}`);
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  
  if (dryRun) {
    console.log('Running in DRY RUN mode - no files will be modified');
  }
  
  if (args.includes('--help')) {
    console.log(`
Usage: node generate-tags.js [options]

Options:
  --dry-run    Run without modifying files
  --help       Show this help message

Environment variables:
  OPENAI_API_KEY    Your OpenAI API key (required)

Example:
  export OPENAI_API_KEY="your-api-key"
  node generate-tags.js --dry-run
    `);
    return;
  }
  
  try {
    await processPosts(dryRun);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { extractTagsWithLLM, normalizeTags };