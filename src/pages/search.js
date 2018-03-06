import React from 'react'
import Link from 'gatsby-link'
import { SearchBox, Hits, Highlight, Configure, Pagination } from 'react-instantsearch/dom'

function Item({ hit }) {
  const { node } = hit

  return (
    <div className="pa3 bb b--light-gray">
      <Link to={`/${node.slug}`} className="f4 ttu tracked">
        <Highlight attributeName="node.title" hit={hit} />
      </Link>
      <p className="lh-copy">{node.excerpt}</p>
    </div>
  )
}

function translate(key) {
  const map = {
    resetTitle: 'Xóa từ khóa',
    submitTitle: 'Tìm kiếm',
    placeholder: 'Nhập vào từ khóa…'
  }
  return map[key]
}

export default function(props) {
  return (
    <div className="mw8-ns center mv4">
      <Configure hitsPerPage={10} />
      <SearchBox translate={translate} showLoadingIndicator={true} />
      <h1 className="f2 tc gw6 ttu gold">Kết quả tìm kiếm</h1>
      <Hits hitComponent={Item} />
      <Pagination showLast={true} />
    </div>
  )
}
