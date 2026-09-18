const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Academia da Fala
const falaVideo = path.join(base, 'Academia da Fala', 'Gravando 2026-09-17 191024.mp4');
if (fs.existsSync(falaVideo)) {
  console.log('🎬 Processing Academia da Fala...');
  execSync(`"${ffmpeg}" -y -ss 00:00:00.500 -i "${falaVideo}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${path.join(outDir, 'academia-da-fala.webp')}"`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -i "${falaVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${path.join(outDir, 'academia-da-fala.mp4')}"`, { stdio: 'inherit' });
  console.log('✓ Academia da Fala ready!');
}

// 2. Barbaros Tattoo Club
const barbarosVideo = path.join(base, 'barbaros tattoo club', 'Gravando 2026-09-17 192042.mp4');
if (fs.existsSync(barbarosVideo)) {
  console.log('🎬 Processing Barbaros Tattoo Club...');
  execSync(`"${ffmpeg}" -y -ss 00:00:00.500 -i "${barbarosVideo}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${path.join(outDir, 'barbaros-tattoo.webp')}"`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -y -i "${barbarosVideo}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart "${path.join(outDir, 'barbaros-tattoo.mp4')}"`, { stdio: 'inherit' });
  console.log('✓ Barbaros Tattoo Club ready!');
}

// 3. Buzzvel (Static Image)
const buzzvelImg = path.join(base, 'buzzvel.png');
if (fs.existsSync(buzzvelImg)) {
  console.log('🖼️ Processing Buzzvel static image...');
  execSync(`"${ffmpeg}" -y -i "${buzzvelImg}" -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 90 "${path.join(outDir, 'buzzvel.webp')}"`, { stdio: 'inherit' });
  console.log('✓ Buzzvel ready!');
}

console.log('🎉 All new project assets generated successfully!');
