const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Feed } = require('feed');

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllPosts() {
  const posts = [];

  function readDirectory(dir, baseSlug = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const newSlug = baseSlug ? `${baseSlug}/${entry.name}` : entry.name;
        readDirectory(fullPath, newSlug);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);

        if (data.title && data.date) {
          let slug = baseSlug;
          const fileName = entry.name.replace(/\.(md|mdx)$/, '');

          if (fileName !== 'index') {
            slug = slug ? `${slug}/${fileName}` : fileName;
          }

          // Generate excerpt
          const excerpt = content
            .replace(/^#+\s+.*$/gm, '') // Remove headers
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
            .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Convert links to text
            .replace(/[*_`~]/g, '') // Remove formatting
            .split('\n')
            .filter(line => line.trim())
            .join(' ')
            .slice(0, 280)
            .trim() + '...';

          posts.push({
            ...data,
            slug,
            content,
            excerpt,
          });
        }
      }
    }
  }

  readDirectory(CONTENT_DIR);

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateFeeds() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Jang-Ho Hwang - Rath World",
    description: "Personal website of Jang-Ho Hwang",
    id: "https://xrath.com/",
    link: "https://xrath.com/",
    language: "en",
    favicon: "https://xrath.com/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Jang-Ho Hwang`,
    author: {
      name: "Jang-Ho Hwang",
      email: "rath@xrath.com",
      link: "https://xrath.com"
    },
    feedLinks: {
      rss: "https://xrath.com/feed.xml",
      atom: "https://xrath.com/atom.xml"
    }
  });

  posts.slice(0, 10).forEach(post => {
    // Remove comments section from content
    const contentWithoutComments = post.content.split(/## Comments/i)[0].trim();
    
    feed.addItem({
      title: post.title,
      id: `https://xrath.com/${post.slug}`,
      link: `https://xrath.com/${post.slug}`,
      description: post.excerpt,
      content: contentWithoutComments,
      author: [{
        name: "Jang-Ho Hwang",
        email: "rath@xrath.com",
        link: "https://xrath.com"
      }],
      date: new Date(post.date),
      category: post.tags ? post.tags.map(tag => ({ name: tag })) : []
    });
  });

  // Generate RSS 2.0
  fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), feed.rss2());
  console.log('✅ Generated RSS feed: /feed.xml');

  // Generate Atom 1.0
  fs.writeFileSync(path.join(PUBLIC_DIR, 'atom.xml'), feed.atom1());
  console.log('✅ Generated Atom feed: /atom.xml');
}

// Run the generator
try {
  generateFeeds();
} catch (error) {
  console.error('❌ Error generating feeds:', error);
  process.exit(1);
}
