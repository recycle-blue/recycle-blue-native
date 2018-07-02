import React from 'react'
import { connect } from 'react-redux'
import { Card, CardItem, Body, Text, Button, Right, Icon } from 'native-base'
import { Popup } from 'react-native-map-link'
import { showDetailAction } from '../../store/location'

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
  closeDetail = () => {
    this.props.showDetail(false)
  }

  render() {
    const { marker, detailStatus } = this.props
    if (!detailStatus) return null
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{marker.name}</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.closeDetail}>
              <Text> Close </Text>
            </Button>
          </Right>
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
    detailStatus: state.location.showDetail,
  }
}

const mapDispatch = dispatch => {
  return {
    showDetail: status => dispatch(showDetailAction(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(RecycleMarker)
