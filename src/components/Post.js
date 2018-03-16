import React from 'react'
import Link from 'gatsby-link'
import { formatPostDate } from '@/helpers/fecha'

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
  const { post, noExcerpt, ...rest } = props

  return (
    <article {...rest}>
      <Link to={`/${post.slug}`}>
        <div className="mb2 h5 cover bg-center" style={{ backgroundImage: `url(${post.featuredImage})` }} />
      </Link>

      <h4 className="mv2 h3-ns">
        <Link className="f5 ttu tracked fw6" to={`/${post.slug}`}>
          {post.title}
        </Link>
      </h4>
      <p className="lh-copy mid-gray f6 mt3 mb2 fw3">{formatPostDate(post)}</p>
      {!noExcerpt ? <p className="mb0 lh-copy f6 mid-gray tl">{post.excerpt}</p> : null}
    </article>
  )
}
