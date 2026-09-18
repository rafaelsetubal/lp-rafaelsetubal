const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

// 1. Fix Mito Cafes (Advance 1s to remove initial bug)
console.log('🎬 Processing Mito Cafes with 1s advance...');
const mitoVideo = path.join(base, 'mitocafes', 'Gravando 2026-09-17 164418.mp4');
if (fs.existsSync(mitoVideo)) {
  execSync(`"${ffmpeg}" -y -ss 00:00:01.500 -i "${mitoVideo}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${path.join(outDir, 'mitocafes.webp')}"`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -ss 00:00:01.000 -i "${mitoVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${path.join(outDir, 'mitocafes.mp4')}"`, { stdio: 'inherit' });
  console.log('✓ Mito Cafes fixed!');
}

// 2. Fast generate widestep, sa-cavalcante, rogga
const targets = [
  { folder: 'widestep', slug: 'widestep', file: 'Gravando 2026-09-17 163827.mp4' },
  { folder: 'sacavalcante', slug: 'sa-cavalcante', file: 'Gravando 2026-09-17 164550.mp4' },
  { folder: 'rogga', slug: 'rogga', file: 'Gravando 2026-09-17 164206.mp4' },
];

for (const t of targets) {
  const vPath = path.join(base, t.folder, t.file);
  if (fs.existsSync(vPath)) {
    console.log(`🎬 Processing ${t.slug}...`);
    const poster = path.join(outDir, `${t.slug}.webp`);
    const mp4 = path.join(outDir, `${t.slug}.mp4`);
    
    execSync(`"${ffmpeg}" -y -ss 00:00:00.500 -i "${vPath}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${poster}"`, { stdio: 'inherit' });
    execSync(`"${ffmpeg}" -y -i "${vPath}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${mp4}"`, { stdio: 'inherit' });
    console.log(`✓ ${t.slug} ready!`);
  }
}

console.log('🎉 All requested video fixes complete!');
