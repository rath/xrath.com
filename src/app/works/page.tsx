import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { mobileWorksData } from '@/lib/mobile-works-data';
import MobileWorksGrid from '@/components/MobileWorksGrid';
import ScreenshotsGallery from '@/components/ScreenshotsGallery';

export const metadata: Metadata = {
  title: 'Works - Jang-Ho Hwang',
  description: 'Portfolio featuring Orrery, a browser-based astrology birth chart calculator, and Mouton Journal, a subscription-based diary app with AI companion. Built with React, TypeScript, Flutter, Swift, Python, and Rust.',
  keywords: 'astrology, birth chart calculator, Four Pillars of Destiny, Purple Star Astrology, natal chart, iOS apps, Flutter, Swift, Mouton Journal, AI diary app, mobile development',
  authors: [{ name: 'Jang-Ho Hwang' }],
  openGraph: {
    title: 'Works - Software Portfolio | Jang-Ho Hwang',
    description: 'Featured: Orrery - browser-based astrology birth chart calculator, and Mouton Journal - AI-powered diary app. Portfolio of software projects and 10 iOS apps.',
    type: 'website',
    images: [
      {
        url: '/images/works/og-image-composite.jpg',
        width: 1200,
        height: 630,
        alt: 'iOS App Portfolio - 10 apps including Mouton Journal',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Works - Software Portfolio | Jang-Ho Hwang',
    description: 'Featured: Orrery birth chart calculator and Mouton Journal diary app. Portfolio of software projects built solo.',
    images: ['/images/works/og-image-composite.jpg'],
  },
};

interface TimelineItemProps {
  year?: string;
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: ReactNode;
}

const workExperience: TimelineItemProps[] = [
  {
    year: '2026',
    title: 'Software Architect',
    company: 'AI3',
    companyUrl: 'https://ai3.kr',
    period: 'Dec 2025 - Present',
    description: (
      <>
        Returned to maintain{' '}
        <a
          href="https://bizrouter.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          BizRouter
        </a>{' '}
        in production while launching AI{' '}
        <a
          href="https://apps.wrks.ai/image/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          image
        </a>
        ,{' '}
        <a
          href="https://apps.wrks.ai/video/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          video
        </a>
        , and{' '}
        <a
          href="https://apps.wrks.ai/notes/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          notes
        </a>{' '}
        SaaS products on a standardized React 19, NestJS, Drizzle ORM, and Aurora stack that established a commercially viable SaaS portfolio.
      </>
    ),
  },
  {
    year: '2025',
    title: 'Software Architect',
    company: 'Everest Systems',
    companyUrl: 'https://everest-systems.com',
    period: 'Sep 2025 - Dec 2025',
    description: 'Built and optimized an AI-powered coding agent with Python and TypeScript, focusing on maintenance, feature delivery, and Claude Code-driven development workflows.',
  },
  {
    title: 'Software Architect',
    company: 'AI3',
    companyUrl: 'https://ai3.kr',
    period: 'Jun 2025 - Aug 2025',
    description: (
      <>
        Served as the sole architect and engineer for{' '}
        <a
          href="https://bizrouter.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          BizRouter
        </a>
        , an OpenRouter-compatible B2B LLM gateway for the Korean market, delivered end-to-end with React 19, Django, and a Rust API server.
      </>
    ),
  },
  {
    year: '2024',
    title: 'Product Owner & Engineer',
    company: 'Self-Employed',
    companyUrl: 'https://mouton.told.me/en/',
    period: 'Dec 2024 - Jun 2025',
    description: 'Architected and launched Mouton Journal for iOS, built Django-Ninja and PostgreSQL APIs, integrated LiteLLM-powered diary comments, and used Rust for performance-critical photo resizing.',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Mediquitous',
    companyUrl: 'https://mediquitous.com',
    period: 'Jan 2024 - Aug 2024',
    description: 'Architected APIs and infrastructure for the Japanese e-commerce platform nugu.jp, built product and back-office systems with Next.js, TypeScript, Django, and Svelte, and mentored the team on Django practices.',
  },
  {
    year: '2022',
    title: 'Chief Technology Officer',
    company: 'TooEasy',
    period: 'Jun 2022 - Dec 2023',
    description: 'Led company-wide API architecture with Django, React, and PostgreSQL, cut AWS infrastructure costs by 75 percent, and managed a fully remote engineering team across time zones.',
  },
  {
    year: '2019',
    title: 'Chief Technology Officer',
    company: 'LikeStudio',
    period: 'Oct 2019 - May 2022',
    description: 'Led development of a Flutter-based K-pop fandom app to 10K+ users, built scalable Django and PostgreSQL APIs, and engineered real-time video broadcasting with WebRTC, RTMP, FFmpeg, and CUDA.',
  },
  {
    year: '2017',
    title: 'Senior Software Engineer',
    company: 'Kakao Corp',
    companyUrl: 'https://www.kakaocorp.com/page/',
    period: 'Mar 2017 - Oct 2019',
    description: "Architected the chatbot engine for Kakao's smart speaker, built an Angular management console for internal teams, and ported a high-traffic KakaoTalk server from Linux to macOS for faster local development.",
  },
  {
    year: '2016',
    title: 'Chief Technology Officer',
    company: 'MataCompany',
    period: 'Jun 2016 - Feb 2017',
    description: 'Co-founded the company, shipped a native iOS app in Swift, built a Flask and SQLAlchemy backend on AWS, and mentored two junior developers through launch.',
  },
  {
    year: '2015',
    title: 'Senior Software Engineer',
    company: 'Electronic Arts',
    companyUrl: 'https://www.ea.com/ko-kr/',
    period: 'Nov 2015 - May 2016',
    description: 'Designed a UI test automation platform for Need for Speed Edge with Angular, Node.js, TypeScript, and Docker, reducing QA time by 70 percent.',
  },
  {
    year: '2013',
    title: 'Senior Software Engineer',
    company: 'BeatPacking Company',
    period: 'Oct 2013 - Mar 2015',
    description: 'Developed a social music player for Android and maintained a high-traffic Python API server handling more than 1 million daily requests.',
  },
  {
    year: '2012',
    title: 'Senior Software Engineer',
    company: 'Thingd (Fancy.com)',
    period: 'Oct 2012 - Aug 2013',
    description: 'Optimized AWS infrastructure to save about $200K per month, improved Django performance for 10M+ daily requests, and built Java-based sharding middleware for horizontal scaling.',
  },
  {
    year: '2011',
    title: 'Professional Consultant',
    company: 'SK Planet',
    companyUrl: 'https://www.skplanet.com/eng/main',
    period: 'Nov 2011 - Oct 2012',
    description: 'Prototyped a Node.js comment backend, researched a CloudFoundry-based PaaS, and developed a custom Nginx extension in C and GLib for request handling.',
  },
  {
    year: '2009',
    title: 'Independent Software Engineer',
    company: 'Self-Employed',
    period: 'Jul 2009 - Oct 2011',
    description: 'Built an Android MSN Messenger clone that reached 2M+ downloads and generated more than $100K in ad revenue while handling the full product lifecycle alone.',
  },
  {
    year: '2007',
    title: 'Software Engineer',
    company: 'NCsoft',
    companyUrl: 'https://www.ncsoft.com/',
    period: 'Feb 2007 - Apr 2009',
    description: 'Developed SpringNote messaging integrations, implemented an OpenID-based private messaging service, and built a Firefox extension for content collection and metadata extraction.',
  },
  {
    year: '1999',
    title: 'Software Engineer / Lead Software Engineer',
    company: 'Various Companies',
    period: 'Dec 1999 - Jan 2007',
    description: 'Worked across CyberImagination, Linux Korea, Tri-D Communication, and National Grid, building Java financial systems, RFC-based network authentication modules, Oracle-backed web services, and Java grid middleware while leading small engineering teams.',
  },
];

function TimelineItem({ year, title, company, companyUrl, period, description }: TimelineItemProps) {
  return (
    <div className="relative flex items-start group">
      {/* Year badge with gradient */}
      {year && (
        <div className="absolute -left-1 top-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg px-3 py-1.5 text-xs font-bold shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
          {year}
        </div>
      )}

      {/* Timeline dot with animation */}
      <div className="absolute left-8 w-4 h-4 -translate-x-1/2">
        <div className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
        <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
      </div>

      {/* Content card with gradient border on hover */}
      <div className="ml-20 w-full">
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
          <div className="relative bg-white rounded-2xl p-6 border border-gray-100">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 duration-200">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-base">
                  {companyUrl ? (
                    <a
                      href={companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
                    >
                      {company}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-600 font-medium">{company}</span>
                  )}
                </div>
              </div>

              {/* Period badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-black-100 border border-gray-300">
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {period}
              </div>
            </div>

            {/* Description with better typography */}
            <p className="text-gray-600 text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorksPage() {
  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      {/* Orrery - Featured Project */}
      <div className="mb-16 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 rounded-2xl p-8 border border-indigo-200/50">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/images/works/orrery-icon.png"
            alt="Orrery"
            width={80}
            height={80}
            className="w-20 h-20 rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orrery (혼천의)</h2>
            <p className="text-lg text-gray-600">Birth chart calculator for Eastern and Western astrology.</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          An open-source client-side astrology calculator that computes three distinct chart systems entirely in the browser with zero backend.
          Implements a pure TypeScript planetary ephemeris based on Moshier&apos;s analytical theory &mdash; no WASM, no external data files.
          Available in Korean, Chinese, Japanese, and English. Core engine published as an npm package (<a href="https://www.npmjs.com/package/@orrery/core" target="_blank" rel="noopener noreferrer" className="underline">@orrery/core</a>).
        </p>

        <details className="mb-6" open={true}>
          <summary className="cursor-pointer text-lg font-semibold text-gray-800 mb-3">
            Key Features
          </summary>
          <div className="text-gray-700">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Four Pillars of Destiny (사주팔자)</strong> &mdash; Classical Chinese astrology based on the 60-year Heavenly Stem &amp; Earthly Branch cycle. Analyzes Ten Gods, 12 life stages, hidden stems, elemental interactions (合/沖/刑/破/害), 10-year major luck periods (大運), and daily/monthly transits</li>
              <li><strong>Zi Wei Dou Shu (자미두수)</strong> &mdash; Traditional Chinese star-chart system using the lunar calendar. Places 14 major stars across a 4&times;4 palace grid (命盤), with brightness ratings, Four Transformations (四化), and decade/annual fortune forecasting</li>
              <li><strong>Natal Chart (점성학)</strong> &mdash; Full horoscope with 10 planets, Chiron, and lunar nodes across 12 houses. Supports 10 house systems (Placidus default), 5 major aspects, and an interactive SVG zodiac wheel</li>
              <li>AI-agent-friendly combined text export for all three chart systems</li>
              <li>Profile management, dark/light theme, fully responsive</li>
            </ul>
          </div>
        </details>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Started</span>
            <p className="font-semibold">Feb 2026</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Released</span>
            <p className="font-semibold">Feb 2026</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Commits</span>
            <p className="font-semibold">79</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Built with</span>
            <p className="font-semibold">React, TypeScript</p>
          </div>
        </div>

        <details className="mb-6">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800 mb-3">
            Technical Details
          </summary>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-1">Pure Client-Side Ephemeris</h4>
              <p>Planetary positions computed using Steve Moshier&apos;s analytical ephemeris theory implemented entirely in TypeScript, with no server calls, no WASM compilation, and no external data files.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Lunar Calendar Engine</h4>
              <p>Full solar-to-lunar calendar conversion supporting leap months, required for accurate Four Pillars and Purple Star calculations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Interactive SVG Zodiac Wheel</h4>
              <p>The Western natal chart renders as a fully interactive SVG with zodiac ring, house cusps, aspect lines, and planet markers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">npm Package (<a href="https://www.npmjs.com/package/@orrery/core" target="_blank" rel="noopener noreferrer" className="underline">@orrery/core</a>)</h4>
              <p>Core calculation engine published separately for programmatic use, enabling integration into other applications.</p>
            </div>
          </div>
        </details>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://sky.told.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try it Live
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://github.com/rath/orrery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Source
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Mouton Journal - Featured Project */}
      <div className="mb-16 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-2xl p-8 border border-yellow-200/50">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="https://dhnar509ehx3i.cloudfront.net/mouton_trans.png"
            alt="Mouton Journal"
            width={80}
            height={80}
            className="w-20 h-20 rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mouton Journal</h2>
            <p className="text-lg text-gray-600">Private diary with a cute AI companion.</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          A subscription-based commercial iOS app (actively developed until April 2025). I built everything from ideation to planning, design, and back-office tools entirely on my own. Available in 8 languages: English, German, Korean, Japanese, Chinese, French, Italian, and Spanish.
        </p>

        <details className="mb-6 open">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800 mb-3">
            Key Features
          </summary>
          <div className="text-gray-700">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>AI Companion that likes your posts and writes empathetic comments on your diary entries</li>
              <li>Clean, social media-inspired design</li>
              <li>Calendar view and search functionality</li>
              <li>Optimized for iPhone and iPad, also runs on macOS (Apple Silicon)</li>
              <li>Support for comments and quote-sharing</li>
              <li>PDF export</li>
            </ul>
          </div>
        </details>

        <ScreenshotsGallery
          images={[
            {
              src: "https://dhnar509ehx3i.cloudfront.net/framed-en-01home.jpg",
              alt: "Mouton Screenshot - Home"
            },
            {
              src: "https://dhnar509ehx3i.cloudfront.net/framed-en-02notifications.jpg",
              alt: "Mouton Screenshot - Notifications"
            },
            {
              src: "https://dhnar509ehx3i.cloudfront.net/framed-en-03search.jpg",
              alt: "Mouton Screenshot - Search"
            },
            {
              src: "https://dhnar509ehx3i.cloudfront.net/framed-en-04calendar.jpg",
              alt: "Mouton Screenshot - Calendar"
            }
          ]}
        />

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Started</span>
            <p className="font-semibold">Jan 2025</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Released</span>
            <p className="font-semibold">Mar 2025</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Commits</span>
            <p className="font-semibold">1,653</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow">
            <span className="text-sm text-gray-600">Built with</span>
            <p className="font-semibold">Flutter, Django</p>
          </div>
        </div>

        <details className="mb-6">
          <summary className="cursor-pointer text-lg font-semibold text-gray-800 mb-3">
            Technical Details
          </summary>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-1">🗄️ Offline-First Architecture</h4>
              <p>All journal entries are stored locally using SQLite with FTS5 (Full-Text Search) for instant search capabilities.
                 Data syncs to the server when online with sophisticated conflict resolution and change tracking.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🤖 AI-Powered Interactions</h4>
              <p>Mouton&apos;s personality is powered by OpenAI&apos;s GPT models with custom prompt engineering.
                 Includes content moderation, emotion matching, and multi-language support.
                 Comments are generated contextually based on entry content and attached images.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🦀 Rust Integration</h4>
              <p>Performance-critical operations like image resizing are handled by Rust modules via
                <a href="https://github.com/fzyzcjy/flutter_rust_bridge">flutter_rust_bridge</a>.
                Uses the fast_image_resize crate for efficient image processing, ensuring smooth performance
                even with multiple high-resolution photos.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🔄 Smart Synchronization</h4>
              <p>Implements a sophisticated sync protocol with change tokens, automatic conflict resolution,
                 and retry logic. Supports offline post creation with automatic sync when reconnected.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🔗 Rich Content Support</h4>
              <p>Automatic link preview generation with OpenGraph parsing, special YouTube handling,
                 and support for quoting other entries or comments in a social media-style interface.</p>
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
            href="https://apps.apple.com/us/app/mouton-journal/id6740142703"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          iOS Apps built in Collaboration
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          9 side projects created with designer Eui-Hyung Jung (2015-2023)
        </p>
        <p className="text-lg text-gray-500 italic">
          Sole developer on all projects (Swift, Objective-C, Flutter)
        </p>
      </div>

      <MobileWorksGrid works={mobileWorksData} />

      {/* Professional Work Experience */}
      <div className="mt-24 mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Work Experience
        </h1>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {workExperience.map((item) => (
              <TimelineItem
                key={`${item.period}-${item.title}-${item.company}`}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
