import json
import os
import requests

def download_images(slug):
    """
    Download images based on the mappings file.
    
    Args:
        slug (str): Slug of the post, used to find the mappings file
    """
    print(f"Downloading images for {slug}...")
    
    # Create images directory if it doesn't exist
    os.makedirs('public/images/blog', exist_ok=True)
    
    # Read mappings
    mappings_file = f'scripts/image-mappings-{slug}.json'
    with open(mappings_file) as f:
        mappings = json.load(f)
    
    # Download each image
    for img in mappings['images']:
        output_path = f"public/images/blog/{img['filename']}"
        print(f"Downloading {img['filename']}...")
        
        response = requests.get(img['url'])
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            print(f"✓ Downloaded {img['filename']}")
        else:
            print(f"✗ Failed to download {img['filename']}")
    
    print("All downloads completed!")

if __name__ == "__main__":
    # Example usage:
    slug = "fun-in-business"
    download_images(slug) 