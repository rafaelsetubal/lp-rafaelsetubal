const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const base = path.join(__dirname, '..', 'source-assets', 'projects');
const folders = fs.readdirSync(base);

for (const f of folders) {
  const p = path.join(base, f);
  if (fs.statSync(p).isDirectory()) {
    const files = fs.readdirSync(p);
    const vf = files.find(x => x.endsWith('.mp4') || x.endsWith('.mov') || x.endsWith('.webm'));
    if (vf) {
      const vPath = path.join(p, vf);
      try {
        const out = execSync(`"${ffmpeg}" -i "${vPath}"`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString();
      } catch (err) {
        const out = (err.stderr || err.stdout || '').toString();
        const match = out.match(/Video:.* ([0-9]{3,4})x([0-9]{3,4})/);
        if (match) {
          const w = parseInt(match[1]);
          const h = parseInt(match[2]);
          console.log(`${f.padEnd(25)} -> ${w}x${h} (ratio: ${(w/h).toFixed(3)}) [${vf}]`);
        } else {
          console.log(`${f.padEnd(25)} -> unknown: ${vf}`);
        }
      }
    }
  }
}
