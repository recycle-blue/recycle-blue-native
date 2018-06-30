import React from 'react'
import { Card, CardItem, Body, Text, Button } from 'native-base'
import { Popup } from 'react-native-map-link'

class AdMarker extends React.Component {
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
    if (!marker.ad) return null
    return (
      <Card>
        <CardItem>
          <Body>
            <Text style={{ fontWeight: 'bold' }}>{marker.ad.email}</Text>
            <Text>{marker.ad.description}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{marker.ad.address}</Text>
            <Text>{`${marker.ad.city}, ${marker.ad.state}`}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ fontWeight: 'bold' }}>
              {Math.round(marker.distance * 100) / 100} miles from current
              location
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
            latitude: marker.ad.latitude,
            longitude: marker.ad.longitude,
          }}
        />
      </Card>
    )
  }
}

export default AdMarker
