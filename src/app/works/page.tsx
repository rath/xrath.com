import { Metadata } from 'next';
import { mobileWorksData } from '@/lib/mobile-works-data';
import MobileWorksGrid from '@/components/MobileWorksGrid';

export const metadata: Metadata = {
  title: 'Works - Jang-Ho Hwang',
  description: 'Portfolio of 9 iOS apps developed over 10 years, built with Swift, Flutter, and Objective-C',
  openGraph: {
    title: 'Works - iOS Apps Portfolio',
    description: 'Portfolio of 9 iOS apps developed over 10 years',
    type: 'website',
  },
};

export default function WorksPage() {
  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          iOS Apps Built Together
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          9 side projects created with designer Eui-Hyung Jung (2015-2023)
        </p>
        <p className="text-base text-gray-500 dark:text-gray-500 italic">
          Except for the design, I worked on all the coding by myself and manage all the source code alone using Swift, Objective-C, and Flutter.
        </p>
      </div>

      <MobileWorksGrid works={mobileWorksData} />
    </main>
  );
}
