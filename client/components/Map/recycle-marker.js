import React from 'react'
import { connect } from 'react-redux'
import { CardItem, Body, Text, Button, Right, Icon, Left } from 'native-base'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import { Popup } from 'react-native-map-link'
import { showDetailAction } from '../../store/location'
import { colors } from '../color-palette'

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
        <CardItem style={{ justifyContent: 'space-between', width: '100%' }}>
          <Text style={{ fontSize: 25, width: '80%' }}>{marker.name}</Text>
          <Button transparent onPress={this.closeDetail}>
            <Icon name="close" style={{ color: 'black', fontSize: 40 }} />
          </Button>
        </CardItem>
        <CardItem>
          <Icon name="car" style={{ color: 'black', paddingRight: 10 }} />
          <Text>{marker.vicinity}</Text>
        </CardItem>
        <CardItem>
          <Icon name="pin" style={{ color: 'black' }} />
          <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>
            {marker.distance} from current location
          </Text>
        </CardItem>
        <CardItem style={{ justifyContent: 'center' }}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handlePress}
            underlayColor={colors.light}
          >
            <Text style={styles.buttonFont}>
              Navigate to Location
              </Text>
          </TouchableHighlight>
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

export default connect(
  mapState,
  mapDispatch
)(RecycleMarker)
