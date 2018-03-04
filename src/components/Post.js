import React from 'react'

export default function Post(props) {
  const { post, ...rest } = props
  return (
    <article {...rest}>
      <p className="mb2">
        <img src={post.featuredImage} alt={post.title} />
      </p>
      <h4 className="f5 ttu tracked mv2 gold fw6">{post.title}</h4>
      <p className="lh-copy gray f6 mv2 fw3">2938 xem / 9 binh luan</p>
      <p className="lh-copy f6 mid-gray">{post.excerpt}</p>
    </article>
  )
}
