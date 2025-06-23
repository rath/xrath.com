import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKS_DIR = path.join(__dirname, '../public/images/works');
const OUTPUT_PATH = path.join(WORKS_DIR, 'og-image-composite.jpg');

// Canvas dimensions for Open Graph image
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;

// Icon configuration
const ICON_SIZE = 110;
const ICON_PADDING = 30;
const GRID_COLS = 3;
const BORDER_RADIUS = 20;

async function createOGImage() {
  try {
    console.log('Creating OG image...');

    // Get all icon files (only the 9 app icons, no Mouton)
    const files = fs.readdirSync(WORKS_DIR);
    const iconFiles = files.filter(file => file.endsWith('-icon.png'));
    console.log(`Found ${iconFiles.length} icon files`);

    // Map icon files to full paths
    const allIcons = iconFiles.map(f => path.join(WORKS_DIR, f));

    // Calculate grid layout (3x3 grid for 9 icons) - left aligned
    const rows = Math.ceil(allIcons.length / GRID_COLS);
    const gridWidth = GRID_COLS * (ICON_SIZE + ICON_PADDING) - ICON_PADDING;
    const gridHeight = rows * (ICON_SIZE + ICON_PADDING) - ICON_PADDING;
    const cardPadding = 60; // Padding for the entire card
    const startX = cardPadding + 20; // Icons start with extra padding inside card
    const startY = 180; // Below title area

    // Process icons into a composite
    const compositeInputs = [];

    for (let i = 0; i < allIcons.length; i++) {
      const row = Math.floor(i / GRID_COLS);
      const col = i % GRID_COLS;
      const x = startX + col * (ICON_SIZE + ICON_PADDING);
      const y = startY + row * (ICON_SIZE + ICON_PADDING);

      try {
        // Create rounded mask SVG
        const maskSvg = Buffer.from(`
          <svg width="${ICON_SIZE}" height="${ICON_SIZE}">
            <rect x="0" y="0" width="${ICON_SIZE}" height="${ICON_SIZE}"
                  rx="${BORDER_RADIUS}" ry="${BORDER_RADIUS}"
                  fill="black" />
          </svg>
        `);

        // Process icon with rounded corners
        const iconBuffer = await sharp(allIcons[i])
          .resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' })
          .composite([{
            input: maskSvg,
            blend: 'dest-in'
          }])
          .png()
          .toBuffer();

        compositeInputs.push({
          input: iconBuffer,
          left: x,
          top: y
        });

        console.log(`Processed icon ${i + 1}/${allIcons.length}`);
      } catch (err) {
        console.error(`Error processing icon ${allIcons[i]}:`, err.message);
      }
    }

    // Create the final image
    const backgroundPath = path.join(WORKS_DIR, 'og-background.jpg');

    // Calculate card dimensions to cover both title and icons
    const cardWidth = gridWidth + 40; // Extra padding on sides
    const cardHeight = startY + gridHeight - 40 + 40; // From top of title to bottom of icons + padding
    const cardX = cardPadding;
    const cardY = 40; // Start from top with some margin

    // Create unified card background with 40% opacity
    const cardBackground = await sharp({
      create: {
        width: Math.ceil(cardWidth),
        height: Math.ceil(cardHeight),
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0.4 }
      }
    })
    .composite([{
      input: Buffer.from(`
        <svg width="${Math.ceil(cardWidth)}" height="${Math.ceil(cardHeight)}">
          <rect x="0" y="0" width="${Math.ceil(cardWidth)}" height="${Math.ceil(cardHeight)}"
                rx="20" ry="20" fill="black" />
        </svg>
      `),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

    // Create title text (no background needed)
    const titleSvg = `
      <svg width="${cardWidth}" height="150">
        <style>
          .title { fill: white; font-size: 48px; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          .subtitle { fill: white; font-size: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; opacity: 0.9; }
        </style>
        <!-- Text content aligned to left within card -->
        <text x="20" y="60" text-anchor="start" class="title">Apps I've Built</text>
        <text x="20" y="100" text-anchor="start" class="subtitle">Built with passion, delivered with quality</text>
      </svg>
    `;

    const titleBuffer = await sharp(Buffer.from(titleSvg))
      .png()
      .toBuffer();

    // Compose everything together
    await sharp(backgroundPath)
      .resize(CANVAS_WIDTH, CANVAS_HEIGHT, { fit: 'cover' })
      .composite([
        { input: cardBackground, top: Math.floor(cardY), left: Math.floor(cardX) },
        { input: titleBuffer, top: Math.floor(cardY), left: Math.floor(cardX) },
        ...compositeInputs
      ])
      .jpeg({ quality: 90 })
      .toFile(OUTPUT_PATH);


    const stats = fs.statSync(OUTPUT_PATH);
    console.log(`\n✅ OG image created successfully!`);
    console.log(`   Path: ${OUTPUT_PATH}`);
    console.log(`   Dimensions: ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`);
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)}KB`);

  } catch (error) {
    console.error('Error creating OG image:', error);
    process.exit(1);
  }
}

// Run the script
createOGImage();
