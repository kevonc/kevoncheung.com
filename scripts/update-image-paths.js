const fs = require('fs');
const path = require('path');

function updateImagePaths() {
  const extractedDir = path.join(__dirname, '../extracted');
  const files = fs.readdirSync(extractedDir);
  
  let totalUpdated = 0;
  
  // Process each image-mappings file
  files.forEach(file => {
    if (!file.includes('image-mappings.json')) return;
    
    const filePath = path.join(extractedDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Update filenames to include blog directory
    content.images = content.images.map(img => ({
      ...img,
      filename: `blog/${img.filename}`
    }));
    
    // Write back the updated content
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    totalUpdated += content.images.length;
    console.log(`✓ Updated ${file} (${content.images.length} images)`);
  });
  
  console.log(`\nTotal images updated: ${totalUpdated}`);
}

updateImagePaths(); 