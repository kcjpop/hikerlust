import React from 'react'
import Link from 'gatsby-link'
import { Highlight } from 'react-instantsearch/dom'

export default function SearchHit({ hit }) {
  const { node } = hit

  return (
    <div className="pa3 bb b--light-gray flex items-stretch">
      <div className="w-20 h4 cover" style={{ backgroundImage: `url(${node.featuredImage})` }} />
      <div className="w-80 pa3">
        <Link to={`/${node.slug}`} className="f4 ttu tracked">
          <Highlight attributeName="node.title" hit={hit} />
        </Link>
        <p className="lh-copy">{node.excerpt}</p>
      </div>
    </div>
  )
}
