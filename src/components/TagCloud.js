import React from 'react'
import Link from 'gatsby-link'
import countTagPost from '@/helpers/countTagPost'

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

export default function(props) {
  return (
    <ul className="list pa0 ma0 tl">
      {props.tags.edges.map(({ node }) => (
        <li className="dib" key={node.id}>
          <Link to={`/tag/${node.slug}`} className="br2 db pv1 ph2 mr2 mb3 ba b--gold gold flex items-center">
            {node.title}
            <span className="ml1 w1 h1 br-100 bg-gold white f6 inline-flex items-center justify-center">
              {countTagPost(node)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
