const fs = require('fs');
const path = require('path');

// Read the image mappings
const mappingsPath = path.join(__dirname, '../extracted/2024-image-mappings.json');
const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

// Helper function to clean text
function cleanText(text) {
  return text
    .replace(/\u00e2\u0080\u0099/g, "'")
    .replace(/\u00e2\u0080\u009c/g, '"')
    .replace(/\u00e2\u0080\u009d/g, '"')
    .replace(/\u00e2\u0080\u0094/g, '—')
    .replace(/â/g, "'")
    .replace(/â/g, '"')
    .replace(/â/g, '"')
    .replace(/â/g, '—')
    .trim();
}

// Sort images by filename number to ensure correct order
mappings.images.sort((a, b) => {
  const aNum = parseInt(a.filename.split('-')[1].split('.')[0]);
  const bNum = parseInt(b.filename.split('-')[1].split('.')[0]);
  return aNum - bNum;
});

// Build the content sections
let sections = [];

// Add the intro section
sections.push('January 7, 2025\n\nThis year hit differently.');

// Process each image and its context
mappings.images.forEach((img, index) => {
  const section = [];
  
  // Add the text before the image if it exists
  if (img.context?.before) {
    const beforeText = cleanText(img.context.before);
    if (beforeText) {
      if (beforeText.startsWith(',')) {
        // If it starts with a comma, append to the last section
        const lastSection = sections[sections.length - 1];
        sections[sections.length - 1] = lastSection + beforeText;
      } else {
        section.push(beforeText);
      }
    }
  }
  
  // Add image markdown
  section.push(`![${img.alt || ''}](/images/${img.filename})`);
  
  // Add the text after the image if it exists
  if (img.context?.after) {
    const afterText = cleanText(img.context.after);
    if (afterText && !sections.includes(afterText)) {
      section.push(afterText);
    }
  }
  
  if (section.length > 0) {
    sections.push(section.join('\n\n'));
  }
});

// Format the content with proper spacing
const formattedContent = `---
title: "2024: A Year of Burnout, Reflection, and Change"
date: "2024-01-07"
topic: "life lessons"
meta_description: "A personal reflection on 2024, discussing burnout in business, the importance of collaboration, and finding a sustainable path forward in entrepreneurship."
---

${sections.join('\n\n')}
`;

// Write to the markdown file
const outputPath = path.join(__dirname, '../content/essays/2024.md');
fs.writeFileSync(outputPath, formattedContent);

console.log('Content extracted and saved to content/essays/2024.md'); 