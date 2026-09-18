const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects', 'andyglobalshop');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

// Invert order: img2 first, then img1
const imgFirst = path.join(base, '1788808102216-g6k1ky.webp');
const imgSecond = path.join(base, '1788808101420-x0fdf7.webp');

const fullImg = path.join(outDir, 'andyglobalshop-full.webp');
const posterImg = path.join(outDir, 'andyglobalshop.webp');
const videoOut = path.join(outDir, 'andyglobalshop.mp4');

console.log('1. Stacking images in inverted order (img2 first, then img1)...');
execSync(`"${ffmpeg}" -y -i "${imgFirst}" -i "${imgSecond}" -filter_complex "[0:v]scale=1280:-2[v0];[1:v]scale=1280:-2[v1];[v0][v1]vstack=inputs=2[out]" -map "[out]" -c:v libwebp -quality 85 "${fullImg}"`, { stdio: 'inherit' });
console.log('✓ Full inverted image created:', fullImg);

console.log('2. Creating top poster frame...');
execSync(`"${ffmpeg}" -y -i "${fullImg}" -vf "crop=1280:min(620\\,ih):0:0" -c:v libwebp -quality 85 "${posterImg}"`, { stdio: 'inherit' });
console.log('✓ Poster created:', posterImg);

console.log('3. Generating smooth scrolling video (18s)...');
execSync(`"${ffmpeg}" -y -loop 1 -i "${fullImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:'min(t*(ih-620)/16\\,ih-620)',format=yuv420p" -t 18 -r 30 -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "${videoOut}"`, { stdio: 'inherit' });
console.log('✓ Scrolling video created:', videoOut);

console.log('🎉 Andy Global Shop order inverted successfully!');
