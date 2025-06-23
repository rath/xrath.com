'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { MobileWork } from '@/lib/mobile-works-data';

interface MobileWorkDetailProps {
  work: MobileWork;
  onClose: () => void;
}

export default function MobileWorkDetail({ work, onClose }: MobileWorkDetailProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <Image
              src={work.icon}
              alt={`${work.name} icon`}
              width={120}
              height={120}
              className="rounded-3xl flex-shrink-0 w-24 h-24 md:w-32 md:h-32"
            />

            <div className="flex-1 text-center md:text-left max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {work.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {work.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(work.rating.average)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-base text-gray-600 dark:text-gray-400">
                    {work.rating.average} ({work.rating.count} reviews)
                  </span>
                </div>

                <span className="text-xl font-bold">
                  {work.price}
                </span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{work.releaseDate}</span>
                <span>•</span>
                <span>Built with {work.builtWith}: {work.totalCommits} commits</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {work.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {work.screenshots.map((screenshot, index) => (
                <div key={index} className="relative w-full rounded-xl overflow-hidden shadow-md" style={{ aspectRatio: '9/16' }}>
                  <Image
                    src={screenshot}
                    alt={`${work.name} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {work.reviews.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">5-Star Reviews</h3>
              <div className="space-y-4">
                {work.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <a
              href={work.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              View on App Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
