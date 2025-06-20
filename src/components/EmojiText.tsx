'use client';

import { useMemo } from 'react';
import { emojiMap } from '@/lib/emoji';

interface EmojiTextProps {
  text: string;
  className?: string;
}

export default function EmojiText({ text, className = '' }: EmojiTextProps) {
  const processedContent = useMemo(() => {
    let result = text;
    
    // Sort by length in descending order to prevent partial replacements
    const sortedEmojis = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
    
    const parts: Array<{ type: 'text' | 'emoji'; content: string; src?: string; alt?: string }> = [];
    let lastIndex = 0;
    
    sortedEmojis.forEach(emoji => {
      const escaped = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      let match;
      
      while ((match = regex.exec(result)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', content: result.slice(lastIndex, match.index) });
        }
        parts.push({ 
          type: 'emoji', 
          content: emoji,
          src: emojiMap[emoji],
          alt: emoji
        });
        lastIndex = match.index + emoji.length;
      }
    });
    
    if (lastIndex < result.length) {
      parts.push({ type: 'text', content: result.slice(lastIndex) });
    }
    
    // Remove duplicates and sort by position
    const uniqueParts = new Map();
    let currentPos = 0;
    let processedText = text;
    
    sortedEmojis.forEach(emoji => {
      const escaped = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      processedText = processedText.replace(regex, (match, offset) => {
        uniqueParts.set(offset, { 
          type: 'emoji', 
          content: emoji,
          src: emojiMap[emoji],
          alt: emoji,
          length: emoji.length
        });
        return '\0'.repeat(emoji.length);
      });
    });
    
    // Build final parts array
    const finalParts: Array<{ type: 'text' | 'emoji'; content: string; src?: string; alt?: string }> = [];
    let pos = 0;
    const sortedOffsets = Array.from(uniqueParts.keys()).sort((a, b) => a - b);
    
    sortedOffsets.forEach(offset => {
      if (offset > pos) {
        const textContent = text.slice(pos, offset);
        if (textContent) {
          finalParts.push({ type: 'text', content: textContent });
        }
      }
      const emojiData = uniqueParts.get(offset);
      finalParts.push(emojiData);
      pos = offset + emojiData.length;
    });
    
    if (pos < text.length) {
      finalParts.push({ type: 'text', content: text.slice(pos) });
    }
    
    return finalParts;
  }, [text]);
  
  return (
    <span className={className}>
      {processedContent.map((part, index) => 
        part.type === 'text' ? (
          <span key={index}>{part.content}</span>
        ) : (
          <img 
            key={index}
            src={part.src} 
            alt={part.alt}
            className="inline-block align-text-bottom mx-0.5"
            style={{ height: '1.2em', verticalAlign: 'text-bottom' }}
          />
        )
      )}
    </span>
  );
}