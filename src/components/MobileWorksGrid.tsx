'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MobileWork } from '@/lib/mobile-works-data';
import MobileWorkDetail from './MobileWorkDetail';

interface WorksGridProps {
  works: MobileWork[];
}

export default function WorksGrid({ works }: WorksGridProps) {
  const [selectedWork, setSelectedWork] = useState<MobileWork | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work) => (
          <div
            key={work.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
            onClick={() => setSelectedWork(work)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={work.icon}
                    alt={`${work.name} icon`}
                    width={80}
                    height={80}
                    className="rounded-2xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {work.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {work.rating.average} ({work.rating.count})
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 min-h-[2.5rem]">
                    {work.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 min-h-[5.5rem]">
                {work.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500 dark:text-gray-500">
                  <span>Built with {work.builtWith}: {work.totalCommits} commits</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500 dark:text-gray-500">
                  <span>Released: {work.releaseDate}</span>
                </div>
                <span className="font-semibold">
                  {work.price}
                </span>
              </div>
            </div>

            <div className="flex gap-1 px-6 pb-6">
              {work.screenshots.slice(0, 3).map((screenshot, index) => (
                <div key={index} className="relative flex-1 h-40 rounded-lg overflow-hidden">
                  <Image
                    src={screenshot}
                    alt={`${work.name} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 30vw, (max-width: 1024px) 20vw, 15vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedWork && (
        <MobileWorkDetail work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </>
  );
}
