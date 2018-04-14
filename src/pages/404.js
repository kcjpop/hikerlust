import React from 'react'
import { InstantSearch, SearchBox, Hits, Highlight, Configure, Pagination } from 'react-instantsearch/dom'
import { connectStateResults } from 'react-instantsearch/connectors'
import qs from 'qs'

import SearchHit from '@/components/SearchHit'

const SearchResults = connectStateResults(({ searchState, searchResults }) => {
  if (!searchResults || searchResults.nbHits === 0) {
    return <div />
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

class NotFoundPage extends React.Component {
  state = {
    searchState: {}
  }

  componentDidMount() {
    const searchState = NotFoundPage.getSearchStateFromUrl(this.props.location)
    this.setState({ searchState: { ...this.state.searchState, ...searchState } })
  }

  static getDerivedStateFromProps(nextProps) {
    return { searchState: NotFoundPage.getSearchStateFromUrl(nextProps.location) }
  }

  static getSearchStateFromUrl({ search, pathname }) {
    const qStr = search.slice(1)
    const state = qStr && qStr.length > 0 ? qs.parse(qStr) || {} : {}
    return !state.query || state.query.length === 0
      ? { ...state, query: NotFoundPage.getQueryFromPathname(pathname) }
      : state
  }

  searchStateToUrl = (props, searchState) => {
    return searchState ? `${props.location.pathname}?${qs.stringify(searchState)}` : ''
  }

  static getQueryFromPathname(pathname) {
    if (!pathname || pathname.length === 0) return ''

    return pathname.replace(/[\/-]/gi, ' ').trim()
  }

  onSearchStateChange = searchState => {
    const url = this.searchStateToUrl(this.props, searchState)
    this.debouncedSetState = setTimeout(() => {
      const url = this.searchStateToUrl(this.props, searchState)
      this.props.history.push(url, searchState)
    }, 500)
    this.setState({ searchState })
  }

  render() {
    const searchResults =
      this.state.searchState.query == null ? null : (
        <InstantSearch
          appId="TG94ZTT3I5"
          apiKey="7a5ea24ac734f12330f4b121bae994fa"
          indexName="hikerlust"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <Configure hitsPerPage={10} />
          <h1 className="f2 fw3 mt5-ns">Hoặc có thể bạn muốn tìm những bài viết này...</h1>
          <SearchBox />
          <SearchResults />
        </InstantSearch>
      )
    return (
      <div className="mv3 mv5-ns tc mw8-ns center">
        <h2 className="f2 fw3 mv4-ns">Đường dẫn không tồn tại :(</h2>
        <p className="lh-copy f4 gray">
          Hikerlust đang trong quá trình chuyển đổi sang hệ thống mới nên có thể đường dẫn cũ không còn hoạt động nữa.
          Bạn vui lòng kiểm tra lại.
        </p>

        {searchResults}
      </div>
    )
  }
}

export default NotFoundPage
