import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Right,
  Icon,
  Col,
  Container,
} from 'native-base'
import { ScrollView, View } from 'react-native'
import { Popup } from 'react-native-map-link'
import { showDetailAction } from '../../store/location'
import { ColorPalette } from '../color-palette'

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
      <View style={{ marginBottom: 20 }}>
        <CardItem>
          <Body>
            <Text style={{ fontSize: 20 }}>{marker.name}</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.closeDetail}>
              <Icon name="close" style={{ color: 'black', fontSize: 50 }} />
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Icon name="car" style={{ color: 'black' }} />
            <Text>{marker.vicinity}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Icon name="pin" style={{ color: 'black' }} />
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
          options={{
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
            cancelText: 'Cancel',
            appsWhiteList: ['google-maps', 'apple-maps'],
            dialogTitle: 'Choose a Maps App',
          }}
        />
      </View>
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
