import React from 'react'
import { Helmet } from 'react-helmet'

import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'
import Sidebar from '@/components/Sidebar'
import TwoColumnLayout from '@/components/TwoColumnLayout'

export const query = graphql`
  query SingleTag($id: String) {
    site {
      siteMetadata {
        defaultCover
      }
    }
    tags: allContentfulTag(sort: { fields: [slug], order: ASC }) {
      ...TagCloudFragment
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

function main(props) {
  const posts = props.data.posts != null ? props.data.posts.edges : []
  return <PostList posts={posts} title={`Bài viết thuộc chủ đề “${props.pathContext.title}”`} />
}

function sidebar(props) {
  return <Sidebar tags={props.data.tags} />
}

export default function(props) {
  const { site } = props.data
  const tag = props.pathContext
  return (
    <div>
      <Helmet>
        <title>{tag.title}</title>
      </Helmet>

      <BigBanner title={tag.title} bgImage={site.siteMetadata.defaultCover} href="/" />

      <div className="mw8-ns center">
        <TwoColumnLayout main={() => main(props)} sidebar={() => sidebar(props)} />
      </div>
    </div>
  )
}
