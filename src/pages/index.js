import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'

import Post from '@/components/Post'
import BigBanner from '@/components/BigBanner'

export const query = graphql`
  query LatestPosts {
    site {
      siteMetadata {
        title
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
      <BigBanner
        title={site.siteMetadata.title}
        bgImage="https://hikerlust.com/wp-content/uploads/2018/02/DSC09559-1.jpg"
        href="/"
      />

      <div className="mw8-ns center">
        <div className="flex flex-column flex-row-ns mt4">
          <div className="w-70-ns pr4">
            <div className="tc pv3 ba b--light-silver f6 ttu tracked">Bài viết mới</div>
            <div className="flex flex-wrap mt3">
              {posts.map((post, index) => (
                <Post
                  className={classnames('w-50-ns lh-copy tc pb3', {
                    pr2: index % 2 === 0,
                    pl2: index % 2 !== 0
                  })}
                  key={post.node.id}
                  post={post.node}
                />
              ))}
            </div>
          </div>

          <div className="w-30-ns">
            <section className="mb4">
              <header className="tc pv3 ba b--light-silver f6 ttu tracked">Về Na</header>
              <main className="lh-copy">
                <p className="mv3 tc">
                  <img src="https://hikerlust.com/wp-content/uploads/2018/02/Untitled-1.png" alt="" className="mw5" />
                </p>
                Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi &lt;3
              </main>
            </section>

            <section className="mb4">
              <header className="tc pv3 ba b--light-silver f6 ttu tracked">Theo dõi Na</header>
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
              <header className="tc pv3 ba b--light-silver f6 ttu tracked">Tags</header>
              <main className="lh-copy tc pv3">
                <ul className="list pa0 ma0">
                  {tags.edges.map(({ node }) => (
                    <li className="dib">
                      <Link to={`/tag/${node.slug}`} className="db pv2 ph3 mr2 mb2 ba b--gold gold">
                        {node.title}
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
