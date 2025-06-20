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
