require('dotenv').config()
module.exports = {
  async redirects() {
    return [
      { /// Workaround for nextjs bug
        source: '/',
        destination: '/home',
        permanent: false,
      },
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