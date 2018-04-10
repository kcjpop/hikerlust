import React from 'react'
import Link from 'gatsby-link'

import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'
import Sidebar from '@/components/Sidebar'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import Paginator from '@/components/Paginator'

import { formatPostDate } from '@/helpers/fecha'

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
  const posts = props.pathContext.group.slice(3)
  return (
    <div>
      <PostList title="Bài viết mới" posts={posts} />
      <Paginator {...props.pathContext} />
    </div>
  )
}

function sidebar(props) {
  return <Sidebar tags={props.data.tags} socials={props.data.site.siteMetadata.socials} />
}

function showHighlightPosts(posts) {
  return (
    <div className="home-highlight-posts mt3 mt4-ns">
      {posts.map(({ node }) => (
        <div
          key={node.id}
          className="mh3 mb3 ma0-ns home-highlight-posts__post cover flex items-center justify-center relative"
          style={{ backgroundImage: `url(${node.featuredImage})` }}
        >
          <div className="absolute absolute--fill z-1 bg-white-20" />
          <Link to={`/${node.slug}`} className="mh3 mv5 pa3 z-2 bg-black-80 lh-copy tc" style={{ color: '#fff' }}>
            <span className="db f4-ns f-serif">{node.title}</span>
            <span className="db clip-s mt3">{formatPostDate(node)}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default function(props) {
  const { site, tags } = props.data
  const posts = props.pathContext.group.slice(0, 3)

  return (
    <div className="container center">
      {showHighlightPosts(posts)}
      <TwoColumnLayout main={() => main(props)} sidebar={() => sidebar(props)} />
    </div>
  )
}
