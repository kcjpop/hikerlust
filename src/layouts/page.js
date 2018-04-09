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
    <div className="container center">
      <Helmet>
        <title>{post.title}</title>
      </Helmet>

      <article className="pa3 pa0-ns pb4-ns bb b--light-gray">
        <h1 className="f3 f2-ns tc gw6 ttu gold">{post.title}</h1>
        <Markdown source={post.content.content} className="js-content" />
      </article>
    </div>
  )
}
