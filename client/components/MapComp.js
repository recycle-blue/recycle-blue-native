import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { Container, Card, CardItem, Body, Button, Text } from 'native-base'
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
      const locationStr = Object.keys(userLocation)
        .map(key => userLocation[key])
        .join(',')
      this.props.fetchRecycleLocations(locationStr)
      this.props.setUserLocation(userLocation)
    })
  }
  render() {
    const { recycleLocations } = this.props
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
              <MapView.Marker key={marker.id} coordinate={location}>
                <CustomCallout marker={marker} />
              </MapView.Marker>
            )
          })}
        </MapView>
        <Card>
          <CardItem>
            <Body>
              <Text>Test</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Does this work</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontWeight: 'bold' }}>
                5 miles from current location
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button success onPress={() => console.log('pressed!')}>
                <Text> Navigate to Location </Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Container>
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
