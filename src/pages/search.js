import React from 'react'
import Link from 'gatsby-link'
import { InstantSearch, SearchBox, Hits, Highlight, Configure, Pagination } from 'react-instantsearch/dom'

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
      <InstantSearch appId="5KVC23QVM4" apiKey="c9bb12105ab37c4962a13b57ebb01879" indexName="PostIndex">
        <Configure hitsPerPage={10} />
        <SearchBox translate={translate} showLoadingIndicator={true} />
        <h1 className="f2 tc gw6 ttu gold">Kết quả tìm kiếm</h1>
        <Hits hitComponent={Item} />
        <div className="flex items-center">
          <Pagination showLast={true} />
          <div className="ml-auto">
            <img
              src="https://www.algolia.com/assets/pricing_new/algolia-powered-by-ac7dba62d03d1e28b0838c5634eb42a9.svg"
              alt="Algolia"
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}
