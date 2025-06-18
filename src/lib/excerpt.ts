import { remark } from 'remark';
import strip from 'strip-markdown';

export async function generateExcerpt(markdown: string, maxLength: number = 200): Promise<string> {
  // Convert markdown to plain text
  const plainText = await remark()
    .use(strip)
    .process(markdown);
  
  const text = plainText.toString().trim();
  
  // If text is shorter than maxLength, return as is
  if (text.length <= maxLength) {
    return text;
  }
  
  // Find the last complete word within maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we found a space, truncate at word boundary
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex).trim();
  }
  
  // Otherwise just truncate at maxLength
  return truncated.trim();
}