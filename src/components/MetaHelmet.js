import React from 'react'
import { Helmet } from 'react-helmet'

class MetaHelmet extends React.Component {
  render() {
    const { url, location } = this.props
    const fullUrl = `${url}/${location.pathname}`
    const post = this.props.post || {}
    const title = post ? post.title : props.title
    const image = post ? post.featuredImage : ''
    const createdAt = post.originallyCreatedAt || post.createdAt
    const updatedAt = post.updatedAt

    return (
      <Helmet>
        <title>{post.title}</title>
        <link rel="canonical" href={fullUrl} />
        <meta name="description" content={post.excerpt} />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="Hikerlust" />
        <meta property="article:publisher" content={url} />
        {post.tags.length > 0
          ? post.tags.map(tag => <meta key={tag.slug} property="article:tag" content={tag.title} />)
          : null}
        <meta property="article:published_time" content={createdAt} />
        <meta property="article:modified_time" content={updatedAt} />
        <meta property="og:updated_time" content={updatedAt} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    )
  }
}

export default MetaHelmet
