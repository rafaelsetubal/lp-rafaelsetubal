const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

// 1. Re-process Andy Global Shop with half the speed (18s duration)
const andyFullImg = path.join(outDir, 'andyglobalshop-full.webp');
const andyVideoOut = path.join(outDir, 'andyglobalshop.mp4');

if (fs.existsSync(andyFullImg)) {
  console.log('🎬 1. Re-generating Andy Global Shop video (slower, 18s duration)...');
  execSync(`"${ffmpeg}" -y -loop 1 -i "${andyFullImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:'min(t*(ih-620)/16\\,ih-620)',format=yuv420p" -t 18 -r 30 -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "${andyVideoOut}"`, { stdio: 'inherit' });
  console.log('✓ Andy Global Shop video updated!');
}

// 2. Process Credit Black
const creditImg = path.join(base, 'creditblack.png');
const creditPoster = path.join(outDir, 'credit-black.webp');
const creditVideo = path.join(outDir, 'credit-black.mp4');

if (fs.existsSync(creditImg)) {
  console.log('🎬 2. Processing Credit Black...');
  // 2.1 Generate WebP poster (top 1280x620)
  execSync(`"${ffmpeg}" -y -i "${creditImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:0" -c:v libwebp -quality 85 "${creditPoster}"`, { stdio: 'inherit' });
  console.log('✓ Credit Black poster created!');

  // 2.2 Generate smooth scrolling video (16s duration)
  execSync(`"${ffmpeg}" -y -loop 1 -i "${creditImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:'min(t*(ih-620)/14\\,ih-620)',format=yuv420p" -t 16 -r 30 -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "${creditVideo}"`, { stdio: 'inherit' });
  console.log('✓ Credit Black video created!');
}

console.log('🎉 All scroll projects processed successfully!');
