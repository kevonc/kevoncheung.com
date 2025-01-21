const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const stringSimilarity = require('string-similarity');

// Helper function to generate alt text based on context
function generateAltText(context, maxWords = 10) {
  const text = context.before.split(' ').slice(-20).join(' ');
  return text.split(' ').slice(0, maxWords).join(' ');
}

// Helper function to find best matching position using fuzzy matching
function findBestMatch(content, context) {
  const paragraphs = content.split('\n\n');
  let bestMatch = { index: -1, rating: 0 };
  
  paragraphs.forEach((para, index) => {
    if (para.includes('<img')) return; // Skip paragraphs that already have images
    
    const rating = stringSimilarity.compareTwoStrings(
      para.toLowerCase().trim(),
      context.before.toLowerCase().trim()
    );
    if (rating > bestMatch.rating) {
      bestMatch = { index, rating };
    }
  });
  
  return bestMatch;
}

function insertImages() {
  const articlePath = path.join(__dirname, '../content/articles/20220110-2021.md');
  const mappingsPath = path.join(__dirname, '../extracted/2021-image-mappings.json');
  
  // Read the article and mappings
  const article = fs.readFileSync(articlePath, 'utf8');
  const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));
  
  let { content, data } = matter(article);
  let paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  // Remove any existing images except the cover image
  paragraphs = paragraphs.filter((p, i) => {
    if (i <= 1 && p.includes('cover-image')) return true;
    return !p.includes('<img');
  });
  
  // Process each image
  mappings.images.forEach((image, index) => {
    if (index === 0) {
      // First image is the cover image
      const coverImage = `<img src="/images/blog/2021-${index + 1}.jpeg" alt="${generateAltText(image.context)}" class="cover-image" />`;
      // Replace existing cover image or add it
      const coverIndex = paragraphs.findIndex(p => p.includes('cover-image'));
      if (coverIndex !== -1) {
        paragraphs[coverIndex] = coverImage;
      } else {
        paragraphs.splice(1, 0, coverImage);
      }
    } else {
      // Find best match for context
      const match = findBestMatch(paragraphs.join('\n\n'), image.context);
      if (match.rating > 0.3) { // Threshold for similarity
        const imageTag = `<img src="/images/blog/2021-${index + 1}.jpeg" alt="${generateAltText(image.context)}" />`;
        paragraphs.splice(match.index + 1, 0, imageTag);
      }
    }
  });
  
  // Reconstruct the content
  const newContent = matter.stringify(paragraphs.join('\n\n'), data);
  
  // Write back to file
  fs.writeFileSync(articlePath, newContent);
  console.log('Updated 20220110-2021.md with all images');
}

// Run the script
insertImages(); 