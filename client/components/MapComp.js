import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { getRecycleLocationsThunk } from '../store/location'

const geoLocation = navigator.geolocation

class MapComp extends React.Component {
  constructor() {
    super()
    this.state = {
      userLocation: {
        latitude: 41.8956689,
        longitude: -87.6394469,
      },
    }
  }
  componentDidMount() {
    // fetch locations
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude, longitude }
      const locationStr = Object.keys(userLocation)
        .map(key => userLocation[key])
        .join(',')
      console.log('locationStr:', locationStr)
      this.props.fetchRecycleLocations(locationStr)
      this.setState({ userLocation })
    })
  }
  render() {
    const { recycleLocations } = this.props
    const { latitude, longitude } = this.state.userLocation
    return (
      <MapView
        provider="google"
        style={{ flex: 1 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {recycleLocations.map(marker => {
          const location = {
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
          }
          return <MapView.Marker key={marker.id} coordinate={location} />
        })}
      </MapView>
    )
  }
}

const mapState = state => {
  return {
    recycleLocations: state.location,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecycleLocations: locationStr =>
      dispatch(getRecycleLocationsThunk(locationStr)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
