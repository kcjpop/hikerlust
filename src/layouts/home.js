import React from 'react'
import Link from 'gatsby-link'

import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'
import Sidebar from '@/components/Sidebar'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import Paginator from '@/components/Paginator'

export const query = graphql`
  query LatestPosts {
    site {
      siteMetadata {
        title
        defaultCover
        socials {
          instagramUrl
          facebookUrl
          pinterestUrl
          linkedInUrl
        }
      }
    }
    tags: allContentfulTag(sort: { fields: [slug], order: ASC }) {
      ...TagCloudFragment
    }
  }
`

function main(props) {
  return (
    <div>
      <PostList title="Bài viết mới" posts={props.pathContext.group} />
      <Paginator {...props.pathContext} />
    </div>
  )
}

function sidebar(props) {
  return <Sidebar tags={props.data.tags} socials={props.data.site.siteMetadata.socials} />
}

export default function(props) {
  const { site, tags } = props.data

  return (
    <div>
      <BigBanner title={site.siteMetadata.title} bgImage={site.siteMetadata.defaultCover} href="/" />

      <div className="mw8-ns center">
        <TwoColumnLayout main={() => main(props)} sidebar={() => sidebar(props)} />
      </div>
    </div>
  )
}
