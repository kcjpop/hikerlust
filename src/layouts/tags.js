import React from 'react'
import { Helmet } from 'react-helmet'
import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query SingleTag($id: String) {
    site {
      siteMetadata {
        defaultCover
      }
    }
    posts: allContentfulPost(
      filter: { tags: { id: { eq: $id } } }
      sort: { fields: [originallyCreatedAt, createdAt], order: DESC }
    ) {
      edges {
        node {
          ...SinglePostFragment
        }
      }
    }
  }
`

export default function(props) {
  const { posts, site } = props.data
  const tag = props.pathContext
  return (
    <div>
      <Helmet>
        <title>{tag.title}</title>
      </Helmet>

      <BigBanner title={tag.title} bgImage={site.siteMetadata.defaultCover} href="/" />

      <div className="mw8-ns center">
        <PostList posts={posts.edges} title={`Bài viết: ${tag.title}`} />
      </div>
    </div>
  )
}
