import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query SinglePage($id: String) {
    post: contentfulPage(id: { eq: $id }) {
      id
      title
      slug
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

      <article className="mw8-ns center pb4 bb b--light-gray">
        <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>
        <Markdown source={post.content.content} className="js-content" />
      </article>
    </div>
  )
}
