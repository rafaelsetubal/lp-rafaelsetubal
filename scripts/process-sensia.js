const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const outDir = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');
const inputImg = path.join(outDir, 'sensia.jpg');
const poster = path.join(outDir, 'sensia.webp');
const videoOut = path.join(outDir, 'sensia.mp4');

if (fs.existsSync(inputImg)) {
  console.log('1. Generating Sensia poster...');
  execSync(`"${ffmpeg}" -y -i "${inputImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:0" -c:v libwebp -quality 85 "${poster}"`, { stdio: 'inherit' });
  
  console.log('2. Generating smooth scrolling video (16s duration)...');
  execSync(`"${ffmpeg}" -y -loop 1 -i "${inputImg}" -vf "scale=1280:-2,crop=1280:min(620\\,ih):0:'min(t*(ih-620)/14\\,ih-620)',format=yuv420p" -t 16 -r 30 -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "${videoOut}"`, { stdio: 'inherit' });
  console.log('Success!');
} else {
  console.error('File sensia.jpg not found in video-optimized folder');
}
