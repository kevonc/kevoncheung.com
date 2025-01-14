My current website is https://kevoncheung.com/ , can you duplicate the entire site, including the blog, and create a new site for me? Use markdown for content management and have a folder for each of them. Ignore the styling for now.

Pages:
- Home
- Now
- Blog: list all essays
- Individual Essay
- Essays Category Page: list all essays in that category

Content Management System:
- Essays (date, title, slug, content, essay_category_id, meta_description)
- Essays Categories (title, slug)
- Projects (title, description, image, link)
- Appearances (title, image, link)





# Blog Content Extractor

A tool to extract content, images, and links from blog posts. This script helps migrate content by creating structured output files that can be used to rebuild the content in a new format.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create necessary directories:
```bash
mkdir -p extracted
mkdir -p public/images/blog
```

## Usage

Run the script with a URL:
```bash
npm run extract https://kevoncheung.com/blog/your-post-slug
```

The script will create three files in the `extracted` directory:
- `your-post-slug-content.txt`: The main content text
- `your-post-slug-image-mappings.json`: Image mappings with local paths
- `your-post-slug-link-mappings.json`: Link mappings with original URLs

### Image Mappings

The image mappings file will contain entries like:
```json
{
  "https://original-url.com/image.png": {
    "localPath": "/images/blog/post-slug-1.png",
    "alt": "Image alt text"
  }
}
```

### Link Mappings

The link mappings file will contain entries like:
```json
{
  "https://original-url.com": {
    "text": "Link text",
    "originalUrl": "https://original-url.com"
  }
}
```

## Next Steps

1. Download the images referenced in the image mappings to `public/images/blog/`
2. Update the markdown content with the new local image paths
3. Update links as needed based on the link mappings

## Example

```bash
# Extract content from a blog post
npm run extract https://kevoncheung.com/blog/full-time-vs-side-hustle

# Check the extracted files
ls extracted/
```


## Content Extraction

A tool to extract content, images, and links from blog posts. This script helps migrate content by creating structured output files that can be used to rebuild the content in a new format.

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create necessary directories:
```bash
mkdir -p extracted
mkdir -p public/images/blog
```

### Usage

Run the script with a URL:
```bash
npm run extract https://kevoncheung.com/blog/your-post-slug
```

The script will create three files in the `extracted` directory:
- `your-post-slug-content.txt`: The main content text
- `your-post-slug-image-mappings.json`: Image mappings with local paths
- `your-post-slug-link-mappings.json`: Link mappings with original URLs

#### Image Mappings

The image mappings file will contain entries like:
```json
{
  "https://original-url.com/image.png": {
    "localPath": "/images/blog/post-slug-1.png",
    "alt": "Image alt text"
  }
}
```

#### Link Mappings

The link mappings file will contain entries like:
```json
{
  "https://original-url.com": {
    "text": "Link text",
    "originalUrl": "https://original-url.com"
  }
}
```

### Next Steps

1. Download the images referenced in the image mappings to `public/images/blog/`
2. Update the markdown content with the new local image paths
3. Update links as needed based on the link mappings

### Example

```bash
# Extract content from a blog post
npm run extract https://kevoncheung.com/blog/full-time-vs-side-hustle

# Check the extracted files
ls extracted/
```
