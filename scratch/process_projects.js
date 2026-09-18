const sharp = require('sharp');
const path = require('path');

async function processProjects() {
  const refPath = 'C:/Users/Rafael/.gemini/antigravity/brain/13309973-f48a-42ce-9ffe-732f51349b0c/.user_uploaded/media_1789668237643.png';
  const heroMockupPath = 'C:/Users/Rafael/.gemini/antigravity/brain/13309973-f48a-42ce-9ffe-732f51349b0c/.user_uploaded/media_1789663364019.png';
  
  // Let's also extract the central laptop screen from refPath:
  // Central screen coords: roughly left 167, top 270, width 230, height 140
  await sharp(refPath)
    .extract({ left: 168, top: 270, width: 228, height: 138 })
    .resize(960, 600, { fit: 'cover' })
    .toFile('public/projects/glemo.jpg');

  console.log('Extracted glemo.jpg');
}

processProjects().catch(console.error);
