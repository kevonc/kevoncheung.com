#!/bin/bash

# Create necessary directories
mkdir -p content/essays
mkdir -p public/images/blog

# Download images using image-mappings.json
download_images() {
  local mappings=$(cat scripts/image-mappings.json)
  
  echo "Downloading images..."
  while IFS= read -r image_data; do
    url=$(echo "$image_data" | jq -r '.url')
    filename=$(echo "$image_data" | jq -r '.filename')
    echo "Downloading $filename..."
    curl -L -o "public/images/blog/$filename" "$url" &
  done < <(echo "$mappings" | jq -c '.images[]')
  
  # Wait for all downloads to complete
  wait
  echo "All images downloaded!"
}

# Function to replace text with markdown links
replace_links() {
  local content="$1"
  local mappings=$(cat scripts/link-mappings.json)
  
  while IFS= read -r link_data; do
    text=$(echo "$link_data" | jq -r '.text')
    url=$(echo "$link_data" | jq -r '.url')
    escaped_text=$(echo "$text" | sed 's/[\/&]/\\&/g')
    content=$(echo "$content" | sed "s/$escaped_text/[$text]($url)/g")
  done < <(echo "$mappings" | jq -c '.links[]')
  
  echo "$content"
}

# Function to replace image references
replace_images() {
  local content="$1"
  local mappings=$(cat scripts/image-mappings.json)
  
  while IFS= read -r image_data; do
    filename=$(echo "$image_data" | jq -r '.filename')
    alt=$(echo "$image_data" | jq -r '.alt')
    # Add markdown image reference
    content=$(echo "$content" | sed "s|$alt|![$alt](/images/blog/$filename)|g")
  done < <(echo "$mappings" | jq -c '.images[]')
  
  echo "$content"
}

# Process each post
process_post() {
  local title="$1"
  local date="$2"
  local category="$3"
  local meta_description="$4"
  local content="$5"
  
  # Apply link and image replacements
  content=$(replace_links "$content")
  content=$(replace_images "$content")
  
  # Create markdown file
  cat > "content/essays/$slug.md" << EOL
---
title: "$title"
date: "$date"
category: "$category"
meta_description: "$meta_description"
---

$content
EOL
}

# First download all images
download_images

# List of blog posts to extract
POSTS=(
  "2024"
  "when-you-lose-the-fun-in-business"
  "what-it-takes-to-raise-a-second-child"
  "2021-annual-retrospective"
  "oct-nov-2021-retrospective"
  "september-2021-retrospective"
  "grew-to-2000-nobody"
  "august-2021-retrospective"
  "july-2021-retrospective"
  "june-2021-retrospective"
)

# Create markdown files for each post
for post in "${POSTS[@]}"; do
  echo "Creating $post.md..."
  touch "content/essays/$post.md"
done

echo "All post files created!" 