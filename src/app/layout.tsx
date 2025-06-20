import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { generateSEO, generateOrganizationSchema, siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = generateSEO({
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${notoSansKr.variable}`}>
      <head>
        {/* Primary favicon - works in modern browsers */}
        <link rel="icon" href="/favicon-slash.svg" type="image/svg+xml" />
        
        {/* Fallback for older browsers - you'll need to generate these files */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Apple devices */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* RSS/Atom feeds */}
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} - RSS Feed`} href="/feed.xml" />
        <link rel="alternate" type="application/atom+xml" title={`${siteConfig.name} - Atom Feed`} href="/atom.xml" />
        
        <JsonLd data={organizationSchema} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
