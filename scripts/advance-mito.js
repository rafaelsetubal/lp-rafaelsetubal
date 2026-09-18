const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');
const mitoVideo = path.join(base, 'mitocafes', 'Gravando 2026-09-17 164418.mp4');

console.log('Advancing Mito Cafes to 2.0s...');
execSync(`"${ffmpeg}" -y -ss 00:00:02.200 -i "${mitoVideo}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${path.join(outDir, 'mitocafes.webp')}"`, { stdio: 'inherit' });
execSync(`"${ffmpeg}" -y -ss 00:00:02.000 -i "${mitoVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${path.join(outDir, 'mitocafes.mp4')}"`, { stdio: 'inherit' });
console.log('✓ Mito Cafes advanced to 2.0s successfully!');
