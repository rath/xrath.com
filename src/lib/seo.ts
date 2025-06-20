import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export const siteConfig = {
  name: 'Jang-Ho Hwang',
  title: 'Jang-Ho Hwang - Rath World',
  description: 'Personal website of Jang-Ho Hwang - exploring the intersection of technology, creativity, and human experience',
  url: 'https://xrath.com',
  author: {
    name: 'Jang-Ho Hwang',
    email: 'rath@xrath.com',
    twitter: '@rath',
  },
  language: 'en',
  locale: 'en_US',
};

export function generateSEO({
  title,
  description,
  url = siteConfig.url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = siteConfig.author.name,
  keywords = [],
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`;
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': `${siteConfig.url}/feed.xml`,
        'application/atom+xml': `${siteConfig.url}/atom.xml`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.title,
      type: type as any,
      locale: siteConfig.locale,
      ...(image && { images: [{ url: image }] }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(type === 'article' && { authors: [author] }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      creator: siteConfig.author.twitter,
      ...(image && { images: [image] }),
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

// Generate organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [
      `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
      'https://github.com/rath',
    ],
    jobTitle: 'Software Developer',
    description: '25-year software developer exploring the intersection of technology, creativity, and human experience',
  };
}

// Generate article schema
export function generateArticleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author = siteConfig.author.name,
  image,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    author: {
      '@type': 'Person',
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Get reading time in minutes
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}