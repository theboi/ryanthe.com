require('dotenv').config()
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  async redirects() {
    return [
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