import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import './index.css'

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const TemplateWrapper = ({ children, data }) => (
  <section>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
    <header>
      <div className="bg-dark-gray" style={{ height: '.25rem' }} />

      <div className="bb b--light-gray">
        <ul className="list pv3 ma0 flex items-center mw8-ns center">
          <li className="mr4">
            <Link to="/" className="fw3 f6 ttu tracked gray">
              Nhà Của Na
            </Link>
          </li>
          <li className="mr4">
            <Link to="/" className="fw3 f6 ttu tracked gray">
              Bản Đồ Lang Thang
            </Link>
          </li>
          <li className="mr4">
            <Link to="/" className="fw3 f6 ttu tracked gray">
              Lang Thang Khắp Chốn
            </Link>
          </li>
          <li className="mr4">
            <Link to="/" className="fw3 f6 ttu tracked gray">
              Bí Kíp Lang Thang
            </Link>
          </li>
          <li className="mr4">
            <Link to="/" className="fw3 f6 ttu tracked gray">
              Về Na Và Hikerlust
            </Link>
          </li>
        </ul>
      </div>
    </header>
    <main>{children()}</main>

    <footer className="mt4 mw8-ns center">
      <p className="lh-copy f6 gray">
        {new Date().getFullYear()} Copyright by Na. All Rights Reserved. Feel free to share (include source){' '}
      </p>
    </footer>
  </section>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
