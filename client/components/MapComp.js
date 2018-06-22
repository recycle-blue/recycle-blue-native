import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import {
  getRecycleLocationsThunk,
  getUserLocationAction,
} from '../store/location'
import CustomCallout from './CustomCallout'

const geoLocation = navigator.geolocation

class MapComp extends React.Component {
  componentDidMount() {
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude, longitude }
      const locationStr = `${userLocation.latitude},${userLocation.longitude}`
      this.props.fetchRecycleLocations(locationStr)
      this.props.setUserLocation(userLocation)
    })
  }
  render() {
    const { recycleLocations } = this.props
    const { latitude, longitude } = this.props.userLocation
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
          return (
            <MapView.Marker key={marker.id} coordinate={location}>
              <CustomCallout marker={marker} />
            </MapView.Marker>
          )
        })}
      </MapView>
    )
  }
}

const mapState = state => {
  return {
    recycleLocations: state.location.recycleLocations,
    userLocation: state.location.userLocation,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecycleLocations: locationStr =>
      dispatch(getRecycleLocationsThunk(locationStr)),
    setUserLocation: location => dispatch(getUserLocationAction(location)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
