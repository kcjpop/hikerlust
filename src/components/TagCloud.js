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

function filterTags(tags) {
  return tags.map(({ node }) => ({ ...node, count: countTagPost(node) })).filter(tag => tag.count > 1)
}

export default function(props) {
  const tags = filterTags(props.tags.edges)
  return (
    <ul className="list pa0 ma0 tl">
      {tags.map(tag => (
        <li className="dib" key={tag.id}>
          <Link to={`/tag/${tag.slug}`} className="br2 db pv1 ph2 mr2 mb3 ba b--gold gold flex items-center">
            {tag.title}
            <span className="ml1 w1 h1 br-100 bg-gold white f6 pa1 inline-flex items-center justify-center">
              {tag.count}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
