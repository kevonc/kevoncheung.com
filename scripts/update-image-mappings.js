const fs = require('fs');
const path = require('path');

// Read the source mappings with context
const sourceMappingsPath = path.join(__dirname, 'image-mappings.json');
const sourceMappings = JSON.parse(fs.readFileSync(sourceMappingsPath, 'utf8'));

// Create a lookup for context by image URL
const contextByUrl = {};
sourceMappings.images.forEach(img => {
  if (img.context) {
    contextByUrl[img.url] = img.context;
  }
});

// Process all image mapping files in the extracted directory
const extractedDir = path.join(__dirname, '../extracted');
const files = fs.readdirSync(extractedDir);

files.forEach(file => {
  if (!file.endsWith('-image-mappings.json')) return;
  
  const filePath = path.join(extractedDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Update each image with context if available
  content.images = content.images.map(img => {
    const context = contextByUrl[img.src];
    if (context) {
      return {
        ...img,
        context
      };
    }
    return img;
  });
  
  // Write back the updated content
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`✓ Updated ${file}`);
});

console.log('\nAll image mappings updated!'); 