import React from 'react'
import { Callout } from 'react-native-maps'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Left, Right, Card, CardItem, Body, Text, Thumbnail } from 'native-base'
import { getDistanceThunk } from '../store/location'

class CustomCallout extends React.Component {
  componentDidMount() {
    const { userLocation, marker } = this.props
    const destination = `${marker.geometry.location.lat},${
      marker.geometry.location.lng
    }`
    const origin = `${userLocation.latitude},${userLocation.longitude}`
    this.props.getDistance(marker.id, origin, destination)
  }

  render() {
    const { marker } = this.props
    return (
      <Callout>
        <Card>
          <CardItem>
            <Body>
              <Text>{marker.name}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{marker.vicinity}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontWeight: 'bold' }}>
                Distance: {marker.distance}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Callout>
    )
  }
}

const mapState = state => {
  return {
    distance: state.location.distance,
    userLocation: state.location.userLocation,
  }
}
const mapDispatch = dispatch => {
  return {
    getDistance: (markerId, origin, destination) =>
      dispatch(getDistanceThunk(markerId, origin, destination)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(CustomCallout)
