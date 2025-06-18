import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  lang: string;
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
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

// Get posts for homepage (latest 10)
export async function getLatestPosts(limit: number = 10): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

// Get posts for blogs page with pagination
export async function getPaginatedPosts(page: number = 1, perPage: number = 20) {
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    posts: allPosts.slice(start, end),
    totalPosts,
    totalPages,
    currentPage: page,
  };
}