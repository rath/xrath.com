import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  lang: string;
  tags?: string[];
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Decode URL-encoded characters
    const decodedSlug = decodeURIComponent(slug);
    const filePath = path.join(postsDirectory, `${decodedSlug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: decodedSlug,
      title: data.title || '',
      date: data.date || '',
      content,
      lang: data.lang || 'ko',
      tags: data.tags || [],
    };
  } catch (error) {
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  async function readDirectory(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(postsDirectory, fullPath);

      if (entry.isDirectory()) {
        await readDirectory(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const slug = relativePath.replace(/\.md$/, '');
        const post = await getPostBySlug(slug);
        if (post) {
          posts.push(post);
        }
      }
    }
  }

  await readDirectory(postsDirectory);

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    const isValidA = !isNaN(timeA);
    const isValidB = !isNaN(timeB);

    if (isValidA && isValidB) {
      return timeB - timeA; // Sort newest first
    } else if (isValidA) {
      return -1; // Valid dates come before invalid dates (a is valid, b is not)
    } else if (isValidB) {
      return 1;  // Valid dates come before invalid dates (b is valid, a is not)
    }
    return 0; // Both are invalid, keep original order relative to each other
  });

  return posts;
}

// Get posts for homepage (latest 10)
export async function getLatestPosts(limit: number = 10): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

// Get posts for blogs page with pagination
export async function getPaginatedPosts(page: number = 1, perPage: number = 20, year?: number) {
  let posts = await getAllPosts();
  
  // Filter by year if provided
  if (year) {
    posts = posts.filter(post => {
      const postYear = new Date(post.date).getFullYear();
      return postYear === year;
    });
  }
  
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    posts: posts.slice(start, end),
    totalPosts,
    totalPages,
    currentPage: page,
  };
}
