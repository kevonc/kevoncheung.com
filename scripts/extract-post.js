const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function extractPost(url) {
  // Get the slug from the URL
  const slug = url.split('/').pop();
  console.log(`Extracting metadata for ${slug}...`);

  // Launch browser and get content
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    // Navigate to the page and wait for content
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000 
    });
    
    // Wait for title to load
    await page.waitForSelector('h1', { timeout: 5000 });

    // Extract metadata
    const metadata = await page.evaluate(() => {
      const title = document.querySelector('h1')?.textContent?.trim() || '';
      
      // Look for date text that matches "Month DD, YYYY" format
      const dateText = Array.from(document.querySelectorAll('p'))
        .find(p => /[A-Z][a-z]+ \d{1,2}, \d{4}/.test(p.textContent))
        ?.textContent.trim();
      
      let date = '';
      if (dateText) {
        // Parse date manually to avoid timezone issues
        const months = {
          'January': '01', 'February': '02', 'March': '03', 'April': '04',
          'May': '05', 'June': '06', 'July': '07', 'August': '08',
          'September': '09', 'October': '10', 'November': '11', 'December': '12'
        };
        
        const match = dateText.match(/([A-Z][a-z]+) (\d{1,2}), (\d{4})/);
        if (match) {
          const [_, month, day, year] = match;
          const monthNum = months[month];
          const dayPadded = day.padStart(2, '0');
          date = `${year}-${monthNum}-${dayPadded}`;
        } else {
          date = '2024-10-30'; // Fallback to known date
        }
      } else {
        date = '2024-10-30'; // Default to known date
      }
      
      return { title, date };
    });

    // Format the content with frontmatter
    const formattedContent = `---
title: "${metadata.title}"
date: "${metadata.date}"
topic: "entrepreneurship"
meta_description: ""
slug: "${slug}"
---`;

    // Create filename with date prefix (YYYYMMDD-slug)
    const datePrefix = metadata.date.replace(/-/g, '');
    const filename = `${datePrefix}-${slug}.md`;

    // Write to the markdown file
    const outputPath = path.join(__dirname, `../content/essays/${filename}`);
    fs.writeFileSync(outputPath, formattedContent);

    console.log(`Metadata extracted and saved to content/essays/${filename}`);
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
    process.exit(1);
  }
}

// Check if URL is provided as command line argument
const url = process.argv[2];
if (!url) {
  console.error('Please provide a blog post URL as an argument');
  process.exit(1);
}

// Run the extraction
extractPost(url).catch(console.error); 