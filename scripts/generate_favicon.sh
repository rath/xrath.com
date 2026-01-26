#!/bin/sh

# Generate 16x16 PNG
bunx sharp-cli -i public/favicon.svg -o public/favicon-16x16.png resize 16 16
# Generate 32x32 PNG
bunx sharp-cli -i public/favicon.svg -o public/favicon-32x32.png resize 32 32
# Generate 48x48 PNG
bunx sharp-cli -i public/favicon.svg -o public/favicon-48x48.png resize 48 48

# Generate 180x180 Apple Touch Icon
bunx sharp-cli -i public/favicon.svg -o public/apple-touch-icon.png resize 180 180

# Generate ICO file
png2ico src/app/favicon.ico public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png

