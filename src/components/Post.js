import React from 'react'
import Link from 'gatsby-link'
import { formatPostDate } from '@/helpers/fecha'
import classnames from 'classnames'

export const singlePostFragment = graphql`
  fragment SimpleSinglePostFragment on ContentfulPost {
    id
    title
    slug
    featuredImage
    createdAt
    originallyCreatedAt
    excerpt
  }

  fragment SinglePostFragment on ContentfulPost {
    ...SimpleSinglePostFragment
    content {
      id
      content
    }
    tags {
      id
      title
      slug
    }
  }
`

export default function Post(props) {
  const { post, noExcerpt, className, ...rest } = props

  return (
    <article className={classnames('flex flex-column', className)} {...rest}>
      <Link to={`/${post.slug}`}>
        <div className="mb2 cover bg-center h5" style={{ backgroundImage: `url(${post.featuredImage})` }} />
      </Link>
      <h4 className={classnames('mv2 ph2', { h3: !noExcerpt })}>
        <Link className="f5 ttu tracked fw6 lh-copy" to={`/${post.slug}`}>
          {post.title}
        </Link>
      </h4>
      <p className="lh-copy mid-gray f6 fw3 mt2 mb0">{formatPostDate(post)}</p>
      {!noExcerpt ? <p className="mb0 lh-copy f6 mid-gray tl">{post.excerpt}</p> : null}
    </article>
  )
}
