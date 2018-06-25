import React from 'react'
import { connect } from 'react-redux'
// import { Button } from 'react-native'
import { Popup } from 'react-native-map-link'
import { Card, CardItem, Body, Text, Right, Button } from 'native-base'
import { getDistanceThunk } from '../store/location'

class MarkerDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
    }
  }
  componentDidMount() {
    const { userLocation, marker } = this.props
    const destination = `${marker.geometry.location.lat},${
      marker.geometry.location.lng
    }`
    const origin = `${userLocation.latitude},${userLocation.longitude}`
    this.props.getDistance(marker.id, origin, destination)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.marker.id !== this.props.marker.id) {
      const { userLocation, marker } = this.props
      const destination = `${marker.geometry.location.lat},${
        marker.geometry.location.lng
      }`
      const origin = `${userLocation.latitude},${userLocation.longitude}`
      this.props.getDistance(marker.id, origin, destination)
    }
  }
  handlePress = () => {
    this.setState({ isVisible: true })
  }
  makeInvisible = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { marker } = this.props
    return (
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
              {marker.distance} from current location
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Button success onPress={this.handlePress}>
              <Text> Navigate to Location </Text>
            </Button>
          </Body>
        </CardItem>
        <Popup
          isVisible={this.state.isVisible}
          onCancelPressed={this.makeInvisible}
          onAppPressed={this.makeInvisible}
          onBackButtonPressed={this.makeInvisible}
          modalProps={{
            animationIn: 'slideInUp',
          }}
          appsWhiteList={['google-maps', 'apple-maps']}
          options={{
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
          }}
        />
      </Card>
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
)(MarkerDetail)
