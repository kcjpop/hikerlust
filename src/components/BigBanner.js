import React from 'react'
import Link from 'gatsby-link'
import logo from '@/layouts/img/logo.png'

export default function(props) {
  const { bgImage, href, title } = props
  return (
    <div className="relative mt3 mb4 cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute top-0 left-0 right-0 bottom-0 z1 bg-black-50" />
      <Link to={href} className="relative tc db pv6 z2">
        <img src={logo} alt={title} className="mw6" />
      </Link>
    </div>
  )
}
