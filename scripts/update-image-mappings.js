const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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

async function updateImageMappings(url) {
  const slug = url.split('/').pop();
  console.log(`Processing ${slug}...`);

  // Read existing mappings
  const mappingsPath = path.join(__dirname, '../extracted', `${slug}-image-mappings.json`);
  if (!fs.existsSync(mappingsPath)) {
    console.log(`No mappings file found for ${slug}, skipping...`);
    return;
  }

  const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

  // Launch browser
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000 
    });

    // Wait for content to load
    await page.waitForSelector('img', { timeout: 5000 });

    // Get all images and their context
    const imageContexts = await page.evaluate(() => {
      function getTextContent(element, maxLength = 500) {
        if (!element) return '';
        let text = '';
        
        // If it's a text node, return its content
        if (element.nodeType === Node.TEXT_NODE) {
          return element.textContent.trim();
        }
        
        // For elements, get all text content
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        let node;
        while ((node = walker.nextNode()) && text.length < maxLength) {
          const trimmed = node.textContent.trim();
          if (trimmed) {
            text += (text ? ' ' : '') + trimmed;
          }
        }
        
        return text;
      }

      function findPreviousText(element, maxLength = 500) {
        let text = '';
        let current = element;
        
        while (current && text.length < maxLength) {
          // Check previous sibling
          if (current.previousSibling) {
            const siblingText = getTextContent(current.previousSibling);
            if (siblingText) {
              text = siblingText + ' ' + text;
            }
            current = current.previousSibling;
          }
          // Move up to parent and its previous siblings
          else if (current.parentElement && current.parentElement !== document.body) {
            current = current.parentElement;
          }
          else {
            break;
          }
        }
        
        return text.trim();
      }

      function findNextText(element, maxLength = 500) {
        let text = '';
        let current = element;
        
        while (current && text.length < maxLength) {
          // Check next sibling
          if (current.nextSibling) {
            const siblingText = getTextContent(current.nextSibling);
            if (siblingText) {
              text += ' ' + siblingText;
            }
            current = current.nextSibling;
          }
          // Move up to parent and its next siblings
          else if (current.parentElement && current.parentElement !== document.body) {
            current = current.parentElement;
          }
          else {
            break;
          }
        }
        
        return text.trim();
      }

      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => {
        const src = img.getAttribute('src');
        const beforeText = findPreviousText(img);
        const afterText = findNextText(img);
        
        return {
          src,
          context: {
            before: beforeText,
            after: afterText
          }
        };
      });
    });

    // Update mappings with context
    let imageIndex = 1;
    mappings.images = mappings.images.map(img => {
      const matchingContext = imageContexts.find(context => 
        context.src.includes(img.src) || img.src.includes(context.src)
      );

      if (matchingContext) {
        img.filename = `blog/${slug}-${imageIndex}.png`;
        img.context = {
          before: cleanText(matchingContext.context.before),
          after: cleanText(matchingContext.context.after)
        };
        imageIndex++;
      }

      return img;
    });

    // Save updated mappings
    fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2));
    console.log(`Updated mappings for ${slug}`);

  } catch (error) {
    console.error(`Error processing ${slug}:`, error);
  } finally {
    await browser.close();
  }
}

async function processAllUrls() {
  // Read URLs from blog-urls.json
  const urlsPath = path.join(__dirname, 'blog-urls.json');
  const { urls } = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));

  // Process each URL
  for (const url of urls) {
    await updateImageMappings(url);
  }
}

// Run the script
processAllUrls().catch(console.error); 