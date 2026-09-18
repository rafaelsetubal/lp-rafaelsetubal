const sharp = require('sharp');

async function extractMacbook() {
  const refPath = 'C:/Users/Rafael/.gemini/antigravity/brain/13309973-f48a-42ce-9ffe-732f51349b0c/.user_uploaded/media_1789668237643.png';
  
  // Crop the central laptop with floor shadow:
  // left: 130, top: 250, width: 300, height: 180
  await sharp(refPath)
    .extract({ left: 125, top: 255, width: 312, height: 175 })
    .resize(1200, 673, { fit: 'contain' })
    .toFile('public/macbook-reference.png');

  console.log('Extracted macbook reference');
}

extractMacbook().catch(console.error);
