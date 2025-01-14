const fs = require('fs');
const path = require('path');

// Links to exclude
const EXCLUDED_LINK_TEXTS = [
  'Subscribe Here',
  'X',
  'Threads',
  'Instagram',
  'YouTube'
];

// Images to exclude
const EXCLUDED_IMAGE_URLS = [
  'https://framerusercontent.com/images/t45o131ftiIcfZwHFlG4OEnQ.png'
];

function cleanMappings() {
  const extractedDir = path.join(__dirname, '../extracted');
  const files = fs.readdirSync(extractedDir);
  
  let totalImagesRemoved = 0;
  let totalLinksRemoved = 0;
  
  // Process each file in the extracted directory
  files.forEach(file => {
    if (!file.includes('mappings.json')) return;
    
    const filePath = path.join(extractedDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (file.includes('image-mappings')) {
      // Clean image mappings
      const originalLength = content.images.length;
      content.images = content.images.filter(img => 
        !EXCLUDED_IMAGE_URLS.includes(img.src)
      );
      totalImagesRemoved += originalLength - content.images.length;
    } else if (file.includes('link-mappings')) {
      // Clean link mappings
      const originalLength = content.links.length;
      content.links = content.links.filter(link => 
        !EXCLUDED_LINK_TEXTS.includes(link.text.trim())
      );
      totalLinksRemoved += originalLength - content.links.length;
    }
    
    // Write back the cleaned content
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  });
  
  // Also clean all-image-urls.json if it exists
  const allImageUrlsPath = path.join(extractedDir, 'all-image-urls.json');
  if (fs.existsSync(allImageUrlsPath)) {
    const allImages = JSON.parse(fs.readFileSync(allImageUrlsPath, 'utf8'));
    const cleanedImages = allImages.filter(url => !EXCLUDED_IMAGE_URLS.includes(url));
    fs.writeFileSync(allImageUrlsPath, JSON.stringify(cleanedImages, null, 2));
  }
  
  console.log(`Cleaning complete!`);
  console.log(`Removed ${totalImagesRemoved} logo images`);
  console.log(`Removed ${totalLinksRemoved} social media links`);
}

cleanMappings(); 