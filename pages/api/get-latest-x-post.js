// This is a placeholder API endpoint for fetching the latest X post
// In a real implementation, you would use the X API to fetch the latest post

export default async function handler(req, res) {
  try {
    // Placeholder data - in a real implementation, you would fetch from X API
    const mockPost = {
      id: '1234567890',
      text: 'Just published a new article on building a personal brand! Check it out at https://kevoncheung.com/articles',
      created_at: new Date().toISOString(),
      author: {
        name: 'Kevon Cheung',
        username: 'MeetKevon',
        profile_image_url: '/images/linkinbio-kevon.jpg'
      },
      public_metrics: {
        retweet_count: 12,
        reply_count: 5,
        like_count: 42,
        quote_count: 3
      }
    }

    // Return the mock data
    res.status(200).json(mockPost)
  } catch (error) {
    console.error('Error fetching X post:', error)
    res.status(500).json({ error: 'Failed to fetch X post' })
  }
} 