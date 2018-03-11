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
      const media = result.data.user.media.nodes.slice(0, 10)
      this.setState({ media })
    })
  }

  render() {
    const { handle, ...rest } = this.props
    return (
      <div className="w-100 flex flex-wrap" {...rest}>
        {this.state.media.map(media => (
          <div className="w-20 w-10-ns" key={media.code}>
            <a
              className="db"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.instagram.com/p/${media.code}`}
              title={media.caption}
            >
              <img src={media.thumbnail_resources[1].src} />
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Instafeed
