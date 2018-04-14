import React from 'react'
import Link from 'gatsby-link'
import { makeNextPath, makePrevPath } from '@/helpers/pagination'

export default function(props) {
  const { group, first, last } = props
  return (
    <div className="flex items-center mt3">
      {first ? null : (
        <Link to={makePrevPath(props)} className="ph3 pv2 ba b--gold ttu gold">
          &laquo; Trang trước
        </Link>
      )}
      {last ? null : (
        <Link to={makeNextPath(props)} className="ml-auto ph3 pv2 ba b--gold ttu gold">
          Trang sau &raquo;
        </Link>
      )}
    </div>
  )
}
