import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import BigBanner from '@/components/BigBanner'
import GoogleAds from '@/components/GoogleAds'

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
        <GoogleAds style={{ display: 'block', textAlign: 'center' }} {...slot1} />

        <Markdown source={post.content.content} className="js-content" />

        <GoogleAds style={{ display: 'block', textAlign: 'center' }} {...slot2} />
      </article>
    </div>
  )
}
