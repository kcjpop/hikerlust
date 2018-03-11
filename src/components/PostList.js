import React from 'react'
import Post from './Post'
import classnames from 'classnames'

export default function(props) {
  const { title, posts, ...rest } = props
  return (
    <div {...rest}>
      <div className="tc pv3 ba b--silver f6 ttu tracked">{title}</div>
      <div className="flex flex-wrap mt3">
        {posts.map((post, index) => (
          <Post
            className={classnames('w-50-ns lh-copy tc pt3 pb2 bb bn-ns b--light-gray no-last-border', {
              'pr2-ns': index % 2 === 0,
              'pl2-ns': index % 2 !== 0
            })}
            key={post.node.id}
            post={post.node}
          />
        ))}
      </div>
    </div>
  )
}
