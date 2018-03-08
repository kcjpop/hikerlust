import React from 'react'
import Link from 'gatsby-link'

export const TagCloudFragment = graphql`
  fragment TagCloudFragment on ContentfulTagConnection {
    edges {
      node {
        id
        title
        slug
        post {
          id
        }
      }
    }
  }
`

function getPostCount(posts) {
  return new Set(Array.from(posts, post => post.id)).size
}

export default function(props) {
  return (
    <ul className="list pa0 ma0">
      {props.tags.edges.map(({ node }) => (
        <li className="dib" key={node.id}>
          <Link to={`/tag/${node.slug}`} className="db pv2 ph3 mr2 mb2 ba b--gold gold flex items-center">
            {node.title}{' '}
            <span className="ml1 w1 h1 br-100 bg-gold white f6 inline-flex items-center justify-center">
              {getPostCount(node.post)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
