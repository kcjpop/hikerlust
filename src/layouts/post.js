import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'

import BigBanner from '@/components/BigBanner'
import GoogleAds from '@/components/GoogleAds'
import Post from '@/components/Post'

import fecha from '@/helpers/fecha'

export const query = graphql`
  query SinglePost($id: String, $tagId: String) {
    site {
      siteMetadata {
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
      <div className="flex flex-column flex-row-ns justify-center">
        {relatedPosts.edges.map(post => (
          <div key={post.node.id} className="w-20-ns pr3 tc">
            <Post post={post.node} noExcerpt />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function(props) {
  const { post, site: { siteMetadata: { ads: { slot1, slot2 } } } } = props.data
  const date = fecha.format(new Date(post.originallyCreatedAt || post.createdAt), 'DD MMMM, YYYY')

  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>

      <BigBanner title={post.title} bgImage={post.featuredImage} href="/" />

      <div className="mw8-ns center">
        <article className="pb4 bb b--light-gray">
          <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>

          <div className="db tc f5 mb4">
            <span className="mr4">
              <i className="fa fa-calendar mr2" />
              {date}
            </span>
            <ul className="dib list pa0 ma0">
              {post.tags.map(tag => (
                <li className="dib mr2 ba b--gold pv2 ph3" key={tag.slug}>
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
