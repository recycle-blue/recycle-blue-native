import React from 'react'
import { Callout } from 'react-native-maps'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Left, Right, Card, CardItem, Body, Text, Thumbnail } from 'native-base'
import { getDistanceThunk } from '../store/location'

class CustomCallout extends React.Component {
  componentDidMount() {
    this.props.getDistance()
  }

  render() {
    const { marker, distance } = this.props
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
              <Text style={{ fontWeight: 'bold' }}>Distance: {distance}</Text>
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
  }
}
const mapDispatch = dispatch => {
  return {
    getDistance: (origin, destination) =>
      dispatch(getDistanceThunk(origin, destination)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(CustomCallout)
