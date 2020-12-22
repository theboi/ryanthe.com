require('dotenv').config()
module.exports = {
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
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
}