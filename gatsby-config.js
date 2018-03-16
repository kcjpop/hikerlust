const fs = require('fs')
const path = require('path')

const envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)

if (fs.existsSync(envPath)) {
  require('dotenv').config({
    path: envPath
  })
}

module.exports = {
  siteMetadata: {
    title: 'Nhà của Na',
    url: 'https://hikerlust.com',
    defaultCover: 'https://res.cloudinary.com/hikerlust/image/upload/v1520256999/DSC09559-1_1_b8syui.jpg',
    socials: {
      instagramHandle: 'hikerlust',
      instagramUrl: 'https://www.instagram.com/hikerlust/'
    },
    ads: {
      slot1: {
        layout: 'in-article',
        format: 'fluid',
        client: 'ca-pub-6060410210997401',
        slot: '5245893378'
      },
      slot2: {
        layout: 'in-article',
        format: 'fluid',
        client: 'ca-pub-6060410210997401',
        slot: '7914798052'
      }
    }
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    }
  ]
}
