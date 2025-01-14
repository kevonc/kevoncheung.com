const fs = require('fs');
const path = require('path');

function updateImageMappings() {
  const extractedDir = path.join(__dirname, '../extracted');
  const files = fs.readdirSync(extractedDir);
  
  // Process each image-mappings file
  files.forEach(file => {
    if (!file.includes('image-mappings.json')) return;
    
    const slug = file.replace('-image-mappings.json', '');
    const filePath = path.join(extractedDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Update filenames
    content.images = content.images.map((img, index) => {
      const extension = path.extname(img.src) || '.jpg'; // Default to .jpg if no extension
      return {
        ...img,
        filename: `${slug}-${index + 1}${extension}`
      };
    });
    
    // Write back the updated content
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✓ Updated ${file} (${content.images.length} images)`);
  });
  
  // Update all-image-urls.json if it exists
  const allImageUrlsPath = path.join(extractedDir, 'all-image-urls.json');
  if (fs.existsSync(allImageUrlsPath)) {
    fs.unlinkSync(allImageUrlsPath);
    console.log('✓ Removed all-image-urls.json (will be regenerated during download)');
  }
}

updateImageMappings(); 