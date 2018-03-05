import React from 'react'
import Link from 'gatsby-link'

export default function Post(props) {
  const { post, ...rest } = props
  return (
    <article {...rest}>
      <Link to={`/${post.slug}`}>
        <div className="mb2 h5 cover bg-center" style={{ backgroundImage: `url(${post.featuredImage})` }} />
      </Link>

      <h4 className="mv2">
        <Link className="f5 ttu tracked fw6" to={`/${post.slug}`}>
          {post.title}
        </Link>
      </h4>
      <p className="lh-copy gray f6 mv2 fw3">2938 xem / 9 binh luan</p>
      <p className="lh-copy f6 mid-gray">{post.excerpt}</p>
    </article>
  )
}
