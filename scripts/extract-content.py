import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote
import json
import os

def extract_content(url="https://kevoncheung.com/blog/fun-in-business", slug="fun-in-business"):
    print(f"Extracting content for {slug}...")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the main content area by looking for the article title
    title_div = soup.find('div', text="When you lose the fun in business")
    if not title_div:
        print("Could not find main content area")
        return

    content = title_div.parent

    # Extract metadata
    metadata = {
        'title': "When you lose the fun in business",
        'date': "2024-10-30",
        'category': "entrepreneurship",
        'image': "/images/blog/fun-in-business-1.png",
        'meta_description': "A candid reflection on losing and rediscovering the joy in entrepreneurship, and the importance of balancing business goals with personal fulfillment."
    }

    # Extract images
    seen_urls = set()
    images = []
    for img in content.find_all('img'):
        src = img.get('src')
        if src and not src.startswith('data:') and src not in seen_urls:
            seen_urls.add(src)
            images.append({
                'url': src,
                'filename': f"{slug}-{len(images) + 1}{os.path.splitext(src)[1]}",
                'alt': img.get('alt', '')
            })

    # Extract links
    seen_links = set()
    links = []
    for link in content.find_all('a'):
        href = link.get('href')
        text = link.get_text().strip()
        if href and text and href not in seen_links and not href.startswith('#') and href != url:
            seen_links.add(href)
            links.append({
                'url': href,
                'text': text,
                'context': {
                    'before': str(link.previous_sibling).strip() if link.previous_sibling else '',
                    'after': str(link.next_sibling).strip() if link.next_sibling else ''
                }
            })

    # Extract content text
    content_text = content.get_text('\n', strip=True)

    # Create output directories if they don't exist
    os.makedirs('scripts', exist_ok=True)
    os.makedirs('content/essays', exist_ok=True)

    # Save image mappings
    with open(f'scripts/image-mappings-{slug}.json', 'w') as f:
        json.dump({'images': images}, f, indent=2)

    # Save link mappings
    with open(f'scripts/link-mappings-{slug}.json', 'w') as f:
        json.dump({'links': links}, f, indent=2)

    # Save content with frontmatter
    frontmatter = '---\n'
    for key, value in metadata.items():
        frontmatter += f'{key}: "{value}"\n'
    frontmatter += '---\n\n'

    with open(f'content/essays/{slug}.md', 'w') as f:
        f.write(frontmatter + content_text)

    print(f"Found {len(images)} images and {len(links)} links")
    print(f"Content saved to content/essays/{slug}.md")
    print(f"Image mappings saved to scripts/image-mappings-{slug}.json")
    print(f"Link mappings saved to scripts/link-mappings-{slug}.json")

extract_content() 