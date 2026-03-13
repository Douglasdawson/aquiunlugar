const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC = path.join(__dirname, '..', 'public');
const IMAGES = path.join(PUBLIC, 'images');

async function run() {
  // Generate favicon PNGs from SVG
  const svgPath = path.join(PUBLIC, 'favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC, 'favicon-32x32.png'));
  console.log('✓ favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // Compress hero image
  const heroSrc = path.join(IMAGES, 'hero-local.jpg');
  if (fs.existsSync(heroSrc)) {
    await sharp(heroSrc)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(path.join(IMAGES, 'hero-optimized.jpg'));
    console.log('✓ hero-optimized.jpg');

    await sharp(heroSrc)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(IMAGES, 'hero-local.webp'));
    console.log('✓ hero-local.webp');
  } else {
    console.warn('⚠ hero-local.jpg not found, skipping hero optimization');
  }
}

run().catch(err => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
