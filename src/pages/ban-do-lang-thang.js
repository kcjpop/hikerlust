import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { Helmet } from 'react-helmet'
import { InfoWindow, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { formatPostDate } from '@/helpers/fecha'
import countTagPost from '@/helpers/countTagPost'

const MAP_STYLES = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#aee2e0'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#abce83'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#769E72'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7B8758'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#EBF4A4'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#8dab68'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#5B5B3F'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ABCE83'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#A4C67D'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#9BBF72'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#EBF4A4'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#87ae79'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#7f2200'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff'
      },
      {
        visibility: 'on'
      },
      {
        weight: 4.1
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#495421'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
]

export const query = graphql`
  query AllPlacesQuery {
    places: allContentfulPlace {
      edges {
        node {
          id
          country
          name
          location {
            lon
            lat
          }
          post {
            id
            title
            slug
            originallyCreatedAt
            createdAt
          }
        }
      }
    }
  }
`

function makeInfoWindowContent(place) {
  return (
    <div style={{ maxHeight: '16rem' }} className="mw5 overflow-x-hidden overflow-y-auto pa3">
      {place.post.map(post => (
        <div key={post.id} className="mb3">
          <Link to={`/${post.slug}`} className="db f6 fw4 gold ttu tracked">
            {post.title}
          </Link>
          <p className="lh-copy">{formatPostDate(post)}</p>
        </div>
      ))}
    </div>
  )
}

const Map = withScriptjs(
  withGoogleMap(function(props) {
    const { places, infoWindowOpen } = props
    const [center] = places
    return (
      <div className={classnames('mw8-ns center', props.className)}>
        <GoogleMap
          ref={props.mapRef}
          defaultZoom={3}
          defaultCenter={{ lat: center.node.location.lat, lng: center.node.location.lon }}
          defaultOptions={{
            styles: MAP_STYLES,
            mapTypeControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP }
          }}
        >
          {places.map(({ node }) => {
            return (
              <Marker
                key={node.id}
                position={{ lat: node.location.lat, lng: node.location.lon }}
                onClick={props.doToggleInfoWindow(node)}
              >
                {props.isInfoWindowOpen(node) && <InfoWindow>{makeInfoWindowContent(node)}</InfoWindow>}
              </Marker>
            )
          })}
        </GoogleMap>
      </div>
    )
  })
)

class LocationAccordion extends React.Component {
  state = {
    expanded: ''
  }

  sortPlaces(places) {
    return places.reduce((acc, { node }) => {
      const country = acc[node.country] || []
      return { ...acc, [node.country]: [...country, node] }
    }, {})
  }

  countPosts(subplaces) {
    return subplaces.reduce((acc, place) => acc + countTagPost(place), 0)
  }

  isExpanded = country => {
    return this.state.expanded === country
  }

  getCountryListIcon = country => {
    return this.isExpanded(country) ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-right" />
  }

  doToggleExpand = country => e => {
    e.preventDefault()
    this.setState({ expanded: this.isExpanded(country) ? '' : country })
  }

  render() {
    const places = this.sortPlaces(this.props.places)

    return (
      <div className={this.props.className}>
        {Object.entries(places).map(([country, subplaces]) => {
          return (
            <div className="mb3" key={country}>
              <button
                type="button"
                className="outline-0 db bn bg-transparent pointer f4 gold fw3 ma0 pa0"
                onClick={this.doToggleExpand(country)}
              >
                <span className="dib w1 tc">{this.getCountryListIcon(country)}</span>
                <span className="pl2 inline-flex items-center" title="bài viết">
                  {country}
                  <small className="ml1 w1 h1 br-100 bg-gold white f6 inline-flex items-center justify-center">
                    {this.countPosts(subplaces)}
                  </small>
                </span>
              </button>
              <ul className={classnames('list', { clip: !this.isExpanded(country) })} style={{ paddingLeft: '1.5rem' }}>
                {subplaces.map(place => (
                  <li key={place.id} onClick={this.props.doCenterMap(place)} className="db mv3 pointer">
                    {place.name}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

class HikerMap extends React.Component {
  state = {
    openInfoWindows: {},
    centerLocation: null
  }

  isInfoWindowOpen = place => {
    return this.state.openInfoWindows[place.id] === true
  }

  hideAllInfoWindows = openInfoWindows => {
    return Object.keys(openInfoWindows).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  }

  doToggleInfoWindow = place => () => {
    this.setState(old => {
      // Hide all open windows
      const newState = !old.openInfoWindows[place.id]
      const allHidden = this.hideAllInfoWindows(old.openInfoWindows)
      return {
        openInfoWindows: { ...allHidden, [place.id]: newState }
      }
    })
  }

  doCenterMap = place => e => {
    e.preventDefault()
    this.mapRef.panTo({ lat: place.location.lat, lng: place.location.lon })
    this.setState(old => {
      const allHidden = this.hideAllInfoWindows(old.openInfoWindows)
      return {
        openInfoWindows: { ...allHidden, [place.id]: true }
      }
    })
  }

  render() {
    const { data } = this.props
    return (
      <div className="relative">
        <LocationAccordion
          doCenterMap={this.doCenterMap}
          places={data.places.edges}
          className="absolute top-1 left-1 z-2 pv3 ph4 bg-white w5"
        />
        <Map
          mapRef={el => (this.mapRef = el)}
          centerLocation={this.state.centerLocation}
          isInfoWindowOpen={this.isInfoWindowOpen}
          doToggleInfoWindow={this.doToggleInfoWindow}
          places={data.places.edges}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDt8lqo3-UTGbIZZef9zKmVMdPXm2rnLjY"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '85vh' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    )
  }
}

export default HikerMap
