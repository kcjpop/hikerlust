import React from 'react'
import Link from 'gatsby-link'
import Post from '../components/Post'
import classnames from 'classnames'

export const query = graphql`
  query LatestPosts {
    posts: allContentfulPost {
      edges {
        node {
          id
          title
          excerpt
          slug
          featuredImage
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

const IndexPage = props => {
  const posts = props.data.posts.edges

  return (
    <div>
      <div
        className="mt3 mb4 cover"
        style={{ backgroundImage: 'url(https://hikerlust.com/wp-content/uploads/2018/02/DSC09559-1.jpg)' }}
      >
        <Link to="/" className="tc db pv6">
          <img src="https://hikerlust.com/wp-content/uploads/2017/02/hikerlust.png" alt="" className="mw6" />
        </Link>
      </div>

      <div className="mw8-ns center">
        <div className="tc">
          <p className="lh-copy mv2">
            <img src="http://seaboardthemes.com/solstice-lite/wp-content/uploads/2016/04/2.jpg" alt="" />
          </p>
          ahaha
        </div>

        <div className="flex flex-column flex-row-ns mt4">
          <div className="w-70-ns pr4">
            <div className="tc pv3 ba b--light-silver f7 ttu tracked">Bài viết mới</div>
            <div className="flex mt3">
              {posts.map((post, index) => (
                <Post
                  className={classnames('w-50-ns lh-copy tc', {
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
              <header className="tc pv3 ba b--light-silver f7 ttu tracked">Về Na</header>
              <main className="lh-copy">
                <p className="mv3 tc">
                  <img src="https://hikerlust.com/wp-content/uploads/2018/02/Untitled-1.png" alt="" className="mw5" />
                </p>
                Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi &lt;3
              </main>
            </section>

            <section className="mb4">
              <header className="tc pv3 ba b--light-silver f7 ttu tracked">Theo dõi Na</header>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
