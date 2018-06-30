import React from 'react'
import { Card, CardItem, Body, Text, Button } from 'native-base'
import { Popup } from 'react-native-map-link'

class RecycleMarker extends React.Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
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

export default RecycleMarker
