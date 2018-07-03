import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Container, Spinner } from 'native-base'
import {
  getRecycleLocationsThunk,
  getAdLocationsThunk,
  getUserLocationAction,
  selectMarkerAction,
  setFetch,
  getLocationsAction,
  showDetailAction,
} from '../../store/location'
import MarkerDetail from './MarkerDetail'

const geoLocation = navigator.geolocation

class MapComp extends React.Component {
  componentDidMount() {
    this.props.setFetch(true)
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude, longitude }
      this.fetchLocations(userLocation, true)
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      const { userLocation } = this.props
      this.fetchLocations(userLocation, false)
    }
  }

  async fetchLocations(userLocation, needsLocation) {
    const locationStr = `${userLocation.latitude},${userLocation.longitude}`
    if (this.props.view === 'recycling') {
      await this.props.fetchRecycleLocations(locationStr)
    } else {
      await this.props.fetchAdLocations(locationStr)
    }
    if (needsLocation) this.props.setUserLocation(userLocation)

    this.props.setFetch(false)
  }
  handleMarkerPress = marker => {
    this.props.selectMarker(marker)
    this.props.showDetail(true)
  }

  componentWillUnmount() {
    this.props.resetLocations()
    this.props.selectMarker({})
  }

  render() {
    const { locations, selectedMarker, isFetching, view } = this.props
    const { latitude, longitude } = this.props.userLocation
    if (isFetching) {
      return <Spinner color="blue" style={{ marginTop: 40 }} />
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
            let location, id
            if (view === 'recycling') {
              location = {
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }
              id = marker.id
            } else {
              location = {
                latitude: +marker.ad.latitude,
                longitude: +marker.ad.longitude,
              }
              id = marker.ad.id
            }

            return (
              <MapView.Marker
                key={id}
                coordinate={location}
                onPress={() => this.handleMarkerPress(marker)}
              />
            )
          })}
        </MapView>
        {(selectedMarker.id || selectedMarker.ad) && (
          <MarkerDetail marker={selectedMarker} view={view} />
        )}
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
    resetLocations: () => dispatch(getLocationsAction([])),
    showDetail: status => dispatch(showDetailAction(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
