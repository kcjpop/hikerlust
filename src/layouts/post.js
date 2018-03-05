import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import logo from './img/logo.png'

export const query = graphql`
  query SinglePost($id: String) {
    site {
      siteMetadata {
        title
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
  const { post, site } = props.data
  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className="mt3 mb4 cover bg-center" style={{ backgroundImage: `url(${post.featuredImage})` }}>
        <Link to="/" className="tc db pv6">
          <img src={logo} alt={site.siteMetadata.title} className="mw6" />
        </Link>
      </div>

      <article className="mw8-ns center">
        <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>
        <Markdown source={post.content.content} className="js-content" />
      </article>
    </div>
  )
}
