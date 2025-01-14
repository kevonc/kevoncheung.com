const fs = require('fs');
const path = require('path');
const https = require('https');

// Delay between downloads to avoid rate limiting
const DELAY = 1000;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const writeStream = fs.createWriteStream(filepath);
      response.pipe(writeStream);

      writeStream.on('finish', () => {
        writeStream.close();
        resolve();
      });

      writeStream.on('error', err => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  const extractedDir = path.join(__dirname, '../extracted');
  const files = fs.readdirSync(extractedDir);
  
  // Collect all image mappings
  const allImages = [];
  files.forEach(file => {
    if (!file.includes('image-mappings.json')) return;
    
    const filePath = path.join(extractedDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allImages.push(...content.images);
  });

  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../public/images');
  fs.mkdirSync(imagesDir, { recursive: true });

  console.log(`Starting to download ${allImages.length} images...\n`);
  
  let successful = 0;
  let failed = 0;
  const errors = [];

  for (const [index, img] of allImages.entries()) {
    const filepath = path.join(imagesDir, img.filename);
    
    try {
      process.stdout.write(`Downloading (${index + 1}/${allImages.length}): ${img.filename}`);
      await downloadImage(img.src, filepath);
      process.stdout.write(' ✓\n');
      successful++;
    } catch (error) {
      process.stdout.write(' ✗\n');
      failed++;
      errors.push({ url: img.src, filename: img.filename, error: error.message });
    }

    // Add delay between downloads
    if (index < allImages.length - 1) {
      await delay(DELAY);
    }
  }

  console.log('\nDownload complete!');
  console.log(`✓ Successfully downloaded: ${successful}`);
  console.log(`✗ Failed: ${failed}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(({ url, filename, error }) => {
      console.log(`${filename} (${url}): ${error}`);
    });
  }
}

downloadAllImages()
  .catch(error => {
    console.error('Error:', error);
  }); 