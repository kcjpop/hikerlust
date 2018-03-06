import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Instafeed from '@/components/Instafeed'

import './index.css'

export const query = graphql`
  query TemplateQuery {
    site {
      siteMetadata {
        title
        socials {
          instagramHandle
        }
      }
    }
  }
`

const TemplateWrapper = ({ children, data }) => (
  <section>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
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
            <Link to="/ve-na-va-hikerlust" className="fw3 f6 ttu tracked gray">
              Về Na Và Hikerlust
            </Link>
          </li>
          <li className="mr4">
            <Link to="/search" className="fw3 f6 gray">
              <i className="fa fa-search" />
            </Link>
          </li>
        </ul>
      </div>
    </header>

    <main>{children()}</main>

    <footer className="mt4">
      <section className="mt4">
        <header className="tc pv4 f6 ttu tracked">Instagram của Na</header>
        <Instafeed handle={data.site.siteMetadata.socials.instagramHandle} className="w-100 flex" />
      </section>

      <div className="mw8-ns center mt4">
        <div className="flex items-center">
          <p className="lh-copy f6 gray">
            {new Date().getFullYear()} Copyright by Na. All Rights Reserved. Feel free to share (include source)
          </p>
          <div className="ml-auto w-10">
            <a href="https://www.contentful.com/" rel="nofollow" target="_blank">
              <img
                src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                alt="Powered by Contentful"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </section>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
