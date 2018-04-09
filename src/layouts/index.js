import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Instafeed from '@/components/Instafeed'
import classnames from 'classnames'

import logo57 from './img/logo57.png'
import logo72 from './img/logo72.png'
import logo114 from './img/logo114.png'
import logo from './img/logo-black.png'

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

const MENU = [
  { label: 'Nhà Của Na', target: '/' },
  { label: 'Bản Đồ Lang Thang', target: '/ban-do-lang-thang' },
  {
    label: 'Lang Thang Khắp Chốn',
    target: '#',
    children: [
      { label: 'Lang thang Châu Á', target: '/tag/lang-thang-chau-a' },
      { label: 'Lang thang Châu Âu', target: '/tag/lang-thang-chau-au' },
      { label: 'Lang thang Việt Nam', target: '/tag/lang-thang-viet-nam' }
    ]
  },
  { label: 'Bí Kíp Lang Thang', target: '/' },
  { label: 'Về Na Và Hikerlust', target: '/ve-na-va-hikerlust' }
]

class TemplateWrapper extends React.Component {
  state = {
    menuVisible: false
  }

  doToggleMenu = e => {
    e.preventDefault()
    this.setState({ menuVisible: !this.state.menuVisible })
  }

  render() {
    const { data, children } = this.props
    return (
      <section>
        <Helmet>
          <meta property="fb:pages" content="229412677587462" />
          <title>{data.site.siteMetadata.title}</title>
          <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          <link rel="shortcut icon" href={logo57} type="image/x-icon" />
          <link rel="apple-touch-icon" href={logo57} />
          <link rel="apple-touch-icon" sizes="72x72" href={logo72} />
          <link rel="apple-touch-icon" sizes="114x114" href={logo114} />
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        </Helmet>
        <div id="fb-root" />

        <div className="tc">
          <Link to="/" className="db mv2">
            <img src={logo} alt="" className="mw5-ns" />
          </Link>
          <p className="lh-copy ma0 pa0 mb3 fw3 ttu tracked f-serif f4">Lang thang khắp chốn</p>
        </div>

        <header id="header">
          <div className="bg-dark-gray" style={{ height: '.2rem' }} />

          <nav className="bb b--light-gray">
            <ul className="list ma0 flex items-center container center clip-s">
              {MENU.map(menu => (
                <li className="mr4 pv4 relative home-menu" key={menu.label}>
                  <Link to={menu.target} className="fw3 f6 ttu tracked gray">
                    {menu.label}
                  </Link>
                  {menu.children == null ? null : (
                    <ul className="list ma0 pa0 absolute left-0 right-0 z-2" style={{ top: '100%' }}>
                      {menu.children.map(submenu => (
                        <li key={submenu.label} className="bg-white-90">
                          <Link className="db ttu pa3 lh-copy" to={submenu.target}>
                            {submenu.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="ml-auto mr4">
                <Link to="/search" className="ttu fw3 f6 gray">
                  Tìm kiếm
                  <i className="ml2 fa fa-search" />
                </Link>
              </li>
            </ul>

            <div
              className={classnames('bg-near-white', {
                'a-slide-down-out': !this.state.menuVisible,
                'a-slide-down-in': this.state.menuVisible
              })}
            >
              <ul className="list pa0 ma0">
                {MENU.map(menu => (
                  <li className="pa3" key={menu.label}>
                    <Link to={menu.target} className="fw3 f6 ttu tracked gray">
                      {menu.label}
                    </Link>
                    {menu.children == null ? null : (
                      <ul className="list mt3 pl3" style={{ listStyleType: 'circle' }}>
                        {menu.children.map(submenu => (
                          <li key={submenu.label}>
                            <Link className="db fw3 f6 pt3 ttu tracked gray" to={submenu.target}>
                              {submenu.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="clip-ns flex items-center pa3">
              <a href="#" className="f3 flex items-center w-50" onClick={this.doToggleMenu}>
                <i className="fa fa-bars" />
                <span className="ml2 f5 fw3 ttu tracked gray">Nhà Của Na</span>
              </a>
              <Link to="/search" className="fw3 f6 gray ml-auto">
                <i className="fa fa-search" />
              </Link>
            </div>
          </nav>
        </header>

        <main>{typeof children === 'function' ? children() : children}</main>

        <footer className="mt4-ns">
          <div className="fixed bottom-1 right-1 z-999">
            <a href="#header" className="w3 h3 flex flex-column items-center justify-center bg-dark-gray gold br2">
              <i className="fa fa-arrow-up" />
              <span className="mt2 ttu">TOP</span>
            </a>
          </div>

          <section className="mt4-ns">
            <h6 className="tc pt3 f6 ttu tracked gold fw7">Instagram của Na</h6>
            <Instafeed handle={data.site.siteMetadata.socials.instagramHandle} />
          </section>

          <div className="container center mt3 mt4-ns mb3">
            <div className="flex flex-column justify-center flex-row-ns items-center ph3 pa0-ns">
              <p className="mt0 lh-copy f6 gray">
                {new Date().getFullYear()} Bản quyền thuộc về Na. Ghi rõ nguồn khi chia sẻ.
              </p>
              <div className="ml-auto w-100 w-10-ns tc tr-ns">
                <a
                  href="https://www.contentful.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="mw3 mw4-ns dib w-100"
                >
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
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
