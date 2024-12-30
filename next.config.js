require('dotenv').config()
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 's3.us-west-1.amazonaws.com', 's3.us-west-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false
      },
      {
        source: '/rick',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false,
      },
    ]
  },
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
  },
}