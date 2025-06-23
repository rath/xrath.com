import { Metadata } from 'next';
import { mobileWorksData } from '@/lib/mobile-works-data';
import MobileWorksGrid from '@/components/MobileWorksGrid';
import ScreenshotsGallery from '@/components/ScreenshotsGallery';

export const metadata: Metadata = {
  title: 'Works - Jang-Ho Hwang',
  description: 'Portfolio of iOS apps including Mouton Journal - a subscription-based diary app with AI companion. Built with Flutter, Swift, Python, and Rust. Solo developer from ideation to deployment.',
  keywords: 'iOS apps, Flutter, Swift, Mouton Journal, AI diary app, mobile development, Rust integration, Django backend',
  authors: [{ name: 'Jang-Ho Hwang' }],
  openGraph: {
    title: 'Works - iOS Apps Portfolio | Jang-Ho Hwang',
    description: 'Featured: Mouton Journal - AI-powered diary app. Portfolio of 10 iOS apps built with Flutter, Swift, and Objective-C. Solo developer handling full stack.',
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
    title: 'Works - iOS Apps Portfolio | Jang-Ho Hwang',
    description: 'Featured: Mouton Journal - AI-powered diary app. Portfolio of 10 iOS apps built solo.',
    images: ['/images/works/og-image-composite.jpg'],
  },
};

interface TimelineItemProps {
  year?: string;
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
}

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
      {/* Mouton Journal - Featured Project */}
      <div className="mb-16 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-2xl p-8 border border-yellow-200/50">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://dhnar509ehx3i.cloudfront.net/mouton_trans.png"
            alt="Mouton Journal"
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
              <p>Mouton's personality is powered by OpenAI's GPT models with custom prompt engineering.
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
            href="https://apps.apple.com/us/app/mouton-journal/id6738821848"
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
            <TimelineItem
              year="2025"
              title="Product Owner & Engineer"
              company="Mouton Journal"
              companyUrl="https://mouton.told.me"
              period="Jan 2025 - Present"
              description="Architected and launched Mouton Journal, a personal diary app with AI-powered features. Integrated LLM capabilities for intelligent comments, achieving 1,600+ commits in 5 months."
            />

            <TimelineItem
              year="2024"
              title="Senior Software Engineer"
              company="Mediquitous"
              companyUrl="https://mediquitous.com"
              period="Jan 2024 - Aug 2024"
              description="Architected RESTful APIs for Japanese e-commerce platform nugu.jp. Used Next.js, Svelte, Django. Mentored team on Django best practices."
            />

            <TimelineItem
              year="2022"
              title="Chief Technology Officer"
              company="TooEasy"
              period="Jun 2022 - Dec 2023"
              description="Achieved 75% AWS cost reduction through strategic optimization. Led technical architecture using Django, React, and PostgreSQL."
            />

            <TimelineItem
              year="2019"
              title="Chief Technology Officer"
              company="LikeStudio"
              period="Oct 2019 - May 2022"
              description="Launched K-POP fandom app with Flutter reaching 10K+ users. Engineered real-time video broadcasting with WebRTC and FFmpeg/CUDA optimization."
            />

            <TimelineItem
              year="2017"
              title="Senior Software Engineer"
              company="Kakao Corp"
              companyUrl="https://www.kakaocorp.com"
              period="Mar 2017 - Oct 2019"
              description="Architected AI-powered chatbot engine for Kakao's smart speaker. Ported KakaoTalk messenger server from Linux to macOS for faster local development."
            />

            <TimelineItem
              year="2016"
              title="Chief Technology Officer"
              company="MataCompany"
              period="Jun 2016 - Feb 2017"
              description="Co-founded company, developed iOS app with Swift and Flask backend. Led team of 2 junior engineers to deliver in 4 months."
            />

            <TimelineItem
              year="2015"
              title="Senior Software Engineer"
              company="Electronic Arts"
              companyUrl="https://www.ea.com"
              period="Nov 2015 - May 2016"
              description='Designed UI test automation for "Need for Speed Edge". Reduced QA testing time by automated test suite implementation using customized PhantomJS.'
            />

            <TimelineItem
              year="2013"
              title="Senior Software Engineer"
              company="BeatPacking Company"
              period="Oct 2013 - Mar 2015"
              description="Developed social music player Android application. Maintained Python API server handling 1M+ daily requests."
            />

            <TimelineItem
              year="2012"
              title="Senior Software Engineer"
              company="Fancy.com"
              period="Oct 2012 - Aug 2013"
              description="Reduced AWS costs by $200,000/month through infrastructure optimization. Maintained Android App. Enhanced Django app for 10M+ daily requests."
            />

            <TimelineItem
              year="2011"
              title="Professional Consultant"
              company="SK Planet"
              companyUrl="https://www.skplanet.com"
              period="Nov 2011 - Oct 2012"
              description="Prototyped comment plugin backend using Node.js. Implemented Platform-as-a-Service solution based on CloudFoundry. Developed custom Nginx extension using C/GLib."
            />

            <TimelineItem
              year="2009"
              title="Independent Software Engineer"
              company="Self-Employed"
              period="Jul 2009 - Oct 2011"
              description="Developed MSN Messenger clone for Android with 2M+ downloads, generating $100K+ revenue through Google Ads."
            />

            <TimelineItem
              year="2007"
              title="Software Engineer"
              company="NCsoft"
              companyUrl="https://www.ncsoft.com"
              period="Feb 2007 - Apr 2009"
              description="Developed MSN Messenger bot for SpringNote. Implemented secure private messaging service with OpenID authentication."
            />

            <TimelineItem
              year="1999"
              title="Early Career"
              company="Various Companies"
              period="1999 - 2007"
              description="Started at CyberImagination (1999), progressed through roles at Linux Korea, and Tri-D Communication. Used Java, C++, and Python."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
