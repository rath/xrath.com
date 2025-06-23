#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appData = JSON.parse(await fs.readFile(path.join(__dirname, 'appstore-data.json'), 'utf-8'));

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'works');

// Create output directory if it doesn't exist
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// Download image helper
async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    await fs.writeFile(outputPath, Buffer.from(buffer));
    console.log(`Downloaded: ${outputPath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
}

// Process each app
for (const app of appData.apps) {
  const appName = app.name.toLowerCase().replace(/\s+/g, '-');
  console.log(`\nProcessing ${app.name}...`);
  
  // Download icon
  if (app.icon) {
    const iconPath = path.join(OUTPUT_DIR, `${appName}-icon.png`);
    await downloadImage(app.icon, iconPath);
  }
  
  // Download screenshots (limit to first 3 for portfolio)
  const screenshots = app.screenshots.slice(0, 3);
  for (let i = 0; i < screenshots.length; i++) {
    const screenshotPath = path.join(OUTPUT_DIR, `${appName}-screenshot-${i + 1}.jpg`);
    await downloadImage(screenshots[i], screenshotPath);
  }
}

console.log('\nAll downloads completed!');