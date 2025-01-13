import requests
from bs4 import BeautifulSoup
import json
import os
from urllib.parse import urlparse, unquote

def extract_images(url, slug):
    """
    Extract images from a blog post and create mappings.
    
    Args:
        url (str): Full URL of the blog post
        slug (str): Slug of the post, used for naming images (e.g., '2024')
    
    The function will:
    1. Ignore the website logo
    2. Save the cover image as {slug}-1 (only in frontmatter)
    3. Save content images as {slug}-2, {slug}-3, etc.
    4. Store context around each image to help with placement
    """
    print(f"Extracting images for {slug}...")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    image_mappings = {"images": []}
    seen_urls = set()
    
    # Logo URL to ignore
    LOGO_URL = "https://framerusercontent.com/images/t45o131ftiIcfZwHFlG4OEnQ.png"
    
    # Find all image elements
    images = soup.find_all('img')
    cover_image_found = False
    content_image_count = 1  # Counter for content images
    
    for img in images:
        src = img.get('src')
        if not src or not src.startswith('https://framerusercontent.com/images/') or src == LOGO_URL:
            continue
            
        if src not in seen_urls:
            seen_urls.add(src)
            
            # Get text context
            prev_text = img.find_previous(text=True)
            next_text = img.find_next(text=True)
            
            ext = '.jpg' if src.endswith('.jpg') else '.png'
            
            # Handle cover image - look for first image after title
            if not cover_image_found:
                filename = f"{slug}-1{ext}"
                cover_image_found = True
                # For cover image, we don't need context since it's only used in frontmatter
                image_mappings["images"].append({
                    "url": src,
                    "filename": filename,
                    "alt": img.get('alt', ''),
                    "is_cover": True
                })
            else:
                # Content images start from 2
                filename = f"{slug}-{content_image_count + 1}{ext}"
                content_image_count += 1
                image_mappings["images"].append({
                    "url": src,
                    "filename": filename,
                    "alt": img.get('alt', ''),
                    "is_cover": False,
                    "context": {
                        "before": prev_text.strip() if prev_text else "",
                        "after": next_text.strip() if next_text else ""
                    }
                })
    
    # Create output directory if it doesn't exist
    os.makedirs('scripts', exist_ok=True)
    
    # Save mappings
    mappings_file = f'scripts/image-mappings-{slug}.json'
    with open(mappings_file, 'w') as f:
        json.dump(image_mappings, f, indent=2)
    
    print(f"Found {len(image_mappings['images'])} images (including cover)")
    print(f"Mappings saved to {mappings_file}")

if __name__ == "__main__":
    # Example usage:
    url = "https://kevoncheung.com/blog/fun-in-business"
    slug = "fun-in-business"
    extract_images(url, slug) 