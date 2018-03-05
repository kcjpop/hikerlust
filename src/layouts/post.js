import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import AdSense from 'react-adsense'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query SinglePost($id: String) {
    site {
      siteMetadata {
        ads {
          slot1 {
            layout
            format
            client
            slot
          }
          slot2 {
            layout
            format
            client
            slot
          }
        }
      }
    }
    post: contentfulPost(id: { eq: $id }) {
      id
      title
      slug
      featuredImage
      content {
        id
        content
      }
    }
  }
`

export default function(props) {
  const { post, site: { siteMetadata: { ads: { slot1, slot2 } } } } = props.data
  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>

      <BigBanner title={post.title} bgImage={post.featuredImage} href="/" />

      <article className="mw8-ns center pb4 bb b--light-gray">
        <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>
        <AdSense.Google format={slot1.format} client={slot1.client} slot={slot1.slot} />

        <Markdown source={post.content.content} className="js-content" />

        <AdSense.Google format={slot2.format} client={slot2.client} slot={slot2.slot} />
      </article>
    </div>
  )
}
