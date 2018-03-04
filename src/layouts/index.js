import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import './index.css'

const TemplateWrapper = ({ children }) => (
  <section>
    <header className="">
      <div className="bg-dark-gray" style={{ height: '.25rem' }} />

      <div className="bb b--light-gray">
        <ul className="list pv3 ma0 flex items-center mw8-ns center">
          <li className="mr4">
            <Link className="fw3 f6 ttu tracked gray">Nhà Của Na</Link>
          </li>
          <li className="mr4">
            <Link className="fw3 f6 ttu tracked gray">Bản Đồ Lang Thang</Link>
          </li>
          <li className="mr4">
            <Link className="fw3 f6 ttu tracked gray">Lang Thang Khắp Chốn</Link>
          </li>
          <li className="mr4">
            <Link className="fw3 f6 ttu tracked gray">Bí Kíp Lang Thang</Link>
          </li>
          <li className="mr4">
            <Link className="fw3 f6 ttu tracked gray">Về Na Và Hikerlust</Link>
          </li>
        </ul>
      </div>

      <div
        className="mt3 mb4 cover"
        style={{ backgroundImage: 'url(https://hikerlust.com/wp-content/uploads/2018/02/DSC09559-1.jpg)' }}
      >
        <a href="" className="tc db pv6">
          <img src="https://hikerlust.com/wp-content/uploads/2017/02/hikerlust.png" alt="" className="mw6" />
        </a>
      </div>
    </header>
    <main className="mw8-ns center">{children()}</main>
  </section>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
