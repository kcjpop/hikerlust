import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import { InfoWindow, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { formatPostDate } from '@/helpers/fecha'
import countTagPost from '@/helpers/countTagPost'

const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9b2a6' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#dcd2be' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ae9e90' }]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#93817c' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#a5b076' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#447530' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f5f1e6' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#fdfcf8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f8c967' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e9bc62' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#e98d58' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#db8555' }]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#806b63' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8f7d77' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ebe3cd' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b9d3c2' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#92998d' }]
  }
]

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
      <div className="mw8-ns center">
        <GoogleMap
          ref={props.mapRef}
          defaultZoom={4}
          defaultCenter={{ lat: center.node.location.lat, lng: center.node.location.lon }}
          defaultOptions={{ styles: MAP_STYLES }}
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

class LocationAccordion extends React.Component {
  sortPlaces(places) {
    return places.reduce((acc, { node }) => {
      const country = acc[node.country] || []
      return { ...acc, [node.country]: [...country, node] }
    }, {})
  }

  countPosts(subplaces) {
    return subplaces.reduce((acc, place) => acc + countTagPost(place), 0)
  }

  render() {
    const places = this.sortPlaces(this.props.places)

    return (
      <div className="pa3">
        {Object.entries(places).map(([country, subplaces]) => {
          return (
            <div className="mb3" key={country}>
              <h3 className="pointer f4 gold fw3 ma0 pa0">
                <i className="fa fa-angle-right" />
                <span className="pl2 inline-flex items-center">
                  {country}
                  <small className="ml1 w1 h1 br-100 bg-gold white f6 inline-flex items-center justify-center">
                    {this.countPosts(subplaces)}
                  </small>
                </span>
              </h3>
              <ul className="list">
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
      <div className="flex flex-column flex-row-ns">
        <div className="w-20">
          <LocationAccordion doCenterMap={this.doCenterMap} places={data.places.edges} />
        </div>
        <div className="w-80">
          <Map
            mapRef={el => (this.mapRef = el)}
            centerLocation={this.state.centerLocation}
            isInfoWindowOpen={this.isInfoWindowOpen}
            doToggleInfoWindow={this.doToggleInfoWindow}
            places={data.places.edges}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDt8lqo3-UTGbIZZef9zKmVMdPXm2rnLjY"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '80vh' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </div>
    )
  }
}

export default HikerMap
