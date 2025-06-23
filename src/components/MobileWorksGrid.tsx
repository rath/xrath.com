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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {work.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 min-h-[5.0rem]">
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
