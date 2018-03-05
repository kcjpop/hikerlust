import React from 'react'
import Link from 'gatsby-link'

import PostList from '@/components/PostList'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query LatestPosts {
    site {
      siteMetadata {
        title
        defaultCover
      }
    }
    tags: allContentfulTag {
      edges {
        node {
          id
          title
          slug
          post {
            id
          }
        }
      }
    }
    posts: allContentfulPost(limit: 10, sort: { fields: [originallyCreatedAt, createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          slug
          originallyCreatedAt
          featuredImage
          createdAt
          places {
            id
            name
            country
            location {
              lon
              lat
            }
          }
          tags {
            id
            title
            slug
          }
        }
      }
    }
  }
`

export default function(props) {
  const posts = props.data.posts.edges
  const { site, tags } = props.data

  return (
    <div>
      <BigBanner title={site.siteMetadata.title} bgImage={site.siteMetadata.defaultCover} href="/" />

      <div className="mw8-ns center">
        <div className="flex flex-column flex-row-ns mt4">
          <div className="w-70-ns pr4">
            <PostList title="Bài viết mới" posts={posts} />
          </div>

          <div className="w-30-ns">
            <section className="mb4">
              <header className="tc pv3 ba b--silver f6 ttu tracked">Về Na</header>
              <main className="lh-copy">
                <p className="mv3 tc">
                  <img src="https://hikerlust.com/wp-content/uploads/2018/02/Untitled-1.png" alt="" className="mw5" />
                </p>
                Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi &lt;3
              </main>
            </section>

            <section className="mb4">
              <header className="tc pv3 ba b--silver f6 ttu tracked">Theo dõi Na</header>
              <main className="lh-copy tc pv3">
                <a href="" className="mh2">
                  <i className="f3 fa fa-facebook-square" />
                </a>
                <a href="" className="mh2">
                  <i className="f3 fa fa-instagram" />
                </a>
                <a href="" className="mh2">
                  <i className="f3 fa fa-pinterest-square" />
                </a>
                <a href="" className="mh2">
                  <i className="f3 fa fa-twitter-square" />
                </a>
              </main>
            </section>

            <section className="mb4">
              <header className="tc pv3 ba b--silver f6 ttu tracked">Tags</header>
              <main className="lh-copy tc pv3">
                <ul className="list pa0 ma0">
                  {tags.edges.map(({ node }) => (
                    <li className="dib" key={node.id}>
                      <Link to={`/tag/${node.slug}`} className="db pv2 ph3 mr2 mb2 ba b--gold gold flex items-center">
                        {node.title}{' '}
                        <span className="ml1 w1 h1 br-100 bg-gold white f6 inline-flex items-center justify-center">
                          {node.post.length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </main>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
