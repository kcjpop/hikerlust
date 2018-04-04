import React from 'react'
import Link from 'gatsby-link'
import logo from '@/layouts/img/logo.png'

export default function(props) {
  const { bgImage, href, title } = props
  return (
    <div className="relative mb4-ns cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute top-0 left-0 right-0 bottom-0 z1 bg-black-50" />
      <Link to={href} className="relative tc db z2 flex items-center justify-center big-banner-height">
        <img src={logo} alt={title} className="pa3 pa0-ns mw5 mw6-ns" />
      </Link>
    </div>
  )
}
