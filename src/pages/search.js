import React from 'react'
import Link from 'gatsby-link'
import { InstantSearch, SearchBox, Hits, Highlight, Configure, Pagination } from 'react-instantsearch/dom'

function Item({ hit }) {
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
    <div className="container center mv4">
      <InstantSearch appId="TG94ZTT3I5" apiKey="7a5ea24ac734f12330f4b121bae994fa" indexName="hikerlust">
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
