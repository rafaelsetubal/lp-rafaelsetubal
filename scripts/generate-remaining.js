const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const map = {
  'rogga': 'rogga',
  'sacavalcante': 'sa-cavalcante',
  'widestep': 'widestep'
};

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

for (const [folder, slug] of Object.entries(map)) {
  const p = path.join(base, folder);
  if (fs.existsSync(p)) {
    const files = fs.readdirSync(p);
    const vf = files.find(x => x.endsWith('.mp4') || x.endsWith('.mov') || x.endsWith('.webm'));
    if (vf) {
      const vPath = path.join(p, vf);
      const posterPath = path.join(outDir, `${slug}.webp`);
      const mp4Path = path.join(outDir, `${slug}.mp4`);
      const webmPath = path.join(outDir, `${slug}.webm`);

      if (!fs.existsSync(posterPath)) {
        console.log(`Generating poster: ${slug}.webp`);
        execSync(`"${ffmpeg}" -y -ss 00:00:00.500 -i "${vPath}" -vframes 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 85 "${posterPath}"`, { stdio: 'inherit' });
      }

      if (!fs.existsSync(mp4Path)) {
        console.log(`Generating mp4: ${slug}.mp4`);
        execSync(`"${ffmpeg}" -y -i "${vPath}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -movflags +faststart "${mp4Path}"`, { stdio: 'inherit' });
      }

      if (!fs.existsSync(webmPath)) {
        console.log(`Generating webm: ${slug}.webm`);
        execSync(`"${ffmpeg}" -y -i "${vPath}" -an -vf "scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 34 -b:v 0 "${webmPath}"`, { stdio: 'inherit' });
      }
    }
  }
}

console.log('Done generating remaining!');
