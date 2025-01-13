#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/blog

# List of images to download with their full URLs
IMAGES=(
  "https://framerusercontent.com/images/Pf0HTvGunBGaR91T4DRxKFBHAA.jpg"
  "https://framerusercontent.com/images/XYZ123.jpg"  # Replace with actual image ID
)

# Download images in parallel
for img in "${IMAGES[@]}"; do
  if [[ $img == *"Pf0HTvGunBGaR91T4DRxKFBHAA"* ]]; then
    filename="kevon-audrey-2024.jpg"
  else
    filename="daddy-daughter-challenge.jpg"
  fi
  curl -L -o "public/images/blog/$filename" "$img" &
done

# Wait for all downloads to complete
wait

echo "All images downloaded!" 