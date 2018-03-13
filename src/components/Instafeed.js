import React from 'react'
import axios from 'axios'

class Instafeed extends React.Component {
  state = {
    media: []
  }

  componentDidMount() {
    this.getFeed()
  }

  getFeed() {
    axios.get(`https://www.instagram.com/${this.props.handle}/?__a=1`).then(result => {
      const media = result.data.graphql.user.edge_owner_to_timeline_media.edges.slice(0, 10)
      this.setState({ media })
    })
  }

  render() {
    const { handle, ...rest } = this.props
    return (
      <div className="w-100 flex flex-wrap" {...rest}>
        {this.state.media.map(({ node }) => (
          <div className="w-20 w-10-ns" key={node.id}>
            <a
              className="db"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.instagram.com/p/${node.shortcode}`}
              title={node.caption}
            >
              <img src={node.thumbnail_src} />
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Instafeed
