import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import {
  getRecycleLocationsThunk,
  getUserLocationAction,
  selectMarkerAction,
} from '../store/location'
import MarkerDetail from './MarkerDetail'

const geoLocation = navigator.geolocation

class MapComp extends React.Component {
  componentDidMount() {
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude, longitude }
      const locationStr = Object.keys(userLocation)
        .map(key => userLocation[key])
        .join(',')
      this.props.fetchRecycleLocations(locationStr)
      this.props.setUserLocation(userLocation)
    })
  }
  handleMarkerPress = marker => {
    this.props.selectMarker(marker)
  }
  render() {
    const { recycleLocations, selectedMarker } = this.props
    const { latitude, longitude } = this.props.userLocation
    return (
      <Container>
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
              <MapView.Marker
                key={marker.id}
                coordinate={location}
                onPress={() => this.handleMarkerPress(marker)}
              />
            )
          })}
        </MapView>
        {selectedMarker.id && <MarkerDetail marker={selectedMarker} />}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    recycleLocations: state.location.recycleLocations,
    userLocation: state.location.userLocation,
    selectedMarker: state.location.selectedMarker,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecycleLocations: locationStr =>
      dispatch(getRecycleLocationsThunk(locationStr)),
    setUserLocation: location => dispatch(getUserLocationAction(location)),
    selectMarker: marker => dispatch(selectMarkerAction(marker)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
