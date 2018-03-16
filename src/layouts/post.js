import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'

import BigBanner from '@/components/BigBanner'
import GoogleAds from '@/components/GoogleAds'
import Post from '@/components/Post'
import MetaHelmet from '@/components/MetaHelmet'

import { formatPostDate } from '@/helpers/fecha'

export const query = graphql`
  query SinglePost($id: String, $tagId: String) {
    site {
      siteMetadata {
        url
        ads {
          slot1 {
            layout
            format
            client
            slot
          }
          slot2 {
            layout
            format
            client
            slot
          }
        }
      }
    }
    post: contentfulPost(id: { eq: $id }) {
      ...SinglePostFragment
    }
    relatedPosts: allContentfulPost(
      limit: 5
      sort: { fields: [originallyCreatedAt, createdAt], order: DESC }
      filter: { id: { ne: $id }, tags: { id: { eq: $tagId } } }
    ) {
      edges {
        node {
          ...SimpleSinglePostFragment
        }
      }
    }
  }
`

function showRelatedPosts(props) {
  const { relatedPosts } = props.data
  if (!relatedPosts || relatedPosts.edges.length === 0) return

  return (
    <section>
      <header className="tc pv4 f6 ttu tracked">Bạn đừng bỏ qua</header>
      <div className="pa3 pa0-ns flex flex-column flex-row-ns justify-center">
        {relatedPosts.edges.map(post => (
          <div key={post.node.id} className="w-20-ns pr3-ns tc">
            <Post post={post.node} noExcerpt />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function(props) {
  const { post, site: { siteMetadata: { url, ads: { slot1, slot2 } } } } = props.data

  return (
    <div>
      <MetaHelmet url={url} location={props.location} post={post} />

      <BigBanner title={post.title} bgImage={post.featuredImage} href="/" />

      <div className="mw8-ns center">
        <article className="pa3 pb4-ns bb b--light-gray">
          <h1 className="lh-copy f2-ns f3 tc gw6 ttu gold">{post.title}</h1>

          <div className="flex flex-column flex-row-ns items-center justify-center db tc f5 mb4">
            <span className="mb3 mb0-ns mr4-ns">
              <i className="fa fa-calendar mr2" />
              {formatPostDate(post)}
            </span>
            <ul className="dib list pa0 ma0">
              {post.tags.map(tag => (
                <li className="br2 dib pv1 ph2 mr2 ba b--gold" key={tag.slug}>
                  <i className="gold fa fa-tag" />
                  <a href={`/tag/${tag.slug}`} className="ml1 f5">
                    {tag.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <GoogleAds style={{ display: 'block', textAlign: 'center' }} {...slot1} />

          <Markdown source={post.content.content} className="js-content" />

          <GoogleAds style={{ display: 'block', textAlign: 'center' }} {...slot2} />
        </article>
      </div>

      {showRelatedPosts(props)}
    </div>
  )
}
