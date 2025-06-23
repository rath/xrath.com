#!/usr/bin/env node
/**
 * Scrape an App Store detail page into JSON.
 *
 * Usage:
 *   node appstore-scraper.js "https://apps.apple.com/us/app/…"
 *
 * Requires Node ≥ 18 (global fetch) and one external package:
 *   npm i cheerio
 */
import { load } from 'cheerio';
import process from 'process';

(async () => {
  let url = process.argv[2];
  if (!url) {
    console.error('Usage: node appstore-scraper.js <appstore-url>');
    process.exit(1);
  }

  // Ensure URL has ?platform=iphone parameter
  const urlObj = new URL(url);
  if (!urlObj.searchParams.has('platform')) { urlObj.searchParams.set('platform', 'iphone');
    url = urlObj.toString();
  }

  // Fetch HTML with a desktop UA so Apple serves non-JS fallback
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124 Safari/537.36'
    }
  });
  if (!res.ok) {
    console.error(`Request failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const html = await res.text();
  const $ = load(html, { decodeEntities: false });

  // Helper to pick the first URL from a srcset string
  const firstSrc = (el) => {
    const srcset =
      $(el).attr('srcset') || $(el).find('source').attr('srcset') || '';
    return srcset.split(/\s+/)[0];
  };

  // 1) Icon
  const icon = firstSrc($('section.product-hero picture').first());

  // 2) Title
  const rawTitle = $('section.product-hero h1').first();
  const title = rawTitle.clone().children().remove().end().text().trim();

  // 3) Subtitle
  const subtitle = $('section.product-hero h2').first().text().trim();

  // 4) Screenshots
  const screenshots = [];
  $('div.we-screenshot-viewer__screenshots picture').each((_, pic) => {
    const src = firstSrc(pic);
    if (src) screenshots.push(src);
  });

  // 5) Description
  const description = $('div.section__description').text().trim().replace(/\s{2,}/g, ' ');

  // 6) Ratings (avg & count)
  const avgMatch = html.match(/([0-9.]+)\s*out\s*of\s*5/);
  const countMatch = html.match(/([0-9,]+)\s*Ratings/i);
  const rating = {
    average: avgMatch ? parseFloat(avgMatch[1]) : null,
    count: countMatch ? parseInt(countMatch[1].replace(/,/g, ''), 10) : null
  };

  // 7) Two 5-star review texts
  const reviews = [];
  $('div.we-customer-review').each((_, rev) => {
    const aria = $(rev).find('figure[aria-label]').attr('aria-label') || '';
    console.log(aria);
    if (/^5\s+out\s+of\s+5/.test(aria)) {
      const head = $(rev).find('h3').text().trim();
      const body = $(rev).find('blockquote').text().trim().replace(/\s{2,}/g, ' ');
      reviews.push(`${head}: ${body}`);
    }
    return reviews.length < 2;
  });

  // 8) Price
  let price = $('meta[itemprop="price"]').attr('content') || '';
  if (!price) {
    const p = html.match(/\$\d+(?:\.\d+)?/);
    price = p ? p[0] : 'Free';
  }

  /* Output ---------------------------------------------------------------- */
  const data = {
    icon,
    title,
    subtitle,
    screenshots,
    description,
    rating,
    reviews,
    price
  };

  console.log(JSON.stringify(data, null, 2));
})();
