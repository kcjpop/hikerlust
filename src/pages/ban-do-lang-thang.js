import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import { Helmet } from 'react-helmet'
import { InfoWindow, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { formatPostDate } from '@/helpers/fecha'
import countTagPost from '@/helpers/countTagPost'

const MAP_STYLES = [
  {
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f5f5f2'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'off'
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
    featureType: 'poi.attraction',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#ffffff'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#71c8d4'
      }
    ]
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        color: '#e5e8e7'
      }
    ]
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        color: '#8ba129'
      }
    ]
  },
  {
    featureType: 'road',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c7c7c7'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#a0d3d3'
      }
    ]
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        color: '#91b65d'
      }
    ]
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        gamma: 1.51
      }
    ]
  },
  {
    featureType: 'road.local',
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
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road'
  },
  {
    featureType: 'road'
  },
  {},
  {
    featureType: 'road.highway'
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

    return (
      <div className={classnames('container center', props.className)}>
        <GoogleMap
          ref={props.mapRef}
          defaultZoom={3}
          defaultCenter={{ lat: 46.270617, lng: 66.86775 }}
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
                {props.isInfoWindowOpen(node) &&
                  node.post != null &&
                  node.post.length > 0 && <InfoWindow>{makeInfoWindowContent(node)}</InfoWindow>}
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
    expanedCountry: ''
  }

  sortPlaces(places) {
    const obj = places.reduce((acc, { node }) => {
      const country = acc[node.country] || []
      return { ...acc, [node.country]: [...country, node] }
    }, {})

    return Object.entries(obj)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
  }

  countPosts(subplaces) {
    return subplaces.reduce((acc, place) => acc + countTagPost(place), 0)
  }

  isExpanded = country => {
    return this.state.expanedCountry === country
  }

  getCountryListIcon = country => {
    return this.isExpanded(country) ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-right" />
  }

  doToggleExpand = country => e => {
    e.preventDefault()
    this.setState({ expanedCountry: this.isExpanded(country) ? '' : country })
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
                className="outline-0 db bn bg-transparent pointer f5 gold ma0 pa0 w-100 tl"
                onClick={this.doToggleExpand(country)}
              >
                <span className="dib w1 tc">{this.getCountryListIcon(country)}</span>
                <span className="pl2">{country}</span>
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
          className="absolute-ns top-1 left-1 bottom-1 z-2 pa3 bg-white w5 overflow-y-auto overflow-x-hidden"
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
