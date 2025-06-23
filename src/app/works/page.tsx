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
      {/* Mouton Journal - Featured Project */}
      <div className="mb-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://dhnar509ehx3i.cloudfront.net/mouton_trans.png"
            alt="Mouton Journal"
            className="w-20 h-20 rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mouton Journal</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Your private diary with a cute AI lamb companion.</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          A subscription-based commercial iOS app (actively developed until April 2024). I built everything from ideation to planning, design, and back-office tools entirely on my own. Available in 8 languages: English, German, Korean, Japanese, Chinese, French, Italian, and Spanish.
        </p>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p className="font-semibold mb-2">Key features:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>AI Companion that likes your posts and writes empathetic comments on your diary entries</li>
            <li>Clean, social media-inspired design</li>
            <li>Support for comments and quote-sharing</li>
            <li>Calendar view and search functionality</li>
          </ul>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <img
            src="https://dhnar509ehx3i.cloudfront.net/framed-en-01home.jpg"
            alt="Mouton Screenshot - Home"
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img
            src="https://dhnar509ehx3i.cloudfront.net/framed-en-02notifications.jpg"
            alt="Mouton Screenshot - Notifications"
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img
            src="https://dhnar509ehx3i.cloudfront.net/framed-en-03search.jpg"
            alt="Mouton Screenshot - Search"
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img
            src="https://dhnar509ehx3i.cloudfront.net/framed-en-04calendar.jpg"
            alt="Mouton Screenshot - Calendar"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">Started</span>
            <p className="font-semibold">Jan 2025</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">Released</span>
            <p className="font-semibold">Mar 2025</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">Commits</span>
            <p className="font-semibold">1,653</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600 dark:text-gray-400">Built with</span>
            <p className="font-semibold">Flutter, Python</p>
          </div>
        </div>

        <details className="mb-6">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Technical Details
          </summary>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold mb-1">🗄️ Offline-First Architecture</h4>
              <p>All journal entries are stored locally using SQLite with FTS5 (Full-Text Search) for instant search capabilities. Data syncs to the server when online with sophisticated conflict resolution and change tracking.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🚀 High-Performance Backend</h4>
              <p>Built with Django Ninja for modern, fast API performance. Uses ORJSON for high-speed JSON parsing and JWT tokens for secure authentication.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🤖 AI-Powered Interactions</h4>
              <p>Mouton's personality is powered by OpenAI's GPT models with custom prompt engineering. Includes content moderation, emotion matching, and multi-language support. Comments are generated contextually based on entry content and attached images.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🦀 Rust Integration</h4>
              <p>Performance-critical operations like image resizing are handled by Rust modules via <a href="https://github.com/fzyzcjy/flutter_rust_bridge">flutter_rust_bridge</a>. Uses the fast_image_resize crate for efficient image processing, ensuring smooth performance even with multiple high-resolution photos.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🔄 Smart Synchronization</h4>
              <p>Implements a sophisticated sync protocol with change tokens, automatic conflict resolution, and retry logic. Supports offline post creation with automatic sync when reconnected.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🔗 Rich Content Support</h4>
              <p>Automatic link preview generation with OpenGraph parsing, special YouTube handling, and support for quoting other entries or comments in a social media-style interface.</p>
            </div>
          </div>
        </details>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://mouton.told.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Visit Website
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://apps.apple.com/us/app/mouton-journal/id6738821848"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download on App Store
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Other iOS Apps */}
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
