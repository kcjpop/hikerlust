import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query SinglePost($id: String) {
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
  const { post } = props.data
  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>

      <BigBanner title={post.title} bgImage={post.featuredImage} href="/" />

      <article className="mw8-ns center">
        <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>
        <Markdown source={post.content.content} className="js-content" />
      </article>
    </div>
  )
}
