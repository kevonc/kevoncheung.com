// This is a placeholder API endpoint for fetching the latest Instagram post
// In a real implementation, you would use the Instagram Graph API to fetch the latest post

export default async function handler(req, res) {
  try {
    // Placeholder data - in a real implementation, you would fetch from Instagram API
    const mockPost = {
      id: '987654321',
      caption: 'Sharing my thoughts on building in public and how it can transform your business. #buildinpublic #entrepreneurship',
      media_url: '/images/projects/small-school.png', // Placeholder image
      permalink: 'https://www.instagram.com/p/placeholder/',
      timestamp: new Date().toISOString(),
      username: 'kevon',
      likes_count: 78,
      comments_count: 14
    }

    // Return the mock data
    res.status(200).json(mockPost)
  } catch (error) {
    console.error('Error fetching Instagram post:', error)
    res.status(500).json({ error: 'Failed to fetch Instagram post' })
  }
} 