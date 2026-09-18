const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const bmpiVideo = path.join(base, 'BMPI', 'Gravando 2026-09-18 074745.mp4');
if (fs.existsSync(bmpiVideo)) {
  console.log('🎬 Processing BMPI Video...');
  execSync(`"${ffmpeg}" -y -ss 00:00:00.500 -i "${bmpiVideo}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${path.join(outDir, 'bmpi.webp')}"`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -i "${bmpiVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${path.join(outDir, 'bmpi.mp4')}"`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -i "${bmpiVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 32 -b:v 0 "${path.join(outDir, 'bmpi.webm')}"`, { stdio: 'inherit' });
  console.log('✓ BMPI assets ready!');
} else {
  console.error('BMPI video not found at:', bmpiVideo);
}
