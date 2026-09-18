const sharp = require('sharp');
const fs = require('fs');

async function extract() {
  const refPath = 'C:/Users/Rafael/.gemini/antigravity/brain/13309973-f48a-42ce-9ffe-732f51349b0c/.user_uploaded/media_1789668237643.png';
  
  // Crop the showcase section: y around 250 to 450
  await sharp(refPath)
    .extract({ left: 0, top: 250, width: 563, height: 200 })
    .toFile('public/ref-showcase.png');

  console.log('Extracted showcase region');
}

extract().catch(console.error);
