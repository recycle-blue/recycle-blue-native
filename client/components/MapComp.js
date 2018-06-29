import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Container, Spinner, Content } from 'native-base'
import { Text, View } from 'react-native'
import {
  getRecycleLocationsThunk,
  getAdLocationsThunk,
  getUserLocationAction,
  selectMarkerAction,
  setFetch,
} from '../store/location'
import MarkerDetail from './MarkerDetail'

const geoLocation = navigator.geolocation

class MapComp extends React.Component {
  componentDidMount() {
    const { view } = this.props
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude, longitude }
      const locationStr = Object.keys(userLocation)
        .map(key => userLocation[key])
        .join(',')
      view === 'recycle'
        ? this.props.fetchRecycleLocations(locationStr)
        : this.props.fetchAdLocations(locationStr)

      this.props.setUserLocation(userLocation)
      this.props.setFetch(false)
    })
  }
  handleMarkerPress = marker => {
    this.props.selectMarker(marker)
  }

  render() {
    const { locations, selectedMarker, isFetching } = this.props
    const { latitude, longitude } = this.props.userLocation
    console.log('MARKERS:', locations, 'VIEW:', this.props.view)
    if (isFetching) {
      return <Spinner color="blue" />
    }
    return (
      <Container>
        <MapView
          provider="google"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            showUserLocation: true,
          }}
        >
          {locations.map(marker => {
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
    locations: state.location.locations,
    userLocation: state.location.userLocation,
    selectedMarker: state.location.selectedMarker,
    isFetching: state.location.isFetching,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecycleLocations: locationStr =>
      dispatch(getRecycleLocationsThunk(locationStr)),
    fetchAdLocations: locationStr => dispatch(getAdLocationsThunk(locationStr)),
    setUserLocation: location => dispatch(getUserLocationAction(location)),
    selectMarker: marker => dispatch(selectMarkerAction(marker)),
    setFetch: status => dispatch(setFetch(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
