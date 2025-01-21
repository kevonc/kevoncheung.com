const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const stringSimilarity = require('string-similarity');

// Helper function to generate alt text based on context
function generateAltText(context, maxWords = 10) {
  // Combine before and after text to understand context
  const fullContext = `${context.before} ${context.after}`;
  
  // Extract key phrases and generate a concise description
  const words = fullContext.split(' ');
  return words.slice(0, maxWords).join(' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
}

// Helper function to find best matching position using fuzzy matching
function findBestMatch(text, content) {
  const paragraphs = content.split('\n\n');
  let bestMatch = { index: -1, rating: 0 };

  paragraphs.forEach((paragraph, index) => {
    const similarity = stringSimilarity.compareTwoStrings(text, paragraph);
    if (similarity > bestMatch.rating) {
      bestMatch = { index, rating: similarity };
    }
  });

  return bestMatch.rating > 0.6 ? bestMatch.index : -1;
}

async function insertImages() {
  const articlesDir = path.join(__dirname, '../content/articles');
  const extractedDir = path.join(__dirname, '../extracted');
  
  // Get all markdown files
  const articleFiles = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md'));

  for (const articleFile of articleFiles) {
    const slug = articleFile.replace('.md', '').split('-').slice(1).join('-');
    const mappingsFile = path.join(extractedDir, `${slug}-image-mappings.json`);
    
    // Skip if no mappings exist
    if (!fs.existsSync(mappingsFile)) {
      console.log(`No image mappings found for ${slug}, skipping...`);
      continue;
    }

    // Read article and mappings
    const articlePath = path.join(articlesDir, articleFile);
    const article = fs.readFileSync(articlePath, 'utf8');
    const { data: frontmatter, content } = matter(article);
    const mappings = JSON.parse(fs.readFileSync(mappingsFile, 'utf8'));

    let newContent = content;
    
    // Process each image
    mappings.images.forEach((img, index) => {
      const altText = generateAltText(img.context);
      const imageTag = `<img src="/images/blog/${slug}-${index + 1}.png" alt="${altText}"${index === 0 ? ' class="cover-image"' : ''} />`;

      if (index === 0) {
        // Insert cover image after frontmatter
        newContent = `\n${imageTag}\n\n${newContent}`;
      } else {
        // Find position for other images using fuzzy matching
        const matchIndex = findBestMatch(img.context.before, newContent);
        if (matchIndex !== -1) {
          const contentArray = newContent.split('\n\n');
          contentArray.splice(matchIndex + 1, 0, imageTag);
          newContent = contentArray.join('\n\n');
        }
      }
    });

    // Write updated content back to file
    const updatedArticle = matter.stringify(newContent, frontmatter);
    fs.writeFileSync(articlePath, updatedArticle);
    console.log(`Updated ${articleFile} with ${mappings.images.length} images`);
  }
}

// Run the script
insertImages().catch(console.error); 