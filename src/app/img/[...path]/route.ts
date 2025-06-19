import { readFile } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const imagePath = resolvedParams.path.join('/');
  const fullImagePath = path.join(process.cwd(), 'content', 'images', imagePath);
  
  try {
    const imageData = await readFile(fullImagePath);
    
    // Determine content type based on file extension
    const ext = path.extname(imagePath).toLowerCase();
    let contentType = 'image/jpeg'; // default
    
    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
    }
    
    // Return the image with proper headers
    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    notFound();
  }
}

// Generate static params for all images
export async function generateStaticParams() {
  const { readdirSync, statSync } = await import('fs');
  const { join } = await import('path');
  
  const imageParams: { path: string[] }[] = [];
  const imagesDir = join(process.cwd(), 'content', 'images');
  
  function getImagePaths(dir: string, baseDir: string = ''): void {
    try {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const relativePath = baseDir ? join(baseDir, item) : item;
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          getImagePaths(fullPath, relativePath);
        } else if (stat.isFile()) {
          // Add image path as params
          imageParams.push({
            path: relativePath.split(path.sep)
          });
        }
      }
    } catch (error) {
      // If images directory doesn't exist, that's okay
    }
  }
  
  getImagePaths(imagesDir);
  
  return imageParams;
}