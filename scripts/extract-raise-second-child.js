const fs = require('fs');
const path = require('path');

// IMPORTANT: Extract the actual text from https://kevoncheung.com/blog/raise-second-child
// DO NOT write new content. The text should be copied exactly as it appears on the blog.

// Add title and metadata (from the blog post)
const frontmatter = `---
title: "What I learned from raising my second child"
date: "2024-01-07"
category: "life"
description: "TODO: Copy the actual meta description from the blog post"
---\n\n`;

// TODO: Replace this placeholder with the actual text content from the blog post
const content = frontmatter + `[ACTUAL BLOG POST CONTENT GOES HERE]`;

// Write to file
const outputPath = path.join(__dirname, '../content/essays/raise-second-child.md');
fs.writeFileSync(outputPath, content);

console.log('Content extracted and saved to content/essays/raise-second-child.md'); 