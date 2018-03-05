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
    axios.get(`https://www.instagram.com/hikerlust/?__a=1`).then(result => {
      const media = result.data.user.media.nodes.slice(0, 10)
      this.setState({ media })
    })
  }

  render() {
    return (
      <div {...this.props}>
        {this.state.media.map(media => (
          <div className="w-10" key={media.code}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.instagram.com/p/${media.code}`}
              title={media.caption}
            >
              <img src={media.thumbnail_resources[1].src} alt="" />
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Instafeed
