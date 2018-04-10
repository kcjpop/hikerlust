import React from 'react'
import { Helmet } from 'react-helmet'

import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'
import Sidebar from '@/components/Sidebar'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import Paginator from '@/components/Paginator'

export const query = graphql`
  query SingleTag {
    site {
      siteMetadata {
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
  const posts = (props.pathContext.group || []).map(node => ({ node }))
  const { tag } = props.pathContext.additionalContext

  const title = (
    <p className="ma0 pa0 lh-copy">
      Bài viết thuộc chủ đề <br /> {`“${tag.title}”`}
    </p>
  )

  return (
    <div>
      <PostList posts={posts} title={title} />
      <Paginator {...props.pathContext} />
    </div>
  )
}

function sidebar(props) {
  return <Sidebar tags={props.data.tags} socials={props.data.site.siteMetadata.socials} />
}

function getFirstCover(props) {
  const { site } = props.data
  const [post] = props.pathContext.group || []
  return post != null ? post.featuredImage : site.siteMetadata.defaultCover
}

export default function(props) {
  const bgImage = getFirstCover(props)
  const { tag } = props.pathContext.additionalContext
  return (
    <div>
      <Helmet>
        <title>{tag.title}</title>
      </Helmet>

      <BigBanner title={tag.title} bgImage={bgImage} href="/" />

      <div className="container center">
        <TwoColumnLayout main={() => main(props)} sidebar={() => sidebar(props)} />
      </div>
    </div>
  )
}
