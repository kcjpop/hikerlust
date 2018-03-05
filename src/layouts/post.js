import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'

import BigBanner from '@/components/BigBanner'
import GoogleAds from '@/components/GoogleAds'

import fecha from '@/helpers/fecha'

export const query = graphql`
  query SinglePost($id: String) {
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
  }
`

export default function(props) {
  const { post, site: { siteMetadata: { ads: { slot1, slot2 } } } } = props.data
  const date = fecha.format(new Date(post.originallyCreatedAt || post.createdAt), 'DD MMMM, YYYY')

  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>

      <BigBanner title={post.title} bgImage={post.featuredImage} href="/" />

      <article className="mw8-ns center pb4 bb b--light-gray">
        <h1 className="f2 tc gw6 ttu gold">{post.title}</h1>

        <div className="db tc f5">
          <span className="mr4">
            <i className="fa fa-calendar mr2" />
            {date}
          </span>
          <ul className="dib list pa0 ma0">
            {post.tags.map(tag => (
              <li className="dib mr2 ba b--gold pv2 ph3">
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
  )
}
