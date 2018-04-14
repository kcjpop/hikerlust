import React from 'react'
import { InstantSearch, SearchBox, Hits, Highlight, Configure, Pagination } from 'react-instantsearch/dom'
import { connectStateResults } from 'react-instantsearch/connectors'
import qs from 'qs'

import SearchHit from '@/components/SearchHit'

function translate(key) {
  const map = {
    resetTitle: 'Xóa từ khóa',
    submitTitle: 'Tìm kiếm',
    placeholder: 'Nhập vào từ khóa…'
  }
  return map[key]
}

const SearchResults = connectStateResults(({ searchState, searchResults }) => {
  if (!searchState.query || searchState.query.length === 0) {
    return (
      <div className="tc mv5-ns">
        <h2 className="f2 fw3 silver lh-copy">
          Bạn muốn tìm bài viết nào? Hãy nhập vào tên bài viết hay địa điểm nhé!
        </h2>
      </div>
    )
  }

  if (searchResults && searchResults.nbHits === 0) {
    return (
      <div className="tc mv5-ns">
        <h2 className="f2 fw3 silver lh-copy">
          Không tìm thấy kết quả nào cho từ khóa <span className="red">{searchState.query}</span>.
        </h2>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Hits hitComponent={SearchHit} />
      <div className="flex items-center">
        <Pagination showLast={true} />
        <div className="ml-auto">
          <img
            src="https://www.algolia.com/assets/pricing_new/algolia-powered-by-ac7dba62d03d1e28b0838c5634eb42a9.svg"
            alt="Algolia"
          />
        </div>
      </div>
    </React.Fragment>
  )
})

class Search extends React.Component {
  state = {
    searchState: {}
  }

  componentDidMount() {
    const searchState = Search.getSearchStateFromUrl(this.props.location.search)
    this.setState({ searchState })
  }

  static getSearchStateFromUrl(search) {
    const qStr = search.slice(1)
    return qStr && qStr.length > 0 ? qs.parse(qStr) || {} : {}
  }

  static getDerivedStateFromProps(nextProps) {
    return { searchState: Search.getSearchStateFromUrl(nextProps.location.search) }
  }

  searchStateToUrl = (props, searchState) => {
    return searchState ? `${props.location.pathname}?${qs.stringify(searchState)}` : ''
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      const url = this.searchStateToUrl(this.props, searchState)
      this.props.history.push(url, searchState)
    }, 500)
    this.setState({ searchState })
  }

  render() {
    return (
      <div className="container center mv4">
        <InstantSearch
          appId="TG94ZTT3I5"
          apiKey="7a5ea24ac734f12330f4b121bae994fa"
          indexName="hikerlust"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <Configure hitsPerPage={10} />
          <SearchBox translate={translate} />
          <SearchResults />
        </InstantSearch>
      </div>
    )
  }
}

export default Search
