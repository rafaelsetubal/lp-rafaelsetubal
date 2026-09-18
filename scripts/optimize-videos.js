const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

if (!ffmpegPath) {
  console.error('Error: ffmpeg binary not found.');
  process.exit(1);
}

const SOURCE_DIR = path.join(__dirname, '..', 'source-assets', 'projects');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'projects', 'video-optimized');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Project mapping to clean slugs
const FOLDER_MAP = {
  'oxford-cove': 'oxford-cove',
  'beruf': 'beruf',
  'glemO lp b2b': 'glemo',
  'mitocafes': 'mitocafes',
  'hollywoodwg': 'hollywood-wg',
  'deportasabertasblog': 'portas-abertas',
  'linhaseformas': 'linhas-e-formas',
  'menin-lp-produto': 'menin',
  'mrv&co': 'mrv-co',
  'multimed': 'multimed',
  'penseopen': 'penseopen',
  'kast-penseopen': 'kast',
  'Pride': 'pride',
  'rafaelsetubalportfolio': 'rafael-setubal',
  'rogga': 'rogga',
  'sacavalcante': 'sa-cavalcante',
  'widestep': 'widestep',
  'brz': 'brz',
};

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let errorOutput = '';

    proc.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}: ${errorOutput}`));
      }
    });
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

async function processProject(folderName) {
  const slug = FOLDER_MAP[folderName] || folderName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const projectFolderPath = path.join(SOURCE_DIR, folderName);

  if (!fs.existsSync(projectFolderPath) || !fs.statSync(projectFolderPath).isDirectory()) {
    return;
  }

  const files = fs.readdirSync(projectFolderPath);
  const videoFile = files.find((f) => f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.webm'));

  if (!videoFile) {
    console.log(`[SKIP] No video found in ${folderName}`);
    return;
  }

  const inputPath = path.join(projectFolderPath, videoFile);
  const inputStats = fs.statSync(inputPath);

  const posterPath = path.join(OUTPUT_DIR, `${slug}.webp`);
  const mp4Path = path.join(OUTPUT_DIR, `${slug}.mp4`);
  const webmPath = path.join(OUTPUT_DIR, `${slug}.webm`);

  console.log(`\n========================================`);
  console.log(`🎬 Processing: ${folderName} -> ${slug}`);
  console.log(`Original Size: ${formatBytes(inputStats.size)}`);

  // 1. Generate WebP Poster (Frame at 0.5s, width 1280 max)
  try {
    if (!fs.existsSync(posterPath)) {
      console.log(`  -> Generating poster: ${slug}.webp`);
      await runFFmpeg([
        '-y',
        '-ss', '00:00:00.500',
        '-i', inputPath,
        '-vframes', '1',
        '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libwebp',
        '-quality', '85',
        posterPath,
      ]);
    } else {
      console.log(`  -> Poster exists: ${slug}.webp`);
    }
  } catch (err) {
    console.warn(`  [WARN] WebP poster failed, falling back:`, err.message);
  }

  // 2. Generate Optimized MP4 (H.264, no audio, CRF 26, max 1280w, faststart)
  try {
    if (!fs.existsSync(mp4Path)) {
      console.log(`  -> Encoding MP4 (H.264 web-optimized): ${slug}.mp4`);
      await runFFmpeg([
        '-y',
        '-i', inputPath,
        '-an',
        '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '26',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        mp4Path,
      ]);
    } else {
      console.log(`  -> MP4 exists: ${slug}.mp4`);
    }
  } catch (err) {
    console.error(`  [ERROR] MP4 encoding failed for ${slug}:`, err.message);
  }

  // 3. Generate Optimized WebM (VP9, no audio, CRF 34, max 1280w)
  try {
    if (!fs.existsSync(webmPath)) {
      console.log(`  -> Encoding WebM (VP9 web-optimized): ${slug}.webm`);
      await runFFmpeg([
        '-y',
        '-i', inputPath,
        '-an',
        '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libvpx-vp9',
        '-crf', '34',
        '-b:v', '0',
        webmPath,
      ]);
    } else {
      console.log(`  -> WebM exists: ${slug}.webm`);
    }
  } catch (err) {
    console.warn(`  [WARN] WebM encoding failed (fallback to MP4):`, err.message);
  }

  const posterStats = fs.existsSync(posterPath) ? fs.statSync(posterPath) : null;
  const mp4Stats = fs.existsSync(mp4Path) ? fs.statSync(mp4Path) : null;
  const webmStats = fs.existsSync(webmPath) ? fs.statSync(webmPath) : null;

  console.log(`  ✓ Results for ${slug}:`);
  if (posterStats) console.log(`    - Poster: ${formatBytes(posterStats.size)}`);
  if (mp4Stats) console.log(`    - MP4:    ${formatBytes(mp4Stats.size)} (Saving: ${(100 - (mp4Stats.size / inputStats.size) * 100).toFixed(1)}%)`);
  if (webmStats) console.log(`    - WebM:   ${formatBytes(webmStats.size)}`);
}

async function main() {
  console.log('🚀 Starting project video optimization routine...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${OUTPUT_DIR}\n`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory does not exist: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const folders = fs.readdirSync(SOURCE_DIR);
  for (const folder of folders) {
    await processProject(folder);
  }

  console.log('\n✨ Video optimization complete! All assets ready in public/projects/video-optimized/');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
