const sharp = require('sharp');
const path = require('path');

async function inspect() {
  const refPath = 'C:/Users/Rafael/.gemini/antigravity/brain/13309973-f48a-42ce-9ffe-732f51349b0c/.user_uploaded/media_1789668237643.png';
  const meta = await sharp(refPath).metadata();
  console.log('Reference metadata:', meta);
}

inspect().catch(console.error);
