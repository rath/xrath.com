'use client';

import OptimizedImage from './OptimizedImage';

interface MDXImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export default function MDXImage({ src, alt, title }: MDXImageProps) {
  if (!src) return null;

  // Ensure alt text is always provided for accessibility
  const imageAlt = alt || title || 'Image';

  // Determine if the image is external
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  // For external images, use regular img tag with loading lazy
  if (isExternal) {
    return (
      <figure className="my-8">
        <img
          src={src}
          alt={imageAlt}
          title={title}
          loading="lazy"
          className="rounded-lg shadow-md mx-auto max-w-full h-auto"
        />
        {title && (
          <figcaption className="text-center text-sm text-foreground/60 mt-2">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  // For local images, use the optimized component
  return (
    <figure className="my-8">
      <OptimizedImage
        src={src}
        alt={imageAlt}
        width={800}
        height={600}
        className="rounded-lg shadow-md mx-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      />
      {title && (
        <figcaption className="text-center text-sm text-foreground/60 mt-2">
          {title}
        </figcaption>
      )}
    </figure>
  );
}