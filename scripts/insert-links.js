const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const stringSimilarity = require('string-similarity');

function normalizeText(text) {
  return text
    .toLowerCase()
    // First normalize all types of quotes and apostrophes to standard ones
    .replace(/[""]/g, '"')
    .replace(/['′']/g, "'")
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    .trim();
}

function findExactTextMatch(content, text) {
  // Split content into sections, preserving markdown structure
  const sections = content.split(/\n(?=#{1,3}\s)/);
  let matches = [];
  let matchingParagraphIndexes = [];
  let currentIndex = 0;
  
  const normalizedSearchText = normalizeText(text);
  
  // Check each section
  sections.forEach(section => {
    // Split section into paragraphs
    const paragraphs = section.split('\n\n');
    
    paragraphs.forEach((paragraph, index) => {
      const normalizedParagraph = normalizeText(paragraph);
      
      if (normalizedParagraph.includes(normalizedSearchText)) {
        console.log('Found match!');
        matches.push(paragraph);
        matchingParagraphIndexes.push(currentIndex + index);
      }
    });
    
    currentIndex += paragraphs.length;
  });
  
  return {
    matches,
    indexes: matchingParagraphIndexes
  };
}

function formatLinkUrl(url) {
  // Check if it's an internal blog link
  const match = url.match(/https:\/\/kevoncheung\.com\/blog\/(.+)/);
  if (match) {
    return `/${match[1]}`; // Return just the slug with leading slash
  }
  return url; // Return full URL for external links
}

function insertLinks(filename) {
  // Extract base slug (remove date prefix if exists)
  const baseSlug = filename.replace(/^\d{8}-/, '');
  
  // Construct file paths
  const articlePath = path.join(__dirname, '../content/articles', `${filename}.md`);
  const mappingsPath = path.join(__dirname, '../extracted', `${baseSlug}-link-mappings.json`);
  
  console.log('Reading article from:', articlePath);
  console.log('Reading mappings from:', mappingsPath);
  
  // Read the article and mappings
  const article = fs.readFileSync(articlePath, 'utf8');
  const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));
  
  let { content, data } = matter(article);
  
  // Track ambiguous links for manual review
  let ambiguousLinks = [];
  
  // Process each link
  mappings.links.forEach((link, index) => {
    const { text, url, href } = link;
    const linkUrl = formatLinkUrl(url || href); // Format the URL
    
    // Skip empty or invalid links
    if (!text || !linkUrl) {
      console.log(`Skipping invalid link at index ${index}`);
      return;
    }
    
    // Find matches for the link text
    const { matches, indexes } = findExactTextMatch(content, text);
    
    if (matches.length === 0) {
      console.log(`\n▲ Links requiring manual review:`);
      console.log(`Text: "${text}"`);
      console.log(`URL: ${url || href}`); // Show original URL in log
      console.log(`Reason: No matches found`);
      console.log(`Link tag to copy: <a href="${linkUrl}">${text}</a>`);
      ambiguousLinks.push({ 
        text, 
        url: url || href, // Store original URL
        reason: 'No matches found',
        linkTag: `<a href="${linkUrl}">${text}</a>`
      });
    } else if (matches.length > 1) {
      console.log(`\n▲ Links requiring manual review:`);
      console.log(`Text: "${text}"`);
      console.log(`URL: ${url || href}`); // Show original URL in log
      console.log(`Reason: Multiple matches (${matches.length} found)`);
      console.log(`Link tag to copy: <a href="${linkUrl}">${text}</a>`);
      console.log('Matches found in:');
      matches.forEach((match, i) => console.log(`${i + 1}. ${match}`));
      ambiguousLinks.push({ 
        text, 
        url: url || href, // Store original URL
        reason: 'Multiple matches', 
        count: matches.length,
        matches,
        linkTag: `<a href="${linkUrl}">${text}</a>`
      });
    } else {
      // Single match found - replace the text with a link
      const paragraphs = content.split('\n\n');
      const matchedParagraph = paragraphs[indexes[0]];
      
      // Create the link
      const linkedParagraph = matchedParagraph.replace(
        text,
        `<a href="${linkUrl}">${text}</a>`
      );
      
      paragraphs[indexes[0]] = linkedParagraph;
      content = paragraphs.join('\n\n');
      
      console.log(`Added link for: "${text}"`);
    }
  });
  
  // Write back to file
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(articlePath, newContent);
  
  // Summary
  console.log('\nSummary:');
  console.log(`Updated ${filename}.md with links`);
  
  if (ambiguousLinks.length > 0) {
    console.log('\n▲ Links requiring manual review:');
    ambiguousLinks.forEach((link, i) => {
      console.log(`\n${i + 1}. Text: "${link.text}"`);
      console.log(`   URL: ${link.url}`);
      console.log(`   Reason: ${link.reason}`);
      console.log(`   Link tag to copy: ${link.linkTag}`);
      if (link.matches) {
        console.log('   Matches found in:');
        link.matches.forEach((match, j) => console.log(`   ${j + 1}. ${match}`));
      }
    });
  }
}

// If called directly from command line
if (require.main === module) {
  const filename = process.argv[2];
  if (!filename) {
    console.error('Please provide an article filename (without .md) as argument');
    process.exit(1);
  }
  insertLinks(filename);
} 