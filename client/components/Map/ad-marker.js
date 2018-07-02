import React from 'react'
import { connect } from 'react-redux'
import { Card, CardItem, Body, Text, Button, Right } from 'native-base'
import { Popup } from 'react-native-map-link'
import { showDetailAction } from '../../store/location'
import AdCard from '../Ad/ad-card'

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
  closeDetail = () => {
    this.props.showDetail(false)
  }

  render() {
    const { marker, detailStatus, navigation } = this.props
    if (!marker.ad || !detailStatus) return null
    return (
      <AdCard
        ad={{ ...marker.ad, distance: marker.distance }}
        navigation={navigation}
      >
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
      </AdCard>
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
)(AdMarker)
