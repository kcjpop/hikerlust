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
    description:
      'Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi ❤. Liên hệ: ngocanh.ngth@gmail.com',
    defaultCover: 'https://res.cloudinary.com/hikerlust/image/upload/v1520219533/na_e7zop9.jpg',
    url: 'https://hikerlust.com',
    socials: {
      instagramHandle: 'hikerlust',
      instagramUrl: 'https://www.instagram.com/hikerlust/',
      facebookUrl: 'https://www.facebook.com/hikerlust/',
      pinterestUrl: 'https://fi.pinterest.com/ngocanhng/',
      linkedInUrl: 'https://fi.linkedin.com/in/ngocanhng'
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-65162376-3',
        head: false
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    }
  ]
}
