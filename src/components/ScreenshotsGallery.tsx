'use client';

import { useState } from 'react';

interface ScreenshotsGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ScreenshotsGallery({ images }: ScreenshotsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image.src)}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-zoom-in"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto"
            />
          </button>
        ))}
      </div>

      {/* Image Dialog */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged screenshot"
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}