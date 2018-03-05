import React from 'react'

class GoogleAds extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins
        className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-layout={this.props.layout}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-format={this.props.format}
      />
    )
  }
}

export default GoogleAds
