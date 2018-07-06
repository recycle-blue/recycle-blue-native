import React from 'react'
import { connect } from 'react-redux'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Button, Right, Icon } from 'native-base'
import { Popup } from 'react-native-map-link'
import { withNavigation } from 'react-navigation'
import { showDetailAction } from '../../store/location'
import AdCard from '../Ad/ad-card'
import { colors } from '../color-palette'

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
        <CardItem style={{ justifyContent: 'space-between' }} >
          <TouchableHighlight
            style={styles.button}
            onPress={this.handlePress}
            underlayColor={colors.light}
          >
            <Text style={styles.buttonFont}>
              Navigate to Location
              </Text>
          </TouchableHighlight>
          <Button transparent onPress={this.closeDetail}>
            <Icon name="close" style={{ color: 'black', fontSize: 40 }} />
          </Button>
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
            latitude: marker.ad.latitude,
            longitude: marker.ad.longitude,
            cancelText: 'Cancel',
            appsWhiteList: ['google-maps', 'apple-maps'],
            dialogTitle: 'Choose a Maps App',
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

const ConnectedAdMarker = connect(
  mapState,
  mapDispatch
)(AdMarker)

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 25,
    backgroundColor: colors.midLight,
    borderRadius: 100,
    borderColor: colors.midLight,
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonFont: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default withNavigation(ConnectedAdMarker)
