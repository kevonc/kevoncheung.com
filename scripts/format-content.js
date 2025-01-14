const fs = require('fs');
const path = require('path');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

function extractDateFromSlug(slug) {
  // Check for year-only posts (e.g., 2024, 2023)
  if (/^\d{4}$/.test(slug)) {
    return `${slug}-01-01`;
  }
  
  // Check for monthly reviews (e.g., sep-2021, aug-2021)
  const monthMatch = slug.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(\d{4})$/i);
  if (monthMatch) {
    const months = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
    };
    const month = months[monthMatch[1].toLowerCase()];
    const year = monthMatch[2];
    return `${year}-${month}-01`;
  }
  
  // For combined months (e.g., oct-nov-2021)
  const combinedMatch = slug.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(\d{4})$/i);
  if (combinedMatch) {
    const months = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
    };
    const month = months[combinedMatch[1].toLowerCase()];
    const year = combinedMatch[3];
    return `${year}-${month}-01`;
  }
  
  return '';
}

function formatContent(content) {
  // Split content into paragraphs and remove empty ones
  let paragraphs = content
    .split('\n')
    .map(p => p.trim())
    .filter(p => p)
    .filter(p => !p.includes('Subscribe Here')) // Remove newsletter sections
    .filter(p => !p.includes('Follow me on')); // Remove social media sections
  
  // Add proper spacing between paragraphs
  return paragraphs.join('\n\n');
}

function replaceImages(content, images) {
  let newContent = content;
  let imagePositions = [];
  
  // Find potential image positions
  images.forEach((img, index) => {
    const imageRef = new RegExp(`\\[Image ${index + 1}\\]|\\[image ${index + 1}\\]`, 'gi');
    let match;
    while ((match = imageRef.exec(content)) !== null) {
      imagePositions.push({ index, position: match.index });
    }
  });
  
  // If no image references found, space them evenly through the content
  if (imagePositions.length === 0) {
    const paragraphs = content.split('\n\n');
    const spacing = Math.floor(paragraphs.length / (images.length + 1));
    
    images.forEach((img, index) => {
      const position = (index + 1) * spacing;
      imagePositions.push({ index, position: position });
    });
  }
  
  // Sort positions from last to first to avoid messing up indices
  imagePositions.sort((a, b) => b.position - a.position);
  
  // Insert images
  imagePositions.forEach(({ index, position }) => {
    const img = images[index];
    const imageMarkdown = `\n\n![${img.alt || ''}](/images/${img.filename})\n\n`;
    newContent = newContent.slice(0, position) + imageMarkdown + newContent.slice(position);
  });
  
  return newContent;
}

function replaceLinks(content, links) {
  let newContent = content;
  links.forEach(link => {
    // Skip empty, invalid, or social media links
    if (!link.text || !link.href) return;
    if (link.text.includes('Subscribe') || link.text.includes('Follow')) return;
    
    // Create markdown link syntax
    const linkMarkdown = `[${link.text}](${link.href})`;
    
    // Replace the link text with markdown syntax
    // Use word boundaries to avoid partial replacements
    const regex = new RegExp(`\\b${link.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    newContent = newContent.replace(regex, linkMarkdown);
  });
  return newContent;
}

function generateMetaDescription(content) {
  // Get the first paragraph that's long enough to be a description
  const paragraphs = content.split('\n\n');
  const description = paragraphs.find(p => p.length > 100 && !p.includes('[')) || paragraphs[0];
  
  // Trim and limit to ~160 characters
  return description.trim().slice(0, 160) + (description.length > 160 ? '...' : '');
}

function guessCategory(content, title) {
  const categories = {
    entrepreneurship: ['business', 'startup', 'entrepreneur', 'founder', 'money', 'product', 'monetization', 'launch'],
    'life lessons': ['life', 'lesson', 'learning', 'personal', 'reflection', 'retrospective', 'year'],
    writing: ['write', 'writing', 'content', 'blog', 'newsletter', 'audience'],
    community: ['community', 'audience', 'twitter', 'social', 'build in public'],
    career: ['job', 'career', 'work', 'professional', 'interview']
  };
  
  const contentLower = (content + ' ' + title).toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => contentLower.includes(keyword))) {
      return category;
    }
  }
  
  return 'life lessons'; // default category
}

async function formatPost(slug) {
  console.log(`\nProcessing ${slug}...`);
  
  // Read the markdown file for frontmatter
  const mdPath = path.join(__dirname, '../content/essays', `${slug}.md`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  
  // Read the extracted content
  const contentPath = path.join(__dirname, '../extracted', `${slug}-content.txt`);
  const extractedContent = fs.readFileSync(contentPath, 'utf8');
  
  // Read image mappings
  const imgMapPath = path.join(__dirname, '../extracted', `${slug}-image-mappings.json`);
  const imgMappings = JSON.parse(fs.readFileSync(imgMapPath, 'utf8'));
  
  // Read link mappings
  const linkMapPath = path.join(__dirname, '../extracted', `${slug}-link-mappings.json`);
  const linkMappings = JSON.parse(fs.readFileSync(linkMapPath, 'utf8'));
  
  // Extract current frontmatter
  const [, frontmatter] = mdContent.match(/---([\s\S]*?)---/);
  const frontmatterData = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...value] = line.split(':').map(s => s.trim());
    if (key && value.length) {
      frontmatterData[key] = value.join(':').replace(/^"(.*)"$/, '$1');
    }
  });
  
  // Format the content
  let formattedContent = formatContent(extractedContent);
  
  // Replace images and links
  formattedContent = replaceImages(formattedContent, imgMappings.images);
  formattedContent = replaceLinks(formattedContent, linkMappings.links);
  
  // Generate meta description if empty
  if (!frontmatterData.meta_description) {
    frontmatterData.meta_description = generateMetaDescription(formattedContent);
  }
  
  // Guess category if empty
  if (!frontmatterData.category) {
    frontmatterData.category = guessCategory(formattedContent, frontmatterData.title);
  }
  
  // Try to get date from frontmatter or slug
  if (!frontmatterData.date) {
    frontmatterData.date = extractDateFromSlug(slug);
  } else if (!frontmatterData.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    frontmatterData.date = formatDate(frontmatterData.date);
  }
  
  // Create the new frontmatter
  const newFrontmatter = Object.entries(frontmatterData)
    .map(([key, value]) => `${key}: "${value}"`)
    .join('\n');
  
  // Create the new markdown content
  const newContent = `---
${newFrontmatter}
---

${formattedContent}`;
  
  // Write back to file
  fs.writeFileSync(mdPath, newContent);
  console.log(`✓ Updated ${slug}`);
  console.log(`  Category: ${frontmatterData.category}`);
  console.log(`  Date: ${frontmatterData.date}`);
  console.log(`  Images: ${imgMappings.images.length}`);
  console.log(`  Links: ${linkMappings.links.length}`);
}

// Process all posts
async function formatAllPosts() {
  const extractedDir = path.join(__dirname, '../extracted');
  const files = fs.readdirSync(extractedDir);
  
  // Get unique slugs from image-mappings files
  const slugs = files
    .filter(f => f.endsWith('-image-mappings.json'))
    .map(f => f.replace('-image-mappings.json', ''));
  
  console.log(`Found ${slugs.length} posts to format\n`);
  
  for (const slug of slugs) {
    try {
      await formatPost(slug);
    } catch (error) {
      console.error(`Error formatting ${slug}:`, error.message);
    }
  }
}

formatAllPosts()
  .catch(console.error); 